import { memo, useMemo, useState } from "react";
import { useCart } from "../../app/providers/CartProvider";

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
  const { addItem, items, removeItem, updateQty, clearCart, total, count } = useCart();
  const [cartVisible, setCartVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [maxPrice, setMaxPrice] = useState(2000);

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
    <div className="relative overflow-hidden bg-gradient-to-b from-[#ebf3ff] via-[#f6fbff] to-[#fff6ea] pb-16">
      <div className="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-[#2f79cf]/20 blur-3xl" />
      <div className="pointer-events-none absolute top-[420px] -right-24 h-72 w-72 rounded-full bg-[#19af8d]/18 blur-3xl" />

      <section className="max-w-6xl mx-auto px-4 pt-8 md:pt-10">
        <div
          className="relative overflow-hidden rounded-[30px] bg-cover bg-center text-white px-6 py-10 md:px-12 md:py-12 shadow-[0_20px_50px_rgba(15,47,87,0.24)]"
          style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1772920428/store_snvng8.avif')" }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(6,28,53,0.86)_0%,rgba(12,54,87,0.72)_45%,rgba(13,84,94,0.56)_100%)]" />
          <div className="absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-white/10 blur-xl" />
          <div className="relative z-10 mx-auto max-w-3xl text-center">
              <h1 className="max-w-2xl mx-auto text-4xl font-black leading-tight md:text-5xl">Bhagwat Heritage E-Store</h1>
              <p className="mt-2 text-[34px] font-semibold leading-tight text-gray-200 md:text-[40px]">
                Digital Spiritual Store
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-white/90 md:text-xl">
                Browse books, puja essentials, devotional goods, and wellness items in one organized storefront.
              </p>
              <div className="mt-7 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setCartVisible(true)}
                  className="inline-flex items-center rounded-lg bg-[#ef9a1e] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#de930a]"
                >
                  Open Cart ({count})
                </button>
                <button
                  type="button"
                  onClick={() => window.scrollTo({ top: 700, behavior: "smooth" })}
                  className="inline-flex items-center rounded-lg bg-[#0d6179] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#18495e]"
                >
                  Browse Products
                </button>
              </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="mb-4 text-xl font-black text-[#18324c] md:text-2xl">Store Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {STORE_FEATURES.map((feature) => (
            <div key={feature} className="rounded-2xl border border-[#dce6ef] bg-white p-3 text-sm font-medium text-[#304657] shadow-sm md:p-4 md:text-[15px]">
              {feature}
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <h2 className="mb-4 text-xl font-black text-[#18324c] md:text-2xl">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {featuredProducts.map((product) => (
            <div key={product.id} className="rounded-2xl overflow-hidden border border-[#dce6ef] bg-white shadow-sm">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover" />
              <div className="p-4 md:p-5">
                <p className="mb-2 inline-block rounded-full bg-[#eaf3ff] px-2 py-1 text-[11px] font-bold text-[#145b95]">
                  {product.tag || "Featured"}
                </p>
                <h3 className="font-bold text-[#0f678c] text-base md:text-lg">{product.name}</h3>
                <p className="mt-1 text-xs text-[#5c6f7d] md:text-sm">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-bold text-[#f29508] text-base md:text-lg">Rs {product.price}</span>
                  <button
                    type="button"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="rounded-lg bg-[#0f5fbf] px-3 py-1.5 text-xs text-white transition-colors hover:bg-[#0d55ab] md:text-sm"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-8">
        <div className="rounded-3xl bg-white border border-[#dce6ef] p-5 md:p-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <input
              type="text"
              placeholder="Search products"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="md:col-span-2 px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
            />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
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
              className="px-4 py-3 border border-[#d7e1ea] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1d6dab]"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-[#4d5c67]">
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
              className="w-full mt-2 accent-[#0f5fbf]"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product) => (
            <article key={product.id} className="bg-white rounded-2xl border border-[#dce6ef] overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={product.image} alt={product.name} className="w-full h-36 object-cover md:h-40" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs bg-[#0f678c]/10 text-[#0f678c] px-2 py-0.5 rounded">{product.category}</span>
                  {product.stock <= 5 ? (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded">Low Stock</span>
                  ) : null}
                </div>
                <h3 className="mt-2 font-bold text-[#0f678c] text-base">{product.name}</h3>
                <p className="mt-1 text-xs text-[#5b6d7b] md:text-sm">{product.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[#f29508] md:text-lg">Rs {product.price}</span>
                  <button
                    type="button"
                    onClick={() => addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })}
                    className="rounded-lg bg-[#0f5fbf] px-3 py-1.5 text-xs text-white transition-colors hover:bg-[#0d55ab] md:text-sm"
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
        <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white border-l border-[#dce6ef] shadow-2xl p-5 overflow-y-auto">
          <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#173b57] md:text-xl">Your Cart ({count})</h3>
              <button
                type="button"
                onClick={() => setCartVisible(false)}
                className="rounded-lg border border-[#d5e1eb] px-3 py-1.5 text-sm text-[#173b57]"
              >
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <p className="text-[#5d6f7d] mt-8">Your cart is empty.</p>
            ) : (
              <>
                <div className="mt-4 space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="rounded-xl border border-[#e1eaf2] p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-semibold text-[#0f678c]">{item.name}</p>
                          <p className="text-sm text-[#607281]">Rs {item.price} each</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600 text-sm"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, Math.max(1, item.quantity - 1))}
                            className="h-8 w-8 rounded-md border border-[#d4e1ec]"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQty(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-md border border-[#d4e1ec]"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-bold text-[#173b57]">Rs {item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 rounded-xl bg-[#f5f9fd] border border-[#deebf6] p-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#5c6f7d]">Subtotal</span>
                    <span className="font-semibold">Rs {cartSubtotal}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#5c6f7d]">Shipping</span>
                    <span className="font-semibold">Rs {shipping}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-[#d9e8f5] pt-2">
                    <span className="font-bold text-[#173b57]">Total</span>
                    <span className="font-bold text-[#173b57]">Rs {grandTotal}</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={clearCart}
                    className="rounded-xl border border-[#d4e1ec] py-2.5 font-semibold text-[#173b57]"
                  >
                    Clear Cart
                  </button>
                  <button
                    type="button"
                    className="rounded-xl bg-[#ffa114] hover:bg-[#e78e07] text-white py-2.5 font-semibold transition-colors"
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

