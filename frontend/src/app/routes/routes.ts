export const ROUTES = {
  home: "/",
  login: "/login",
  contact: "/contact",
  donate: "/donate",
  volunteer: "/volunteer",

  about: {
    index: "/about",
    objectives: "/about/objectives",
    founder: "/about/founder-manish-bhaiji",
    awards: "/about/awards-recognition",
    structure: "/about/organizational-structure",
    activities: "/about/trust-activities-overview",
  },

  mission: {
    index: "/mission-philosophy",
    spiritual: "/mission-philosophy/spiritual-mission",
    social: "/mission-philosophy/social-service-mission",
    cultural: "/mission-philosophy/cultural-renaissance",
    global: "/mission-philosophy/global-outreach-vision",
  },

  seva: {
    index: "/seva",
    gau: "/seva/gau-seva",
    annJal: "/seva/ann-jal-seva",
    medicine: "/seva/medicine-distribution",
    education: "/seva/education-support",
    scholarship: "/seva/scholarship-program",
    kanyadaan: "/seva/kanyadaan-seva",
    vyasanmukti: "/seva/vyasanmukti-abhiyan",
    disasterRelief: "/seva/disaster-relief",
    volunteerPrograms: "/seva/volunteer-programs",
  },

  eventsKatha: {
    index: "/events-katha",
    bhagwatKatha: "/events-katha/bhagwat-katha-mahotsav",
    spiritualEvents: "/events-katha/spiritual-events",
    festivals: "/events-katha/festivals-celebrations",
    guruPurnima: "/events-katha/guru-purnima",
    annakut: "/events-katha/annakut-mahotsav",
    youthPrograms: "/events-katha/youth-programs",
  },

  knowledge: {
    index: "/knowledge",
    pathshala: "/knowledge/e-pathshala",
    library: "/knowledge/e-library",
    studyResources: "/knowledge/bhagwat-study-resources",
    children: "/knowledge/children-spiritual-learning",
    dailyQuotes: "/knowledge/daily-spiritual-quotes",
    dailyQuotesToday: "/knowledge/daily-spiritual-quotes/today",
  },

  mandirTeerth: {
    index: "/mandir-teerth",
    bhagwatDham: "/mandir-teerth/bhagwat-dham-project",
    mahamandir: "/mandir-teerth/mahamandir-architecture",
    avatars: "/mandir-teerth/24-avatars-installation",
    hanuman: "/mandir-teerth/hanuman-murti-concept",
    construction: "/mandir-teerth/temple-construction-updates",
    pilgrimage: "/mandir-teerth/pilgrimage-information",
  },

  media: {
    index: "/media-gallery",
    photos: "/media-gallery/photo-gallery",
    videos: "/media-gallery/video-gallery",
    highlights: "/media-gallery/event-highlights",
    publications: "/media-gallery/publications",
    socialFeed: "/media-gallery/social-feed",
  },

  digital: {
    index: "/digital-services",
    store: "/digital-services/e-store",
    donation: "/digital-services/donation-system",
    satsang: "/digital-services/online-satsang",
    membership: "/digital-services/membership-portal",
    kundli: "/digital-services/kundli",
  },

  involved: {
    index: "/get-involved",
    volunteer: "/get-involved/volunteer-registration",
    donor: "/get-involved/become-a-donor",
    partner: "/get-involved/partner-with-us",
    sponsor: "/get-involved/sponsor-programs",
  },

  dashboards: {
    root: "/dashboard",
    admin: "/dashboard/admin",
    donor: "/dashboard/donor",
    volunteer: "/dashboard/volunteer",
    galleryAdmin: "/dashboard/admin/gallery",
  },
} as const;

export const LEGACY_ROUTES = {
  founderOld: "/about/manish-bhaiji",
  spiritualOld: "/mission/spiritual",
  socialOld: "/mission/social",
  culturalOld: "/mission/cultural",
  pathshalaOld: "/events/pathshala",
  libraryOld: "/events/library",
  storeOld: "/store",
  mandirOld: "/mandir",
  ghanshyamOld: "/mandir/ghanshyam",
  galleryOldPublic: "/mandir/gallery",
  galleryOldAdmin: "/gallery",
} as const;
