import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { t, locales, Locale } from "@/i18n";

export function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [locale, setLocale] = useState<Locale>("en");
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-ink/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-citron flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
              <span className="text-ink font-bold text-xs">w</span>
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-porcelain">wikcia.</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-4">
              {[
                { path: "/", key: "nav_home" },
                { path: "/about", key: "nav_about" },
                { path: "/showcase", key: "nav_showcase" },
                { path: "/skills", key: "nav_skills" },
                { path: "/tools", key: "nav_tools" },
                { path: "/apps", key: "nav_apps" },
                { path: "/blog", key: "nav_blog" },
                { path: "/faq", key: "nav_faq" },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors ${
                    isActive(item.path) ? "text-citron" : "text-silver-400 hover:text-porcelain"
                  }`}
                >
                  {t(locale, item.key)}
                </Link>
              ))}
              <Link
                to="/contact"
                className="text-sm font-medium text-citron hover:text-porcelain transition-colors"
              >
                {t(locale, "nav_contact")}
              </Link>
            </div>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 text-sm text-silver-400 hover:text-porcelain transition-colors"
              >
                <Globe className="w-4 h-4" />
                {locale.toUpperCase()}
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-32 bg-ink border border-white/10 rounded-lg shadow-xl overflow-hidden">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l as Locale)}
                    className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                      l === locale ? "bg-citron text-ink" : "text-silver-400 hover:bg-white/5 hover:text-porcelain"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="https://byloveandpixels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-citron text-ink rounded-lg font-semibold hover:bg-citron/90 transition-all"
            >
              Love & Pixels
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-silver-400 hover:text-porcelain"
              aria-label="Toggle menu"
            >
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu overlay */}
      {open && (
        <div className="fixed inset-0 bg-ink/95 backdrop-blur z-40 md:hidden">
          <div className="p-6 max-w-md mx-auto">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-silver-400 hover:text-porcelain"
            >
              <X className="w-6 h-6" />
            </button>
            <nav className="mt-8 space-y-4">
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
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3 text-lg font-medium rounded-lg transition-colors hover:bg-white/5 hover:text-porcelain"
                >
                  {t(locale, item.key)}
                </Link>
              ))}
              <div className="mt-8 border-t border-white/10 pt-6">
                <label className="block text-xs font-semibold text-silver-500 mb-3 uppercase tracking-wider">
                  Language
                </label>
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLocale(l as Locale); setOpen(false); }}
                    className={`block px-4 py-2 text-left text-sm rounded transition-colors ${
                      l === locale ? "bg-citron text-ink" : "text-silver-400 hover:bg-white/5"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
              <a
                href="https://byloveandpixels.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 block px-4 py-3 bg-citron text-ink rounded-lg font-semibold text-center hover:bg-citron/90 transition-all"
              >
                Love & Pixels
              </a>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
