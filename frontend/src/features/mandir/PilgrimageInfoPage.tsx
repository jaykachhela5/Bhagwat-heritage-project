import { memo, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { usePageMeta } from "../../hooks/usePageMeta";

type IconName =
  | "temple"
  | "location"
  | "clock"
  | "festival"
  | "prasad"
  | "seva"
  | "online"
  | "rules"
  | "facilities"
  | "contact";

const sectionClass =
  "rounded-3xl border border-white/10 bg-[#0d6179] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:p-8";
const cardClass =
  "rounded-2xl border border-white/10 bg-[#156b86] p-5 shadow-[0_12px_24px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_32px_rgba(0,0,0,0.22)]";

function renderIcon(name: IconName) {
  const base = "h-5 w-5";

  switch (name) {
    case "temple":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 20h18" /><path d="M6 20V10l6-4 6 4v10" /><path d="M9 20v-5h6v5" /><path d="M12 6V3" /></svg>;
    case "location":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s6-5.2 6-11a6 6 0 1 0-12 0c0 5.8 6 11 6 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "clock":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8" /><path d="M12 8v4l3 2" /></svg>;
    case "festival":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" /><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" /></svg>;
    case "prasad":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 14h16" /><path d="M6 14a6 6 0 0 0 12 0" /><path d="M8 10c0-1.7 1.3-3 3-3" /><path d="M12 10c0-1.7 1.3-3 3-3" /></svg>;
    case "seva":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M8 12l4 3 4-3" /><path d="M6 10V8a2 2 0 0 1 2-2h1.5L12 8l2.5-2H16a2 2 0 0 1 2 2v2" /><path d="M5 12h14v4a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-4Z" /></svg>;
    case "online":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8" /><path d="M12 16v4" /><path d="m10 8 5 2.5-5 2.5V8Z" fill="currentColor" stroke="none" /></svg>;
    case "rules":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l7 3v5c0 4.2-2.6 7.7-7 10-4.4-2.3-7-5.8-7-10V6l7-3Z" /><path d="m9.5 11.5 1.7 1.7 3.3-3.7" /></svg>;
    case "facilities":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16V9a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7" /><path d="M3 16h18" /><path d="M6 16v3" /><path d="M18 16v3" /></svg>;
    case "contact":
      return <svg viewBox="0 0 24 24" fill="none" className={base} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M7 4h3l1.5 4-2 1.5a14.6 14.6 0 0 0 5 5l1.5-2L20 14v3a2 2 0 0 1-2.2 2A15.8 15.8 0 0 1 5 6.2 2 2 0 0 1 7 4Z" /></svg>;
  }
}

function IconBadge({ name }: { name: IconName }) {
  return (
    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-[#ef9a1e] shadow-[0_10px_24px_rgba(0,0,0,0.12)]">
      {renderIcon(name)}
    </span>
  );
}

function SectionHeader({ icon, eyebrow, title, description }: { icon: IconName; eyebrow: string; title: string; description?: string }) {
  return (
    <div className="mb-7 flex items-start gap-4 md:gap-5">
      <IconBadge name={icon} />
      <div>
        <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e] md:text-[24px]">{eyebrow}</p>
        <h2 className="mt-2 text-[16px] font-black text-white md:text-[22px]">{title}</h2>
        {description ? <p className="mt-3 max-w-3xl text-base leading-8 text-[#dce7ec] md:text-lg">{description}</p> : null}
      </div>
    </div>
  );
}

function InfoCard({ icon, title, children }: { icon: IconName; title: string; children: ReactNode }) {
  return (
    <div className={cardClass}>
      <div className="flex items-center gap-3">
        <IconBadge name={icon} />
        <h3 className="text-[24px] font-black uppercase tracking-[0.05em] text-[#ef9a1e]">{title}</h3>
      </div>
      <div className="mt-4 text-base leading-8 text-[#dce7ec] md:text-lg">{children}</div>
    </div>
  );
}

export default memo(function PilgrimageInfoPage() {
  usePageMeta(
    "Bhagwat Dham Chandrapur",
    "Pilgrimage information, darshan timings, seva support, travel guidance, and contact details for Bhagwat Dham Chandrapur.",
  );

  return (
    <div className="min-h-screen bg-[#082638]">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,226,167,0.62)_0%,rgba(255,245,224,0.25)_38%,rgba(255,255,255,0)_72%)]" />
        <div className="absolute left-[-60px] top-20 h-56 w-56 rounded-full bg-[#ffdca1]/35 blur-3xl" />
        <div className="absolute right-[-30px] top-12 h-64 w-64 rounded-full bg-white/55 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-8 md:pb-10 md:pt-10">
          <div className="relative overflow-hidden rounded-[36px] border border-[#eed3a6] bg-[#5a3311] shadow-[0_26px_70px_rgba(166,96,24,0.16)]">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url('https://res.cloudinary.com/der8zinu8/image/upload/v1774799816/pilgrim-information_p2qruf.jpg')" }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(59,33,14,0.82)_0%,rgba(118,71,22,0.56)_36%,rgba(255,243,220,0.12)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-44 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.68)_0%,rgba(255,248,230,0.18)_45%,rgba(255,248,230,0)_78%)]" />
            <div className="absolute bottom-0 left-8 right-8 h-28 rounded-t-[999px] border-t border-white/15 bg-[linear-gradient(180deg,rgba(255,255,255,0)_0%,rgba(255,255,255,0.14)_100%)]" />

            <div className="relative grid gap-8 px-6 py-10 md:px-10 md:py-14 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/45 px-4 py-2 text-sm font-semibold text-[#8a4a10] shadow-sm backdrop-blur-sm">
                  <IconBadge name="temple" />
                  <span className="-ml-1">Bhagwat Dham Pilgrimage</span>
                </div>
                <h1 className="mt-5 text-4xl font-black leading-tight text-white md:text-6xl">Bhagwat Dham Chandrapur</h1>
                <p className="mt-4 max-w-2xl text-2xl font-semibold leading-tight text-[#fff2db] md:text-[40px]">
                  A Divine Place of Darshan, Seva, and Spiritual Living
                </p>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-[#fff4e4] md:text-[22px]">
                  Plan a peaceful visit, receive darshan with devotion, and stay connected to satsang, seva, and spiritual discipline in a sacred mandir environment.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link to={ROUTES.contact} className="inline-flex items-center rounded-xl bg-[#c7771b] px-6 py-3 text-base font-semibold text-white shadow-[0_12px_28px_rgba(152,87,18,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b66d18]">
                    Plan Your Visit
                  </Link>
                  <Link to={ROUTES.contact} className="inline-flex items-center rounded-xl border border-white/15 bg-white/10 px-6 py-3 text-base font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/15">
                    Book Darshan
                  </Link>
                </div>
              </div>

              <div className="rounded-3xl border border-white/15 bg-[#0d6179]/85 p-6 shadow-[0_18px_44px_rgba(0,0,0,0.18)] backdrop-blur-md">
                <SectionHeader icon="clock" eyebrow="Temple Rhythm" title="Darshan Snapshot" />
                <div className="grid gap-3">
                  {[
                    { title: "Morning Darshan", text: "09:00 AM - 12:00 PM" },
                    { title: "Evening Darshan", text: "04:00 PM - 09:00 PM" },
                    { title: "Thursday Prasad", text: "11:00 AM" },
                  ].map((item) => (
                    <div key={item.title} className="rounded-2xl border border-white/10 bg-[#156b86] p-4 shadow-sm">
                      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ef9a1e]">{item.title}</p>
                      <p className="mt-2 text-[24px] font-black text-white md:text-[28px]">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 pb-10">
        <section className={sectionClass}>
          <SectionHeader
            icon="temple"
            eyebrow="About"
            title="A Sacred Destination for Devotion and Peace"
            description="Bhagwat Dham Chandrapur is a sacred spiritual destination dedicated to the teachings of Shree Swaminarayan Bhagwan. It serves as a center for devotion, satsang, and seva, offering a peaceful environment where devotees can experience divine connection, inner peace, and value-based spiritual living rooted in Sanatan Dharma."
          />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={sectionClass}>
            <SectionHeader icon="location" eyebrow="Location and Travel" title="Reach Bhagwat Dham with Clarity" />
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard icon="location" title="Location">Chandrapur, Maharashtra</InfoCard>
              <InfoCard icon="location" title="Nearest Railway Station">Chandrapur Railway Station</InfoCard>
              <InfoCard icon="location" title="Landmark">Kasturba Road, Chandrapur</InfoCard>
            </div>
          </div>
          <div className={sectionClass}>
            <SectionHeader icon="location" eyebrow="Map Placeholder" title="Temple Location Preview" />
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-white/10 bg-[#156b86] text-center">
              <div>
                <p className="text-[22px] font-semibold uppercase tracking-[0.18em] text-[#ef9a1e] md:text-[24px]">Map Preview</p>
                <p className="mt-2 text-[24px] font-black text-white md:text-[28px]">Bhagwat Dham Chandrapur</p>
                <p className="mt-2 text-base leading-8 text-[#dce7ec] md:text-lg">Kasturba Road, Chandrapur, Maharashtra</p>
              </div>
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <SectionHeader icon="clock" eyebrow="Darshan and Aarti" title="Timings for a Peaceful Visit" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {[
              { title: "Morning Darshan", text: "09:00 AM - 12:00 PM" },
              { title: "Evening Darshan", text: "04:00 PM - 09:00 PM" },
              { title: "Morning Aarti", text: "09:00 AM" },
              { title: "Evening Aarti", text: "07:00 PM" },
            ].map((item) => (
              <InfoCard key={item.title} icon="clock" title={item.title}>{item.text}</InfoCard>
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1fr_0.92fr]">
          <div className={sectionClass}>
            <SectionHeader icon="festival" eyebrow="Special Festivals" title="Celebrate Divine Moments" />
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard icon="festival" title="Janmashtami">Celebrate the divine birth of Bhagwan Krishna with devotion, darshan, bhajan, and festive mandir atmosphere.</InfoCard>
              <InfoCard icon="festival" title="Sanatan Dharma Utsav Celebrations">A sacred time for satsang, cultural devotion, seva, and spiritual participation for families and devotees.</InfoCard>
            </div>
          </div>
          <div className={sectionClass}>
            <SectionHeader icon="prasad" eyebrow="Annadan and Prasad" title="Thursday Prasad Seva" />
            <InfoCard icon="prasad" title="Prasad Distribution">Every Thursday at 11:00 AM, Prasad distribution is organized for all devotees as part of Annadan Seva.</InfoCard>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={sectionClass}>
            <SectionHeader icon="seva" eyebrow="Seva and Donations" title="Support Bhagwat Dham with Devotion" />
            <div className="grid gap-4 md:grid-cols-3">
              <InfoCard icon="seva" title="Annadan Seva">Support sacred food service for devotees through Annadan and prasad distribution.</InfoCard>
              <InfoCard icon="seva" title="Temple Seva">Contribute toward darshan readiness, mandir care, and devotional hospitality.</InfoCard>
              <InfoCard icon="seva" title="Donation Support">Help sustain activities, seva arrangements, and spiritual visitor support.</InfoCard>
            </div>
            <div className="mt-6">
              <Link to={ROUTES.donate} className="inline-flex items-center rounded-xl bg-[#c7771b] px-6 py-3 font-semibold text-white shadow-[0_12px_28px_rgba(152,87,18,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b66d18]">
                Donate Now
              </Link>
            </div>
          </div>

          <div className={sectionClass}>
            <SectionHeader icon="online" eyebrow="Online Features" title="Digital Convenience for Devotees" />
            <div className="grid gap-4">
              <InfoCard icon="online" title="Online Booking Available">Devotees can connect digitally for visit planning, darshan coordination, and temple support communication.</InfoCard>
              <div className={cardClass}>
                <div className="flex items-center gap-3">
                  <IconBadge name="online" />
                  <h3 className="text-[24px] font-black uppercase tracking-[0.05em] text-[#ef9a1e]">Live Darshan Available</h3>
                </div>
                <a
                  href="https://youtu.be/4x8P9owQTms"
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-4 block overflow-hidden rounded-[22px] border border-white/10"
                >
                  <div className="relative flex aspect-video items-center justify-center bg-[#0a2f45] transition-transform duration-300 group-hover:scale-[1.02]">
                    <img
                      src="https://res.cloudinary.com/der8zinu8/image/upload/v1774802023/swami_r7ypl0.jpg"
                      alt="Swami Live Darshan"
                      className="h-full w-full object-contain"
                    />
                  </div>
                </a>
                <div className="mt-4">
                  <a
                    href="https://youtu.be/4x8P9owQTms"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-xl bg-[#ef9a1e] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#de930a]"
                  >
                    Open Live Darshan
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className={sectionClass}>
            <SectionHeader icon="rules" eyebrow="Rules and Guidelines" title="Temple Discipline and Conduct" />
            <div className="space-y-3">
              <InfoCard icon="rules" title="Dress Code">Only Indian traditional attire in keeping with Sanatan culture.</InfoCard>
              <InfoCard icon="rules" title="Photography">Photography is allowed with respectful conduct inside the mandir environment.</InfoCard>
              <InfoCard icon="rules" title="Cleanliness and Discipline">Maintain cleanliness, silence where needed, and disciplined spiritual behavior.</InfoCard>
            </div>
          </div>
          <div className={sectionClass}>
            <SectionHeader icon="facilities" eyebrow="Facilities" title="Essential Support for Devotees" />
            <div className="grid gap-4 sm:grid-cols-2">
              {["Parking", "Drinking Water", "Washrooms", "Basic support services"].map((item) => (
                <InfoCard key={item} icon="facilities" title={item}>Available for devotee convenience during darshan and temple visits.</InfoCard>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className={sectionClass}>
            <SectionHeader icon="contact" eyebrow="Contact" title="Connect with Bhagwat Dham" />
            <div className="grid gap-4">
              <InfoCard icon="contact" title="Phone">+91 8668897445</InfoCard>
              <InfoCard icon="contact" title="Email">bhagwatheritage@gmail.com</InfoCard>
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#0d6179] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] md:p-8">
            <SectionHeader icon="temple" eyebrow="Footer Quote" title="A sacred journey towards devotion, discipline, and divine peace." />
            <p className="text-base leading-8 text-[#dce7ec] md:text-lg">
              Bhagwat Dham Chandrapur welcomes every devotee with reverence, spiritual warmth, and a peaceful path of darshan, seva, and satsang inspired by Shree Swaminarayan Bhagwan.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
});
