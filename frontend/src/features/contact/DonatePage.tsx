import { useState, type FormEvent, memo } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { donorApi } from "../../services/api/misc";

const DONATION_TIERS = [
  { label: "Basic Support", amount: 1001 },
  { label: "Silver Seva", amount: 5001 },
  { label: "Gold Seva", amount: 11000 },
  { label: "Platinum Seva", amount: 51000 },
];

export default memo(function DonatePage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", amount: 1001, message: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await donorApi.create(form);
      setMsg("Thank you for your generous donation! 🙏");
      setForm({ name: "", email: "", phone: "", amount: 1001, message: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection
        title="Make a Donation"
        subtitle="Your contribution helps us serve thousands of lives"
      />

      <section className="py-16 max-w-5xl mx-auto px-4">
        <h2 className="section-title">Seva Plans</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {DONATION_TIERS.map((tier) => (
            <button
              key={tier.amount}
              onClick={() => setForm((f) => ({ ...f, amount: tier.amount }))}
              className={`p-4 rounded-xl border-2 text-center transition-all ${
                form.amount === tier.amount
                  ? "border-[#0d3b66] bg-[#0d3b66] text-white"
                  : "border-gray-200 hover:border-[#0d3b66]"
              }`}
            >
              <p className="font-bold">{tier.label}</p>
              <p className="text-lg">₹{tier.amount.toLocaleString()}</p>
            </button>
          ))}
        </div>

        <div className="max-w-lg mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              required
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
            />
            <div className="flex items-center gap-2">
              <span className="text-gray-500 font-semibold">₹</span>
              <input
                type="number"
                placeholder="Custom Amount"
                value={form.amount}
                onChange={(e) => setForm((f) => ({ ...f, amount: Number(e.target.value) }))}
                min={1}
                required
                className="flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
              />
            </div>
            <textarea
              placeholder="Message (optional)"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={3}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
            />
            {msg && <p className="text-green-600 text-sm">{msg}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-lg">
              {loading ? "Processing..." : `Donate ₹${form.amount.toLocaleString()}`}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
});
