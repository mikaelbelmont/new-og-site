"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Hero = () => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = ['title', 'description', 'cta'];
    
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
        { threshold: 0.1 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-28 lg:pt-36 lg:pb-32">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/wirenet.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
        {/* Gradient overlay fading from transparent to background */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container pt-8 md:pt-12 lg:pt-16">
        <div className="relative z-10">
          <h1 
            ref={(el) => {
              if (el) elementRefs.current.set('title', el);
            }}
            className={cn(
              "text-5xl tracking-tight md:text-6xl lg:text-7xl transition-all duration-500 ease-out",
              visibleElements.has('title') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
          <span className="text-foreground">Automatize processos.</span><br />
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">Aumente vendas.</span><br /> 
          <span className="text-foreground">Poupe tempo.</span><br />
          </h1>

          <p 
            ref={(el) => {
              if (el) elementRefs.current.set('description', el);
            }}
            className={cn(
              "text-muted-foreground max-w-2xl text-lg mt-5 md:text-xl transition-all duration-500 ease-out",
              visibleElements.has('description') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: visibleElements.has('description') ? '100ms' : undefined }}
          >
          Acelere Vendas, Assistência, Cobrança e Crédito e Propostas com fluxos inteligentes, de ponta a ponta.
          </p>

          <div 
            ref={(el) => {
              if (el) elementRefs.current.set('cta', el);
            }}
            className={cn(
              "mt-8 flex flex-wrap items-center gap-4 transition-all duration-500 ease-out",
              visibleElements.has('cta') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: visibleElements.has('cta') ? '200ms' : undefined }}
          >
            <Button 
              asChild
              style={{
                background: 'linear-gradient(to right, #1447E6, #4A7FDE, rgba(111, 149, 189, 0.85))',
              }}
            >
              <a href="#agendar">
              Agendar demonstração
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
