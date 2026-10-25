import React from "react";
import { Link } from "react-router-dom";
import { Showcase3D } from "@/three/Showcase3D";
import { showcaseItems } from "@/data/showcase";

export function ShowcasePage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Showcase3D className="absolute inset-0 -z-10 opacity-30" />

      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-12">
            <h2 className="font-display">Showcase</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              What Wikcia has built — and what you can build with it. Real projects,
              real automation, real results.
            </p>
          </div>

          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            {showcaseItems.map((item) => (
              <article
                key={item.id}
                className="card group relative overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden mb-6">
                  <Showcase3D className="absolute inset-0 z-0 opacity-20" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6 z-20">
                    <span className="text-citron font-semibold">View project →</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-citron tracking-wider uppercase">
                    {item.tags.join(" · ")}
                  </span>
                  <h3 className="text-2xl font-display font-bold text-porcelain group-hover:text-citron transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-silver-400 leading-relaxed">{item.subtitle}</p>
                  <p className="text-sm text-silver-500">{item.description}</p>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-citron hover:text-porcelain transition-colors"
                >
                  Open project <span className="w-3 h-3 border-b border-citron" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
