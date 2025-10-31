# Chat-BI - Guia Completo de Implementação

## 📋 Índice

1. [Introdução](#introdução)
2. [Funcionalidades](#funcionalidades)
3. [Pré-requisitos](#pré-requisitos)
4. [Arquitetura de Componentes](#arquitetura-de-componentes)
5. [Implementação Completa do Código](#implementação-completa-do-código)
6. [Tópicos e Recursos do Chat-BI](#tópicos-e-recursos-do-chat-bi)
7. [Instruções de Uso](#instruções-de-uso)
8. [Requisitos de Estilo](#requisitos-de-estilo)
9. [Guia de Integração](#guia-de-integração)
10. [Exemplos de Implementação](#exemplos-de-implementação)

---

## 🎯 Introdução

O **Chat-BI** é um componente de interface conversacional inteligente que permite aos usuários interagir com dados de Business Intelligence através de uma interface de chat moderna e intuitiva. 

Este sistema oferece:
- Consultas de KPIs e métricas operacionais
- Recomendações inteligentes de produtos
- Triagem automática de departamentos
- Respostas contextuais baseadas em dados de CRM

O componente é construído com React, TypeScript e Framer Motion para animações suaves.

---

## ✨ Funcionalidades

### 1. **Chat-BI Integrado**
Consulte KPIs, variação M/M (Month-over-Month) e métricas operacionais diretamente por conversa.

### 2. **Recomendação Inteligente**
O sistema identifica a intenção do cliente e sugere produtos com especificações e preços relevantes.

### 3. **Triagem Automática**
Botões de ação rápida direcionam pedidos para Assistência, Vendas ou Cobrança sem esforço manual.

### 4. **Respostas Contextuais**
Cada interação é personalizada com base no histórico e dados do CRM.

---

## 📦 Pré-requisitos

### Dependências Necessárias

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0"
  }
}
```

### Instalação

```bash
# NPM
npm install framer-motion lucide-react

# Yarn
yarn add framer-motion lucide-react

# PNPM
pnpm add framer-motion lucide-react
```

### Requisitos de Framework
- **Next.js 13+** (com App Router) ou **React 18+**
- **TypeScript** (recomendado)
- **Tailwind CSS** para estilos

---

## 🏗️ Arquitetura de Componentes

A implementação do Chat-BI consiste em dois componentes principais:

1. **ChatPanel** - Componente reutilizável que renderiza o painel de chat
2. **Experiences** - Seção completa que demonstra o uso do ChatPanel

### Estrutura de Arquivos

```
components/
├── chat-panel.tsx          # Componente principal do chat
├── experiences.tsx         # Seção de experiências (exemplo completo)
└── reveal.tsx             # Componente de animação (opcional)
```

---

## 💻 Implementação Completa do Código

### 1. Componente ChatPanel (`chat-panel.tsx`)

Este é o componente principal e reutilizável do Chat-BI.

```typescript
"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"

type MessageType = "user" | "bot" | "card" | "chips" | "buttons"

interface Message {
  role: MessageType
  content: string | React.ReactNode
}

interface ChatPanelProps {
  messages: Message[]
  title?: string
  badge?: string
}

export function ChatPanel({ messages, title = "Chat-BI", badge }: ChatPanelProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="bg-white rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.4)] border border-slate-200 overflow-hidden max-w-md mx-auto">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            V
          </div>
          <div>
            <div className="font-semibold text-slate-800 text-sm">{title}</div>
          </div>
        </div>
        {badge && (
          <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">{badge}</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="p-4 space-y-3 min-h-[350px] max-h-[550px] overflow-y-auto bg-slate-50/50">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: 0 }}
            className={`flex ${msg.role === "user" ? "justify-end items-end" : "justify-start items-start"}`}
          >
            {msg.role === "user" && (
              <div className="bg-blue-600 text-white shadow-depth-sm rounded-2xl rounded-tr-md px-4 py-2 max-w-[75%]">
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            )}

            {msg.role === "bot" && (
              <div className="bg-white shadow-depth-sm text-slate-800 border border-slate-200 rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%]">
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            )}

            {msg.role === "card" && (
              <div className="bg-white shadow-depth-sm border border-slate-200 rounded-2xl px-4 py-3 w-full max-w-[85%]">
                {msg.content}
              </div>
            )}

            {msg.role === "chips" && <div className="flex flex-wrap gap-2 max-w-[85%]">{msg.content}</div>}

            {msg.role === "buttons" && (
              <div className="bg-white shadow-depth-sm border border-slate-200 rounded-2xl px-4 py-3 w-full max-w-[85%]">
                {msg.content}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
```

### 2. Componente Experiences (`experiences.tsx`)

Este é um exemplo completo de como usar o ChatPanel em uma seção da página.

```typescript
"use client"

import { ChatPanel } from "@/components/chat-panel"
import { CheckCircle2 } from "lucide-react"
import { Reveal } from "@/components/reveal"

const chatMessages = [
  {
    role: "user" as const,
    content: "Quantos novos clientes tivemos este mês?",
  },
  {
    role: "card" as const,
    content: (
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">47</div>
          <div className="text-xs text-slate-600 mt-1">Novos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">+11%</div>
          <div className="text-xs text-slate-600 mt-1">M/M</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">€2.4k</div>
          <div className="text-xs text-slate-600 mt-1">Valor médio</div>
        </div>
      </div>
    ),
  },
  {
    role: "chips" as const,
    content: (
      <>
        {["Quantas chamadas hoje?", "Faturação do trimestre?", "Top 5 produtos?", "Taxa de conversão?"].map(
          (chip, i) => (
            <div
              key={i}
              className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 bg-slate-50"
            >
              {chip}
            </div>
          ),
        )}
      </>
    ),
  },
  {
    role: "user" as const,
    content: "Preciso de um portátil até 1200€",
  },
  {
    role: "bot" as const,
    content: "Sugeri 6 modelos (i7/i5) dentro do orçamento. Quer comparar?",
  },
  {
    role: "buttons" as const,
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
          Ver lista
        </div>
        <div className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Pedir proposta
        </div>
      </div>
    ),
  },
  {
    role: "user" as const,
    content: "Qual é o status da fatura #1234?",
  },
  {
    role: "bot" as const,
    content: "Fatura #1234: Vencida há 15 dias. Cliente contactado 2x. Quer enviar lembrete?",
  },
  {
    role: "bot" as const,
    content: "Triagem rápida:",
  },
  {
    role: "buttons" as const,
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Assistência
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Vendas
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Cobrança
        </div>
      </div>
    ),
  },
  {
    role: "user" as const,
    content: "Mostrar propostas pendentes",
  },
  {
    role: "bot" as const,
    content: "Encontrei 8 propostas pendentes. 3 aguardam aprovação há mais de 48h.",
  },
  {
    role: "user" as const,
    content: "Qual o tempo médio de resposta?",
  },
  {
    role: "card" as const,
    content: (
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Tempo médio</span>
          <span className="text-lg font-bold text-slate-800">4.2 min</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-slate-600">Meta</span>
          <span className="text-sm text-green-600">✓ Dentro do objetivo</span>
        </div>
      </div>
    ),
  },
]

const features = [
  {
    title: "Chat-BI integrado",
    description: "Consulte KPIs, variação M/M e métricas operacionais diretamente por conversa."
  },
  {
    title: "Recomendação inteligente",
    description: "O sistema identifica a intenção do cliente e sugere produtos com especificações e preços relevantes."
  },
  {
    title: "Triagem automática",
    description: "Botões de ação rápida direcionam pedidos para Assistência, Vendas ou Cobrança sem esforço manual."
  },
  {
    title: "Respostas contextuais",
    description: "Cada interação é personalizada com base no histórico e dados do CRM."
  },
]

export function Experiences() {
  return (
    <section id="experiencias" className="relative py-12 px-4 bg-slate-50 overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Chat-BI
              </span>
              <span className="text-slate-900"> - Assistente</span>
            </h2>
            <p className="text-xl text-slate-600">Interações inteligentes para cada necessidade</p>
          </div>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Column A: Text + Bullets */}
          <Reveal delayStep={100}>
            <div className="flex flex-col justify-between min-h-[450px]">
              <div className="space-y-6 flex flex-col justify-evenly flex-1">
                {features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-4 bg-gradient-to-br from-white to-slate-50 rounded-xl p-6 border-2 border-slate-300 hover:border-blue-400 shadow-depth-lg hover:shadow-depth-xl transition-all duration-300 hover:-translate-y-1">
                    <CheckCircle2 className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-slate-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Column B: Chat Panel */}
          <Reveal className="delay-200">
            <div className="flex justify-center lg:justify-end">
              {/* Efeito neon gradiente azul-roxo ao redor do chat */}
              <div className="relative">
                {/* Camada de brilho externa */}
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-2xl blur-lg opacity-40"></div>
                
                {/* Camada de brilho interna mais intensa */}
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-xl blur-md opacity-50"></div>
                
                {/* Container do chat */}
                <div className="relative">
                  <ChatPanel messages={chatMessages} title="Chat-BI" />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

### 3. Componente Reveal (Opcional)

Se você não tiver o componente `Reveal`, pode usar este código ou simplesmente remover as tags `<Reveal>`:

```typescript
"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delayStep?: number
}

export function Reveal({ children, className = "", delayStep = 0 }: RevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: delayStep * 0.001 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## 🎨 Tópicos e Recursos do Chat-BI

### 1. Chat-BI Integrado

Permite consultas diretas de KPIs e métricas operacionais.

**Exemplo de Implementação:**

```typescript
const kpiMessages = [
  {
    role: "user",
    content: "Quantos novos clientes tivemos este mês?",
  },
  {
    role: "card",
    content: (
      <div className="grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">47</div>
          <div className="text-xs text-slate-600 mt-1">Novos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">+11%</div>
          <div className="text-xs text-slate-600 mt-1">M/M</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-800">€2.4k</div>
          <div className="text-xs text-slate-600 mt-1">Valor médio</div>
        </div>
      </div>
    ),
  },
]
```

### 2. Recomendação Inteligente

Identifica intenções e sugere produtos relevantes.

**Exemplo de Implementação:**

```typescript
const recommendationMessages = [
  {
    role: "user",
    content: "Preciso de um portátil até 1200€",
  },
  {
    role: "bot",
    content: "Sugeri 6 modelos (i7/i5) dentro do orçamento. Quer comparar?",
  },
  {
    role: "buttons",
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
          Ver lista
        </div>
        <div className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Pedir proposta
        </div>
      </div>
    ),
  },
]
```

### 3. Triagem Automática

Botões para direcionar pedidos a departamentos específicos.

**Exemplo de Implementação:**

```typescript
const triageMessages = [
  {
    role: "bot",
    content: "Triagem rápida:",
  },
  {
    role: "buttons",
    content: (
      <div className="flex gap-2">
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Assistência
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Vendas
        </div>
        <div className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
          Cobrança
        </div>
      </div>
    ),
  },
]
```

### 4. Respostas Contextuais

Informações personalizadas baseadas em dados do CRM.

**Exemplo de Implementação:**

```typescript
const contextualMessages = [
  {
    role: "user",
    content: "Qual é o status da fatura #1234?",
  },
  {
    role: "bot",
    content: "Fatura #1234: Vencida há 15 dias. Cliente contactado 2x. Quer enviar lembrete?",
  },
]
```

---

## 📚 Instruções de Uso

### Uso Básico

```typescript
import { ChatPanel } from "@/components/chat-panel"

const messages = [
  { role: "user", content: "Olá!" },
  { role: "bot", content: "Como posso ajudar?" },
]

function MyComponent() {
  return <ChatPanel messages={messages} title="Chat-BI" />
}
```

### Tipos de Mensagens

O ChatPanel suporta 5 tipos de mensagens:

#### 1. **user** - Mensagens do usuário

```typescript
{
  role: "user",
  content: "Texto da mensagem do usuário"
}
```

#### 2. **bot** - Mensagens do bot

```typescript
{
  role: "bot",
  content: "Texto da resposta do bot"
}
```

#### 3. **card** - Cards com conteúdo personalizado

```typescript
{
  role: "card",
  content: (
    <div className="space-y-2">
      {/* Seu conteúdo JSX aqui */}
    </div>
  )
}
```

#### 4. **chips** - Botões de sugestão

```typescript
{
  role: "chips",
  content: (
    <>
      {["Opção 1", "Opção 2", "Opção 3"].map((chip, i) => (
        <div
          key={i}
          className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 bg-slate-50"
        >
          {chip}
        </div>
      ))}
    </>
  )
}
```

#### 5. **buttons** - Botões de ação

```typescript
{
  role: "buttons",
  content: (
    <div className="flex gap-2">
      <button className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium">
        Botão Primário
      </button>
      <button className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50">
        Botão Secundário
      </button>
    </div>
  )
}
```

### Personalização

```typescript
<ChatPanel 
  messages={messages}
  title="Meu Chat Personalizado"  // Título do header
  badge="Online"                   // Badge no header (opcional)
/>
```

---

## 🎨 Requisitos de Estilo

### Tailwind CSS Classes Personalizadas

Adicione estas classes ao seu arquivo `globals.css` ou `tailwind.config`:

```css
/* Sombras customizadas */
.shadow-depth-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08);
}

.shadow-depth-lg {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15), 0 4px 8px rgba(0, 0, 0, 0.1);
}

.shadow-depth-xl {
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2), 0 6px 12px rgba(0, 0, 0, 0.15);
}
```

### Configuração Tailwind (tailwind.config.js)

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        slate: {
          50: '#f8fafc',
          200: '#e2e8f0',
          300: '#cbd5e1',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
        },
        blue: {
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
        },
        purple: {
          400: '#c084fc',
          500: '#a855f7',
        },
        cyan: {
          500: '#06b6d4',
        },
        green: {
          100: '#dcfce7',
          600: '#16a34a',
          700: '#15803d',
        },
      },
    },
  },
}
```

### Efeito Neon (Opcional)

Para adicionar o efeito neon ao redor do chat:

```tsx
<div className="relative">
  {/* Camada de brilho externa */}
  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 rounded-2xl blur-lg opacity-40"></div>
  
  {/* Camada de brilho interna mais intensa */}
  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500 rounded-xl blur-md opacity-50"></div>
  
  {/* Container do chat */}
  <div className="relative">
    <ChatPanel messages={messages} />
  </div>
</div>
```

---

## 🚀 Guia de Integração

### Passo 1: Instalar Dependências

```bash
npm install framer-motion lucide-react
```

### Passo 2: Criar o Componente ChatPanel

Crie o arquivo `components/chat-panel.tsx` com o código fornecido na seção [Implementação Completa](#implementação-completa-do-código).

### Passo 3: Preparar as Mensagens

```typescript
const messages = [
  { role: "user", content: "Sua pergunta aqui" },
  { role: "bot", content: "Resposta do bot" },
  // ... mais mensagens
]
```

### Passo 4: Importar e Usar

```typescript
import { ChatPanel } from "@/components/chat-panel"

export default function MyPage() {
  return (
    <div className="container mx-auto p-4">
      <ChatPanel messages={messages} title="Chat-BI" />
    </div>
  )
}
```

### Passo 5: Adicionar Estilos Personalizados

Certifique-se de adicionar as classes de sombra personalizadas ao seu CSS global.

---

## 💡 Exemplos de Implementação

### Exemplo 1: Chat Simples de FAQ

```typescript
const faqMessages = [
  { role: "user", content: "Quais são os horários de atendimento?" },
  { role: "bot", content: "Atendemos de segunda a sexta, das 9h às 18h." },
  { role: "user", content: "Como faço para entrar em contato?" },
  { role: "bot", content: "Você pode nos contatar por email, telefone ou chat." },
]

function FAQChat() {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <ChatPanel messages={faqMessages} title="FAQ" badge="Disponível" />
    </div>
  )
}
```

### Exemplo 2: Dashboard com Métricas

```typescript
const dashboardMessages = [
  { role: "user", content: "Mostrar resumo do dia" },
  {
    role: "card",
    content: (
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-slate-600">Vendas</span>
          <span className="font-bold text-slate-800">€15.340</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Pedidos</span>
          <span className="font-bold text-slate-800">127</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Conversão</span>
          <span className="font-bold text-green-600">+8.2%</span>
        </div>
      </div>
    ),
  },
  {
    role: "chips",
    content: (
      <>
        {["Ver detalhes", "Exportar", "Comparar"].map((chip, i) => (
          <div
            key={i}
            className="rounded-full border border-slate-300 px-3 py-1 text-sm text-slate-700 bg-slate-50 cursor-pointer hover:bg-slate-100"
          >
            {chip}
          </div>
        ))}
      </>
    ),
  },
]

function DashboardChat() {
  return <ChatPanel messages={dashboardMessages} title="Dashboard BI" />
}
```

### Exemplo 3: Suporte com Triagem

```typescript
const supportMessages = [
  { role: "bot", content: "Olá! Como posso ajudar?" },
  { role: "user", content: "Tenho um problema com meu pedido" },
  { role: "bot", content: "Vou direcionar você para o departamento adequado:" },
  {
    role: "buttons",
    content: (
      <div className="space-y-2">
        <button className="w-full px-4 py-3 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition">
          📦 Rastreamento de Pedido
        </button>
        <button className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50 hover:bg-slate-100 transition">
          🔄 Trocas e Devoluções
        </button>
        <button className="w-full px-4 py-3 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50 hover:bg-slate-100 transition">
          💬 Falar com Atendente
        </button>
      </div>
    ),
  },
]

function SupportChat() {
  return <ChatPanel messages={supportMessages} title="Suporte" badge="Online" />
}
```

### Exemplo 4: Chat Interativo com Estado

```typescript
"use client"

import { useState } from "react"
import { ChatPanel } from "@/components/chat-panel"

export function InteractiveChat() {
  const [messages, setMessages] = useState([
    { role: "bot" as const, content: "Olá! Como posso ajudar?" },
  ])

  const addMessage = (role: "user" | "bot", content: string) => {
    setMessages([...messages, { role, content }])
  }

  return (
    <div>
      <ChatPanel messages={messages} title="Chat Interativo" />
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => addMessage("user", "Quero saber mais")}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Simular Mensagem
        </button>
      </div>
    </div>
  )
}
```

---

## 🔧 Configuração Avançada

### Adicionar Eventos de Click

```typescript
const messagesWithActions = [
  {
    role: "buttons",
    content: (
      <div className="flex gap-2">
        <button
          onClick={() => console.log("Ação primária")}
          className="flex-1 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium"
        >
          Ação 1
        </button>
        <button
          onClick={() => console.log("Ação secundária")}
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300 text-slate-700 text-sm font-medium bg-slate-50"
        >
          Ação 2
        </button>
      </div>
    ),
  },
]
```

### Customizar Scroll

Modifique o `useEffect` no ChatPanel para controlar o comportamento do scroll:

```typescript
useEffect(() => {
  if (scrollRef.current) {
    // Scroll suave
    scrollRef.current.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth'
    })
  }
}, [messages])
```

### Adicionar Loading State

```typescript
const loadingMessage = {
  role: "bot" as const,
  content: (
    <div className="flex gap-1">
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
    </div>
  ),
}
```

---

## 📱 Responsividade

O ChatPanel é totalmente responsivo. Para ajustar em diferentes tamanhos:

```typescript
<div className="w-full max-w-md mx-auto">           {/* Desktop */}
<div className="w-full lg:max-w-md mx-auto">        {/* Responsive */}
<div className="w-full sm:max-w-sm lg:max-w-lg">    {/* Breakpoints customizados */}
```

---

## 🎯 Checklist de Implementação

- [ ] Instalar dependências (`framer-motion`, `lucide-react`)
- [ ] Criar componente `chat-panel.tsx`
- [ ] Adicionar classes CSS personalizadas (`shadow-depth-*`)
- [ ] Configurar Tailwind CSS
- [ ] Preparar array de mensagens
- [ ] Importar e usar ChatPanel
- [ ] Testar diferentes tipos de mensagens
- [ ] Adicionar efeitos visuais (opcional)
- [ ] Testar responsividade
- [ ] Implementar interatividade (se necessário)

---

## 📞 Suporte e Dúvidas

Para mais informações ou suporte, consulte a documentação oficial:
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React](https://lucide.dev/guide/packages/lucide-react)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 📄 Licença

Este código é fornecido como está para uso em projetos comerciais e pessoais.

---

**Versão:** 1.0.0  
**Última atualização:** Outubro 2025

