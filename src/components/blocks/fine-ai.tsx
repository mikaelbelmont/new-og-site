"use client";

import * as React from "react";
import { CheckCircle, Image as ImageIcon, Rocket, Shield } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number;   style?: React.CSSProperties }>;
  title: string;
  content: string;
}

const features: Feature[] = [
  {
    id: "modules",
    icon: Rocket,
    title: "Velocidade sem esforço",
    content:
      "Processa propostas em segundos com leitura automática de campos e preenchimento inteligente. Elimine tarefas repetitivas e ganhe tempo para o que realmente importa — fechar negócios.",
  },
  {
    id: "conversion",
    icon: CheckCircle,
    title: "Menos erros, mais produtividade",
    content:
      "Beneficie-se de validações automáticas, pré-preenchimento de dados e deteção de inconsistências em tempo real. Reduza falhas humanas e mantenha a precisão em todas as etapas do processo.",
  },
  {
    id: "collection",
    icon: Shield,
    title: "Total conformidade e segurança",
    content:
      "Os dados são tratados com encriptação ponta a ponta e seguem normas de conformidade como o RGPD. Cada proposta é processada com rastreabilidade e controlo total de acesso.",
  },
];

export const FineAI = () => {
  const [activeFeature, setActiveFeature] = React.useState<string>(features[0].id);
  const [visibleFeatures, setVisibleFeatures] = React.useState<Set<string>>(new Set());
  const [visibleElements, setVisibleElements] = React.useState<Set<string>>(new Set());
  const featureRefs = React.useRef<Map<string, HTMLLIElement>>(new Map());
  const elementRefs = React.useRef<Map<string, HTMLDivElement>>(new Map());
  const rotationTimeoutRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    features.forEach((feature) => {
      const ref = featureRefs.current.get(feature.id);
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleFeatures((prev) => new Set(prev).add(feature.id));
              observer.unobserve(entry.target as Element);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = ['title', 'image', 'heading', 'description'];
    
    elements.forEach((elementId) => {
      const ref = elementRefs.current.get(elementId);
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleElements((prev) => new Set(prev).add(elementId));
              observer.unobserve(entry.target as Element);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  React.useEffect(() => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
    }
    const currentIndex = features.findIndex((f) => f.id === activeFeature);
    const nextIndex = (currentIndex + 1) % features.length;
    const delay = 4000;
    rotationTimeoutRef.current = window.setTimeout(() => {
      setActiveFeature(features[nextIndex].id);
    }, delay);
    return () => {
      if (rotationTimeoutRef.current) {
        clearTimeout(rotationTimeoutRef.current);
        rotationTimeoutRef.current = null;
      }
    };
  }, [activeFeature]);

  const handleFeatureClick = (featureId: string) => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
      rotationTimeoutRef.current = null;
    }
    setActiveFeature(featureId);
  };

  return (
    <section id="fine-ai" className="relative py-16 sm:py-20 md:py-24 lg:py-32 font-text overflow-hidden">
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
      
      {/* Steel Blue Radial Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, 
              rgba(59, 130, 246, 0.12) 0%, 
              rgba(59, 130, 246, 0.07) 25%, 
              rgba(59, 130, 246, 0.03) 35%, 
              transparent 50%
            )
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      <div className="relative z-10 container">
        {/* Section Title */}
        <div 
          ref={(el) => {
            if (el) elementRefs.current.set('title', el);
          }}
          className={cn(
            "mb-8 sm:mb-10 md:mb-12 transition-all duration-500 ease-out",
            visibleElements.has('title') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center">
            Fine AI
          </h2>
        </div>
        {/* Substituted content: Onboard-like section */}
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8 lg:gap-12">
          {/* Left column: Image placeholder */}
          <div 
            ref={(el) => {
              if (el) elementRefs.current.set('image', el);
            }}
            className={cn(
              "flex-1 lg:flex-[1_1_40%] min-w-0 transition-all duration-500 ease-out",
              visibleElements.has('image') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: visibleElements.has('image') ? '100ms' : undefined }}
          >
            <div className="relative w-full aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              <div className="relative w-full h-full rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-muted/50 shadow-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-3">
                    <ImageIcon className="size-16 md:size-20 mx-auto text-primary/40" />
                    <p className="text-sm md:text-base text-muted-foreground">Módulos de Integração</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: Content */}
          <div className="flex-1 lg:flex-[1_1_45%] min-w-0">
            <div className="space-y-4 md:space-y-8">
              <h3 
                ref={(el) => {
                  if (el) elementRefs.current.set('heading', el);
                }}
                className={cn(
                  "text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-tight transition-all duration-500 ease-out",
                  visibleElements.has('heading') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: visibleElements.has('heading') ? '200ms' : undefined }}
              >
              Automatize o processamento de propostas
              </h3>

              <p 
                ref={(el) => {
                  if (el) elementRefs.current.set('description', el);
                }}
                className={cn(
                  "text-lg md:text-xl text-muted-foreground leading-relaxed transition-all duration-500 ease-out",
                  visibleElements.has('description') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: visibleElements.has('description') ? '300ms' : undefined }}
              >
                Otimize processos sem aumentar a equipa: extração inteligente, validação automática e integração direta com as ferramentas que já utiliza, tudo sem código.
              </p>

              <ul className="list-none p-0 m-0 space-y-10 md:space-y-12">
                {features.map((feature, index) => {
                  const isActive = activeFeature === feature.id;
                  const isVisible = visibleFeatures.has(feature.id);
                  return (
                    <li
                      key={feature.id}
                      ref={(el) => {
                        if (el) featureRefs.current.set(feature.id, el);
                      }}
                      className={cn(
                        "transition-all duration-500 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      )}
                      style={{ transitionDelay: isVisible ? `${400 + (index * 100)}ms` : undefined }}
                    >
                      <div className="space-y-2">
                        <button
                          onClick={() => handleFeatureClick(feature.id)}
                          className={cn(
                            "flex items-center w-full text-left bg-transparent border-none p-0 m-0",
                            "text-base md:text-lg font-semibold cursor-pointer outline-none",
                            "transition-colors duration-200",
                            "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm",
                            isActive ? "text-foreground" : "text-foreground/80"
                          )}
                          aria-expanded={isActive}
                        >
                          <span className="mr-4 flex-shrink-0 text-xl leading-none">
                            <div className="relative">
                              {React.createElement(feature.icon, {
                                className: "size-8",
                                strokeWidth: 2,
                                style: { stroke: 'url(#gradient)' }
                              })}
                            </div>
                          </span>
                          <span>{feature.title}</span>
                        </button>

                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-500 ease-out",
                            "pl-12 text-sm md:text-base text-muted-foreground leading-relaxed",
                            isActive ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                          )}
                        >
                          {feature.content}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

