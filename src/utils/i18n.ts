/**
 * Glottia — Native i18n dictionaries & helpers (no external deps).
 *
 * Content mirrors the real product (gamified language-meetup app): discover
 * conversation "encuentros" by language/level, join, check in, take a quiz for
 * points, track a FluencyScore + streak, and climb the weekly ranking.
 *
 * `en` is the source of truth for the shape; `es` is type-checked against it,
 * so the two locales can never drift out of sync.
 */

export const languages = { en: "English", es: "Español" } as const;
export type Lang = keyof typeof languages;
export const defaultLang: Lang = "en";

/** Resolve the active language from a URL pathname (`/es/...` → "es"). */
export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split("/");
  return segment === "es" ? "es" : "en";
}

/** Prefix an internal path with the locale segment (`path` starts with "/"). */
export function localizePath(path: string, lang: Lang): string {
  if (lang === defaultLang) return path;
  return path === "/" ? "/es/" : `/es${path}`;
}

/** Build the path to the "other" language for a language switcher. */
export function alternatePath(url: URL, target: Lang): string {
  const current = getLangFromUrl(url);
  const stripped = url.pathname.replace(/^\/es/, "") || "/";

  // Legal documents use locale-specific slugs — translate the slug so the
  // switcher lands on the matching document instead of a dead URL.
  const match = stripped.match(/^\/legal\/([^/]+)\/?$/);
  if (match) {
    const doc = legalDocs.find((d) => legalSlugs[current][d] === match[1]);
    if (doc) return legalPath(doc, target);
  }

  return localizePath(stripped, target);
}

/** Legal document keys (URL slugs differ per locale — see `legalSlugs`). */
export const legalDocs = ["privacy", "terms", "security"] as const;
export type LegalDoc = (typeof legalDocs)[number];

/** Per-locale URL slug for each legal document. */
export const legalSlugs: Record<Lang, Record<LegalDoc, string>> = {
  en: { privacy: "privacy", terms: "terms", security: "security" },
  es: { privacy: "privacidad", terms: "terminos", security: "seguridad" },
};

/** Build the localized URL for a legal document. */
export function legalPath(doc: LegalDoc, lang: Lang): string {
  return localizePath(`/legal/${legalSlugs[lang][doc]}`, lang);
}

