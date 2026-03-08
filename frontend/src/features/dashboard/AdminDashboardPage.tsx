import { memo, useState, useCallback, useRef } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { useApi } from "../../hooks/useApi";
import { mediaApi } from "../../services/api/media";
import { volunteersApi } from "../../services/api/volunteers";
import { booksApi } from "../../services/api/books";
import { kundliRequestsApi } from "../../services/api/kundli";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { Media, Volunteer, Book, KundliRequest } from "../../types";

type Tab = "media" | "volunteers" | "books" | "kundli";

export default memo(function AdminDashboardPage() {
  const { user } = useAuth();
  const [tab, setTab] = useState<Tab>("media");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [msg, setMsg] = useState("");
  const [kundliMsg, setKundliMsg] = useState("");
  const [kundliUploadingId, setKundliUploadingId] = useState("");
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
  const { data: kundliRequests, loading: kundliLoading, refetch: refetchKundli } = useApi(
    () => kundliRequestsApi.getAll()
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

  const handleKundliStatus = useCallback(
    async (id: string, orderStatus: KundliRequest["orderStatus"]) => {
      await kundliRequestsApi.updateStatus(id, { orderStatus });
      setKundliMsg(`Order marked as ${orderStatus}.`);
      refetchKundli();
    },
    [refetchKundli]
  );

  const handleKundliReportUpload = useCallback(
    async (id: string, file: File) => {
      setKundliUploadingId(id);
      setKundliMsg("");
      const fd = new FormData();
      fd.append("reportPdf", file);

      try {
        await kundliRequestsApi.uploadReport(id, fd);
        setKundliMsg("Kundli report uploaded successfully.");
        refetchKundli();
      } catch {
        setKundliMsg("Failed to upload Kundli report.");
      } finally {
        setKundliUploadingId("");
      }
    },
    [refetchKundli]
  );

  const handleExportKundliCsv = useCallback(() => {
    if (!kundliRequests || kundliRequests.length === 0) return;

    const headers = [
      "Request ID",
      "Invoice Number",
      "Name",
      "Gender",
      "Order Date",
      "Email",
      "Mobile Number",
      "Date of Birth",
      "Time of Birth",
      "Place of Birth",
      "District",
      "State",
      "Country",
      "Selected Services",
      "Preferred Language",
      "Address",
      "Total Amount",
      "Payment Method",
      "Payment Status",
      "Payment Reference",
      "Order Status",
      "Estimated Delivery",
      "Report URL",
      "Created At",
    ];

    const rows = kundliRequests.map((request) => [
      request.orderId,
      request.invoiceNumber,
      request.fullName,
      request.gender,
      request.orderDate,
      request.email,
      request.mobileNumber,
      request.dateOfBirth,
      request.timeOfBirth,
      request.placeOfBirth,
      request.district,
      request.state,
      request.country,
      request.selectedServices.map((service) => `${service.title} (${service.pages}p / INR ${service.price})`).join(" | "),
      request.preferredLanguage,
      request.address ?? "",
      request.totalAmount,
      request.paymentMethod,
      request.paymentStatus,
      request.paymentReference,
      request.orderStatus,
      request.estimatedDeliveryTime,
      request.reportFileUrl ?? "",
      request.createdAt,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(",")
      )
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "kundli-requests.csv";
    link.click();
    URL.revokeObjectURL(url);
  }, [kundliRequests]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[#0d3b66] text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-300">Welcome, {user?.name}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(["media", "volunteers", "kundli", "books"] as Tab[]).map((t) => (
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

        {tab === "kundli" && (
          <div>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-[#0d3b66]">Kundli Orders</h2>
                <p className="text-sm text-gray-500">Review order details, payment confirmation, export records, update status, and upload completed PDFs.</p>
              </div>
              <button onClick={handleExportKundliCsv} className="btn-primary">
                Export Requests CSV
              </button>
            </div>

            {kundliMsg && <p className="mb-3 text-sm font-semibold text-green-600">{kundliMsg}</p>}

            {kundliLoading ? <LoadingSpinner size="lg" /> : (
              <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {(kundliRequests ?? []).map((request: KundliRequest) => (
                  <article key={request._id} className="rounded-2xl bg-white p-5 shadow-md">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-[#7a5634]">{request.orderId}</p>
                        <h3 className="mt-1 text-xl font-black text-[#0d3b66]">{request.fullName}</h3>
                        <p className="text-sm text-gray-500">{request.email} | {request.mobileNumber}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        request.orderStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : request.orderStatus === "Processing"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {request.orderStatus}
                      </span>
                    </div>

                    <div className="mt-4 grid gap-3 text-sm text-gray-700 md:grid-cols-2">
                      <p><span className="font-semibold text-[#0d3b66]">Invoice:</span> {request.invoiceNumber}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Payment:</span> {request.paymentMethod} / {request.paymentStatus}</p>
                      <p><span className="font-semibold text-[#0d3b66]">DOB:</span> {request.dateOfBirth}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Birth Time:</span> {request.timeOfBirth}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Birth Place:</span> {request.placeOfBirth}</p>
                      <p><span className="font-semibold text-[#0d3b66]">District / State:</span> {request.district}, {request.state}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Country:</span> {request.country}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Language:</span> {request.preferredLanguage}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Amount:</span> INR {request.totalAmount.toLocaleString()}</p>
                      <p><span className="font-semibold text-[#0d3b66]">Payment Ref:</span> {request.paymentReference}</p>
                      <p className="md:col-span-2"><span className="font-semibold text-[#0d3b66]">Estimated Delivery:</span> {request.estimatedDeliveryTime}</p>
                      <p className="md:col-span-2"><span className="font-semibold text-[#0d3b66]">Selected Services:</span> {request.selectedServices.map((service) => `${service.title} (${service.pages}p / INR ${service.price})`).join(", ")}</p>
                      {request.address ? (
                        <p className="md:col-span-2"><span className="font-semibold text-[#0d3b66]">Address:</span> {request.address}</p>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {request.reportFileUrl ? (
                        <a href={request.reportFileUrl} target="_blank" rel="noreferrer" className="rounded-lg border px-3 py-2 text-sm font-semibold text-[#0d3b66]">
                          View PDF Report
                        </a>
                      ) : null}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={() => handleKundliStatus(request._id, "Pending")} className="rounded-lg bg-yellow-500 px-3 py-2 text-xs font-semibold text-white">
                        Pending
                      </button>
                      <button onClick={() => handleKundliStatus(request._id, "Processing")} className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white">
                        Processing
                      </button>
                      <button onClick={() => handleKundliStatus(request._id, "Completed")} className="rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white">
                        Completed
                      </button>
                    </div>

                    <div className="mt-4 rounded-xl border border-dashed border-[#d8e4f2] bg-[#f8fbff] p-4">
                      <label className="block text-sm font-semibold text-[#0d3b66]">
                        Upload Completed Kundli PDF
                        <input
                          type="file"
                          accept="application/pdf"
                          className="mt-2 block w-full text-sm"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleKundliReportUpload(request._id, file);
                          }}
                        />
                      </label>
                      {kundliUploadingId === request._id ? (
                        <p className="mt-2 text-xs text-gray-500">Uploading report...</p>
                      ) : null}
                    </div>
                  </article>
                ))}
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
