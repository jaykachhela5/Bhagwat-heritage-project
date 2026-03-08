import { memo, useMemo, useState, type FormEvent } from "react";
import { useApi } from "../../hooks/useApi";
import { booksApi, issuesApi } from "../../services/api/books";
import { LoadingSpinner } from "../../components/ui/LoadingSpinner";
import type { Book } from "../../types";

const LIBRARY_FEATURES = [
  { title: "Smart Discovery", desc: "Search, filter, and quickly discover books by category and availability." },
  { title: "Digital Catalog", desc: "Unified collection for scriptures, literature, reference, and learning texts." },
  { title: "Mentor Corner", desc: "Guided reading support with curated lists for students and families." },
  { title: "Rapid Issue Desk", desc: "Fast issue workflow with real-time stock status." },
];

const KNOWLEDGE_ZONES = [
  { title: "Scripture Vault", desc: "Bhagwat, Gita, Upanishads, and commentary collections." },
  { title: "Children Sanskar Shelf", desc: "Illustrated values stories and foundational dharmic reading." },
  { title: "Research and Reference", desc: "Philosophy, comparative studies, and historical records." },
  { title: "Audio-Visual Study Hub", desc: "Lecture-backed material and guided learning resources." },
];

const PROGRAMS = [
  { name: "Weekly Reading Circle", detail: "Peer reading sessions with mentor discussions and reflection notes." },
  { name: "Youth Book Leadership Club", detail: "Book-based speaking practice and critical presentation training." },
  { name: "Family Reading Saturdays", detail: "Parent-child storytelling, value sessions, and shared activities." },
  { name: "Scripture Deep Dive Series", detail: "Structured chapter-wise study led by senior faculty." },
];

const DIGITAL_SERVICES = [
  "Book reservation waitlist",
  "Priority issue for active learners",
  "Curated monthly reading paths",
  "Category-wise recommendation feed",
  "Student reading progress insights",
  "Mentor-assisted reading plans",
];

const LIBRARY_RULES = [
  "Carry student ID during issue and return.",
  "Return or renew books before due date.",
  "Keep books clean and damage-free.",
  "Report lost books to admin immediately.",
];

const LIBRARY_CATEGORIES = [
  "Bhagwat Heritage",
  "Bhagavad Gita",
  "Bhakti and Devotion",
  "Sanatan Dharma",
  "Spiritual Growth",
  "Seva and Humanity",
  "Culture and Sanskar",
  "Krishna Literature",
  "Society and Values",
  "Yoga and Meditation",
];

const BOOK_COVER_THEME_MAP: { keywords: string[]; query: string }[] = [
  { keywords: ["गीता"], query: "/images/books/bhagwat geeta.png" },
  { keywords: ["कृष्ण", "भक्ति", "भगवद्भक्ति"], query: "/images/books/Krishna Idol.png" },
  { keywords: ["भागवत", "श्रीमद्भागवत", "कथा"], query: "/images/books/MahabharataSet.png" },
  { keywords: ["सनातन", "धर्म"], query: "/images/books/ramayan.png" },
  { keywords: ["संस्कृति", "संस्कार", "भारतीय"], query: "/images/books/Sanskrit Dictionary.png" },
  { keywords: ["सेवा", "मानवता", "समाज"], query: "/images/books/Temple Bell Brass.png" },
  { keywords: ["योग", "आध्यात्मिक", "शांति"], query: "/images/books/Yoga Mat Premium.png" },
];

const getBookCoverUrl = (title: string, index: number) => {
  const lowered = title.toLowerCase();
  const matched = BOOK_COVER_THEME_MAP.find((group) =>
    group.keywords.some((word) => lowered.includes(word.toLowerCase()))
  );
  if (matched) return encodeURI(matched.query);

  const localFallbacks = [
    "/images/books/bhagwat geeta.png",
    "/images/books/ramayan.png",
    "/images/books/MahabharataSet.png",
    "/images/books/Vedic Chant Audio.png",
    "/images/books/Sanskrit Dictionary.png",
    "/images/books/Hanuman Idol.png",
  ];
  return encodeURI(localFallbacks[index % localFallbacks.length]);
};

