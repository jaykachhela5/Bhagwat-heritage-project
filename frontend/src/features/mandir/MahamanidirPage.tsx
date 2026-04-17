import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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

const HANUMAN_CHALISA_TEXT = `à¥¥ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤šà¤¾à¤²à¥€à¤¸à¤¾ à¥¥
à¤¦à¥‹à¤¹à¤¾

à¤¶à¥à¤°à¥€à¤—à¥à¤°à¥ à¤šà¤°à¤£ à¤¸à¤°à¥‹à¤œ à¤°à¤œ, à¤¨à¤¿à¤œ à¤®à¤¨ à¤®à¥à¤•à¥à¤° à¤¸à¥à¤§à¤¾à¤°à¤¿à¥¤
à¤¬à¤°à¤¨à¤Šà¤ à¤°à¤˜à¥à¤µà¤° à¤¬à¤¿à¤®à¤² à¤œà¤¸à¥, à¤œà¥‹ à¤¦à¤¾à¤¯à¤• à¤«à¤² à¤šà¤¾à¤°à¤¿à¥¥

à¤¬à¥à¤¦à¥à¤§à¤¿à¤¹à¥€à¤¨ à¤¤à¤¨à¥ à¤œà¤¾à¤¨à¤¿à¤•à¥‡, à¤¸à¥à¤®à¤¿à¤°à¥Œà¤‚ à¤ªà¤µà¤¨ à¤•à¥à¤®à¤¾à¤°à¥¤
à¤¬à¤² à¤¬à¥à¤¦à¥à¤§à¤¿ à¤µà¤¿à¤¦à¥à¤¯à¤¾ à¤¦à¥‡à¤¹à¥ à¤®à¥‹à¤¹à¤¿à¤‚, à¤¹à¤°à¤¹à¥ à¤•à¤²à¥‡à¤¶ à¤µà¤¿à¤•à¤¾à¤°à¥¥

à¤œà¤¯ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤œà¥à¤žà¤¾à¤¨ à¤—à¥à¤£ à¤¸à¤¾à¤—à¤°à¥¤ à¤œà¤¯ à¤•à¤ªà¥€à¤¸ à¤¤à¤¿à¤¹à¥à¤ à¤²à¥‹à¤• à¤‰à¤œà¤¾à¤—à¤°à¥¥1à¥¥
à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤…à¤¤à¥à¤²à¤¿à¤¤ à¤¬à¤² à¤§à¤¾à¤®à¤¾à¥¤ à¤…à¤‚à¤œà¤¨à¤¿ à¤ªà¥à¤¤à¥à¤° à¤ªà¤µà¤¨à¤¸à¥à¤¤ à¤¨à¤¾à¤®à¤¾à¥¥2à¥¥
à¤®à¤¹à¤¾à¤¬à¥€à¤° à¤µà¤¿à¤•à¥à¤°à¤® à¤¬à¤œà¤°à¤‚à¤—à¥€à¥¤ à¤•à¥à¤®à¤¤à¤¿ à¤¨à¤¿à¤µà¤¾à¤° à¤¸à¥à¤®à¤¤à¤¿ à¤•à¥‡ à¤¸à¤‚à¤—à¥€à¥¥3à¥¥
à¤•à¤‚à¤šà¤¨ à¤µà¤°à¤¨ à¤µà¤¿à¤°à¤¾à¤œ à¤¸à¥à¤¬à¥‡à¤¸à¤¾à¥¤ à¤•à¤¾à¤¨à¤¨ à¤•à¥à¤£à¥à¤¡à¤² à¤•à¥à¤‚à¤šà¤¿à¤¤ à¤•à¥‡à¤¸à¤¾à¥¥4à¥¥
à¤¹à¤¾à¤¥ à¤µà¤œà¥à¤° à¤” à¤§à¥à¤µà¤œà¤¾ à¤µà¤¿à¤°à¤¾à¤œà¥‡à¥¤ à¤•à¤¾à¤à¤§à¥‡ à¤®à¥‚à¤à¤œ à¤œà¤¨à¥‡à¤Š à¤¸à¤¾à¤œà¥‡à¥¥5à¥¥
à¤¶à¤‚à¤•à¤° à¤¸à¥à¤µà¤¨ à¤•à¥‡à¤¸à¤°à¥€ à¤¨à¤‚à¤¦à¤¨à¥¤ à¤¤à¥‡à¤œ à¤ªà¥à¤°à¤¤à¤¾à¤ª à¤®à¤¹à¤¾ à¤œà¤— à¤µà¤‚à¤¦à¤¨à¥¥6à¥¥
à¤µà¤¿à¤¦à¥à¤¯à¤¾à¤µà¤¾à¤¨ à¤—à¥à¤£à¥€ à¤…à¤¤à¤¿ à¤šà¤¾à¤¤à¥à¤°à¥¤ à¤°à¤¾à¤® à¤•à¤¾à¤œ à¤•à¤°à¤¿à¤¬à¥‡ à¤•à¥‹ à¤†à¤¤à¥à¤°à¥¥7à¥¥
à¤ªà¥à¤°à¤­à¥ à¤šà¤°à¤¿à¤¤à¥à¤° à¤¸à¥à¤¨à¤¿à¤¬à¥‡ à¤•à¥‹ à¤°à¤¸à¤¿à¤¯à¤¾à¥¤ à¤°à¤¾à¤® à¤²à¤–à¤¨ à¤¸à¥€à¤¤à¤¾ à¤®à¤¨ à¤¬à¤¸à¤¿à¤¯à¤¾à¥¥8à¥¥
à¤¸à¥‚à¤•à¥à¤·à¥à¤® à¤°à¥‚à¤ª à¤§à¤°à¤¿ à¤¸à¤¿à¤¯à¤¹à¤¿à¤‚ à¤¦à¤¿à¤–à¤¾à¤µà¤¾à¥¤ à¤µà¤¿à¤•à¤Ÿ à¤°à¥‚à¤ª à¤§à¤°à¤¿ à¤²à¤‚à¤• à¤œà¤°à¤¾à¤µà¤¾à¥¥9à¥¥
à¤­à¥€à¤® à¤°à¥‚à¤ª à¤§à¤°à¤¿ à¤…à¤¸à¥à¤° à¤¸à¤‚à¤¹à¤¾à¤°à¥‡à¥¤ à¤°à¤¾à¤®à¤šà¤‚à¤¦à¥à¤° à¤•à¥‡ à¤•à¤¾à¤œ à¤¸à¤‚à¤µà¤¾à¤°à¥‡à¥¥10à¥¥
à¤²à¤¾à¤¯ à¤¸à¤œà¥€à¤µà¤¨ à¤²à¤–à¤¨ à¤œà¤¿à¤¯à¤¾à¤¯à¥‡à¥¤ à¤¶à¥à¤°à¥€à¤°à¤˜à¥à¤µà¥€à¤° à¤¹à¤°à¤·à¤¿ à¤‰à¤° à¤²à¤¾à¤¯à¥‡à¥¥11à¥¥
à¤°à¤˜à¥à¤ªà¤¤à¤¿ à¤•à¥€à¤¨à¥à¤¹à¥€ à¤¬à¤¹à¥à¤¤ à¤¬à¤¡à¤¼à¤¾à¤ˆà¥¤ à¤¤à¥à¤® à¤®à¤® à¤ªà¥à¤°à¤¿à¤¯ à¤­à¤°à¤¤à¤¹à¤¿ à¤¸à¤® à¤­à¤¾à¤ˆà¥¥12à¥¥
à¤¸à¤¹à¤¸ à¤¬à¤¦à¤¨ à¤¤à¥à¤®à¥à¤¹à¤°à¥‹ à¤œà¤¸ à¤—à¤¾à¤µà¥ˆà¤‚à¥¤ à¤…à¤¸ à¤•à¤¹à¤¿ à¤¶à¥à¤°à¥€à¤ªà¤¤à¤¿ à¤•à¤‚à¤  à¤²à¤—à¤¾à¤µà¥ˆà¤‚à¥¥13à¥¥
à¤¸à¤¨à¤•à¤¾à¤¦à¤¿à¤• à¤¬à¥à¤°à¤¹à¥à¤®à¤¾à¤¦à¤¿ à¤®à¥à¤¨à¥€à¤¸à¤¾à¥¤ à¤¨à¤¾à¤°à¤¦ à¤¸à¤¾à¤°à¤¦ à¤¸à¤¹à¤¿à¤¤ à¤…à¤¹à¥€à¤¸à¤¾à¥¥14à¥¥
à¤¯à¤® à¤•à¥à¤¬à¥‡à¤° à¤¦à¤¿à¤—à¤ªà¤¾à¤² à¤œà¤¹à¤¾à¤ à¤¤à¥‡à¥¤ à¤•à¤µà¤¿ à¤•à¥‹à¤µà¤¿à¤¦ à¤•à¤¹à¤¿ à¤¸à¤•à¥‡ à¤•à¤¹à¤¾à¤ à¤¤à¥‡à¥¥15à¥¥
à¤¤à¥à¤® à¤‰à¤ªà¤•à¤¾à¤° à¤¸à¥à¤—à¥à¤°à¥€à¤µà¤¹à¤¿à¤‚ à¤•à¥€à¤¨à¥à¤¹à¤¾à¥¤ à¤°à¤¾à¤® à¤®à¤¿à¤²à¤¾à¤¯ à¤°à¤¾à¤œ à¤ªà¤¦ à¤¦à¥€à¤¨à¥à¤¹à¤¾à¥¥16à¥¥
à¤¤à¥à¤®à¥à¤¹à¤°à¥‹ à¤®à¤‚à¤¤à¥à¤° à¤µà¤¿à¤­à¥€à¤·à¤£ à¤®à¤¾à¤¨à¤¾à¥¤ à¤²à¤‚à¤•à¥‡à¤¶à¥à¤µà¤° à¤­à¤ à¤¸à¤¬ à¤œà¤— à¤œà¤¾à¤¨à¤¾à¥¥17à¥¥
à¤¯à¥à¤— à¤¸à¤¹à¤¸à¥à¤° à¤¯à¥‹à¤œà¤¨ à¤ªà¤° à¤­à¤¾à¤¨à¥‚à¥¤ à¤²à¥€à¤²à¥à¤¯à¥‹ à¤¤à¤¾à¤¹à¤¿ à¤®à¤§à¥à¤° à¤«à¤² à¤œà¤¾à¤¨à¥‚à¥¥18à¥¥
à¤ªà¥à¤°à¤­à¥ à¤®à¥à¤¦à¥à¤°à¤¿à¤•à¤¾ à¤®à¥‡à¤²à¤¿ à¤®à¥à¤– à¤®à¤¾à¤¹à¥€à¤‚à¥¤ à¤œà¤²à¤§à¤¿ à¤²à¤¾à¤‚à¤˜à¤¿ à¤—à¤ à¤…à¤šà¤°à¤œ à¤¨à¤¾à¤¹à¥€à¤‚à¥¥19à¥¥
à¤¦à¥à¤°à¥à¤—à¤® à¤•à¤¾à¤œ à¤œà¤—à¤¤ à¤•à¥‡ à¤œà¥‡à¤¤à¥‡à¥¤ à¤¸à¥à¤—à¤® à¤…à¤¨à¥à¤—à¥à¤°à¤¹ à¤¤à¥à¤®à¥à¤¹à¤°à¥‡ à¤¤à¥‡à¤¤à¥‡à¥¥20à¥¥
à¤°à¤¾à¤® à¤¦à¥à¤†à¤°à¥‡ à¤¤à¥à¤® à¤°à¤–à¤µà¤¾à¤°à¥‡à¥¤ à¤¹à¥‹à¤¤ à¤¨ à¤†à¤œà¥à¤žà¤¾ à¤¬à¤¿à¤¨à¥ à¤ªà¥ˆà¤¸à¤¾à¤°à¥‡à¥¥21à¥¥
à¤¸à¤¬ à¤¸à¥à¤– à¤²à¤¹à¥ˆ à¤¤à¥à¤®à¥à¤¹à¤¾à¤°à¥€ à¤¸à¤°à¤¨à¤¾à¥¤ à¤¤à¥à¤® à¤°à¤•à¥à¤·à¤• à¤•à¤¾à¤¹à¥‚ à¤•à¥‹ à¤¡à¤°à¤¨à¤¾à¥¥22à¥¥
à¤†à¤ªà¤¨ à¤¤à¥‡à¤œ à¤¸à¤®à¥à¤¹à¤¾à¤°à¥‹ à¤†à¤ªà¥ˆà¥¤ à¤¤à¥€à¤¨à¥‹à¤‚ à¤²à¥‹à¤• à¤¹à¤¾à¤à¤• à¤¤à¥‡ à¤•à¤¾à¤à¤ªà¥ˆà¥¥23à¥¥
à¤­à¥‚à¤¤ à¤ªà¤¿à¤¶à¤¾à¤š à¤¨à¤¿à¤•à¤Ÿ à¤¨à¤¹à¤¿à¤‚ à¤†à¤µà¥ˆà¥¤ à¤®à¤¹à¤¾à¤¬à¥€à¤° à¤œà¤¬ à¤¨à¤¾à¤® à¤¸à¥à¤¨à¤¾à¤µà¥ˆà¥¥24à¥¥
à¤¨à¤¾à¤¸à¥ˆ à¤°à¥‹à¤— à¤¹à¤°à¥ˆ à¤¸à¤¬ à¤ªà¥€à¤°à¤¾à¥¤ à¤œà¤ªà¤¤ à¤¨à¤¿à¤°à¤‚à¤¤à¤° à¤¹à¤¨à¥à¤®à¤¤ à¤¬à¥€à¤°à¤¾à¥¥25à¥¥
à¤¸à¤‚à¤•à¤Ÿ à¤¤à¥‡ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤›à¥à¤¡à¤¼à¤¾à¤µà¥ˆà¥¤ à¤®à¤¨ à¤•à¥à¤°à¤® à¤µà¤šà¤¨ à¤§à¥à¤¯à¤¾à¤¨ à¤œà¥‹ à¤²à¤¾à¤µà¥ˆà¥¥26à¥¥
à¤¸à¤¬ à¤ªà¤° à¤°à¤¾à¤® à¤¤à¤ªà¤¸à¥à¤µà¥€ à¤°à¤¾à¤œà¤¾à¥¤ à¤¤à¤¿à¤¨ à¤•à¥‡ à¤•à¤¾à¤œ à¤¸à¤•à¤² à¤¤à¥à¤® à¤¸à¤¾à¤œà¤¾à¥¥27à¥¥
à¤”à¤° à¤®à¤¨à¥‹à¤°à¤¥ à¤œà¥‹ à¤•à¥‹à¤ˆ à¤²à¤¾à¤µà¥ˆà¥¤ à¤¸à¥‹à¤‡ à¤…à¤®à¤¿à¤¤ à¤œà¥€à¤µà¤¨ à¤«à¤² à¤ªà¤¾à¤µà¥ˆà¥¥28à¥¥
à¤šà¤¾à¤°à¥‹à¤‚ à¤œà¥à¤— à¤ªà¤°à¤¤à¤¾à¤ª à¤¤à¥à¤®à¥à¤¹à¤¾à¤°à¤¾à¥¤ à¤¹à¥ˆ à¤ªà¥à¤°à¤¸à¤¿à¤¦à¥à¤§ à¤œà¤—à¤¤ à¤‰à¤œà¤¿à¤¯à¤¾à¤°à¤¾à¥¥29à¥¥
à¤¸à¤¾à¤§à¥ à¤¸à¤‚à¤¤ à¤•à¥‡ à¤¤à¥à¤® à¤°à¤–à¤µà¤¾à¤°à¥‡à¥¤ à¤…à¤¸à¥à¤° à¤¨à¤¿à¤•à¤‚à¤¦à¤¨ à¤°à¤¾à¤® à¤¦à¥à¤²à¤¾à¤°à¥‡à¥¥30à¥¥
à¤…à¤·à¥à¤Ÿ à¤¸à¤¿à¤¦à¥à¤§à¤¿ à¤¨à¥Œ à¤¨à¤¿à¤§à¤¿ à¤•à¥‡ à¤¦à¤¾à¤¤à¤¾à¥¤ à¤…à¤¸ à¤¬à¤° à¤¦à¥€à¤¨ à¤œà¤¾à¤¨à¤•à¥€ à¤®à¤¾à¤¤à¤¾à¥¥31à¥¥
à¤°à¤¾à¤® à¤°à¤¸à¤¾à¤¯à¤¨ à¤¤à¥à¤®à¥à¤¹à¤°à¥‡ à¤ªà¤¾à¤¸à¤¾à¥¤ à¤¸à¤¦à¤¾ à¤°à¤¹à¥‹ à¤°à¤˜à¥à¤ªà¤¤à¤¿ à¤•à¥‡ à¤¦à¤¾à¤¸à¤¾à¥¥32à¥¥
à¤¤à¥à¤®à¥à¤¹à¤°à¥‡ à¤­à¤œà¤¨ à¤°à¤¾à¤® à¤•à¥‹ à¤ªà¤¾à¤µà¥ˆà¥¤ à¤œà¤¨à¤® à¤œà¤¨à¤® à¤•à¥‡ à¤¦à¥à¤– à¤¬à¤¿à¤¸à¤°à¤¾à¤µà¥ˆà¥¥33à¥¥
à¤…à¤‚à¤¤ à¤•à¤¾à¤² à¤°à¤˜à¥à¤¬à¤° à¤ªà¥à¤° à¤œà¤¾à¤ˆà¥¤ à¤œà¤¹à¤¾à¤ à¤œà¤¨à¥à¤® à¤¹à¤°à¤¿ à¤­à¤•à¥à¤¤ à¤•à¤¹à¤¾à¤ˆà¥¥34à¥¥
à¤”à¤° à¤¦à¥‡à¤µà¤¤à¤¾ à¤šà¤¿à¤¤à¥à¤¤ à¤¨ à¤§à¤°à¤ˆà¥¤ à¤¹à¤¨à¥à¤®à¤¤ à¤¸à¥‡à¤‡ à¤¸à¤°à¥à¤µ à¤¸à¥à¤– à¤•à¤°à¤ˆà¥¥35à¥¥
à¤¸à¤‚à¤•à¤Ÿ à¤•à¤Ÿà¥ˆ à¤®à¤¿à¤Ÿà¥ˆ à¤¸à¤¬ à¤ªà¥€à¤°à¤¾à¥¤ à¤œà¥‹ à¤¸à¥à¤®à¤¿à¤°à¥ˆ à¤¹à¤¨à¥à¤®à¤¤ à¤¬à¤²à¤¬à¥€à¤°à¤¾à¥¥36à¥¥
à¤œà¤¯ à¤œà¤¯ à¤œà¤¯ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤—à¥‹à¤¸à¤¾à¤ˆà¤‚à¥¤ à¤•à¥ƒà¤ªà¤¾ à¤•à¤°à¤¹à¥ à¤—à¥à¤°à¥à¤¦à¥‡à¤µ à¤•à¥€ à¤¨à¤¾à¤ˆà¤‚à¥¥37à¥¥
à¤œà¥‹ à¤¸à¤¤ à¤¬à¤¾à¤° à¤ªà¤¾à¤  à¤•à¤° à¤•à¥‹à¤ˆà¥¤ à¤›à¥‚à¤Ÿà¤¹à¤¿ à¤¬à¤‚à¤¦à¤¿ à¤®à¤¹à¤¾ à¤¸à¥à¤– à¤¹à¥‹à¤ˆà¥¥38à¥¥
à¤œà¥‹ à¤¯à¤¹ à¤ªà¤¢à¤¼à¥ˆ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤šà¤¾à¤²à¥€à¤¸à¤¾à¥¤ à¤¹à¥‹à¤¯ à¤¸à¤¿à¤¦à¥à¤§à¤¿ à¤¸à¤¾à¤–à¥€ à¤—à¥Œà¤°à¥€à¤¸à¤¾à¥¥39à¥¥
à¤¤à¥à¤²à¤¸à¥€à¤¦à¤¾à¤¸ à¤¸à¤¦à¤¾ à¤¹à¤°à¤¿ à¤šà¥‡à¤°à¤¾à¥¤ à¤•à¥€à¤œà¥ˆ à¤¨à¤¾à¤¥ à¤¹à¥ƒà¤¦à¤¯ à¤®à¤¹à¤ à¤¡à¥‡à¤°à¤¾à¥¥40à¥¥

à¤¦à¥‹à¤¹à¤¾
à¤ªà¤µà¤¨ à¤¤à¤¨à¤¯ à¤¸à¤‚à¤•à¤Ÿ à¤¹à¤°à¤¨, à¤®à¤‚à¤—à¤² à¤®à¥‚à¤°à¤¤à¤¿ à¤°à¥‚à¤ªà¥¤
à¤°à¤¾à¤® à¤²à¤–à¤¨ à¤¸à¥€à¤¤à¤¾ à¤¸à¤¹à¤¿à¤¤, à¤¹à¥ƒà¤¦à¤¯ à¤¬à¤¸à¤¹à¥ à¤¸à¥à¤° à¤­à¥‚à¤ªà¥¥`;

