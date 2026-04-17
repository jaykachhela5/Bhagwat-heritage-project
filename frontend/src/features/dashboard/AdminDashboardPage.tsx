import { memo, useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { useAuth } from "../../app/providers/AuthProvider";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import { useApi } from "../../hooks/useApi";
import { booksApi, issuesApi } from "../../services/api/books";
import { libraryDonationsApi, libraryRequestsApi, libraryStatsApi } from "../../services/api/libraryAdmin";
import { membersApi } from "../../services/api/misc";
import type { Book, Issue, LibraryDonation, LibraryRequest, LibraryStats, Member } from "../../types";

type Section = "dashboard" | "books" | "issues" | "users" | "requests" | "donations" | "stats";

const navItems: Array<{ id: Section; label: string; description: string }> = [
  { id: "dashboard", label: "Dashboard", description: "Overview and quick health of the library." },
  { id: "books", label: "Books", description: "Manage titles, authors, stock, and cover images." },
  { id: "issues", label: "Circulation", description: "Track issue and return activity." },
  { id: "users", label: "Users", description: "Approve or reject member registrations." },
  { id: "requests", label: "Requests", description: "Review book requests from readers." },
  { id: "donations", label: "Donations", description: "Record book donors and stock support." },
  { id: "stats", label: "Stats", description: "Update public-facing library impact numbers." },
];

const panel = "rounded-[28px] border border-[#d6e2ea] bg-white p-5 shadow-[0_18px_40px_rgba(15,47,87,0.08)] md:p-6";
const card = "rounded-2xl border border-[#d7e5ef] bg-[#f8fbfe] p-4";
const input =
  "w-full rounded-xl border border-[#d3dee8] bg-[#f8fbff] px-4 py-3 text-sm text-[#173b57] placeholder:text-[#697988] focus:outline-none focus:ring-2 focus:ring-[#0f678c]/30";
const label = "text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]";
const actionButton =
  "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition";
const emptyStats: LibraryStats = { totalBooks: 0, totalUsers: 0, studentsBenefited: 0, activeMembers: 0 };

const formatDate = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (value?: string) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const readFileAsDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result ?? ""));
    reader.onerror = () => reject(new Error("Unable to read file"));
    reader.readAsDataURL(file);
  });

