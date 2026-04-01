import { memo, useMemo, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";

const BOOK_CATEGORIES = [
  "School Books",
  "Competitive Exams",
  "Spiritual / Religious",
  "Skill Development",
  "Story / Kids Books",
] as const;

const LIBRARY_BOOKS = [
  {
    id: "school-1",
    title: "Mathematics Foundation Class 8",
    author: "Rural Learning Team",
    category: "School Books",
    image: "/images/books/bhagwat geeta.png",
    available: true,
    summary: "Core school-level mathematics support for regular study and revision.",
  },
  {
    id: "school-2",
    title: "Science Basics for School Learners",
    author: "Open Study Series",
    category: "School Books",
    image: "/images/books/MahabharataSet.png",
    available: false,
    summary: "Simple explanations and diagrams for rural and first-generation learners.",
  },
  {
    id: "exam-1",
    title: "Competitive Exam Aptitude Guide",
    author: "Career Prep Circle",
    category: "Competitive Exams",
    image: "/images/books/Sanskrit Dictionary.png",
    available: true,
    summary: "Reasoning, aptitude, and practice support for exam preparation.",
  },
  {
    id: "exam-2",
    title: "General Knowledge Success Handbook",
    author: "Future Aspirants Forum",
    category: "Competitive Exams",
    image: "/images/books/Vedic Chant Audio.png",
    available: false,
    summary: "Helpful reference for current affairs, civics, and interview awareness.",
  },
  {
    id: "spiritual-1",
    title: "Bhagavad Gita for Daily Life",
    author: "Bhagwat Heritage Editorial",
    category: "Spiritual / Religious",
    image: "/images/books/bhagwat geeta.png",
    available: true,
    summary: "A practical reading guide for values, clarity, and spiritual reflection.",
  },
  {
    id: "spiritual-2",
    title: "Stories from Shrimad Bhagwat",
    author: "Bhagwat Heritage Editorial",
    category: "Spiritual / Religious",
    image: "/images/books/ramayan.png",
    available: true,
    summary: "Selected stories for satsang, family reading, and value-based learning.",
  },
  {
    id: "skill-1",
    title: "Spoken English and Confidence Building",
    author: "Skill Growth Collective",
    category: "Skill Development",
    image: "/images/books/Yoga Mat Premium.png",
    available: true,
    summary: "Communication support for youth, volunteers, and job seekers.",
  },
  {
    id: "skill-2",
    title: "Digital Skills Starter Book",
    author: "Community Learning Lab",
    category: "Skill Development",
    image: "/images/books/Temple Bell Brass.png",
    available: false,
    summary: "Basic digital literacy, typing, internet use, and online safety.",
  },
  {
    id: "kids-1",
    title: "Moral Stories for Young Readers",
    author: "Children Sanskar Desk",
    category: "Story / Kids Books",
    image: "/images/books/Hanuman Idol.png",
    available: true,
    summary: "Short inspiring stories focused on kindness, honesty, and discipline.",
  },
  {
    id: "kids-2",
    title: "Krishna Stories for Children",
    author: "Children Sanskar Desk",
    category: "Story / Kids Books",
    image: "/images/books/Krishna Idol.png",
    available: true,
    summary: "Colorful devotional stories for joyful family reading and learning.",
  },
];

const sectionTitleClass = "mb-5 text-[24px] font-semibold uppercase tracking-[0.18em] text-[#f2b44f]";
const sectionPanelClass = "rounded-[28px] border border-white/10 bg-[#143446] p-6 shadow-[0_18px_40px_rgba(5,21,35,0.24)] md:p-8";
const inputClass =
  "w-full rounded-xl border border-white/10 bg-[#0b5570] px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-[#f2b44f]/40";

export default memo(function LibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [search, setSearch] = useState("");
  const [selectedBookId, setSelectedBookId] = useState<string>(LIBRARY_BOOKS[0].id);
  const [membershipForm, setMembershipForm] = useState({ name: "", mobile: "", address: "" });
  const [requestForm, setRequestForm] = useState({ name: "", mobile: "", bookTitle: "", reason: "" });
  const [membershipMsg, setMembershipMsg] = useState("");
  const [requestMsg, setRequestMsg] = useState("");

  const filteredBooks = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return LIBRARY_BOOKS.filter((book) => {
      const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
      const matchesSearch = normalized.length === 0 || book.title.toLowerCase().includes(normalized);
      return matchesCategory && matchesSearch;
    });
  }, [search, selectedCategory]);

  const selectedBook = useMemo(
    () => filteredBooks.find((book) => book.id === selectedBookId) ?? filteredBooks[0] ?? LIBRARY_BOOKS[0],
    [filteredBooks, selectedBookId]
  );

  const handleMembershipSubmit = (e: FormEvent) => {
    e.preventDefault();
    setMembershipMsg("Library membership request submitted successfully.");
    setMembershipForm({ name: "", mobile: "", address: "" });
  };

  const handleRequestSubmit = (e: FormEvent) => {
    e.preventDefault();
    setRequestMsg("Book request submitted successfully. Our team will contact you soon.");
    setRequestForm({ name: "", mobile: "", bookTitle: "", reason: "" });
  };

  const handleBookRequest = (bookTitle: string) => {
    setRequestForm((form) => ({ ...form, bookTitle }));
    setRequestMsg("");
  };

  return (
    <div className="relative overflow-hidden bg-[#084c66] pb-16">
      <HeroSection
        title="Library & Learning Center"
        subtitle="Gyaan Sabke Liye"
        subtitleClassName="text-[34px] font-semibold md:text-[40px]"
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772914298/library_z21zxr.jpg"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-[linear-gradient(90deg,rgba(6,28,53,0.84)_0%,rgba(12,54,87,0.72)_45%,rgba(13,84,94,0.58)_100%)]"
      >
        <div className="flex flex-wrap justify-center gap-3">
          <a
            href="#books"
            className="inline-flex items-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
          >
            Explore Books
          </a>
          <a
            href="#membership"
            className="inline-flex items-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
          >
            Join Library
          </a>
        </div>
      </HeroSection>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className={sectionPanelClass}>
          <h2 className={sectionTitleClass}>About the Library</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm">
              <h3 className="text-xl font-black">Purpose-Driven Learning</h3>
              <p className="mt-3 text-sm leading-7 text-white/90">The library is built to offer learning, reading, and value-based growth for students and families.</p>
            </article>
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm">
              <h3 className="text-xl font-black">Support for Rural Students</h3>
              <p className="mt-3 text-sm leading-7 text-white/90">Special attention is given to rural and needy students who need reliable study access and reading support.</p>
            </article>
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm">
              <h3 className="text-xl font-black">Free or Low-Cost Access</h3>
              <p className="mt-3 text-sm leading-7 text-white/90">Books, learning tools, and membership support are designed to stay affordable and community-friendly.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className={sectionPanelClass}>
          <h2 className={sectionTitleClass}>Book Categories</h2>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => setSelectedCategory("All")} className={`rounded-full px-5 py-3 text-sm font-bold transition ${selectedCategory === "All" ? "bg-[#ffa114] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}>All Books</button>
            {BOOK_CATEGORIES.map((category) => (
              <button key={category} onClick={() => setSelectedCategory(category)} className={`rounded-full px-5 py-3 text-sm font-bold transition ${selectedCategory === category ? "bg-[#ffa114] text-white" : "bg-white/10 text-white hover:bg-white/20"}`}>
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="books" className="max-w-6xl mx-auto px-4 pt-6">
        <div className={sectionPanelClass}>
          <h2 className={sectionTitleClass}>Search &amp; Filter</h2>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[1fr_260px]">
            <input type="text" placeholder="Search by book name" value={search} onChange={(e) => setSearch(e.target.value)} className={inputClass} />
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className={inputClass}>
              <option value="All">All Categories</option>
              {BOOK_CATEGORIES.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredBooks.map((book) => (
              <article key={book.id} className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm transition duration-300 hover:-translate-y-1">
                <div className="overflow-hidden rounded-xl">
                  <img src={book.image} alt={book.title} className="h-44 w-full object-cover" />
                </div>
                <h3 className="mt-4 text-xl font-black">{book.title}</h3>
                <p className="mt-1 text-sm text-white/80">Author: {book.author}</p>
                <p className="mt-1 text-sm text-white/80">Category: {book.category}</p>
                <p className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-bold ${book.available ? "bg-emerald-500/20 text-white" : "bg-red-500/20 text-white"}`}>
                  {book.available ? "Available" : "Issued"}
                </p>
                <div className="mt-5 flex gap-3">
                  <button onClick={() => setSelectedBookId(book.id)} className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-[#0f5a98] transition hover:bg-[#eef4ff]">
                    View Details
                  </button>
                  <a href="#request" onClick={() => handleBookRequest(book.title)} className="rounded-xl bg-[#ffa114] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e78e07]">
                    Request Book
                  </a>
                </div>
              </article>
            ))}
          </div>

          {selectedBook ? (
            <div className="mt-6 rounded-2xl bg-[#0b5570] p-5 text-white">
              <h3 className="text-xl font-black">{selectedBook.title}</h3>
              <p className="mt-2 text-sm leading-7 text-white/90">{selectedBook.summary}</p>
            </div>
          ) : null}
        </div>
      </section>

      <section id="membership" className="max-w-6xl mx-auto px-4 pt-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_1fr]">
          <div className={sectionPanelClass}>
            <h2 className={sectionTitleClass}>Membership Form</h2>
            <form onSubmit={handleMembershipSubmit} className="space-y-3">
              <input type="text" placeholder="Name" value={membershipForm.name} onChange={(e) => setMembershipForm((form) => ({ ...form, name: e.target.value }))} required className={inputClass} />
              <input type="tel" placeholder="Mobile" value={membershipForm.mobile} onChange={(e) => setMembershipForm((form) => ({ ...form, mobile: e.target.value }))} required className={inputClass} />
              <textarea placeholder="Address" value={membershipForm.address} onChange={(e) => setMembershipForm((form) => ({ ...form, address: e.target.value }))} rows={4} required className={`${inputClass} resize-none`} />
              {membershipMsg ? <p className="text-sm text-green-300">{membershipMsg}</p> : null}
              <button type="submit" className="w-full rounded-xl bg-[#ffa114] py-3 font-bold text-white transition hover:bg-[#e78e07]">Join Library</button>
            </form>
          </div>

          <div id="request" className={sectionPanelClass}>
            <h2 className={sectionTitleClass}>Book Request Section</h2>
            <p className="mb-4 text-sm leading-7 text-white/90">Users can request books that are currently unavailable or not yet added to the library collection.</p>
            <form onSubmit={handleRequestSubmit} className="space-y-3">
              <input type="text" placeholder="Name" value={requestForm.name} onChange={(e) => setRequestForm((form) => ({ ...form, name: e.target.value }))} required className={inputClass} />
              <input type="tel" placeholder="Mobile" value={requestForm.mobile} onChange={(e) => setRequestForm((form) => ({ ...form, mobile: e.target.value }))} required className={inputClass} />
              <input type="text" placeholder="Book Title" value={requestForm.bookTitle} onChange={(e) => setRequestForm((form) => ({ ...form, bookTitle: e.target.value }))} required className={inputClass} />
              <textarea placeholder="Why do you need this book?" value={requestForm.reason} onChange={(e) => setRequestForm((form) => ({ ...form, reason: e.target.value }))} rows={4} className={`${inputClass} resize-none`} />
              {requestMsg ? <p className="text-sm text-green-300">{requestMsg}</p> : null}
              <button type="submit" className="w-full rounded-xl bg-white py-3 font-bold text-[#0f5a98] transition hover:bg-[#eef4ff]">Submit Request</button>
            </form>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className={sectionPanelClass}>
          <h2 className={sectionTitleClass}>Reading Center Info</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm"><h3 className="text-xl font-black">Location</h3><p className="mt-3 text-sm leading-7 text-white/90">Bhagwat Heritage Service Foundation Trust Campus, Chichpalli, Chandrapur.</p></article>
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm"><h3 className="text-xl font-black">Timing</h3><p className="mt-3 text-sm leading-7 text-white/90">Monday to Saturday, 9:00 AM to 6:00 PM.</p></article>
            <article className="rounded-2xl bg-[#0f2f50] p-5 text-white shadow-sm"><h3 className="text-xl font-black">Seating Capacity</h3><p className="mt-3 text-sm leading-7 text-white/90">Comfortable reading space for 40 learners at a time.</p></article>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6">
        <div className={`${sectionPanelClass} bg-[linear-gradient(135deg,#17384b_0%,#0f5e71_100%)]`}>
          <h2 className={sectionTitleClass}>Donation Section</h2>
          <p className="mb-5 max-w-3xl text-sm leading-7 text-white/90">Support the library by donating books, sponsoring learning material, or helping expand reading access for rural and needy students.</p>
          <div className="flex flex-wrap gap-3">
            <Link to={ROUTES.donate} className="rounded-xl bg-white px-6 py-3 font-bold text-[#0f5a98] transition hover:bg-[#eef4ff]">
              Donate Books
            </Link>
            <Link to={ROUTES.involved.sponsor} className="rounded-xl bg-[#ffa114] px-6 py-3 font-bold text-white transition hover:bg-[#e78e07]">
              Sponsor Library
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
});
