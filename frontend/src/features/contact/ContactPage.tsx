import { useState, type FormEvent, memo } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { contactApi } from "../../services/api/misc";

export default memo(function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await contactApi.send(form);
      setMsg("Message sent successfully! We'll get back to you soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection title="Contact Us" subtitle="We'd love to hear from you" />

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#0d3b66] mb-6">Get In Touch</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {(["name", "email", "subject"] as const).map((field) => (
                <input
                  key={field}
                  type={field === "email" ? "email" : "text"}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={(e) => setForm((f) => ({ ...f, [field]: e.target.value }))}
                  required={field !== "subject"}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]"
                />
              ))}
              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                required
                rows={5}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none"
              />
              {msg && <p className="text-sm text-green-600">{msg}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0d3b66] mb-6">Find Us</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[#0d3b66] mt-1" />
                <span>Swaminarayan Temple, Kasturba Road, ChandraPur, Maharashtra, India</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-[#0d3b66]" />
                <span>info@bhagwatheritage.org</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-[#0d3b66]" />
                <span>+91 9876543210</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
});
