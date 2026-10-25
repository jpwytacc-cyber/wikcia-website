export interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}

export const showcaseItems: ShowcaseItem[] = [
  {
    id: "byloveandpixels",
    title: "Love & Pixels",
    subtitle: "Marketing, AI, Analytics, Consultancy & Business Development",
    description:
      "The parent company behind Wikcia Studio. Love & Pixels handles marketing strategy, AI integration, analytics, business consultancy, and development — all powered by Wikcia automation.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
    link: "https://byloveandpixels.com",
    tags: ["Marketing", "AI", "Analytics", "Consultancy"],
  },
  {
    id: "bella-beauty-atelier",
    title: "Bella Beauty Atelier",
    subtitle: "Premium Beauty Booking Platform",
    description:
      "A production beauty booking platform with real appointment storage, Vercel deployment, and integrated customer management. Built and deployed with Wikcia Studio tools.",
    image: "https://images.unsplash.com/photo-1571793688427-09b11c899304?w=800&q=80",
    link: "https://bella-beauty-atelier.vercel.app",
    tags: ["Booking", "E-commerce", "Vercel", "Payments"],
  },
  {
    id: "onyx-auto-studio",
    title: "Onyx Auto Studio",
    subtitle: "Five-Language Automotive Detailing Concept",
    description:
      "A multilingual automotive detailing platform with localized prerendered routes, booking engine, and Three.js 3D surface lab. Full i18n across EN/NL/DE/PL/EL.",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
    link: "https://onyx-auto-studio-iota.vercel.app",
    tags: ["i18n", "Three.js", "Booking", "PWA"],
  },
];
