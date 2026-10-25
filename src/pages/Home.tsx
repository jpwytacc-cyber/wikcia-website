import React from "react";
import { Link } from "react-router-dom";
import { Hero3D } from "@/three/Hero3D";
import { ArrowRight, Play, Monitor, Zap, Shield, Layers } from "lucide-react";

export function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Hero3D className="absolute inset-0 -z-10" />

      {/* Hero Section */}
      <section className="relative z-10 flex items-center justify-center min-h-[90vh] px-6">
        <div className="container text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-citron/10 border border-citron/20 text-citron text-xs font-bold uppercase tracking-widest mb-8 animate-pulse-slow">
            <span className="w-2 h-2 rounded-full bg-citron animate-pulse" />
            Wikcia Studio v0.22.2 · Release Candidate
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-bold text-porcelain mb-6 leading-tight">
            Imagine anything.<br />
            <span className="text-citron">Make it real.</span>
          </h1>
          <p className="text-xl md:text-2xl text-silver-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            The proprietary creative and automation platform by Love & Pixels.
            3D experiences, AI agents, workflow automation, and interactive
            digital products — built to ship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:info@byloveandpixels.com"
              className="btn btn-primary w-full sm:w-auto"
            >
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </a>
            <Link to="/showcase" className="btn btn-secondary w-full sm:w-auto">
              View Showcase <Play className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats / Features */}
      <section className="relative z-10 section py-16 border-y border-white/5">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-display font-bold text-citron mb-2">40+</div>
              <div className="text-sm text-silver-400">Skills installed</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-citron mb-2">3</div>
              <div className="text-sm text-silver-400">Live websites</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-citron mb-2">5</div>
              <div className="text-sm text-silver-400">Languages</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-citron mb-2">3</div>
              <div className="text-sm text-silver-400">AI providers</div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">What Wikcia Can Do</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              From the CLI to the Desktop app, every tool speaks the same language.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "3D Experiences",
                desc: "Interactive Three.js visualizations and product showcases.",
                icon: <Monitor className="w-6 h-6" />,
              },
              {
                title: "AI Automation",
                desc: "Local AI providers, autonomous agents, and MCP integrations.",
                icon: <Zap className="w-6 h-6" />,
              },
              {
                title: "Web Deployment",
                desc: "Vercel-integrated deployment with custom domains and CI/CD.",
                icon: <Shield className="w-6 h-6" />,
              },
              {
                title: "Multilingual",
                desc: "Full i18n support across EN, NL, DE, PL, and EL.",
                icon: <Layers className="w-6 h-6" />,
              },
            ].map((feature) => (
              <div key={feature.title} className="card p-8">
                <div className="w-12 h-12 rounded-xl bg-citron/10 flex items-center justify-center mb-6 text-citron">
                  {feature.icon}
                </div>
                <h4 className="text-xl font-display font-bold text-porcelain mb-3">
                  {feature.title}
                </h4>
                <p className="text-silver-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 section bg-citron/5 rounded-3xl border border-citron/10">
        <div className="container py-20 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-ink mb-6">
            Ready to build with Wikcia?
          </h2>
          <p className="text-lg text-ink/80 mb-10 max-w-2xl mx-auto">
            Get in touch with Love & Pixels to start your project.
          </p>
          <a
            href="mailto:info@byloveandpixels.com"
            className="btn btn-primary text-ink"
          >
            Contact Love & Pixels <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </section>
    </div>
  );
}
