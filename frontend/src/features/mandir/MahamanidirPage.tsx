import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useApi } from "../../hooks/useApi";
import { mandirApi } from "../../services/api/misc";

const HERO_IMAGES = [
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771999742/hanuman4_ee6niu.jpg",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771999752/hanuman3_wjp9pm.jpg",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771999936/hanuman5_yhct8y.jpg",
  "https://res.cloudinary.com/der8zinu8/image/upload/v1771999742/hanuman2_fg3j9y.jpg",
];

type SevaFeature = {
  title: string;
  desc: string;
  days: number[];
  start: string;
  end: string;
  place: string;
  volunteerSlots: number;
};

const HANUMAN_SEVA_FEATURES: SevaFeature[] = [
  {
    title: "Hanuman Chalisa Anushthan",
    desc: "Daily collective chanting with sankalp for health, focus, and family harmony.",
    days: [0, 1, 2, 3, 4, 5, 6],
    start: "06:15",
    end: "07:00",
    place: "Main Garbhagriha Hall",
    volunteerSlots: 8,
  },
  {
    title: "Sankat Mochan Path",
    desc: "Focused recitation for devotees seeking strength during difficult phases.",
    days: [2, 6],
    start: "19:00",
    end: "20:00",
    place: "Sabha Mandap",
    volunteerSlots: 12,
  },
  {
    title: "Mangalwar Maha Seva",
    desc: "Tuesday special puja with deep daan, tilak seva, and guided parikrama.",
    days: [2],
    start: "08:00",
    end: "10:00",
    place: "Hanuman Seva Kendra",
    volunteerSlots: 20,
  },
  {
    title: "Balaji Rudrabhishek",
    desc: "Vedic jal-abhishek and mantra seva for spiritual cleansing and peace.",
    days: [0, 4],
    start: "07:30",
    end: "09:00",
    place: "Abhishek Sthal",
    volunteerSlots: 10,
  },
  {
    title: "Sundarkand Path Sabha",
    desc: "Weekly Sundarkand recitation with bhajan and collective prarthana.",
    days: [6],
    start: "18:30",
    end: "20:00",
    place: "Sabha Mandap",
    volunteerSlots: 16,
  },
  {
    title: "Prasad Vitaran Seva",
    desc: "Distribution seva for visiting devotees after morning darshan.",
    days: [0, 1, 2, 3, 4, 5, 6],
    start: "09:30",
    end: "11:00",
    place: "Prasad Counter",
    volunteerSlots: 14,
  },
  {
    title: "Deep Daan Seva",
    desc: "Evening diya offering and temple lighting seva before aarti.",
    days: [0, 1, 2, 3, 4, 5, 6],
    start: "19:15",
    end: "19:45",
    place: "Aarti Chowk",
    volunteerSlots: 10,
  },
  {
    title: "Bhakt Sahayata Desk",
    desc: "Help-desk seva for darshan queue support, elderly guidance, and directions.",
    days: [0, 1, 2, 3, 4, 5, 6],
    start: "10:00",
    end: "13:00",
    place: "Entry Assistance Desk",
    volunteerSlots: 6,
  },
];

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function parseTimeToMinutes(time: string): number {
  const [hour, minute] = time.split(":").map(Number);
  return hour * 60 + minute;
}

function to12h(time: string): string {
  const [h, m] = time.split(":").map(Number);
  const suffix = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 || 12;
  return `${hour12}:${String(m).padStart(2, "0")} ${suffix}`;
}

function getSevaStatus(seva: SevaFeature, now: Date): {
  label: "Live Now" | "Upcoming";
  detail: string;
  toneClass: string;
} {
  const currentDay = now.getDay();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const startMinutes = parseTimeToMinutes(seva.start);
  const endMinutes = parseTimeToMinutes(seva.end);
  const isToday = seva.days.includes(currentDay);
  const isLive = isToday && currentMinutes >= startMinutes && currentMinutes < endMinutes;

  if (isLive) {
    return {
      label: "Live Now",
      detail: `Ends at ${to12h(seva.end)}`,
      toneClass: "bg-emerald-100 text-emerald-700 border-emerald-200",
    };
  }

  for (let offset = 0; offset < 7; offset += 1) {
    const day = (currentDay + offset) % 7;
    if (!seva.days.includes(day)) {
      continue;
    }

    if (offset === 0 && currentMinutes >= startMinutes) {
      continue;
    }

    const dayLabel = offset === 0 ? "Today" : DAY_NAMES[day];
    return {
      label: "Upcoming",
      detail: `${dayLabel}, ${to12h(seva.start)} - ${to12h(seva.end)}`,
      toneClass: "bg-amber-100 text-amber-700 border-amber-200",
    };
  }

  return {
    label: "Upcoming",
    detail: `${DAY_NAMES[seva.days[0]]}, ${to12h(seva.start)} - ${to12h(seva.end)}`,
    toneClass: "bg-amber-100 text-amber-700 border-amber-200",
  };
}

