import { memo, useMemo, useState } from "react";
import { useCart } from "../../app/providers/CartProvider";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { HeroSection } from "../../components/ui/HeroSection";
import { usePageMeta } from "../../hooks/usePageMeta";
import {
  SEVA_BODY_TEXT_CLASS,
  SEVA_CARD_TITLE_CLASS,
  SEVA_HERO_SUBTITLE_CLASS,
  SEVA_HIGHLIGHT_TITLE_CLASS,
  SEVA_HIGHLIGHT_VALUE_CLASS,
  SEVA_SECTION_HEADING_CLASS,
  SEVA_SECTION_LABEL_CLASS,
} from "../seva/sevaTypography";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
  stock: number;
  featured?: boolean;
  tag?: string;
}

const PRODUCTS: Product[] = [
  {
    id: "13",
    name: "Rudraksha",
    price: 299,
    category: "Spiritual Remedies",
    description: "Sacred mala for japa, meditation, and daily mantra practice.",
    image: "/images/maharaj ji/faith.png",
    stock: 18,
    featured: true,
    tag: "Guidance",
  },
  {
    id: "14",
    name: "Yantra",
    price: 499,
    category: "Spiritual Remedies",
    description: "Devotional yantra item for puja, focus, and blessings.",
    image: "/images/maharaj ji/store.avif",
    stock: 12,
    featured: true,
    tag: "Temple Supply",
  },
  {
    id: "15",
    name: "Puja Samagri",
    price: 199,
    category: "Spiritual Remedies",
    description: "Essential puja pack for daily worship and home rituals.",
    image: "/images/maharaj ji/vastu.jpg",
    stock: 24,
    featured: true,
    tag: "Daily Use",
  },
  {
    id: "1",
    name: "Bhagwat Gita Deluxe",
    price: 499,
    category: "Books",
    description: "Hardcover edition for daily reading and study.",
    image: "/images/books/bhagwat geeta.png",
    stock: 14,
    featured: true,
    tag: "Best Seller",
  },
  {
    id: "2",
    name: "Ramayan Classic",
    price: 459,
    category: "Books",
    description: "Readable spiritual edition with clear typography.",
    image: "/images/books/ramayan.png",
    stock: 11,
  },
  {
    id: "3",
    name: "Mahabharata Set",
    price: 999,
    category: "Books",
    description: "Multi-volume set for scripture enthusiasts.",
    image: "/images/books/MahabharataSet.png",
    stock: 8,
    featured: true,
    tag: "Premium",
  },
  {
    id: "4",
    name: "Temple Bell Brass",
    price: 799,
    category: "Puja Items",
    description: "Traditional brass bell with balanced tone.",
    image: "/images/books/Temple Bell Brass.png",
    stock: 6,
  },
  {
    id: "5",
    name: "Shivling Marble",
    price: 1299,
    category: "Puja Items",
    description: "Hand-finished marble Shivling for mandir setup.",
    image: "/images/books/Shivling Marble.png",
    stock: 5,
    tag: "New",
  },
  {
    id: "6",
    name: "Tulsi Mala",
    price: 249,
    category: "Accessories",
    description: "Pure Tulsi jap mala for mantra practice.",
    image: "/images/kathapravachan.png",
    stock: 20,
  },
  {
    id: "7",
    name: "Krishna Idol",
    price: 1599,
    category: "Idols",
    description: "Decorative Krishna murti for home altar.",
    image: "/images/books/Krishna Idol.png",
    stock: 4,
    featured: true,
  },
  {
    id: "8",
    name: "Hanuman Idol",
    price: 1499,
    category: "Idols",
    description: "Strong resin finish with devotional detailing.",
    image: "/images/books/Hanuman Idol.png",
    stock: 7,
  },
  {
    id: "9",
    name: "Vedic Chant Audio Pack",
    price: 299,
    category: "Media",
    description: "Devotional audio collection for morning routine.",
    image: "/images/books/Vedic Chant Audio.png",
    stock: 16,
  },
  {
    id: "10",
    name: "Yoga Mat Premium",
    price: 899,
    category: "Wellness",
    description: "Comfort mat for yoga, pranayama, and meditation.",
    image: "/images/books/Yoga Mat Premium.png",
    stock: 10,
  },
  {
    id: "11",
    name: "Sanskrit Dictionary",
    price: 699,
    category: "Books",
    description: "Useful reference for Sanskrit study and chanting.",
    image: "/images/books/Sanskrit Dictionary.png",
    stock: 9,
  },
  {
    id: "12",
    name: "Prasad Pack",
    price: 349,
    category: "Prasad",
    description: "Temple-style prasad assortment for families.",
    image: "/images/annseva.png",
    stock: 25,
  },
];

