"use client";

import { COLORS } from "@/lib/theme";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const SERVICES = [
  {
    code: "01",
    title: "Planning and Design",
    tagline: "Modern equipment.",
    body: "We bring your vision to life through meticulous planning and innovative design. Our expert team transforms ideas into actionable plans that drive successful projects.",
    points: [
      "Collaborative approach to understanding your project goals",
      "Feasibility studies, risk assessment, and comprehensive project timelines",
      "Cutting-edge machinery to enhance efficiency, precision, and safety",
    ],
  },
  {
    code: "02",
    title: "Project Management",
    tagline: "Industrial solutions.",
    body: "Our experienced project management team ensures seamless coordination from start to finish, prioritizing timelines, budget, and quality.",
    points: [
      "Efficient resource allocation for minimal delays",
      "Transparent communication and proactive problem-solving",
      "Tailored expertise for unique industrial challenges",
      "Integration of advanced technologies for optimization",
    ],
  },
  {
    code: "03",
    title: "Operations and Services",
    tagline: "Guaranteed quality.",
    body: "Delivering comprehensive industrial solutions across diverse sectors, including specialized installations and systems, with rigorous quality control at every stage.",
    points: [
      "Seamless project execution from start to finish",
      "Customized solutions to meet unique requirements",
      "Focus on minimizing disruptions and ensuring efficiency",
      "Rigorous quality control throughout all stages",
    ],
  },
];

export default function ServicesPage() {
  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: COLORS.paper }} className="w-full min-h-screen">
      <CustomCursor />
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 pb-16" style={{ background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.paper} 100%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>OUR SERVICES</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl" style={{ color: COLORS.paper }}>Building trust, one project at a time.</h1>
      </section>

      <section className="px-6 md:px-12 pb-24 md:pb-32 space-y-6">
        {SERVICES.map((s) => (
          <div key={s.code} className="p-8 md:p-10 rounded-lg grid md:grid-cols-[100px_1fr] gap-6" style={{ background: COLORS.paperDim }}>
            <div className="text-4xl font-bold" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>{s.code}</div>
            <div>
              <h3 className="text-2xl font-semibold mb-1" style={{ color: COLORS.slate }}>{s.title}</h3>
              <div className="text-sm mb-4" style={{ color: COLORS.orange }}>{s.tagline}</div>
              <p className="text-sm leading-relaxed mb-4" style={{ color: COLORS.slate, opacity: 0.75 }}>{s.body}</p>
              <ul className="space-y-1.5">
                {s.points.map((p) => (
                  <li key={p} className="text-sm flex gap-2" style={{ color: COLORS.slate, opacity: 0.7 }}>
                    <span style={{ color: COLORS.orange }}>—</span>{p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>

      <SiteFooter />
    </div>
  );
}
