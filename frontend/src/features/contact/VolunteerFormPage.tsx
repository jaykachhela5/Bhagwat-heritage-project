import { useState, type FormEvent, memo } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { volunteersApi } from "../../services/api/volunteers";

export default memo(function VolunteerFormPage() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", sevaArea: "", skills: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const SEVA_AREAS = ["Education", "Healthcare", "Cultural Events", "IT Support", "Administration", "Fundraising", "Community Outreach"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await volunteersApi.create(form);
      setMsg("Application submitted! We'll contact you soon. 🙏");
      setForm({ fullName: "", email: "", phone: "", sevaArea: "", skills: "", message: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection title="Become a Volunteer" subtitle="Join our team and make a difference" />

      <section className="py-16 max-w-2xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-[#0d3b66] mb-2">Volunteer Application</h2>
          <input type="text" placeholder="Full Name (min 3 chars)" value={form.fullName}
            onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))} required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
          <input type="email" placeholder="Email" value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))} required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
          <input type="tel" placeholder="Indian Mobile (10 digits)" value={form.phone}
            onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))} required
            pattern="[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
          <select value={form.sevaArea} onChange={(e) => setForm((f) => ({ ...f, sevaArea: e.target.value }))} required
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]">
            <option value="">Select Seva Area</option>
            {SEVA_AREAS.map((area) => <option key={area} value={area}>{area}</option>)}
          </select>
          <input type="text" placeholder="Skills (optional)" value={form.skills}
            onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
          <textarea placeholder="Why do you want to volunteer? (max 500 chars)" value={form.message}
            onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={4} maxLength={500}
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
