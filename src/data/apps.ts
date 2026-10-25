export interface App {
  id: string;
  name: string;
  description: string;
  platform: "desktop" | "cli" | "web";
  icon: string;
}

export const apps: App[] = [
  {
    id: "wikcia-studio-desktop",
    name: "Wikcia Studio Desktop",
    description: "Electron-based desktop application with Wikcia branding, Dark/Light modes, and local AI integration.",
    platform: "desktop",
    icon: "🖥️",
  },
  {
    id: "wikcia-cli",
    name: "Wikcia CLI",
    description: "Terminal-based AI assistant with tool-calling capabilities. `wikcia chat`, `wikcia --version`, skill execution.",
    platform: "cli",
    icon: "💻",
  },
  {
    id: "loveandpixels-flagship",
    name: "Love & Pixels Flagship",
    description: "Production marketing and business development platform for Love & Pixels sp z o.o.",
    platform: "web",
    icon: "🌐",
  },
  {
    id: "bella-beauty-atelier",
    name: "Bella Beauty Atelier",
    description: "Premium beauty booking platform with real appointment storage on Vercel.",
    platform: "web",
    icon: "💅",
  },
  {
    id: "onyx-auto-studio",
    name: "Onyx Auto Studio",
    description: "Five-language automotive detailing concept with Three.js 3D surface lab and booking engine.",
    platform: "web",
    icon: "🚗",
  },
];
