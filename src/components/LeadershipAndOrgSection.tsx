"use client";

import React, { useState } from "react";
import { COLORS } from "@/lib/theme";

type DepartmentNode = {
  title: string;
  role: string;
  responsibility: string;
  subCategories?: string[];
  color: string;
};

const EXEC_LEADERSHIP = [
  {
    name: "Tirtharaj Joshi",
    title: "Board of Director / Senior Advisor",
    responsibility: "Strategic Vision, Governance, Legal Guidance & Fiscal Compliance",
  },
  {
    name: "Bhakta Raj Joshi",
    title: "Managing Director",
    responsibility: "Overall Executive Execution, Tender Approvals & Client Liaison",
  },
];

const DEPARTMENTS: DepartmentNode[] = [
  {
    title: "Environmental & Socioeconomic",
    role: "Impact & Planning Division",
    responsibility: "IEE, EIA, MTMP, Periodic Plans & Socioeconomic Surveys",
    subCategories: ["IEE / EIA Reports", "MTMP & Periodic Plans", "Socioeconomic & MIS"],
    color: "#38bdf8",
  },
  {
    title: "Transportation Engineering",
    role: "Mobility & Structural Grid",
    responsibility: "Feasibility Studies, Cable Cars, Bridges & Road DPRs",
    subCategories: ["Roads & Highways", "Bridges & Cable Cars", "Railway Systems"],
    color: "#f43f5e",
  },
  {
    title: "Water Supply & Sanitary",
    role: "Hydraulic Systems Division",
    responsibility: "Urban & Rural Water Supply, Pipeline Networks & Sewerage",
    subCategories: ["Water Supply Projects", "Sewerage Infrastructure", "Treatment Systems"],
    color: "#06b6d4",
  },
  {
    title: "Building, Temple & Parks",
    role: "Architectural & Soil Testing",
    responsibility: "Soil Testing, NBC Code Structural Design, 3D Renderings & DPR",
    subCategories: ["Soil & Geo Testing", "Structural & Architectural", "Heritages & Parks"],
    color: "#a855f7",
  },
  {
    title: "Energy Sector",
    role: "Power & Electrification",
    responsibility: "Hydropower DPRs, Thermal Power Studies & Micro-Hydro",
    subCategories: ["Hydropower & Micro-Hydro", "Rural Electrification", "Thermal Energy"],
    color: "#eab308",
  },
  {
    title: "Irrigation & Agriculture",
    role: "River & Water Resource",
    responsibility: "River Training Works, Canals & Agricultural Infrastructure",
    subCategories: ["Irrigation Canals", "River Training", "Agri-Engineering"],
    color: "#10b981",
  },
];

export default function LeadershipAndOrgSection() {
  const [activeDept, setActiveDept] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-28 md:px-12 overflow-hidden" style={{ background: COLORS.slate }}>
      {/* Dynamic 3D Glow Background Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-tr from-orange-500/10 via-purple-500/10 to-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #ffffff 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header with Twinkle Shimmer Text */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono font-bold tracking-widest text-orange-400 mb-4">
            ORGANIZATIONAL STRUCTURE & WORKFLOW
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            <span className="animate-shimmer">Engineered for Excellence.</span> <br />
            <span style={{ color: COLORS.paper }}>Driven by Leadership.</span>
          </h2>
          <p className="text-sm md:text-base leading-relaxed" style={{ color: COLORS.paperDim }}>
            From project inception to final fiscal handover, our multi-tiered technical hierarchy ensures seamless execution across all engineering disciplines in Nepal.
          </p>
        </div>

        {/* Executive Tier (Board & Managing Director) */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-16">
          {EXEC_LEADERSHIP.map((leader, i) => (
            <div
              key={i}
              className="relative group p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.01) 100%)",
                borderColor: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-lg" style={{ background: COLORS.orange, color: COLORS.slate }}>
                  {leader.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ color: COLORS.paper }}>{leader.name}</h3>
                  <p className="text-xs font-mono font-medium text-orange-400">{leader.title}</p>
                </div>
              </div>
              <p className="text-xs leading-relaxed border-t pt-4" style={{ color: COLORS.paperDim, borderColor: "rgba(255,255,255,0.08)" }}>
                <span className="text-white font-semibold">Core Responsibility:</span> {leader.responsibility}
              </p>
            </div>
          ))}
        </div>

        {/* Central Operational Wings Banner */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16 max-w-3xl mx-auto">
          {["Account & Audit", "Administration & HR", "Legal Advisory", "Technical Control Section"].map((wing, idx) => (
            <div 
              key={idx}
              className="px-5 py-2.5 rounded-xl border text-xs font-mono font-semibold tracking-wide backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.02)", borderColor: "rgba(255,255,255,0.1)", color: COLORS.paper }}
            >
              ⚡ {wing}
            </div>
          ))}
        </div>

        {/* Interactive Engineering Disciplines / Technical Divisions Chart */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-xs font-mono font-bold tracking-widest text-orange-400">
            TECHNICAL SECTIONS & PROJECT EXECUTIONS
          </div>
          <div className="text-xs text-slate-400 hidden sm:block font-mono">
            Click any division to inspect sub-works
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map((dept, idx) => {
            const isSelected = activeDept === idx;
            return (
              <div
                key={idx}
                onClick={() => setActiveDept(isSelected ? null : idx)}
                className="cursor-pointer relative rounded-2xl p-6 border transition-all duration-300 hover:scale-[1.02]"
                style={{
                  background: isSelected 
                    ? `linear-gradient(135deg, ${dept.color}15 0%, rgba(255,255,255,0.02) 100%)`
                    : "rgba(255,255,255,0.02)",
                  borderColor: isSelected ? dept.color : "rgba(255,255,255,0.08)",
                  boxShadow: isSelected ? `0 10px 30px ${dept.color}20` : "none",
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="w-3 h-3 rounded-full" style={{ background: dept.color }} />
                  <span className="text-[10px] font-mono uppercase tracking-widest opacity-60 text-white">
                    Division 0{idx + 1}
                  </span>
                </div>

                <h4 className="text-lg font-bold mb-1" style={{ color: COLORS.paper }}>{dept.title}</h4>
                <div className="text-xs font-mono mb-3" style={{ color: dept.color }}>{dept.role}</div>
                <p className="text-xs mb-4 leading-relaxed" style={{ color: COLORS.paperDim }}>{dept.responsibility}</p>

                {/* Expanded Sub-categories on Click */}
                {isSelected && dept.subCategories && (
                  <div className="mt-4 pt-4 border-t border-white/10 space-y-2 animate-fadeIn">
                    <div className="text-[11px] font-mono font-bold text-white uppercase tracking-wider mb-2">Key Scope Deliverables:</div>
                    {dept.subCategories.map((sub, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs font-medium" style={{ color: COLORS.paper }}>
                        <span className="text-orange-400">➔</span> {sub}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}