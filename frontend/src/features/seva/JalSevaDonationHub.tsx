import { memo, useEffect, useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../app/routes/routes";
import { useApi } from "../../hooks/useApi";
import { campaignsApi } from "../../services/api/campaigns";
import { volunteersApi } from "../../services/api/volunteers";
import {
  ANN_ADOPT_A_SEVA_OPTIONS,
  ANN_CTA_LINES,
  ANN_TESTIMONIALS,
  FALLBACK_CAMPAIGNS,
  JAL_ADOPT_A_SEVA_OPTIONS,
  JAL_CTA_LINES,
  JAL_TESTIMONIALS,
} from "./jalSevaContent";
import { JalSevaStoriesReports } from "./JalSevaStoriesReports";

type HubMode = "ann" | "jal";


function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function HeartIcon({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M12 21C12 21 5 16.36 5 10.8C5 8.149 7.149 6 9.8 6C11.07 6 12.289 6.504 13.2 7.402C14.111 6.504 15.33 6 16.6 6C19.251 6 21.4 8.149 21.4 10.8C21.4 16.36 14.4 21 14.4 21H12Z" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

interface JalSevaDonationHubProps {
  mode: HubMode;
}

export const JalSevaDonationHub = memo(function JalSevaDonationHub({
  mode,
}: JalSevaDonationHubProps) {
  const navigate = useNavigate();
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [volunteerLoading, setVolunteerLoading] = useState(false);
  const [volunteerNotice, setVolunteerNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const config = useMemo(
    () =>
      mode === "jal"
        ? {
            campaignCategory: "Jal Seva" as const,
            ctaLines: JAL_CTA_LINES,
            description: "",
            exitBody:
              "A small contribution can help provide safe drinking water, relief, and comfort where it is needed most.",
            exitTitle: "Offer a sip of relief",
            joinDescription:
              "If you want to begin water seva in your city or support relief coordination, the trust team can connect with you through this form.",
            joinTitle: "Start Jal Seva in Your City",
            popupKey: "jal-seva-exit-popup-seen",
            sponsorHeading: "High-Impact Jal Sponsorship",
            stickyLabel: "Donate for Jal Seva",
            stories: JAL_TESTIMONIALS,
            storiesTitle: "Jal Seva Stories & Inspiration",
            successText:
              "Your Jal Seva joining request has been received. The team will connect with you soon.",
            supportOptions: JAL_ADOPT_A_SEVA_OPTIONS,
            volunteerInterest: "Jal Seva" as const,
          }
        : {
            campaignCategory: "Annadaan" as const,
            ctaLines: ANN_CTA_LINES,
            description:
              "Ann Seva donors can sponsor meal-based support and continue to the main donation page for contribution.",
            exitBody:
              "Even a small donation can help meals reach a family, a worker, a pilgrim, or someone going through a difficult time.",
            exitTitle: "Offer a meal today",
            joinDescription:
              "If you want to organise meal support in your city or help with food distribution, this form connects you with the trust team.",
            joinTitle: "Start Ann Seva in Your City",
            popupKey: "ann-seva-exit-popup-seen",
            sponsorHeading: "High-Impact Ann Seva Sponsorship",
            stickyLabel: "Donate for Ann Seva",
            stories: ANN_TESTIMONIALS,
            storiesTitle: "Ann Seva Stories & Inspiration",
            successText:
              "Your Ann Seva joining request has been received. The team will connect with you soon.",
            supportOptions: ANN_ADOPT_A_SEVA_OPTIONS,
            volunteerInterest: "Annadaan" as const,
          },
    [mode],
  );
  const isAnn = mode === "ann";
  const joinHighlights = useMemo(
    () =>
      isAnn
        ? [
            {
              title: "Quick Contact",
              text: "Share your phone and email so the trust team can coordinate Ann Seva support without delay.",
            },
            {
              title: "City & Role",
              text: "Mention your location and whether you want to volunteer, organise, or lead meal seva locally.",
            },
            {
              title: "Skills & Availability",
              text: "Add your preferred days and useful support details like distribution, packing, or local coordination.",
            },
          ]
        : [
            {
              title: "Quick Contact",
              text: "Share your phone and email so the trust team can coordinate Jal Seva support without delay.",
            },
            {
              title: "City & Role",
              text: "Mention your location and whether you want to volunteer, organise, or lead relief support locally.",
            },
            {
              title: "Skills & Availability",
              text: "Add your preferred days and useful support details like field coordination, distribution, or logistics.",
            },
          ],
    [isAnn],
  );

  const [volunteerForm, setVolunteerForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    availability: "Weekends",
    interest: config.volunteerInterest as "Annadaan" | "Jal Seva" | "Both",
    organizerTrack: "Volunteer" as "Volunteer" | "Organizer" | "City Lead" | "Both",
    skills: "",
    message: "",
  });

  const { data: campaignData } = useApi(() => campaignsApi.getPublic());

  const campaigns = useMemo(() => {
    const source =
      campaignData && campaignData.length > 0 ? campaignData : FALLBACK_CAMPAIGNS;
    const filtered = source.filter((campaign) => campaign.category === config.campaignCategory);

    if (filtered.length > 0) {
      return filtered;
    }

    return FALLBACK_CAMPAIGNS.filter(
      (campaign) => campaign.category === config.campaignCategory,
    );
  }, [campaignData, config.campaignCategory]);

  useEffect(() => {
    setVolunteerForm((current) => ({
      ...current,
      interest: config.volunteerInterest,
    }));
  }, [config.volunteerInterest]);

  useEffect(() => {
    const handleMouseLeave = (event: MouseEvent) => {
      if (event.clientY > 0 || sessionStorage.getItem(config.popupKey)) {
        return;
      }

      sessionStorage.setItem(config.popupKey, "true");
      setShowExitPopup(true);
    };

    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [config.popupKey]);

  async function handleVolunteerSubmit(event: FormEvent) {
    event.preventDefault();
    setVolunteerLoading(true);
    setVolunteerNotice(null);

    try {
      await volunteersApi.create({
        availability: volunteerForm.availability,
        email: volunteerForm.email || undefined,
        fullName: volunteerForm.fullName,
        interest: volunteerForm.interest,
        location: volunteerForm.location,
        organizerTrack: volunteerForm.organizerTrack,
        phone: volunteerForm.phone,
        sevaArea: volunteerForm.interest,
        skills: volunteerForm.skills || undefined,
        message: volunteerForm.message || undefined,
      });

      setVolunteerNotice({
        type: "success",
        text: config.successText,
      });
      setVolunteerForm({
        fullName: "",
        email: "",
        phone: "",
        location: "",
        availability: "Weekends",
        interest: config.volunteerInterest,
        organizerTrack: "Volunteer",
        skills: "",
        message: "",
      });
    } catch {
      setVolunteerNotice({
        type: "error",
        text: "Form submit could not be completed. Please try again.",
      });
    } finally {
      setVolunteerLoading(false);
    }
  }

  function goToDonate() {
    navigate(ROUTES.donate);
  }

  return (
    <>
      <section className={`mx-auto mt-8 max-w-[1180px] rounded-[30px] px-6 py-10 md:px-8 md:py-8 ${isAnn ? "border border-white/10 bg-[var(--campaign-bg)] shadow-[0_16px_34px_rgba(0,0,0,0.22)]" : "border border-[#dceaf1] bg-[linear-gradient(180deg,#fafdff_0%,#eef8fd_100%)] shadow-[0_18px_40px_rgba(15,103,140,0.08)]"}`}>
        <div className="text-center">
          <p className={`text-[24px] font-semibold uppercase tracking-[0.18em] ${isAnn ? "text-[var(--campaign-accent)]" : "text-[#1b799d]"}`}>Adopt a Seva</p>
          <h2 className={`mt-2 text-[14px] font-black md:text-[20px] ${isAnn ? "text-white" : "text-[#0f678c]"}`}>{config.sponsorHeading}</h2>
          {config.description ? <p className={`mx-auto mt-4 max-w-3xl text-base leading-7 md:text-lg ${isAnn ? "text-[var(--campaign-text)]" : "text-[#586670]"}`}>{config.description}</p> : null}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          {config.supportOptions.map((option) => (
            <article key={option.title} className={`flex h-full flex-col rounded-[24px] p-5 ${isAnn ? "border border-white/10 bg-[var(--campaign-surface)] shadow-sm" : "border border-[#d9e8ef] bg-white shadow-[0_14px_30px_rgba(15,103,140,0.08)]"}`}>
              <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${isAnn ? "bg-[var(--campaign-accent)]/15 text-[var(--campaign-accent)]" : "bg-[#eef9ff] text-[#0f678c]"}`}>
                <HeartIcon className="h-8 w-8" />
              </div>
              <h3 className={`mt-4 text-2xl font-black ${isAnn ? "text-white" : "text-[#0f678c]"}`}>{option.title}</h3>
              <p className={`mt-2 text-2xl font-black ${isAnn ? "text-[var(--campaign-accent)]" : "text-[#1b799d]"}`}>{formatCurrency(option.amount)}</p>
              <p className={`mt-3 flex-1 text-base leading-7 md:text-lg ${isAnn ? "text-[var(--campaign-text)]" : "text-[#586670]"}`}>{option.impact}</p>
              <button type="button" onClick={goToDonate} className={`mt-6 inline-flex w-full items-center justify-center rounded-2xl px-5 py-3 text-base font-bold text-white transition md:text-lg ${isAnn ? "bg-[var(--campaign-accent)] hover:bg-[var(--campaign-accent-hover)]" : "bg-[#0f678c] hover:bg-[#0b5775]"}`}>
                Sponsor Now
              </button>
            </article>
          ))}
        </div>
      </section>

      {mode === "jal" ? (
        <section className="mx-auto mt-8 max-w-[1180px] rounded-[30px] border border-[#d9edf4] bg-[linear-gradient(180deg,#fafdff_0%,#eef9ff_100%)] px-6 py-10 shadow-[0_18px_40px_rgba(15,103,140,0.08)] md:px-8 md:py-8">
          <div className="flex flex-col gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
            <div>
              <p className="text-[24px] font-semibold uppercase tracking-[0.18em] text-[#1b799d]">Live Campaigns</p>
              <h2 className="mt-2 text-[14px] font-black text-[#0f678c] md:text-[20px]">{`${config.campaignCategory} Campaigns`}</h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {campaigns.map((campaign) => (
              <article key={campaign._id} className="flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d8e9ef] bg-white shadow-[0_18px_34px_rgba(15,103,140,0.08)]">
                <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `linear-gradient(135deg, rgba(9,43,61,0.35), rgba(217,119,6,0.18)), url('${campaign.coverImage || (campaign.category === "Annadaan" ? "/images/annseva.png" : "/images/jal1.png")}')` }} />
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] ${campaign.category === "Annadaan" ? "bg-[#fff1d6] text-[#a55f11]" : campaign.category === "Jal Seva" ? "bg-[#eef9ff] text-[#0f678c]" : "bg-[#f1ecff] text-[#6b4fb5]"}`}>
                      {campaign.category}
                    </span>
                    {campaign.location ? <span className="text-base font-semibold text-[#63737d] md:text-lg">{campaign.location}</span> : null}
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-[#0f678c]">{campaign.title}</h3>
                  <p className="mt-3 flex-1 text-base leading-7 text-[#586670] md:text-lg">{campaign.description}</p>

                  <button type="button" onClick={goToDonate} className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#d97706] px-5 py-3 text-base font-bold text-white transition hover:bg-[#ba6506] md:text-lg">
                    Donate Now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <JalSevaStoriesReports
        ctaLines={config.ctaLines}
        mode={mode}
        sectionTitle={config.storiesTitle}
        stories={config.stories}
      />

      <div className="fixed bottom-5 right-5 z-40">
        <button type="button" onClick={goToDonate} className="rounded-full bg-[linear-gradient(135deg,#ffb238_0%,#e0730b_100%)] px-6 py-3 text-sm font-black text-white shadow-[0_18px_34px_rgba(224,115,11,0.30)] transition hover:-translate-y-0.5">
          {config.stickyLabel}
        </button>
      </div>

      {showExitPopup ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#071e29]/65 p-4">
          <div className="w-full max-w-md rounded-[28px] border border-[#f2d4a7] bg-[linear-gradient(180deg,#fff9f0_0%,#ffffff_100%)] p-6 shadow-[0_30px_60px_rgba(7,30,41,0.25)]">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#b7771b]">Before You Go</p>
            <h3 className="mt-3 text-3xl font-black text-[#8e4a0b]">{config.exitTitle}</h3>
            <p className="mt-4 text-sm leading-7 text-[#5f625f]">{config.exitBody}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button type="button" onClick={() => { setShowExitPopup(false); goToDonate(); }} className="inline-flex flex-1 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#ffb238_0%,#e0730b_100%)] px-5 py-3 font-bold text-white">
                Go to Donate Page
              </button>
              <button type="button" onClick={() => setShowExitPopup(false)} className="inline-flex flex-1 items-center justify-center rounded-2xl border border-[#e8d4b5] px-5 py-3 font-bold text-[#0f678c]">
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
});