const HANUMAN_AARTI_TEXT = `à¥¥ à¤¶à¥à¤°à¥€ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤†à¤°à¤¤à¥€ à¥¥

à¤†à¤°à¤¤à¥€ à¤•à¥€à¤œà¥ˆ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤²à¤²à¤¾ à¤•à¥€à¥¤
à¤¦à¥à¤·à¥à¤Ÿ à¤¦à¤²à¤¨ à¤°à¤˜à¥à¤¨à¤¾à¤¥ à¤•à¤²à¤¾ à¤•à¥€à¥¥

à¤œà¤¾à¤•à¥‡ à¤¬à¤² à¤¸à¥‡ à¤—à¤¿à¤°à¤¿à¤µà¤° à¤•à¤¾à¤à¤ªà¥‡à¥¤
à¤°à¥‹à¤— à¤¦à¥‹à¤· à¤œà¤¾à¤•à¥‡ à¤¨à¤¿à¤•à¤Ÿ à¤¨ à¤à¤¾à¤à¤•à¥‡à¥¥

à¤…à¤‚à¤œà¤¨à¤¿ à¤ªà¥à¤¤à¥à¤° à¤®à¤¹à¤¾à¤¬à¤²à¤¦à¤¾à¤¯à¥€à¥¤
à¤¸à¤‚à¤¤à¤¨ à¤•à¥‡ à¤ªà¥à¤°à¤­à¥ à¤¸à¤¦à¤¾ à¤¸à¤¹à¤¾à¤¯à¥€à¥¥

à¤¦à¥‡ à¤¬à¥€à¤°à¤¾ à¤°à¤˜à¥à¤¨à¤¾à¤¥ à¤ªà¤ à¤¾à¤à¥¤
à¤²à¤‚à¤•à¤¾ à¤œà¤¾à¤°à¤¿ à¤¸à¤¿à¤¯à¤¾ à¤¸à¥à¤§à¤¿ à¤²à¤¾à¤à¥¥

à¤²à¤‚à¤•à¤¾ à¤¸à¥‹ à¤•à¥‹à¤Ÿ à¤¸à¤®à¥à¤¦à¥à¤° à¤¸à¥€ à¤–à¤¾à¤ˆà¥¤
à¤œà¤¾à¤¤ à¤ªà¤µà¤¨à¤¸à¥à¤¤ à¤¬à¤¾à¤° à¤¨ à¤²à¤¾à¤ˆà¥¥

à¤²à¤‚à¤•à¤¾ à¤œà¤¾à¤°à¤¿ à¤…à¤¸à¥à¤° à¤¸à¤‚à¤¹à¤¾à¤°à¥‡à¥¤
à¤¸à¤¿à¤¯à¤¾à¤°à¤¾à¤® à¤œà¥€ à¤•à¥‡ à¤•à¤¾à¤œ à¤¸à¤‚à¤µà¤¾à¤°à¥‡à¥¥

à¤²à¤•à¥à¤·à¥à¤®à¤£ à¤®à¥‚à¤°à¥à¤›à¤¿à¤¤ à¤ªà¤¡à¤¼à¥‡ à¤¸à¤•à¤¾à¤°à¥‡à¥¤
à¤†à¤¨à¤¿ à¤¸à¤œà¥€à¤µà¤¨ à¤ªà¥à¤°à¤¾à¤£ à¤‰à¤¬à¤¾à¤°à¥‡à¥¥

à¤ªà¥ˆà¤ à¤¿ à¤ªà¤¾à¤¤à¤¾à¤² à¤¤à¥‹à¤°à¤¿ à¤œà¤®à¤•à¤¾à¤°à¥‡à¥¤
à¤…à¤¹à¤¿à¤°à¤¾à¤µà¤£ à¤•à¥€ à¤­à¥à¤œà¤¾ à¤‰à¤–à¤¾à¤°à¥‡à¥¥

à¤¬à¤¾à¤à¤ à¤­à¥à¤œà¤¾ à¤…à¤¸à¥à¤° à¤¦à¤² à¤®à¤¾à¤°à¥‡à¥¤
à¤¦à¤¾à¤¹à¤¿à¤¨à¥‡ à¤­à¥à¤œà¤¾ à¤¸à¤‚à¤¤à¤œà¤¨ à¤¤à¤¾à¤°à¥‡à¥¥

à¤¸à¥à¤° à¤¨à¤° à¤®à¥à¤¨à¤¿ à¤†à¤°à¤¤à¥€ à¤‰à¤¤à¤¾à¤°à¥‡à¤‚à¥¤
à¤œà¤¯ à¤œà¤¯ à¤œà¤¯ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤‰à¤šà¤¾à¤°à¥‡à¤‚à¥¥

à¤•à¤‚à¤šà¤¨ à¤¥à¤¾à¤° à¤•à¤ªà¥‚à¤° à¤²à¥Œ à¤›à¤¾à¤ˆà¥¤
à¤†à¤°à¤¤à¥€ à¤•à¤°à¤¤ à¤…à¤‚à¤œà¤¨à¤¾ à¤®à¤¾à¤ˆà¥¥

à¤œà¥‹ à¤¹à¤¨à¥à¤®à¤¾à¤¨ à¤œà¥€ à¤•à¥€ à¤†à¤°à¤¤à¥€ à¤—à¤¾à¤µà¥‡à¥¤
à¤¬à¤¸à¤¿ à¤¬à¥ˆà¤•à¥à¤‚à¤  à¤ªà¤°à¤® à¤ªà¤¦ à¤ªà¤¾à¤µà¥‡à¥¥

à¤²à¤‚à¤•à¤¾ à¤µà¤¿à¤§à¥à¤µà¤‚à¤¸ à¤•à¤¿à¤ à¤°à¤˜à¥à¤°à¤¾à¤ˆà¥¤
à¤¤à¥à¤²à¤¸à¥€à¤¦à¤¾à¤¸ à¤¸à¥à¤µà¤¾à¤®à¥€ à¤•à¥€à¤°à¥à¤¤à¤¿ à¤—à¤¾à¤ˆà¥¥`;