const en = {
  meta: {
    title: "Glottia — Practice languages at real meetups",
    description:
      "Glottia connects you with in-person conversation meetups by language and level at nearby cafés. Complete quizzes, and climb the weekly ranking.",
  },
  nav: {
    home: "Home",
    benefits: "Benefits",
    howItWorks: "How it works",
    community: "Media & Community",
    login: "Log in",
    requestDemo: "Explore meetups",
    switchTo: "ES",
    themeToggle: "Toggle light / dark theme",
  },
  hero: {
    badge: "Real conversation meetups near you",
    titlePre: "Practice languages at",
    titleHl1: "real meetups",
    titleMid: ", just around",
    titleHl2: "the corner",
    titlePost: ".",
    subtitle:
      "Glottia connects you with conversation meetups by language and level at nearby cafés and spaces. Complete quizzes, and climb the ranking while you talk with real people.",
    ctaPrimary: "Explore meetups",
    ctaSecondary: "See how it works",
    loading: "Loading…",
  },
  heroApp: {
    greeting: "Hi, Sofía 👋",
    fluencyLabel: "FluencyScore",
    fluencyValue: "78",
    points: "250 pts",
    exploreLabel: "Explore by language",
    langs: ["English", "French", "German", "Italian"],
    upcomingTitle: "Upcoming meetups",
    seeAll: "See all",
    meetups: [
      { level: "INTERMEDIATE", time: "Today · 18:00", title: "English Conversation", seats: "1 seat left" },
      { level: "BEGINNER", time: "Tomorrow · 10:30", title: "French Breakfast", seats: "2 seats left" },
    ],
    nearbyTitle: "Meetups near you",
    nearby: [
      { title: "Italian at Café Central", meta: "0.5 km · Today 19:30" },
      { title: "English in the Park", meta: "1.2 km · Tomorrow 11:00" },
    ],
    nav: ["Learn", "Social", "Practice", "Profile"],
  },
  platform: {
    eyebrow: "The platform",
    title: "Learn by speaking, not memorizing.",
    subtitle:
      "In-person meetups, quizzes that reinforce what you practiced, and a ranking that keeps you coming back. Your progress, measured as a FluencyScore.",
    kpis: [
      { value: "50%", label: "return for a 2nd meetup" },
      { value: "60%", label: "complete the daily quiz" },
      { value: "30 days", label: "average practice streak" },
      { value: "+20%", label: "fluency in 6 weeks" },
    ],
  },
  features: [
    {
      id: "meetups",
      eyebrow: "Discover & join",
      title: "Real meetups, by language and level.",
      body: "Search the map or by topic, filter by language, level, and date, and join a conversation meetup near you. Real seats, real people, zero pressure.",
      bullets: [
        "Map and list of meetups by language like English, French, German…",
        "Clear levels — beginner to advanced, plus CEFR (A1–C2).",
        "Live seat counts and QR check-in when you arrive.",
      ],
      linkLabel: "See a meetup",
      mockup: "meetup",
      reverse: false,
    },
    {
      id: "progress",
      eyebrow: "Learn & compete",
      title: "Level up and climb the ranking.",
      body: "After each meetup, a short quiz reinforces what you learned and adds points. Track your FluencyScore, keep your streak, and compete on the weekly ranking.",
      bullets: [
        "Quick quizzes worth +10 pts that measure your comprehension.",
        "FluencyScore and self-assessment to see real progress.",
        "Streaks, achievements, and a weekly ranking with your community.",
      ],
      linkLabel: "Try the quiz",
      mockup: "progress",
      reverse: true,
    },
  ],
  mockups: {
    meetup: {
      level: "INTERMEDIATE",
      time: "Today · 18:00",
      title: "English Conversation",
      meta: "Café Central · 0.5 km",
      seats: "1 seat left",
      joinCta: "Join the meetup",
      floatLevel: { tag: "Level", value: "B1 · Confirmed" },
      floatPts: { tag: "On completion", value: "⭐ +10 pts" },
    },
    progress: {
      fluencyLabel: "Your FluencyScore",
      fluencyValue: "78",
      levelLabel: "Level: Conversational",
      dims: [
        { label: "Comprehension", pct: 80 },
        { label: "Expression", pct: 65 },
        { label: "Fluency", pct: 72 },
      ],
      rankLabel: "Weekly ranking",
      rankValue: "#3",
      floatPts: { tag: "Today's quiz", value: "⭐ +10 pts" },
      floatStreak: { tag: "Active streak", value: "30 days 🔥" },
    },
  },
  cta: {
    title: "Start speaking this week.",
    subtitle:
      "Create your free account, find a meetup nearby, and earn your first points. Your next conversation is just around the corner.",
    primary: "Explore meetups",
    secondary: "See the quiz demo",
  },
  demo: {
    badge: "Interactive preview",
    title: "Take Glottia for a spin",
    subtitle:
      "A tap-through of the learner journey: discover a meetup, join it, complete the quiz, and climb the ranking — no install required.",
    openCta: "Open the live demo",
    scrollHint: "Scroll to walk through the app",
    tapHint: "Tap the tabs to explore the app",
    steps: [
      {
        title: "Discover meetups",
        desc: "Open Glottia to your FluencyScore, your points, and the meetups happening nearby by language and level.",
      },
      {
        title: "Join in one tap",
        desc: "Check the level, venue, date, and free seats — then join the conversation. QR check-in waits at the door.",
      },
      {
        title: "Practice & earn points",
        desc: "After each meetup, a quick quiz reinforces what you learned and rewards you with points.",
      },
      {
        title: "Climb the ranking",
        desc: "Keep your streak, watch your FluencyScore grow, and compete on the weekly leaderboard.",
      },
    ],
    tabs: ["Home", "Meetup", "Quiz", "Ranking"],
    s1: {
      greeting: "Hi, Sofía 👋",
      fluencyLabel: "FluencyScore",
      fluencyValue: "78",
      points: "250 pts",
      exploreLabel: "Explore by language",
      langs: ["English", "French", "German", "Italian"],
      upcomingTitle: "Upcoming meetups",
      seeAll: "See all",
      meetups: [
        { level: "INTERMEDIATE", time: "Today · 18:00", title: "English Conversation", seats: "1 seat left", full: false },
        { level: "BEGINNER", time: "Tomorrow · 10:30", title: "French Breakfast", seats: "2 seats left", full: false },
        { level: "ADVANCED", time: "Thursday · 19:00", title: "German Debate", seats: "Full", full: true },
      ],
    },
    s2: {
      levelBadge: "B1",
      statusBadge: "Confirmed",
      title: "French Conversation",
      venue: "Café Central",
      address: "Calle Mayor 12, Madrid",
      dateLabel: "Date",
      date: "Fri 15 Mar · 18:30 – 20:00",
      langLabel: "Language",
      lang: "French",
      capacity: "3 of 4 seats taken",
      capacityPct: 75,
      aboutLabel: "About this meetup",
      about:
        "Join us for a relaxed evening of French conversation. It doesn't matter if you're a beginner or advanced — what matters is practicing and meeting new people. We'll talk about travel, culture, and more.",
      joinCta: "Join the meetup",
    },
    s3: {
      progress: "Question 3 of 5",
      reward: "Earn +10 pts",
      instruction: "Pick the correct translation.",
      question: "How do you say “goodbye” in French?",
      options: [
        { text: "Au revoir", correct: true },
        { text: "Bonjour", correct: false },
        { text: "Merci", correct: false },
        { text: "S'il vous plaît", correct: false },
      ],
      correctMsg: "Correct! ⭐ +10 pts",
      wrongMsg: "Almost — try again.",
      nextCta: "See ranking",
    },
    s4: {
      title: "This week's ranking",
      endsIn: "Ends in 2 days, 14 hours",
      youLabel: "You",
      rows: [
        { rank: 1, name: "Carlos V.", tier: "Master", pts: "320 pts", you: false },
        { rank: 2, name: "Ana M.", tier: "Polyglot", pts: "290 pts", you: false },
        { rank: 3, name: "Sofía Martínez", tier: "Conversational", pts: "260 pts", you: true },
        { rank: 4, name: "David R.", tier: "Conversational", pts: "240 pts", you: false },
      ],
      footnote: "+10 pts earned this session",
    },
  },
  media: {
    metaTitle: "Media & Community — Glottia",
    metaDescription:
      "Watch Glottia in action, meet the team behind it, read what learners and partner venues say, and find answers to the questions we hear most.",
    hero: {
      eyebrow: "Media & Community",
      title: "See Glottia in action — and the people behind it.",
      subtitle:
        "Product walk-throughs, the team building Glottia, real stories from our community, and answers to the questions we hear most.",
    },
    product: {
      eyebrow: "Product tour",
      title: "See Glottia in Action",
      subtitle:
        "Discover how our platform turns language practice into real, in-person conversations.",
      video: {
        title: "Glottia product walk-through",
        embedUrl: "",
        watchUrl: "#",
      },
      featuresTitle: "How Glottia works",
      features: [
        {
          title: "Verification process",
          desc: "See how we verify member identities to keep every meetup safe and trusted.",
        },
        {
          title: "Event creation",
          desc: "How simple it is to organise or join a language-practice session near you.",
        },
        {
          title: "Conversational experience",
          desc: "Discover how we make conversations feel natural, relaxed, and fun.",
        },
        {
          title: "User matching",
          desc: "Watch how we connect people who share the same language goals and level.",
        },
        {
          title: "Safe environments",
          desc: "Our protocols for keeping every space welcoming and respectful.",
        },
      ],
      footnote:
        "A full demonstration of how Glottia reinvents language learning through real conversation practice.",
    },
    team: {
      eyebrow: "Behind Glottia",
      title: "Our Team",
      subtitle:
        "Meet the people building Glottia and reinventing how the world practices languages.",
      matrixTitle: "Team members",
      cols: { name: "Name", role: "Role", desc: "Description" },
      members: [
        {
          name: "Matias Aliaga Aguirre",
          role: "Co-Founder",
          desc: "Leads backend development.",
        },
        {
          name: "Italo Sanchez Manrique",
          role: "Founder",
          desc: "Responsible for design and front-end development.",
        },
        {
          name: "Ivo Machado Bracamonte",
          role: "Co-Founder",
          desc: "Responsible for design and front-end development.",
        },
        {
          name: "Leandro Contreras Lopez",
          role: "Co-Founder",
          desc: "Responsible for design and front-end development.",
        },
        {
          name: "Cesar Augusto Arostegui Alzamora",
          role: "Frontend and Backend Developer",
          desc: "Responsible for end-to-end full-stack architecture, performance optimization, and modular UI engineering.",
        },
      ],
      videoHeading: "Meet Our Team",
      video: {
        title: "Video About the Team — Glottia",
        embedUrl: "",
        watchUrl: "#",
      },
    },
    testimonials: {
      eyebrow: "Community",
      title: "What people say about us",
      subtitle:
        "Real stories from learners and partner venues who are already part of the Glottia community.",
      chips: { learner: "Learner", partner: "Partner Venue" },
      items: [
        {
          kind: "learner",
          rating: 5,
          quote:
            "Thanks to Glottia my conversational English has improved so much. The atmosphere is relaxed and I always meet interesting people. I'm no longer afraid to speak!",
          name: "María González",
          role: "English learner",
        },
        {
          kind: "partner",
          rating: 5,
          quote:
            "Since we started hosting Glottia meetups, our quiet evenings are full of lively conversation. The groups are respectful and our regulars love the language nights.",
          name: "Ariana Calderón",
          role: "Café owner & host venue",
        },
        {
          kind: "learner",
          rating: 5,
          quote:
            "Perfect for practising French after work. The evening meetups fit my schedule and I've made real friends along the way.",
          name: "Ana Rodríguez",
          role: "Marketing professional",
        },
        {
          kind: "partner",
          rating: 5,
          quote:
            "Glottia has helped us become a real hub for cultural exchange. Our community is grateful for these spaces to meet and practice.",
          name: "Biblioteca Central",
          role: "Cultural space & host venue",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Frequently Asked Questions",
      subtitle: "Answers to the most common questions about Glottia.",
      items: [
        {
          q: "Is there any cost to join Glottia?",
          a: "Glottia is completely free for learners. Just sign up and join any meetup you like. Partner venues don't pay to be part of our network either.",
        },
        {
          q: "What language level do I need to take part?",
          a: "Any level works — from absolute beginner (A1) to advanced (C2). Each meetup shows its level so you can pick the right fit.",
        },
        {
          q: "How do you keep the meetups safe?",
          a: "We verify member identities, host meetups in public venues, and use QR check-in at the door so you always know who's attending.",
        },
        {
          q: "Can I take part if I'm very shy?",
          a: "Absolutely. Meetups are relaxed and beginner-friendly — the goal is to practice without pressure and meet new people at your own pace.",
        },
        {
          q: "Which languages are available?",
          a: "English, French, German, Italian and more, depending on the meetups near you. New languages open up as the community grows.",
        },
        {
          q: "Can I cancel my attendance to a session?",
          a: "Yes. You can cancel anytime from the app, which frees up your seat for someone else on the waitlist.",
        },
        {
          q: "How do partner venues benefit?",
          a: "Venues host meetups that bring engaged, respectful groups and lively conversation to their space — building community and new regulars.",
        },
      ],
      footnote: "Can't find the answer you're looking for?",
      contactLabel: "Contact us at hola@glottia.com",
      contactHref: "mailto:hola@glottia.com",
    },
  },
  legal: {
    backHome: "Back to home",
    updatedLabel: "Last updated",
    privacy: {
      title: "Privacy Policy",
      updated: "May 2026",
      sections: [
        {
          heading: "Overview",
          paragraphs: [
            "This Privacy Policy explains how Glottia collects, uses, and protects your information when you discover and join in-person language meetups, complete quizzes, and track your progress. By using Glottia, you agree to the practices described here.",
          ],
        },
        {
          heading: "Information we collect",
          paragraphs: [
            "Account details you provide when you sign up, such as your name, email address, and the languages and levels you want to practice.",
            "Activity data generated as you use Glottia: the meetups you join, QR check-ins at venues, quiz results, and your FluencyScore, points, and streaks.",
            "Approximate location, used only to show you conversation meetups happening nearby. You can change location permissions at any time in your device settings.",
          ],
        },
        {
          heading: "Identity verification",
          paragraphs: [
            "To keep meetups safe and trusted, we may ask you to verify your identity before you attend. Verification data is processed solely for safety purposes and is never sold or used for advertising.",
          ],
        },
        {
          heading: "How we use your information",
          paragraphs: [
            "We use your data to match you with relevant meetups, reinforce learning through quizzes, calculate your FluencyScore and weekly ranking, and keep the community safe. We do not sell your personal data.",
          ],
        },
        {
          heading: "Sharing and venues",
          paragraphs: [
            "Cafés and spaces that host meetups are venues, not customers — they receive only the minimum information needed to welcome attendees, such as the number of confirmed seats. We never share your private profile with them.",
          ],
        },
        {
          heading: "Data retention and your rights",
          paragraphs: [
            "You can access, correct, or delete your account data at any time. We retain information only as long as needed to provide the service or as required by law.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about this policy? Email us at hola@glottia.com.",
          ],
        },
      ],
    },
    terms: {
      title: "Terms of Service",
      updated: "May 2026",
      sections: [
        {
          heading: "Acceptance of terms",
          paragraphs: [
            "By creating an account or using Glottia, you agree to these Terms of Service. If you do not agree, please do not use the platform.",
          ],
        },
        {
          heading: "Using Glottia",
          paragraphs: [
            "Glottia is designed for users aged 16 and older. You are responsible for keeping your account credentials secure and for the activity that happens under your account.",
          ],
        },
        {
          heading: "Meetups and venues",
          paragraphs: [
            "Meetups take place at public venues such as cafés and cultural spaces. When you join a meetup, you agree to attend respectfully, follow venue rules, and complete QR check-in on arrival.",
          ],
        },
        {
          heading: "Gamified system",
          paragraphs: [
            "FluencyScore, points, streaks, and the weekly ranking exist to motivate practice. They hold no monetary value and may be adjusted to preserve fair play.",
            "Attempting to manipulate points, streaks, or the ranking — for example through fake check-ins — may result in score resets or account suspension.",
          ],
        },
        {
          heading: "Cancellations and no-shows",
          paragraphs: [
            "Plans change. You can cancel your attendance at any time from the app, which frees your seat for someone on the waitlist. Repeated last-minute no-shows may temporarily limit your access to high-demand meetups.",
          ],
        },
        {
          heading: "Acceptable use",
          paragraphs: [
            "You agree not to harass other members, misrepresent your identity, or use Glottia for any unlawful purpose. We may suspend accounts that violate these rules.",
          ],
        },
        {
          heading: "Changes and liability",
          paragraphs: [
            "We may update these terms as the product evolves; significant changes will be announced in the app. Glottia connects people for conversation practice but is not responsible for interactions that occur outside the platform.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Questions about these terms? Email us at hola@glottia.com.",
          ],
        },
      ],
    },
    security: {
      title: "Security",
      updated: "May 2026",
      sections: [
        {
          heading: "Our commitment to safety",
          paragraphs: [
            "Safety is foundational to Glottia. Because our meetups happen in person, we combine member verification, public venues, and active moderation to protect the community.",
          ],
        },
        {
          heading: "Member vetting and verification",
          paragraphs: [
            "New members may be asked to verify their identity before joining meetups. This vetting loop helps ensure that the people you meet are who they say they are.",
          ],
        },
        {
          heading: "Safe meetup environments",
          paragraphs: [
            "Meetups are held only at public, partner venues such as cafés and cultural spaces — never private residences. QR check-in confirms attendance and keeps an accurate record of who is present.",
          ],
        },
        {
          heading: "Reporting mechanics",
          paragraphs: [
            "Every member can report inappropriate behavior directly from the app. Reports are reviewed promptly, and we follow up on each one to keep the community trustworthy.",
          ],
        },
        {
          heading: "Community protection rules",
          paragraphs: [
            "We enforce a clear code of conduct: respect, inclusivity, and zero tolerance for harassment. Members who break these rules can be removed from meetups or banned from the platform.",
          ],
        },
        {
          heading: "Account and data security",
          paragraphs: [
            "We protect your account with industry-standard safeguards and limit access to personal data. Learn more in our Privacy Policy.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: [
            "Spotted a safety concern? Email us at hola@glottia.com.",
          ],
        },
      ],
    },
  },
  footer: {
    tagline: "Real conversation, languages that stick.",
    cols: { product: "Product", company: "Company", legal: "Legal" },
    links: {
      benefits: "Benefits",
      demo: "Live demo",
      meetups: "Meetups",
      about: "About",
      contact: "Contact",
      careers: "Careers",
      privacy: "Privacy",
      terms: "Terms",
      security: "Security",
    },
    rights: "All rights reserved.",
  },
};

export type Dictionary = typeof en;

const es: Dictionary = {
  meta: {
    title: "Glottia — Practica idiomas en encuentros reales",
    description:
      "Glottia te conecta con encuentros de conversación presenciales por idioma y nivel en cafés cercanos. Completa quizzes y sube en el ranking semanal.",
  },
  nav: {
    home: "Inicio",
    benefits: "Beneficios",
    howItWorks: "Cómo funciona",
    community: "Media y Comunidad",
    login: "Iniciar sesión",
    requestDemo: "Explorar encuentros",
    switchTo: "EN",
    themeToggle: "Cambiar tema claro / oscuro",
  },
  hero: {
    badge: "Encuentros de conversación cerca de ti",
    titlePre: "Practica idiomas en",
    titleHl1: "encuentros reales",
    titleMid: ", a la vuelta de",
    titleHl2: "la esquina",
    titlePost: ".",
    subtitle:
      "Glottia te conecta con encuentros de conversación por idioma y nivel en cafés y espacios cercanos. Completa quizzes y sube en el ranking mientras hablas con personas reales.",
    ctaPrimary: "Explorar encuentros",
    ctaSecondary: "Ver cómo funciona",
    loading: "Cargando…",
  },
  heroApp: {
    greeting: "Hola, Sofía 👋",
    fluencyLabel: "FluencyScore",
    fluencyValue: "78",
    points: "250 pts",
    exploreLabel: "Explorar por idioma",
    langs: ["Inglés", "Francés", "Alemán", "Italiano"],
    upcomingTitle: "Próximos encuentros",
    seeAll: "Ver todos",
    meetups: [
      { level: "INTERMEDIO", time: "Hoy · 18:00", title: "Conversación en Inglés", seats: "1 plaza libre" },
      { level: "BÁSICO", time: "Mañana · 10:30", title: "Desayuno Francés", seats: "2 plazas libres" },
    ],
    nearbyTitle: "Encuentros cerca de ti",
    nearby: [
      { title: "Italiano en Café Central", meta: "0.5 km · Hoy 19:30" },
      { title: "Inglés en el Parque", meta: "1.2 km · Mañana 11:00" },
    ],
    nav: ["Learn", "Social", "Practice", "Profile"],
  },
  platform: {
    eyebrow: "La plataforma",
    title: "Aprende hablando, no memorizando.",
    subtitle:
      "Encuentros presenciales, quizzes que refuerzan lo que practicaste y un ranking que te mantiene volviendo. Tu progreso, medido en FluencyScore.",
    kpis: [
      { value: "50%", label: "vuelven a un 2º encuentro" },
      { value: "60%", label: "completan el quiz diario" },
      { value: "30 días", label: "racha media de práctica" },
      { value: "+20%", label: "fluidez en 6 semanas" },
    ],
  },
  features: [
    {
      id: "meetups",
      eyebrow: "Descubre y únete",
      title: "Encuentros reales, por idioma y nivel.",
      body: "Busca en el mapa o por tema, filtra por idioma, nivel y fecha, y únete a un encuentro de conversación cerca de ti. Cupos reales, gente real, cero presión.",
      bullets: [
        "Mapa y lista de encuentros por idioma como inglés, francés, alemán…",
        "Niveles claros — de básico a avanzado y CEFR (A1–C2).",
        "Cupos en vivo y check-in con QR al llegar.",
      ],
      linkLabel: "Ver un encuentro",
      mockup: "meetup",
      reverse: false,
    },
    {
      id: "progress",
      eyebrow: "Aprende y compite",
      title: "Sube de nivel y escala en el ranking.",
      body: "Después de cada encuentro, un quiz corto refuerza lo aprendido y suma puntos. Sigue tu FluencyScore, mantén tu racha y compite en el ranking semanal.",
      bullets: [
        "Quizzes rápidos de +10 pts que miden tu comprensión.",
        "FluencyScore y autoevaluación para ver tu progreso real.",
        "Rachas, logros y ranking semanal con tu comunidad.",
      ],
      linkLabel: "Probar el quiz",
      mockup: "progress",
      reverse: true,
    },
  ],
  mockups: {
    meetup: {
      level: "INTERMEDIO",
      time: "Hoy · 18:00",
      title: "Conversación en Inglés",
      meta: "Café Central · 0.5 km",
      seats: "1 plaza libre",
      joinCta: "Unirse al encuentro",
      floatLevel: { tag: "Nivel", value: "B1 · Confirmado" },
      floatPts: { tag: "Al completar", value: "⭐ +10 pts" },
    },
    progress: {
      fluencyLabel: "Tu FluencyScore",
      fluencyValue: "78",
      levelLabel: "Nivel: Conversadora",
      dims: [
        { label: "Comprensión", pct: 80 },
        { label: "Expresión", pct: 65 },
        { label: "Fluidez", pct: 72 },
      ],
      rankLabel: "Ranking semanal",
      rankValue: "#3",
      floatPts: { tag: "Quiz de hoy", value: "⭐ +10 pts" },
      floatStreak: { tag: "Racha activa", value: "30 días 🔥" },
    },
  },
  cta: {
    title: "Empieza a hablar esta semana.",
    subtitle:
      "Crea tu cuenta gratis, encuentra un encuentro cerca y gana tus primeros puntos. Tu próxima conversación está a la vuelta de la esquina.",
    primary: "Explorar encuentros",
    secondary: "Ver el quiz demo",
  },
  demo: {
    badge: "Vista previa interactiva",
    title: "Prueba Glottia ahora",
    subtitle:
      "Un recorrido por el viaje del estudiante: descubre un encuentro, únete, completa el quiz y sube en el ranking — sin instalar nada.",
    openCta: "Abrir la demo en vivo",
    scrollHint: "Desplázate para recorrer la app",
    tapHint: "Toca las pestañas para explorar la app",
    steps: [
      {
        title: "Descubre encuentros",
        desc: "Abre Glottia y verás tu FluencyScore, tus puntos y los encuentros cercanos por idioma y nivel.",
      },
      {
        title: "Únete con un toque",
        desc: "Revisa el nivel, el lugar, la fecha y las plazas libres — y únete a la conversación. El check-in con QR te espera en la puerta.",
      },
      {
        title: "Practica y gana puntos",
        desc: "Después de cada encuentro, un quiz corto refuerza lo aprendido y te recompensa con puntos.",
      },
      {
        title: "Sube en el ranking",
        desc: "Mantén tu racha, ve crecer tu FluencyScore y compite en el ranking semanal.",
      },
    ],
    tabs: ["Inicio", "Encuentro", "Quiz", "Ranking"],
    s1: {
      greeting: "Hola, Sofía 👋",
      fluencyLabel: "FluencyScore",
      fluencyValue: "78",
      points: "250 pts",
      exploreLabel: "Explorar por idioma",
      langs: ["Inglés", "Francés", "Alemán", "Italiano"],
      upcomingTitle: "Próximos encuentros",
      seeAll: "Ver todos",
      meetups: [
        { level: "INTERMEDIO", time: "Hoy · 18:00", title: "Conversación en Inglés", seats: "1 plaza libre", full: false },
        { level: "BÁSICO", time: "Mañana · 10:30", title: "Desayuno Francés", seats: "2 plazas libres", full: false },
        { level: "AVANZADO", time: "Jueves · 19:00", title: "Debate en Alemán", seats: "Lleno", full: true },
      ],
    },
    s2: {
      levelBadge: "B1",
      statusBadge: "Confirmado",
      title: "Conversación en francés",
      venue: "Café Central",
      address: "Calle Mayor 12, Madrid",
      dateLabel: "Fecha",
      date: "Vie 15 mar · 18:30 – 20:00",
      langLabel: "Idioma",
      lang: "Francés",
      capacity: "3 de 4 plazas ocupadas",
      capacityPct: 75,
      aboutLabel: "Acerca del encuentro",
      about:
        "Únete a nosotros para una tarde relajada de conversación en francés. No importa si tu nivel es básico o avanzado, lo importante es practicar y conocer gente nueva. Hablaremos de viajes, cultura y más.",
      joinCta: "Unirse al encuentro",
    },
    s3: {
      progress: "Pregunta 3 de 5",
      reward: "Gana +10 pts",
      instruction: "Selecciona la traducción correcta.",
      question: "¿Cómo se dice «adiós» en francés?",
      options: [
        { text: "Au revoir", correct: true },
        { text: "Bonjour", correct: false },
        { text: "Merci", correct: false },
        { text: "S'il vous plaît", correct: false },
      ],
      correctMsg: "¡Correcto! ⭐ +10 pts",
      wrongMsg: "Casi — inténtalo de nuevo.",
      nextCta: "Ver ranking",
    },
    s4: {
      title: "Ranking de esta semana",
      endsIn: "Acaba en 2 días, 14 horas",
      youLabel: "Tú",
      rows: [
        { rank: 1, name: "Carlos V.", tier: "Maestro", pts: "320 pts", you: false },
        { rank: 2, name: "Ana M.", tier: "Políglota", pts: "290 pts", you: false },
        { rank: 3, name: "Sofía Martínez", tier: "Conversadora", pts: "260 pts", you: true },
        { rank: 4, name: "David R.", tier: "Conversador", pts: "240 pts", you: false },
      ],
      footnote: "+10 pts ganados en esta sesión",
    },
  },
  media: {
    metaTitle: "Media y Comunidad — Glottia",
    metaDescription:
      "Ve Glottia en acción, conoce al equipo detrás, lee lo que dicen aprendices y locales aliados, y encuentra respuestas a las preguntas más comunes.",
    hero: {
      eyebrow: "Media y Comunidad",
      title: "Ve Glottia en acción — y a quienes lo hacen posible.",
      subtitle:
        "Recorridos del producto, el equipo que construye Glottia, historias reales de nuestra comunidad y respuestas a las preguntas más frecuentes.",
    },
    product: {
      eyebrow: "Tour del producto",
      title: "Ve Glottia en Acción",
      subtitle:
        "Descubre cómo nuestra plataforma transforma la práctica de idiomas a través de experiencias conversacionales reales.",
      video: {
        title: "Recorrido del producto Glottia",
        embedUrl: "",
        watchUrl: "#",
      },
      featuresTitle: "Demostramos Cómo Funciona Glottia",
      features: [
        {
          title: "Proceso de verificación",
          desc: "Observa cómo validamos la identidad de nuestros usuarios para garantizar encuentros seguros.",
        },
        {
          title: "Creación de eventos",
          desc: "Ve lo fácil que es organizar o unirse a sesiones de práctica de idiomas.",
        },
        {
          title: "Experiencia conversacional",
          desc: "Descubre cómo facilitamos conversaciones naturales y entretenidas.",
        },
        {
          title: "Conexión entre usuarios",
          desc: "Mira cómo conectamos personas con intereses lingüísticos comunes.",
        },
        {
          title: "Espacios seguros",
          desc: "Conoce nuestros protocolos para mantener un ambiente confiable y respetuoso.",
        },
      ],
      footnote:
        "Una demostración completa de cómo Glottia revoluciona el aprendizaje de idiomas a través de la práctica conversacional real.",
    },
    team: {
      eyebrow: "Detrás de Glottia",
      title: "Nuestro Equipo",
      subtitle:
        "Conoce al equipo apasionado detrás de Glottia, trabajando para revolucionar el aprendizaje de idiomas.",
      matrixTitle: "Miembros del Equipo",
      cols: { name: "Nombre", role: "Rol", desc: "Descripción" },
      members: [
        {
          name: "Matias Aliaga Aguirre",
          role: "Co-Fundador",
          desc: "Encargado del desarrollo backend.",
        },
        {
          name: "Italo Sanchez Manrique",
          role: "Fundador",
          desc: "Responsable de diseño y desarrollo front end.",
        },
        {
          name: "Ivo Machado Bracamonte",
          role: "Co-Fundador",
          desc: "Responsable de diseño y desarrollo front end.",
        },
        {
          name: "Leandro Contreras Lopez",
          role: "Co-Fundador",
          desc: "Responsable de diseño y desarrollo front end.",
        },
        {
          name: "Cesar Augusto Arostegui Alzamora",
          role: "Desarrollador Frontend y Backend",
          desc: "Responsable de la arquitectura full-stack de extremo a extremo, la optimización del rendimiento y la ingeniería modular de interfaces.",
        },
      ],
      videoHeading: "Conoce a Nuestro Equipo",
      video: {
        title: "Video About the Team — Glottia",
        embedUrl: "",
        watchUrl: "#",
      },
    },
    testimonials: {
      eyebrow: "Comunidad",
      title: "Lo que dicen de nosotros",
      subtitle:
        "Testimonios reales de aprendices y locales que ya forman parte de la comunidad Glottia.",
      chips: { learner: "Aprendiz", partner: "Local Aliado" },
      items: [
        {
          kind: "learner",
          rating: 5,
          quote:
            "Gracias a Glottia he mejorado muchísimo mi inglés conversacional. El ambiente es relajado y siempre conozco gente interesante. ¡Ya no tengo miedo de hablar!",
          name: "María González",
          role: "Estudiante de inglés",
        },
        {
          kind: "partner",
          rating: 5,
          quote:
            "Desde que organizamos encuentros de Glottia, nuestras tardes tranquilas se llenan de conversación. Los grupos son respetuosos y nuestros clientes habituales aman las noches de idiomas.",
          name: "Ariana Calderón",
          role: "Dueña de cafetería y local aliado",
        },
        {
          kind: "learner",
          rating: 5,
          quote:
            "Perfecto para practicar francés después del trabajo. Los encuentros por la tarde encajan con mi horario y he hecho amistades de verdad.",
          name: "Ana Rodríguez",
          role: "Profesional en marketing",
        },
        {
          kind: "partner",
          rating: 5,
          quote:
            "Glottia nos ha ayudado a posicionarnos como un verdadero centro de intercambio cultural. La comunidad está muy agradecida por estos espacios.",
          name: "Biblioteca Central",
          role: "Espacio cultural y local aliado",
        },
      ],
    },
    faq: {
      eyebrow: "FAQ",
      title: "Preguntas Frecuentes",
      subtitle: "Resolvemos las dudas más comunes sobre Glottia.",
      items: [
        {
          q: "¿Tiene algún costo participar en Glottia?",
          a: "Glottia es completamente gratuito para aprendices. Solo necesitas registrarte y puedes unirte a todas las sesiones que desees. Los locales aliados tampoco pagan por formar parte de nuestra red.",
        },
        {
          q: "¿Qué nivel de idioma necesito para participar?",
          a: "Cualquier nivel sirve — desde principiante absoluto (A1) hasta avanzado (C2). Cada encuentro muestra su nivel para que elijas el adecuado.",
        },
        {
          q: "¿Cómo garantizan la seguridad en los encuentros?",
          a: "Verificamos la identidad de los miembros, organizamos los encuentros en locales públicos y usamos check-in con QR en la puerta para que siempre sepas quién asiste.",
        },
        {
          q: "¿Puedo participar si soy muy tímido/a?",
          a: "Por supuesto. Los encuentros son relajados y aptos para principiantes — la meta es practicar sin presión y conocer gente a tu propio ritmo.",
        },
        {
          q: "¿Qué idiomas están disponibles?",
          a: "Inglés, francés, alemán, italiano y más, según los encuentros cerca de ti. Se abren nuevos idiomas a medida que crece la comunidad.",
        },
        {
          q: "¿Puedo cancelar mi asistencia a una sesión?",
          a: "Sí. Puedes cancelar en cualquier momento desde la app, lo que libera tu plaza para otra persona en lista de espera.",
        },
        {
          q: "¿Cómo se benefician los locales aliados?",
          a: "Los locales acogen encuentros que llevan grupos comprometidos y conversación animada a su espacio — creando comunidad y nuevos clientes habituales.",
        },
      ],
      footnote: "¿No encuentras la respuesta que buscas?",
      contactLabel: "Contáctanos en hola@glottia.com",
      contactHref: "mailto:hola@glottia.com",
    },
  },
  legal: {
    backHome: "Volver al inicio",
    updatedLabel: "Última actualización",
    privacy: {
      title: "Política de Privacidad",
      updated: "Mayo 2026",
      sections: [
        {
          heading: "Resumen",
          paragraphs: [
            "Esta Política de Privacidad explica cómo Glottia recopila, usa y protege tu información cuando descubres y te unes a encuentros de idiomas presenciales, completas quizzes y sigues tu progreso. Al usar Glottia, aceptas las prácticas descritas aquí.",
          ],
        },
        {
          heading: "Información que recopilamos",
          paragraphs: [
            "Datos de cuenta que proporcionas al registrarte, como tu nombre, correo electrónico y los idiomas y niveles que quieres practicar.",
            "Datos de actividad generados al usar Glottia: los encuentros a los que te unes, los check-ins con QR en los locales, los resultados de los quizzes y tu FluencyScore, puntos y rachas.",
            "Ubicación aproximada, usada solo para mostrarte encuentros de conversación cercanos. Puedes cambiar los permisos de ubicación en cualquier momento desde los ajustes de tu dispositivo.",
          ],
        },
        {
          heading: "Verificación de identidad",
          paragraphs: [
            "Para mantener los encuentros seguros y confiables, podemos pedirte que verifiques tu identidad antes de asistir. Los datos de verificación se procesan únicamente con fines de seguridad y nunca se venden ni se usan para publicidad.",
          ],
        },
        {
          heading: "Cómo usamos tu información",
          paragraphs: [
            "Usamos tus datos para conectarte con encuentros relevantes, reforzar el aprendizaje mediante quizzes, calcular tu FluencyScore y el ranking semanal, y mantener segura a la comunidad. No vendemos tus datos personales.",
          ],
        },
        {
          heading: "Compartir información y locales",
          paragraphs: [
            "Los cafés y espacios que acogen encuentros son locales, no clientes — reciben solo la información mínima necesaria para recibir a los asistentes, como el número de plazas confirmadas. Nunca compartimos tu perfil privado con ellos.",
          ],
        },
        {
          heading: "Conservación de datos y tus derechos",
          paragraphs: [
            "Puedes acceder, corregir o eliminar los datos de tu cuenta en cualquier momento. Conservamos la información solo el tiempo necesario para prestar el servicio o según lo exija la ley.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "¿Preguntas sobre esta política? Escríbenos a hola@glottia.com.",
          ],
        },
      ],
    },
    terms: {
      title: "Términos del Servicio",
      updated: "Mayo 2026",
      sections: [
        {
          heading: "Aceptación de los términos",
          paragraphs: [
            "Al crear una cuenta o usar Glottia, aceptas estos Términos del Servicio. Si no estás de acuerdo, por favor no uses la plataforma.",
          ],
        },
        {
          heading: "Uso de Glottia",
          paragraphs: [
            "Glottia está diseñado para usuarios de 16 años en adelante. Eres responsable de mantener seguras tus credenciales de cuenta y de la actividad que ocurra bajo tu cuenta.",
          ],
        },
        {
          heading: "Encuentros y locales",
          paragraphs: [
            "Los encuentros se realizan en locales públicos como cafés y espacios culturales. Al unirte a un encuentro, aceptas asistir con respeto, seguir las reglas del local y completar el check-in con QR al llegar.",
          ],
        },
        {
          heading: "Sistema gamificado",
          paragraphs: [
            "El FluencyScore, los puntos, las rachas y el ranking semanal existen para motivar la práctica. No tienen valor monetario y pueden ajustarse para preservar el juego limpio.",
            "Intentar manipular los puntos, las rachas o el ranking — por ejemplo mediante check-ins falsos — puede provocar el reinicio de la puntuación o la suspensión de la cuenta.",
          ],
        },
        {
          heading: "Cancelaciones e inasistencias",
          paragraphs: [
            "Los planes cambian. Puedes cancelar tu asistencia en cualquier momento desde la app, lo que libera tu plaza para alguien en lista de espera. Las inasistencias repetidas de último momento pueden limitar temporalmente tu acceso a encuentros muy solicitados.",
          ],
        },
        {
          heading: "Uso aceptable",
          paragraphs: [
            "Te comprometes a no acosar a otros miembros, no falsear tu identidad y no usar Glottia con fines ilícitos. Podemos suspender las cuentas que infrinjan estas reglas.",
          ],
        },
        {
          heading: "Cambios y responsabilidad",
          paragraphs: [
            "Podemos actualizar estos términos a medida que el producto evoluciona; los cambios importantes se anunciarán en la app. Glottia conecta personas para practicar conversación, pero no es responsable de las interacciones que ocurran fuera de la plataforma.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "¿Preguntas sobre estos términos? Escríbenos a hola@glottia.com.",
          ],
        },
      ],
    },
    security: {
      title: "Seguridad",
      updated: "Mayo 2026",
      sections: [
        {
          heading: "Nuestro compromiso con la seguridad",
          paragraphs: [
            "La seguridad es fundamental en Glottia. Como nuestros encuentros son presenciales, combinamos la verificación de miembros, locales públicos y moderación activa para proteger a la comunidad.",
          ],
        },
        {
          heading: "Filtrado y verificación de miembros",
          paragraphs: [
            "A los nuevos miembros se les puede pedir que verifiquen su identidad antes de unirse a los encuentros. Este ciclo de filtrado ayuda a asegurar que las personas que conoces son quienes dicen ser.",
          ],
        },
        {
          heading: "Entornos de encuentro seguros",
          paragraphs: [
            "Los encuentros se realizan solo en locales públicos y aliados, como cafés y espacios culturales — nunca en domicilios privados. El check-in con QR confirma la asistencia y mantiene un registro preciso de quién está presente.",
          ],
        },
        {
          heading: "Mecánica de reportes",
          paragraphs: [
            "Cada miembro puede reportar comportamientos inapropiados directamente desde la app. Los reportes se revisan con prontitud y damos seguimiento a cada uno para mantener la confianza de la comunidad.",
          ],
        },
        {
          heading: "Reglas de protección de la comunidad",
          paragraphs: [
            "Aplicamos un código de conducta claro: respeto, inclusión y cero tolerancia al acoso. Los miembros que incumplan estas reglas pueden ser expulsados de los encuentros o vetados de la plataforma.",
          ],
        },
        {
          heading: "Seguridad de la cuenta y los datos",
          paragraphs: [
            "Protegemos tu cuenta con medidas estándar de la industria y limitamos el acceso a los datos personales. Más información en nuestra Política de Privacidad.",
          ],
        },
        {
          heading: "Contacto",
          paragraphs: [
            "¿Detectaste un problema de seguridad? Escríbenos a hola@glottia.com.",
          ],
        },
      ],
    },
  },
  footer: {
    tagline: "Conversación real, idiomas que se quedan.",
    cols: { product: "Producto", company: "Empresa", legal: "Legal" },
    links: {
      benefits: "Beneficios",
      demo: "Demo en vivo",
      meetups: "Encuentros",
      about: "Nosotros",
      contact: "Contacto",
      careers: "Trabaja con nosotros",
      privacy: "Privacidad",
      terms: "Términos",
      security: "Seguridad",
    },
    rights: "Todos los derechos reservados.",
  },
};

const dictionaries: Record<Lang, Dictionary> = { en, es };

/** Get the full translation dictionary for a language. */
export function useTranslations(lang: Lang): Dictionary {
  return dictionaries[lang];
}
