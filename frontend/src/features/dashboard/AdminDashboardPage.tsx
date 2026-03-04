import { memo, useState, useCallback, useRef } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { mediaApi } from "../../services/api/media";
import { volunteersApi } from "../../services/api/volunteers";
import { booksApi } from "../../services/api/books";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { Media, Volunteer, Book } from "../../types";

type Tab = "media" | "volunteers" | "books";

export default memo(function AdminDashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("media");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const { data: mediaData, loading: mediaLoading, refetch: refetchMedia } = useApi(
    () => mediaApi.getAll(page, search),
    [page, search]
  );
  const { data: volunteers, loading: volLoading, refetch: refetchVols } = useApi(
    () => volunteersApi.getAll()
  );
  const { data: books, loading: booksLoading, refetch: refetchBooks } = useApi(
    () => booksApi.getAll()
  );

  const handleUpload = useCallback(
    async (files: FileList) => {
      setUploading(true);
      setProgress(0);
      const fd = new FormData();
      Array.from(files).forEach((f) => fd.append("images", f));
      try {
        await mediaApi.upload(fd, setProgress);
        setMsg("Uploaded successfully!");
        refetchMedia();
      } catch {
        setMsg("Upload failed.");
      } finally {
        setUploading(false);
        setProgress(0);
      }
    },
    [refetchMedia]
  );

  const handleDeleteMedia = useCallback(
    async (id: string) => {
      if (!window.confirm("Delete this media?")) return;
      await mediaApi.delete(id);
      refetchMedia();
    },
    [refetchMedia]
  );

  const handleVolStatus = useCallback(
    async (id: string, status: string) => {
      await volunteersApi.updateStatus(id, { status });
      refetchVols();
    },
    [refetchVols]
  );

  const handleDeleteBook = useCallback(
    async (id: string) => {
      if (!window.confirm("Delete this book?")) return;
      await booksApi.delete(id);
      refetchBooks();
    },
    [refetchBooks]
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d3b66] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-300">Welcome, {user?.name}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["media", "volunteers", "books"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-lg capitalize font-semibold ${
                tab === t ? "bg-[#0d3b66] text-white" : "bg-white text-[#0d3b66] border"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {tab === "media" && (
          <div>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                placeholder="Search media..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
              <button className="btn-primary" onClick={() => fileRef.current?.click()}>
                + Upload
              </button>
              <input ref={fileRef} type="file" hidden multiple accept="image/*"
                onChange={(e) => { if (e.target.files) handleUpload(e.target.files); }} />
            </div>

            {uploading && (
              <div className="mb-4">
                <div className="bg-gray-200 rounded-full h-2">
                  <div className="bg-[#0d3b66] h-2 rounded-full" style={{ width: `${progress}%` }} />
                </div>
                <p className="text-sm text-center mt-1">{progress}%</p>
              </div>
            )}
            {msg && <p className="text-green-600 mb-3">{msg}</p>}

            {mediaLoading ? <LoadingSpinner size="lg" /> : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {(mediaData?.data ?? []).map((item: Media) => (
                    <div key={item._id} className="relative group rounded-lg overflow-hidden shadow">
                      <img src={item.path} alt={item.filename}
                        className="w-full h-28 object-cover" loading="lazy" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
                        <span className="text-white text-xs truncate flex-1">{item.filename}</span>
                        <button onClick={() => handleDeleteMedia(item._id)}
                          className="text-red-400 hover:text-red-300 ml-1">
                          <i className="fas fa-trash-alt" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                    className="btn-primary disabled:opacity-50">Prev</button>
                  <span>Page {page} / {mediaData?.pages ?? 1}</span>
                  <button onClick={() => setPage((p) => p + 1)}
                    disabled={page >= (mediaData?.pages ?? 1)} className="btn-primary disabled:opacity-50">Next</button>
                </div>
              </>
            )}
          </div>
        )}

        {tab === "volunteers" && (
          <div>
            {volLoading ? <LoadingSpinner size="lg" /> : (
              <div className="overflow-x-auto">
                <table className="w-full bg-white rounded-xl shadow-md overflow-hidden">
                  <thead className="bg-[#0d3b66] text-white">
                    <tr>
                      {["Name", "Email", "Phone", "Seva Area", "Status", "Actions"].map((h) => (
                        <th key={h} className="px-4 py-3 text-left text-sm">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(volunteers ?? []).map((v: Volunteer) => (
                      <tr key={v._id} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm">{v.fullName}</td>
                        <td className="px-4 py-3 text-sm">{v.email}</td>
                        <td className="px-4 py-3 text-sm">{v.phone}</td>
                        <td className="px-4 py-3 text-sm">{v.sevaArea}</td>
                        <td className="px-4 py-3">
                          <span className={`text-xs px-2 py-1 rounded-full font-semibold ${
                            v.status === "Approved" ? "bg-green-100 text-green-700" :
                            v.status === "Rejected" ? "bg-red-100 text-red-700" :
                            "bg-yellow-100 text-yellow-700"}`}>
                            {v.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button onClick={() => handleVolStatus(v._id, "Approved")}
                              className="text-xs bg-green-500 text-white px-2 py-1 rounded">Approve</button>
                            <button onClick={() => handleVolStatus(v._id, "Rejected")}
                              className="text-xs bg-red-500 text-white px-2 py-1 rounded">Reject</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {tab === "books" && (
          <div>
            {booksLoading ? <LoadingSpinner size="lg" /> : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {(books ?? []).map((book: Book) => (
                  <div key={book._id} className="bg-white rounded-xl shadow-md p-4">
                    <h3 className="font-bold text-[#0d3b66]">{book.title}</h3>
                    <p className="text-sm text-gray-500">{book.author}</p>
                    <p className="text-xs text-gray-400">{book.category}</p>
                    <p className="text-xs text-green-600">Available: {book.available ?? 0}</p>
                    <button onClick={() => handleDeleteBook(book._id)}
                      className="mt-2 text-xs text-red-500 hover:text-red-700">Delete</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
});
