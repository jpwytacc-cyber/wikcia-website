import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {projects,capabilities,notes,workflowStories,faqs} from '../src/content.ts';

test('selected projects are unique, real local captures with transparent concept disclosures',()=>{
 assert.equal(projects.length,3);assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);
 for(const p of projects){assert.ok(p.url.startsWith('https://'));assert.ok(existsSync(`public${p.image}`));assert.ok(p.description.length>50);assert.ok(p.note.length>50);assert.ok(!p.image.includes('unsplash'));}
 for(const id of ['onyx','bella'])assert.match(projects.find(p=>p.id===id).note,/concept/i);
});
test('capability filter dataset has all four disciplines and no duplicated names',()=>{
 assert.deepEqual([...new Set(capabilities.map(c=>c.category))].sort(),['Build','Connect','Create','Discover']);
 assert.equal(new Set(capabilities.map(c=>c.name)).size,capabilities.length);
 for(const c of capabilities){assert.ok(c.detail.length>40);assert.ok(c.tools.length>10);}
});
test('field notes have full readable bodies rather than teaser-only dead ends',()=>{
 assert.equal(new Set(notes.map(n=>n.slug)).size,notes.length);for(const n of notes){assert.equal(n.sections.length,3);for(const [heading,text] of n.sections){assert.ok(heading.length>5);assert.ok(text.length>100);}}
});
test('workflow illustrations have a complete four-stage sequence and a disclosed outcome',()=>{
 for(const s of workflowStories){assert.equal(s.stages.length,4);assert.deepEqual(s.stages.map(s=>s[0]),['01','02','03','04']);assert.ok(s.outcome.length>30);}
});
test('FAQ explicitly describes inference, local/cloud privacy and concept boundaries',()=>{
 const copy=faqs.flat().join(' ');assert.match(copy,/does not send a prompt to an AI model/);assert.match(copy,/cloud model/);assert.match(copy,/not claims of client work/);
});
test('production HTML uses the real public origin and local licensed fonts',()=>{
 const html=readFileSync('index.html','utf8');assert.ok(!html.includes('https://wikcia.com'));assert.ok(!html.includes('fonts.googleapis'));assert.match(html,/<noscript>/);assert.match(html,/canonical.*wikcia-website.vercel.app/);
 for(const name of ['space','instrument-italic']){const data=readFileSync(`public/fonts/${name}.woff2`);assert.equal(data.subarray(0,4).toString(),'wOF2');assert.ok(existsSync(`public/fonts/${name}-OFL.txt`));}
});
test('hosting fallback covers page routes but does not rewrite static asset requests',()=>{
 const config=JSON.parse(readFileSync('vercel.json','utf8'));assert.equal(config.rewrites.length,1);const expression=new RegExp('^'+config.rewrites[0].source+'$');
 for(const route of ['/','/about','/blog/beyond-the-prompt','/skills','/en/about'])assert.ok(expression.test(route),route);
 for(const asset of ['/assets/site.js','/fonts/space.woff2','/work/onyx.jpg','/robots.txt','/sitemap.xml'])assert.equal(expression.test(asset),false,asset);
});
