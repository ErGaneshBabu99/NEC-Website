"use client";

import { useState, useEffect } from "react";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

export default function PrivacyPolicyPage() {
    useEffect(() => {
    document.body.style.cursor = 'url("/law-cursor.svg") 16 16, auto';

    return () => {
      document.body.style.cursor = "auto";
    };
  }, []);
  const policySections = [
    {
      id: "information-collection",
      title: "1. Information Collection & Tracking",
      summary:
        "We collect personal and technical details to ensure flawless engineering service delivery.",
      details:
        "Netreshwori Engineering Consultancy Pvt. Ltd. collects information that you voluntarily provide when using our platform. This includes personal identifiers such as your full name, official email address, direct contact number, and professional documents uploaded during job applications or project quote requests. Additionally, we use automated tracking systems like cookies, browser configurations, and IP logging to analyze site performance, traffic trends, and optimize user experience layout.",
    },
    {
      id: "data-utilization",
      title: "2. How We Utilize Your Data",
      summary:
        "Your information is strictly used for feasibility studies, structural planning, and communications.",
      details:
        "The data gathered serves explicit organizational workflows. Specifically, we process your information to generate highly accurate engineering cost estimations (quotations), perform structural feasibility checks based on shared metrics, and maintain direct client communication. Furthermore, data helps us screen qualified engineering professionals for careers. We uphold a zero-spam policy: your information will never be monetized, traded, or rented to third-party marketing networks.",
    },
    {
      id: "security-measures",
      title: "3. Advanced Security & Data Safeguards",
      summary:
        "Industry-grade encryption architectures protecting architectural models and client records.",
      details:
        "Security is foundational to our engineering enterprise. We deploy robust Hypertext Transfer Protocol Secure (HTTPS) frameworks alongside state-of-the-art Secure Sockets Layer (SSL) encryption models. This guarantees that all blueprints, structural metrics, and communication logs remain completely encrypted during transit. Our physical infrastructure and database storage utilize strict multi-layer authentication blocks to eliminate vectors of unauthorized data breach or leak.",
    },
  ];

  // -----------------------------------------
  // 2D PRIVACY GAME
  // -----------------------------------------

  const scenarios = [
    {
      id: 1,
      type: "Blueprint CAD Design",
      secure: true,
      hint: "Confidential company blueprint.",
    },
    {
      id: 2,
      type: "Public Website Reviews",
      secure: false,
      hint: "Open testimonials for promotion.",
    },
    {
      id: 3,
      type: "Client Private Phone Number",
      secure: true,
      hint: "Sensitive PII (Personal Data).",
    },
    {
      id: 4,
      type: "Government Building Codes",
      secure: false,
      hint: "Public regulatory standards.",
    },
  ];

  const [score, setScore] = useState(0);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [gameMessage, setGameMessage] = useState(
    "Sort the data incoming below!"
  );

  const handleChoice = (isSecureZone: boolean) => {
    if (currentScenario >= scenarios.length) return;

    const current = scenarios[currentScenario];
    const correct = current.secure === isSecureZone;

    // Update score safely
    if (correct) {
      setScore((prev) => prev + 10);
      setGameMessage("✅ Correct classification!");
    } else {
      setGameMessage("❌ Incorrect! Security breach simulated.");
    }

    setTimeout(() => {
      const nextScenario = currentScenario + 1;

      setCurrentScenario(nextScenario);

      if (nextScenario < scenarios.length) {
        setGameMessage("Classify the next item:");
      } else {
        setGameMessage(
          `🎉 Game Finished! Final Score: ${
            correct ? score + 10 : score
          } / 40`
        );
      }
    }, 1200);
  };

  const restartGame = () => {
    setScore(0);
    setCurrentScenario(0);
    setGameMessage("Sort the data incoming below!");
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-white antialiased text-slate-900 overflow-x-hidden"
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        background:
          "linear-gradient(45deg, #fee2e2 0%, #fef3c7 15%, #dcfce7 35%, #e0f2fe 55%, #e0e7ff 75%, #fae8ff 90%, #fff1f2 100%)",
      }}
    >
      {/* Navigation */}
      <SiteNav />

      {/* -----------------------------------------
          HERO HEADER
      ----------------------------------------- */}

      <header className="w-full pt-40 pb-20 relative text-center md:text-left border-b border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <span className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full bg-amber-500/20 text-amber-900 mb-4 inline-block border border-amber-500/30">
            Legal Compliance Directive
          </span>

          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-blue-900 to-amber-700">
            Privacy Policy
          </h1>

          <p className="text-base md:text-lg max-w-3xl text-slate-800 font-medium leading-relaxed">
            Authentic operational policies governing data infrastructure,
            digital blueprints, and client safety measures at{" "}
            <span className="font-extrabold text-slate-950">
              Netreshwori Engineering Consultancy Pvt. Ltd.
            </span>
          </p>
        </div>
      </header>

      {/* -----------------------------------------
          MAIN CONTENT
      ----------------------------------------- */}

      <main className="max-w-6xl w-full mx-auto px-6 md:px-12 py-16 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* -----------------------------------------
            LEFT SIDE - POLICY SECTIONS
        ----------------------------------------- */}

        <article className="lg:col-span-8 flex flex-col gap-10">
          {policySections.map((section) => (
            <section
              key={section.id}
              className="p-8 rounded-3xl bg-white/70 backdrop-blur-md border border-white/80 shadow-xl shadow-slate-200/20 transition-all duration-300 hover:bg-white hover:-translate-y-0.5"
            >
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mb-3 flex items-center gap-3">
                <span className="w-2 h-7 bg-gradient-to-b from-red-500 to-amber-500 rounded-full inline-block"></span>

                {section.title}
              </h2>

              <p className="text-sm font-bold text-amber-900 bg-amber-500/10 px-4 py-2.5 rounded-xl border border-amber-500/20 mb-4">
                {section.summary}
              </p>

              <div className="border-t border-slate-200/60 pt-4">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  More Details:
                </h4>

                <p className="text-base text-slate-700 leading-relaxed text-justify font-normal">
                  {section.details}
                </p>
              </div>
            </section>
          ))}
        </article>

        {/* -----------------------------------------
            RIGHT SIDE - PRIVACY GAME
        ----------------------------------------- */}

        <aside className="lg:col-span-4 h-fit lg:sticky lg:top-36 p-6 rounded-3xl bg-slate-900 text-white shadow-2xl border border-slate-800">
          {/* Game Header */}

          <div className="flex justify-between items-center mb-4">
            <h3 className="text-sm font-black tracking-widest text-amber-400 uppercase">
              2D Privacy Sandbox
            </h3>

            <span className="bg-amber-500/20 text-amber-300 font-mono text-xs px-2.5 py-1 rounded-md border border-amber-500/40">
              Score: {score}
            </span>
          </div>

          {/* Game Description */}

          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Classify data nodes into their exact protective legal containers
            to prevent architectural data leaks.
          </p>

          {/* Game Area */}

          <div className="bg-slate-950 p-6 rounded-2xl text-center min-h-[180px] flex flex-col justify-center items-center border border-slate-800 relative overflow-hidden">
            {currentScenario < scenarios.length ? (
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">
                  Incoming Data Cluster
                </span>

                <div className="text-base font-black px-4 py-3 bg-slate-900 rounded-xl border border-blue-500/30 text-blue-300 animate-pulse shadow-lg shadow-blue-500/5">
                  📦 {scenarios[currentScenario].type}
                </div>

                <span className="text-[11px] text-slate-400 mt-3 italic">
                  Hint: {scenarios[currentScenario].hint}
                </span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-lg font-bold text-amber-400 mb-4">
                  Simulation Ended
                </p>

                <p className="text-sm text-slate-400 mb-4">
                  Final Score:{" "}
                  <span className="text-white font-bold">{score} / 40</span>
                </p>

                <button
                  onClick={restartGame}
                  className="px-4 py-2 bg-amber-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors"
                >
                  Restart Sandbox
                </button>
              </div>
            )}
          </div>

          {/* Game Message */}

          <p className="text-xs text-center font-semibold my-4 text-slate-300 min-h-[16px]">
            {gameMessage}
          </p>

          {/* Action Buttons */}

          <div className="grid grid-cols-2 gap-3">
            <button
              disabled={currentScenario >= scenarios.length}
              onClick={() => handleChoice(true)}
              className="py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-900/20 active:scale-95"
            >
              🔒 Vault Storage
            </button>

            <button
              disabled={currentScenario >= scenarios.length}
              onClick={() => handleChoice(false)}
              className="py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-900/20 active:scale-95"
            >
              🌐 Public Access
            </button>
          </div>

          {/* Game Legend */}

          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between text-[10px] text-slate-500 uppercase tracking-wider font-bold">
              <span>🔒 Private / Sensitive</span>
              <span>🌐 Public</span>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer */}

      <SiteFooter />
    </div>
  );
}