const HANUMAN_BLESSINGS = [
  "Removes fear and negativity through devotion.",
  "Builds discipline, confidence, and divine focus.",
  "Strengthens family harmony and spiritual values.",
  "Encourages seva, humility, and righteous living.",
];

const HANUMAN_UTSAV = [
  { name: "Hanuman Jayanti Mahotsav", time: "Annual Grand Celebration" },
  { name: "Sundarkand Path Sabha", time: "Every Saturday Evening" },
  { name: "Mangal Aarti Mahaseva", time: "Every Tuesday Morning" },
  { name: "Shri Ram Bhajan Sandhya", time: "Monthly Devotional Event" },
];

const MORNING_AARTI_TEXT = `Morning Aarti
Aarti Kije Hanuman Lala Ki,
Dusht Dalan Raghunath Kala Ki.
Bhakta Sankat Haran Mangalkari,
Jai Bajrang Bali Hitakari.`;

const EVENING_AARTI_TEXT = `Evening Aarti
Jai Jai Hanuman Gosai,
Kripa Karahu Gurudev Ki Nai.
Shri Ram Doot Kripa Nidhana,
Bhakta Hriday Baso Hanumana.`;

const HANUMAN_CHALISA_TEXT = `॥ हनुमान चालीसा ॥
दोहा

श्रीगुरु चरण सरोज रज, निज मन मुकुर सुधारि।
बरनऊँ रघुवर बिमल जसु, जो दायक फल चारि॥

बुद्धिहीन तनु जानिके, सुमिरौं पवन कुमार।
बल बुद्धि विद्या देहु मोहिं, हरहु कलेश विकार॥

जय हनुमान ज्ञान गुण सागर। जय कपीस तिहुँ लोक उजागर॥1॥
रामदूत अतुलित बल धामा। अंजनि पुत्र पवनसुत नामा॥2॥
महाबीर विक्रम बजरंगी। कुमति निवार सुमति के संगी॥3॥
कंचन वरन विराज सुबेसा। कानन कुण्डल कुंचित केसा॥4॥
हाथ वज्र औ ध्वजा विराजे। काँधे मूँज जनेऊ साजे॥5॥
शंकर सुवन केसरी नंदन। तेज प्रताप महा जग वंदन॥6॥
विद्यावान गुणी अति चातुर। राम काज करिबे को आतुर॥7॥
प्रभु चरित्र सुनिबे को रसिया। राम लखन सीता मन बसिया॥8॥
सूक्ष्म रूप धरि सियहिं दिखावा। विकट रूप धरि लंक जरावा॥9॥
भीम रूप धरि असुर संहारे। रामचंद्र के काज संवारे॥10॥
लाय सजीवन लखन जियाये। श्रीरघुवीर हरषि उर लाये॥11॥
रघुपति कीन्ही बहुत बड़ाई। तुम मम प्रिय भरतहि सम भाई॥12॥
सहस बदन तुम्हरो जस गावैं। अस कहि श्रीपति कंठ लगावैं॥13॥
सनकादिक ब्रह्मादि मुनीसा। नारद सारद सहित अहीसा॥14॥
यम कुबेर दिगपाल जहाँ ते। कवि कोविद कहि सके कहाँ ते॥15॥
तुम उपकार सुग्रीवहिं कीन्हा। राम मिलाय राज पद दीन्हा॥16॥
तुम्हरो मंत्र विभीषण माना। लंकेश्वर भए सब जग जाना॥17॥
युग सहस्र योजन पर भानू। लील्यो ताहि मधुर फल जानू॥18॥
प्रभु मुद्रिका मेलि मुख माहीं। जलधि लांघि गए अचरज नाहीं॥19॥
दुर्गम काज जगत के जेते। सुगम अनुग्रह तुम्हरे तेते॥20॥
राम दुआरे तुम रखवारे। होत न आज्ञा बिनु पैसारे॥21॥
सब सुख लहै तुम्हारी सरना। तुम रक्षक काहू को डरना॥22॥
आपन तेज सम्हारो आपै। तीनों लोक हाँक ते काँपै॥23॥
भूत पिशाच निकट नहिं आवै। महाबीर जब नाम सुनावै॥24॥
नासै रोग हरै सब पीरा। जपत निरंतर हनुमत बीरा॥25॥
संकट ते हनुमान छुड़ावै। मन क्रम वचन ध्यान जो लावै॥26॥
सब पर राम तपस्वी राजा। तिन के काज सकल तुम साजा॥27॥
और मनोरथ जो कोई लावै। सोइ अमित जीवन फल पावै॥28॥
चारों जुग परताप तुम्हारा। है प्रसिद्ध जगत उजियारा॥29॥
साधु संत के तुम रखवारे। असुर निकंदन राम दुलारे॥30॥
अष्ट सिद्धि नौ निधि के दाता। अस बर दीन जानकी माता॥31॥
राम रसायन तुम्हरे पासा। सदा रहो रघुपति के दासा॥32॥
तुम्हरे भजन राम को पावै। जनम जनम के दुख बिसरावै॥33॥
अंत काल रघुबर पुर जाई। जहाँ जन्म हरि भक्त कहाई॥34॥
और देवता चित्त न धरई। हनुमत सेइ सर्व सुख करई॥35॥
संकट कटै मिटै सब पीरा। जो सुमिरै हनुमत बलबीरा॥36॥
जय जय जय हनुमान गोसाईं। कृपा करहु गुरुदेव की नाईं॥37॥
जो सत बार पाठ कर कोई। छूटहि बंदि महा सुख होई॥38॥
जो यह पढ़ै हनुमान चालीसा। होय सिद्धि साखी गौरीसा॥39॥
तुलसीदास सदा हरि चेरा। कीजै नाथ हृदय महँ डेरा॥40॥

दोहा
पवन तनय संकट हरन, मंगल मूरति रूप।
राम लखन सीता सहित, हृदय बसहु सुर भूप॥`;

