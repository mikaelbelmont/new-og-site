"use client";

import * as React from "react";
import { Image as ImageIcon, Package, Target, Zap } from "lucide-react";

import { cn } from "@/lib/utils";

interface Feature {
  id: string;
  icon: React.ReactNode;
  title: string;
  content: string;
}

const features: Feature[] = [
  {
    id: "modules",
    icon: <Package className="size-6" />,
    title: "20+ Módulos de integração",
    content: "Configure cada campo de dados conforme suas necessidades empresariais – desde validação de identidade até AML, KYC e muito mais.",
  },
  {
    id: "conversion",
    icon: <Zap className="size-6" />,
    title: "Otimizado para conversão",
    content: "Beneficie-se de pré-preenchimento de dados, interfaces dinâmicas, lembretes inteligentes e otimizações automáticas.",
  },
  {
    id: "collection",
    icon: <Target className="size-6" />,
    title: "Coleta de dados na primeira tentativa",
    content: "Adapte a coleta de dados em tempo real com base em pontuação de risco, políticas de conformidade e atributos de negócio.",
  },
];

export function Onboard() {
  const [activeFeature, setActiveFeature] = React.useState<string>(features[0].id);
  const [visibleFeatures, setVisibleFeatures] = React.useState<Set<string>>(new Set());
  const featureRefs = React.useRef<Map<string, HTMLLIElement>>(new Map());
  const rotationTimeoutRef = React.useRef<number | null>(null);

  // Intersection Observer para animações de scroll
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
              observer.unobserve(entry.target);
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

  // Auto-rotação de features com atraso menor ao voltar ao primeiro
  React.useEffect(() => {
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
    }

    const currentIndex = features.findIndex((f) => f.id === activeFeature);
    const nextIndex = (currentIndex + 1) % features.length;
    const delay = 4000; // tempo fixo de 4000ms entre todas as transições

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
    // Reset da rotação ao clicar
    if (rotationTimeoutRef.current) {
      clearTimeout(rotationTimeoutRef.current);
      rotationTimeoutRef.current = null;
    }
    setActiveFeature(featureId);
  };

  return (
    <section id="onboard" className="relative py-16 sm:py-20 md:py-24 lg:py-32 font-text overflow-hidden bg-background">
      <div className="container">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6 md:gap-8 lg:gap-12">
          {/* Left column: Image */}
          <div className="flex-1 lg:flex-[1_1_40%] min-w-0">
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
              {/* Label */}
              <span className="inline-block bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                Integração
              </span>

              {/* Heading */}
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold tracking-tight leading-tight">
                Optimize processos sem aumentar a equipa.
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Jornadas de integração de alta conversão — sem necessidade de código.
              </p>

              {/* Features List */}
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
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-5"
                      )}
                      style={{ transitionDelay: isVisible ? `${index * 100}ms` : undefined }}
                    >
                      <div className="space-y-2">
                        {/* Feature Toggle Button */}
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
                            {React.isValidElement(feature.icon) &&
                              React.cloneElement(feature.icon, {
                                className: "size-6",
                              } as React.Attributes)}
                          </span>
                          <span>{feature.title}</span>
                        </button>

                        {/* Feature Content */}
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-500 ease-out",
                            "pl-9 text-sm md:text-base text-muted-foreground leading-relaxed",
                            isActive
                              ? "max-h-40 opacity-100 mt-2"
                              : "max-h-0 opacity-0"
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
}

