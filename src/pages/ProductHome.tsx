import { Link } from 'react-router-dom';
import { Arrow } from '@/components/SiteChrome';
import { ProjectPreview } from './ExperienceHome';
import { projects } from '@/content';
import { ProductIntroduction, ProductTour } from '@/experience/ProductShowcase';
import { Workbench } from '@/experience/Workbench';
import { Ecosystem, ServicesBand, Roadmap } from './Ecosystem';

export function HomePage(){
 return <>
  <section className="hero hero-product" aria-labelledby="hero-title">
   <div className="hero-eyebrow"><span className="eyebrow"><span className="signal-light"/> WIKCIA / CREATIVE TECHNOLOGY & AI</span><span className="hero-edition eyebrow">HUMAN IMAGINATION. INTELLIGENT EXECUTION.</span></div>
   <div className="hero-layout">
    <div className="hero-copy">
     <h1 id="hero-title">Imagine<br/>anything<span className="headline-dot">.</span><br/><span className="hero-final">Make it real.</span></h1>
     <p className="hero-product-dek">AI workspaces. Business software.<br className="desktop-break"/> Digital experiences.</p>
     <p className="hero-product-introduction">We turn ideas into working software: from an agentic desktop workspace to independent SaaS, multilingual commerce and custom engineering.</p>
     <div className="hero-links"><a className="button button-dark" href="#ecosystem">Explore what we build <Arrow/></a><Link className="text-link" to="/contact">Work with us <Arrow/></Link></div>
    </div>
    <div className="hero-art"><figure className="eco-hero-art"><img src="/product/creative-studio.webp" alt="Actual Wikcia Studio Creative Studio development interface" width={1170} height={753} fetchPriority="high"/><figcaption><span>Wikcia Studio / actual interface</span><span>Development capture</span></figcaption></figure></div>
   </div>
   <div className="hero-baseline"><span>ONE CONNECTED MIND. MANY WAYS TO MAKE.</span><a href="#meet-wikcia">TAKE A CLOSER LOOK <span>↓</span></a><span className="hero-coordinate">AI × SOFTWARE × DESIGN</span></div>
  </section>
  <Ecosystem/>
  <ProductIntroduction/>
  <ProductTour/>
  <section className="selected-section section-pad" id="selected-work">
   <div className="section-heading"><span className="eyebrow">03 / THE KIND OF WORK WE MAKE</span><div className="heading-row"><h2>Our work.<br/>Built to be explored.</h2><div><p>A visual look at what design and engineering can bring together. Explore our own software, client engineering and interactive digital concepts. Every website card links to a real interface and uses an authentic capture.</p><Link className="text-link" to="/showcase">Explore all selected work <Arrow/></Link></div></div></div>
   <div className="project-grid">{[3,4,5,0,1,6,2].filter(i=>projects[i]).map((i,n)=><ProjectPreview key={projects[i].id} index={i} large={n===0}/>)}</div>
  </section>
  <ServicesBand/>
  <section className="playground-section section-pad" id="playground">
   <div className="section-heading"><span className="eyebrow">04 / MAKE A LITTLE SOMETHING YOURSELF</span><div className="heading-row"><h2>A small idea.<br/><span className="serif-word">Your signature.</span></h2><div><p>A tiny creative tool. A real vector artifact.<br/>Play with the words, the colour, the composition.<br/>Then take something with you.</p><span className="playground-label">INTERACTIVE DESIGN STUDY / MADE IN YOUR BROWSER</span></div></div></div>
   <Workbench/>
  </section>
  <Roadmap/>
  <section className="principles-band section-pad"><div className="principles-symbol" aria-hidden="true">✳</div><div><span className="eyebrow">POWERFUL, WITH PRINCIPLES.</span><h2>Curious by nature.<br/>Careful by design.</h2><p>Useful automation should make the work lighter without making decisions invisible. Real tools, honest boundaries, and a human in control.</p><Link className="text-link" to="/about#principles">How I work <Arrow/></Link></div><div className="principles-list"><div><span>01</span>Evidence over promises.</div><div><span>02</span>The right tool for the work.</div><div><span>03</span>Your decisions stay yours.</div></div></section>
 </>;
}
