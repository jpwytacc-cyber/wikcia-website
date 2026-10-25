import React from "react";
import { apps } from "@/data/apps";

export function AppsPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Connected Apps</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              The Wikcia application hub — desktop, CLI, and web applications
              that connect to your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {apps.map((app) => (
              <div key={app.id} className="card p-8">
                <div className="w-12 h-12 rounded-2xl bg-citron/10 flex items-center justify-center mb-6 text-2xl">
                  {app.icon}
                </div>
                <h3 className="text-xl font-display font-bold text-porcelain mb-3">
                  {app.name}
                </h3>
                <p className="text-sm text-silver-400 leading-relaxed mb-6">
                  {app.description}
                </p>
                <div className="flex items-center gap-2 text-xs font-semibold text-citron uppercase tracking-wider">
                  {app.platform}
                  <span className="w-2 h-2 rounded-full bg-citron" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
