import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface PageTransitionProps {
  children: React.ReactNode;
  locale: string;
}

export function PageTransition({ children, locale }: PageTransitionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(
      "[data-page-animate]",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power4.out" },
      0.05
    );
    setMounted(true);

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [locale]);

  return (
    <div className="min-h-screen overflow-hidden" data-page-animate>
      {mounted ? children : null}
    </div>
  );
}

export function useScrollReveal(ref: React.RefObject<HTMLElement>, options = {}) {
  useEffect(() => {
    if (!ref.current) return;
    const tween = gsap.fromTo(
      ref.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 82%",
          once: true,
        },
      }
    );
    return () => { tween.kill(); };
  }, [ref]);
}
