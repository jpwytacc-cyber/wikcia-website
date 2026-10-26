import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageTransition } from "@/components/PageTransition";
import { Locale } from "@/i18n";
import { HomePage as Home } from "@/pages/Home";
import { AboutPage as About } from "@/pages/About";
import { ShowcasePage as Showcase } from "@/pages/Showcase";
import { SkillsPage as Skills } from "@/pages/Skills";
import { ToolsPage as Tools } from "@/pages/Tools";
import { AppsPage as Apps } from "@/pages/Apps";
import { BlogPage as Blog } from "@/pages/Blog";
import { FAQPage as FAQ } from "@/pages/FAQ";
import { ContactPage as Contact } from "@/pages/Contact";

function App() {
  const [locale] = useState<Locale>("en");

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-ink-deep text-porcelain selection:bg-orchid selection:text-ink-deep overflow-x-hidden">
        <Navbar locale={locale} />
        <main>
          <PageTransition locale={locale}>
            <Routes>
              <Route path="/" element={<Home locale={locale} />} />
              <Route path="/about" element={<About />} />
              <Route path="/showcase" element={<Showcase />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/tools" element={<Tools />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer locale={locale} />
      </div>
    </BrowserRouter>
  );
}

export default App;
