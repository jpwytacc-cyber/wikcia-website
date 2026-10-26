import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Globe, Zap } from "lucide-react";
import { t, locales, Locale } from "@/i18n";

export function Navbar({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [localeMenuOpen, setLocaleMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  const navItems = [
    { path: "/", key: "nav_home" },
    { path: "/about", key: "nav_about" },
    { path: "/showcase", key: "nav_showcase" },
    { path: "/skills", key: "nav_skills" },
    { path: "/tools", key: "nav_tools" },
    { path: "/apps", key: "nav_apps" },
    { path: "/blog", key: "nav_blog" },
    { path: "/faq", key: "nav_faq" },
    { path: "/contact", key: "nav_contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b border-white/5 ${
        scrolled ? "bg-ink-deep/95 backdrop-blur-md" : "bg-transparent"
      } transition-colors duration-300`}
    >
      <div className="max-w-[1500px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 bg-orchid rounded-[22px] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative overflow-hidden">
              <span className="text-ink-deep font-black text-lg tracking-tighter">w</span>
              <div className="absolute -inset-0.5 bg-orchid blur opacity-0 group-hover:opacity-70 transition-opacity duration-300" />
            </div>
            <span className="font-display font-black text-xl text-porcelain tracking-tighter">
              wikcia.
            </span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setOpen(false); }}
                  className={`text-xs font-display font-bold uppercase tracking-widest transition-colors ${
                    isActive(item.path) ? "text-orchid" : "text-silver-400 hover:text-porcelain"
                  }`}
                >
                  {t(locale, item.key)}
                </button>
              ))}
            </div>

            {/* Language */}
            <div className="relative group">
              <button
                onClick={() => setLocaleMenuOpen(!localeMenuOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 text-xs font-display font-bold uppercase tracking-widest text-silver-400 hover:text-porcelain hover:border-orchid/50 transition-all cursor-pointer"
              >
                <Globe className="w-3 h-3" />
                {locale.toUpperCase()}
              </button>
              {localeMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 bg-ink-deep border border-white/10 rounded-[22px] p-2 shadow-2xl z-10">
                  {locales.map((l) => (
                    <button
                      key={l}
                      onClick={() => {
                        setLocaleMenuOpen(false);
                        const base = location.pathname.replace(/^\/\w{2}\//, "");
                        navigate(l === "en" ? base : `/${l}${base}`);
                      }}
                      className={`w-full px-3 py-2 text-left text-xs font-display font-bold uppercase tracking-widest transition-colors ${
                        l === locale ? "text-orchid" : "text-silver-400 hover:text-porcelain"
                      }`}
                    >
                      {l.toUpperCase()}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <a
              href="https://byloveandpixels.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 bg-orchid text-ink-deep font-display font-bold rounded-[22px] hover:bg-porcelain hover:text-ink-deep transition-all duration-300 group"
            >
              Love & Pixels <Zap className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Mobile toggle */}
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

      {open && (
        <div className="fixed inset-0 bg-ink-deep/98 backdrop-blur-xl z-40 md:hidden">
          <div className="p-8 max-w-md mx-auto">
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-silver-400 hover:text-porcelain">
              <X className="w-6 h-6" />
            </button>
            <nav className="mt-14 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => { navigate(item.path); setOpen(false); }}
                  className="block px-5 py-5 text-3xl font-display font-bold rounded-[22px] transition-colors hover:bg-orchid/20 hover:text-orchid"
                >
                  {t(locale, item.key)}
                </button>
              ))}
              <div className="mt-12 border-t border-white/5 pt-12">
                <label className="block text-xs font-display font-bold uppercase tracking-widest text-silver-500 mb-6">Language</label>
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => { setOpen(false); setLocaleMenuOpen(false); navigate(l === "en" ? "/" : `/${l}/`); }}
                    className={`block px-4 py-4 text-left text-2xl font-display font-bold uppercase tracking-widest transition-colors ${
                      l === locale ? "bg-orchid text-ink-deep" : "text-silver-400 hover:bg-white/10 hover:text-porcelain"
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </nav>
  );
}
