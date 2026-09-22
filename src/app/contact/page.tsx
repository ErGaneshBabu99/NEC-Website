"use client";

import { useState } from "react";
import { COLORS } from "@/lib/theme";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: COLORS.paper }} className="w-full min-h-screen">
      <CustomCursor />
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 pb-24 md:pb-32" style={{ background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.paper} 60%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>GET IN TOUCH</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-16" style={{ color: COLORS.paper }}>Let's start on the ground.</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="space-y-4 text-sm mb-10" style={{ color: COLORS.slate }}>
              <div><div className="opacity-50 text-xs mb-1">Head Office</div>Tokha, Kathmandu, Nepal</div>
              <div><div className="opacity-50 text-xs mb-1">Workstation</div>Sitapaila, Kathmandu, Nepal</div>
              <div><div className="opacity-50 text-xs mb-1">Phone</div>+977-9851217152</div>
              <div><div className="opacity-50 text-xs mb-1">Email</div>NetreshworiConsultancy@gmail.com</div>
              <div><div className="opacity-50 text-xs mb-1">Registration No.</div>148074/72/73</div>
              <div><div className="opacity-50 text-xs mb-1">PAN / VAT</div>604246739</div>
            </div>
          </div>

          {sent ? (
            <div className="p-8 rounded-lg flex items-center justify-center text-center shadow-md" style={{ background: COLORS.paperDim }}>
              <div>
                <div className="text-3xl mb-3">✓</div>
                <p className="font-semibold" style={{ color: COLORS.slate }}>Message sent — we'll get back to you shortly.</p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              className="space-y-4"
            >
              <input required placeholder="Full name" className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              <input required type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              <textarea required placeholder="What are you building?" rows={4} className="w-full px-4 py-3 rounded-md text-sm outline-none transition-all focus:ring-2 focus:ring-orange-500" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              
              {/* Gemini Style Animated Gradient Button */}
              <button 
                className="group relative w-full md:w-auto px-8 py-3.5 text-sm rounded-xl font-bold overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
                style={{ background: COLORS.orange, color: COLORS.slate }}
              >
                <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white transition-colors">
                  Send Message 
                  <span className="transition-transform duration-300 group-hover:translate-x-1">➔</span>
                </span>
              </button>
            </form>
          )}
        </div>

        {/* --- PREMIUM GEMINI-INSPIRED GRADIENT MAP SECTION --- */}
        <div className="w-full mt-12">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs tracking-widest font-mono font-bold flex items-center gap-2" style={{ color: COLORS.orange }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              INTERACTIVE LOCATION MAP
            </div>
            <span className="text-xs opacity-60 font-mono hidden md:block" style={{ color: COLORS.slate }}>
              SITAPAILA WORKSTATION · KATHMANDU
            </span>
          </div>

          {/* Glowing Animated Gradient Border Wrapper */}
          <div className="relative group rounded-3xl p-[2px] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(251,146,60,0.3)]">
            
            {/* Background Moving Gradient Light */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-amber-300 via-purple-500 to-rose-500 animate-pulse group-hover:opacity-100 opacity-70 transition-opacity duration-500" />

            {/* Inner Map Container */}
            <div className="relative w-full h-[420px] md:h-[500px] rounded-[22px] overflow-hidden bg-slate-900 shadow-2xl">
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1549.9525975421484!2d85.28164100000001!3d27.709993!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzM2LjAiTiA4NcKwMTYnNTYuMiJF!5e1!3m2!1sen!2snp!4v1790076505665!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="Netreshwori Engineering Consultancy Location Map"
                className="w-full h-full grayscale-[20%] contrast-[105%] transition-all duration-700 group-hover:grayscale-0"
              ></iframe>

              {/* Top Glassmorphism Floating Badge */}
              <div className="absolute top-4 left-4 right-4 md:right-auto md:max-w-md p-4 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-white/10 text-white shadow-xl flex items-center justify-between gap-4 pointer-events-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 border border-orange-500/40 flex items-center justify-center text-orange-400 font-bold text-lg">
                    📍
                  </div>
                  <div>
                    <div className="text-xs font-mono font-bold text-orange-400">NETRESHWORI WORKSTATION</div>
                    <div className="text-xs text-slate-300 font-medium">Sitapaila, Kathmandu, Nepal</div>
                  </div>
                </div>
              </div>

              {/* Bottom Right Open in Google Maps Action Button */}
              <a
                href="https://maps.app.goo.gl/ADnQJCjf2p1S9p1Z9"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 group/btn px-5 py-3 rounded-xl bg-slate-950/90 hover:bg-orange-500 text-white hover:text-slate-950 border border-white/10 hover:border-orange-500 text-xs font-bold font-mono transition-all duration-300 backdrop-blur-md flex items-center gap-2 shadow-2xl hover:scale-105 active:scale-95"
              >
                <span>OPEN IN GOOGLE MAPS</span>
                <span className="transition-transform duration-300 group-hover/btn:translate-x-1">↗</span>
              </a>

            </div>
          </div>
        </div>

      </section>

      <SiteFooter />
    </div>
  );
}