const STORE_FEATURES = [
  "Fast add-to-cart checkout flow",
  "Live stock visibility per product",
  "Category and price based filtering",
  "Cart quantity management",
  "Featured products highlights",
  "Discount-ready pricing model",
];

const CATEGORIES = ["All", ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];
const SORT_OPTIONS = [
  { value: "featured", label: "Featured First" },
  { value: "price-asc", label: "Price Low to High" },
  { value: "price-desc", label: "Price High to Low" },
  { value: "name-asc", label: "Name A to Z" },
];

export default memo(function StorePage() {
  usePageMeta("E-Store", "Bhagwat Heritage digital store for books, puja essentials, devotional goods, and wellness items.");

  const { addItem, items, removeItem, updateQty, clearCart, total, count } = useCart();
  const [cartVisible, setCartVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(2000);
  const sectionClass = "max-w-7xl mx-auto px-4 py-8";
  const panelClass = "rounded-[30px] border border-white/10 bg-[var(--campaign-bg)] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.22)] md:p-8";
  const cardClass = "rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm";
  const filterInputClass =
    "w-full rounded-2xl border border-white/10 bg-white px-4 py-3 text-sm text-[#17314a] outline-none transition placeholder:text-[#6b8091] focus:border-[var(--campaign-accent)] focus:ring-2 focus:ring-[#efc06a]";
  const scrollToProducts = () => document.getElementById("store-products")?.scrollIntoView({ behavior: "smooth", block: "start" });

  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    const base = PRODUCTS.filter((p) => {
      const matchText =
        q.length === 0 ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q);
      const matchCategory = category === "All" || p.category === category;
      const matchPrice = p.price <= maxPrice;
      return matchText && matchCategory && matchPrice;
    });

    return [...base].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "name-asc") return a.name.localeCompare(b.name);
      if (sortBy === "featured") return Number(Boolean(b.featured)) - Number(Boolean(a.featured));
      return 0;
    });
  }, [search, category, sortBy, maxPrice]);

  const featuredProducts = useMemo(() => PRODUCTS.filter((p) => p.featured).slice(0, 3), []);
  const cartSubtotal = total;
  const shipping = cartSubtotal > 0 ? 79 : 0;
  const grandTotal = cartSubtotal + shipping;

  return (
    <div className="min-h-screen bg-[var(--campaign-deep)] pb-16">
      <HeroSection
        title="E-Store"
        subtitle="Digital seva, delivered with devotion"
        subtitleClassName={SEVA_HERO_SUBTITLE_CLASS}
        contentClassName="flex h-full flex-col justify-end pb-[22px] md:pb-[30px] [&>h1]:mb-[10px] [&>p]:mb-[10px]"
        backgroundImage="https://res.cloudinary.com/der8zinu8/image/upload/v1772920428/store_snvng8.avif"
        boxed
        heightClass="h-[360px] md:h-[520px]"
        overlayClass="bg-black/55"
      >
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setCartVisible(true)}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-accent)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
          >
            Open Cart ({count})
          </button>
          <button
            type="button"
            onClick={scrollToProducts}
            className="inline-flex items-center rounded-lg bg-[var(--campaign-bg)] px-6 py-3 font-semibold text-white transition-colors hover:bg-[var(--campaign-mid-hover)]"
          >
            Browse Products
          </button>
          <Link
            to={ROUTES.digital.index}
            className="inline-flex items-center rounded-lg border border-white/35 bg-white/8 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/14"
          >
            Digital Services
          </Link>
        </div>
      </HeroSection>

      <section className="relative z-20 mt-[10px] pb-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Store Access", value: "Books and devotional goods", note: "A focused digital storefront for satsang, puja, and home use." },
              { title: "Shopping Flow", value: "Search, filter, and add", note: "A clean browsing experience for products, pricing, and cart actions." },
              { title: "Featured Picks", value: "Highlighted daily essentials", note: "Quick access to popular spiritual items and trusted selections." },
              { title: "User Experience", value: "Fast and functional", note: "Now visually aligned with the Gau Seva banner and typography style." },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-[var(--campaign-bg)] p-4 shadow-[0_12px_24px_rgba(0,0,0,0.20)]">
                <p className={SEVA_HIGHLIGHT_TITLE_CLASS}>* {item.title}</p>
                <p className={SEVA_HIGHLIGHT_VALUE_CLASS}>{item.value}</p>
                <p className={`mt-1 ${SEVA_BODY_TEXT_CLASS}`}>{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={panelClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Store Features</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Simple tools for clean browsing and checkout support</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {STORE_FEATURES.map((feature) => (
            <div key={feature} className="rounded-2xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-sm font-medium text-[var(--campaign-text)] shadow-sm md:text-[15px]">
              {feature}
            </div>
          ))}
        </div>
        </div>
      </section>

      <section className={sectionClass}>
        <div className={panelClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Featured Products</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Popular devotional items and trusted store selections</h2>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {featuredProducts.map((product) => (
            <div key={product.id} className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4 md:p-5">
                <p className="mb-2 inline-block rounded-full bg-[var(--campaign-accent)]/15 px-2 py-1 text-[11px] font-bold text-[var(--campaign-accent)]">
                  {product.tag || "Featured"}
                </p>
                <h3 className={`${SEVA_CARD_TITLE_CLASS} text-base md:text-lg`}>{product.name}</h3>
                <p className={`mt-1 text-xs md:text-sm ${SEVA_BODY_TEXT_CLASS}`}>{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--campaign-accent)] md:text-lg">Rs {product.price}</span>
                  <button
                    type="button"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="rounded-lg bg-[var(--campaign-accent)] px-3 py-1.5 text-xs text-white transition-colors hover:bg-[var(--campaign-accent-hover)] md:text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        </div>
      </section>

      <section id="store-products" className={sectionClass}>
        <div className={panelClass}>
          <p className={SEVA_SECTION_LABEL_CLASS}>Store Catalog</p>
          <h2 className={SEVA_SECTION_HEADING_CLASS}>Browse products by category, price, and search</h2>
          <div className="mt-8 rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] p-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`md:col-span-2 ${filterInputClass}`}
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={filterInputClass}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={filterInputClass}
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-[var(--campaign-text)]">
              <span>Max Price: Rs {maxPrice}</span>
              <span>{filteredProducts.length} products</span>
            </div>
            <input
              type="range"
              min={100}
              max={2000}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-2 w-full accent-[var(--campaign-accent)]"
            />
          </div>
        </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-[24px] border border-white/10 bg-[var(--campaign-surface)] shadow-sm transition-shadow hover:shadow-md">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover md:h-40" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded bg-[var(--campaign-accent)]/15 px-2 py-0.5 text-xs text-[var(--campaign-accent)]">{product.category}</span>
                  {product.stock <= 5 ? (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Low Stock</span>
                  ) : null}
                </div>
                <h3 className={`mt-2 text-base ${SEVA_CARD_TITLE_CLASS}`}>{product.name}</h3>
                <p className={`mt-1 text-xs md:text-sm ${SEVA_BODY_TEXT_CLASS}`}>{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[var(--campaign-accent)] md:text-lg">Rs {product.price}</span>
                  <button
                    type="button"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="rounded-lg bg-[var(--campaign-accent)] px-3 py-1.5 text-xs text-white transition-colors hover:bg-[var(--campaign-accent-hover)] md:text-sm"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {cartVisible && (
        <div className="fixed inset-0 z-50">
        <div className="absolute inset-0 bg-black/35" onClick={() => setCartVisible(false)} />
        <aside className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto border-l border-white/10 bg-[var(--campaign-deep)] p-5 shadow-2xl">
          <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white md:text-xl">Your Cart ({count})</h3>
              <button
                type="button"
                onClick={() => setCartVisible(false)}
                className="rounded-lg border border-white/10 px-3 py-1.5 text-sm text-white"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <p className="mt-8 text-[var(--campaign-text)]">Your cart is empty.</p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-white">{item.name}</p>
                          <p className="text-sm text-[var(--campaign-text)]">Rs {item.price} each</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-sm text-[var(--campaign-accent)]"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 rounded-md border border-white/10 text-white"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-semibold text-white">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-md border border-white/10 text-white"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-white">Rs {item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 space-y-2 rounded-xl border border-white/10 bg-[var(--campaign-surface)] p-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--campaign-text)]">Subtotal</span>
                    <span className="font-semibold text-white">Rs {cartSubtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[var(--campaign-text)]">Shipping</span>
                    <span className="font-semibold text-white">Rs {shipping}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-bold text-white">Rs {grandTotal}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-xl border border-white/10 py-2.5 font-semibold text-white"
                  >
                    Clear Cart
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-[var(--campaign-accent)] py-2.5 font-semibold text-white transition-colors hover:bg-[var(--campaign-accent-hover)]"
                  >
                    Checkout
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
});

