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
  const stripped = url.pathname.replace(/^\/es/, "") || "/";
  return localizePath(stripped, target);
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
    brandTag: "Glottia · languages + community",
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
        "Map and list of meetups by language — English, French, German…",
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
    brandTag: "Glottia · idiomas + comunidad",
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
        "Mapa y lista de encuentros por idioma — inglés, francés, alemán…",
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
