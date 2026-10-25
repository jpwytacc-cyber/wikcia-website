import React from "react";
import { skills } from "@/data/skills";

export function SkillsPage() {
  const categories = [...new Set(skills.map((s) => s.category))];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Skills & Capabilities</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              Wikcia Studio ships with 40+ installed skills spanning creative,
              development, DevOps, research, media, and business automation.
            </p>
          </div>

          {categories.map((category) => (
            <section key={category} className="mb-16">
              <h3 className="text-2xl font-display font-bold text-porcelain mb-8">
                {category}
              </h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {skills
                  .filter((s) => s.category === category)
                  .map((skill) => (
                    <div key={skill.id} className="card p-6">
                      <div className="w-10 h-10 rounded-lg bg-citron/10 flex items-center justify-center mb-4">
                        <span className="text-xl">{skill.icon}</span>
                      </div>
                      <h4 className="text-lg font-display font-bold text-porcelain mb-2">
                        {skill.title}
                      </h4>
                      <p className="text-sm text-silver-400 leading-relaxed">
                        {skill.description}
                      </p>
                    </div>
                  ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
