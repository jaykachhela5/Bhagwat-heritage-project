import { memo, useMemo, useState, type FormEvent } from "react";
import { contactApi } from "../../services/api/misc";
import { FeatureHeroSlider } from "../../components/sections/FeatureHeroSlider";
import { InfoCardGrid } from "../../components/sections/InfoCardGrid";
import { FAQSection } from "../../components/sections/FAQSection";
import { PageSectionShell } from "../../components/sections/PageSectionShell";
import { usePageMeta } from "../../hooks/usePageMeta";

type ContactType = "General Inquiry" | "Seva Support" | "Event & Katha" | "Donation Help" | "Volunteer Coordination";
type PreferredContact = "Phone Call" | "WhatsApp" | "Email";

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=1600&q=80",
    title: "Serve with Purpose",
    subtitle: "Join trusted seva teams for education, healthcare, and community welfare.",
  },
  {
    image: "https://static.vecteezy.com/system/resources/thumbnails/028/151/501/small_2x/plexus-motion-background-animation-animated-background-free-video.jpg",
    title: "Connect with Bhagwat Heritage",
    subtitle: "Get support for seva, events, donations, and temple programs.",
  },
  {
    image: "https://images.unsplash.com/photo-1613318088322-6c8575f19443?auto=format&fit=crop&w=1600&q=80",
    title: "Faith, Culture, Humanity",
    subtitle: "Reach our team for meaningful spiritual and social service coordination.",
  },
];

const WHAT_WE_DO = [
  {
    title: "Our Mission",
    desc: "Promoting spirituality, culture, and seva through organized volunteer efforts.",
  },
  {
    title: "Upcoming Events",
    desc: "Support major katha, utsav, and social service programs with on-ground coordination.",
  },
  {
    title: "Temple Activities",
    desc: "Contribute to puja support, prasad distribution, and daily darshan operations.",
  },
];

const QUICK_CONTACT = [
  { title: "Call Us", value: "+91-866-889-7445", icon: "fas fa-phone", href: "tel:+918668897445" },
  { title: "WhatsApp", value: "+91-866-889-7445", icon: "fab fa-whatsapp", href: "https://wa.me/918668897445" },
  { title: "Email", value: "join@bhagwatheritage.org", icon: "fas fa-envelope", href: "mailto:join@bhagwatheritage.org" },
];

const FAQS = [
  {
    q: "How fast can I expect a response?",
    a: "Usually within 24-48 hours for general queries and sooner for urgent seva requests.",
  },
  {
    q: "Can I request callback for seva guidance?",
    a: "Yes, choose preferred contact mode in the form and our coordinator will connect.",
  },
  {
    q: "Can organizations collaborate with the trust?",
    a: "Yes, we support collaboration for social service, education, and healthcare initiatives.",
  },
];