const HANUMAN_AARTI_TEXT = `॥ श्री हनुमान आरती ॥

आरती कीजै हनुमान लला की।
दुष्ट दलन रघुनाथ कला की॥

जाके बल से गिरिवर काँपे।
रोग दोष जाके निकट न झाँके॥

अंजनि पुत्र महाबलदायी।
संतन के प्रभु सदा सहायी॥

दे बीरा रघुनाथ पठाए।
लंका जारि सिया सुधि लाए॥

लंका सो कोट समुद्र सी खाई।
जात पवनसुत बार न लाई॥

लंका जारि असुर संहारे।
सियाराम जी के काज संवारे॥

लक्ष्मण मूर्छित पड़े सकारे।
आनि सजीवन प्राण उबारे॥

पैठि पाताल तोरि जमकारे।
अहिरावण की भुजा उखारे॥

बाएँ भुजा असुर दल मारे।
दाहिने भुजा संतजन तारे॥

सुर नर मुनि आरती उतारें।
जय जय जय हनुमान उचारें॥

कंचन थार कपूर लौ छाई।
आरती करत अंजना माई॥

जो हनुमान जी की आरती गावे।
बसि बैकुंठ परम पद पावे॥

लंका विध्वंस किए रघुराई।
तुलसीदास स्वामी कीर्ति गाई॥`;

