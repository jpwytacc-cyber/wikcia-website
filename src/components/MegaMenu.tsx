import React, { useState } from "react";
import { ChevronRight, Layers, Code, Monitor, Zap, Shield, Globe } from "lucide-react";
import { Locale } from "@/i18n";

type MegaMenuItem = {
  label: string;
  path: string;
  icon: React.ComponentType<{ className?: string }>;
  external?: boolean;
};

const megaMenuItems: Record<string, MegaMenuItem[]> = {
  Platform: [
    { label: "Skills & Capabilities", path: "/skills", icon: Layers },
    { label: "Tools & Integrations", path: "/tools", icon: Zap },
    { label: "Connected Apps", path: "/apps", icon: Monitor },
  ],
  Showcase: [
    { label: "Love & Pixels", path: "https://byloveandpixels.com", icon: Globe, external: true },
    { label: "Bella Beauty Atelier", path: "https://bella-beauty-atelier.vercel.app", icon: Globe, external: true },
    { label: "Onyx Auto Studio", path: "https://onyx-auto-studio-iota.vercel.app", icon: Globe, external: true },
  ],
  Resources: [
    { label: "Dev News", path: "/blog", icon: Code },
    { label: "FAQs", path: "/faq", icon: Shield },
    { label: "Contact", path: "/contact", icon: ChevronRight },
  ],
};

export function MegaMenuTrigger({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative group">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-sm font-medium text-silver-400 hover:text-porcelain transition-colors"
        aria-expanded={open}
      >
        Explore <ChevronRight className="w-4 h-4 ml-1" />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-ink border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
          <div className="p-6 space-y-8">
            {Object.entries(megaMenuItems).map(([section, items]) => (
              <div key={section}>
                <h4 className="text-xs font-semibold text-citron uppercase tracking-wider mb-3">
                  {section}
                </h4>
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item.path}>
                      {item.external ? (
                        <a
                          href={item.path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5 hover:text-citron group"
                        >
                          <item.icon className="w-4 h-4 text-silver-500 group-hover:text-citron" />
                          <span className="text-silver-400">{item.label}</span>
                        </a>
                      ) : (
                        <a
                          href={item.path}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors hover:bg-white/5 hover:text-citron group"
                        >
                          <item.icon className="w-4 h-4 text-silver-500 group-hover:text-citron" />
                          <span className="text-silver-400">{item.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