const getCategoryByTitle = (title: string, index: number) => {
  const t = title.toLowerCase();
  if (t.includes("गीता")) return "Bhagavad Gita";
  if (t.includes("कृष्ण")) return "Krishna Literature";
  if (t.includes("भक्ति")) return "Bhakti and Devotion";
  if (t.includes("सनातन") || t.includes("धर्म")) return "Sanatan Dharma";
  if (t.includes("सेवा") || t.includes("मानवता") || t.includes("समाज")) return "Seva and Humanity";
  if (t.includes("संस्कार") || t.includes("संस्कृति") || t.includes("भारतीय")) return "Culture and Sanskar";
  if (t.includes("योग") || t.includes("शांति") || t.includes("आध्यात्मिक")) return "Yoga and Meditation";
  return LIBRARY_CATEGORIES[index % LIBRARY_CATEGORIES.length];
};

const BHAGWAT_HERITAGE_BOOK_TITLES = [
  "श्रीमद्भागवत का दिव्य ज्ञान",
  "भागवत धर्म का प्रकाश",
  "सनातन संस्कृति की अमर धरोहर",
  "भागवत कथा का आध्यात्मिक रहस्य",
  "सेवा, संस्कार और सनातन मार्ग",
  "श्रीकृष्ण भक्ति का पवित्र पथ",
  "भागवत संदेश और मानवता",
  "भारतीय संस्कृति का दिव्य दर्शन",
  "धर्म, सेवा और समाज",
  "भागवत ज्ञान से जीवन परिवर्तन",
  "सनातन जीवन के आदर्श",
  "श्रीमद्भागवत और आधुनिक समाज",
  "भक्ति योग का सच्चा मार्ग",
  "भागवत कथा का अमृत संदेश",
  "धर्म और मानवता का संगम",
  "भागवत परंपरा की गौरव गाथा",
  "सेवा ही सच्चा धर्म",
  "श्रीकृष्ण लीला का आध्यात्मिक अर्थ",
  "सनातन संस्कृति और समाज सेवा",
  "भागवत भक्ति की शक्ति",
  "आध्यात्मिक जीवन की ओर",
  "श्रीमद्भागवत का जीवन दर्शन",
  "धर्म, करुणा और सेवा",
  "भागवत कथा और संस्कार",
  "भारतीय आध्यात्मिक विरासत",
  "भागवत ज्ञान की अमर ज्योति",
  "श्रीकृष्ण और मानव जीवन",
  "सनातन धर्म का पवित्र मार्ग",
  "सेवा और संस्कार की प्रेरणा",
  "भागवत संस्कृति का संदेश",
  "श्रीमद्भागवत की प्रेरक कथाएँ",
  "भक्ति, सेवा और समर्पण",
  "भागवत ज्ञान का प्रकाश",
  "धर्म और संस्कृति की रक्षा",
  "श्रीकृष्ण भक्ति का रहस्य",
  "समाज निर्माण में भागवत की भूमिका",
  "भागवत कथा का दिव्य अमृत",
  "सेवा मार्ग की महानता",
  "सनातन संस्कृति का उज्ज्वल भविष्य",
  "श्रीमद्भागवत और मानव कल्याण",
  "भागवत प्रेरणा से जीवन सुधार",
  "धर्म और सेवा का संगम",
  "श्रीकृष्ण भक्ति की महिमा",
  "भागवत मार्ग से आत्मिक शांति",
  "भारतीय संस्कार और भागवत ज्ञान",
  "सेवा से समाज परिवर्तन",
  "भागवत संदेश और विश्व शांति",
  "सनातन जीवन का प्रकाश मार्ग",
  "श्रीमद्भागवत का अमर संदेश",
  "भगवद्भक्ति और मानव सेवा",
];

