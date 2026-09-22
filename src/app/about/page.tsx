"use client";

import { COLORS } from "@/lib/theme";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const VALUES = [
  { title: "Service-Driven Engineering", body: "Commitment to contributing technical expertise toward sustainable national development." },
  { title: "Zero Tolerance Policy", body: "Absolute commitment to ethical business conduct — prohibiting bribery, fraud, dishonesty, and sexual harassment." },
  { title: "GESI & Sustainability", body: "Integration of Gender Equity and Social Inclusion, disaster risk reduction, and environmental protection in infrastructure design." },
];

export default function AboutPage() {
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: COLORS.paper }} className="w-full min-h-screen">
      <CustomCursor />
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 pb-20" style={{ background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.paperDim} 100%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>ABOUT US</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl" style={{ color: COLORS.paper }}>
          One of Nepal's emerging engineering consultancies.
        </h1>
        <p className="text-base md:text-lg max-w-2xl mt-6" style={{ color: COLORS.paperDim }}>
          Established in 2073 BS, in the aftermath of the devastating earthquakes
          that severely damaged the nation, Netreshwori Engineering Consultancy
          was founded with the mission of aiding in the country's recovery and
          growth. We specialize in Energy, Water Resources, and Infrastructure
          Development projects.
        </p>
      </section>

      <section className="px-6 md:px-12 py-24" style={{ background: COLORS.paperDim }}>
        <h2 className="text-2xl md:text-3xl font-bold mb-10" style={{ color: COLORS.slate }}>Our Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {VALUES.map((v) => (
            <div key={v.title} className="p-6 rounded-lg" style={{ background: COLORS.paper }}>
              <h3 className="font-semibold mb-2" style={{ color: COLORS.slate }}>{v.title}</h3>
              <p className="text-sm" style={{ color: COLORS.slate, opacity: 0.7 }}>{v.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-12 py-24 md:py-32" style={{ background: `linear-gradient(180deg, ${COLORS.paperDim} 0%, ${COLORS.slate} 20%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>WORDS FROM MANAGING DIRECTOR</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-16" style={{ color: COLORS.paper }}>A message from our Managing Director</h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-8 max-w-4xl items-start">
          <div className="flex flex-col items-center md:items-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/bhakta-raj-joshi.jpeg"
              alt="Bhakta Raj Joshi"
              className="w-40 h-40 rounded-lg object-cover mb-4"
              style={{ border: `2px solid ${COLORS.slateLine}` }}
            />
            <div className="text-center md:text-left">
              <div className="font-bold" style={{ color: COLORS.paper }}>Bhakta Raj Joshi</div>
              <div className="text-xs" style={{ color: COLORS.gold }}>Managing Director</div>
            </div>
          </div>

          <div className="p-8 md:p-10 rounded-lg" style={{ background: COLORS.slateSoft }}>
            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: COLORS.paperDim }}>
              Netreshwori Engineering Consultancy (NEC Nepal) is one of Nepal's
              emerging consultancies, committed to delivering absolute quality
              in our services. As a reliable provider of consulting services,
              our goal is to make a valuable contribution to the nation's
              development.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: COLORS.paperDim }}>
              Established in 2073 BS, in the aftermath of the devastating
              earthquakes that severely damaged the nation, NEC Nepal was
              founded with the mission of aiding in the country's recovery
              and growth. Since our inception, we have collaborated with
              numerous clients, receiving positive feedback, which is
              showcased on our website.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-5" style={{ color: COLORS.paperDim }}>
              We specialize in Energy, Water Resources, and Infrastructure
              Development projects, offering leading expertise in these
              areas. Our track record in the construction field speaks for
              itself, and we are confident you will appreciate our services.
            </p>
            <p className="text-sm md:text-base leading-relaxed mb-6" style={{ color: COLORS.paperDim }}>
              We invite you to join us in our mission to contribute to the
              nation's progress.
            </p>
            <div className="text-sm" style={{ color: COLORS.paper }}>
              Regards,<br />
              <span className="font-semibold">Bhakta Raj Joshi</span><br />
              Managing Director
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
