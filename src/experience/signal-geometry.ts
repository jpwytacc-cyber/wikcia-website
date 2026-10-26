import { BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';

/** Exact circular fillets keep the inside edge from pinching at the W's folds. */
function createWPath() {
  const points = [
    new Vector3(-2.32, 1.36, 0), new Vector3(-1.16, -2.0, 0),
    new Vector3(0, 1.5, 0), new Vector3(1.16, -2.0, 0), new Vector3(2.32, 1.36, 0),
  ];
  type Piece = { start: Vector3; end: Vector3; length: number; centre?: Vector3; angle?: number; sweep?: number };
  const pieces: Piece[] = [];
  const radius = 0.54;
  let cursor = points[0];
  for (let i = 1; i < points.length - 1; i++) {
    const incoming = points[i].clone().sub(points[i - 1]).normalize();
    const outgoing = points[i + 1].clone().sub(points[i]).normalize();
    const turn = Math.acos(incoming.dot(outgoing));
    const direction = Math.sign(incoming.x * outgoing.y - incoming.y * outgoing.x);
    const distance = radius * Math.tan(turn / 2);
    const start = points[i].clone().addScaledVector(incoming, -distance);
    const end = points[i].clone().addScaledVector(outgoing, distance);
    const centre = start.clone().add(new Vector3(-incoming.y, incoming.x, 0).multiplyScalar(direction * radius));
    pieces.push({ start: cursor, end: start, length: cursor.distanceTo(start) });
    pieces.push({ start, end, centre, angle: Math.atan2(start.y - centre.y, start.x - centre.x), sweep: direction * turn, length: radius * turn });
    cursor = end;
  }
  pieces.push({ start: cursor, end: points[4], length: cursor.distanceTo(points[4]) });
  const total = pieces.reduce((sum, piece) => sum + piece.length, 0);
  const getPoint = (t: number, target = new Vector3()) => {
    let distance = Math.max(0, Math.min(1, t)) * total;
    let piece = pieces[pieces.length - 1];
    for (const candidate of pieces) {
      piece = candidate;
      if (distance <= piece.length || candidate === pieces[pieces.length - 1]) break;
      distance -= piece.length;
    }
    const u = Math.min(1, distance / piece.length);
    if (piece.centre) {
      const angle = piece.angle! + piece.sweep! * u;
      target.set(piece.centre.x + radius * Math.cos(angle), piece.centre.y + radius * Math.sin(angle), 0);
    } else target.lerpVectors(piece.start, piece.end, u);
    target.z = 0.3 * Math.sin(t * Math.PI * 2 - 0.45);
    return target;
  };
  return {
    getPoint,
    getTangent(t: number, target: Vector3) {
      return target.copy(getPoint(Math.min(t + 0.0001, 1))).sub(getPoint(Math.max(0, t - 0.0001))).normalize();
    },
  };
}

export type SculptureMode = 'ribbon' | 'orbit';

/** A swept, softly edged solid strip. No assets, shaders, or runtime tessellation. */
export function createRibbonGeometry(mode: SculptureMode): BufferGeometry {
  const closed = mode === 'orbit';
  const segments = 192;
  const halfWidth = closed ? 0.36 : 0.45;
  const halfDepth = 0.065;
  const radius = 0.052;
  const section: [number, number][] = [];
  // Six samples on each corner leave broad, genuinely flat satin faces.
  for (let corner = 0; corner < 4; corner++) {
    const sx = corner === 0 || corner === 3 ? 1 : -1;
    const sy = corner < 2 ? 1 : -1;
    for (let step = 0; step < 6; step++) {
      const angle = corner * Math.PI / 2 + step / 5 * Math.PI / 2;
      section.push([
        sx * (halfWidth - radius) + radius * Math.cos(angle),
        sy * (halfDepth - radius) + radius * Math.sin(angle),
      ]);
    }
  }
  section.push(section[0]);
  const ringSize = section.length;
  const curve = createWPath();
  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[][] = [[], [], []];
  const tangent = new Vector3();
  const width = new Vector3();
  const normal = new Vector3();
  const tiltedWidth = new Vector3();
  const tiltedNormal = new Vector3();
  const point = new Vector3();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    if (closed) {
      const angle = t * Math.PI * 2;
      point.set(1.56 * Math.cos(angle), 1.72 * Math.sin(angle), 0.17 * Math.sin(angle * 2));
      tangent.set(-1.56 * Math.sin(angle), 1.72 * Math.cos(angle), 0.34 * Math.cos(angle * 2)).normalize();
    } else {
      curve.getPoint(t, point);
      curve.getTangent(t, tangent);
    }
    // Stable analytic frame: these curves never point along the Z reference.
    width.set(-tangent.y, tangent.x, 0).normalize();
    normal.crossVectors(tangent, width).normalize();
    const twist = closed
      ? 0.44 * Math.sin(t * Math.PI * 2) + 0.22
      : 0.9 + 1.25 * Math.sin(t * Math.PI * 2 - 0.6) + 0.2 * Math.sin(t * Math.PI * 4);
    tiltedWidth.copy(width).multiplyScalar(Math.cos(twist)).addScaledVector(normal, Math.sin(twist));
    tiltedNormal.copy(normal).multiplyScalar(Math.cos(twist)).addScaledVector(width, -Math.sin(twist));
    for (const [u, v] of section) {
      positions.push(
        point.x + u * tiltedWidth.x + v * tiltedNormal.x,
        point.y + u * tiltedWidth.y + v * tiltedNormal.y,
        point.z + u * tiltedWidth.z + v * tiltedNormal.z,
      );
      uvs.push(t, u / (halfWidth * 2) + 0.5);
    }
    if (i === segments) continue;
    for (let j = 0; j < ringSize - 1; j++) {
      const mid = (section[j][1] + section[j + 1][1]) / 2;
      const material = mid > halfDepth * 0.55 ? 0 : mid < -halfDepth * 0.55 ? 1 : 2;
      const a = i * ringSize + j;
      const b = a + ringSize;
      // Counter-clockwise outward faces.
      indices[material].push(a, a + 1, b, a + 1, b + 1, b);
    }
  }
  if (!closed) {
    for (const end of [0, segments]) {
      const base = positions.length / 3;
      const centre = curve.getPoint(end / segments);
      positions.push(centre.x, centre.y, centre.z);
      uvs.push(0.5, 0.5);
      for (let j = 0; j < ringSize; j++) {
        const source = (end * ringSize + j) * 3;
        positions.push(positions[source], positions[source + 1], positions[source + 2]);
        uvs.push(0, 0);
      }
      for (let j = 0; j < ringSize - 1; j++) {
        if (end === 0) indices[2].push(base, base + j + 2, base + j + 1);
        else indices[2].push(base, base + j + 1, base + j + 2);
      }
    }
  }
  const geometry = new BufferGeometry();
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3));
  geometry.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
  const allIndices: number[] = [];
  indices.forEach((group, materialIndex) => {
    geometry.addGroup(allIndices.length, group.length, materialIndex);
    allIndices.push(...group);
  });
  geometry.setIndex(allIndices);
  geometry.computeVertexNormals();
  // Share normals across duplicated UV seams, without welding the flat end caps.
  const normals = geometry.getAttribute('normal');
  const averageNormal = (a: number, b: number) => {
    normal.set(normals.getX(a) + normals.getX(b), normals.getY(a) + normals.getY(b), normals.getZ(a) + normals.getZ(b)).normalize();
    normals.setXYZ(a, normal.x, normal.y, normal.z);
    normals.setXYZ(b, normal.x, normal.y, normal.z);
  };
  for (let i = 0; i <= segments; i++) averageNormal(i * ringSize, i * ringSize + ringSize - 1);
  if (closed) for (let j = 0; j < ringSize; j++) averageNormal(j, segments * ringSize + j);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}
