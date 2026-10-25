export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "wikcia-launch",
    title: "Introducing Wikcia Studio",
    excerpt:
      "Wikcia Studio is now available as a release candidate. The CLI, Desktop app, and 40+ skills are ready for creative teams and automation engineers.",
    date: "2026-10-25",
    readTime: "4 min",
    tags: ["Launch", "Announcement"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: "threejs-integration",
    title: "Building 3D Experiences with Wikcia",
    excerpt:
      "How we integrated Three.js and React Three Fiber into the Wikcia Desktop app for interactive 3D product showcases.",
    date: "2026-10-24",
    readTime: "6 min",
    tags: ["3D", "Engineering", "Three.js"],
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
  },
  {
    id: "mcp-integrations",
    title: "Connecting Apps with MCP Servers",
    excerpt:
      "Canva, Hugging Face, and Vercel MCP servers connected to Wikcia Studio — enabling cross-app automation workflows.",
    date: "2026-10-23",
    readTime: "5 min",
    tags: ["MCP", "Automation", "Integrations"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
  {
    id: "local-ai-setup",
    title: "Running Local AI with Ollama and Wikcia",
    excerpt:
      "Setting up Ollama with qwen3.5:35b on port 11434 for private, local inference inside Wikcia Studio.",
    date: "2026-10-22",
    "readTime": "7 min",
    tags: ["AI", "Local", "Ollama"],
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80",
  },
];
