"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  X,
  ChevronRight,
  Sparkles,
  Building2,
  MapPin,
  Globe2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

import { COLORS } from "@/lib/theme";
import { CLIENTS, type Client } from "@/lib/clients";

type Category = "all" | "government" | "municipality" | "ngo";

type ClientWithCategory = Client & {
  category: Exclude<Category, "all">;
};

const THEME = {
  slateDark: COLORS.slate,
  slateCard: "rgba(21, 29, 46, 0.72)",
  slateCardHover: "rgba(30, 42, 68, 0.9)",
  cyanGlow: "#00F0FF",
  purpleGlow: "#8A2BE2",
  orangeGlow: COLORS.orange,
  blueGlow: "#3B82F6",
  emeraldGlow: "#10B981",
  textLight: COLORS.paper,
  textMuted: COLORS.paperDim,
};

/**
 * Categorize only from the actual client name.
 * No extra/fake client information is created.
 */
function getClientCategory(name: string): Exclude<Category, "all"> {
  const normalized = name.toLowerCase();

  if (
    normalized.includes("rural municipality") ||
    normalized.includes("municipality")
  ) {
    return "municipality";
  }

  if (
    normalized.includes("wine to water") ||
    normalized.includes("sabal nepal") ||
    normalized.includes("save the saptari")
  ) {
    return "ngo";
  }

  return "government";
}

function getCategoryLabel(category: Exclude<Category, "all">) {
  switch (category) {
    case "government":
      return "Government";
    case "municipality":
      return "Municipality";
    case "ngo":
      return "NGO / INGO";
    default:
      return "";
  }
}

function getCategoryIcon(category: Category) {
  switch (category) {
    case "government":
      return Building2;
    case "municipality":
      return MapPin;
    case "ngo":
      return Globe2;
    default:
      return Sparkles;
  }
}

const CATEGORY_TABS: {
  id: Category;
  label: string;
  icon: typeof Sparkles;
}[] = [
  {
    id: "all",
    label: "All",
    icon: Sparkles,
  },
  {
    id: "government",
    label: "Government",
    icon: Building2,
  },
  {
    id: "municipality",
    label: "Municipality",
    icon: MapPin,
  },
  {
    id: "ngo",
    label: "NGO / INGO",
    icon: Globe2,
  },
];

