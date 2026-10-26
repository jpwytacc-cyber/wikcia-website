import React from "react";
import { Link } from "react-router-dom";
import { CoreScene } from "@/three/CoreScene";
import { ArrowRight, Play, Monitor, Zap, Shield } from "lucide-react";
import { t, Locale } from "@/i18n";

export function HomePage({ locale }: { locale: Locale }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute top-[-12%] left-[-8%] w-[700px] h-[700px] bg-orchid/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-8%] right-[-12%] w-[800px] h-[800px] bg-white/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-40% left-40% w-[500px] h-[500px] bg-citron/8 rounded-full blur-[120px] pointer-events-none" />

      <section className="relative z-10 flex items-center justify-center min-h-[92vh] px-6">
        <div className="container text-center max-w-5xl">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-[50px] bg-orchid text-ink-deep font-display font-bold text-xs uppercase tracking-widest mb-12 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-ink-deep animate-pulse" />
            Wikcia Studio v0.22.2 · Release Candidate
          </div>
          <h1 className="text-8xl md:text-10xl font-display font-black text-porcelain mb-10 leading-[0.8]">
            Imagine anything.<br />
            <span className="text-orchid">Make it real.</span>
          </h1>
          <p className="text-xl md:text-3xl text-silver-300 mb-14 max-w-2xl mx-auto leading-relaxed font-light">
            The proprietary creative & automation platform by Love & Pixels.<br />
            3D experiences · AI agents · workflow automation · interactive digital products.<br className="hidden md:block" />
            Built to ship.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a href="mailto:info@byloveandpixels.com" className="btn btn-violet w-full sm:w-auto">
              Request a Walkthrough <ArrowRight className="w-5 h-5" />
            </a>
            <Link to="/showcase" className="btn btn-outline w-full sm:w-auto">
              View Showcase <Play className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative z-10 py-24 border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16 text-center">
            <div><div className="text-4xl md:text-6xl font-display font-black text-orchid mb-2">40+</div><div className="text-sm text-silver-500 uppercase tracking-widest font-display font-bold">Skills</div></div>
            <div><div className="text-4xl md:text-6xl font-display font-black text-citron mb-2">3</div><div className="text-sm text-silver-500 uppercase tracking-widest font-display font-bold">Live sites</div></div>
            <div><div className="text-4xl md:text-6xl font-display font-black text-porcelain mb-2">5</div><div className="text-sm text-silver-500 uppercase tracking-widest font-display font-bold">Languages</div></div>
            <div><div className="text-4xl md:text-6xl font-display font-black text-orchid mb-2">3</div><div className="text-sm text-silver-500 uppercase tracking-widest font-display font-bold">AI providers</div></div>
          </div>
        </div>
      </section>

      <section className="relative z-10 section">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-24 items-center">
            <div>
              <div className="eyebrow">Digital Atelier</div>
              <h2 className="text-5xl md:text-7xl font-display font-bold text-porcelain mb-10 leading-tight">
                A sculptural constellation of capability.
              </h2>
              <p className="text-silver-400 text-lg leading-relaxed mb-12 max-w-lg">
                Wikcia isn't a collection of tools. It's a connected system — skills,
                tools, apps, and agents that communicate in one language. From CLI to Desktop,
                every surface speaks Wikcia.
              </p>
              <div className="flex gap-6">
                <Link to="/skills" className="px-8 py-4 rounded-[22px] border border-orchid text-orchid font-display font-bold hover:bg-orchid hover:text-ink-deep transition-all">
                  Explore Skills
                </Link>
                <Link to="/tools" className="px-8 py-4 rounded-[22px] border border-white/10 text-porcelain hover:border-orchid hover:text-orchid transition-all">
                  View Tools
                </Link>
              </div>
            </div>
            <div className="relative">
              <CoreScene label="Wikcia Studio" className="w-full h-[560px]" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 section bg-white/5">
        <div className="container">
          <div className="section-header mb-20">
            <div className="eyebrow">Capabilities</div>
            <h2 className="text-5xl md:text-7xl font-display font-bold text-porcelain mb-8">
              What Wikcia Can Do
            </h2>
            <p className="text-silver-400 text-lg max-w-2xl mx-auto">
              From the CLI to the Desktop app, every tool speaks the same language.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "3D Experiences", desc: "Interactive Three.js visualizations and product showcases.", icon: <Monitor className="w-8 h-8" />, color: "text-orchid" },
              { title: "AI Automation", desc: "Local AI providers, autonomous agents, and MCP integrations.", icon: <Zap className="w-8 h-8" />, color: "text-citron" },
              { title: "Web Deployment", desc: "Vercel-integrated deployment with custom domains and CI/CD.", icon: <Shield className="w-8 h-8" />, color: "text-porcelain" },
            ].map((f) => (
              <div key={f.title} className="card p-12 group">
                <div className={`w-16 h-16 rounded-[22px] bg-orchid/10 flex items-center justify-center mb-10 ${f.color}`}>{f.icon}</div>
                <h4 className="text-3xl font-display font-bold text-porcelain mb-6 group-hover:text-orchid transition-colors">{f.title}</h4>
                <p className="text-sm text-silver-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 section bg-orchid rounded-[40px] overflow-hidden">
        <div className="absolute inset-0 bg-white/10" />
        <div className="container py-40 text-center relative">
          <h2 className="text-5xl md:text-7xl font-display font-bold text-ink-deep mb-10">Ready to build with Wikcia?</h2>
          <p className="text-xl text-ink-deep/70 mb-16 max-w-2xl mx-auto">
            Get in touch with Love & Pixels to start your project.
          </p>
          <a href="mailto:info@byloveandpixels.com" className="inline-block px-12 py-6 rounded-[40px] bg-ink-deep text-orchid font-display font-bold text-xl hover:bg-porcelain hover:text-ink-deep transition-all duration-300">
            Contact Love & Pixels <ArrowRight className="w-5 h-5 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
