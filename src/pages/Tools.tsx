import React from "react";
import { tools } from "@/data/tools";

export function ToolsPage() {
  const typeGroups = {
    cli: "CLI Tools",
    mcp: "MCP Servers",
    provider: "AI Providers",
    desktop: "Desktop",
  } as const;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Tools & Integrations</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              Native CLI tools, local AI providers, and connected MCP servers
              that power the Wikcia ecosystem.
            </p>
          </div>

          <div className="flex flex-wrap gap-4 mb-8">
            {Object.entries(typeGroups).map(([type, label]) => (
              <button
                key={type}
                className="px-4 py-2 rounded-full text-xs font-medium border border-white/10 text-silver-400 hover:border-citron hover:text-citron transition-colors"
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div key={tool.id} className="card p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                      {tool.type === "cli" ? "💻" : tool.type === "mcp" ? "🔌" : tool.type === "provider" ? "🧠" : "🖥️"}
                    </div>
                    <span className="font-semibold text-porcelain">{tool.name}</span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                      tool.status === "active"
                        ? "bg-citron/10 text-citron border border-citron/20"
                        : tool.status === "configured"
                        ? "bg-orchid/10 text-orchid border border-orchid/20"
                        : "bg-white/10 text-silver-500 border border-white/10"
                    }`}
                  >
                    {tool.status}
                  </span>
                </div>
                <p className="text-sm text-silver-400 leading-relaxed mb-4">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
