export interface FAQ {
  q: string;
  a: string;
}

export const faqs: FAQ[] = [
  {
    q: "What is Wikcia Studio?",
    a:
      "Wikcia Studio is a proprietary creative and automation platform by Love & Pixels. It combines a CLI, Desktop application, 40+ skills, local AI providers, and connected apps into one unified system.",
  },
  {
    q: "What platforms does it run on?",
    a:
      "Wikcia Studio runs on Windows, macOS, and Linux. The CLI works anywhere Node.js runs. The Desktop app is built with Electron.",
  },
  {
    q: "Is it open source?",
    a:
      "Wikcia Studio is proprietary software by Love & Pixels. It is built on a customized Hermes Agent foundation (Nous Research, MIT) but the product itself is commercial.",
  },
  {
    q: "Can I integrate my own tools?",
    a:
      "Yes. Wikcia supports MCP servers, custom skills, local model providers, and REST/webhook integrations so you can connect your existing stack.",
  },
  {
    q: "How do I get started?",
    a:
      "Install the Wikcia CLI, run `wikcia --version` to verify, then explore the skills catalog. The Desktop app provides a graphical interface for visual workflows.",
  },
  {
    q: "What websites has Wikcia built?",
    a:
      "Wikcia has built byloveandpixels.com, bella-beauty-atelier.vercel.app, and onyx-auto-studio-iota.vercel.app — all deployed and verified.",
  },
];
