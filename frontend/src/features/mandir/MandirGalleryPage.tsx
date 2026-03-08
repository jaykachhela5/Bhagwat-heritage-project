import { memo, useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { galleryApi } from "../../services/api/media";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { GalleryImage } from "../../types";

type Category = "All" | "Bhagwat Katha" | "Temple Activities" | "Social Work" | "Trust Members" | "Events";

type GalleryPhoto = {
  id: string;
  title: string;
  category: Exclude<Category, "All">;
  imageUrl: string;
  date: string;
  location: string;
};

const CATEGORIES: Category[] = ["All", "Bhagwat Katha", "Temple Activities", "Social Work", "Trust Members", "Events"];

const GALLERY_DATA: GalleryPhoto[] = [
  { id: "1", title: "Bhagwat Katha Mahotsav Day ", category: "Bhagwat Katha", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772864625/bhagwat_katha_q4rohk.png", date: "2026-01-15", location: "Bhagwat Dham, Chandrapur" },
  { id: "2", title: "Temple Morning Aarti", category: "Temple Activities", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772864623/0O7A6414_arzk7z.jpg", date: "2026-01-20", location: "Main Mandir Hall" },
  { id: "3", title: "Food Distribution Seva", category: "Social Work", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772864621/annseva_wslgjz.png", date: "2026-02-02", location: "Community Center" },
  { id: "4", title: "Kasthbhanjan hanumaan ", category: "Trust Members", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1771999936/hanuman5_yhct8y.jpg", date: "2026-02-08", location: "Trust Office" },
  { id: "5", title: "Insipiration of maharaj ji ", category: "Events", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1771583756/Inspriation_Main_vcxivd.jpg", date: "2026-02-14", location: "Temple Campus" },
  { id: "6", title: "Bhagwat geeta", category: "Bhagwat Katha", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772865019/geeta_kovakm.png", date: "2026-02-18", location: "Katha Mandap" },
  { id: "7", title: "Evening Deep Daan", category: "Temple Activities", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1771829450/sanskriti_3_bhvx6q.png", date: "2026-02-20", location: "Mandir Prangan" },
  { id: "8", title: "Medical Camp Seva", category: "Social Work", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772865163/IMG20210131120908_yedz0w.jpg", date: "2026-02-23", location: "Service Wing" },
  { id: "9", title: "Trust Volunteer Orientation", category: "Trust Members", imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80", date: "2026-02-26", location: "Seminar Room" },
  { id: "10", title: "Cultural Devotional Evening", category: "Events", imageUrl: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80", date: "2026-03-01", location: "Open Stage" },
  { id: "11", title: "Ghanshyam Maharaj ", category: "Bhagwat Katha", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772865479/IMG20211123174636_-_Copy_eegtvn.jpg", date: "2026-03-03", location: "Katha Mandap" },
  { id: "12", title: "Temple Volunteer Seva", category: "Temple Activities", imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80", date: "2026-03-05", location: "Temple Complex" },
];

const PAGE_SIZE = 8;
const SWIPE_THRESHOLD = 60;

function formatDate(dateISO: string): string {
  return new Date(dateISO).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

function inferCategory(title: string): Exclude<Category, "All"> {
  const t = title.toLowerCase();
  if (t.includes("katha")) return "Bhagwat Katha";
  if (t.includes("social") || t.includes("camp") || t.includes("service")) return "Social Work";
  if (t.includes("trust") || t.includes("member")) return "Trust Members";
  if (t.includes("darshan") || t.includes("aarti") || t.includes("mandir") || t.includes("temple")) return "Temple Activities";
  return "Events";
}

export default memo(function MandirGalleryPage() {
  const { data, loading } = useApi(() => galleryApi.getAll());
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const apiPhotos = useMemo<GalleryPhoto[]>(
    () =>
      (data ?? []).map((img: GalleryImage, index) => {
        const title = img._id ? `Gallery ${img._id}` : `Bhagwat Heritage Photo ${index + 1}`;
        return {
          id: `api-${img._id || index}`,
          title,
          category: inferCategory(title),
          imageUrl: img.imageUrl,
          date: img.createdAt || new Date().toISOString(),
          location: "Bhagwat Heritage Campus",
        };
      }),
    [data]
  );

  const allPhotos = useMemo(() => {
    const merged = [...apiPhotos, ...GALLERY_DATA];
    const seen = new Set<string>();
    return merged.filter((item) => {
      const key = item.imageUrl || item.id;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [apiPhotos]);

  const filteredPhotos = useMemo(() => {
    return allPhotos.filter((photo) => {
      const matchCategory = activeCategory === "All" || photo.category === activeCategory;
      const q = search.trim().toLowerCase();
      const matchSearch =
        q.length === 0 ||
        photo.title.toLowerCase().includes(q) ||
        photo.location.toLowerCase().includes(q) ||
        photo.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });
  }, [allPhotos, activeCategory, search]);

  const visiblePhotos = useMemo(() => filteredPhotos.slice(0, visibleCount), [filteredPhotos, visibleCount]);
  const currentPhoto = lightboxIndex !== null ? filteredPhotos[lightboxIndex] : null;

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeCategory, search]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredPhotos.length));
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredPhotos.length) % filteredPhotos.length));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex, filteredPhotos.length]);

  const openLightbox = (id: string) => {
    const idx = filteredPhotos.findIndex((photo) => photo.id === id);
    if (idx >= 0) setLightboxIndex(idx);
  };

  const goNext = () => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev + 1) % filteredPhotos.length));
  };

  const goPrev = () => {
    setLightboxIndex((prev) => (prev === null ? 0 : (prev - 1 + filteredPhotos.length) % filteredPhotos.length));
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0]?.clientX ?? null);
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX;
    const delta = endX - touchStartX;
    if (delta > SWIPE_THRESHOLD) goPrev();
    if (delta < -SWIPE_THRESHOLD) goNext();
    setTouchStartX(null);
  };

  const copyLink = async () => {
    if (!currentPhoto) return;
    try {
      await navigator.clipboard.writeText(currentPhoto.imageUrl);
    } catch {
      // no-op for unsupported clipboard
    }
  };

  return (
    <div className="pb-14">
      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div className="rounded-3xl border border-[#f1c999] bg-gradient-to-r from-[#fff8ef] via-[#fff5e8] to-[#fff1df] p-6 md:p-8 shadow-[0_14px_30px_rgba(172,85,22,0.16)]">
          <h1 className="text-3xl md:text-5xl font-black text-[#8a3d06]">Mandir Photo Gallery</h1>
          <p className="mt-3 text-[#7a4d28] md:text-lg">
            Explore the divine moments of Bhagwat Heritage events, Bhagwat Katha, temple activities, and social services.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className="rounded-2xl border border-[#f0c89d] bg-white p-4 shadow-sm">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos..."
            className="w-full rounded-xl border border-[#f3d7b7] px-4 py-2.5 text-sm outline-none focus:border-[#cb7422]"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#cb7422] text-white"
                    : "bg-[#fff4e7] text-[#8b4e1d] border border-[#f0c89d] hover:bg-[#ffe9d1]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        {loading && allPhotos.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {visiblePhotos.map((photo, index) => (
            <article
              key={photo.id}
              className="group relative overflow-hidden rounded-xl border border-[#f0d4b6] bg-white shadow-sm hover:shadow-lg transition-all duration-300 animate-[fadeIn_350ms_ease-out]"
              style={{ animationDelay: `${(index % 8) * 40}ms` }}
              onClick={() => openLightbox(photo.id)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="h-40 md:h-48 w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-colors duration-300" />
              <div className="absolute inset-x-0 bottom-0 p-3 text-white">
                <p className="text-xs md:text-sm font-semibold drop-shadow-md">{photo.title}</p>
              </div>
            </article>
          ))}
          </div>
        )}

        {visibleCount < filteredPhotos.length && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="rounded-xl bg-[#b85b12] px-6 py-2.5 text-white font-semibold hover:bg-[#9e4a0c] transition shadow-[0_8px_18px_rgba(153,74,12,0.26)]"
            >
              Load More Photos
            </button>
          </div>
        )}
      </section>

      {currentPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 p-4 flex items-center justify-center"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 text-white text-3xl"
            aria-label="Close lightbox"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-3 md:left-6 text-white text-3xl"
            aria-label="Previous image"
          >
            ‹
          </button>

          <div
            className="max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <img src={currentPhoto.imageUrl} alt={currentPhoto.title} className="w-full max-h-[72vh] object-contain rounded-xl" />
            <div className="mt-3 rounded-xl bg-white/10 border border-white/20 p-4 text-white">
              <h3 className="text-lg md:text-xl font-bold">{currentPhoto.title}</h3>
              <p className="text-sm text-white/80 mt-1">
                {formatDate(currentPhoto.date)} | {currentPhoto.location}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={currentPhoto.imageUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#cb7422] px-3 py-1.5 text-sm font-semibold hover:bg-[#af611a] transition"
                >
                  Download Image
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(currentPhoto.imageUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#25D366] px-3 py-1.5 text-sm font-semibold text-white"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPhoto.imageUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-[#1877F2] px-3 py-1.5 text-sm font-semibold text-white"
                >
                  Facebook
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-lg bg-[#f3f3f3] px-3 py-1.5 text-sm font-semibold text-[#1d1d1d]"
                >
                  Copy link
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-3 md:right-6 text-white text-3xl"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
});
