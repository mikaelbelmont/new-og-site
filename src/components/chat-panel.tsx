"use client"

import type React from "react"
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
    <div className="bg-card rounded-2xl border overflow-hidden max-w-md ml-auto">
      {/* Header */}
      <div className="bg-card border-b px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            V
          </div>
          <div>
            <div className="font-semibold text-card-foreground text-sm">{title}</div>
          </div>
        </div>
        {badge && (
          <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">{badge}</span>
        )}
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="p-4 space-y-3 min-h-[350px] max-h-[550px] overflow-y-auto" style={{ backgroundColor: '#FCFEFF' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === "user" ? "justify-end items-end" : "justify-start items-start"}`}
          >
            {msg.role === "user" && (
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-md px-4 py-2 max-w-[75%]">
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            )}

            {msg.role === "bot" && (
              <div className="bg-card text-card-foreground border rounded-2xl rounded-tl-md px-4 py-2 max-w-[80%]">
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </div>
            )}

            {msg.role === "card" && (
              <div className="bg-card border rounded-2xl px-4 py-3 w-full max-w-[85%]">
                {msg.content}
              </div>
            )}

            {msg.role === "chips" && <div className="flex flex-wrap gap-2 max-w-[85%]">{msg.content}</div>}

            {msg.role === "buttons" && (
              <div className="bg-card border rounded-2xl px-4 py-3 w-full max-w-[85%]">
                {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

