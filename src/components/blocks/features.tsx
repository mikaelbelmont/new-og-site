"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import { ChevronRight } from "lucide-react";

import { DashedLine } from "../dashed-line";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

const items = [
  {
    title: "Purpose-built for product development",
    image: "/features/triage-card.svg",
  },
  {
    title: "Manage projects end-to-end",
    image: "/features/cycle-card.svg",
  },
  {
    title: "Build momentum and healthy habits",
    image: "/features/overview-card.svg",
  },
];

export const Features = () => {
  const [visibleItems, setVisibleItems] = React.useState<Set<number>>(new Set());
  const itemRefs = React.useRef<Map<number, HTMLDivElement>>(new Map());

  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    items.forEach((_, index) => {
      const ref = itemRefs.current.get(index);
      if (!ref) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set(prev).add(index));
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
    <section id="feature-modern-teams" className="pb-28 lg:pb-32">
      <div className="container">
        {/* Top dashed line with text */}
        <div className="relative flex items-center justify-center">
          <DashedLine className="text-muted-foreground" />
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            MEASURE TWICE. CUT ONCE.
          </span>
        </div>

        {/* Content */}
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Made for modern product teams
          </h2>
          <p className="text-muted-foreground leading-snug">
            Verixian is built on the habits that make the best product teams
            successful: staying focused, moving quickly, and always aiming for
            high-quality work.
          </p>
        </div>

        {/* Features Card */}
        <Card className="mt-8 rounded-3xl md:mt-12 lg:mt-20">
          <CardContent className="flex p-0 max-md:flex-col">
            {items.map((item, i) => {
              const isVisible = visibleItems.has(i);
              return (
              <div 
                key={i} 
                ref={(el) => {
                  if (el) itemRefs.current.set(i, el);
                }}
                className={cn(
                  "flex flex-1 max-md:flex-col transition-all duration-500 ease-out",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                )}
                style={{ transitionDelay: isVisible ? `${i * 100}ms` : undefined }}
              >
                <div className="flex-1 p-4 pe-0! md:p-6">
                  <div className="relative aspect-[1.28/1] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.title} interface`}
                      fill
                      className="object-cover object-left-top ps-4 pt-2"
                    />
                    <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent" />
                  </div>

                  <Link
                    href="#"
                    className={
                      "group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6"
                    }
                  >
                    <h3 className="font-display max-w-60 text-2xl leading-tight font-bold tracking-tight">
                      {item.title}
                    </h3>
                    <div className="rounded-full border p-2">
                      <ChevronRight className="size-6 transition-transform group-hover:translate-x-1 lg:size-9" />
                    </div>
                  </Link>
                </div>
                {i < items.length - 1 && (
                  <div className="relative hidden md:block">
                    <DashedLine orientation="vertical" />
                  </div>
                )}
                {i < items.length - 1 && (
                  <div className="relative block md:hidden">
                    <DashedLine orientation="horizontal" />
                  </div>
                )}
              </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