export default memo(function ContactPage() {
  usePageMeta("Contact", "Contact Bhagwat Heritage trust for seva, events, and donation support.");

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    subject: "",
    message: "",
    contactType: "General Inquiry" as ContactType,
    preferredContact: "Phone Call" as PreferredContact,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const completion = useMemo(() => {
    const required = [form.name, form.email, form.message];
    const filled = required.filter((item) => item.trim().length > 0).length;
    return Math.round((filled / required.length) * 100);
  }, [form.name, form.email, form.message]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    try {
      const composedMessage = [
        form.message,
        form.city ? `City: ${form.city}` : "",
        `Contact Type: ${form.contactType}`,
        `Preferred Contact: ${form.preferredContact}`,
      ]
        .filter(Boolean)
        .join(" | ");

      await contactApi.send({
        name: form.name,
        email: form.email,
        subject: form.subject || form.contactType,
        message: composedMessage,
      });

      setMsg({ type: "success", text: "Message sent successfully! Our seva team will contact you soon." });
      setForm({
        name: "",
        email: "",
        phone: "",
        city: "",
        subject: "",
        message: "",
        contactType: "General Inquiry",
        preferredContact: "Phone Call",
      });
    } catch {
      setMsg({ type: "error", text: "Something went wrong. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-12">
      <PageSectionShell className="pt-8 md:pt-10">
        <FeatureHeroSlider slides={HERO_SLIDES} />
      </PageSectionShell>

      <PageSectionShell className="pt-8">
        <InfoCardGrid title="What We Do" items={WHAT_WE_DO.map((item) => ({ ...item, iconClass: "fas fa-hand-holding-heart" }))} />
      </PageSectionShell>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="rounded-3xl border border-[#f1c899] bg-gradient-to-r from-[#fff7eb] via-[#fff2e3] to-[#ffe8cf] p-5 md:p-6 shadow-[0_12px_26px_rgba(177,96,23,0.14)]">
          <p className="text-sm md:text-base font-medium text-[#7a4f1f] text-center">
            Join hands with Bhagwat Heritage Service Foundation Trust to support temple seva, community outreach, and devotional programs with disciplined teamwork and transparent impact.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {QUICK_CONTACT.map((item) => (
            <a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("http") ? "_blank" : undefined}
              rel={item.href.startsWith("http") ? "noreferrer" : undefined}
              className="rounded-2xl border border-[#dce8f5] bg-white p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-[#eff5fb] text-[var(--color-secondary)] flex items-center justify-center">
                  <i className={item.icon} />
                </div>
                <div>
                  <p className="text-sm text-[#5b6d7a]">{item.title}</p>
                  <p className="font-bold text-[#123753]">{item.value}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="py-10 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={handleSubmit} className="rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-[0_16px_35px_rgba(13,59,102,0.10)]">
            <div className="flex items-center justify-between gap-3 mb-5">
              <h2 className="text-2xl md:text-3xl font-black text-[#123753]">Contact Seva Team</h2>
              <div className="min-w-[160px]">
                <p className="text-xs uppercase tracking-wide text-[#46627f] font-semibold mb-1">Form Completion</p>
                <div className="h-2 rounded-full bg-[#e6eef8] overflow-hidden">
                  <div className="h-full bg-[#c47508] transition-all" style={{ width: `${completion}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                required
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                required
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              />
              <input
                type="text"
                placeholder="City"
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <select
                value={form.contactType}
                onChange={(e) => setForm((f) => ({ ...f, contactType: e.target.value as ContactType }))}
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              >
                {(["General Inquiry", "Seva Support", "Event & Katha", "Donation Help", "Volunteer Coordination"] as ContactType[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
              <select
                value={form.preferredContact}
                onChange={(e) => setForm((f) => ({ ...f, preferredContact: e.target.value as PreferredContact }))}
                className="px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
              >
                {(["Phone Call", "WhatsApp", "Email"] as PreferredContact[]).map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>

            <input
              type="text"
              placeholder="Subject"
              value={form.subject}
              onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
              className="w-full mt-4 px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
            />

            <textarea
              placeholder="Your Message"
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              required
              rows={5}
              className="w-full mt-4 px-4 py-3 border border-[#d5e2f0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] resize-none"
            />

            {msg && (
              <p className={`mt-3 text-sm font-semibold ${msg.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {msg.text}
              </p>
            )}
            <button type="submit" disabled={loading} className="mt-4 btn-primary w-full py-3">
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          <article className="rounded-3xl border border-[#dce8f4] bg-white p-6 md:p-8 shadow-[0_16px_35px_rgba(13,59,102,0.08)]">
            <h2 className="text-2xl md:text-3xl font-black text-[#123753] mb-4">Find Us</h2>
            <ul className="space-y-4 text-[#4f6272]">
              <li className="flex items-start gap-3">
                <i className="fas fa-map-marker-alt text-[var(--color-secondary)] mt-1" />
                <span>Bhagwat Dham - Shree Swaminarayan Mandir, Kasturba Rd, Hospital ward, Chandrapur, Maharashtra 442402</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-envelope text-[var(--color-secondary)]" />
                <span>join@bhagwatheritage.org</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-phone text-[var(--color-secondary)]" />
                <span>+91-866-889-7445</span>
              </li>
              <li className="flex items-center gap-3">
                <i className="fas fa-clock text-[var(--color-secondary)]" />
                <span>Mon-Sun: 09:00 AM - 08:00 PM</span>
              </li>
            </ul>

            <div className="mt-5 rounded-xl border border-[#e3edf8] bg-[#f8fbff] p-4">
              <h3 className="font-black text-[#123753]">Seva Office Hours</h3>
              <p className="text-sm text-[#4f6272] mt-1">Volunteer and donation support desk is available daily with dedicated coordinators.</p>
            </div>

            <div className="mt-4 rounded-xl border border-[#f1d8b9] bg-[#fff7ea] p-4">
              <h3 className="font-black text-[#7a4f1f]">Emergency Assistance</h3>
              <p className="text-sm text-[#7a5a3a] mt-1">For urgent seva coordination, please call our helpline for immediate response.</p>
            </div>
          </article>
        </div>
      </section>

      <PageSectionShell className="pb-12">
        <div className="max-w-5xl mx-auto">
          <FAQSection title="Contact FAQs" items={FAQS} />
        </div>
      </PageSectionShell>
    </div>
  );
});