export default memo(function MahamanidirPage() {
  const { data } = useApi(() => mandirApi.get());
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePrayer, setActivePrayer] = useState<"chalisa" | "aarti" | null>(null);
  const [now, setNow] = useState(() => new Date());
  const [showMorningAarti, setShowMorningAarti] = useState(false);
  const [showEveningAarti, setShowEveningAarti] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 3500);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const tick = window.setInterval(() => {
      setNow(new Date());
    }, 60000);
    return () => window.clearInterval(tick);
  }, []);

  return (
    <div className="bg-[#fce4ec]">
      {/* Hero — full-width banner with text on the left */}
      <section className="relative w-full overflow-hidden">
        <img
          src="/images/hanuman-banner-01.jpg"
          alt="Hanuman Murti — Jay Shree Maharudra Kashthbhanjan"
          className="w-full h-[55vh] md:h-[80vh] object-cover object-right"
        />
        {/* Text overlay on the left (pink cloud area) */}
        <div className="absolute inset-0 flex items-center">
          <div className="w-full md:w-1/2 px-6 md:px-12 lg:px-20">
            <p className="inline-flex rounded-full border border-[#c98e35]/60 bg-white/60 backdrop-blur-sm px-4 py-1 text-xs md:text-sm font-semibold text-[#7a4f1f] mb-4">
              Bhagwat Heritage Service Foundation Trust
            </p>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black leading-tight text-[#6a1b9a] drop-shadow-sm">
              Jay Shree Maharudra Kashthbhanjan Hanuman Darshan
            </h1>
            <p className="text-base md:text-xl text-[#7a3f00] font-semibold mt-3">
              Dham Chandrapur (Chichpalli), Maharashtra
            </p>
            <p className="text-sm md:text-base text-[#7a4f1f] mt-2 max-w-sm">
              Welcome to the divine abode of Hanuman Ji Maharaj. Experience devotion, strength, and spiritual peace.
            </p>
          </div>
        </div>
        {/* Bottom fade into page background */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fce4ec] to-transparent pointer-events-none" />
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="p-5 md:p-7">
          <h2 className="text-2xl md:text-3xl font-black text-[#6a1b9a] text-center mb-5">Hanuman Paath</h2>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <button
              type="button"
              onClick={() => setActivePrayer((prev) => (prev === "chalisa" ? null : "chalisa"))}
              className={`rounded-full px-5 py-2.5 font-semibold transition ${
                activePrayer === "chalisa"
                  ? "bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white"
                  : "bg-white text-[#6a1b9a] border border-[#e91e63]/40 hover:bg-[#fce4ec]"
              }`}
            >
              ॥ श्री हनुमान चालीसा ॥
            </button>
            <button
              type="button"
              onClick={() => setActivePrayer((prev) => (prev === "aarti" ? null : "aarti"))}
              className={`rounded-full px-5 py-2.5 font-semibold transition ${
                activePrayer === "aarti"
                  ? "bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white"
                  : "bg-white text-[#6a1b9a] border border-[#e91e63]/40 hover:bg-[#fce4ec]"
              }`}
            >
              ॥ श्री हनुमान आरती ॥
            </button>
          </div>

          {activePrayer && (
            <div className="rounded-2xl bg-white border border-[#efd8b4] p-4 md:p-5">
              <pre className="whitespace-pre-wrap font-sans text-[#503921] leading-8 text-sm md:text-base">
                {activePrayer === "chalisa" ? HANUMAN_CHALISA_TEXT : HANUMAN_AARTI_TEXT}
              </pre>
            </div>
          )}
        </div>
      </section>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f57c00] to-[#f9a825] h-1 rounded-full" />
      </div>

      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
            <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a]">{data?.title ?? "Kast Bhanjan Hanuman"}</h2>
            <p className="text-[#4d5d68] text-base md:text-lg leading-relaxed max-w-4xl mx-auto mt-3">
              {data?.about ??
                "Our 63-foot Hanuman idol is a symbol of devotion and strength. The temple serves as a spiritual center for thousands of devotees and is the home of regular pujas, bhajans, and seva programs."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-2xl border border-[#e91e63]/20 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#6a1b9a] text-lg mb-2">Morning Darshan</h3>
              <p className="text-[#4d5d68] mb-3">{data?.morningTime ?? "09:00 AM - 12:00 PM"}</p>
              <button
                type="button"
                onClick={() => setShowMorningAarti((prev) => !prev)}
                className="rounded-lg bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white text-sm font-semibold px-4 py-2 transition"
              >
                Morning Aarti
              </button>
              {showMorningAarti && (
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-[#d8e5f3] bg-[#f6fbff] p-3 text-sm text-[#20415f] leading-7 font-sans">
                  {MORNING_AARTI_TEXT}
                </pre>
              )}
            </article>

            <article className="rounded-2xl border border-[#f57c00]/30 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#f57c00] text-lg mb-2">Afternoon Vishram</h3>
              <p className="text-[#7b6244]">{data?.afternoonTime ?? "01:00 PM - 03:00 PM Vishram Time"}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                <span className="rounded-lg border border-[#efdcb9] bg-white px-2 py-1 text-[#8a6b41] text-center">Mandir Silence</span>
                <span className="rounded-lg border border-[#efdcb9] bg-white px-2 py-1 text-[#8a6b41] text-center">Maintenance</span>
                <span className="rounded-lg border border-[#efdcb9] bg-white px-2 py-1 text-[#8a6b41] text-center">Deep Sajja</span>
                <span className="rounded-lg border border-[#efdcb9] bg-white px-2 py-1 text-[#8a6b41] text-center">Prasad Prep</span>
              </div>
            </article>

            <article className="rounded-2xl border border-[#e91e63]/20 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#6a1b9a] text-lg mb-2">Evening Darshan</h3>
              <p className="text-[#4d5d68] mb-3">{data?.eveningTime ?? "04:00 PM - 09:00 PM"}</p>
              <button
                type="button"
                onClick={() => setShowEveningAarti((prev) => !prev)}
                className="rounded-lg bg-gradient-to-r from-[#f57c00] to-[#f9a825] text-white text-sm font-semibold px-4 py-2 transition"
              >
                Evening Aarti
              </button>
              {showEveningAarti && (
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-[#f0dcbf] bg-[#fff9ef] p-3 text-sm text-[#7a4f1f] leading-7 font-sans">
                  {EVENING_AARTI_TEXT}
                </pre>
              )}
            </article>
          </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f57c00] to-[#f9a825] h-1 rounded-full" />
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#e91e63] uppercase">Live Dashboard</p>
              <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a]">Hanuman Ji Seva Schedule</h2>
            </div>
            <p className="text-sm text-[#4d5d68]">
              Updated at{" "}
              <span className="font-semibold text-[#123753]">
                {now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {HANUMAN_SEVA_FEATURES.map((item) => {
              const status = getSevaStatus(item, now);
              return (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#e91e63]/20 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-[0_8px_24px_rgba(106,27,154,0.06)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg md:text-xl font-bold text-[#6a1b9a]">{item.title}</h3>
                    <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-bold ${status.toneClass}`}>
                      {status.label}
                    </span>
                  </div>
                  <p className="text-[#4d5d68] mt-2">{item.desc}</p>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                    <div className="rounded-lg bg-[#f7fbff] border border-[#e5eef7] px-3 py-2">
                      <p className="text-[#5a6c79]">Time</p>
                      <p className="font-semibold text-[#123753]">
                        {to12h(item.start)} - {to12h(item.end)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[#f7fbff] border border-[#e5eef7] px-3 py-2">
                      <p className="text-[#5a6c79]">Volunteer Slots</p>
                      <p className="font-semibold text-[#123753]">{item.volunteerSlots} active slots</p>
                    </div>
                    <div className="rounded-lg bg-[#f7fbff] border border-[#e5eef7] px-3 py-2 sm:col-span-2">
                      <p className="text-[#5a6c79]">Location</p>
                      <p className="font-semibold text-[#123753]">{item.place}</p>
                    </div>
                    <div className="rounded-lg bg-[#fff9ef] border border-[#f0e1c2] px-3 py-2 sm:col-span-2">
                      <p className="text-[#7a5a24]">Next Window</p>
                      <p className="font-semibold text-[#7a4f1f]">{status.detail}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row gap-2">
                    <Link
                      to="/get-involved"
                      className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] px-4 py-2 text-sm font-semibold text-white transition"
                    >
                      Join Seva
                    </Link>
                    <Link
                      to="/donate"
                      className="inline-flex items-center justify-center rounded-lg border border-[#f9a825] bg-[#fff8f0] px-4 py-2 text-sm font-semibold text-[#f57c00] hover:bg-[#fce4ec] transition"
                    >
                      Donate
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f57c00] to-[#f9a825] h-1 rounded-full" />
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black mb-5 text-center">Blessings of Hanuman Bhakti</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {HANUMAN_BLESSINGS.map((point) => (
              <div key={point} className="rounded-xl border border-white/25 bg-white/10 p-4">
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f57c00] to-[#f9a825] h-1 rounded-full" />
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a] text-center mb-6">Hanuman Utsav & Programs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {HANUMAN_UTSAV.map((item) => (
            <article key={item.name} className="rounded-2xl bg-gradient-to-b from-[#fce4ec] to-white border border-[#e91e63]/20 p-5 shadow-sm">
              <h3 className="text-lg md:text-xl font-bold text-[#6a1b9a]">{item.name}</h3>
              <p className="text-[#f57c00] font-semibold mt-2">{item.time}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-gradient-to-r from-[#e91e63] via-[#f57c00] to-[#f9a825] h-1 rounded-full" />
      </div>

      <section className="max-w-6xl mx-auto px-4 pb-12 text-center">
        <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a] mb-3">Daily Hanuman Sadhana</h2>
        <p className="text-[#6a1b9a]/80 max-w-3xl mx-auto">
          Begin with "Om Hanumate Namah", recite Hanuman Chalisa with devotion, and conclude with deep daan and seva sankalp.
          Consistent sadhana brings peace, protection, and divine energy in life.
        </p>
      </section>

      <div className="text-center pb-12 flex flex-wrap items-center justify-center gap-4">
        <Link to="/mandir/gallery" className="bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white rounded-lg px-6 py-3 font-semibold">View Gallery</Link>
        <Link to="/get-involved" className="bg-gradient-to-r from-[#f57c00] to-[#f9a825] text-white rounded-lg px-6 py-3 font-semibold">Plan a Visit</Link>
      </div>
    </div>
  );
});

