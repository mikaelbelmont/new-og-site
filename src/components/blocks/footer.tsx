"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Footer() {
  const [visibleElements, setVisibleElements] = useState<Set<string>>(new Set());
  const elementRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const elements = ['cta-title', 'cta-description', 'cta-button'];
    
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

  const navigation = [
    { name: "Funcionalidades", href: "/#fine-ai" },
    { name: "FineAI", href: "/#fine-ai" },
    { name: "ChatBI", href: "/#chat-bi" },
    { name: "Agendar", href: "/#agendar" },
    { name: "FAQ", href: "/#faq" },
    { name: "Contatos", href: "/contact" },
  ];

  const legal = [{ name: "Privacy Policy", href: "/privacy" }];

  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container space-y-3 text-center">
        <h2 
          ref={(el) => {
            if (el) elementRefs.current.set('cta-title', el);
          }}
          className={cn(
            "text-2xl tracking-tight md:text-4xl lg:text-5xl transition-all duration-500 ease-out",
            visibleElements.has('cta-title') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
        >
          Pronto para acelerar seu negócio?
        </h2>
        <p 
          ref={(el) => {
            if (el) elementRefs.current.set('cta-description', el);
          }}
          className={cn(
            "text-muted-foreground mx-auto max-w-xl leading-snug text-balance transition-all duration-500 ease-out",
            visibleElements.has('cta-description') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
          style={{ transitionDelay: visibleElements.has('cta-description') ? '100ms' : undefined }}
        >
          Comece hoje mesmo. Agende uma demonstração gratuita e veja como podemos automatizar seus processos, aumentar vendas e poupar tempo.
        </p>
        <div 
          ref={(el) => {
            if (el) elementRefs.current.set('cta-button', el);
          }}
          className={cn(
            "transition-all duration-500 ease-out",
            visibleElements.has('cta-button') ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          )}
          style={{ transitionDelay: visibleElements.has('cta-button') ? '200ms' : undefined }}
        >
          <Button 
            size="lg" 
            className="mt-4" 
            asChild
            style={{
              background: 'linear-gradient(to right, #1447E6, #4A7FDE, rgba(111, 149, 189, 0.85))',
            }}
          >
            <a href="/#agendar">
            Agendar demonstração
            </a>
          </Button>
        </div>
      </div>

      <nav className="container flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {navigation.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="font-medium transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <ul className="flex flex-wrap items-center justify-center gap-6">
          {legal.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-muted-foreground text-sm transition-opacity hover:opacity-75"
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative w-full mt-65 select-none">
        <svg
          width="100%"
          height="450"
          viewBox="0 0 1200 300"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute bottom-0 left-0 w-full pointer-events-none"
        >
          <defs>
            <linearGradient id="verixian-fade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1F71FF" stopOpacity="0.6" />
              <stop offset="72%" stopColor="#1F71FF" stopOpacity="0" />
            </linearGradient>
          </defs>

          <text
            x="50%"
            y="85%"
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="260"
            fontWeight="800"
            fill="url(#verixian-fade)"
            fontFamily="dmSans, sans-serif"
          >
            Verixian
          </text>
        </svg>
      </div>

    </footer>
  );
}
