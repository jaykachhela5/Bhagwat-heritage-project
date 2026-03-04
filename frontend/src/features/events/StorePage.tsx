import { memo, useState } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { useCart } from "../../app/providers/CartProvider";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  description: string;
}

const PRODUCTS: Product[] = [
  { id: "1", name: "Bhagwat Gita", price: 299, category: "Books", description: "Sacred scripture" },
  { id: "2", name: "Incense Sticks (Premium)", price: 149, category: "Puja Items", description: "Handmade incense" },
  { id: "3", name: "Brass Diya", price: 499, category: "Puja Items", description: "Traditional oil lamp" },
  { id: "4", name: "Tulsi Mala", price: 199, category: "Accessories", description: "Sacred beads" },
  { id: "5", name: "Bhajan CD", price: 99, category: "Music", description: "Devotional songs" },
  { id: "6", name: "Prasad Box", price: 349, category: "Prasad", description: "Temple blessed prasad" },
];

const CATEGORY_ICONS: Record<string, string> = {
  Books: "📚", "Puja Items": "🪔", Accessories: "📿", Music: "🎵", Prasad: "🍱",
};

export default memo(function StorePage() {
  const { addItem, items, removeItem, total, count } = useCart();
  const [cartVisible, setCartVisible] = useState(false);

  return (
    <div>
      <HeroSection title="E-Store" subtitle="Spiritual Items & Bhagwat Heritage Products" />

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="section-title mb-0">Our Products</h2>
          <button
            onClick={() => setCartVisible((v) => !v)}
            className="relative btn-primary"
          >
            <i className="fas fa-shopping-cart mr-2" />
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="h-40 bg-gradient-to-br from-[#0d3b66]/10 to-[#f4a261]/10 flex items-center justify-center">
                <span className="text-5xl">{CATEGORY_ICONS[product.category] ?? "🕉️"}</span>
              </div>
              <div className="p-4">
                <span className="text-xs bg-[#0d3b66]/10 text-[#0d3b66] px-2 py-0.5 rounded">
                  {product.category}
                </span>
                <h3 className="font-bold text-[#0d3b66] mt-2">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.description}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-[#f4a261]">₹{product.price}</span>
                  <button
                    onClick={() =>
                      addItem({ id: product.id, name: product.name, price: product.price, quantity: 1 })
                    }
                    className="btn-primary text-sm py-1.5"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cartVisible && items.length > 0 && (
        <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full z-50 border border-gray-100">
          <h3 className="font-bold text-[#0d3b66] mb-3">Your Cart ({count} items)</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="flex-1">
                  {item.name} × {item.quantity}
                </span>
                <span className="font-semibold mx-2">₹{item.price * item.quantity}</span>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <i className="fas fa-trash-alt" />
                </button>
              </div>
            ))}
          </div>
          <div className="border-t mt-3 pt-3 flex items-center justify-between">
            <span className="font-bold text-[#0d3b66]">Total: ₹{total}</span>
            <button className="btn-primary text-sm">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
});
