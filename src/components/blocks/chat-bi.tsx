"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, MessageSquare, Route, Sparkles } from "lucide-react";

import { ChatPanel } from "@/components/chat-panel";
import { cn } from "@/lib/utils";

import { DashedLine } from "../dashed-line";

const chatMessages = [
  {
    role: "user" as const,
    content: "Quantos novos clientes tivemos este mês?",
  },
  {
    role: "card" as const,
    content: (
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">47</div>
          <div className="text-xs text-muted-foreground mt-1">Novos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">+11%</div>
          <div className="text-xs text-muted-foreground mt-1">M/M</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-foreground">€2.4k</div>
          <div className="text-xs text-muted-foreground mt-1">Valor médio</div>
        </div>
      </div>
    ),
  },
  {
    role: "chips" as const,
    content: (
      <>
        {["Quantas chamadas hoje?", "Faturação do trimestre?", "Top 5 produtos?", "Taxa de conversão?"].map(
          (chip, i) => (
            <div
              key={i}
              className="rounded-full border border-primary/20 px-3 py-1 text-sm text-foreground bg-card"
            >
              {chip}
            </div>
          ),
        )}
      </>
    ),
  },
  {
    role: "user" as const,
    content: "Preciso de um portátil até 1200€",
  },
  {
    role: "bot" as const,
    content: "Sugeri 6 modelos (i7/i5) dentro do orçamento. Quer comparar?",
  },
  {
    role: "buttons" as const,
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium text-center">
          Ver lista
        </div>
        <div className="flex-1 px-4 py-2 rounded-lg border border-primary/20 text-foreground text-sm font-medium bg-card text-center">
          Pedir proposta
        </div>
      </div>
    ),
  },
  {
    role: "user" as const,
    content: "Qual é o status da fatura #1234?",
  },
  {
    role: "bot" as const,
    content: "Fatura #1234: Vencida há 15 dias. Cliente contactado 2x. Quer enviar lembrete?",
  },
  {
    role: "bot" as const,
    content: "Triagem rápida:",
  },
  {
    role: "buttons" as const,
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2 rounded-lg border border-primary/20 text-foreground text-sm font-medium bg-card text-center">
          Assistência
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-primary/20 text-foreground text-sm font-medium bg-card text-center">
          Vendas
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-primary/20 text-foreground text-sm font-medium bg-card text-center">
          Cobrança
        </div>
      </div>
    ),
  },
  {
    role: "user" as const,
    content: "Mostrar propostas pendentes",
  },
  {
    role: "bot" as const,
    content: "Encontrei 8 propostas pendentes. 3 aguardam aprovação há mais de 48h.",
  },
  {
    role: "user" as const,
    content: "Qual o tempo médio de resposta?",
  },
  {
    role: "card" as const,
    content: (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Tempo médio</span>
          <span className="text-lg font-bold text-foreground">4.2 min</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Meta</span>
          <span className="text-sm text-primary">✓ Dentro do objetivo</span>
        </div>
      </div>
    ),
  },
]

const features = [
  {
    icon: Brain,
    title: "Chat-BI integrado.",
    description: "Consulte KPIs, variação M/M e métricas operacionais diretamente por conversa."
  },
  {
    icon: Sparkles,
    title: "Recomendação inteligente.",
    description: "O sistema identifica a intenção do cliente e sugere produtos com especificações e preços relevantes."
  },
  {
    icon: Route,
    title: "Triagem automática.",
    description: "Botões de ação rápida direcionam pedidos para Assistência, Vendas ou Cobrança sem esforço manual."
  },
  {
    icon: MessageSquare,
    title: "Respostas contextuais.",
    description: "Cada interação é personalizada com base no histórico e dados do CRM."
  },
]

export function ChatBI() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const allElements = ['title', 'chat-panel', ...features.map((_, idx) => `feature-${idx}`)];
    
    allElements.forEach((elementId) => {
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

  return (
    <section id="chat-bi" className="relative overflow-hidden pb-28 lg:pb-32">
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
      
      <div className="relative z-10 pt-28 lg:pt-32">
        <h2 
          ref={(el) => {
            if (el) elementRefs.current.set('title', el);
          }}
          className={cn(
            "container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl transition-all duration-500 ease-out",
            visibleElements.has('title') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Chat-BI
        </h2>

        <div className="mt-8 md:mt-12 lg:mt-20">
          <div className="relative container flex max-md:flex-col">
            {/* Features Column */}
            <div className={cn("relative flex flex-col justify-between px-0 py-6 md:pl-6 md:pr-2 md:py-8 flex-1")}>
              <div className="space-y-8 md:space-y-10 lg:space-y-12">
                {features.map((feature, idx) => {
                  const Icon = feature.icon;
                  const isVisible = visibleElements.has(`feature-${idx}`);
                  return (
                    <div 
                      key={idx} 
                      ref={(el) => {
                        if (el) elementRefs.current.set(`feature-${idx}`, el);
                      }}
                      className={cn(
                        "text-balance space-y-2 transition-all duration-500 ease-out",
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      )}
                      style={{ transitionDelay: isVisible ? `${100 + (idx * 100)}ms` : undefined }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Icon 
                            className="size-8" 
                            strokeWidth={2}
                            style={{ stroke: 'url(#gradient)' }}
                          />
                        </div>
                        <h3 className="text-xl tracking-tight md:text-2xl lg:text-3xl font-semibold">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground text-base md:text-lg leading-relaxed">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <DashedLine orientation="vertical" className="absolute top-0 right-1/2 max-md:hidden" />

            {/* Chat Panel Column */}
            <div 
              ref={(el) => {
                if (el) elementRefs.current.set('chat-panel', el);
              }}
              className={cn(
                "relative flex flex-col justify-center px-0 py-6 md:pl-0 md:pr-6 md:py-8 flex-1 transition-all duration-500 ease-out",
                visibleElements.has('chat-panel') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: visibleElements.has('chat-panel') ? '100ms' : undefined }}
            >
              <ChatPanel messages={chatMessages} title="Chat-BI" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