const JAY_KAPI_TEXT = `à¥¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾ à¥¥

à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾,
à¤¸à¥à¤° à¤¨à¤° à¤®à¥à¤¨à¤¿à¤œà¤¨ à¤µà¤‚à¤¦à¤¿à¤¤,
à¤¸à¥à¤° à¤¨à¤° à¤®à¥à¤¨à¤¿à¤œà¤¨ à¤µà¤‚à¤¦à¤¿à¤¤,
à¤ªà¤¦à¤°à¤œ à¤¹à¤¨à¥à¤®à¤‚à¤¤à¤¾,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤

à¤ªà¥à¤°à¥Œà¤¢à¤¼ à¤ªà¥à¤°à¤¤à¤¾à¤ª à¤ªà¤µà¤¨à¤¸à¥à¤¤,
à¤¤à¥à¤°à¤¿à¤­à¥à¤µà¤¨ à¤œà¤¯à¤•à¤¾à¤°à¥€,
à¤ªà¥à¤°à¤­à¥ à¤¤à¥à¤°à¤¿à¤­à¥à¤µà¤¨ à¤œà¤¯à¤•à¤¾à¤°à¥€,
à¤…à¤¸à¥à¤° à¤°à¤¿à¤ªà¥ à¤®à¤¦ à¤—à¤‚à¤œà¤¨,
à¤…à¤¸à¥à¤° à¤°à¤¿à¤ªà¥ à¤®à¤¦ à¤—à¤‚à¤œà¤¨,
à¤­à¤¯ à¤¸à¤‚à¤•à¤Ÿ à¤¹à¤¾à¤°à¥€,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤

à¤­à¥‚à¤¤ à¤ªà¤¿à¤¶à¤¾à¤š à¤µà¤¿à¤•à¤Ÿ à¤—à¥à¤°à¤¹,
à¤ªà¥€à¤¡à¤¼à¤¤ à¤¨à¤¹à¥€ à¤œà¤®à¥à¤ªà¥‡,
à¤ªà¥à¤°à¤­à¥ à¤ªà¥€à¤¡à¤¼à¤¤ à¤¨à¤¹à¥€ à¤œà¤®à¥à¤ªà¥‡,
à¤¹à¤¨à¥à¤®à¤‚à¤¤ à¤¹à¤¾à¤• à¤¸à¥à¤¨à¥€à¤¨à¥‡,
à¤¹à¤¨à¥à¤®à¤‚à¤¤ à¤¹à¤¾à¤• à¤¸à¥à¤¨à¥€à¤¨à¥‡,
à¤¥à¤° à¤¥à¤° à¤¥à¤° à¤•à¤‚à¤ªà¥‡,
à¤ªà¥à¤°à¤­à¥ à¤¥à¤° à¤¥à¤° à¤¥à¤° à¤•à¤‚à¤ªà¥‡,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤

à¤°à¤˜à¥à¤µà¥€à¤° à¤¸à¤¹à¤¾à¤¯ à¤“à¤¢à¤‚à¤—à¥à¤¯à¥‹,
à¤¸à¤¾à¤—à¤° à¤†à¤¤à¥€ à¤­à¤¾à¤°à¥€,
à¤ªà¥à¤°à¤­à¥ à¤¸à¤¾à¤—à¤° à¤†à¤¤à¥€ à¤­à¤¾à¤°à¥€,
à¤¸à¥€à¤¤à¤¾ à¤¸à¥‹à¤§ à¤²à¥‡ à¤†à¤,
à¤¸à¥€à¤¤à¤¾ à¤¸à¥‹à¤§ à¤²à¥‡ à¤†à¤,
à¤•à¤ªà¤¿ à¤²à¤‚à¤•à¤¾ à¤œà¤¾à¤°à¥€,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤

à¤°à¤¾à¤® à¤šà¤°à¤£ à¤°à¤¤à¤¿à¤¦à¤¾à¤¯à¤•,
à¤¶à¤°à¤£à¤¾à¤—à¤¤ à¤¤à¥à¤°à¤¾à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤¶à¤°à¤£à¤¾à¤—à¤¤ à¤¤à¥à¤°à¤¾à¤¤à¤¾,
à¤ªà¥à¤°à¥‡à¤®à¤¾à¤¨à¤‚à¤¦ à¤•à¤¹à¥‡ à¤¹à¤¨à¥à¤®à¤¤,
à¤ªà¥à¤°à¥‡à¤®à¤¾à¤¨à¤‚à¤¦ à¤•à¤¹à¥‡ à¤¹à¤¨à¥à¤®à¤‚à¤¤,
à¤µà¤¾à¤‚à¤›à¤¿à¤¤ à¤«à¤² à¤¦à¤¾à¤¤à¤¾,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤

à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤¸à¥à¤° à¤¨à¤° à¤®à¥à¤¨à¤¿à¤œà¤¨ à¤µà¤‚à¤¦à¤¿à¤¤,
à¤¸à¥à¤° à¤¨à¤° à¤®à¥à¤¨à¤¿à¤œà¤¨ à¤µà¤‚à¤¦à¤¿à¤¤,
à¤ªà¤¦à¤°à¤œ à¤¹à¤¨à¥à¤®à¤‚à¤¤à¤¾,
à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤³à¤µà¤‚à¤¤à¤¾,
à¤ªà¥à¤°à¤­à¥ à¤œà¤¯ à¤•à¤ªà¤¿ à¤¬à¤²à¤µà¤‚à¤¤à¤¾à¥¤à¥¤`;