function ClientCard({
  client,
  category,
  onSelect,
}: {
  client: Client;
  category: Exclude<Category, "all">;
  onSelect: (client: ClientWithCategory) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  const Icon = getCategoryIcon(category);

  const categoryColor =
    category === "government"
      ? THEME.blueGlow
      : category === "municipality"
        ? THEME.emeraldGlow
        : THEME.purpleGlow;

  return (
    <button
      type="button"
      onClick={() =>
        onSelect({
          ...client,
          category,
        })
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative w-full cursor-pointer rounded-2xl p-[1px] text-left transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      style={{
        background: isHovered
          ? `linear-gradient(135deg, ${THEME.cyanGlow}, ${THEME.purpleGlow}, ${THEME.orangeGlow})`
          : "rgba(255,255,255,0.09)",
      }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `linear-gradient(90deg, ${THEME.cyanGlow}33, ${THEME.purpleGlow}33, ${THEME.orangeGlow}33)`,
        }}
      />

      {/* Card */}
      <div
        className="relative flex min-h-[270px] flex-col justify-between overflow-hidden rounded-[15px] p-6 backdrop-blur-xl transition-all duration-300"
        style={{
          background: isHovered
            ? THEME.slateCardHover
            : THEME.slateCard,
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Ambient card glow */}
        <div
          className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
          style={{ background: categoryColor }}
        />

        {/* Header */}
        <div className="relative">
          <div className="flex items-start justify-between gap-3">
            {/* Logo */}
            <div
              className="flex h-14 w-14 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-2"
              style={{
                boxShadow: `0 8px 25px ${categoryColor}30`,
                border: "1px solid rgba(255,255,255,0.18)",
              }}
            >
              <img
                src={client.logo}
                alt={client.name}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Category */}
            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
              style={{
                color: categoryColor,
                borderColor: `${categoryColor}45`,
                background: `${categoryColor}12`,
              }}
            >
              <Icon className="h-3 w-3" />
              {getCategoryLabel(category)}
            </span>
          </div>

          {/* Name */}
          <h3
            className="mt-5 line-clamp-3 text-base font-bold leading-snug transition-colors duration-300 group-hover:text-cyan-300"
            style={{ color: THEME.textLight }}
          >
            {client.name}
          </h3>
        </div>

        {/* Footer */}
        <div
          className="relative mt-6 flex items-center justify-between border-t pt-4"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center gap-1.5">
            <CheckCircle2
              className="h-3.5 w-3.5"
              style={{ color: THEME.emeraldGlow }}
            />
            <span
              className="text-[11px]"
              style={{ color: THEME.textMuted }}
            >
              Trusted Client
            </span>
          </div>

          <div
            className="flex items-center gap-1 text-xs font-medium transition-transform duration-300 group-hover:translate-x-1"
            style={{ color: THEME.cyanGlow }}
          >
            <span>Details</span>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>

        {/* Bottom gradient line */}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-0 transition-all duration-500 group-hover:w-full"
          style={{
            background: `linear-gradient(90deg, ${THEME.cyanGlow}, ${THEME.purpleGlow}, ${THEME.orangeGlow})`,
          }}
        />
      </div>
    </button>
  );
}

export default function ClientsShowcase() {
  const [selectedCategory, setSelectedCategory] =
    useState<Category>("all");

  const [selectedClient, setSelectedClient] =
    useState<ClientWithCategory | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);

  /*
   * Convert the original CLIENTS data into display data.
   * The original client name and logo remain untouched.
   */
  const clientsWithCategories = useMemo<ClientWithCategory[]>(
    () =>
      CLIENTS.map((client) => ({
        ...client,
        category: getClientCategory(client.name),
      })),
    [],
  );

  /*
   * Search + category filter
   */
  const filteredClients = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return clientsWithCategories.filter((client) => {
      const matchesCategory =
        selectedCategory === "all" ||
        client.category === selectedCategory;

      const matchesSearch =
        query.length === 0 ||
        client.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [
    clientsWithCategories,
    selectedCategory,
    searchQuery,
  ]);

  /*
   * ESC key
   */
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /*
   * Prevent page scrolling while modal is open
   */
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const openClientDetails = (client: ClientWithCategory) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const resetFilters = () => {
    setSelectedCategory("all");
    setSearchQuery("");
  };

  return (
    <section
      className="relative min-h-screen overflow-hidden px-4 py-20 font-sans sm:px-6 lg:px-12"
      style={{
        background: THEME.slateDark,
        color: THEME.textLight,
      }}
    >
      {/* =====================================================
          AMBIENT BACKGROUND
      ====================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Cyan */}
        <div
          className="absolute -left-24 -top-40 h-[500px] w-[500px] rounded-full blur-[140px]"
          style={{
            background: THEME.cyanGlow,
            opacity: 0.12,
            animation: "clients-pulse 6s ease-in-out infinite",
          }}
        />

        {/* Purple */}
        <div
          className="absolute -right-28 top-1/4 h-[600px] w-[600px] rounded-full blur-[160px]"
          style={{
            background: THEME.purpleGlow,
            opacity: 0.1,
            animation: "clients-pulse 8s ease-in-out infinite",
          }}
        />

        {/* Orange */}
        <div
          className="absolute -bottom-32 left-1/4 h-[550px] w-[550px] rounded-full blur-[150px]"
          style={{
            background: THEME.orangeGlow,
            opacity: 0.1,
            animation: "clients-pulse 7s ease-in-out infinite",
          }}
        />

        {/* Architectural dot grid */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "32px 32px",
          }}
        />

        {/* Top line */}
        <div
          className="absolute left-0 top-0 h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${THEME.cyanGlow}40, ${THEME.purpleGlow}40, transparent)`,
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* =====================================================
            HEADER
        ====================================================== */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] backdrop-blur-md"
              style={{
                borderColor: `${THEME.cyanGlow}45`,
                background: `${THEME.cyanGlow}10`,
                color: THEME.cyanGlow,
              }}
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>OUR MAJOR CLIENTS</span>
            </div>

            {/* Heading */}
            <h1
              className="mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
              style={{ color: THEME.textLight }}
            >
              Trusted by Institutions
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${THEME.cyanGlow}, ${THEME.purpleGlow}, ${THEME.orangeGlow})`,
                }}
              >
                Across Nepal
              </span>
            </h1>

            <p
              className="mt-5 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: THEME.textMuted }}
            >
              We are proud to work with institutions and organizations
              across Nepal, delivering professional engineering and
              consultancy services with a commitment to quality,
              reliability, and technical excellence.
            </p>
          </div>

          {/* Counter */}
          <div
            className="flex w-fit items-center gap-4 rounded-2xl border p-4 backdrop-blur-xl"
            style={{
              borderColor: "rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div
              className="flex h-14 w-14 items-center justify-center rounded-xl text-2xl font-black text-white shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${THEME.cyanGlow}, ${THEME.blueGlow})`,
                boxShadow: `0 10px 30px ${THEME.cyanGlow}25`,
              }}
            >
              {CLIENTS.length}+
            </div>

            <div>
              <div
                className="text-sm font-semibold"
                style={{ color: THEME.textLight }}
              >
                Major Clients
              </div>

              <div
                className="mt-0.5 text-xs"
                style={{ color: THEME.textMuted }}
              >
                Across Nepal
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            FILTER TOOLBAR
        ====================================================== */}
        <div
          className="mt-12 flex flex-col gap-4 rounded-2xl border p-3 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between"
          style={{
            borderColor: "rgba(255,255,255,0.1)",
            background: "rgba(255,255,255,0.05)",
          }}
        >
          {/* Category buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_TABS.map((category) => {
              const Icon = category.icon;
              const isActive =
                selectedCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category.id)
                  }
                  className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium transition-all duration-300"
                  style={{
                    color: isActive
                      ? "#ffffff"
                      : THEME.textMuted,
                    background: isActive
                      ? `linear-gradient(90deg, ${THEME.cyanGlow}, ${THEME.blueGlow})`
                      : "rgba(255,255,255,0.05)",
                    boxShadow: isActive
                      ? `0 8px 25px ${THEME.cyanGlow}20`
                      : "none",
                  }}
                >
                  <Icon className="h-4 w-4" />
                  <span>{category.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search */}
          <div className="relative w-full lg:w-80">
            <Search
              className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: THEME.textMuted }}
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search major clients..."
              className="w-full rounded-xl border py-2.5 pl-10 pr-10 text-xs outline-none transition-colors"
              style={{
                borderColor: searchQuery
                  ? `${THEME.cyanGlow}60`
                  : "rgba(255,255,255,0.1)",
                background: "rgba(0,0,0,0.3)",
                color: THEME.textLight,
              }}
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                style={{ color: THEME.textMuted }}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* =====================================================
            RESULT COUNT
        ====================================================== */}
        <div className="mt-6 flex items-center justify-between">
          <p
            className="text-xs"
            style={{ color: THEME.textMuted }}
          >
            Showing{" "}
            <span
              className="font-semibold"
              style={{ color: THEME.cyanGlow }}
            >
              {filteredClients.length}
            </span>{" "}
            {filteredClients.length === 1
              ? "client"
              : "clients"}
          </p>

          {(selectedCategory !== "all" || searchQuery) && (
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-medium transition-colors"
              style={{ color: THEME.orangeGlow }}
            >
              Reset filters
            </button>
          )}
        </div>

        {/* =====================================================
            CLIENT GRID
        ====================================================== */}
        <div className="mt-5">
          {filteredClients.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredClients.map((client) => (
                <ClientCard
                  key={`${client.name}-${client.logo}`}
                  client={client}
                  category={client.category}
                  onSelect={openClientDetails}
                />
              ))}
            </div>
          ) : (
            /* Empty state */
            <div
              className="flex flex-col items-center justify-center rounded-2xl border border-dashed p-16 text-center"
              style={{
                borderColor: "rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.025)",
              }}
            >
              <div
                className="flex h-16 w-16 items-center justify-center rounded-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: THEME.textMuted,
                }}
              >
                <Search className="h-8 w-8" />
              </div>

              <h3
                className="mt-4 text-lg font-bold"
                style={{ color: THEME.textLight }}
              >
                No matching clients found
              </h3>

              <p
                className="mt-2 text-xs"
                style={{ color: THEME.textMuted }}
              >
                Try adjusting your search or category filter.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-xl border px-5 py-2.5 text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  borderColor: `${THEME.cyanGlow}45`,
                  background: `${THEME.cyanGlow}10`,
                  color: THEME.cyanGlow,
                }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* =====================================================
          CLIENT DETAIL MODAL
      ====================================================== */}
      {isModalOpen && selectedClient && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md sm:p-6"
          onClick={closeModal}
          role="presentation"
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border shadow-2xl"
            style={{
              background: "rgba(15, 23, 42, 0.97)",
              borderColor: "rgba(255,255,255,0.14)",
              boxShadow: `0 30px 100px ${THEME.cyanGlow}12`,
            }}
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="client-modal-title"
          >
            {/* Modal ambient glow */}
            <div
              className="pointer-events-none absolute -left-20 -top-20 h-52 w-52 rounded-full blur-[100px]"
              style={{
                background: THEME.cyanGlow,
                opacity: 0.12,
              }}
            />

            <div
              className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full blur-[100px]"
              style={{
                background: THEME.purpleGlow,
                opacity: 0.12,
              }}
            />

            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-5 z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:rotate-90"
              style={{
                color: THEME.textMuted,
                background: "rgba(255,255,255,0.08)",
              }}
              aria-label="Close client details"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="relative p-6 sm:p-8">
              {/* Modal Header */}
              <div className="flex items-start gap-4 pr-10">
                <div
                  className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white p-2 shadow-xl"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                  }}
                >
                  <img
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div className="min-w-0">
                  <span
                    className="inline-flex rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider"
                    style={{
                      color:
                        selectedClient.category ===
                        "government"
                          ? THEME.blueGlow
                          : selectedClient.category ===
                              "municipality"
                            ? THEME.emeraldGlow
                            : THEME.purpleGlow,
                      borderColor:
                        selectedClient.category ===
                        "government"
                          ? `${THEME.blueGlow}45`
                          : selectedClient.category ===
                              "municipality"
                            ? `${THEME.emeraldGlow}45`
                            : `${THEME.purpleGlow}45`,
                      background:
                        selectedClient.category ===
                        "government"
                          ? `${THEME.blueGlow}10`
                          : selectedClient.category ===
                              "municipality"
                            ? `${THEME.emeraldGlow}10`
                            : `${THEME.purpleGlow}10`,
                    }}
                  >
                    {getCategoryLabel(
                      selectedClient.category,
                    )}
                  </span>

                  <h2
                    id="client-modal-title"
                    className="mt-2 text-xl font-bold leading-snug sm:text-2xl"
                    style={{ color: THEME.textLight }}
                  >
                    {selectedClient.name}
                  </h2>
                </div>
              </div>

              {/* Information panel */}
              <div
                className="mt-7 grid gap-4 rounded-2xl border p-5 sm:grid-cols-2"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  borderColor: "rgba(255,255,255,0.07)",
                }}
              >
                <div>
                  <span
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: THEME.textMuted }}
                  >
                    Client Category
                  </span>

                  <p
                    className="mt-1.5 text-sm font-medium"
                    style={{ color: THEME.textLight }}
                  >
                    {getCategoryLabel(
                      selectedClient.category,
                    )}
                  </p>
                </div>

                <div>
                  <span
                    className="text-[10px] uppercase tracking-wider"
                    style={{ color: THEME.textMuted }}
                  >
                    Client Partnership
                  </span>

                  <p
                    className="mt-1.5 text-sm font-medium"
                    style={{ color: THEME.cyanGlow }}
                  >
                    Engineering & Consultancy Services
                  </p>
                </div>
              </div>

              {/* Our Network */}
              <div className="mt-7">
                <div className="flex items-center gap-2">
                  <ShieldCheck
                    className="h-4 w-4"
                    style={{ color: THEME.emeraldGlow }}
                  />

                  <h3
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: THEME.textLight }}
                  >
                    Our Network
                  </h3>
                </div>

                <p
                  className="mt-3 text-sm leading-7"
                  style={{ color: THEME.textMuted }}
                >
                  We are proud to work with institutions and
                  organizations across Nepal, providing
                  professional engineering and consultancy
                  services with a commitment to quality,
                  reliability, and technical excellence.
                </p>
              </div>

              {/* Footer */}
              <div
                className="mt-7 flex items-center justify-between border-t pt-5"
                style={{
                  borderColor: "rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2
                    className="h-4 w-4"
                    style={{ color: THEME.emeraldGlow }}
                  />

                  <span
                    className="text-xs"
                    style={{ color: THEME.textMuted }}
                  >
                    Trusted Engineering Partner
                  </span>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  className="text-xs font-semibold transition-colors"
                  style={{ color: THEME.orangeGlow }}
                >
                  Close
                </button>
              </div>
            </div>

            {/* Modal bottom gradient */}
            <div
              className="h-[2px] w-full"
              style={{
                background: `linear-gradient(90deg, ${THEME.cyanGlow}, ${THEME.purpleGlow}, ${THEME.orangeGlow})`,
              }}
            />
          </div>
        </div>
      )}

      {/* =====================================================
          ANIMATIONS
      ====================================================== */}
      <style jsx>{`
        @keyframes clients-pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.1;
          }

          50% {
            transform: scale(1.08);
            opacity: 0.16;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
}