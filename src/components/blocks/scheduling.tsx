"use client";

import { useEffect, useRef, useState } from "react";
import { Check, RefreshCw, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    Calendly: {
      initInlineWidget: (options: {
        url: string;
        parentElement: HTMLElement | null;
        prefill?: {
          name?: string;
          email?: string;
        };
      }) => void;
    };
  }
}

type LoadingState = "loading" | "loaded" | "error";

export const Scheduling = ({ className }: { className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>("loading");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isCalendlyInitialized, setIsCalendlyInitialized] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const errorHandlerRef = useRef<((event: ErrorEvent) => void) | null>(null);

  const CALENDLY_SCRIPT_URL = "https://assets.calendly.com/assets/external/widget.js";
  const SCRIPT_LOAD_TIMEOUT = 20000; // 20 segundos
  const CALENDLY_INIT_TIMEOUT = 15000; // 15 segundos (aumentado de 5s)
  const MAX_RETRIES = 3;

  // Validar URL do Calendly
  const validateCalendlyUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.protocol === "https:" &&
        (urlObj.hostname === "calendly.com" || urlObj.hostname.endsWith(".calendly.com"))
      );
    } catch {
      return false;
    }
  };

  // Verificar disponibilidade do window.Calendly com polling
  const waitForCalendly = (initialDelay: number = 200): Promise<void> => {
    return new Promise((resolve, reject) => {
      const checkInterval = 100; // Verificar a cada 100ms
      const maxAttempts = Math.floor(CALENDLY_INIT_TIMEOUT / checkInterval);
      let attempts = 0;
      let startTime = Date.now();

      const checkCalendly = () => {
        // Verificar imediatamente se já está disponível
        if (window.Calendly && typeof window.Calendly.initInlineWidget === "function") {
          const elapsed = Date.now() - startTime;
          if (process.env.NODE_ENV === "development") {
            console.log(`[Calendly] API disponível após ${elapsed}ms`);
          }
          resolve();
          return;
        }

        // Verificar timeout baseado em tempo real, não apenas tentativas
        const elapsed = Date.now() - startTime;
        if (elapsed >= CALENDLY_INIT_TIMEOUT) {
          reject(new Error("Calendly não ficou disponível a tempo. Tente novamente."));
          return;
        }

        attempts++;
        setTimeout(checkCalendly, checkInterval);
      };

      // Aguardar um pequeno delay inicial antes de começar a verificar
      // Isso dá tempo ao script de começar a inicializar
      setTimeout(() => {
        startTime = Date.now();
        checkCalendly();
      }, initialDelay);
    });
  };

  // Carregar script do Calendly
  const loadCalendlyScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      // Verificar se já existe no DOM
      const existingScript = document.querySelector(
        `script[src="${CALENDLY_SCRIPT_URL}"]`
      ) as HTMLScriptElement;

      if (existingScript) {
        // Verificar imediatamente se já está disponível
        if (window.Calendly && typeof window.Calendly.initInlineWidget === "function") {
          setLoadingState("loaded");
          resolve();
          return;
        }
        
        // Script existe mas Calendly não está disponível ainda
        // Usar waitForCalendly que já tem timeout e polling adequados
        // Começar sem delay se o script pode já ter sido carregado
        waitForCalendly(100)
          .then(() => {
            setLoadingState("loaded");
            resolve();
          })
          .catch(reject);
        return;
      }

      // Verificar se window.Calendly já está disponível
      if (window.Calendly) {
        setLoadingState("loaded");
        resolve();
        return;
      }

      // Criar novo script
      const script = document.createElement("script");
      script.src = CALENDLY_SCRIPT_URL;
      script.async = true;
      scriptRef.current = script;

      // Adicionar error handler global ANTES de carregar o script
      // para capturar erros durante o carregamento
      const scriptErrorHandler = (event: ErrorEvent) => {
        if (
          event.filename?.includes("widget.js") || 
          event.message?.includes("split") ||
          (event.filename?.includes("calendly") && event.message?.includes("null"))
        ) {
          // Erro conhecido do Calendly - ignorar e continuar
          if (process.env.NODE_ENV === "development") {
            console.warn("[Calendly] Erro durante carregamento (será ignorado):", event.message);
          }
          event.preventDefault();
          event.stopPropagation();
          return true; // Prevenir que o erro seja propagado
        }
        return false;
      };

      window.addEventListener("error", scriptErrorHandler, true);

      script.onload = () => {
        // Remover error handler após carregamento
        setTimeout(() => {
          window.removeEventListener("error", scriptErrorHandler, true);
        }, 1000);

        // Quando o script acaba de carregar, começar a verificar com delay menor
        // porque pode levar um pouco para inicializar a API
        waitForCalendly(300)
          .then(() => {
            setLoadingState("loaded");
            resolve();
          })
          .catch((error) => {
            window.removeEventListener("error", scriptErrorHandler, true);
            reject(error);
          });
      };

      script.onerror = () => {
        window.removeEventListener("error", scriptErrorHandler, true);
        scriptRef.current = null;
        reject(new Error("Falha ao carregar script do Calendly. Verifique sua conexão."));
      };

      document.head.appendChild(script);
    });
  };

  // Carregar script com timeout - usando mesma lógica do retry
  useEffect(() => {
    const loadScript = async () => {
      try {
        setLoadingState("loading");
        setErrorMessage("");
        
        // Limpar estado anterior (mesma lógica do retry)
        // Remover script existente se houver
        const existingScript = document.querySelector(
          `script[src="${CALENDLY_SCRIPT_URL}"]`
        ) as HTMLScriptElement;
        
        if (existingScript && existingScript.parentNode) {
          existingScript.parentNode.removeChild(existingScript);
        }
        
        scriptRef.current = null;
        
        // Resetar window.Calendly se necessário (mesma lógica do retry)
        if (window.Calendly) {
          delete (window as any).Calendly;
        }
        
        const timeoutPromise = new Promise<void>((_, reject) => {
          timeoutRef.current = setTimeout(() => {
            reject(new Error("Tempo de carregamento excedido. Tente novamente."));
          }, SCRIPT_LOAD_TIMEOUT);
        });

        await Promise.race([loadCalendlyScript(), timeoutPromise]);
        
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      } catch (error) {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        const errorMsg = error instanceof Error ? error.message : "Erro desconhecido ao carregar calendário";
        setErrorMessage(errorMsg);
        setLoadingState("error");
        
        // Log apenas em desenvolvimento
        if (process.env.NODE_ENV === "development") {
          console.error("[Calendly] Erro ao carregar script:", error);
        }
      }
    };

    loadScript();

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      // Não remover o script do DOM no cleanup pois pode ser usado por outros componentes
      // Mas limpar a referência
      scriptRef.current = null;
    };
  }, []);

  // Verificar se elemento está completamente montado e pronto
  const isElementReady = (element: HTMLElement | null): boolean => {
    if (!element) return false;
    
    // Verificar se está no DOM
    if (!document.contains(element)) return false;
    
    // Verificar se tem dimensões válidas
    const rect = element.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) return false;
    
    // Verificar se está visível (não oculto)
    const style = window.getComputedStyle(element);
    if (style.display === "none" || style.visibility === "hidden" || style.opacity === "0") {
      return false;
    }
    
    return true;
  };

  // Aguardar elemento ficar pronto com polling
  const waitForElementReady = (element: HTMLElement, timeout: number = 5000): Promise<void> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const checkInterval = 100; // Verificar a cada 100ms

      const checkReady = () => {
        if (isElementReady(element)) {
          resolve();
          return;
        }

        const elapsed = Date.now() - startTime;
        if (elapsed >= timeout) {
          reject(new Error("Elemento não ficou pronto a tempo"));
          return;
        }

        setTimeout(checkReady, checkInterval);
      };

      checkReady();
    });
  };

  // Inicializar widget Calendly com verificações robustas
  useEffect(() => {
    if (loadingState !== "loaded") return;
    if (!ref.current) return;
    if (isCalendlyInitialized) return;

    const baseUrl =
      process.env.NEXT_PUBLIC_CALENDLY_URL ||
      "https://calendly.com/mikael-bb2002/30min";

    // Validar URL
    if (!validateCalendlyUrl(baseUrl)) {
      const errorMsg = "URL do Calendly inválida. Verifique a configuração NEXT_PUBLIC_CALENDLY_URL.";
      setErrorMessage(errorMsg);
      setLoadingState("error");
      if (process.env.NODE_ENV === "development") {
        console.error("[Calendly] URL inválida:", baseUrl);
      }
      return;
    }

    // Construir URL completa e validar antes de usar
    const buildCalendlyUrl = (base: string, params: string): string => {
      try {
        const url = new URL(base);
        // Adicionar parâmetros individualmente para garantir formatação correta
        const urlParams = new URLSearchParams();
        urlParams.set("hide_event_type_details", "1");
        urlParams.set("hide_gdpr_banner", "1");
        urlParams.set("background_color", "transparent");
        urlParams.set("text_color", "111111");
        urlParams.set("primary_color", "3b4de0");
        
        // Garantir que não há valores null ou undefined
        const finalUrl = `${url.origin}${url.pathname}?${urlParams.toString()}`;
        return finalUrl;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("[Calendly] Erro ao construir URL:", error);
        }
        // Fallback para URL simples
        return `${base}?hide_event_type_details=1&hide_gdpr_banner=1&background_color=transparent&text_color=111111&primary_color=3b4de0`;
      }
    };

    const finalUrl = buildCalendlyUrl(baseUrl, "");

    const initializeWidget = async () => {
      try {
        // Verificar API disponível
        if (!window.Calendly || typeof window.Calendly.initInlineWidget !== "function") {
          throw new Error("Calendly API não está disponível");
        }

        // Aguardar elemento estar completamente pronto
        if (!isElementReady(ref.current)) {
          await waitForElementReady(ref.current!);
        }

        // Limpar qualquer conteúdo anterior do elemento
        if (ref.current) {
          // Remover qualquer iframe ou elemento Calendly anterior
          const existingIframes = ref.current.querySelectorAll("iframe[src*='calendly']");
          existingIframes.forEach((iframe) => iframe.remove());
          
          // Garantir que o elemento está limpo e pronto
          ref.current.innerHTML = "";
          
          // Garantir atributos mínimos necessários
          if (!ref.current.hasAttribute("data-calendly-url")) {
            ref.current.setAttribute("data-calendly-url", finalUrl);
          }
        }

        // Aguardar próximo frame de renderização para garantir DOM estável
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              resolve();
            });
          });
        });

        // Delay adicional para garantir que tudo está estável
        await new Promise<void>((resolve) => setTimeout(resolve, 150));

        // Verificar novamente antes de inicializar
        if (!ref.current || !isElementReady(ref.current)) {
          throw new Error("Elemento não está pronto para inicialização");
        }

        // Remover handler anterior se existir
        if (errorHandlerRef.current) {
          window.removeEventListener("error", errorHandlerRef.current);
          errorHandlerRef.current = null;
        }

        // Adicionar listener de erro global ANTES da inicialização
        const errorHandler = (event: ErrorEvent) => {
          if (event.message?.includes("split") || event.filename?.includes("widget.js")) {
            if (process.env.NODE_ENV === "development") {
              console.warn("[Calendly] Erro detectado (ignorado):", event.message);
            }
            // Prevenir que o erro quebre a aplicação
            event.preventDefault();
          }
        };

        errorHandlerRef.current = errorHandler;
        window.addEventListener("error", errorHandler, true); // Usar capture phase

        // Inicializar widget com try-catch adicional
        try {
          window.Calendly.initInlineWidget({
            url: finalUrl,
            parentElement: ref.current,
          });
        } catch (initError) {
          // Se houver erro na inicialização, aguardar um pouco e tentar novamente
          if (process.env.NODE_ENV === "development") {
            console.warn("[Calendly] Erro na inicialização, tentando novamente...", initError);
          }
          
          await new Promise<void>((resolve) => setTimeout(resolve, 500));
          
          // Segunda tentativa
          if (ref.current && window.Calendly) {
            window.Calendly.initInlineWidget({
              url: finalUrl,
              parentElement: ref.current,
            });
          } else {
            throw initError;
          }
        }

        // Remover error handler após sucesso (com delay para capturar erros iniciais)
        setTimeout(() => {
          if (errorHandlerRef.current) {
            window.removeEventListener("error", errorHandlerRef.current);
            errorHandlerRef.current = null;
          }
        }, 2000);

        setIsCalendlyInitialized(true);

        if (process.env.NODE_ENV === "development") {
          console.log("[Calendly] Widget inicializado com sucesso");
        }
      } catch (error) {
        const errorMsg = error instanceof Error 
          ? error.message 
          : "Erro ao inicializar calendário. Tente recarregar a página.";

        setErrorMessage(errorMsg);
        setLoadingState("error");

        if (process.env.NODE_ENV === "development") {
          console.error("[Calendly] Erro ao inicializar widget:", error);
        }

        // Retry automático para erros específicos
        if (error instanceof Error && (
          error.message.includes("não está pronto") ||
          error.message.includes("not ready") ||
          error.message.includes("split")
        )) {
          setTimeout(() => {
            if (!isCalendlyInitialized && retryCount < MAX_RETRIES) {
              if (process.env.NODE_ENV === "development") {
                console.log("[Calendly] Tentando retry automático...");
              }
              setIsCalendlyInitialized(false);
              setRetryCount((prev) => prev + 1);
              setLoadingState("loaded"); // Tentar novamente
            }
          }, 1500);
        }
      }
    };

    initializeWidget();

    // Cleanup: remover error handler se componente for desmontado
    return () => {
      if (errorHandlerRef.current) {
        window.removeEventListener("error", errorHandlerRef.current);
        errorHandlerRef.current = null;
      }
    };
  }, [loadingState, isCalendlyInitialized, retryCount]);

  // Função para retry
  const handleRetry = () => {
    if (retryCount >= MAX_RETRIES) {
      setErrorMessage("Número máximo de tentativas excedido. Recarregue a página.");
      return;
    }

    setRetryCount((prev) => prev + 1);
    setIsCalendlyInitialized(false);
    setLoadingState("loading");
    setErrorMessage("");

    // Forçar recarregamento removendo script se existir
    const existingScript = document.querySelector(
      `script[src="${CALENDLY_SCRIPT_URL}"]`
    ) as HTMLScriptElement;
    
    if (existingScript && existingScript.parentNode) {
      existingScript.parentNode.removeChild(existingScript);
    }
    
    scriptRef.current = null;
    
    // Resetar window.Calendly se necessário
    if (window.Calendly) {
      delete (window as any).Calendly;
    }

    // Recarregar script
    const timeoutPromise = new Promise<void>((_, reject) => {
      timeoutRef.current = setTimeout(() => {
        reject(new Error("Tempo de carregamento excedido. Tente novamente."));
      }, SCRIPT_LOAD_TIMEOUT);
    });

    Promise.race([loadCalendlyScript(), timeoutPromise])
      .then(() => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        setRetryCount(0); // Reset contador em caso de sucesso
      })
      .catch((error) => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        const errorMsg = error instanceof Error ? error.message : "Erro ao recarregar calendário";
        setErrorMessage(errorMsg);
        setLoadingState("error");
      });
  };

  return (
    <section id="agendar" className={cn("relative overflow-hidden py-28 lg:py-32", className)}>
      {/* SVG Gradient Definition */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Blue Radial Glow Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `radial-gradient(circle 600px at 50% 50%, rgba(59,130,246,0.18), transparent)`,
        }}
      />
      
      <div className="relative z-10 container max-w-5xl">
        <div className="space-y-3 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Agendar demonstração
          </h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            Escolha o melhor horário e veja, ao vivo, como nossa automação pode acelerar seus resultados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-1">
            <div className="text-foreground flex items-center gap-1.5">
              <Check 
                className="size-6 shrink-0" 
                strokeWidth={2}
                style={{ stroke: 'url(#gradient)' }}
              />
              <span className="text-sm">25–30 min</span>
            </div>
            <div className="text-foreground flex items-center gap-1.5">
              <Check 
                className="size-6 shrink-0" 
                strokeWidth={2}
                style={{ stroke: 'url(#gradient)' }}
              />
              <span className="text-sm">Sem compromisso</span>
            </div>
            <div className="text-foreground flex items-center gap-1.5">
              <Check 
                className="size-6 shrink-0" 
                strokeWidth={2}
                style={{ stroke: 'url(#gradient)' }}
              />
              <span className="text-sm">Funciona com as suas ferramentas</span>
            </div>
          </div>
        </div>

        <div className="mt-0" style={{ marginTop: '-33px' }}>
          {loadingState === "loading" && (
            <div className="flex h-[760px] flex-col items-center justify-center gap-4">
              <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-muted-foreground">Carregando calendário...</p>
            </div>
          )}

          {loadingState === "error" && (
            <div className="flex h-[760px] flex-col items-center justify-center gap-4 p-8">
              <AlertCircle className="size-12 text-destructive" />
              <div className="space-y-2 text-center">
                <p className="text-lg font-semibold">Erro ao carregar calendário</p>
                <p className="text-sm text-muted-foreground max-w-md">{errorMessage}</p>
              </div>
              <button
                onClick={handleRetry}
                disabled={retryCount >= MAX_RETRIES}
                className="mt-4 flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className="size-4" />
                Tentar novamente
              </button>
              {retryCount > 0 && retryCount < MAX_RETRIES && (
                <p className="text-xs text-muted-foreground">
                  Tentativa {retryCount} de {MAX_RETRIES}
                </p>
              )}
            </div>
          )}

          <div
            ref={ref}
            className={cn(
              "calendly-inline-widget rounded-lg overflow-hidden",
              loadingState !== "loaded" && "hidden"
            )}
            style={{
              minWidth: 320,
              height: 760,
              width: "100%",
            }}
            aria-label="Agendamento"
          />
        </div>
      </div>
    </section>
  );
};

