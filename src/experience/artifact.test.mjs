import test from 'node:test';
import assert from 'node:assert/strict';

const { buildArtifact, DEFAULT_SETTINGS, ARTIFACT_PALETTES, ARTIFACT_COMPOSITIONS } = await import('./artifact.ts');

test('defaults produce a deterministic, substantial standalone SVG poster', () => {
  assert.equal(DEFAULT_SETTINGS.title, 'Beyond ordinary');
  const svg = buildArtifact(DEFAULT_SETTINGS);
  assert.equal(svg, buildArtifact(DEFAULT_SETTINGS));
  assert.match(svg, /^<svg\b/);
  assert.match(svg, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
  assert.match(svg, /viewBox="0 0 900 1120"/);
  assert.ok(svg.length > 15000);
  assert.ok((svg.match(/<path\b/g) ?? []).length >= 60);
  assert.ok(svg.includes('<title>Beyond ordinary</title>'));
});

test('escapes user title in metadata and visible type, including XML metacharacters', () => {
  const title = `A & B <script> "it's"`;
  const svg = buildArtifact({ ...DEFAULT_SETTINGS, title });
  assert.ok(svg.includes('<title>A &amp; B &lt;script&gt; &quot;it&apos;s&quot;</title>'));
  assert.ok(!svg.includes('<script>'));
  assert.ok(!svg.includes('A & B'));
});

for (const palette of ARTIFACT_PALETTES) {
  for (const composition of ARTIFACT_COMPOSITIONS) {
    test(`${palette.value}/${composition.value} is deterministic, standalone and preserves its exact title`, () => {
      const settings = { title: 'Form & feeling — 你好', palette: palette.value, composition: composition.value };
      const svg = buildArtifact(settings);
      assert.equal(svg, buildArtifact(settings));
      assert.ok(svg.includes('<title>Form &amp; feeling — 你好</title>'));
      assert.ok(svg.includes(`fill="${palette.background}"`));
      assert.doesNotMatch(svg, /<(?:script|image|foreignObject|style|animate|set)\b|\bon\w+=|\bhref=|url\(|NaN|Infinity/i);
      assert.doesNotMatch(svg.replace('http://www.w3.org/2000/svg', ''), /https?:\/\//);
      assert.ok((svg.match(/<path\b/g) ?? []).length > 35);
    });
  }
}

test('all three compositions change actual geometry, not just the caption', () => {
  const geometry = ARTIFACT_COMPOSITIONS.map(composition => {
    const svg = buildArtifact({ ...DEFAULT_SETTINGS, composition: composition.value });
    return [...svg.matchAll(/<path d="([^"]+)"/g)].map(match => match[1]).join('|');
  });
  assert.equal(new Set(geometry).size, 3);
});

test('empty, long and Unicode titles remain safe and finite', () => {
  for (const title of ['', 'MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM', 'Æther ↗ 你好 ✨', '  Two   words  ', 'A\u0000B']) {
    const svg = buildArtifact({ ...DEFAULT_SETTINGS, title });
    assert.doesNotMatch(svg, /NaN|Infinity|\u0000/);
  }
});

test('title advances stay within the print margins for wide and Unicode glyphs', () => {
  for (const title of ['M'.repeat(32), '你'.repeat(32), 'Beyond ordinary']) {
    const svg = buildArtifact({ ...DEFAULT_SETTINGS, title });
    const advances = [...svg.matchAll(/textLength="([\d.]+)"/g)].map(match => Number(match[1]));
    assert.ok(advances.length > 0);
    assert.ok(advances.every(advance => advance > 0 && advance <= 780));
    assert.equal((svg.match(/lengthAdjust="spacingAndGlyphs"/g) ?? []).length, advances.length);
  }
});

test('every composition keeps its linework clear of the headline and footer', () => {
  for (const composition of ARTIFACT_COMPOSITIONS) {
    const svg = buildArtifact({ ...DEFAULT_SETTINGS, composition: composition.value });
    const group = svg.match(/<g fill="none" stroke="[^"]+"[^>]*>([\s\S]*?)<\/g>/)?.[1];
    assert.ok(group);
    const points = [...group.matchAll(/[ML]([\d.]+) ([\d.]+)/g)].map(match => ({ x: Number(match[1]), y: Number(match[2]) }));
    assert.ok(points.length > 1000);
    assert.ok(points.every(point => point.x >= 60 && point.x <= 840 && point.y >= 430 && point.y <= 940), `${composition.value} overlaps the type or print margins`);
  }
});

test('building does not mutate settings and defaults are immutable', () => {
  const settings = Object.freeze({ ...DEFAULT_SETTINGS });
  buildArtifact(settings);
  assert.deepEqual(settings, DEFAULT_SETTINGS);
  assert.ok(Object.isFrozen(DEFAULT_SETTINGS));
  assert.equal(buildArtifact(), buildArtifact(DEFAULT_SETTINGS));
});
