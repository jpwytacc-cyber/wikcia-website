import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

interface CoreSceneProps {
  label?: string;
  className?: string;
}

export function CoreScene({ label = "Wikcia Studio", className = "" }: CoreSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    mq.addEventListener("change", (e) => setReducedMotion(e.matches));
    try {
      const c = document.createElement("canvas");
      setWebglAvailable(!!(c.getContext("webgl2") || c.getContext("webgl")));
    } catch { setWebglAvailable(false); }
    return () => mq.removeEventListener("change", () => {});
  }, []);

  useEffect(() => {
    if (reducedMotion || !webglAvailable || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 420;
    const dpr = Math.min(window.devicePixelRatio, 1.5);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0d0e12);
    scene.fog = new THREE.Fog(0x0d0e12, 4, 28);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 40);
    camera.position.set(0, 1.5, 11);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(dpr);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xf4efe7, 0.25));

    const pl1 = new THREE.PointLight(0xa993f7, 1.5, 20);
    pl1.position.set(6, 6, 4);
    scene.add(pl1);
    const pl2 = new THREE.PointLight(0xd8ff85, 1.2, 20);
    pl2.position.set(-5, -3, 4);
    scene.add(pl2);

    const nodeCount = 14;
    const nodes: THREE.Mesh<THREE.IcosahedronGeometry, THREE.MeshPhysicalMaterial>[] = [];
    const edges: { line: THREE.Line<THREE.BufferGeometry, THREE.LineBasicMaterial>; i: number; j: number }[] = [];
    const links = [
      [0,1],[0,2],[0,3],[1,4],[1,5],[2,6],[2,7],[3,8],[3,9],
      [4,10],[4,11],[5,10],[5,11],[6,8],[7,9],[10,11],[6,11],[7,10]
    ];
    const colors = [0xa993f7, 0xd8ff85, 0xf4efe7];

    for (let i = 0; i < nodeCount; i++) {
      const geo = new THREE.IcosahedronGeometry(0.35 + Math.random() * 0.25, 2);
      const col = new THREE.Color(colors[i % colors.length]);
      const mat = new THREE.MeshPhysicalMaterial({
        color: col, emissive: col, emissiveIntensity: 0.3,
        metalness: 0.4, roughness: 0.2, transparent: true, opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set((Math.random()-0.5)*13, (Math.random()-0.5)*9, (Math.random()-0.5)*11);
      mesh.userData = {
        base: mesh.position.clone(),
        fS: 0.4 + Math.random()*1.2, fO: Math.random()*Math.PI*2,
        pS: 1 + Math.random()*2, pO: Math.random()*Math.PI*2,
        rS: 0.0015 + Math.random()*0.005,
      };
      nodes.push(mesh);
      scene.add(mesh);
    }

    links.forEach(([i,j]) => {
      const geo = new THREE.BufferGeometry().setFromPoints([nodes[i].position, nodes[j].position]);
      const mat = new THREE.LineBasicMaterial({ color: 0xa993f7, transparent: true, opacity: 0.15 });
      const line = new THREE.Line(geo, mat);
      scene.add(line);
      edges.push({ line, i, j });
    });

    const pc = 900;
    const pPos = new Float32Array(pc*3);
    for (let i = 0; i < pc; i++) {
      pPos[i*3] = (Math.random()-0.5)*22;
      pPos[i*3+1] = (Math.random()-0.5)*16;
      pPos[i*3+2] = (Math.random()-0.5)*22;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    const pMat = new THREE.PointsMaterial({ color: 0x6b7280, size: 0.025, transparent: true, opacity: 0.5 });
    const particles = new THREE.Points(pGeo, pMat);
    scene.add(particles);

    const mouse = new THREE.Vector2(-100,-100);
    const raycaster = new THREE.Raycaster();
    const onMove = (e: PointerEvent) => {
      mouse.x = (e.clientX/width)*2 - 1;
      mouse.y = -(e.clientY/height)*2 + 1;
    };
    container.addEventListener("pointermove", onMove);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.016;

      nodes.forEach((n) => {
        const { base, fS, fO, pS, pO, rS } = n.userData;
        n.position.y = base.y + Math.sin(time*fS + fO)*0.35;
        n.position.x = base.x + Math.cos(time*fS*0.7 + fO)*0.18;
        n.rotation.x += rS; n.rotation.y += rS*0.6;
        n.material.emissiveIntensity = 0.35 + Math.sin(time*pS + pO)*0.15;
      });

      edges.forEach(({ line, i, j }) => {
        line.geometry.setFromPoints([nodes[i].position, nodes[j].position]);
        line.geometry.attributes.position.needsUpdate = true;
        const d = nodes[i].position.distanceTo(nodes[j].position);
        line.material.opacity = 0.1 + Math.max(0, 1 - d/16)*0.3;
      });

      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(nodes);
      nodes.forEach((n) => {
        n.scale.setScalar(hits.some((h) => h.object === n) ? 1.25 : 1);
        if (hits.some((h) => h.object === n)) n.material.emissiveIntensity = 0.9;
      });

      scene.rotation.y = Math.sin(time*0.04)*0.08;
      particles.rotation.y += 0.0004;
      camera.lookAt(0,0,0);
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w/h; camera.updateProjectionMatrix();
      renderer.setSize(w,h);
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      container.removeEventListener("pointermove", onMove);
      renderer.dispose();
      scene.traverse((o: any) => { if (o.geometry) o.geometry.dispose(); if (o.material) o.material.dispose(); });
    };
  }, [reducedMotion, webglAvailable]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[620px] md:h-[720px] bg-ink-deep/40 rounded-[40px] border border-white/10 overflow-hidden ${className}`}
      role="img"
      aria-label={`${label} — 3D constellation`}
    >
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <div className="w-16 h-16 border-2 border-orchid border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
