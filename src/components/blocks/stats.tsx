"use client";

import { useEffect, useRef, useState } from "react";
import CountUp from "react-countup";
import { useInView } from "motion/react";

import { cn } from "@/lib/utils";

const stats = [
  {
    id: "stat1",
    value: 10.6,
    suffix: "x",
    label: "Faster onboarding",
    decimals: 1,
  },
  {
    id: "stat2",
    value: 37,
    suffix: "%",
    label: "Conversion increase",
    decimals: 0,
  },
  {
    id: "stat3",
    value: 4.8,
    suffix: "x",
    label: "Analyst efficiency",
    decimals: 1,
  },
];

export const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  const [visibleStats, setVisibleStats] = useState<Set<string>>(new Set());
  const statRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    stats.forEach((stat) => {
      const statRef = statRefs.current.get(stat.id);
      if (!statRef) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleStats((prev) => new Set(prev).add(stat.id));
              observer.unobserve(entry.target as Element);
            }
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(statRef);
      observers.push(observer);
    });
    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section id="stats" ref={ref} className="py-3 lg:py-6">
      <div className="container">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between border-b pb-8 md:gap-4 lg:gap-8">
          {stats.map((stat, index) => {
            const isVisible = visibleStats.has(stat.id);
            return (
            <div 
              key={stat.id} 
              ref={(el) => {
                if (el) statRefs.current.set(stat.id, el);
              }}
              className={cn(
                "relative flex-1 text-center transition-all duration-500 ease-out",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              )}
              style={{ transitionDelay: isVisible ? `${index * 100}ms` : undefined }}
            >
              {/* Divider line for items after the first */}
              {index > 0 && (
                <div className="absolute left-0 top-1/2 hidden h-[60%] -translate-y-1/2 border-l md:block" />
              )}

              <div className="relative inline-block">
                {isInView ? (
                  <CountUp
                    start={0}
                    end={stat.value}
                    duration={2.5}
                    decimals={stat.decimals}
                    className="text-foreground font-display text-4xl font-semibold leading-none md:text-5xl lg:text-6xl"
                  />
                ) : (
                  <span className="text-foreground font-display text-4xl font-semibold leading-none md:text-5xl lg:text-6xl">
                    0
                  </span>
                )}
                <span className="text-foreground font-display text-4xl font-semibold leading-none md:text-5xl lg:text-6xl">
                  {stat.suffix}
                </span>
              </div>

              <div className="text-muted-foreground mt-2 text-sm md:text-base">
                {stat.label}
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