const NITI_STOTRAM_TEXT = `à¥¥ à¤¨à¥€à¤¤à¤¿ à¤ªà¥à¤°à¤µà¥€à¤£ à¤¸à¥à¤¤à¥‹à¤¤à¥à¤°à¤® à¥¥

à¥§.
à¤¨à¥€à¤¤à¤¿à¤ªà¥à¤°à¤µà¥€à¤£ à¤¨à¤¿à¤—à¤®à¤¾à¤—à¤®à¤¶à¤¾à¤¸à¥à¤¤à¥à¤°à¤¬à¥à¤¦à¥à¤§à¥‡ à¤°à¤¾à¤œà¤¾à¤§à¤¿à¤°à¤¾à¤œ à¤°à¤˜à¥à¤•à¥à¤‚à¤œà¤µà¤°à¤¾à¤§à¤¿à¤°à¤¾à¤œ!
à¤¸à¤¿à¤‚à¤¦à¥‚à¤°à¤šà¤°à¥à¤šà¤¿à¤¤à¤•à¤²à¥‡à¤µà¤° à¤•à¥‡à¤‚à¤¦à¥à¤° à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥
à¤¸à¥€à¤¤à¤¾ à¤¨à¤¿à¤®à¤¿à¤¤à¥à¤¤ à¤°à¤˜à¥à¤¤à¥à¤¤à¤® à¤­à¥‚à¤°à¤¿à¤•à¤·à¥à¤Ÿ-à¤ªà¥à¤°à¥‹à¤¤à¥à¤¸à¤¾à¤°à¤£à¥ˆà¤• à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤¨à¤¿à¤°à¥à¤¦à¤¯à¤¾à¤¤ à¤ªà¤¤à¤¿ à¤°à¤¾à¤§à¤¨à¥‡à¥¥
à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥¨.
à¤¦à¥à¤°à¥à¤µà¤¾à¤°à¥à¤¯à¤°à¤¾à¤µà¤£à¤µà¤¿à¤¸à¤°à¥à¤œà¤¿à¤¤à¤¶à¤•à¥à¤¤à¤¿à¤˜à¤¾à¤¤-à¤•à¤‚à¤ à¤¾à¤²à¤•à¥à¤·à¥à¤®à¤£à¤¸à¥à¤–à¤¾à¤¤à¤œà¥€à¤µà¤µà¤²à¥à¤²!
à¤¦à¥à¤°à¥‹à¤£à¤¾à¤šà¤²à¤¨à¤¯à¤¨à¤¨à¤¨à¥à¤¦à¤¿à¤¤à¤°à¤¾à¤®à¤ªà¤•à¥à¤·! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥©.
à¤°à¤¾à¤®à¤¾à¤—à¤®à¥‹à¤•à¥à¤¤à¤¿à¤¤à¤°à¤¿à¤¤à¤¾à¤³à¤¿à¤¤à¤¬à¤‚à¤§à¥à¤µà¤¯à¥‹à¤—-à¤¦à¥à¤ƒà¤–à¤¾à¤¬à¥à¤§à¤¿à¤®à¤—à¥à¤¨à¤­à¤°à¤¤à¤¾à¤°à¥à¤ªà¤¿à¤¤à¤ªà¤¾à¤°à¤¿à¤¬à¤°à¥à¤¹!
à¤°à¤¾à¤®à¤¾à¤‚à¤§à¥à¤°à¤¿à¤ªà¤¦à¥à¤®à¤®à¤§à¥à¤ªà¥€ à¤­à¤µà¤¦à¤¨à¥à¤¤à¤°à¤¾à¤¤à¥à¤®à¤¨à¥! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥ª.
à¤µà¤¾à¤¤à¤¾à¤¤à¥à¤®à¤•à¥‡à¤¸à¤°à¤¿à¤®à¤¹à¤¾à¤•à¤ªà¤¿à¤°à¤¾à¤Ÿà¥à¤¤à¤¦à¥€à¤¯-à¤­à¤¾à¤°à¥à¤¯à¤¾à¤‚à¤œà¤¨à¥€à¤ªà¥à¤¤à¥à¤°à¤¤à¤ªà¤ƒà¤«à¤²à¤ªà¥à¤¤à¥à¤°à¤­à¤¾à¤µ!
à¤¤à¤¾à¤°à¥à¤•à¥à¤·à¥à¤¯à¥‹à¤ªà¤®à¥‹à¤šà¤¿à¤¤à¤µà¤ªà¥à¤°à¥à¤¬à¤²à¤¤à¥€à¤µà¥à¤°à¤µà¥‡à¤—! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥«.
à¤¨à¤¾à¤¨à¤¾à¤­à¤¿à¤šà¤¾à¤°à¤¿à¤•à¤µà¤¿à¤¸à¥ƒà¤·à¥à¤Ÿà¤¸à¤µà¥€à¤°à¤•à¥ƒà¤¤à¥à¤¯à¤¾-à¤µà¤¿à¤¦à¥à¤°à¤¾à¤µà¤£à¤¾à¤°à¥à¤£à¤¸à¤®à¥€à¤•à¥à¤·à¤£à¤¦à¥à¤·à¥à¤ªà¥à¤°à¤§à¤°à¥à¤·!
à¤°à¥‹à¤—à¤˜à¥à¤¨à¤¸à¤¤à¥à¤¸à¥à¤¤à¤¦à¤µà¤¿à¤¤à¥à¤¤à¤¦à¤®à¤¨à¥à¤°à¤¤à¥à¤°à¤œà¤¾à¤ª! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥¬.
à¤¯à¤¨à¥à¤¨à¤¾à¤®à¤§à¥‡à¤¯à¤ªà¤¦à¤•à¤¶à¥à¤°à¥à¤¤à¤¿à¤®à¤¾à¤¤à¥à¤°à¤¤à¥‹à¤ªà¤¿ à¤¯à¥‡ à¤¬à¥à¤°à¤¹à¥à¤®à¤°à¤¾à¤•à¥à¤·à¤¸à¤ªà¤¿à¤¶à¤¾à¤šà¤—à¤£à¤¾à¤¶à¥à¤šà¤­à¥‚à¤¤à¤¾!
à¤¤à¥‡ à¤®à¤¾à¤°à¤¿à¤•à¤¾à¤¶à¥à¤šà¤¸à¤­à¤¯à¤‚ à¤¹à¥à¤¯à¤ªà¤¯à¤¾à¤¨à¥à¤¤à¤¿ à¤¸à¤¤à¥à¤µà¤‚! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥

à¥­.
à¤¤à¥à¤µà¤‚ à¤­à¤•à¥à¤¤à¤®à¤¾à¤¨à¤¸à¤¸à¤®à¥€à¤ªà¥à¤¸à¤¿à¤¤à¤ªà¥‚à¤°à¥à¤¤à¤¿à¤¶à¤•à¥à¤¤à¥‹ à¤¦à¥€à¤¨à¤¸à¥à¤¯ à¤¦à¥à¤°à¥à¤®à¤¦à¤¸à¤ªà¤¤à¥à¤¨à¤­à¤¯à¤¾à¤°à¥à¤¤à¤¿à¤­à¤¾à¤œ!
à¤‡à¤·à¥à¤Ÿà¤‚ à¤®à¤®à¤¾à¤ªà¤¿ à¤ªà¤°à¤¿à¤ªà¥‚à¤°à¤¯ à¤ªà¥‚à¤°à¥à¤£à¤•à¤¾à¤®! à¤¶à¥à¤°à¥€ à¤°à¤¾à¤®à¤¦à¥‚à¤¤ à¤¹à¤¨à¥à¤®à¤¨ à¤¹à¤° à¤¸à¤‚à¤•à¤Ÿà¤® à¤®à¥‡à¤‚à¥¥`;

