"use client";

import OrgChartModalSection from "@/components/OrgChartModalSection";
import React, { useEffect, useState } from "react";
import { COLORS } from "@/lib/theme";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";
import AnimatedCounter from "@/components/AnimatedCounter";
import ClientsMarquee from "@/components/ClientsMarquee";

// ============================================================
// AutoLevel / Total Station Crosshair Custom Cursor
// ============================================================
function AutoLevelCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });

      const target = e.target as HTMLElement | null;

      if (
        target &&
        (
          target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer") ||
          target.closest(".cursor-pointer")
        )
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      {/* ======================================================
          Hide Native Browser Cursor
          ====================================================== */}
      <style jsx global>{`
        html,
        body,
        a,
        button,
        [role="button"],
        .cursor-pointer {
          cursor: none !important;
        }
      `}</style>

      {/* ======================================================
          AutoLevel / Total Station Surveying Crosshair
          IMPORTANT:
          z-[999999] keeps cursor ABOVE all modals/popups.
          ====================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[999999] select-none"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
          transition: "transform 75ms ease-out",
          willChange: "transform",
        }}
      >
        <svg
          width="48"
          height="48"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            transform: `scale(${isHovered ? 1.25 : 1})`,
            transition: "transform 180ms ease-out",
            overflow: "visible",
          }}
        >
          {/* Outer Surveying Lens Circle */}
          <circle
            cx="24"
            cy="24"
            r="18"
            stroke={COLORS.orange}
            strokeWidth="1.2"
            strokeDasharray="3 2"
            className="opacity-60"
          />

          {/* Inner Precision Reticle Ring */}
          <circle
            cx="24"
            cy="24"
            r="8"
            stroke={COLORS.orange}
            strokeWidth="1.5"
            className="opacity-90"
          />

          {/* Center Point Dot */}
          <circle
            cx="24"
            cy="24"
            r="2"
            fill={COLORS.orange}
          />

          {/* Horizontal Crosshair */}
          <line
            x1="2"
            y1="24"
            x2="46"
            y2="24"
            stroke={COLORS.orange}
            strokeWidth="1.2"
          />

          {/* Vertical Crosshair */}
          <line
            x1="24"
            y1="2"
            x2="24"
            y2="46"
            stroke={COLORS.orange}
            strokeWidth="1.2"
          />

          {/* Stadia Hair Marks */}
          <line
            x1="20"
            y1="12"
            x2="28"
            y2="12"
            stroke={COLORS.orange}
            strokeWidth="1"
          />

          <line
            x1="20"
            y1="36"
            x2="28"
            y2="36"
            stroke={COLORS.orange}
            strokeWidth="1"
          />
        </svg>
      </div>
    </>
  );
}

// ============================================================
// Google Fonts
// ============================================================
function useGoogleFonts() {
  useEffect(() => {
    const id = "nec-fonts-v3";

    if (document.getElementById(id)) return;

    const link = document.createElement("link");

    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap";

    document.head.appendChild(link);
  }, []);
}

// ============================================================
// Splash Loader
// ============================================================
function SplashLoader({ done }: { done: boolean }) {
  return (
    <div
      className="fixed inset-0 z-[9998] flex flex-col items-center justify-center transition-opacity duration-700"
      style={{
        background: COLORS.slate,
        opacity: done ? 0 : 1,
        pointerEvents: done ? "none" : "auto",
      }}
    >
      <svg
        width="64"
        height="64"
        viewBox="0 0 64 64"
        className="animate-spin"
        style={{
          animationDuration: "2.2s",
        }}
      >
        <g
          fill="none"
          stroke={COLORS.orange}
          strokeWidth="2.5"
        >
          <circle
            cx="32"
            cy="32"
            r="12"
          />

          {Array.from({ length: 8 }).map((_, i) => {
            const angle = (i * Math.PI) / 4;

            return (
              <line
                key={i}
                x1={32 + Math.cos(angle) * 14}
                y1={32 + Math.sin(angle) * 14}
                x2={32 + Math.cos(angle) * 20}
                y2={32 + Math.sin(angle) * 20}
              />
            );
          })}
        </g>
      </svg>

      <div
        className="mt-4 text-xs tracking-widest font-mono"
        style={{
          color: COLORS.paperDim,
        }}
      >
        INITIALIZING AUTOLEVEL RETICLE...
      </div>
    </div>
  );
}

