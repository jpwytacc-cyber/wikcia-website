export type ArtifactPalette = 'ink' | 'lilac' | 'acid';
export type ArtifactComposition = 'ribbon' | 'orbit' | 'contour';

export interface ArtifactSettings {
  title: string;
  palette: ArtifactPalette;
  composition: ArtifactComposition;
}

export const DEFAULT_SETTINGS: Readonly<ArtifactSettings> = Object.freeze({
  title: 'Beyond ordinary',
  palette: 'ink',
  composition: 'ribbon',
});

export const ARTIFACT_PALETTES = [
  { value: 'ink', label: 'Ink', description: 'Carbon + acid', background: '#17181d', foreground: '#d8ff85' },
  { value: 'lilac', label: 'Lilac', description: 'Soft + electric', background: '#a993f7', foreground: '#17181d' },
  { value: 'acid', label: 'Acid', description: 'Sharp + luminous', background: '#d8ff85', foreground: '#17181d' },
] as const;

export const ARTIFACT_COMPOSITIONS = [
  { value: 'ribbon', label: 'Ribbon', description: 'A continuous twist' },
  { value: 'orbit', label: 'Orbital', description: 'Order in motion' },
  { value: 'contour', label: 'Contour', description: 'A shifting landscape' },
] as const;

const MATERIALS = {
  ink: { paper: '#17181d', type: '#f1f0e9', line: '#d8ff85', accent: '#a993f7' },
  lilac: { paper: '#a993f7', type: '#17181d', line: '#17181d', accent: '#f1f0e9' },
  acid: { paper: '#d8ff85', type: '#17181d', line: '#17181d', accent: '#7260b5' },
};

const number = (value: number) => value.toFixed(2);

