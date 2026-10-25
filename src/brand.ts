// Canonical Wikcia brand configuration — single source of truth
export const brand = {
  name: "Wikcia",
  productName: "Wikcia Studio",
  wordmark: "wikcia.",
  tagline: "Imagine anything. Make it real.",
  description:
    "Wikcia Studio is the proprietary creative and automation platform by Love & Pixels. Build 3D experiences, automate workflows, deploy AI agents, and ship stunning digital products.",
  company: "Love & Pixels",
  companyWebsite: "https://byloveandpixels.com",
  version: "0.22.2",
  cliName: "wikcia",
  desktopName: "Wikcia Studio",
} as const;

export const palette = {
  ink: "#17181D",
  porcelain: "#F4EFE7",
  citron: "#D8FF85",
  orchid: "#A993F7",
  inkRgb: "23, 24, 29",
  porcelainRgb: "244, 239, 231",
  citronRgb: "216, 255, 133",
  orchidRgb: "169, 147, 247",
} as const;

export const typography = {
  display: "'Space Grotesk', sans-serif",
  interface: "'Inter', sans-serif",
  mono: "'JetBrains Mono', monospace",
} as const;

export const breakpoints = {
  sm: "640px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px",
} as const;