// ============================================================
// Hero Slides
// ============================================================
const HERO_SLIDES = [
  {
    label: "Bridge Engineering & Structural Works",
    url: "https://images.unsplash.com/photo-1683576657026-e8862b54e13c?fm=jpg&q=75&w=2000&auto=format&fit=crop",
  },
  {
    label: "Water Supply Schemes & Sanitation",
    url: "https://images.unsplash.com/photo-1693907986952-3cd372e4c9d8?fm=jpg&q=75&w=2000&auto=format&fit=crop",
  },
  {
    label: "Road Construction & Valuation",
    url: "https://images.unsplash.com/photo-1760708626681-59a5373819a6?fm=jpg&q=75&w=2000&auto=format&fit=crop",
  },
];

// ============================================================
// Hero Slideshow
// ============================================================
function HeroSlideshow() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive(
        (a) => (a + 1) % HERO_SLIDES.length
      );
    }, 5000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {HERO_SLIDES.map((s, i) => (
        <img
          key={s.url}
          src={s.url}
          alt={s.label}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms]"
          style={{
            opacity: i === active ? 1 : 0,
          }}
        />
      ))}

      {/* Dark / Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              circle at 50% 20%,
              rgba(99, 102, 241, 0.15),
              transparent 70%
            ),
            linear-gradient(
              180deg,
              ${COLORS.slate}DD 0%,
              ${COLORS.slate}99 50%,
              ${COLORS.slate} 100%
            )
          `,
        }}
      />

      {/* Engineering Grid */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(
              ${COLORS.paper} 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              ${COLORS.paper} 1px,
              transparent 1px
            )
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-6 z-10 flex gap-2 md:left-12">
        {HERO_SLIDES.map((s, i) => (
          <button
            key={s.url}
            onClick={() => setActive(i)}
            className="h-1.5 rounded-full transition-all duration-300"
            style={{
              width:
                i === active
                  ? "36px"
                  : "12px",
              background:
                i === active
                  ? COLORS.orange
                  : COLORS.paperDim,
              opacity:
                i === active
                  ? 1
                  : 0.4,
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

// ============================================================
// Services
// ============================================================
type ServiceItem = {
  id: string;
  title: string;
  tag: string;
  desc: string;
  projectBadge?: string;
};

const SERVICES: ServiceItem[] = [
  {
    id: "water-gravity",
    title:
      "Gravity / Pumping Water Supply System",
    tag: "SURVEY, DESIGN & ESTIMATION",
    desc:
      "Comprehensive hydraulic modeling, topography mapping, pump station design, and cost estimation for sustainable clean water distribution across varied topographies.",
    projectBadge:
      "100+ Projects Completed",
  },

  {
    id: "water-elevated",
    title:
      "Overhead / Elevated Water Supply System",
    tag: "STRUCTURAL DESIGN & ANALYSIS",
    desc:
      "Engineered RCC and steel elevated reservoirs (OHT) designed for seismic resilience, hydrodynamic pressure, and uninterrupted community water pressure.",
    projectBadge:
      "100+ Projects Completed",
  },

  {
    id: "building-design",
    title:
      "Commercial & Residential Building Design",
    tag: "ARCHITECTURAL & STRUCTURAL",
    desc:
      "3D architectural rendering, municipal code compliance, NBC/IS code structural design, electrical, plumbing (MEP), and interior spatial planning.",
  },

  {
    id: "road-works",
    title:
      "Road Design & Related Infrastructure",
    tag: "HIGHWAY ENGINEERING",
    desc:
      "Alignment surveys, pavement layer design, slope stabilization, drainage system integration, and DPR preparation for local and strategic roads.",
  },

  {
    id: "bridge-works",
    title:
      "Bridge Design & Related Works",
    tag: "HEAVY INFRASTRUCTURE",
    desc:
      "Feasibility, hydrological modeling, foundation (Pile/Well/Raft) design, RCC/Pre-stressed girder bridges, and footbridges across complex river channels.",
  },

  {
    id: "fecal-sludge",
    title:
      "Fecal Sludge Treatment Plant (FSTP)",
    tag: "ENVIRONMENTAL ENGINEERING",
    desc:
      "Eco-friendly municipal sanitation solutions including drying beds, anaerobic reactors, effluent treatment, and resource recovery design.",
  },

  {
    id: "valuation-services",
    title:
      "Land & Building Valuation",
    tag: "FINANCIAL & PROPERTY AUDIT",
    desc:
      "Official property valuation for commercial banks, government agencies, legal proceedings, and corporate asset assessment with detailed site reports.",
  },
];

// ============================================================
// Services Section
// ============================================================
function ServicesSection() {
  const [
    selectedService,
    setSelectedService,
  ] = useState<ServiceItem | null>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedService(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleEsc
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleEsc
      );
    };
  }, []);

  return (
    <section
      className="relative overflow-hidden px-6 py-24 md:px-12 md:py-32"
      style={{
        background: COLORS.slate,
      }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full blur-[140px] opacity-15"
        style={{
          background: `radial-gradient(circle, ${COLORS.orange}, transparent)`,
        }}
      />

      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div
              className="mb-3 flex items-center gap-3 font-mono text-xs font-semibold tracking-widest"
              style={{
                color: COLORS.orange,
              }}
            >
              <span
                className="h-px w-8"
                style={{
                  background: COLORS.orange,
                }}
              />

              ENGINEERING DISCIPLINES
            </div>

            <h2
              className="text-3xl md:text-5xl font-bold tracking-tight"
              style={{
                color: COLORS.paper,
              }}
            >
              Engineering Expertise.
              <br />

              <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
                Delivered Across Nepal.
              </span>
            </h2>
          </div>

          <p
            className="max-w-md text-sm leading-relaxed"
            style={{
              color: COLORS.paperDim,
            }}
          >
            Explore our specialized consultancy
            capabilities backed by a decade of
            engineering excellence in Nepal.
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {SERVICES.map((service, idx) => (
            <div
              key={service.id}
              onClick={() =>
                setSelectedService(service)
              }
              className="group relative cursor-pointer overflow-hidden rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)",
                border:
                  "1px solid rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span
                  className="font-mono text-xs font-semibold tracking-widest"
                  style={{
                    color: COLORS.orange,
                  }}
                >
                  0{idx + 1}
                </span>

                {service.projectBadge && (
                  <span className="rounded-full bg-orange-500/10 px-3 py-1 text-[10px] font-mono font-bold text-orange-400 border border-orange-500/20">
                    {service.projectBadge}
                  </span>
                )}
              </div>

              <div
                className="mb-2 font-mono text-[10px] font-bold tracking-widest opacity-80"
                style={{
                  color: COLORS.orange,
                }}
              >
                {service.tag}
              </div>

              <h3
                className="mb-3 text-xl font-bold leading-snug transition-colors group-hover:text-orange-400"
                style={{
                  color: COLORS.paper,
                }}
              >
                {service.title}
              </h3>

              <p
                className="mb-6 line-clamp-3 text-xs leading-relaxed"
                style={{
                  color: COLORS.paperDim,
                }}
              >
                {service.desc}
              </p>

              <div
                className="flex items-center justify-between border-t pt-4"
                style={{
                  borderColor:
                    "rgba(255, 255, 255, 0.08)",
                }}
              >
                <span
                  className="text-xs font-semibold transition-transform duration-300 group-hover:translate-x-1"
                  style={{
                    color: COLORS.orange,
                  }}
                >
                  Explore Details →
                </span>
              </div>
            </div>
          ))}

          {/* More Services */}
          <div
            className="flex flex-col items-center justify-center rounded-2xl p-7 text-center transition-all duration-300"
            style={{
              background:
                "linear-gradient(135deg, rgba(251, 146, 60, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)",
              border:
                `1px dashed ${COLORS.orange}66`,
            }}
          >
            <h4
              className="mb-2 text-lg font-bold"
              style={{
                color: COLORS.paper,
              }}
            >
              And Many More Engineering Services
            </h4>

            <p
              className="text-xs leading-relaxed"
              style={{
                color: COLORS.paperDim,
              }}
            >
              Detail DPRs, Geotechnical Surveys,
              Hydrology, Environmental Impact
              Assessments (EIA/IEE) & Soil Testing
              tailored to project demands.
            </p>
          </div>
        </div>
      </div>

      {/* ====================================================
          Service Modal
          ==================================================== */}
      {selectedService && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() =>
            setSelectedService(null)
          }
        >
          <div
            className="relative max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl border shadow-2xl transition-all"
            style={{
              background: COLORS.slate,
              borderColor:
                "rgba(255, 255, 255, 0.15)",
            }}
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            {/* Header */}
            <div
              className="border-b p-6 md:p-8"
              style={{
                borderColor:
                  "rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span
                    className="font-mono text-xs font-bold tracking-widest"
                    style={{
                      color: COLORS.orange,
                    }}
                  >
                    {selectedService.tag}
                  </span>

                  <h3
                    className="mt-1 text-2xl font-bold md:text-3xl"
                    style={{
                      color: COLORS.paper,
                    }}
                  >
                    {selectedService.title}
                  </h3>
                </div>

                <button
                  onClick={() =>
                    setSelectedService(null)
                  }
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg transition-transform hover:rotate-90"
                  style={{
                    color: COLORS.paper,
                  }}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="max-h-[60vh] space-y-6 overflow-y-auto p-6 md:p-8">

              <div
                className="rounded-xl border p-5"
                style={{
                  background:
                    "rgba(251, 146, 60, 0.06)",
                  borderColor:
                    `${COLORS.orange}44`,
                }}
              >
                <div
                  className="mb-2 flex items-center gap-2 text-sm font-semibold"
                  style={{
                    color: COLORS.orange,
                  }}
                >
                  Proven Engineering Leadership
                </div>

                <p
                  className="text-xs leading-relaxed md:text-sm"
                  style={{
                    color: COLORS.paper,
                  }}
                >
                  Netreshwori Engineering Consultancy
                  (NEC) is a premier and highly
                  experienced engineering firm in Nepal
                  with over 10+ years of dedicated practice
                  in{" "}
                  <strong>
                    {selectedService.title}
                  </strong>
                  .
                </p>

                {selectedService.projectBadge && (
                  <div className="mt-3 inline-block rounded-md bg-orange-500/20 px-3 py-1 text-xs font-mono font-bold text-orange-400">
                    Track Record:{" "}
                    {selectedService.projectBadge}
                  </div>
                )}
              </div>

              <div>
                <h4
                  className="mb-2 text-xs font-mono font-bold tracking-wider"
                  style={{
                    color: COLORS.paperDim,
                  }}
                >
                  DISCIPLINE OVERVIEW
                </h4>

                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: COLORS.paper,
                  }}
                >
                  {selectedService.desc}
                </p>
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <h4
                    className="text-xs font-mono font-bold tracking-wider"
                    style={{
                      color: COLORS.paperDim,
                    }}
                  >
                    PROJECT DOCUMENT VAULT & MEDIA
                  </h4>

                  <span className="rounded-full border border-orange-500/20 bg-orange-500/10 px-2.5 py-0.5 text-[10px] font-mono font-bold text-orange-400">
                    LOCKED FIELD ARCHIVE
                  </span>
                </div>

                <div
                  className="rounded-xl border p-5 transition-all"
                  style={{
                    background:
                      "rgba(0, 0, 0, 0.4)",
                    borderColor:
                      "rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="text-sm font-semibold"
                    style={{
                      color: COLORS.paper,
                    }}
                  >
                    NEC_
                    {selectedService.id.toUpperCase()}
                    _FIELD_ARCHIVE
                  </div>

                  <div
                    className="mt-1 text-xs"
                    style={{
                      color: COLORS.paperDim,
                    }}
                  >
                    High-resolution CAD Drawings,
                    Topographic Maps, and DPR Documents
                    archived from previous field operations.
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="flex items-center justify-between border-t p-6"
              style={{
                borderColor:
                  "rgba(255, 255, 255, 0.1)",
              }}
            >
              <span
                className="text-xs font-mono"
                style={{
                  color: COLORS.paperDim,
                }}
              >
                NEC · KATHMANDU
              </span>

              <button
                onClick={() =>
                  setSelectedService(null)
                }
                className="cursor-pointer rounded-lg px-5 py-2.5 text-xs font-bold transition-opacity hover:opacity-90"
                style={{
                  background: COLORS.orange,
                  color: COLORS.slate,
                }}
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ============================================================
// Featured Projects
// ============================================================
const FEATURED_PROJECTS = [
  {
    title: "Rana Tharu And Tharu Homestay",
    img: "https://necnepal.com/wp-content/uploads/2024/09/1.jpg",
  },
  {
    title: "Maghi Sports Complex",
    img: "https://necnepal.com/wp-content/uploads/2024/09/1-1.jpg",
  },
  {
    title: "Jwalamai Mandir Complex",
    img: "https://necnepal.com/wp-content/uploads/2023/09/Screenshot-141.png",
  },
];

// ============================================================
// HOME PAGE
// ============================================================
export default function HomePage() {
  useGoogleFonts();

  const [loaded, setLoaded] =
    useState(false);

  useEffect(() => {
    const t = setTimeout(
      () => setLoaded(true),
      1200
    );

    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="min-h-screen w-full"
      style={{
        fontFamily:
          "'Space Grotesk', sans-serif",
        background: COLORS.slate,
      }}
    >

      {/* ======================================================
          Custom Surveying Cursor
          ====================================================== */}
      <AutoLevelCursor />

      {/* Splash Loader */}
      <SplashLoader done={loaded} />

      {/* Navigation */}
      <SiteNav />

      {/* ======================================================
          HERO SECTION
          ====================================================== */}
      <section
        className="relative h-screen w-full overflow-hidden"
        style={{
          background: COLORS.slate,
        }}
      >
        <HeroSlideshow />

        <div className="relative z-10 flex h-full max-w-4xl flex-col justify-end px-6 pb-24 md:px-12">

          <div
            className="mb-4 text-xs tracking-widest font-mono"
            style={{
              color: COLORS.orange,
            }}
          >
            SITAPAILA, KATHMANDU · BUILDING YOUR DREAM TOGETHER
          </div>

          <h1
            className="mb-6 text-3xl font-bold leading-[1.1] tracking-tight md:text-6xl"
            style={{
              color: COLORS.paper,
            }}
          >
            NETRESHWORI ENGINEERING
            <br />

            <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-500 bg-clip-text text-transparent">
              CONSULTANCY PVT. LTD.
            </span>
          </h1>

          <p
            className="mb-8 max-w-xl text-base leading-relaxed md:text-lg"
            style={{
              color: COLORS.paperDim,
            }}
          >
            Reliable construction and engineering
            solutions for visionary endeavors —
            constructing your success story, one project
            at a time.
          </p>

          <div className="flex flex-wrap gap-4">

            <a
              href="/projects"
              className="cursor-pointer rounded-lg px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
              style={{
                background: COLORS.orange,
                color: COLORS.slate,
              }}
            >
              Explore Projects
            </a>

            <a
              href="/contact"
              className="cursor-pointer rounded-lg border px-6 py-3 text-sm font-semibold transition-all hover:bg-white/5"
              style={{
                borderColor:
                  "rgba(255,255,255,0.2)",
                color: COLORS.paper,
              }}
            >
              Get in Touch
            </a>

          </div>
        </div>
      </section>

      {/* ======================================================
          STATS SECTION
          ====================================================== */}
      <section
        className="border-y px-6 py-20 md:px-12"
        style={{
          background: COLORS.slate,
          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      >
        <div
          className="mb-3 text-center text-xs tracking-widest font-mono"
          style={{
            color: COLORS.orange,
          }}
        >
          OUR TRACK RECORD
        </div>

        <h2
          className="mb-12 text-center text-2xl font-bold md:text-3xl"
          style={{
            color: COLORS.paper,
          }}
        >
          Major Works Completed By Netreshwori
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 text-center md:grid-cols-4">

          <div>
            <div
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: COLORS.orange,
              }}
            >
              <AnimatedCounter
                target={400}
                suffix="+"
              />
            </div>

            <div
              className="mt-2 text-sm font-medium"
              style={{
                color: COLORS.paperDim,
              }}
            >
              Projects Completed
            </div>
          </div>

          <div>
            <div
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: COLORS.orange,
              }}
            >
              <AnimatedCounter target={7} />
            </div>

            <div
              className="mt-2 text-sm font-medium"
              style={{
                color: COLORS.paperDim,
              }}
            >
              Provinces Served
            </div>
          </div>

          <div>
            <div
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: COLORS.orange,
              }}
            >
              <AnimatedCounter
                target={10}
                suffix="+"
              />
            </div>

            <div
              className="mt-2 text-sm font-medium"
              style={{
                color: COLORS.paperDim,
              }}
            >
              Years Active
            </div>
          </div>

          <div>
            <div
              className="text-4xl font-bold md:text-5xl"
              style={{
                color: COLORS.orange,
              }}
            >
              <AnimatedCounter
                target={500}
                suffix="+"
              />
            </div>

            <div
              className="mt-2 text-sm font-medium"
              style={{
                color: COLORS.paperDim,
              }}
            >
              Engineers Network
            </div>
          </div>

        </div>
      </section>

      {/* ======================================================
          SERVICES
          ====================================================== */}
      <ServicesSection />

      {/* ======================================================
          FEATURED WORKS
          ====================================================== */}
      <section
        className="px-6 py-24 md:px-12 md:py-32"
        style={{
          background: COLORS.slate,
        }}
      >
        <div className="mx-auto mb-16 flex max-w-7xl flex-wrap items-end justify-between gap-4">

          <div>
            <div
              className="mb-3 text-xs tracking-widest font-mono"
              style={{
                color: COLORS.orange,
              }}
            >
              FEATURED WORKS
            </div>

            <h2
              className="text-3xl font-bold md:text-4xl"
              style={{
                color: COLORS.paper,
              }}
            >
              Recent Projects
            </h2>
          </div>

          <a
            href="/projects"
            className="cursor-pointer text-sm font-semibold hover:underline"
            style={{
              color: COLORS.orange,
            }}
          >
            View all projects →
          </a>
        </div>

        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">

          {FEATURED_PROJECTS.map((p) => (
            <div
              key={p.title}
              className="group relative overflow-hidden rounded-xl border border-white/10"
              style={{
                aspectRatio: "4/5",
              }}
            >
              <img
                src={p.img}
                alt={p.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div
                className="absolute inset-0 flex items-end p-6"
                style={{
                  background: `
                    linear-gradient(
                      180deg,
                      transparent 40%,
                      ${COLORS.slate}FA 100%
                    )
                  `,
                }}
              >
                <span
                  className="text-base font-semibold"
                  style={{
                    color: COLORS.paper,
                  }}
                >
                  {p.title}
                </span>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* ======================================================
          MANAGING DIRECTOR MESSAGE
          ====================================================== */}
      <section
        className="border-t px-6 py-24 md:px-12"
        style={{
          background: COLORS.slate,
          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      >
        <div className="mx-auto grid max-w-4xl items-start gap-8 md:grid-cols-[160px_1fr]">

          <div className="relative">

            <img
              src="/bhakta-raj-joshi.jpeg"
              alt="Bhakta Raj Joshi"
              className="h-32 w-32 rounded-xl border border-white/20 object-cover"
              onError={(e) => {
                const img = e.currentTarget;

                img.onerror = null;
                img.style.display = "none";

                const fallback =
                  document.getElementById(
                    "md-photo-fallback"
                  );

                if (fallback) {
                  fallback.style.display =
                    "flex";
                }
              }}
            />

            <div
              id="md-photo-fallback"
              className="h-32 w-32 items-center justify-center rounded-xl text-3xl font-bold"
              style={{
                display: "none",
                background:
                  "rgba(255,255,255,0.05)",
                color: COLORS.orange,
                border:
                  "1px dashed rgba(255,255,255,0.2)",
              }}
            >
              BJ
            </div>

          </div>

          <div>

            <div
              className="mb-3 text-xs tracking-widest font-mono"
              style={{
                color: COLORS.orange,
              }}
            >
              WORDS FROM MANAGING DIRECTOR
            </div>

            <p
              className="mb-4 text-base italic leading-relaxed md:text-lg"
              style={{
                color: COLORS.paperDim,
              }}
            >
              "Netreshwori Engineering Consultancy
              is one of Nepal's emerging consultancies,
              committed to delivering absolute quality
              in our services. Our goal is to make a
              valuable contribution to the nation's
              infrastructure development."
            </p>

            <div
              className="mb-4 text-sm font-semibold"
              style={{
                color: COLORS.paper,
              }}
            >
              Bhakta Raj Joshi, Managing Director
            </div>

            <a
              href="/about"
              className="cursor-pointer text-sm font-semibold hover:underline"
              style={{
                color: COLORS.orange,
              }}
            >
              Read full message →
            </a>

          </div>
        </div>
      </section>

      {/* ======================================================
          ORGANIZATIONAL STRUCTURE
          
          Only the button/section is shown here.
          The actual organization chart opens inside
          OrgChartModalSection.
          ====================================================== */}
      <OrgChartModalSection />

      {/* ======================================================
          CLIENTS SHOWCASE
          ====================================================== */}
      <ClientsMarquee />

      {/* ======================================================
          CONTACT BANNER
          ====================================================== */}
      <section
        className="border-t px-6 py-24 text-center"
        style={{
          background: COLORS.slate,
          borderColor:
            "rgba(255,255,255,0.08)",
        }}
      >
        <h2
          className="mb-4 text-2xl font-bold md:text-4xl"
          style={{
            color: COLORS.paper,
          }}
        >
          Interested? Let's build together!
        </h2>

        <p
          className="mx-auto mb-8 max-w-md text-sm leading-relaxed"
          style={{
            color: COLORS.paperDim,
          }}
        >
          Ready to turn your engineering vision into
          reality? Contact Netreshwori Engineering
          Consultancy today.
        </p>

        <a
          href="/contact"
          className="inline-block cursor-pointer rounded-lg px-8 py-3.5 text-sm font-semibold transition-transform hover:scale-105"
          style={{
            background: COLORS.orange,
            color: COLORS.slate,
          }}
        >
          Get in Touch
        </a>
      </section>

      {/* Footer */}
      <SiteFooter />
    </div>
  );
}