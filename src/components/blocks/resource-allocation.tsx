"use client";

import Image from "next/image";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { DashedLine } from "../dashed-line";
import MagnetLines from "../MagnetLines";

import { cn } from "@/lib/utils";

const topItems = [
  {
    title: "Automações personalizadas.",
    description:
      "Configure fluxos que se adaptam ao seu negócio. Automatize tarefas repetitivas e aumente a produtividade.",
    images: [
      {
        src: "/resource-allocation/templates.webp",
        alt: "Interface de modelos",
        width: 495,
        height: 186,
      },
    ],
    className:
      "flex-1 [&>.title-container]:mb-12 md:[&>.title-container]:mb-12 [&>.title-container]:translate-x-[43px] [&>.title-container>p]:max-w-[calc(100%-30px)] [&>.image-container]:translate-x-[43px] py-0 justify-start xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: [""],
    useMagnetLines: true,
  },
  {
    title: "Integre suas ferramentas.",
    description: "Conecte suas ferramentas favoritas mantendo a operação sempre alinhada, com tarefas automáticas e alertas na hora exata.",
    images: [
      { src: "/logos/jira.svg", alt: "Jira logo", width: 48, height: 48 },
      { src: "/logos/excel.svg", alt: "Excel logo", width: 48, height: 48 },
      {
        src: "/logos/notion.svg",
        alt: "Notion logo",
        width: 48,
        height: 48,
      },
      { src: "/logos/word.svg", alt: "Word logo", width: 48, height: 48 },
      {
        src: "/logos/monday.svg",
        alt: "Monday logo",
        width: 48,
        height: 48,
      },
      {
        src: "/logos/drive.svg",
        alt: "Google Drive logo",
        width: 48,
        height: 48,
      },
      {
        src: "/logos/jira.svg",
        alt: "Jira logo",
        width: 48,
        height: 48,
      },
      { src: "/logos/asana.svg", alt: "Asana logo", width: 48, height: 48 },
    ],
    className:
      "flex-1 [&>.title-container]:mb-5 md:[&>.title-container]:mb-8 md:[&>.title-container]:translate-x-2 xl:[&>.title-container]:translate-x-4 [&>.title-container]:translate-x-0",
    fade: [],
  },
];

