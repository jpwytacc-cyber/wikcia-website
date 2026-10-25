import React from "react";
import { Link } from "react-router-dom";
import { Monitor, ArrowRight } from "lucide-react";

export function AboutPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Why Wikcia</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              The story behind the platform, the problems we solve, and what
              drives us forward.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="h-64 rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-citron/10 to-orchid/10" />
                <div className="relative h-full flex items-center justify-center p-8">
                  <div className="text-center">
                    <div className="w-20 h-20 rounded-full bg-citron/20 flex items-center justify-center mx-auto mb-6 text-4xl">
                      🤖
                    </div>
                    <h3 className="text-2xl font-display font-bold text-porcelain mb-4">
                      Built to Ship
                    </h3>
                    <p className="text-silver-400 text-sm">
                      Wikcia Studio unifies design, automation, and AI in one
                      platform — from CLI to Desktop app.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-display font-bold text-porcelain mb-4">
                  The Problem
                </h3>
                <p className="text-silver-400 leading-relaxed text-lg">
                  Creative teams juggle a dozen disconnected tools. Designers
                  can't ship code. Developers wait on assets. AI agents live in
                  isolation. Nothing talks to anything. Projects stall.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-porcelain mb-4">
                  The Solution
                </h3>
                <p className="text-silver-400 leading-relaxed text-lg">
                  Wikcia Studio unifies design, automation, and AI in one
                  platform. From the CLI to the Desktop app, every tool speaks
                  the same language. Build once, deploy everywhere.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold text-porcelain mb-4">
                  Our Story
                </h3>
                <p className="text-silver-400 leading-relaxed text-lg">
                  Love & Pixels built Wikcia after years of wrestling with
                  fragmented creative stacks. We needed a platform that could
                  generate images, edit video, run autonomous agents, manage
                  clients, and deploy websites — all from one command line.
                  Wikcia is that platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 section border-y border-white/5">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {[
              {
                title: "Love & Pixels",
                desc: "Parent company — marketing, AI, analytics, consultancy, and business development.",
                link: "https://byloveandpixels.com",
              },
              {
                title: "Bella Beauty Atelier",
                desc: "Premium beauty booking platform on Vercel with real appointment storage.",
                link: "https://bella-beauty-atelier.vercel.app",
              },
              {
                title: "Onyx Auto Studio",
                desc: "Five-language automotive detailing concept with Three.js 3D surface lab.",
                link: "https://onyx-auto-studio-iota.vercel.app",
              },
            ].map((item) => (
              <div key={item.title} className="card p-8 hover:border-citron/50 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-citron/10 flex items-center justify-center text-citron">
                    <Monitor className="w-5 h-5" />
                  </div>
                  <h4 className="font-display font-bold text-porcelain">{item.title}</h4>
                </div>
                <p className="text-sm text-silver-400 leading-relaxed mb-4">
                  {item.desc}
                </p>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-citron font-semibold text-sm hover:text-porcelain transition-colors flex items-center gap-1"
                >
                  Visit site <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
