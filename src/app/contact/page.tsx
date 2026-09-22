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

        <div className="grid md:grid-cols-2 gap-12">
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
            <div className="p-8 rounded-lg flex items-center justify-center text-center" style={{ background: COLORS.paperDim }}>
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
              <input required placeholder="Full name" className="w-full px-4 py-3 rounded-sm text-sm" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              <input required type="email" placeholder="Email address" className="w-full px-4 py-3 rounded-sm text-sm" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              <textarea required placeholder="What are you building?" rows={4} className="w-full px-4 py-3 rounded-sm text-sm" style={{ background: COLORS.paperDim, color: COLORS.slate }} />
              <button className="px-6 py-3 text-sm rounded-sm font-semibold" style={{ background: COLORS.orange, color: COLORS.slate }}>
                Send message
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
