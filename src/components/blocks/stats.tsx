"use client";

import { useRef } from "react";
import CountUp from "react-countup";
import { useInView } from "motion/react";

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

  return (
    <section id="stats" ref={ref} className="py-3 lg:py-6">
      <div className="container">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between border-b pb-8 md:gap-4 lg:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.id} className="relative flex-1 text-center">
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
          ))}
        </div>
      </div>
    </section>
  );
};