const bottomItems = [
  {
    title: "Processamento de documentos.",
    description:
      "Extraia, organize e valide informações automaticamente a partir de PDFs, imagens e formulários.",
    images: [
      {
        src: "/resource-allocation/propostas.webp",
        alt: "Interface de gestão de propostas",
        width: 351,
        height: 322,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-0 [&>.title-container]:translate-x-[4px] [&>.image-container]:-translate-x-[20px] [&>.image-container]:mt-[5px] xl:[&>.image-container]:translate-x-[6px]",
    fade: ["bottom"],
  },
  {
    title: "Gestão de propostas.",
    description:
      "Acompanhe o ciclo completo de cada proposta. Alertas automáticos de pendências e oportunidades em risco.",
    images: [
      {
        src: "/resource-allocation/pipeline.webp",
        alt: "Interface de pipeline de vendas",
        width: 288,
        height: 93,
      },
    ],
    className:
      "justify-normal [&>.title-container]:mb-5 md:[&>.title-container]:mb-0 [&>.image-container]:flex-1 md:[&>.image-container]:place-items-center [&>.image-container]:mt-[5px]",
    fade: [""],
  },
  {
    title: "Chat inteligente.",
    description:
      "Insights imediatos para você ter controle total do seu negócio. Todas as métricas na sua mão.",
    images: [
      {
        src: "/resource-allocation/notifications.webp",
        alt: "Interface de notificações",
        width: 305,
        height: 280,
      },
    ],
    className:
      "[&>.title-container]:mb-5 md:[&>.title-container]:mb-0 xl:[&>.image-container]:translate-x-6 [&>.image-container]:translate-x-2",
    fade: ["bottom"],
    useChat: true,
  },
];

const messages = [
  { type: "user", text: "Quantas chamadas tivemos hoje?" },
  { type: "bot", text: "47 chamadas registadas hoje." },
  { type: "user", text: "Novos clientes este mês?" },
  { type: "bot", text: "23 novos clientes. +15% vs mês anterior." },
  { type: "user", text: "Faturação?" },
  { type: "bot", text: "€127.450. +11% M/M 📈" },
];

const ChatMock = () => {
  const [visibleMessages, setVisibleMessages] = useState(0);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setVisibleMessages((prev) => {
          if (prev < messages.length) return prev + 1;
          return prev;
        });
      }, 800);

      return () => clearInterval(timer);
    }, 300);

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 space-y-3 border border-slate-200">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200">
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
          V
        </div>
        <div>
          <div className="font-semibold text-slate-800 text-sm">Chat-BI Verixian</div>
          <div className="text-xs text-slate-600">Online</div>
        </div>
      </div>

      <div className="space-y-2 h-auto overflow-visible">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: idx < visibleMessages ? 1 : 0, y: idx < visibleMessages ? 0 : 8 }}
            transition={{ duration: 0.25 }}
            className={`flex ${idx < visibleMessages ? "visible" : "invisible"} ${msg.type === "user" ? "justify-end items-end" : "justify-start items-start"}`}
          >
            <div
              className={`max-w-[80%] px-3 py-1.5 rounded-2xl shadow-sm ${
                msg.type === "user"
                  ? "bg-blue-600 text-white rounded-tr-md"
                  : "bg-white text-slate-800 border border-slate-200 rounded-tl-md"
              }`}
            >
              <p className="text-xs leading-relaxed">{msg.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export const ResourceAllocation = () => {
  return (
    <section
      id="resource-allocation"
      className="relative overflow-hidden pb-28 lg:pb-32"
    >
      {/* Soft Blue Radial Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: "radial-gradient(circle at top center, rgba(71, 139, 194, 0.08), transparent 70%)",
        }}
      />
      
      <div className="pt-28 lg:pt-32">
        <h2 className="container text-center text-3xl tracking-tight text-balance sm:text-4xl md:text-5xl lg:text-6xl">
         Funcionalidades
        </h2>

        <div className="mt-8 md:mt-12 lg:mt-20">
          {/* Top Features Grid - 2 items */}
          <div className="relative container flex max-md:flex-col">
            {topItems.map((item, i) => (
              <Item key={i} item={item} isLast={i === topItems.length - 1} />
            ))}
          </div>
          <DashedLine
            orientation="horizontal"
            className="container max-w-7xl scale-x-110"
          />

          {/* Bottom Features Grid - 3 items */}
          <div className="relative container grid max-w-7xl md:grid-cols-3">
            {bottomItems.map((item, i) => (
              <Item
                key={i}
                item={item}
                isLast={i === bottomItems.length - 1}
                className="md:pb-0"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ItemProps {
  item: (typeof topItems)[number] | (typeof bottomItems)[number];
  isLast?: boolean;
  className?: string;
}

const Item = ({ item, isLast, className }: ItemProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col justify-between px-0 py-6 md:px-6 md:py-8",
        className,
        item.className,
      )}
    >
      <div className="title-container space-y-2">
        <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{item.title}</h3>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-normal">{item.description}</p>
      </div>

      {"useChat" in item && item.useChat ? (
        <div className="image-container">
          <div className="w-[85%] max-w-[85%] -translate-y-[7px]">
            <ChatMock />
          </div>
        </div>
      ) : "useMagnetLines" in item && item.useMagnetLines ? (
        <div className="image-container flex items-center justify-center max-w-[840px] mx-auto" style={{ transform: 'translateX(-15px)', marginTop: '-10px' }}>
          <MagnetLines
            rows={9}
            columns={27}
            containerSize="135px"
            lineColor="#1447E6"
            lineWidth="2px"
            lineHeight="14px"
            baseAngle={-10}
            style={{ width: '425px', height: '135px' }}
          />
        </div>
      ) : item.images.length > 4 ? (
        <div className="relative overflow-hidden">
          <div className="flex flex-col gap-5">
            {/* First row - right aligned */}
            <div className="flex translate-x-4 justify-end gap-5">
              {item.images.slice(0, 4).map((image, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl p-2 lg:size-20"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain object-left-top"
                  />
                </div>
              ))}
            </div>
            {/* Second row - left aligned */}
            <div className="flex -translate-x-4 gap-5">
              {item.images.slice(4).map((image, j) => (
                <div
                  key={j}
                  className="bg-background grid aspect-square size-16 place-items-center rounded-2xl lg:size-20"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className="object-contain object-left-top"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="image-container grid grid-cols-1 gap-4" style={
          item.title === "Gestão de propostas." 
            ? { transform: 'translateX(-20px)', marginTop: '5px' }
            : undefined
        }>
          {item.images.map((image, j) => (
            <Image
              key={j}
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              className="object-contain object-left-top"
            />
          ))}
        </div>
      )}

      {!isLast && (
        <>
          <DashedLine
            orientation="vertical"
            className="absolute top-0 right-0 max-md:hidden"
          />
          <DashedLine
            orientation="horizontal"
            className="absolute inset-x-0 bottom-0 md:hidden"
          />
        </>
      )}
    </div>
  );
};
