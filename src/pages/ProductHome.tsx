import { Link } from 'react-router-dom';
import { Arrow } from '@/components/SiteChrome';
import { Sculpture, ProjectPreview } from './ExperienceHome';
import { ProductIntroduction, ProductTour } from '@/experience/ProductShowcase';
import { Workbench } from '@/experience/Workbench';

export function HomePage(){
 return <>
  <section className="hero hero-product" aria-labelledby="hero-title">
   <div className="hero-eyebrow"><span className="eyebrow"><span className="signal-light"/> WIKCIA STUDIO / AI AGENTIC SOFTWARE</span><span className="hero-edition eyebrow">HUMAN IMAGINATION. INTELLIGENT EXECUTION.</span></div>
   <div className="hero-layout">
    <div className="hero-copy">
     <h1 id="hero-title">Imagine<br/>anything<span className="headline-dot">.</span><br/><span className="hero-final">Make it real.</span></h1>
     <p className="hero-product-dek">Your AI agent for online marketing,<br className="desktop-break"/> outreach and web design.</p>
     <p className="hero-product-introduction">I’m Wikcia. I help you turn a business idea into a clear direction, a considered message and a digital experience worth exploring.</p>
     <div className="hero-links"><a className="button button-dark" href="#product-demo">See Wikcia in action <Arrow/></a><a className="text-link" href="#meet-wikcia">Meet your new workspace <Arrow/></a></div>
    </div>
    <div className="hero-art"><Sculpture/></div>
   </div>
   <div className="hero-baseline"><span>ONE CONNECTED MIND. MANY WAYS TO MAKE.</span><a href="#meet-wikcia">TAKE A CLOSER LOOK <span>↓</span></a><span className="hero-coordinate">MARKETING × OUTREACH × WEB DESIGN</span></div>
  </section>
  <ProductIntroduction/>
  <ProductTour/>
  <section className="selected-section section-pad" id="selected-work">
   <div className="section-heading"><span className="eyebrow">03 / THE KIND OF WORK WE MAKE</span><div className="heading-row"><h2>Different worlds.<br/>The same care.</h2><div><p>A visual look at what design and engineering can bring together. Actual sites from the Love & Pixels universe—not anonymous stock placeholders.</p><Link className="text-link" to="/showcase">Explore all selected work <Arrow/></Link></div></div></div>
   <div className="project-grid"><ProjectPreview index={0} large/><ProjectPreview index={1}/></div>
  </section>
  <section className="playground-section section-pad" id="playground">
   <div className="section-heading"><span className="eyebrow">04 / MAKE A LITTLE SOMETHING YOURSELF</span><div className="heading-row"><h2>A small idea.<br/><span className="serif-word">Your signature.</span></h2><div><p>A tiny creative tool. A real vector artifact.<br/>Play with the words, the colour, the composition.<br/>Then take something with you.</p><span className="playground-label">INTERACTIVE DESIGN STUDY / MADE IN YOUR BROWSER</span></div></div></div>
   <Workbench/>
  </section>
  <section className="principles-band section-pad"><div className="principles-symbol" aria-hidden="true">✳</div><div><span className="eyebrow">POWERFUL, WITH PRINCIPLES.</span><h2>Curious by nature.<br/>Careful by design.</h2><p>Useful automation should make the work lighter without making decisions invisible. Real tools, honest boundaries, and a human in control.</p><Link className="text-link" to="/about#principles">How I work <Arrow/></Link></div><div className="principles-list"><div><span>01</span>Evidence over promises.</div><div><span>02</span>The right tool for the work.</div><div><span>03</span>Your decisions stay yours.</div></div></section>
 </>;
}
