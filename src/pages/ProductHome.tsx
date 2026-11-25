import { Link } from 'react-router-dom';
import { Arrow } from '@/components/SiteChrome';
import { ProjectPreview } from './ExperienceHome';
import { projects } from '@/content';
import { ProductIntroduction, ProductTour } from '@/experience/ProductShowcase';
import { Workbench } from '@/experience/Workbench';
import { Ecosystem, ServicesBand, Roadmap } from './Ecosystem';
import { CommercialHero, SalesOffers, PartnershipSection } from './Commercial';
export function HomePage(){return <>
<CommercialHero/>
<ProductIntroduction/>
<Ecosystem/>
<SalesOffers/>
<section className="selected-section section-pad" id="selected-work"><div className="section-heading"><span className="eyebrow">PROOF OF WORK / REAL INTERFACES</span><div className="heading-row"><h2>Built to<br/>be explored.</h2><div><p>From AI companion platforms to custom commerce and immersive brand experiences. Explore actual public websites and development previews.</p><Link className="text-link" to="/showcase">Explore the full portfolio <Arrow/></Link></div></div></div><div className="project-grid">{['dearrose','embroart','vanta','kern','atlas'].map((id,n)=>{const i=projects.findIndex(p=>p.id===id);return i>=0?<ProjectPreview key={id} index={i} large={n===0}/>:null})}</div><Link className="button button-dark" to="/showcase">See all projects <Arrow/></Link></section>
<PartnershipSection/><ServicesBand/><ProductTour/>
<section className="playground-section section-pad" id="playground"><div className="section-heading"><span className="eyebrow">INTERACTIVE DESIGN STUDY</span><div className="heading-row"><h2>Make something<br/><span className="serif-word">of your own.</span></h2><p>Create a downloadable SVG artwork directly in your browser.</p></div></div><Workbench/></section><Roadmap/></>}
