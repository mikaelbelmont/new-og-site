"use client";

import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

const Scheduling = ({ className }: { className?: string }) => {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    // Initialize Calendly widget after component mounts
    if (typeof window !== 'undefined' && window.Calendly) {
      // Save current scroll position
      const currentScrollY = window.scrollY;
      const currentScrollX = window.scrollX;
      
      // Initialize widget
      window.Calendly.initInlineWidget({
        url: 'https://calendly.com/mikael-bb2002/30min?hide_event_type_details=1&hide_gdpr_banner=1',
        parentElement: document.getElementById('calendly-embed'),
        prefill: {},
        utm: {}
      });
      
      // Restore scroll position immediately after initialization
      window.scrollTo(currentScrollX, currentScrollY);
      
      // Use requestAnimationFrame to ensure scroll position is maintained
      // even if Calendly tries to scroll again
      requestAnimationFrame(() => {
        window.scrollTo(currentScrollX, currentScrollY);
      });
      
      // Additional check after a short delay
      setTimeout(() => {
        window.scrollTo(currentScrollX, currentScrollY);
      }, 100);
    }
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = ['title', 'description', 'badges', 'calendly'];
    
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

  return (
    <section id="agendar" className={cn("relative overflow-hidden pt-28 pb-0 lg:pt-32 lg:pb-0", className)}>
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
          <h2 
            ref={(el) => {
              if (el) elementRefs.current.set('title', el);
            }}
            className={cn(
              "text-2xl tracking-tight md:text-4xl lg:text-5xl transition-all duration-500 ease-out",
              visibleElements.has('title') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
          >
            Agendar demonstração
          </h2>
          <p 
            ref={(el) => {
              if (el) elementRefs.current.set('description', el);
            }}
            className={cn(
              "text-muted-foreground mx-auto max-w-xl leading-snug text-balance transition-all duration-500 ease-out",
              visibleElements.has('description') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: visibleElements.has('description') ? '100ms' : undefined }}
          >
            Escolha o melhor horário e veja, ao vivo, como nossa automação pode acelerar seus resultados.
          </p>
          <div 
            ref={(el) => {
              if (el) elementRefs.current.set('badges', el);
            }}
            className={cn(
              "flex flex-wrap items-center justify-center gap-4 pt-1 transition-all duration-500 ease-out",
              visibleElements.has('badges') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
            )}
            style={{ transitionDelay: visibleElements.has('badges') ? '200ms' : undefined }}
          >
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

        {/* Calendly inline widget container */}
        <div 
          ref={(el) => {
            if (el) elementRefs.current.set('calendly', el);
          }}
          className={cn(
            "mt-0 transition-all duration-500 ease-out",
            visibleElements.has('calendly') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
          style={{ 
            marginTop: '-33px',
            transitionDelay: visibleElements.has('calendly') ? '300ms' : undefined
          }}
        >
          <div
            id="calendly-embed"
            className="rounded-lg overflow-hidden"
            style={{
              minWidth: 320,
              height: 1100,
              width: "100%",
            }}
            aria-label="Agendamento"
          />
        </div>
      </div>
    </section>
  );
};

export { Scheduling };
