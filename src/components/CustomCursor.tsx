"use client";

import { useEffect, useRef } from "react";
import { COLORS } from "@/lib/theme";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0, y = 0, rx = 0, ry = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
    };
    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, input, textarea, select");
      if (ringRef.current) ringRef.current.style.transform = interactive ? "translate(-50%,-50%) scale(1.8)" : "translate(-50%,-50%) scale(1)";
    };

    let frame: number;
    const animate = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.left = `${rx}px`;
        ringRef.current.style.top = `${ry}px`;
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="hidden md:block">
      <div ref={dotRef} className="fixed w-1.5 h-1.5 rounded-full pointer-events-none z-[9999]" style={{ background: COLORS.orange, transform: "translate(-50%,-50%)" }} />
      <div ref={ringRef} className="fixed pointer-events-none z-[9999] transition-transform duration-150" style={{ transform: "translate(-50%,-50%)" }}>
        <svg width="34" height="34" viewBox="0 0 34 34" style={{ opacity: 0.8 }}>
          <line x1="17" y1="0" x2="17" y2="10" stroke={COLORS.orange} strokeWidth="1" />
          <line x1="17" y1="24" x2="17" y2="34" stroke={COLORS.orange} strokeWidth="1" />
          <line x1="0" y1="17" x2="10" y2="17" stroke={COLORS.orange} strokeWidth="1" />
          <line x1="24" y1="17" x2="34" y2="17" stroke={COLORS.orange} strokeWidth="1" />
          <circle cx="17" cy="17" r="9" stroke={COLORS.orange} strokeWidth="1" fill="none" />
        </svg>
      </div>
      <style>{`* { cursor: none !important; }`}</style>
    </div>
  );
}
