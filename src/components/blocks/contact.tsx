import React from "react";

import Link from "next/link";

import { Mail, MessageCircle, CalendarCheck } from "lucide-react";

import { DashedLine } from "@/components/dashed-line";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    title: "E-mail",
    icon: Mail,
    description: "Prefere e‑mail? Envie-nos a sua mensagem e responderemos rapidamente.",
    content: (
      <div className="mt-3">
        <Link
          href="mailto:contato@verixian.com"
          className="text-muted-foreground hover:text-foreground"
        >
          <span>contato@verixian.com</span>
        </Link>
      </div>
    ),
  },
  {
    title: "WhatsApp",
    icon: MessageCircle,
    description: "Fale connosco pelo WhatsApp para um contacto mais rápido.",
    content: (
      <div className="mt-3">
        <Link
          href="https://wa.me/5511999999999"
          className="text-muted-foreground hover:text-foreground"
          target="_blank"
          rel="noopener noreferrer"
        >
          +55 XX XXXXX-XXXX
        </Link>
      </div>
    ),
  },
];

export default function Contact() {
  return (
    <section className="pt-28 pb-28 lg:pt-32 lg:pb-32">
      {/* SVG Gradient Definition for icon styling */}
      <svg className="absolute w-0 h-0">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#2563EB" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
        </defs>
      </svg>
      <div className="container max-w-2xl">
        <h1 className="text-center text-2xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
          Entre em contacto
        </h1>
        <p className="text-muted-foreground mt-4 text-center leading-snug font-medium lg:mx-auto">
          Estamos disponíveis para esclarecer dúvidas, partilhar ideias e mostrar como a Verixian pode ajudar o seu negócio a automatizar processos, aumentar vendas e poupar tempo.
        </p>

        {/* Seção sobre reunião */}
        <div className="mt-10 md:mt-14 lg:mt-20">
          <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
            <CalendarCheck
              className="size-6"
              strokeWidth={2}
              style={{ stroke: 'url(#gradient)' }}
            />
            Agende uma reunião
          </h2>
          <p className="text-muted-foreground leading-snug">
            Oferecemos reuniões gratuitas para entender suas necessidades e demonstrar como a Verixian pode automatizar seus processos, aumentar vendas e poupar tempo. Durante a reunião, você conhecerá nossa plataforma, verá exemplos práticos de automação e poderá fazer perguntas sobre como podemos ajudar seu negócio.
          </p>
          <div className="mt-6">
            <Button 
              size="lg" 
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

        <DashedLine className="my-8" />

        {/* Informações de contato */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-center md:text-left">
            Outras formas de contacto
          </h2>
          <div className="space-y-6 md:space-y-8 lg:space-y-10">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
              <div key={index}>
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                  {Icon && (
                    <Icon
                      className="size-6"
                      strokeWidth={2}
                      style={{ stroke: 'url(#gradient)' }}
                    />
                  )}
                  {info.title}
                </h3>
                <p className="text-muted-foreground leading-snug mb-3">
                  {info.description}
                </p>
                <div className="text-muted-foreground leading-snug">
                  {info.content}
                </div>
              </div>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
