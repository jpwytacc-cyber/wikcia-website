import React from "react";
import { blogPosts } from "@/data/blog";

export function BlogPage() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <section className="relative z-10 section">
        <div className="container">
          <div className="section-header mb-16">
            <h2 className="font-display">Dev News</h2>
            <p className="text-silver-400 max-w-2xl mx-auto">
              Behind the build. Engineering notes, release updates, and deep
              dives into the Wikcia platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.id} className="card p-8 group">
                <div className="h-48 rounded-xl overflow-hidden mb-6 bg-white/5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex gap-2 mb-3">
                  {post.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 rounded bg-white/5 text-[10px] font-semibold text-citron uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-display font-bold text-porcelain mb-2 group-hover:text-citron transition-colors">
                  {post.title}
                </h3>
                <p className="text-silver-400 text-sm leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-xs text-silver-500">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
