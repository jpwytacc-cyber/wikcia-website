import React from "react";
import { Link } from "react-router-dom";
import { Mail, Globe, Code, Zap, Monitor, ArrowRight } from "lucide-react";
import { t, Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-white/5 bg-ink-deep pt-28 pb-16 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-orchid/50 to-transparent" />
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-9 h-9 bg-orchid rounded-[18px] flex items-center justify-center">
                <span className="text-ink-deep font-black text-sm tracking-tighter">w</span>
              </div>
              <span className="font-display font-black text-lg tracking-tighter text-porcelain">wikcia.</span>
            </div>
            <p className="text-silver-400 text-sm leading-relaxed max-w-xs mb-8">
              Imagine anything.<br className="hidden md:block" />
              Make it real.<br className="hidden md:block" />
              Proprietary creative & automation platform by Love & Pixels.
            </p>
            <div className="flex gap-4">
              <a href="https://github.com/jpwytacc-cyber/wikcia-studio-rebrand" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orchid hover:text-ink-deep transition-all duration-300"><Code className="w-5 h-5" /></a>
              <a href="https://byloveandpixels.com" target="_blank" rel="noopener noreferrer" className="w-11 h-11 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orchid hover:text-ink-deep transition-all duration-300"><Globe className="w-5 h-5" /></a>
              <a href="mailto:info@byloveandpixels.com" className="w-11 h-11 rounded-[22px] bg-white/5 border border-white/10 flex items-center justify-center hover:bg-orchid hover:text-ink-deep transition-all duration-300"><Mail className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-porcelain font-display font-bold text-lg mb-10 tracking-tight">Navigate</h4>
            <ul className="space-y-6 text-sm text-silver-400">
              {[
                { path: "/", key: "nav_home" },
                { path: "/about", key: "nav_about" },
                { path: "/showcase", key: "nav_showcase" },
                { path: "/skills", key: "nav_skills" },
                { path: "/tools", key: "nav_tools" },
                { path: "/apps", key: "nav_apps" },
                { path: "/blog", key: "nav_blog" },
                { path: "/faq", key: "nav_faq" },
                { path: "/contact", key: "nav_contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="transition-colors hover:text-orchid hover:-translate-x-1">
                    {t(locale, item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-porcelain font-display font-bold text-lg mb-10 tracking-tight">Platform</h4>
            <ul className="space-y-6 text-sm text-silver-400">
              <li><Link to="/skills" className="flex items-center gap-2 transition-colors hover:text-orchid hover:-translate-x-1"><Zap className="w-4 h-4 text-orchid/50" /> Skills & Capabilities</Link></li>
              <li><Link to="/tools" className="flex items-center gap-2 transition-colors hover:text-orchid hover:-translate-x-1"><Code className="w-4 h-4 text-orchid/50" /> Tools & Integrations</Link></li>
              <li><Link to="/apps" className="flex items-center gap-2 transition-colors hover:text-orchid hover:-translate-x-1"><Monitor className="w-4 h-4 text-orchid/50" /> Connected Apps</Link></li>
              <li><Link to="/blog" className="flex items-center gap-2 transition-colors hover:text-orchid hover:-translate-x-1"><ArrowRight className="w-4 h-4 text-orchid/50" /> Dev News</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-porcelain font-display font-bold text-lg mb-10 tracking-tight">Company</h4>
            <ul className="space-y-6 text-sm text-silver-400">
              <li><a href="https://byloveandpixels.com" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-orchid">Love & Pixels</a></li>
              <li><Link to="/faq" className="transition-colors hover:text-orchid">{t(locale, "nav_faq")}</Link></li>
              <li><a href="mailto:info@byloveandpixels.com" className="transition-colors hover:text-orchid">info@byloveandpixels.com</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-20 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-display font-bold uppercase tracking-widest text-silver-500">
          <p>© 2026 Love & Pixels. Wikcia Studio is proprietary software.</p>
          <p>Built with <span className="text-orchid">Wikcia Studio.</span></p>
        </div>
      </div>
    </footer>
  );
}
