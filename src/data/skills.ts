export interface Skill {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: string;
}

export const skills: Skill[] = [
  {
    id: "creative-direction",
    title: "Creative Direction",
    description: "Art direction, brand identity, visual systems, and creative strategy for digital products.",
    category: "Creative",
    icon: "🎨",
  },
  {
    id: "graphic-design",
    title: "Graphic Design",
    description: "Visual assets, logos, illustrations, and print-ready designs produced via VectorCraft and PhotoCraft CLIs.",
    category: "Creative",
    icon: "🖌️",
  },
  {
    id: "motion-graphics",
    title: "Motion Graphics",
    description: "Animated titles, transitions, and visual effects created with EffectCraft and FilmCraft CLIs.",
    category: "Creative",
    icon: "🎬",
  },
  {
    id: "video-production",
    title: "Video Production",
    description: "End-to-end video editing, color grading, and export via FilmCraft and batch ffmpeg pipelines.",
    category: "Creative",
    icon: "📹",
  },
  {
    id: "audio-processing",
    title: "Audio Processing",
    description: "Audio editing, mixing, and mastering via Audacity CLI and creative audio workflows.",
    category: "Creative",
    icon: "🎵",
  },
  {
    id: "backend-automation",
    title: "Backend Automation",
    description: "Pipeline automation, scheduled jobs, cron orchestration, and service integration.",
    category: "Development",
    icon: "⚙️",
  },
  {
    id: "fullstack",
    title: "Fullstack Development",
    description: "End-to-end web applications with React, Vite, Node.js, and connected MCP services.",
    category: "Development",
    icon: "💻",
  },
  {
    id: "frontend3d",
    title: "Frontend 3D",
    description: "Interactive 3D experiences with Three.js, React Three Fiber, and custom shaders.",
    category: "Development",
    icon: "🔷",
  },
  {
    id: "seo",
    title: "SEO & LLMO",
    description: "Technical SEO, generative engine optimization, structured data, and LLM-search readiness.",
    category: "Marketing",
    icon: "🔍",
  },
  {
    id: "performance-marketing",
    title: "Performance Marketing",
    description: "Campaign planning, paid media, conversion optimization, and funnel analytics.",
    category: "Marketing",
    icon: "📈",
  },
  {
    id: "social-media",
    title: "Social Media Management",
    description: "Content planning, community building, and automated social publishing.",
    category: "Marketing",
    icon: "📱",
  },
  {
    id: "ux-design",
    title: "UX Design",
    description: "User journeys, wireframes, usability testing, and interaction design.",
    category: "Design",
    icon: "🧭",
  },
  {
    id: "research",
    title: "Research",
    description: "Market research, competitor monitoring, academic paper discovery, and domain reconnaissance.",
    category: "Research",
    icon: "🔎",
  },
  {
    id: "qa",
    title: "Quality Assurance",
    description: "Build verification, integration gates, regression testing, and quality sign-off.",
    category: "Development",
    icon: "✅",
  },
  {
    id: "copywriting",
    title: "Copywriting",
    description: "Persuasive, on-brand copy for websites, ads, emails, and social content.",
    category: "Creative",
    icon: "✍️",
  },
  {
    id: "analytics",
    title: "Analytics",
    description: "Metric definition, funnel analysis, data visualization, and performance dashboards.",
    category: "Business",
    icon: "📊",
  },
];