export default memo(function LibraryPage() {
  const { data: books, loading, refetch } = useApi(() => booksApi.getAll());
  const { data: issues, loading: issuesLoading, refetch: refetchIssues } = useApi(() => issuesApi.getAll());
  const [issueForm, setIssueForm] = useState({ bookId: "", studentName: "", phone: "" });
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState<"success" | "error" | "">("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("title-asc");
  const [issueSearch, setIssueSearch] = useState("");
  const [issueStatus, setIssueStatus] = useState("all");

  const allBooks = books ?? [];
  const allIssues = issues ?? [];
  const curatedBooks = useMemo(
    () =>
      BHAGWAT_HERITAGE_BOOK_TITLES.map((title, index) => ({
        _id: `bhagwat-heritage-book-${index + 1}`,
        title,
        author: "Bhagwat Heritage Editorial",
        category: getCategoryByTitle(title, index),
        isbn: `BHSF-${String(index + 1).padStart(4, "0")}`,
        quantity: 3,
        available: (index % 4) + 1,
        description: `${title} - curated collection.`,
        createdAt: new Date(2025, 0, index + 1).toISOString(),
      })),
    []
  );
  const catalogBooks = useMemo(() => {
    const merged = [...allBooks];
    curatedBooks.forEach((book) => {
      const exists = merged.some((apiBook) => apiBook.title?.trim() === book.title.trim());
      if (!exists) merged.push(book);
    });
    return merged;
  }, [allBooks, curatedBooks]);

  const categoryOptions = useMemo(() => {
    return Array.from(new Set([...LIBRARY_CATEGORIES, ...catalogBooks.map((b: Book) => b.category).filter(Boolean)])) as string[];
  }, [catalogBooks]);

  const stats = useMemo(() => {
    const totalBooks = catalogBooks.length;
    const totalAvailable = catalogBooks.reduce((sum: number, b: Book) => sum + (b.available ?? 0), 0);
    const categories = categoryOptions.length;
    const inStockTitles = catalogBooks.filter((b: Book) => (b.available ?? 0) > 0).length;
    return { totalBooks, totalAvailable, categories, inStockTitles };
  }, [catalogBooks, categoryOptions]);

  const filteredBooks = useMemo(() => {
    const normalized = search.trim().toLowerCase();

    const base = catalogBooks.filter((book: Book) => {
      const matchSearch =
        normalized.length === 0 ||
        book.title?.toLowerCase().includes(normalized) ||
        book.author?.toLowerCase().includes(normalized) ||
        book.category?.toLowerCase().includes(normalized);

      const matchCategory = category === "all" || (book.category ?? "").toLowerCase() === category.toLowerCase();
      const availableCount = book.available ?? 0;
      const matchAvailability =
        availability === "all" ||
        (availability === "available" && availableCount > 0) ||
        (availability === "limited" && availableCount > 0 && availableCount <= 2) ||
        (availability === "unavailable" && availableCount === 0);

      return matchSearch && matchCategory && matchAvailability;
    });

    return [...base].sort((a: Book, b: Book) => {
      if (sortBy === "title-asc") return (a.title ?? "").localeCompare(b.title ?? "");
      if (sortBy === "title-desc") return (b.title ?? "").localeCompare(a.title ?? "");
      if (sortBy === "available-desc") return (b.available ?? 0) - (a.available ?? 0);
      if (sortBy === "available-asc") return (a.available ?? 0) - (b.available ?? 0);
      return 0;
    });
  }, [catalogBooks, search, category, availability, sortBy]);

  const issueRows = useMemo(() => {
    return allIssues
      .map((issue) => {
        const fromBook = typeof issue.bookId === "object" ? issue.bookId : null;
        const linkedBook = typeof issue.bookId === "string" ? allBooks.find((b) => b._id === issue.bookId) : null;
        const title = fromBook?.title || linkedBook?.title || "Unknown Book";
        const author = fromBook?.author || linkedBook?.author || "Unknown Author";
        const status = issue.status || "Issued";
        return {
          _id: issue._id,
          studentName: issue.studentName,
          phone: issue.phone || "-",
          title,
          author,
          issueDate: issue.issueDate,
          returnDate: issue.returnDate,
          status,
        };
      })
      .sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
  }, [allIssues, allBooks]);

  const filteredIssueRows = useMemo(() => {
    const q = issueSearch.trim().toLowerCase();
    return issueRows.filter((row) => {
      const matchesSearch =
        q.length === 0 ||
        row.studentName.toLowerCase().includes(q) ||
        row.title.toLowerCase().includes(q) ||
        row.phone.toLowerCase().includes(q);
      const matchesStatus = issueStatus === "all" || row.status.toLowerCase() === issueStatus.toLowerCase();
      return matchesSearch && matchesStatus;
    });
  }, [issueRows, issueSearch, issueStatus]);

  const issueStats = useMemo(() => {
    const total = issueRows.length;
    const issued = issueRows.filter((r) => r.status.toLowerCase() === "issued").length;
    const returned = issueRows.filter((r) => r.status.toLowerCase() === "returned").length;
    const overdue = issueRows.filter((r) => r.status.toLowerCase() === "overdue").length;
    return { total, issued, returned, overdue };
  }, [issueRows]);

  const handleIssue = async (e: FormEvent) => {
    e.preventDefault();
    setMsg("");
    setMsgType("");
    try {
      await issuesApi.issue(issueForm);
      setMsg("Book issued successfully.");
      setMsgType("success");
      setIssueForm({ bookId: "", studentName: "", phone: "" });
      refetch();
      refetchIssues();
    } catch {
      setMsg("Failed to issue book. Please try again.");
      setMsgType("error");
    }
  };

  return (
    <div className="relative overflow-hidden bg-[linear-gradient(180deg,#0b2230_0%,#0b2230_22%,#0c2a3a_58%,#0a2534_100%)] pb-16">
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[#2d7ed4]/14 blur-3xl" />
      <div className="pointer-events-none absolute top-[480px] -right-24 h-72 w-72 rounded-full bg-[#19af8d]/12 blur-3xl" />

      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[30px] bg-cover bg-center text-white px-5 py-14 md:px-12 md:py-20 shadow-[0_20px_50px_rgba(15,47,87,0.24)]"
          style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1772914298/library_z21zxr.jpg')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,28,53,0.84)_0%,rgba(12,54,87,0.72)_45%,rgba(13,84,94,0.58)_100%)]" />
          <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10">
            <p className="inline-flex rounded-full border border-white/35 bg-white/10 px-4 py-1 text-sm mb-5">
              Bhagwat Heritage Service Foundation Trust
            </p>
            <h1 className="text-3xl md:text-6xl font-black leading-tight">E-Library . Ultra Advanced Knowledge Hub</h1>
            <p className="mt-4 text-lg md:text-2xl text-white/90 max-w-4xl">
              A next-generation spiritual and academic library with smart access, structured reading, and guided growth.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#catalog"
                className="inline-block rounded-xl bg-[#ffa114] px-7 py-3 font-bold text-white hover:bg-[#e78e07] transition-colors"
              >
                Explore Catalog
              </a>
              <a
                href="#issue-desk"
                className="inline-block rounded-xl border border-white/20 bg-white/10 px-7 py-3 font-bold text-white hover:bg-white/16 transition-colors"
              >
                Issue Book
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-8 md:py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 md:p-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">{stats.totalBooks}</p>
            <p className="mt-1.5 text-sm md:text-base text-white">Total Titles</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 md:p-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">{stats.totalAvailable}</p>
            <p className="mt-1.5 text-sm md:text-base text-white">Books Available</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 md:p-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">{stats.categories}</p>
            <p className="mt-1.5 text-sm md:text-base text-white">Categories</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 md:p-5 text-center shadow-sm">
            <p className="text-3xl md:text-4xl font-extrabold text-white">{stats.inStockTitles}</p>
            <p className="mt-1.5 text-sm md:text-base text-white">In-Stock Titles</p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-5">Advanced Library Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LIBRARY_FEATURES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-[#17384b] p-5 shadow-sm">
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-5">Knowledge Zones</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {KNOWLEDGE_ZONES.map((item) => (
            <article key={item.title} className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#17384b_0%,#133345_100%)] p-6 shadow-sm">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-2 text-white">{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="catalog" className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-3xl border border-white/10 bg-[#143446] p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
            <input
              type="text"
              placeholder="Search by title, author, or category"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:flex-1 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-56 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            >
              <option value="all">All Categories</option>
              {categoryOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="w-full md:w-52 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            >
              <option value="all">All Stock</option>
              <option value="available">Available</option>
              <option value="limited">Limited (1-2)</option>
              <option value="unavailable">Unavailable</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full md:w-52 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            >
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
              <option value="available-desc">Most Available</option>
              <option value="available-asc">Least Available</option>
            </select>
          </div>

          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-white">Showing {filteredBooks.length} books</p>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredBooks.map((book: Book, index: number) => {
                  const available = book.available ?? 0;
                  const statusClass =
                    available === 0
                      ? "bg-red-500/20 text-white"
                      : available <= 2
                      ? "bg-amber-500/20 text-white"
                      : "bg-emerald-500/20 text-white";
                  const statusText = available === 0 ? "Unavailable" : available <= 2 ? "Limited" : "In Stock";
                  const coverUrl = getBookCoverUrl(book.title || "", index);

                  return (
                    <article key={book._id} className="rounded-2xl border border-white/10 bg-[#0f2c3d] p-4 shadow-sm">
                      <div className="relative w-full h-32 rounded-xl mb-3 overflow-hidden">
                        <img
                          src={coverUrl}
                          alt={book.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "/images/books/bhagwat geeta.png";
                          }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1">
                          <p className="text-[10px] text-white truncate">{book.title}</p>
                        </div>
                      </div>
                      <h3 className="mb-1 text-sm font-bold text-white line-clamp-2">{book.title}</h3>
                      <p className="text-xs text-white">{book.author || "Unknown Author"}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {book.category ? (
                          <span className="inline-block rounded bg-white/10 px-2 py-0.5 text-xs text-white">
                            {book.category}
                          </span>
                        ) : null}
                        <span className={`inline-block text-xs px-2 py-0.5 rounded ${statusClass}`}>{statusText}</span>
                      </div>
                      <p className="mt-2 text-xs text-white">Available: {available}</p>
                    </article>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-5">Reading Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {PROGRAMS.map((item) => (
            <article key={item.name} className="rounded-2xl border border-white/10 bg-[#17384b] p-5 shadow-sm">
              <h3 className="text-xl font-bold text-white">{item.name}</h3>
              <p className="mt-2 text-white">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <div className="rounded-3xl bg-gradient-to-r from-[#0f3456] to-[#0f5e71] text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black mb-5">Digital Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {DIGITAL_SERVICES.map((item) => (
              <div key={item} className="rounded-xl border border-white/20 bg-white/10 p-4">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="issue-desk" className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-[#143446] p-6 md:p-7 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-black text-white">Library Rules</h2>
            <ul className="mt-4 space-y-2">
              {LIBRARY_RULES.map((rule) => (
                <li key={rule} className="flex items-start gap-2 text-white">
                  <span className="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[#ffb06a]" />
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <form onSubmit={handleIssue} className="space-y-3 rounded-3xl border border-white/10 bg-[#143446] p-6 md:p-7 shadow-sm">
            <h3 className="mb-1 text-2xl font-bold text-white">Issue a Book</h3>
            <select
              value={issueForm.bookId}
              onChange={(e) => setIssueForm((f) => ({ ...f, bookId: e.target.value }))}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            >
              <option value="">Select Book</option>
              {allBooks.map((book: Book) => (
                <option key={book._id} value={book._id}>
                  {book.title}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Student Name"
              value={issueForm.studentName}
              onChange={(e) => setIssueForm((f) => ({ ...f, studentName: e.target.value }))}
              required
              className="w-full rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={issueForm.phone}
              onChange={(e) => setIssueForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            />
            {msg ? <p className={`text-sm ${msgType === "success" ? "text-green-600" : "text-red-600"}`}>{msg}</p> : null}
            <button type="submit" className="w-full rounded-xl bg-[#ffa114] hover:bg-[#e78e07] text-white font-bold py-3 transition-colors">
              Issue Book
            </button>
          </form>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-10">
        <h2 className="text-2xl md:text-4xl font-black text-white mb-5">Issue Tracking Dashboard</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-white">{issueStats.total}</p>
            <p className="mt-1 text-sm text-white">Total Issued Records</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-white">{issueStats.issued}</p>
            <p className="mt-1 text-sm text-white">Currently Issued</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-white">{issueStats.returned}</p>
            <p className="mt-1 text-sm text-white">Returned</p>
          </div>
          <div className="rounded-2xl border border-white/10 bg-[#143446]/95 p-4 text-center shadow-sm">
            <p className="text-2xl md:text-3xl font-extrabold text-white">{issueStats.overdue}</p>
            <p className="mt-1 text-sm text-white">Overdue</p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-[#143446] p-5 md:p-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-5">
            <input
              type="text"
              placeholder="Search by student, phone, or book title"
              value={issueSearch}
              onChange={(e) => setIssueSearch(e.target.value)}
              className="w-full md:flex-1 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            />
            <select
              value={issueStatus}
              onChange={(e) => setIssueStatus(e.target.value)}
              className="w-full md:w-52 rounded-xl border border-white/10 bg-[#0d2b3c] px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffb06a]/40"
            >
              <option value="all">All Status</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>

          {issuesLoading ? (
            <div className="flex justify-center py-8">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    <th className="py-3 pr-4 font-semibold text-white">Student</th>
                    <th className="py-3 pr-4 font-semibold text-white">Phone</th>
                    <th className="py-3 pr-4 font-semibold text-white">Book</th>
                    <th className="py-3 pr-4 font-semibold text-white">Issue Date</th>
                    <th className="py-3 pr-4 font-semibold text-white">Return Date</th>
                    <th className="py-3 pr-4 font-semibold text-white">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredIssueRows.map((row) => (
                    <tr key={row._id} className="border-b border-white/6">
                      <td className="py-3 pr-4">
                        <p className="font-semibold text-white">{row.studentName}</p>
                      </td>
                      <td className="py-3 pr-4 text-white">{row.phone}</td>
                      <td className="py-3 pr-4">
                        <p className="font-medium text-white">{row.title}</p>
                        <p className="text-xs text-white">{row.author}</p>
                      </td>
                      <td className="py-3 pr-4 text-white">{new Date(row.issueDate).toLocaleDateString()}</td>
                      <td className="py-3 pr-4 text-white">
                        {row.returnDate ? new Date(row.returnDate).toLocaleDateString() : "-"}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                            row.status.toLowerCase() === "returned"
                              ? "bg-emerald-500/20 text-white"
                              : row.status.toLowerCase() === "overdue"
                              ? "bg-red-500/20 text-white"
                              : "bg-amber-500/20 text-white"
                          }`}
                        >
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredIssueRows.length === 0 ? (
                <p className="py-6 text-center text-white">No issue records found.</p>
              ) : null}
            </div>
          )}
        </div>
      </section>
    </div>
  );
});
