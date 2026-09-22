"use client";

import { useEffect, useState } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function TermsAndConditionsPage() {
  const [openSection, setOpenSection] = useState<number | null>(0);
  const [agreed, setAgreed] = useState(false);

  // -----------------------------------------
  // CUSTOM LAW CURSOR
  // -----------------------------------------

  useEffect(() => {
    document.body.style.cursor =
      'url("/law-cursor.svg") 16 16, auto';

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);

  // -----------------------------------------
  // TERMS & CONDITIONS
  // -----------------------------------------

  const termsSections = [
    {
      id: 1,
      title: "Acceptance of Terms",
      icon: "⚖️",
      short:
        "These terms establish the legal framework governing your use of our services.",
      content:
        "By accessing, browsing, or using the website and services of Netreshwori Engineering Consultancy Pvt. Ltd., you acknowledge that you have read, understood, and agreed to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you should discontinue use of the website and services.",
    },
    {
      id: 2,
      title: "Engineering Consultancy Services",
      icon: "🏗️",
      short:
        "Our services are delivered by qualified engineering professionals according to project requirements.",
      content:
        "Netreshwori Engineering Consultancy Pvt. Ltd. provides engineering consultancy services including survey, design, estimation, valuation, feasibility studies, project planning, supervision, water supply and sanitation consultancy, structural and civil engineering services, GIS and mapping, and other professional engineering services. The scope, methodology, deliverables, schedule, and professional responsibilities shall be determined according to the applicable project agreement or proposal.",
    },
    {
      id: 3,
      title: "Professional Information & Documents",
      icon: "📐",
      short:
        "Clients are responsible for providing accurate and complete project information.",
      content:
        "Clients, applicants, contractors, and other users are responsible for ensuring that information, drawings, land documents, survey data, ownership documents, measurements, specifications, and other materials submitted to the consultancy are accurate and complete. Engineering outputs may depend upon the accuracy and completeness of information supplied by the client or other authorized parties.",
    },
    {
      id: 4,
      title: "Quotations & Project Fees",
      icon: "💰",
      short:
        "Professional fees are determined according to project scope and agreed deliverables.",
      content:
        "Any quotation, fee proposal, cost estimate, or commercial information provided through this website or by the consultancy may be subject to project-specific verification. Final professional fees shall be governed by the approved quotation, agreement, contract, or written confirmation between the parties. Additional work outside the originally agreed scope may require additional professional fees.",
    },
    {
      id: 5,
      title: "Intellectual Property",
      icon: "©️",
      short:
        "Engineering drawings, reports, designs, documents, and website content are protected materials.",
      content:
        "Unless otherwise agreed in writing, the website design, branding, logos, text, graphics, engineering methodologies, reports, drawings, digital materials, and other original content belonging to Netreshwori Engineering Consultancy Pvt. Ltd. may not be copied, reproduced, distributed, modified, published, or commercially exploited without prior written authorization. Project-specific intellectual property rights shall be governed by the applicable agreement.",
    },
    {
      id: 6,
      title: "Confidentiality",
      icon: "🔐",
      short:
        "Confidential project information should be handled responsibly by all parties.",
      content:
        "Project drawings, structural information, land records, survey information, financial documents, client information, technical reports, and other confidential materials received during consultancy activities shall be handled responsibly. Parties shall take reasonable measures to prevent unauthorized disclosure or use of confidential information, subject to applicable law and contractual obligations.",
    },
    {
      id: 7,
      title: "Third-Party Information",
      icon: "🌐",
      short:
        "External information and links may be provided for convenience but remain subject to their respective sources.",
      content:
        "The website may contain references, links, data, standards, maps, external resources, or information originating from third parties or public authorities. Such information may be subject to changes, updates, or limitations beyond the control of the consultancy. Users should verify critical regulatory, technical, and statutory requirements with the relevant authority before relying upon them.",
    },
    {
      id: 8,
      title: "Limitation of Responsibility",
      icon: "🛡️",
      short:
        "Professional outputs are based on the information, scope, assumptions, and conditions applicable to each project.",
      content:
        "Engineering advice, calculations, designs, estimates, reports, and other professional outputs are prepared based on the project information, site conditions, assumptions, applicable standards, and scope available at the time of preparation. Where conditions materially change or new information becomes available, revisions may be necessary. Specific contractual responsibilities and limitations shall be governed by the applicable project agreement.",
    },
    {
      id: 9,
      title: "Website Availability",
      icon: "💻",
      short:
        "We aim to maintain reliable access to our digital platform.",
      content:
        "We make reasonable efforts to keep this website available and functional. However, temporary interruption may occur due to maintenance, hosting issues, network failures, software updates, security measures, or circumstances outside our reasonable control. We do not guarantee uninterrupted or error-free access to every website feature at all times.",
    },
    {
      id: 10,
      title: "Applicable Laws",
      icon: "🇳🇵",
      short:
        "Services and contractual relationships are subject to applicable laws and regulations.",
      content:
        "The interpretation and application of these Terms & Conditions shall be subject to the applicable laws and regulations of Nepal. Specific projects may additionally be governed by contractual provisions, applicable engineering standards, regulatory requirements, and directions of competent authorities.",
    },
  ];

  const progress = agreed ? 100 : Math.round((openSection !== null ? 10 : 0));

  return (
    <div
      className="min-h-screen w-full flex flex-col text-slate-900 overflow-x-hidden antialiased"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background:
          "linear-gradient(45deg, #fee2e2 0%, #fef3c7 15%, #dcfce7 35%, #e0f2fe 55%, #e0e7ff 75%, #fae8ff 90%, #fff1f2 100%)",
      }}
    >
      <SiteNav />

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <header className="relative pt-40 pb-24 border-b border-white/30 bg-white/10 backdrop-blur-sm overflow-hidden">
        {/* Decorative Background Circles */}

        <div className="absolute -top-24 -left-24 w-72 h-72 bg-red-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse" />

        <div className="absolute bottom-0 left-1/2 w-80 h-80 bg-amber-300/20 rounded-full blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="max-w-4xl">
            <span className="inline-flex items-center gap-2 text-xs font-black tracking-[0.2em] uppercase px-4 py-2 rounded-full bg-amber-500/20 text-amber-900 border border-amber-500/30 mb-6">
              ⚖️ Legal Framework
            </span>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-6">
              Terms{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-blue-900 to-amber-600">
                & Conditions
              </span>
            </h1>

            <p className="text-base md:text-xl text-slate-700 max-w-3xl leading-relaxed font-medium">
              The terms governing the use of digital platforms, engineering
              consultancy services, professional information, project
              deliverables, and client relationships of{" "}
              <span className="font-black text-slate-950">
                Netreshwori Engineering Consultancy Pvt. Ltd.
              </span>
            </p>

            <div className="flex flex-wrap gap-3 mt-8">
              <div className="px-4 py-2 rounded-xl bg-white/60 border border-white shadow-sm text-xs font-bold text-slate-700">
                🏗️ Engineering
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/60 border border-white shadow-sm text-xs font-bold text-slate-700">
                📐 Professional Services
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/60 border border-white shadow-sm text-xs font-bold text-slate-700">
                🔐 Confidentiality
              </div>

              <div className="px-4 py-2 rounded-xl bg-white/60 border border-white shadow-sm text-xs font-bold text-slate-700">
                🇳🇵 Nepal
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <main className="max-w-6xl w-full mx-auto px-6 md:px-12 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* =====================================
            LEFT CONTENT
        ===================================== */}

        <article className="lg:col-span-8">
          <div className="mb-8">
            <p className="text-xs font-black uppercase tracking-[0.2em] text-blue-900 mb-2">
              Legal Documentation
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-slate-950">
              Terms of Service
            </h2>

            <p className="mt-3 text-sm md:text-base text-slate-600 leading-relaxed">
              Please review the following provisions carefully before using
              our website or engaging our professional services.
            </p>
          </div>

          <div className="space-y-5">
            {termsSections.map((section, index) => {
              const isOpen = openSection === index;

              return (
                <section
                  key={section.id}
                  className={`rounded-3xl border backdrop-blur-md overflow-hidden transition-all duration-500 ${
                    isOpen
                      ? "bg-white/90 border-white shadow-2xl shadow-slate-300/30 -translate-y-1"
                      : "bg-white/65 border-white/80 shadow-lg shadow-slate-200/20"
                  }`}
                >
                  <button
                    onClick={() =>
                      setOpenSection(isOpen ? null : index)
                    }
                    className="w-full text-left p-6 md:p-7 flex items-center gap-5"
                  >
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center text-xl border transition-all duration-300 ${
                        isOpen
                          ? "bg-slate-900 border-slate-900 scale-110"
                          : "bg-amber-500/10 border-amber-500/20"
                      }`}
                    >
                      {section.icon}
                    </div>

                    <div className="flex-grow">
                      <div className="text-xs font-black uppercase tracking-widest text-amber-700 mb-1">
                        Section {String(section.id).padStart(2, "0")}
                      </div>

                      <h3 className="text-lg md:text-xl font-black text-slate-900">
                        {section.title}
                      </h3>

                      {!isOpen && (
                        <p className="text-sm text-slate-500 mt-1 line-clamp-1">
                          {section.short}
                        </p>
                      )}
                    </div>

                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center bg-slate-100 text-slate-600 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    >
                      ↓
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen
                        ? "grid-rows-[1fr]"
                        : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-6 md:px-7 pb-7">
                        <div className="border-t border-slate-200 pt-5">
                          <p className="text-sm font-bold text-amber-900 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 mb-4">
                            {section.short}
                          </p>

                          <p className="text-base text-slate-700 leading-8">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              );
            })}
          </div>
        </article>

        {/* =====================================
            RIGHT LEGAL SIDEBAR
        ===================================== */}

        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-5">
            {/* Legal Card */}

            <div className="rounded-3xl bg-slate-950 text-white p-7 shadow-2xl border border-slate-800 relative overflow-hidden">
              <div className="absolute -right-16 -top-16 w-40 h-40 bg-amber-500/10 rounded-full blur-2xl" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-black uppercase tracking-widest text-amber-400">
                    Legal Status
                  </span>

                  <span className="w-3 h-3 bg-emerald-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse" />
                </div>

                <div className="text-5xl mb-5">⚖️</div>

                <h3 className="text-2xl font-black mb-3">
                  Terms & Conditions
                </h3>

                <p className="text-sm text-slate-400 leading-relaxed">
                  A clear framework for responsible use of our digital
                  platform and professional engineering services.
                </p>

                <div className="mt-7 h-px bg-slate-800" />

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div>
                    <p className="text-2xl font-black text-amber-400">
                      {termsSections.length}
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Sections
                    </p>
                  </div>

                  <div>
                    <p className="text-2xl font-black text-emerald-400">
                      100%
                    </p>
                    <p className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">
                      Transparency
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agreement Card */}

            <div className="rounded-3xl bg-white/75 backdrop-blur-md border border-white p-6 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-black uppercase tracking-wider">
                  Review Progress
                </h3>

                <span className="text-xs font-black text-blue-700">
                  {agreed ? "100%" : `${progress}%`}
                </span>
              </div>

              <div className="h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 via-amber-500 to-blue-600 transition-all duration-700"
                  style={{
                    width: `${agreed ? 100 : progress}%`,
                  }}
                />
              </div>

              <p className="text-xs text-slate-500 leading-relaxed mt-4">
                Review the terms and confirm that you understand the
                conditions governing the use of our services.
              </p>

              <label className="flex items-start gap-3 mt-5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  className="mt-1 w-4 h-4 accent-amber-500"
                />

                <span className="text-xs font-semibold text-slate-700 leading-relaxed">
                  I have reviewed and understood these Terms & Conditions.
                </span>
              </label>

              {agreed && (
                <div className="mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-800 text-xs font-bold">
                  ✓ Terms reviewed successfully.
                </div>
              )}
            </div>

            {/* Contact Card */}

            <div className="rounded-3xl bg-gradient-to-br from-blue-950 to-slate-950 text-white p-6 shadow-xl">
              <p className="text-xs uppercase tracking-widest font-black text-blue-300 mb-3">
                Need Clarification?
              </p>

              <h3 className="text-xl font-black mb-2">
                Have a question about these terms?
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed mb-5">
                For project-specific contractual matters or clarification
                regarding our professional services, please contact the
                consultancy directly.
              </p>

              <a
                href="/contact"
                className="inline-flex items-center justify-center w-full px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black transition-all active:scale-95"
              >
                Contact Consultancy →
              </a>
            </div>

            {/* Quick Navigation */}

            <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white p-6">
              <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">
                Quick Navigation
              </p>

              <div className="space-y-2">
                {termsSections.slice(0, 6).map((section, index) => (
                  <button
                    key={section.id}
                    onClick={() => {
                      setOpenSection(index);

                      window.scrollTo({
                        top: 450 + index * 100,
                        behavior: "smooth",
                      });
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white transition-colors text-left"
                  >
                    <span className="text-sm">
                      {section.icon}
                    </span>

                    <span className="text-xs font-bold text-slate-700">
                      {section.title}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* =========================================
          FINAL LEGAL NOTICE
      ========================================= */}

      <section className="max-w-6xl w-full mx-auto px-6 md:px-12 pb-16">
        <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white p-8 md:p-10 text-center shadow-xl">
          <div className="text-4xl mb-4">⚖️</div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-950 mb-3">
            Professional Engineering. Clear Terms.
          </h2>

          <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-600 leading-relaxed">
            These Terms & Conditions are intended to establish a clear,
            transparent, and professional framework for interaction between
            Netreshwori Engineering Consultancy Pvt. Ltd. and users of its
            digital platform and professional services.
          </p>

          <div className="mt-6 flex justify-center flex-wrap gap-3">
            <span className="px-4 py-2 rounded-full bg-red-500/10 text-red-700 text-xs font-bold border border-red-500/20">
              ⚖️ Legal
            </span>

            <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-700 text-xs font-bold border border-blue-500/20">
              🏗️ Engineering
            </span>

            <span className="px-4 py-2 rounded-full bg-emerald-500/10 text-emerald-700 text-xs font-bold border border-emerald-500/20">
              🔐 Confidential
            </span>

            <span className="px-4 py-2 rounded-full bg-amber-500/10 text-amber-700 text-xs font-bold border border-amber-500/20">
              🤝 Professional
            </span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}