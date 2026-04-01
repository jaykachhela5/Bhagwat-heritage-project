import { memo, useState, useRef, useCallback } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { galleryApi } from "../../services/api/media";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { GalleryImage } from "../../types";

export default memo(function GalleryAdminPage() {
  const { data, loading, refetch } = useApi(() => galleryApi.getAll());
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = useCallback(
    async (file: File) => {
      setUploading(true);
      setProgress(0);
      setMsg("");
      try {
        const fd = new FormData();
        fd.append("image", file);
        await galleryApi.upload(fd, setProgress);
        setMsg("Uploaded successfully!");
        refetch();
      } catch {
        setMsg("Upload failed.");
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [refetch]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      if (!window.confirm("Delete this image?")) return;
      await galleryApi.delete(id);
      refetch();
    },
    [refetch]
  );

  return (
    <div>
      <HeroSection title="Gallery Upload" subtitle="Manage gallery images" />

      <section className="py-8 max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div
            className="border-2 border-dashed border-[#0f678c]/30 rounded-xl p-8 text-center cursor-pointer hover:border-[#0f678c] transition-colors"
            onClick={() => fileRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files[0];
              if (file) handleUpload(file);
            }}
          >
            <i className="fas fa-cloud-upload-alt text-4xl text-[#0f678c]/50 mb-3" />
            <p className="text-gray-500">Drag & Drop or click to upload</p>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleUpload(file);
              }}
            />
          </div>

          {uploading && (
            <div className="mt-4">
              <div className="bg-gray-200 rounded-full h-2">
                <div
                  className="bg-[#0f678c] h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="text-sm text-center text-gray-600 mt-1">{progress}%</p>
            </div>
          )}

          {msg && <p className="text-center text-green-600 mt-3">{msg}</p>}
        </div>

        {loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {(data ?? []).map((img: GalleryImage) => (
              <div key={img._id} className="relative group rounded-xl overflow-hidden shadow-md">
                <img
                  src={img.imageUrl}
                  alt="Gallery"
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => handleDelete(img._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
});

