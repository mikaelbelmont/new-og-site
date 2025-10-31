import {
  Blend,
  ChartNoAxesColumn,
  CircleDot,
  Diamond,
} from "lucide-react";
import Image from "next/image";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Tailored workflows",
    description: "Track progress across custom issue flows for your team.",
    icon: CircleDot,
  },
  {
    title: "Cross-team projects",
    description: "Collaborate across teams and departments.",
    icon: Blend,
  },
  {
    title: "Milestones",
    description: "Break projects down into concrete phases.",
    icon: Diamond,
  },
  {
    title: "Progress insights",
    description: "Track scope, velocity, and progress over time.",
    icon: ChartNoAxesColumn,
  },
];

export const Hero = () => {
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
          quality={90}
        />
        {/* Gradient overlay fading from transparent to background */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-background" />
      </div>

      <div className="container pt-8 md:pt-12 lg:pt-16">
        <div className="relative z-10">
          <h1 className="text-5xl tracking-tight md:text-6xl lg:text-7xl">
          <span className="text-foreground">Automatize processos.</span><br />
          <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">Aumente vendas.</span><br /> 
          <span className="text-foreground">Poupe tempo.</span><br />
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg mt-5 md:text-xl">
          Acelere Vendas, Assistência, Cobrança e Crédito e Propostas com fluxos inteligentes, de ponta a ponta.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
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