function escapeXml(value: string): string {
  const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' };
  return value
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\ufffe\uffff]/g, '')
    .replace(/[&<>"']/g, character => entities[character]);
}

function ribbonGraphic(color: string): string {
  // A projected Möbius surface. Each line follows a different strip coordinate.
  const paths = Array.from({ length: 82 }, (_, index) => {
    const width = (index / 81 - 0.5) * 214;
    const points = Array.from({ length: 145 }, (_, step) => {
      const t = (step / 144) * Math.PI * 2;
      const radius = 213 + width * Math.cos(t / 2);
      const x = radius * Math.cos(t);
      const y = radius * Math.sin(t);
      const z = width * Math.sin(t / 2);
      return `${step ? 'L' : 'M'}${number(450 + x * 1.11 + y * 0.25)} ${number(687 + (y * 0.79 - x * 0.25 + z * 1.24) * 0.74)}`;
    });
    return `<path d="${points.join('')}"/>`;
  }).join('');
  return `<g fill="none" stroke="${color}" stroke-width="1.35" stroke-linecap="round">${paths}</g>`;
}

function orbitGraphic(color: string, accent: string): string {
  const paths = Array.from({ length: 66 }, (_, index) => {
    const latitude = ((index % 33) / 32 - 0.5) * Math.PI;
    const points = Array.from({ length: 121 }, (_, step) => {
      const t = (step / 120) * Math.PI * 2;
      const radius = 232;
      const x = radius * Math.cos(latitude) * Math.cos(t);
      const y = index < 33 ? radius * Math.sin(latitude) : radius * Math.sin(t);
      const z = index < 33 ? radius * Math.cos(latitude) * Math.sin(t) : radius * Math.cos(t) * Math.sin(latitude);
      return `${step ? 'L' : 'M'}${number(450 + x * 0.91 - y * 0.4)} ${number(688 + y * 0.83 + x * 0.36 - z * 0.44)}`;
    });
    return `<path d="${points.join('')}"/>`;
  }).join('');
  return `<g fill="none" stroke="${color}" stroke-width="1.1">${paths}</g><ellipse cx="450" cy="688" rx="345" ry="94" transform="rotate(-28 450 688)" fill="none" stroke="${accent}" stroke-width="2"/><circle cx="150" cy="820" r="13" fill="${accent}"/>`;
}

function contourGraphic(color: string): string {
  const paths = Array.from({ length: 66 }, (_, index) => {
    const points = Array.from({ length: 121 }, (_, step) => {
      const u = step / 120;
      const envelope = Math.pow(Math.sin(u * Math.PI), 1.2);
      const height = Math.sin(u * Math.PI * 3 + index * 0.072) * 77 + Math.cos(u * Math.PI * 5 - index * 0.035) * 38;
      return `${step ? 'L' : 'M'}${number(96 + u * 708)} ${number(688 + (451 + index * 6.45 + height * envelope - 633) * 0.84)}`;
    });
    return `<path d="${points.join('')}"/>`;
  }).join('');
  return `<g fill="none" stroke="${color}" stroke-width="1.4" stroke-linecap="round">${paths}</g>`;
}

/** Pure and deterministic: this exact string is both the preview and the download. */
export function buildArtifact(settings: Readonly<ArtifactSettings> = DEFAULT_SETTINGS): string {
  const material = MATERIALS[settings.palette];
  const words = settings.title.split(' ');
  let split = 1;
  let balance = Infinity;
  for (let i = 1; i < words.length; i++) {
    const difference = Math.abs(words.slice(0, i).join(' ').length - words.slice(i).join(' ').length);
    if (difference < balance) { balance = difference; split = i; }
  }
  const lines = words.length > 1 ? [words.slice(0, split).join(' '), words.slice(split).join(' ')] : [settings.title];
  const longest = Math.max(...lines.map(line => Array.from(line).length), 1);
  const fontSize = Math.min(156, 765 / (longest * 0.66));
  const title = lines.map((line, index) => {
    const characters = Array.from(line).length;
    const spacing = fontSize * -0.025;
    // An explicit advance keeps even wide glyphs and CJK inside the print margins,
    // independent of which local system font renders the self-contained SVG.
    const advance = Math.min(780, Math.max(0, characters * fontSize * 0.67 + Math.max(0, characters - 1) * spacing));
    return `<text x="58" y="${lines.length === 1 ? 292 : 226 + index * 143}" font-size="${number(fontSize)}" font-weight="800" letter-spacing="${number(spacing)}" textLength="${number(advance)}" lengthAdjust="spacingAndGlyphs" xml:space="preserve">${escapeXml(line)}</text>`;
  }).join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="900" height="1120" viewBox="0 0 900 1120" role="img" aria-label="Generative typographic poster">
<title>${escapeXml(settings.title)}</title>
<desc>A browser-only design study by Wikcia. ${settings.composition} composition in the ${settings.palette} palette. No AI inference.</desc>
<rect width="900" height="1120" fill="${material.paper}"/>
<g fill="${material.type}" font-family="Arial, Helvetica, sans-serif">
<g font-family="monospace" font-size="12" letter-spacing="2"><text x="60" y="65">WIKCIA / FORM STUDIES</text><text x="840" y="65" text-anchor="end">EDITION 001</text></g>
<path d="M60 97H840" stroke="${material.type}" stroke-opacity=".35"/>
${title}
<circle cx="450" cy="687" r="252" fill="${material.accent}" opacity=".065"/>
${settings.composition === 'ribbon' ? ribbonGraphic(material.line) : settings.composition === 'orbit' ? orbitGraphic(material.line, material.accent) : contourGraphic(material.line)}
<g fill="${material.accent}"><path d="M780 410v38m-19-19h38" stroke="${material.accent}" stroke-width="2"/><circle cx="112" cy="879" r="5"/></g>
<g font-family="monospace" font-size="11" letter-spacing="1.5"><text x="60" y="954">${settings.composition.toUpperCase()} / ${settings.palette.toUpperCase()}</text><text x="840" y="954" text-anchor="end">900 × 1120</text></g>
<path d="M60 985H840" stroke="${material.type}" stroke-opacity=".35"/>
<text x="60" y="1041" font-size="21" letter-spacing="-.5">A little structure. A lot of possibility.</text>
<g transform="translate(798 1010)" fill="none" stroke="${material.type}" stroke-width="2"><path d="M0 30 30 0M0 0h30v30"/></g>
<g font-family="monospace" font-size="10" letter-spacing="1.5"><text x="60" y="1081">DESIGNED IN YOUR BROWSER</text><text x="840" y="1081" text-anchor="end">NO TWO IDEAS ALIKE.</text></g>
</g></svg>`;
}
