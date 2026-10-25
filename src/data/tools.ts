export interface Tool {
  id: string;
  name: string;
  description: string;
  type: "cli" | "mcp" | "provider" | "desktop";
  status: "active" | "configured" | "idle";
}

export const tools: Tool[] = [
  {
    id: "wikcia-cli",
    name: "Wikcia CLI",
    description: "Command-line interface for Wikcia Studio. Chat, version, help, and skill execution from the terminal.",
    type: "cli",
    status: "active",
  },
  {
    id: "hermes-compat",
    name: "Hermes CLI (compat)",
    description: "Legacy `hermes` command preserved as a compatibility alias for Wikcia CLI.",
    type: "cli",
    status: "active",
  },
  {
    id: "ollama",
    name: "Ollama",
    description: "Local AI model provider running qwen3.5:35b on port 11434. Private, local inference.",
    type: "provider",
    status: "active",
  },
  {
    id: "omniroute",
    name: "OmniRoute",
    description: "Local AI gateway router on port 20128 for intelligent model routing.",
    type: "provider",
    status: "active",
  },
  {
    id: "freellmapi",
    name: "FreeLLMAPI",
    description: "Free LLM API provider on port 3001 for public model access.",
    type: "provider",
    status: "configured",
  },
  {
    id: "searxng",
    name: "SearXNG",
    description: "Metasearch engine with JSON results and engine attribution for research workflows.",
    type: "cli",
    status: "active",
  },
  {
    id: "changedetection",
    name: "changedetection.io",
    description: "Website change detection monitoring with diff V1→V2 tracking.",
    type: "cli",
    status: "active",
  },
  {
    id: "libretranslate",
    name: "LibreTranslate",
    description: "Local machine translation (en→de verified: 'Hello world' → 'Hallo Welt').",
    type: "cli",
    status: "active",
  },
  {
    id: "crawl4ai",
    name: "crawl4ai",
    description: "Web crawling and markdown extraction for research and content pipelines.",
    type: "cli",
    status: "active",
  },
  {
    id: "docling",
    name: "docling",
    description: "PDF to markdown conversion for document processing pipelines.",
    type: "cli",
    status: "active",
  },
  {
    id: "gallery-dl",
    name: "gallery-dl",
    description: "Authorized image and gallery downloading via CLI.",
    type: "cli",
    status: "active",
  },
  {
    id: "playwright",
    name: "Playwright",
    description: "Browser automation with msedge channel installed for testing and scraping.",
    type: "cli",
    status: "active",
  },
  {
    id: "canva-mcp",
    name: "Canva MCP",
    description: "Canva integration via MCP server for design asset creation.",
    type: "mcp",
    status: "configured",
  },
  {
    id: "huggingface-mcp",
    name: "Hugging Face MCP",
    description: "Model hub access, image generation, and dataset management via MCP.",
    type: "mcp",
    status: "configured",
  },
  {
    id: "vercel-mcp",
    name: "Vercel MCP",
    description: "Deployment, domain, and project management via Vercel MCP server.",
    type: "mcp",
    status: "configured",
  },
];