const StatusBadge = ({ value }: { value: string }) => {
  const tone =
    value === "Approved" || value === "Returned" || value === "Available"
      ? "bg-emerald-100 text-emerald-700"
      : value === "Rejected"
        ? "bg-red-100 text-red-700"
        : value === "Issued"
          ? "bg-sky-100 text-sky-700"
          : "bg-amber-100 text-amber-700";
  return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${tone}`}>{value}</span>;
};

const Notice = ({ text, tone = "info" }: { text: string; tone?: "info" | "error" }) => {
  if (!text) return null;
  return (
    <p
      className={`rounded-xl px-4 py-3 text-sm font-medium ${
        tone === "error" ? "bg-red-50 text-red-700" : "bg-[#ecf7fd] text-[#0f678c]"
      }`}
    >
      {text}
    </p>
  );
};

const SectionHeader = ({ title, description }: { title: string; description: string }) => (
  <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
    <div>
      <h2 className="text-[13px] font-bold uppercase tracking-[0.18em] text-[var(--campaign-accent)]">{title}</h2>
      <p className="mt-2 max-w-3xl text-base leading-7 text-[#4f6374]">{description}</p>
    </div>
  </div>
);

const TableEmpty = ({ message }: { message: string }) => (
  <div className="rounded-2xl border border-dashed border-[#d7e5ef] bg-[#f8fbfe] px-4 py-10 text-center text-sm text-[#648091]">
    {message}
  </div>
);

const SectionLoading = () => (
  <div className="rounded-2xl border border-dashed border-[#d7e5ef] bg-[#f8fbfe] px-4 py-10">
    <LoadingSpinner size="md" />
  </div>
);

export default memo(function AdminDashboardPage() {
  const { user } = useAuth();
  const [section, setSection] = useState<Section>("dashboard");
  const [bookSearch, setBookSearch] = useState("");
  const [bookForm, setBookForm] = useState({ id: "", title: "", author: "", category: "", quantity: "1", image: "" });
  const [issueForm, setIssueForm] = useState({ bookId: "", userName: "", phone: "", returnDate: "" });
  const [donationForm, setDonationForm] = useState({ donorName: "", bookDetails: "", quantity: "1" });
  const [statsForm, setStatsForm] = useState({ totalBooks: "0", totalUsers: "0", studentsBenefited: "0", activeMembers: "0" });
  const [bookNotice, setBookNotice] = useState("");
  const [issueNotice, setIssueNotice] = useState("");
  const [memberNotice, setMemberNotice] = useState("");
  const [requestNotice, setRequestNotice] = useState("");
  const [donationNotice, setDonationNotice] = useState("");
  const [statsNotice, setStatsNotice] = useState("");
  const [bookSubmitting, setBookSubmitting] = useState(false);

  const { data: books, loading: booksLoading, error: booksError, refetch: refetchBooks } = useApi(() => booksApi.getAll());
  const { data: issues, loading: issuesLoading, error: issuesError, refetch: refetchIssues } = useApi(() => issuesApi.getAll());
  const { data: members, loading: membersLoading, error: membersError, refetch: refetchMembers } = useApi(() => membersApi.getAll());
  const { data: requests, loading: requestsLoading, error: requestsError, refetch: refetchRequests } = useApi(() => libraryRequestsApi.getAll());
  const {
    data: libraryDonations,
    loading: libraryDonationsLoading,
    error: libraryDonationsError,
    refetch: refetchLibraryDonations,
  } = useApi(() => libraryDonationsApi.getAll());
  const { data: libraryStats, loading: statsLoading, error: statsError, refetch: refetchStats } = useApi(() => libraryStatsApi.get());

  const bookRows = books ?? [];
  const issueRows = issues ?? [];
  const memberRows = members ?? [];
  const requestRows = requests ?? [];
  const donationRows = libraryDonations ?? [];

  useEffect(() => {
    if (libraryStats) {
      setStatsForm({
        totalBooks: String(libraryStats.totalBooks ?? 0),
        totalUsers: String(libraryStats.totalUsers ?? 0),
        studentsBenefited: String(libraryStats.studentsBenefited ?? 0),
        activeMembers: String(libraryStats.activeMembers ?? 0),
      });
    }
  }, [libraryStats]);

  const filteredBooks = useMemo(() => {
    const query = bookSearch.trim().toLowerCase();
    if (!query) return bookRows;
    return bookRows.filter((book) =>
      [book.title, book.author, book.category].some((value) => (value ?? "").toLowerCase().includes(query))
    );
  }, [bookRows, bookSearch]);

  const overview = useMemo(() => {
    const totalCopies = bookRows.reduce((sum, book) => sum + Number(book.quantity ?? book.available ?? 0), 0);
    return {
      totalBooks: Number(statsForm.totalBooks) || totalCopies,
      issuedBooks: issueRows.filter((item) => item.status?.toLowerCase() !== "returned").length,
      activeUsers:
        Number(statsForm.totalUsers) ||
        memberRows.filter((item) => (item.status ?? "Pending") === "Approved").length ||
        memberRows.length,
      pendingRequests: requestRows.filter((item) => item.status === "Pending").length,
    };
  }, [bookRows, issueRows, memberRows, requestRows, statsForm]);

  const statsSnapshot = libraryStats ?? emptyStats;
  const sectionInfo = navItems.find((item) => item.id === section);

  const resetBookForm = () => setBookForm({ id: "", title: "", author: "", category: "", quantity: "1", image: "" });

  const handleBookImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const image = await readFileAsDataUrl(file);
      setBookForm((current) => ({ ...current, image }));
      setBookNotice("Cover image attached successfully.");
    } catch {
      setBookNotice("Unable to read the selected image.");
    }
  };

  const handleBookSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setBookSubmitting(true);
    setBookNotice("");
    try {
      const quantity = Math.max(0, Number(bookForm.quantity) || 0);
      const basePayload = {
        title: bookForm.title.trim(),
        author: bookForm.author.trim(),
        category: bookForm.category.trim() || undefined,
        image: bookForm.image || undefined,
        quantity,
      };

      if (bookForm.id) {
        const current = bookRows.find((item) => item._id === bookForm.id);
        const currentQuantity = Number(current?.quantity ?? current?.available ?? quantity);
        const currentAvailable = Number(current?.available ?? currentQuantity);
        const issuedCount = Math.max(currentQuantity - currentAvailable, 0);
        await booksApi.update(bookForm.id, {
          ...basePayload,
          available: Math.max(quantity - issuedCount, 0),
        });
        setBookNotice("Book updated successfully.");
      } else {
        await booksApi.add({ ...basePayload, available: quantity });
        setBookNotice("Book added successfully.");
      }

      resetBookForm();
      refetchBooks();
    } catch {
      setBookNotice("Unable to save book details right now.");
    } finally {
      setBookSubmitting(false);
    }
  };

  const handleIssueSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIssueNotice("");
    try {
      await issuesApi.issue({
        bookId: issueForm.bookId,
        studentName: issueForm.userName.trim(),
        phone: issueForm.phone.trim() || undefined,
        returnDate: issueForm.returnDate || undefined,
      });
      setIssueNotice("Book issued successfully.");
      setIssueForm({ bookId: "", userName: "", phone: "", returnDate: "" });
      refetchIssues();
      refetchBooks();
    } catch {
      setIssueNotice("Unable to issue the selected book.");
    }
  };

  const handleBookEdit = (book: Book) => {
    setSection("books");
    setBookForm({
      id: book._id,
      title: book.title,
      author: book.author,
      category: book.category ?? "",
      quantity: String(book.quantity ?? book.available ?? 0),
      image: book.image ?? "",
    });
    setBookNotice("");
  };

  const handleBookDelete = async (id: string) => {
    if (!window.confirm("Delete this book?")) return;
    try {
      await booksApi.delete(id);
      setBookNotice("Book deleted successfully.");
      if (bookForm.id === id) resetBookForm();
      refetchBooks();
    } catch {
      setBookNotice("Unable to delete this book right now.");
    }
  };

  const handleIssueReturn = async (issue: Issue) => {
    try {
      await issuesApi.update(issue._id, { status: "Returned" });
      setIssueNotice("Issue status updated successfully.");
      refetchIssues();
      refetchBooks();
    } catch {
      setIssueNotice("Unable to update the return status.");
    }
  };

  const handleMemberStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
    try {
      await membersApi.updateStatus(id, { status });
      setMemberNotice(`Member marked as ${status}.`);
      refetchMembers();
    } catch {
      setMemberNotice("Unable to update member status.");
    }
  };

  const handleRequestStatus = async (id: string, status: "Pending" | "Approved" | "Rejected") => {
    try {
      await libraryRequestsApi.updateStatus(id, { status });
      setRequestNotice(`Request marked as ${status}.`);
      refetchRequests();
    } catch {
      setRequestNotice("Unable to update request status.");
    }
  };

  const handleDonationSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setDonationNotice("");
    try {
      await libraryDonationsApi.create({
        donorName: donationForm.donorName.trim(),
        bookDetails: donationForm.bookDetails.trim(),
        quantity: Math.max(1, Number(donationForm.quantity) || 1),
      });
      setDonationNotice("Donation record added successfully.");
      setDonationForm({ donorName: "", bookDetails: "", quantity: "1" });
      refetchLibraryDonations();
    } catch {
      setDonationNotice("Unable to save the donation record.");
    }
  };

  const handleStatsSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatsNotice("");
    try {
      await libraryStatsApi.update({
        totalBooks: Math.max(0, Number(statsForm.totalBooks) || 0),
        totalUsers: Math.max(0, Number(statsForm.totalUsers) || 0),
        studentsBenefited: Math.max(0, Number(statsForm.studentsBenefited) || 0),
        activeMembers: Math.max(0, Number(statsForm.activeMembers) || 0),
      });
      setStatsNotice("Library stats updated successfully.");
      refetchStats();
    } catch {
      setStatsNotice("Unable to update library stats.");
    }
  };

  const availableBooks = bookRows.filter((book) => Number(book.available ?? 0) > 0);
  const activeSectionDescription = sectionInfo?.description ?? "Manage and monitor your library operations.";

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#edf6fb_0%,var(--color-surface-hover)_100%)]">
      <div className="border-b border-[#d8e4eb] bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#0f678c]">Library Admin</p>
            <h1 className="text-2xl font-black text-[#173b57]">Library Management Dashboard</h1>
          </div>
          <p className="text-sm text-[#5b6c79]">Welcome, {user?.name ?? "Admin"}</p>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-6 md:grid-cols-[260px_1fr]">
        <aside className="rounded-[28px] border border-[#d6e2ea] bg-white p-4 shadow-[0_18px_40px_rgba(15,47,87,0.08)]">
          <div className="flex gap-2 overflow-x-auto md:block md:space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setSection(item.id)}
                className={`min-w-fit rounded-2xl px-4 py-3 text-left text-sm font-bold transition md:w-full ${
                  section === item.id ? "bg-[#0f678c] text-white" : "bg-[#eef5fb] text-[#173b57] hover:bg-[#ddebf7]"
                }`}
              >
                <span className="block">{item.label}</span>
                <span className={`mt-1 block text-xs font-medium ${section === item.id ? "text-white/80" : "text-[#6d8090]"}`}>
                  {item.description}
                </span>
              </button>
            ))}
          </div>
        </aside>

        <main className="space-y-6">
          <section className={panel}>
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className={label}>Dashboard Overview</h2>
                <p className="mt-2 max-w-3xl text-base leading-7 text-[#4f6374]">{activeSectionDescription}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSection("books")}
                  className={`${actionButton} bg-[var(--campaign-accent)] text-white hover:bg-[#d68612]`}
                >
                  Add Book
                </button>
                <button
                  onClick={() => setSection("requests")}
                  className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}
                >
                  Review Requests
                </button>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[
                { title: "Total Books", value: overview.totalBooks, note: "Books recorded across the library collection" },
                { title: "Issued Books", value: overview.issuedBooks, note: "Books currently in circulation with members" },
                { title: "Active Users", value: overview.activeUsers, note: "Approved or tracked members using the library" },
                { title: "Pending Requests", value: overview.pendingRequests, note: "Requests waiting for admin review or action" },
              ].map((item) => (
                <article key={item.title} className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9de0ff]">{item.title}</p>
                  <p className="mt-3 text-4xl font-black">{item.value}</p>
                  <p className="mt-3 text-sm leading-7 text-white/85">{item.note}</p>
                </article>
              ))}
            </div>
          </section>

          {section === "dashboard" && (
            <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Quick Summary"
                  description="Use this dashboard to manage library books, member approvals, issue tracking, request handling, donations, and impact numbers from one clean admin workspace."
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <article className={card}>
                    <p className={label}>Books in Stock</p>
                    <p className="mt-3 text-3xl font-black text-[#173b57]">{bookRows.length}</p>
                    <p className="mt-3 text-sm leading-7 text-[#567184]">
                      Titles can be added, edited, deleted, and updated with quantity, availability, and cover image.
                    </p>
                  </article>
                  <article className={card}>
                    <p className={label}>Circulation Status</p>
                    <p className="mt-3 text-3xl font-black text-[#173b57]">{issueRows.length}</p>
                    <p className="mt-3 text-sm leading-7 text-[#567184]">
                      Track each borrowed book with borrower name, issue date, expected return date, and live status.
                    </p>
                  </article>
                  <article className={card}>
                    <p className={label}>Members & Requests</p>
                    <p className="mt-3 text-3xl font-black text-[#173b57]">{memberRows.length + requestRows.length}</p>
                    <p className="mt-3 text-sm leading-7 text-[#567184]">
                      Approve library members, review book requests, and keep service flow organized for students and readers.
                    </p>
                  </article>
                  <article className={card}>
                    <p className={label}>Donations & Impact</p>
                    <p className="mt-3 text-3xl font-black text-[#173b57]">{donationRows.length}</p>
                    <p className="mt-3 text-sm leading-7 text-[#567184]">
                      Record donor contributions and update public-facing stats like books, users, and students benefited.
                    </p>
                  </article>
                </div>
              </div>

              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Recent Snapshot"
                  description="A quick pulse of what currently needs attention in the library."
                />
                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-2xl bg-[#f8fbfe] px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#173b57]">Books available to issue</p>
                      <p className="text-sm text-[#6c8192]">Titles with copies ready for readers</p>
                    </div>
                    <span className="text-2xl font-black text-[#0f678c]">{availableBooks.length}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#f8fbfe] px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#173b57]">Pending member approvals</p>
                      <p className="text-sm text-[#6c8192]">Registrations waiting for action</p>
                    </div>
                    <span className="text-2xl font-black text-[#0f678c]">
                      {memberRows.filter((member) => (member.status ?? "Pending") === "Pending").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#f8fbfe] px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#173b57]">Pending book requests</p>
                      <p className="text-sm text-[#6c8192]">Reader requests that need approval</p>
                    </div>
                    <span className="text-2xl font-black text-[#0f678c]">
                      {requestRows.filter((request) => request.status === "Pending").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-[#f8fbfe] px-4 py-4">
                    <div>
                      <p className="text-sm font-semibold text-[#173b57]">Last stats update</p>
                      <p className="text-sm text-[#6c8192]">Library impact numbers last refreshed</p>
                    </div>
                    <span className="text-sm font-semibold text-[#0f678c]">{formatDateTime(statsSnapshot.updatedAt)}</span>
                  </div>
                </div>
              </div>
            </section>
          )}

          {section === "books" && (
            <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title={bookForm.id ? "Edit Book" : "Add Book"}
                  description="Create or update library books with title, author, category, quantity, and cover image."
                />
                <Notice text={bookNotice || booksError || ""} tone={booksError ? "error" : "info"} />
                <form className="space-y-4" onSubmit={handleBookSubmit}>
                  <div>
                    <label className={label}>Title</label>
                    <input
                      className={`${input} mt-2`}
                      value={bookForm.title}
                      onChange={(e) => setBookForm((current) => ({ ...current, title: e.target.value }))}
                      placeholder="Book title"
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Author</label>
                    <input
                      className={`${input} mt-2`}
                      value={bookForm.author}
                      onChange={(e) => setBookForm((current) => ({ ...current, author: e.target.value }))}
                      placeholder="Author name"
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Category</label>
                    <input
                      className={`${input} mt-2`}
                      value={bookForm.category}
                      onChange={(e) => setBookForm((current) => ({ ...current, category: e.target.value }))}
                      placeholder="School Books, Competitive Exams, Spiritual"
                    />
                  </div>
                  <div>
                    <label className={label}>Quantity</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="0"
                      value={bookForm.quantity}
                      onChange={(e) => setBookForm((current) => ({ ...current, quantity: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Image Upload</label>
                    <input className={`${input} mt-2`} type="file" accept="image/*" onChange={handleBookImageChange} />
                  </div>
                  {bookForm.image && (
                    <div className="overflow-hidden rounded-2xl border border-[#d7e5ef] bg-[#f8fbfe]">
                      <img src={bookForm.image} alt="Book cover preview" className="h-44 w-full object-cover" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={bookSubmitting}
                      className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673] disabled:cursor-not-allowed disabled:opacity-60`}
                    >
                      {bookSubmitting ? "Saving..." : bookForm.id ? "Update Book" : "Add Book"}
                    </button>
                    <button
                      type="button"
                      onClick={resetBookForm}
                      className={`${actionButton} border border-[#d6e2ea] bg-white text-[#173b57] hover:bg-[#f3f8fc]`}
                    >
                      Reset
                    </button>
                  </div>
                </form>
              </div>

              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Book Inventory"
                  description="Search your collection and manage each row with quick edit and delete actions."
                />
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <input
                    className={`${input} md:max-w-sm`}
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    placeholder="Search by title, author, or category"
                  />
                  <p className="text-sm text-[#6b8091]">{filteredBooks.length} books found</p>
                </div>
                {booksLoading ? (
                  <SectionLoading />
                ) : filteredBooks.length === 0 ? (
                  <TableEmpty message="No books found in the library inventory yet." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dbe6ee] text-[#5d7486]">
                          <th className="px-3 py-3 font-semibold">Book</th>
                          <th className="px-3 py-3 font-semibold">Category</th>
                          <th className="px-3 py-3 font-semibold">Quantity</th>
                          <th className="px-3 py-3 font-semibold">Available</th>
                          <th className="px-3 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredBooks.map((book) => (
                          <tr key={book._id} className="border-b border-[#edf3f7] align-top text-[#173b57] last:border-b-0">
                            <td className="px-3 py-4">
                              <div className="flex items-center gap-3">
                                {book.image ? (
                                  <img src={book.image} alt={book.title} className="h-14 w-12 rounded-xl object-cover" />
                                ) : (
                                  <div className="flex h-14 w-12 items-center justify-center rounded-xl bg-[#eaf3fa] text-xs font-bold text-[#0f678c]">
                                    BOOK
                                  </div>
                                )}
                                <div>
                                  <p className="font-semibold">{book.title}</p>
                                  <p className="text-xs text-[#698090]">{book.author}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4">{book.category || "General"}</td>
                            <td className="px-3 py-4">{book.quantity ?? 0}</td>
                            <td className="px-3 py-4">
                              <StatusBadge value={(book.available ?? 0) > 0 ? "Available" : "Issued"} />
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleBookEdit(book)}
                                  className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleBookDelete(book._id)}
                                  className={`${actionButton} bg-red-100 text-red-700 hover:bg-red-200`}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {section === "issues" && (
            <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Issue a Book"
                  description="Assign a book to a user and record the issue cycle with expected return details."
                />
                <Notice text={issueNotice || issuesError || ""} tone={issuesError ? "error" : "info"} />
                <form className="space-y-4" onSubmit={handleIssueSubmit}>
                  <div>
                    <label className={label}>Book Name</label>
                    <select
                      className={`${input} mt-2`}
                      value={issueForm.bookId}
                      onChange={(e) => setIssueForm((current) => ({ ...current, bookId: e.target.value }))}
                      required
                    >
                      <option value="">Select available book</option>
                      {availableBooks.map((book) => (
                        <option key={book._id} value={book._id}>
                          {book.title} ({book.available} available)
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={label}>User Name</label>
                    <input
                      className={`${input} mt-2`}
                      value={issueForm.userName}
                      onChange={(e) => setIssueForm((current) => ({ ...current, userName: e.target.value }))}
                      placeholder="Reader or borrower name"
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Mobile</label>
                    <input
                      className={`${input} mt-2`}
                      value={issueForm.phone}
                      onChange={(e) => setIssueForm((current) => ({ ...current, phone: e.target.value }))}
                      placeholder="10-digit phone number"
                    />
                  </div>
                  <div>
                    <label className={label}>Return Date</label>
                    <input
                      className={`${input} mt-2`}
                      type="date"
                      value={issueForm.returnDate}
                      onChange={(e) => setIssueForm((current) => ({ ...current, returnDate: e.target.value }))}
                    />
                  </div>
                  <button type="submit" className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}>
                    Issue Book
                  </button>
                </form>
              </div>

              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Issue / Return System"
                  description="Track who borrowed which book, their dates, and whether each issue is still active or returned."
                />
                {issuesLoading ? (
                  <SectionLoading />
                ) : issueRows.length === 0 ? (
                  <TableEmpty message="No issue records have been created yet." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dbe6ee] text-[#5d7486]">
                          <th className="px-3 py-3 font-semibold">User Name</th>
                          <th className="px-3 py-3 font-semibold">Book Name</th>
                          <th className="px-3 py-3 font-semibold">Issue Date</th>
                          <th className="px-3 py-3 font-semibold">Return Date</th>
                          <th className="px-3 py-3 font-semibold">Status</th>
                          <th className="px-3 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {issueRows.map((issue) => {
                          const issuedBook =
                            typeof issue.bookId === "string"
                              ? bookRows.find((item) => item._id === issue.bookId)
                              : issue.bookId;
                          const status = issue.status || "Issued";
                          return (
                            <tr key={issue._id} className="border-b border-[#edf3f7] align-top text-[#173b57] last:border-b-0">
                              <td className="px-3 py-4">
                                <p className="font-semibold">{issue.studentName}</p>
                                <p className="text-xs text-[#6b8191]">{issue.phone || "No phone provided"}</p>
                              </td>
                              <td className="px-3 py-4">{issuedBook?.title || "Unknown book"}</td>
                              <td className="px-3 py-4">{formatDate(issue.issueDate)}</td>
                              <td className="px-3 py-4">{formatDate(issue.returnDate)}</td>
                              <td className="px-3 py-4">
                                <StatusBadge value={status} />
                              </td>
                              <td className="px-3 py-4">
                                {status === "Returned" ? (
                                  <span className="text-sm text-[#6b8091]">Completed</span>
                                ) : (
                                  <button
                                    onClick={() => handleIssueReturn(issue)}
                                    className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}
                                  >
                                    Mark Returned
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {section === "users" && (
            <section className={panel}>
              <SectionHeader
                title="User Management"
                description="Review library members, check contact details, and approve or reject their membership status."
              />
              <div className="mt-4">
                <Notice text={memberNotice || membersError || ""} tone={membersError ? "error" : "info"} />
              </div>
              <div className="mt-4">
                {membersLoading ? (
                  <SectionLoading />
                ) : memberRows.length === 0 ? (
                  <TableEmpty message="No library members have signed up yet." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dbe6ee] text-[#5d7486]">
                          <th className="px-3 py-3 font-semibold">Name</th>
                          <th className="px-3 py-3 font-semibold">Mobile</th>
                          <th className="px-3 py-3 font-semibold">Status</th>
                          <th className="px-3 py-3 font-semibold">Joined</th>
                          <th className="px-3 py-3 font-semibold">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {memberRows.map((member: Member) => {
                          const status = member.status ?? "Pending";
                          return (
                            <tr key={member._id} className="border-b border-[#edf3f7] align-top text-[#173b57] last:border-b-0">
                              <td className="px-3 py-4">
                                <p className="font-semibold">{member.name}</p>
                                <p className="text-xs text-[#698091]">{member.email || "No email provided"}</p>
                              </td>
                              <td className="px-3 py-4">{member.phone || "-"}</td>
                              <td className="px-3 py-4">
                                <StatusBadge value={status} />
                              </td>
                              <td className="px-3 py-4">{formatDate(member.createdAt)}</td>
                              <td className="px-3 py-4">
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => handleMemberStatus(member._id, "Approved")}
                                    className={`${actionButton} bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleMemberStatus(member._id, "Rejected")}
                                    className={`${actionButton} bg-red-100 text-red-700 hover:bg-red-200`}
                                  >
                                    Reject
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {section === "requests" && (
            <section className={panel}>
              <SectionHeader
                title="Book Request Management"
                description="Handle unavailable-book requests and keep request decisions visible for admin follow-up."
              />
              <div className="mt-4">
                <Notice text={requestNotice || requestsError || ""} tone={requestsError ? "error" : "info"} />
              </div>
              <div className="mt-4">
                {requestsLoading ? (
                  <SectionLoading />
                ) : requestRows.length === 0 ? (
                  <TableEmpty message="No book requests are waiting right now." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dbe6ee] text-[#5d7486]">
                          <th className="px-3 py-3 font-semibold">User Name</th>
                          <th className="px-3 py-3 font-semibold">Book Name</th>
                          <th className="px-3 py-3 font-semibold">Mobile</th>
                          <th className="px-3 py-3 font-semibold">Request Status</th>
                          <th className="px-3 py-3 font-semibold">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requestRows.map((request: LibraryRequest) => (
                          <tr key={request._id} className="border-b border-[#edf3f7] align-top text-[#173b57] last:border-b-0">
                            <td className="px-3 py-4">
                              <p className="font-semibold">{request.name}</p>
                              <p className="text-xs text-[#698091]">{request.reason || "No extra note added"}</p>
                            </td>
                            <td className="px-3 py-4">{request.bookTitle}</td>
                            <td className="px-3 py-4">{request.mobile}</td>
                            <td className="px-3 py-4">
                              <StatusBadge value={request.status} />
                            </td>
                            <td className="px-3 py-4">
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleRequestStatus(request._id, "Approved")}
                                  className={`${actionButton} bg-emerald-100 text-emerald-700 hover:bg-emerald-200`}
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleRequestStatus(request._id, "Rejected")}
                                  className={`${actionButton} bg-red-100 text-red-700 hover:bg-red-200`}
                                >
                                  Reject
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {section === "donations" && (
            <section className="grid gap-6 xl:grid-cols-[360px_1fr]">
              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Add Donation Record"
                  description="Track incoming book donations so stock support remains transparent and easy to review."
                />
                <Notice
                  text={donationNotice || libraryDonationsError || ""}
                  tone={libraryDonationsError ? "error" : "info"}
                />
                <form className="space-y-4" onSubmit={handleDonationSubmit}>
                  <div>
                    <label className={label}>Donor Name</label>
                    <input
                      className={`${input} mt-2`}
                      value={donationForm.donorName}
                      onChange={(e) => setDonationForm((current) => ({ ...current, donorName: e.target.value }))}
                      placeholder="Donor name"
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Book Details</label>
                    <textarea
                      className={`${input} mt-2 min-h-[120px]`}
                      value={donationForm.bookDetails}
                      onChange={(e) => setDonationForm((current) => ({ ...current, bookDetails: e.target.value }))}
                      placeholder="Book title, author, subject, or donation notes"
                      required
                    />
                  </div>
                  <div>
                    <label className={label}>Quantity</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="1"
                      value={donationForm.quantity}
                      onChange={(e) => setDonationForm((current) => ({ ...current, quantity: e.target.value }))}
                      required
                    />
                  </div>
                  <button type="submit" className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}>
                    Save Donation
                  </button>
                </form>
              </div>

              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Donation Management"
                  description="Review donor name, donated book details, quantity, and the date each contribution was recorded."
                />
                {libraryDonationsLoading ? (
                  <SectionLoading />
                ) : donationRows.length === 0 ? (
                  <TableEmpty message="No donation records have been added yet." />
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-[#dbe6ee] text-[#5d7486]">
                          <th className="px-3 py-3 font-semibold">Donor Name</th>
                          <th className="px-3 py-3 font-semibold">Book Details</th>
                          <th className="px-3 py-3 font-semibold">Quantity</th>
                          <th className="px-3 py-3 font-semibold">Recorded On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {donationRows.map((donation: LibraryDonation) => (
                          <tr key={donation._id} className="border-b border-[#edf3f7] align-top text-[#173b57] last:border-b-0">
                            <td className="px-3 py-4 font-semibold">{donation.donorName}</td>
                            <td className="px-3 py-4">{donation.bookDetails}</td>
                            <td className="px-3 py-4">{donation.quantity}</td>
                            <td className="px-3 py-4">{formatDate(donation.createdAt)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>
          )}

          {section === "stats" && (
            <section className="grid gap-6 xl:grid-cols-[380px_1fr]">
              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Library Stats Control"
                  description="Update total books, total users, and impact figures shown on the public library experience."
                />
                <Notice text={statsNotice || statsError || ""} tone={statsError ? "error" : "info"} />
                <form className="space-y-4" onSubmit={handleStatsSubmit}>
                  <div>
                    <label className={label}>Total Books</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="0"
                      value={statsForm.totalBooks}
                      onChange={(e) => setStatsForm((current) => ({ ...current, totalBooks: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={label}>Total Users</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="0"
                      value={statsForm.totalUsers}
                      onChange={(e) => setStatsForm((current) => ({ ...current, totalUsers: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={label}>Students Benefited</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="0"
                      value={statsForm.studentsBenefited}
                      onChange={(e) => setStatsForm((current) => ({ ...current, studentsBenefited: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className={label}>Active Members</label>
                    <input
                      className={`${input} mt-2`}
                      type="number"
                      min="0"
                      value={statsForm.activeMembers}
                      onChange={(e) => setStatsForm((current) => ({ ...current, activeMembers: e.target.value }))}
                    />
                  </div>
                  <button type="submit" className={`${actionButton} bg-[#0f678c] text-white hover:bg-[#0c5673]`}>
                    Update Stats
                  </button>
                </form>
              </div>

              <div className={`${panel} space-y-4`}>
                <SectionHeader
                  title="Current Stats Snapshot"
                  description="These cards reflect the latest saved impact counts for the library."
                />
                {statsLoading ? (
                  <SectionLoading />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      { title: "Total Books", value: statsSnapshot.totalBooks },
                      { title: "Total Users", value: statsSnapshot.totalUsers },
                      { title: "Students Benefited", value: statsSnapshot.studentsBenefited },
                      { title: "Active Members", value: statsSnapshot.activeMembers },
                    ].map((item) => (
                      <article key={item.title} className="rounded-2xl bg-[#0f2f50] p-5 text-white">
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9de0ff]">{item.title}</p>
                        <p className="mt-3 text-4xl font-black">{item.value}</p>
                      </article>
                    ))}
                  </div>
                )}
                <div className="rounded-2xl bg-[#f8fbfe] px-4 py-4 text-sm text-[#5c7183]">
                  Last updated: <span className="font-semibold text-[#173b57]">{formatDateTime(statsSnapshot.updatedAt)}</span>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
});
