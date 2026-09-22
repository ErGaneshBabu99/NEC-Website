"use client";

import React, { useState } from "react";
import { COLORS } from "@/lib/theme";

export default function OrgChartModalSection() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section className="relative px-6 py-20 border-t overflow-hidden" style={{ background: COLORS.slate, borderColor: "rgba(255,255,255,0.08)" }}>
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs font-mono font-bold tracking-widest text-orange-400 mb-4">
          ORGANIZATIONAL HIERARCHY
        </div>
        
        {/* Twinkle Shimmer Heading */}
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: COLORS.paper }}>
          Our Team & Operational Structure
        </h2>
        <p className="text-sm max-w-xl mx-auto mb-8 leading-relaxed" style={{ color: COLORS.paperDim }}>
          Discover how Netreshwori Engineering Consultancy operates from governance and advisory to multi-disciplinary technical project execution.
        </p>

        {/* See Our Team / View Organizational Chart Button */}
        <button
          onClick={() => setIsOpen(true)}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm transition-all duration-300 hover:scale-105 cursor-pointer shadow-xl"
          style={{
            background: `linear-gradient(135deg, ${COLORS.orange} 0%, #d97706 100%)`,
            color: COLORS.slate,
          }}
        >
          <span>See Our Team & Org Chart</span>
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </button>
      </div>

      {/* Pop-up Modal (Full Chart inside) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl rounded-2xl border p-6 md:p-10 shadow-2xl my-8 transition-all overflow-x-auto"
            style={{
              background: "#0f172a",
              borderColor: "rgba(255, 255, 255, 0.15)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8 min-w-[700px]">
              <div>
                <span className="text-xs font-mono font-bold text-orange-400 tracking-widest">NEC HIERARCHY</span>
                <h3 className="text-2xl font-bold text-white mt-1">Organizational Chart</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 text-white hover:bg-orange-500 hover:text-black font-bold transition-all cursor-pointer flex items-center justify-center text-lg"
              >
                ✕
              </button>
            </div>

            {/* --- EXACT TREE CHART (Matching Picture) --- */}
            <div className="flex flex-col items-center min-w-[850px] py-4 text-center font-sans">
              
              {/* Level 1: Main Company */}
              <div className="px-6 py-3 rounded-lg border bg-purple-900/40 border-purple-400 text-white font-bold text-base shadow-lg shadow-purple-500/10">
                Netreshwori Engineering Consultancy Pvt. Ltd. (NEC)
              </div>
              <div className="w-0.5 h-6 bg-purple-400/60" />

              {/* Level 2: Board */}
              <div className="px-6 py-2.5 rounded-lg border bg-purple-900/30 border-purple-400/80 text-white font-semibold text-sm">
                Board of Director / Advisor
              </div>
              <div className="w-0.5 h-6 bg-purple-400/60" />

              {/* Level 3: MD & Legal Advisor */}
              <div className="flex items-center gap-8 relative">
                <div className="px-6 py-2.5 rounded-lg border bg-purple-900/30 border-purple-400/80 text-white font-semibold text-sm">
                  Managing Director
                </div>
                <div className="h-0.5 w-8 bg-purple-400/60" />
                <div className="px-6 py-2.5 rounded-lg border bg-purple-900/30 border-purple-400/80 text-white font-semibold text-sm">
                  Legal Advisor
                </div>
              </div>

              {/* Branch Down to Departments */}
              <div className="w-0.5 h-6 bg-purple-400/60" />
              <div className="w-[60%] h-0.5 bg-purple-400/60 relative">
                <div className="absolute left-0 top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute right-0 top-0 w-0.5 h-6 bg-purple-400/60" />
              </div>

              {/* Level 4: Core Wings */}
              <div className="grid grid-cols-3 gap-12 mt-6 w-[80%]">
                <div className="px-4 py-2 rounded-lg border bg-purple-950/50 border-purple-400/50 text-white text-xs font-medium">Account</div>
                <div className="px-4 py-2 rounded-lg border bg-purple-950/50 border-purple-400/50 text-white text-xs font-medium">Administration</div>
                <div className="px-4 py-2 rounded-lg border bg-purple-950/50 border-purple-400/50 text-white text-xs font-medium">Technical Section</div>
              </div>

              {/* Connector to Project */}
              <div className="w-0.5 h-6 bg-purple-400/60 mt-2" />
              <div className="px-6 py-2 rounded-lg border bg-purple-900/40 border-purple-400 text-white font-semibold text-xs">
                Project
              </div>
              <div className="w-0.5 h-6 bg-purple-400/60" />

              {/* Horizontal Line for 6 Divisions */}
              <div className="w-[92%] h-0.5 bg-purple-400/60 relative">
                {/* 6 Down connectors */}
                <div className="absolute left-[2%] top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute left-[20%] top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute left-[38%] top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute left-[56%] top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute left-[74%] top-0 w-0.5 h-6 bg-purple-400/60" />
                <div className="absolute right-[2%] top-0 w-0.5 h-6 bg-purple-400/60" />
              </div>

              {/* Level 5: 6 Specialized Divisions */}
              <div className="grid grid-cols-6 gap-3 mt-6 w-full text-left">
                
                {/* 1. Environmental */}
                <div className="p-3 rounded-lg border bg-purple-900/20 border-purple-400/40">
                  <div className="font-bold text-[11px] text-purple-300 mb-2 border-b border-purple-500/20 pb-1">
                    Environmental, Socioeconomic, IT & Planning
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Socioeconomic</li>
                    <li>IEE</li>
                    <li>EIA</li>
                    <li>MTMP</li>
                    <li>Periodic Plan</li>
                    <li>MIS</li>
                  </ul>
                </div>

                {/* 2. Transportation */}
                <div className="p-3 rounded-lg border bg-purple-900/20 border-purple-400/40">
                  <div className="font-bold text-[11px] text-purple-300 mb-2 border-b border-purple-500/20 pb-1">
                    Transportation
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Cable Car</li>
                    <li>Bridge</li>
                    <li>Suspension Bridge</li>
                    <li>Railway</li>
                    <li>Road</li>
                    <li>DPR</li>
                  </ul>
                </div>

                {/* 3. Water Supply */}
                <div className="p-3 rounded-lg border bg-green-900/20 border-green-400/40">
                  <div className="font-bold text-[11px] text-green-300 mb-2 border-b border-green-500/20 pb-1">
                    Water Supply & Sanitary
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Water Supply</li>
                    <li>Sewerage System</li>
                  </ul>
                </div>

                {/* 4. Building */}
                <div className="p-3 rounded-lg border bg-green-900/20 border-green-400/40">
                  <div className="font-bold text-[11px] text-green-300 mb-2 border-b border-green-500/20 pb-1">
                    Building/ Temple & Park
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Soil Test</li>
                    <li>Architecture</li>
                    <li>Survey</li>
                    <li>Structural Design</li>
                    <li>DPR</li>
                  </ul>
                </div>

                {/* 5. Energy */}
                <div className="p-3 rounded-lg border bg-purple-900/20 border-purple-400/40">
                  <div className="font-bold text-[11px] text-purple-300 mb-2 border-b border-purple-500/20 pb-1">
                    Energy
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Hydropower</li>
                    <li>Thermal power</li>
                    <li>Micro Hydro</li>
                    <li>Electrification</li>
                  </ul>
                </div>

                {/* 6. Irrigation */}
                <div className="p-3 rounded-lg border bg-green-900/20 border-green-400/40">
                  <div className="font-bold text-[11px] text-green-300 mb-2 border-b border-green-500/20 pb-1">
                    Irrigation & Agricultural
                  </div>
                  <ul className="text-[10px] space-y-1 text-slate-300 list-disc list-inside">
                    <li>Irrigation</li>
                    <li>River Training</li>
                    <li>Agricultural Engineering</li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}