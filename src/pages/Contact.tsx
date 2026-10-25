import React, { useState } from "react";

export function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="card p-12 text-center max-w-md w-full">
          <div className="w-16 h-16 rounded-full bg-citron/10 flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">✓</span>
          </div>
          <h2 className="text-2xl font-display font-bold text-porcelain mb-2">
            Message sent
          </h2>
          <p className="text-silver-400 mb-8">
            Thanks for reaching out. The Love & Pixels team will get back to you soon.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="btn btn-primary"
          >
            Send another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16 text-center">
            <h2 className="font-display">Contact</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              Ready to build with Wikcia? Get in touch with the Love & Pixels team.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-porcelain mb-2">
                  Your name
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-porcelain focus:border-citron focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-porcelain mb-2">
                  Email address
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-porcelain focus:border-citron focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-porcelain mb-2">
                  Your message
                </label>
                <textarea
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-porcelain focus:border-citron focus:outline-none transition-colors"
                />
              </div>
              <button type="submit" className="btn btn-primary w-full">
                Send message
              </button>
            </form>

            <div className="space-y-8">
              <div className="card p-6">
                <h3 className="text-xl font-display font-bold text-porcelain mb-3">
                  Love & Pixels sp z o.o.
                </h3>
                <p className="text-silver-400 text-sm mb-4">
                  Marketing, AI, analytics, consultancy and business development.
                </p>
                <p className="text-silver-400 text-sm">
                  <span className="font-medium text-porcelain">Email:</span>{" "}
                  info@byloveandpixels.com
                </p>
                <p className="text-silver-400 text-sm mt-2">
                  <span className="font-medium text-porcelain">Website:</span>{" "}
                  byloveandpixels.com
                </p>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-display font-bold text-porcelain mb-3">
                  Built with Wikcia
                </h3>
                <p className="text-silver-400 text-sm mb-4">
                  CLI · Desktop · 40+ skills · MCP servers · Local AI
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/jpwytacc-cyber/wikcia-studio-rebrand"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-citron hover:text-porcelain transition-colors"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
