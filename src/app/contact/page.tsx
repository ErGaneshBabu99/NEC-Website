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
        <div className="text-xs mb-3 tracking-widest font-mono" style={{ color: COLORS.orange }}>GET IN TOUCH</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl mb-16" style={{ color: COLORS.paper }}>Let's start on the ground.</h1>

        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div>
            <div className="space-y-4 text-sm mb-10" style={{ color: COLORS.slate }}>
              <div><div className="opacity-50 text-xs mb-1">Head Office</div>Tokha, Kathmandu, Nepal</div>
              <div><div className="opacity-50 text-xs mb-1">Workstation</div>Sitapaila, Kathmandu, Nepal</div>
              
              {/* Added Office Hours Section */}
              <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5 my-4">
                <div className="text-xs font-mono font-bold text-orange-600 mb-1">⏰ OFFICE HOURS</div>
                <div className="font-semibold text-slate-800">Sun – Fri: 10:00 AM – 6:00 PM</div>
                <div className="text-xs text-rose-600 font-medium mt-0.5">Saturday: Holiday</div>
              </div>

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
              
              <button 
                type="submit"
                className="group relative w-full md:w-auto px-8 py-3.5 text-sm rounded-xl font-bold overflow-hidden shadow-lg transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
                style={{ background: COLORS.orange, color: COLORS.slate }}
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Send Message ➔
                </span>
              </button>
            </form>
          )}
        </div>

        {/* --- MAP SECTION --- */}
        <div className="w-full mt-12">
          <div className="flex items-center justify-between mb-4">
            <div className="text-xs tracking-widest font-mono font-bold flex items-center gap-2" style={{ color: COLORS.orange }}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping" />
              OUR LOCATION & WORKSTATION
            </div>
            <span className="text-xs font-mono text-slate-500 hidden md:block">
              SITAPAILA, KATHMANDU
            </span>
          </div>

          <div className="relative rounded-2xl border-2 border-orange-500/30 overflow-hidden shadow-2xl bg-slate-900 h-[400px] md:h-[480px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d1549.9525975421484!2d85.281641!3d27.709993!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjfCsDQyJzM2LjAiTiA4NcKwMTYnNTYuMiJF!5e1!3m2!1sen!2snp!4v1790076505665!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Netreshwori Location Map"
              className="w-full h-full"
            ></iframe>

            <a
              href="https://maps.app.goo.gl/ADnQJCjf2p1S9p1Z9"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 right-4 px-4 py-2.5 rounded-xl bg-slate-950/90 text-white border border-white/20 text-xs font-mono font-bold hover:bg-orange-500 hover:text-black transition-all shadow-xl"
            >
              Open in Google Maps ↗
            </a>
          </div>
        </div>

      </section>

      <SiteFooter />
    </div>
  );
}