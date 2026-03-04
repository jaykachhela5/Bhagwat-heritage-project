import { memo, useState, type FormEvent } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { useApi } from "../../hooks/useApi";
import { booksApi, issuesApi } from "../../services/api/books";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { Book } from "../../types";

export default memo(function LibraryPage() {
  const { data: books, loading, refetch } = useApi(() => booksApi.getAll());
  const [issueForm, setIssueForm] = useState({ bookId: "", studentName: "", phone: "" });
  const [msg, setMsg] = useState("");

  const handleIssue = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await issuesApi.issue(issueForm);
      setMsg("Book issued successfully!");
      setIssueForm({ bookId: "", studentName: "", phone: "" });
      refetch();
    } catch {
      setMsg("Failed to issue book.");
    }
  };

  return (
    <div>
      <HeroSection title="E-Library" subtitle="Knowledge at Your Fingertips" />

      <section className="py-16 max-w-6xl mx-auto px-4">
        <h2 className="section-title">Available Books</h2>

        {loading ? (
          <div className="flex justify-center py-8">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {(books ?? []).map((book: Book) => (
              <div key={book._id} className="bg-white rounded-xl shadow-md p-4">
                <div className="w-full h-32 bg-gradient-to-br from-[#0d3b66]/10 to-[#f4a261]/10 rounded-lg mb-3 flex items-center justify-center">
                  <i className="fas fa-book text-3xl text-[#0d3b66]" />
                </div>
                <h3 className="font-bold text-[#0d3b66] text-sm mb-1">{book.title}</h3>
                <p className="text-xs text-gray-500">{book.author}</p>
                {book.category && (
                  <span className="inline-block bg-[#0d3b66]/10 text-[#0d3b66] text-xs px-2 py-0.5 rounded mt-2">
                    {book.category}
                  </span>
                )}
                <p className="text-xs text-green-600 mt-1">Available: {book.available ?? 0}</p>
              </div>
            ))}
          </div>
        )}

        <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-[#0d3b66] mb-4">Issue a Book</h2>
          <form onSubmit={handleIssue} className="space-y-3">
            <select value={issueForm.bookId}
              onChange={(e) => setIssueForm((f) => ({ ...f, bookId: e.target.value }))} required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]">
              <option value="">Select Book</option>
              {(books ?? []).map((book: Book) => (
                <option key={book._id} value={book._id}>{book.title}</option>
              ))}
            </select>
            <input type="text" placeholder="Student Name" value={issueForm.studentName}
              onChange={(e) => setIssueForm((f) => ({ ...f, studentName: e.target.value }))} required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <input type="tel" placeholder="Phone" value={issueForm.phone}
              onChange={(e) => setIssueForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            {msg && <p className="text-green-600 text-sm">{msg}</p>}
            <button type="submit" className="btn-primary w-full py-3">Issue Book</button>
          </form>
        </div>
      </section>
    </div>
  );
});
