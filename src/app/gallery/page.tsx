"use client";

import { useEffect, useState, useMemo } from "react";
import { COLORS } from "@/lib/theme";
import CustomCursor from "@/components/CustomCursor";
import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

type GalleryPhoto = {
  id: string;
  url: string;
  category: string;
  caption: string;
  isPhotoOfTheWeek: boolean;
};

const CATEGORIES = ["All", "Field Survey", "Site Progress", "Aerial / Drone", "Community"];

function Lightbox({
  photos,
  index,
  onClose,
  onNav,
}: {
  photos: GalleryPhoto[];
  index: number;
  onClose: () => void;
  onNav: (dir: 1 | -1) => void;
}) {
  const photo = photos[index];
  return (
    <div className="fixed inset-0 z-[9997] flex items-center justify-center p-4 md:p-10" style={{ background: `${COLORS.slate}F0` }} onClick={onClose}>
      <button onClick={onClose} className="absolute top-4 right-4 md:top-8 md:right-8 text-3xl leading-none" style={{ color: COLORS.paper }}>×</button>
      <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} className="absolute left-2 md:left-8 text-3xl px-3 py-2" style={{ color: COLORS.paper }}>‹</button>
      <button onClick={(e) => { e.stopPropagation(); onNav(1); }} className="absolute right-2 md:right-8 text-3xl px-3 py-2" style={{ color: COLORS.paper }}>›</button>
      <div className="max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={photo.url} alt={photo.caption} className="w-full max-h-[75vh] object-contain rounded-lg" />
        <div className="mt-4 text-center">
          <div className="text-sm font-semibold" style={{ color: COLORS.paper }}>{photo.caption}</div>
          <div className="text-xs mt-1" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>{photo.category}</div>
        </div>
      </div>
    </div>
  );
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((data) => setPhotos(data.photos ?? []))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(
    () => (activeCategory === "All" ? photos : photos.filter((p) => p.category === activeCategory)),
    [activeCategory, photos]
  );
  const photoOfWeek = photos.find((p) => p.isPhotoOfTheWeek);

  function openLightbox(photo: GalleryPhoto) {
    setLightboxIndex(filtered.findIndex((p) => p.id === photo.id));
  }
  function navigate(dir: 1 | -1) {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + dir + filtered.length) % filtered.length);
  }

  return (
    <div style={{ fontFamily: "'Space Grotesk', sans-serif", background: COLORS.paper }} className="w-full min-h-screen">
      <CustomCursor />
      <SiteNav />

      <section className="px-6 md:px-12 pt-32 pb-16" style={{ background: `linear-gradient(180deg, ${COLORS.slate} 0%, ${COLORS.paper} 100%)` }}>
        <div className="text-xs mb-3 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>FIELD ARCHIVE</div>
        <h1 className="text-4xl md:text-5xl font-bold max-w-2xl" style={{ color: COLORS.paper }}>From the field.</h1>
        <p className="text-base mt-4 max-w-xl" style={{ color: COLORS.paperDim }}>
          Site surveys, DPR investigations, drone aerials, and community consultations from across our project sites.
        </p>
      </section>

      {loading ? (
        <p className="px-6 md:px-12 py-16 text-sm text-gray-400">Loading…</p>
      ) : photos.length === 0 ? (
        <p className="px-6 md:px-12 py-16 text-sm text-gray-400">No photos yet — check back soon.</p>
      ) : (
        <>
          {photoOfWeek && (
            <section className="px-6 md:px-12 pb-16">
              <div className="text-xs mb-4 tracking-widest" style={{ color: COLORS.orange, fontFamily: "'JetBrains Mono'" }}>PHOTO OF THE WEEK</div>
              <button onClick={() => openLightbox(photoOfWeek)} className="block w-full text-left rounded-lg overflow-hidden relative" style={{ aspectRatio: "21/9" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={photoOfWeek.url} alt={photoOfWeek.caption} className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex items-end p-6" style={{ background: `linear-gradient(180deg, transparent 40%, ${COLORS.slate}E6 100%)` }}>
                  <span className="text-lg font-semibold" style={{ color: COLORS.paper }}>{photoOfWeek.caption}</span>
                </div>
              </button>
            </section>
          )}

          <section className="px-6 md:px-12 pb-6">
            <div className="flex gap-2 flex-wrap">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-colors"
                  style={activeCategory === cat ? { background: COLORS.orange, color: COLORS.slate } : { background: COLORS.paperDim, color: COLORS.slate }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          <section className="px-6 md:px-12 pb-24 md:pb-32">
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filtered.map((photo) => (
                <button key={photo.id} onClick={() => openLightbox(photo)} className="relative overflow-hidden rounded-lg group" style={{ aspectRatio: "4/3" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(180deg, transparent 40%, ${COLORS.slate}E6 100%)` }}>
                    <span className="text-sm font-medium" style={{ color: COLORS.paper }}>{photo.caption}</span>
                  </div>
                </button>
              ))}
            </div>
          </section>
        </>
      )}

      {lightboxIndex !== null && (
        <Lightbox photos={filtered} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNav={navigate} />
      )}

      <SiteFooter />
    </div>
  );
}
