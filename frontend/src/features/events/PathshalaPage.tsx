import { memo, useState, type FormEvent } from "react";
import { HeroSection } from "../../components/ui/HeroSection";
import { pathshalaApi } from "../../services/api/misc";

export default memo(function PathshalaPage() {
  const [form, setForm] = useState({
    name: "", age: "", parentName: "", phone: "", email: "", course: "", message: "",
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const COURSES = ["Bhagwat Katha", "Vedic Studies", "Sanskrit", "Yoga & Meditation", "Classical Music", "Classical Dance"];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await pathshalaApi.submit({ ...form, age: form.age ? Number(form.age) : undefined });
      setMsg("Admission submitted successfully! We'll contact you soon.");
      setForm({ name: "", age: "", parentName: "", phone: "", email: "", course: "", message: "" });
    } catch {
      setMsg("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeroSection title="E-Pathshala" subtitle="Spiritual & Cultural Education for All" />

      <section className="py-16 max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-bold text-[#0d3b66] mb-6">Our Courses</h2>
            <div className="space-y-3">
              {COURSES.map((course) => (
                <div key={course} className="flex items-center gap-3 bg-white rounded-lg p-3 shadow-sm">
                  <i className="fas fa-graduation-cap text-[#0d3b66]" />
                  <span className="font-semibold text-[#0d3b66]">{course}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-[#0d3b66] mb-6">Apply for Admission</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Student Name" value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <input type="number" placeholder="Age" value={form.age}
                onChange={(e) => setForm((f) => ({ ...f, age: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <input type="text" placeholder="Parent/Guardian Name" value={form.parentName}
                onChange={(e) => setForm((f) => ({ ...f, parentName: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <input type="tel" placeholder="Phone" value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <input type="email" placeholder="Email" value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]" />
              <select value={form.course} onChange={(e) => setForm((f) => ({ ...f, course: e.target.value }))}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66]">
                <option value="">Select Course</option>
                {COURSES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <textarea placeholder="Message" value={form.message}
                onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={3}
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0d3b66] resize-none" />
              {msg && <p className="text-green-600 text-sm">{msg}</p>}
              <button type="submit" disabled={loading} className="btn-primary w-full py-3">
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
});
