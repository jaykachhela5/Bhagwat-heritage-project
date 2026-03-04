import { memo, useState, useMemo, useCallback } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { galleryApi } from "../../services/api/media";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { GalleryImage } from "../../types";

type Category = "All" | "Kast Bhanjan Hanuman" | "Ghanshyam Maharaj" | "Socials & Culture";

const STATIC_GALLERY: { title: string; date: string; category: Category; imageUrl: string }[] = [
  { title: "Hanuman Jayanti 2025", date: "14 Jan 2025", category: "Kast Bhanjan Hanuman", imageUrl: "" },
  { title: "Ghanshyam Darshan", date: "10 Feb 2025", category: "Ghanshyam Maharaj", imageUrl: "" },
  { title: "Cultural Night", date: "22 Nov 2024", category: "Socials & Culture", imageUrl: "" },
];

export default memo(function MandirGalleryPage() {
  const { data, loading } = useApi(() => galleryApi.getAll());
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);

  const categories: Category[] = ["All", "Kast Bhanjan Hanuman", "Ghanshyam Maharaj", "Socials & Culture"];

  const apiImages = useMemo(
    () =>
      (data ?? []).map((img: GalleryImage) => ({
        title: img._id,
        date: new Date(img.createdAt).toLocaleDateString(),
        category: "All" as Category,
        imageUrl: img.imageUrl,
      })),
    [data]
  );

  const allImages = apiImages.length > 0 ? apiImages : STATIC_GALLERY;
  const filtered = useMemo(
    () => (activeCategory === "All" ? allImages : allImages.filter((img) => img.category === activeCategory)),
    [allImages, activeCategory]
  );

  const openLightbox = useCallback((url: string) => setLightboxImg(url), []);

  return (
    <div>
      <HeroSection title="Gallery" subtitle="Bhagwat Heritage — Dham Chandrapur" />

      <section className="py-8 max-w-6xl mx-auto px-4">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[#0d3b66] text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((img, i) => (
              <div
                key={i}
                className="group cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                onClick={() => img.imageUrl && openLightbox(img.imageUrl)}
              >
                {img.imageUrl ? (
                  <img
                    src={img.imageUrl}
                    alt={img.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-gradient-to-br from-[#0d3b66]/20 to-[#f4a261]/20 flex items-center justify-center">
                    <i className="fas fa-image text-3xl text-gray-400" />
                  </div>
                )}
                <div className="p-3 bg-white">
                  <h4 className="font-semibold text-[#0d3b66] text-sm">{img.title}</h4>
                  <p className="text-xs text-gray-500">{img.date}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {lightboxImg && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightboxImg(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-3xl"
            onClick={() => setLightboxImg(null)}
          >
            ×
          </button>
          <img
            src={lightboxImg}
            alt="Gallery"
            className="max-w-full max-h-[90vh] object-contain rounded-xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
});
