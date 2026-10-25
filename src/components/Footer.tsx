import { Link } from "react-router-dom";
import { Mail, Globe, Code } from "lucide-react";
import { t, Locale } from "@/i18n";

export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="border-t border-white/5 bg-ink pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 bg-citron rounded flex items-center justify-center">
                <span className="text-ink font-bold text-[10px]">w</span>
              </div>
              <span className="font-display font-bold text-lg tracking-tight text-porcelain">wikcia.</span>
            </div>
            <p className="text-silver-400 text-sm leading-relaxed max-w-xs">
              Imagine anything. Make it real. The proprietary creative and automation platform by Love & Pixels.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://github.com/jpwytacc-cyber/wikcia-studio-rebrand"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-citron transition-all"
              >
                <Code className="w-5 h-5" />
              </a>
              <a
                href="https://byloveandpixels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-citron transition-all"
              >
                <Globe className="w-5 h-5" />
              </a>
              <a href="mailto:info@byloveandpixels.com" className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:text-citron transition-all">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-porcelain font-semibold mb-6">{t(locale, "nav_home")}</h4>
            <ul className="space-y-3 text-silver-400 text-sm">
              <li>
                <Link to="/" className="hover:text-porcelain transition-colors">
                  {t(locale, "nav_home")}
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-porcelain transition-colors">
                  {t(locale, "nav_about")}
                </Link>
              </li>
              <li>
                <Link to="/showcase" className="hover:text-porcelain transition-colors">
                  {t(locale, "nav_showcase")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-porcelain transition-colors">
                  {t(locale, "nav_contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-porcelain font-semibold mb-6">Platform</h4>
            <ul className="space-y-3 text-silver-400 text-sm">
              <li>
                <Link to="/skills" className="hover:text-porcelain transition-colors">
                  Skills & Capabilities
                </Link>
              </li>
              <li>
                <Link to="/tools" className="hover:text-porcelain transition-colors">
                  Tools & Integrations
                </Link>
              </li>
              <li>
                <Link to="/apps" className="hover:text-porcelain transition-colors">
                  Connected Apps
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-porcelain transition-colors">
                  Dev News
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-porcelain font-semibold mb-6">Company</h4>
            <ul className="space-y-3 text-silver-400 text-sm">
              <li>
                <a
                  href="https://byloveandpixels.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-porcelain transition-colors"
                >
                  Love & Pixels
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="hover:text-porcelain transition-colors"
                >
                  {t(locale, "nav_faq")}
                </a>
              </li>
              <li>
                <a href="mailto:info@byloveandpixels.com" className="hover:text-porcelain transition-colors">
                  info@byloveandpixels.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-silver-500">
          <p>{t(locale, "footer_rights")}</p>
          <p>{t(locale, "footer_made_with")}</p>
        </div>
      </div>
    </footer>
  );
}
