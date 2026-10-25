import React from "react";
import { faqs } from "@/data/faq";

export function FAQPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Frequently Asked Questions</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              Everything you need to know about Wikcia Studio, from installation
              to enterprise deployment.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="card p-6 border-l-2 border-l-citron">
                <h4 className="text-lg font-display font-bold text-porcelain mb-3">
                  {faq.q}
                </h4>
                <p className="text-silver-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
