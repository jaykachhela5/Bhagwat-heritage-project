import { memo, useEffect, useMemo, useState } from "react";
import { useApi } from "../../hooks/useApi";
import { galleryApi } from "../../services/api/media";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { Card } from "../../components/ui/Card";
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
  { id: "11", title: "Ghanshyam Maharaj ", category: "Bhagwat Katha", imageUrl: "https://res.cloudinary.com/der8zinu8/image/upload/v1772865479/IMG20211123174636_-_Copy_eegtvn.jpg", date: "2026-03-03", location: "Katha Mandap" },
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
      <section className="py-6">
        <div className="rounded-[30px] border border-borderBeige bg-[linear-gradient(180deg,rgba(255,245,225,0.92)_0%,rgba(255,252,247,0.98)_48%,rgba(245,232,204,0.95)_100%)] p-6 shadow-[0_22px_52px_rgba(101,71,35,0.09)] md:p-8">
          <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-saffron">Media Gallery</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-tealDeep md:text-5xl">Photo Gallery</h1>
          <p className="mt-3 text-brownSoft md:text-lg">
            Explore the divine moments of Bhagwat Heritage events, Bhagwat Katha, temple activities, and social services.
          </p>
        </div>
      </section>

      <section className="py-6">
        <Card className="hover:scale-100">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search photos..."
            className="w-full rounded-xl border border-borderCard bg-white px-4 py-2.5 text-sm text-brown outline-none focus:border-gold"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-tealPrimary text-white"
                    : "border border-borderCard bg-bgSoft text-brownSoft hover:border-gold hover:bg-sand"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <section className="py-6">
        {loading && allPhotos.length === 0 ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visiblePhotos.map((photo, index) => (
            <Card
              key={photo.id}
              className="group relative overflow-hidden p-0 animate-[fadeIn_350ms_ease-out]"
              style={{ animationDelay: `${(index % 8) * 40}ms` }}
              onClick={() => openLightbox(photo.id)}
            >
              <img
                src={photo.imageUrl}
                alt={photo.title}
                loading="lazy"
                className="h-64 w-full rounded-t-xl object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-saffron">{photo.category}</p>
                <h3 className="mt-2 text-xl font-semibold text-tealCard">{photo.title}</h3>
                <p className="mt-2 text-brownSoft">{photo.location}</p>
                <p className="mt-1 text-sm text-brownSoft">{formatDate(photo.date)}</p>
              </div>
            </Card>
          ))}
          </div>
        )}

        {visibleCount < filteredPhotos.length && (
          <div className="text-center pt-8">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
              className="spiritual-btn-secondary"
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
            <div className="mt-3 rounded-xl border border-white/20 bg-white/10 p-4 text-white">
              <h3 className="text-lg font-bold md:text-xl">{currentPhoto.title}</h3>
              <p className="text-sm text-white/80 mt-1">
                {formatDate(currentPhoto.date)} | {currentPhoto.location}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  href={currentPhoto.imageUrl}
                  download
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#33210F] transition hover:bg-white/90"
                >
                  Download Image
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(currentPhoto.imageUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#33210F]"
                >
                  WhatsApp
                </a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentPhoto.imageUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-[#33210F]"
                >
                  Facebook
                </a>
                <button
                  type="button"
                  onClick={copyLink}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#33210F]"
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
