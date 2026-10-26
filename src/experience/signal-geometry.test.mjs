import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

// Node 26 strips the geometry module's erasable TypeScript; no test dependency.
const geometryPath = new URL('./signal-geometry.ts', import.meta.url);

test('procedural ribbon provides a finite, bounded, solid indexed surface', async () => {
  assert.ok(existsSync(geometryPath), 'the procedural geometry module must exist');
  const { createRibbonGeometry } = await import(geometryPath.href);
  const geometry = createRibbonGeometry('ribbon');
  try {
    const positions = geometry.getAttribute('position');
    const normals = geometry.getAttribute('normal');
    assert.ok(positions.count > 1000 && positions.count < 15000);
    assert.equal(normals.count, positions.count);
    assert.ok([...positions.array, ...normals.array].every(Number.isFinite));
    assert.ok(geometry.index.count < 90000);
    geometry.computeBoundingBox();
    assert.ok(geometry.boundingBox.max.x - geometry.boundingBox.min.x > 4);
    assert.ok(geometry.boundingBox.max.x - geometry.boundingBox.min.x < 6);
    assert.ok(geometry.boundingBox.max.y - geometry.boundingBox.min.y > 2.5);
    assert.deepEqual([...new Set(geometry.groups.map(group => group.materialIndex))].sort(), [0, 1, 2]);
    for (let i = 0; i < normals.count; i++) {
      const magnitude = Math.hypot(normals.getX(i), normals.getY(i), normals.getZ(i));
      assert.ok(Math.abs(magnitude - 1) < 0.0001, `unit normal at ${i}`);
    }
  } finally {
    geometry.dispose();
  }
});

test('ribbon endpoints remain continuous with their adjacent cross sections', async () => {
  const { createRibbonGeometry } = await import(geometryPath.href);
  const geometry = createRibbonGeometry('ribbon');
  try {
    const positions = geometry.getAttribute('position');
    for (let ring = 0; ring < 192; ring++) {
      for (let j = 0; j < 25; j++) {
        const a = ring * 25 + j;
        const b = a + 25;
        const distance = Math.hypot(positions.getX(b) - positions.getX(a), positions.getY(b) - positions.getY(a), positions.getZ(b) - positions.getZ(a));
        assert.ok(distance < 0.15, `continuous sweep at ring ${ring}: ${distance}`);
      }
    }
  } finally { geometry.dispose(); }
});

test('orbit is a distinct, closed sculpture surface', async () => {
  assert.ok(existsSync(geometryPath), 'the procedural geometry module must exist');
  const { createRibbonGeometry } = await import(geometryPath.href);
  const geometry = createRibbonGeometry('orbit');
  const ribbon = createRibbonGeometry('ribbon');
  try {
    assert.notDeepEqual(geometry.getAttribute('position').array, ribbon.getAttribute('position').array);
    const positions = geometry.getAttribute('position');
    const ringSize = 25;
    const last = positions.count - ringSize;
    for (let i = 0; i < ringSize; i++) {
      for (const axis of ['X', 'Y', 'Z']) {
        assert.ok(Math.abs(positions[`get${axis}`](i) - positions[`get${axis}`](last + i)) < 0.00001);
      }
    }
  } finally {
    geometry.dispose();
    ribbon.dispose();
  }
});

test('scene contract includes accessible controls, fallback, lifecycle and bounded DPR', () => {
  const sourcePath = new URL('./SignalScene.tsx', import.meta.url);
  assert.ok(existsSync(sourcePath), 'the scene module must exist');
  const source = readFileSync(sourcePath, 'utf8');
  for (const contract of ['aria-pressed', 'aria-label', 'data-signal-mode', 'data-signal-renderer', 'prefers-reduced-motion', 'IntersectionObserver', 'visibilitychange', 'cancelAnimationFrame', 'forceContextLoss', 'ResizeObserver', 'webglcontextlost']) {
    assert.ok(source.includes(contract), `scene contract: ${contract}`);
  }
  assert.match(source, /Math\.min\(window\.devicePixelRatio[^\n]*1\.5\)/);
  assert.match(source, /export default function SignalScene/);
});