export default memo(function MahamanidirPage() {
  const { t } = useTranslation();
  const { data } = useApi(() => mandirApi.get());
  const [activeSlide, setActiveSlide] = useState(0);
  const [activePrayer, setActivePrayer] = useState<"chalisa" | "aarti" | "kapiBala" | "nitiStotram" | null>(null);
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
      {/* Hero â€” full-width banner */}
      <section className="w-full bg-[#fce4ec]">
        {/* Image â€” shorter on mobile, taller on desktop */}
        <div className="relative w-full overflow-hidden">
          <img
            src="/images/hanuman-banner-01.jpg"
            alt={t("hanumanPage.heroTitle")}
            className="w-full h-[45vw] min-h-[220px] md:h-[80vh] object-cover object-right"
          />
          {/* Desktop-only text overlay on the left pink-cloud area */}
          <div className="hidden md:flex absolute inset-0 items-center">
            <div className="w-1/2 px-12 lg:px-20">
              <p className="inline-flex rounded-full border border-[#c98e35]/60 bg-white/60 backdrop-blur-sm px-4 py-1 text-sm font-semibold text-[#7a4f1f] mb-4">
                {t("hanumanPage.heroBadge")}
              </p>
              <h1 className="text-4xl lg:text-6xl font-black leading-tight text-[#6a1b9a] drop-shadow-sm">
                {t("hanumanPage.heroTitle")}
              </h1>
              <p className="text-xl text-[#7a3f00] font-semibold mt-3">
                {t("hanumanPage.heroLocation")}
              </p>
              <p className="text-base text-[#7a4f1f] mt-2 max-w-sm">
                {t("hanumanPage.heroWelcome")}
              </p>
            </div>
          </div>
          {/* Bottom fade */}
          <div className="hidden md:block absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#fce4ec] to-transparent pointer-events-none" />
        </div>

        {/* Mobile-only text block below the image */}
        <div className="md:hidden px-5 py-6">
          <p className="inline-flex rounded-full border border-[#c98e35]/60 bg-white/80 px-3 py-1 text-xs font-semibold text-[#7a4f1f] mb-3">
            {t("hanumanPage.heroBadge")}
          </p>
          <h1 className="text-2xl sm:text-3xl font-black leading-tight text-[#6a1b9a] mb-2">
            {t("hanumanPage.heroTitle")}
          </h1>
          <p className="text-sm sm:text-base text-[#7a3f00] font-semibold mb-1">
            {t("hanumanPage.heroLocation")}
          </p>
          <p className="text-sm text-[#7a4f1f]">
            {t("hanumanPage.heroWelcome")}
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="p-5 md:p-7">
          <h2 className="text-2xl md:text-3xl font-black text-[#6a1b9a] text-center mb-5">{t("hanumanPage.paathTitle")}</h2>

          <div className="flex flex-wrap gap-3 justify-center mb-6">
            {[
              { key: "chalisa" as const, label: t("hanumanPage.btnChalisa") },
              { key: "aarti" as const, label: t("hanumanPage.btnAarti") },
              { key: "kapiBala" as const, label: t("hanumanPage.btnKapiBala") },
              { key: "nitiStotram" as const, label: t("hanumanPage.btnNitiStotram") },
            ].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setActivePrayer((prev) => (prev === key ? null : key))}
                className={`rounded-full px-5 py-2.5 font-semibold transition text-sm md:text-base ${
                  activePrayer === key
                    ? "bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white"
                    : "bg-white text-[#6a1b9a] border border-[#e91e63]/40 hover:bg-[#fce4ec]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {activePrayer && (
            <div className="rounded-2xl bg-white border border-[#efd8b4] p-4 md:p-6">
              <pre className="whitespace-pre-wrap font-sans text-[#503921] leading-8 text-sm md:text-base">
                {activePrayer === "chalisa" && HANUMAN_CHALISA_TEXT}
                {activePrayer === "aarti" && HANUMAN_AARTI_TEXT}
                {activePrayer === "kapiBala" && JAY_KAPI_TEXT}
                {activePrayer === "nitiStotram" && NITI_STOTRAM_TEXT}
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
            <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a]">{data?.title ?? t("hanumanPage.darshantimingsTitle")}</h2>
            <p className="text-[#4d5d68] text-base md:text-lg leading-relaxed max-w-4xl mx-auto mt-3">
              {data?.about ?? t("hanumanPage.darshantimingsDesc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <article className="rounded-2xl border border-[#e91e63]/20 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#6a1b9a] text-lg mb-2">{t("hanumanPage.morningTitle")}</h3>
              <p className="text-[#4d5d68] mb-3">{data?.morningTime ?? "09:00 AM - 12:00 PM"}</p>
              <button
                type="button"
                onClick={() => setShowMorningAarti((prev) => !prev)}
                className="rounded-lg bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white text-sm font-semibold px-4 py-2 transition"
              >
                {t("hanumanPage.morningAartiBtn")}
              </button>
              {showMorningAarti && (
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-[#d8e5f3] bg-[#f6fbff] p-3 text-sm text-[#20415f] leading-7 font-sans">
                  {MORNING_AARTI_TEXT}
                </pre>
              )}
            </article>

            <article className="rounded-2xl border border-[#f57c00]/30 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#f57c00] text-lg mb-2">{t("hanumanPage.afternoonTitle")}</h3>
              <p className="text-[#7b6244]">{data?.afternoonTime ?? "01:00 PM - 03:00 PM Vishram Time"}</p>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {(t("hanumanPage.afternoonTags", { returnObjects: true }) as string[]).map((tag) => (
                  <span key={tag} className="rounded-lg border border-[#efdcb9] bg-white px-2 py-1 text-[#8a6b41] text-center">{tag}</span>
                ))}
              </div>
            </article>

            <article className="rounded-2xl border border-[#e91e63]/20 bg-gradient-to-b from-[#fce4ec] to-white p-5 shadow-sm">
              <h3 className="font-black text-[#6a1b9a] text-lg mb-2">{t("hanumanPage.eveningTitle")}</h3>
              <p className="text-[#4d5d68] mb-3">{data?.eveningTime ?? "04:00 PM - 09:00 PM"}</p>
              <button
                type="button"
                onClick={() => setShowEveningAarti((prev) => !prev)}
                className="rounded-lg bg-gradient-to-r from-[#f57c00] to-[#f9a825] text-white text-sm font-semibold px-4 py-2 transition"
              >
                {t("hanumanPage.eveningAartiBtn")}
              </button>
              {showEveningAarti && (
                <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-[#f0dcbf] bg-[#fff9ef] p-3 text-sm text-[#7a4f1f] leading-7 font-sans">
                  {EVENING_AARTI_TEXT}
                </pre>
              )}
            </article>
          </div>
      </section>

      {/* COMMENTED OUT â€” Live Dashboard: Hanuman Ji Seva Schedule
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
                    <div className="rounded-lg bg-[var(--color-surface-hover)] border border-[#e5eef7] px-3 py-2">
                      <p className="text-[#5a6c79]">Time</p>
                      <p className="font-semibold text-[#123753]">
                        {to12h(item.start)} - {to12h(item.end)}
                      </p>
                    </div>
                    <div className="rounded-lg bg-[var(--color-surface-hover)] border border-[#e5eef7] px-3 py-2">
                      <p className="text-[#5a6c79]">Volunteer Slots</p>
                      <p className="font-semibold text-[#123753]">{item.volunteerSlots} active slots</p>
                    </div>
                    <div className="rounded-lg bg-[var(--color-surface-hover)] border border-[#e5eef7] px-3 py-2 sm:col-span-2">
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
      */}

      <section className="max-w-6xl mx-auto px-4 pb-12">
        <div className="rounded-3xl bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-4xl font-black mb-5 text-center">{t("hanumanPage.blessingsTitle")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {(t("hanumanPage.blessings", { returnObjects: true }) as string[]).map((point) => (
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
        <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a] text-center mb-6">{t("hanumanPage.utsavTitle")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(t("hanumanPage.utsavPrograms", { returnObjects: true }) as { name: string; time: string }[]).map((item) => (
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
        <h2 className="text-2xl md:text-4xl font-black text-[#6a1b9a] mb-3">{t("hanumanPage.sadhanaTitle")}</h2>
        <p className="text-[#6a1b9a]/80 max-w-3xl mx-auto">{t("hanumanPage.sadhanaText")}</p>
      </section>

      <div className="text-center pb-12 flex flex-wrap items-center justify-center gap-4">
        <Link to="/mandir/gallery" className="bg-gradient-to-r from-[#6a1b9a] to-[#e91e63] text-white rounded-lg px-6 py-3 font-semibold">{t("hanumanPage.viewGallery")}</Link>
        <Link to="/get-involved" className="bg-gradient-to-r from-[#f57c00] to-[#f9a825] text-white rounded-lg px-6 py-3 font-semibold">{t("hanumanPage.planVisit")}</Link>
      </div>
    </div>
  );
});

