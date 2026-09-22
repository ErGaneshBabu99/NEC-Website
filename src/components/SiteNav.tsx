"use client";

import { useState } from "react";
import { COLORS } from "@/lib/theme";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/careers", label: "Careers" },
];

export default function SiteNav() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5" style={{ backdropFilter: "blur(10px)", background: `${COLORS.slate}CC` }}>
      <a href="/" className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.png" alt="NEC Logo" className="w-9 h-9 object-contain flex-shrink-0" />
        <div className="leading-tight">
          <div className="text-base md:text-lg font-bold tracking-tight" style={{ color: COLORS.paper }}>
            Netreshwori Engineering Consultancy
          </div>
          <div className="text-[10px]" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'", letterSpacing: "0.08em" }}>
            PVT. LTD. — EST. 2073 B.S.
          </div>
        </div>
      </a>
      <nav className="hidden md:flex items-center gap-8 text-sm" style={{ color: COLORS.paperDim }}>
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
        <a href="/contact" className="px-4 py-2 rounded-sm font-semibold" style={{ background: COLORS.orange, color: COLORS.slate }}>
          Get in Touch
        </a>
      </nav>
      <button className="md:hidden" onClick={() => setOpen(!open)} style={{ color: COLORS.paper }}>
        {open ? "✕" : "☰"}
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 flex flex-col gap-4 px-6 py-6 md:hidden" style={{ background: COLORS.slate }}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} style={{ color: COLORS.paperDim }}>{l.label}</a>
          ))}
          <a href="/contact" style={{ color: COLORS.orange }}>Get in Touch</a>
        </div>
      )}
    </header>
  );
}
