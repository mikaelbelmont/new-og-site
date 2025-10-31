import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const categories = [
  {
    title: "Implementação e integração",
    questions: [
      {
        question: "Quanto tempo leva para implementar a plataforma?",
        answer:
          "O tempo de implementação varia conforme a complexidade dos seus processos. Implementações básicas podem estar operacionais em poucos dias, enquanto configurações mais personalizadas podem levar algumas semanas. Nossa equipe trabalha com você para acelerar o processo.",
      },
      {
        question: "Como funciona a integração com meus sistemas existentes?",
        answer:
          "Conectamos com as principais ferramentas que você já usa: Jira, Notion, Excel, Google Drive, Monday, entre outras. Oferecemos APIs robustas e nossa equipe técnica auxilia na configuração das integrações conforme suas necessidades.",
      },
      {
        question: "Preciso de conhecimento técnico para usar a plataforma?",
        answer:
          "Não é necessário. A plataforma foi projetada para ser intuitiva. Nossa equipe oferece treinamento completo e suporte contínuo para garantir que você aproveite todos os recursos disponíveis.",
      },
    ],
  },
  {
    title: "Funcionalidades",
    questions: [
      {
        question: "O que é o Chat-BI e como ele funciona?",
        answer:
          "O Chat-BI é um assistente inteligente que permite consultar KPIs, métricas de vendas, assistência e cobrança através de conversas naturais. Você pode perguntar sobre faturação, novos clientes, status de propostas e receber respostas instantâneas com dados atualizados.",
      },
      {
        question: "Como as automações de processo funcionam?",
        answer:
          "Você configura fluxos personalizados que automatizam tarefas repetitivas. As automações podem incluir alertas de propostas pendentes, direcionamento de chamadas, follow-ups automáticos e muito mais. Cada fluxo é adaptado ao seu negócio.",
      },
      {
        question: "A plataforma ajuda a gerenciar o pipeline de vendas?",
        answer:
          "Sim. Você visualiza todas as oportunidades em cada etapa do funil, acompanha propostas pendentes, recebe alertas automáticos sobre riscos e tem previsão de fechamento mais precisa. Tudo centralizado em um único lugar.",
      },
    ],
  },
  {
    title: "Suporte e informações",
    questions: [
      {
        question: "Vocês oferecem período de teste ou demonstração?",
        answer:
          "Sim. Oferecemos demonstração personalizada para mostrar como a plataforma pode atender às suas necessidades específicas. Entre em contato ou agende uma reunião para conhecer todos os recursos.",
      },
      {
        question: "Que tipo de suporte está incluído?",
        answer:
          "Todos os clientes recebem suporte técnico completo. Nossa equipe está disponível para ajudar com configurações, dúvidas sobre funcionalidades e otimizações dos seus fluxos. Também oferecemos treinamento para sua equipe.",
      },
      {
        question: "Meus dados estão seguros na plataforma?",
        answer:
          "Sim. Segurança e privacidade dos dados são prioridades. Utilizamos as melhores práticas de segurança, criptografia e cumprimos com os requisitos de proteção de dados. Seus dados são protegidos e você mantém controle total sobre eles.",
      },
    ],
  },
];

export const FAQ = ({
  headerTag = "h2",
  className,
  className2,
}: {
  headerTag?: "h1" | "h2";
  className?: string;
  className2?: string;
}) => {
  return (
    <section id="faq" className={cn("py-28 lg:py-32", className)}>
      <div className="container max-w-5xl">
        <div className={cn("mx-auto grid gap-16 lg:grid-cols-2", className2)}>
          <div className="space-y-4">
            {headerTag === "h1" ? (
              <h1 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Tem perguntas?
              </h1>
            ) : (
              <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
                Tem perguntas?
              </h2>
            )}
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              Se não encontrar o que procura,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                entre em contacto
              </Link>
              .
            </p>
          </div>

          <div className="grid gap-6 text-start">
            {categories.map((category, categoryIndex) => (
              <div key={category.title} className="">
                <h3 className="text-muted-foreground border-b py-4">
                  {category.title}
                </h3>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((item, i) => (
                    <AccordionItem key={i} value={`${categoryIndex}-${i}`}>
                      <AccordionTrigger>{item.question}</AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
