import { useState, type FormEvent, memo } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { involvedApi } from "../../services/api/misc";

export default memo(function GetInvolvedPage() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", city: "", age: "", interest: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const INTERESTS = ["Volunteer Work", "Donation", "Cultural Events", "Spiritual Programs", "Education Support", "Healthcare Support"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await involvedApi.join({
        ...form,
        age: form.age ? Number(form.age) : undefined,
      });
      setMsg("Application submitted successfully! You'll receive a confirmation email. 🙏");
      setForm({ name: "", email: "", phone: "", city: "", age: "", interest: "", message: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection title="Get Involved" subtitle="Join the Bhagwat Heritage Family" />

      <section className="py-16 max-w-2xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
          <h2 className="text-2xl font-bold text-[#0d3b66] mb-2">Join Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" placeholder="Full Name" value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <input type="email" placeholder="Email" value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <input type="tel" placeholder="Phone" value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <input type="text" placeholder="City" value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <input type="number" placeholder="Age" value={form.age}
              onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
            <select value={form.interest} onChange={(e) => setForm((f) => ({ ...f, interest: e.target.value }))}
              className="px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]">
              <option value="">Area of Interest</option>
              {INTERESTS.map((i) => <option key={i} value={i}>{i}</option>)}
            </select>
          </div>
          <textarea placeholder="Your Message" value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={4}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none" />
          {msg && <p className="text-green-600 text-sm">{msg}</p>}
          <button type="submit" disabled={loading} className="btn-primary w-full py-3">
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </section>
    </div>
  );
});
