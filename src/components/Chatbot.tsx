"use client";

import { useState, useRef } from "react";

type Msg = { role: "user" | "assistant"; content: string };

function clean(text: string) {
  return text.replace(/\*\*(.*?)\*\*/g, "$1").replace(/\*(.*?)\*/g, "$1");
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Hi! Ask me about our services, projects, or careers." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const sessionId = useRef(crypto.randomUUID());

  async function send() {
    if (!input.trim()) return;
    const next = [...messages, { role: "user" as const, content: input }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId: sessionId.current, messages: next }),
      });
      const data = await res.json();
      setMessages([...next, { role: "assistant", content: data.reply }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50" style={{ fontFamily: "Archivo, sans-serif" }}>
      {open && (
        <div className="mb-3 w-80 h-96 rounded-2xl flex flex-col overflow-hidden" style={{ background: "#EAE6DB", boxShadow: "0 12px 40px rgba(20,24,28,0.35)" }}>
          <div className="px-4 py-3 flex items-center gap-2" style={{ background: "#14181C" }}>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "#B5652D", color: "#EAE6DB" }}>NEC</div>
            <div>
              <div className="text-sm font-semibold" style={{ color: "#EAE6DB" }}>NEC Assistant</div>
              <div className="text-[10px]" style={{ color: "#7FA6B8" }}>usually replies instantly</div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-sm">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`px-3 py-2 max-w-[85%] leading-relaxed ${m.role === "user" ? "ml-auto rounded-2xl rounded-br-sm" : "rounded-2xl rounded-bl-sm"}`}
                style={
                  m.role === "user"
                    ? { background: "#3E6E86", color: "#EAE6DB" }
                    : { background: "#fff", color: "#14181C", boxShadow: "0 1px 2px rgba(20,24,28,0.1)" }
                }
              >
                {clean(m.content)}
              </div>
            ))}
            {loading && <div className="text-xs" style={{ color: "#6B7864" }}>NEC Assistant is typing…</div>}
          </div>
          <div className="p-2 border-t flex gap-2" style={{ borderColor: "#DCD7C9" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Type a message…"
              className="flex-1 rounded-full px-3 py-2 text-sm outline-none"
              style={{ background: "#fff", color: "#14181C" }}
            />
            <button onClick={send} className="px-4 py-2 rounded-full text-sm font-medium" style={{ background: "#B5652D", color: "#EAE6DB" }}>
              Send
            </button>
          </div>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full text-xl flex items-center justify-center"
        style={{ background: "#14181C", color: "#EAE6DB", boxShadow: "0 6px 20px rgba(20,24,28,0.4)" }}
      >
        {open ? "✕" : "💬"}
      </button>
    </div>
  );
}
