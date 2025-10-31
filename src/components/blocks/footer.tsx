import Link from "next/link";

import { Button } from "@/components/ui/button";

export function Footer() {
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
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Pronto para acelerar seu negócio?
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          Comece hoje mesmo. Agende uma demonstração gratuita e veja como podemos automatizar seus processos, aumentar vendas e poupar tempo.
        </p>
        <div>
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
