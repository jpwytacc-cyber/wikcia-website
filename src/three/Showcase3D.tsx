import React, { useRef, useEffect } from "react";
import * as THREE from "three";

interface Showcase3DProps {
  className?: string;
}

export function Showcase3D({ className = "" }: Showcase3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x17181d);
    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
    const count = 12;

    for (let i = 0; i < count; i++) {
      const color = new THREE.Color().setHSL(i / count, 0.7, 0.5);
      const material = new THREE.MeshStandardMaterial({ color });
      const mesh = new THREE.Mesh(geometry, material);
      const angle = (i / count) * Math.PI * 2;
      mesh.position.set(Math.cos(angle) * 4, 0, Math.sin(angle) * 4);
      mesh.lookAt(0, 0, 0);
      mesh.userData = { baseAngle: angle, speed: 0.005 + Math.random() * 0.01 };
      group.add(mesh);
    }
    scene.add(group);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    const dirLight = new THREE.DirectionalLight(0xd8ff85, 1);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    camera.position.z = 12;

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      group.rotation.y = Math.sin(time * 0.2) * 0.5;
      group.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        mesh.userData.baseAngle += mesh.userData.speed;
        mesh.position.x = Math.cos(mesh.userData.baseAngle) * 4;
        mesh.position.z = Math.sin(mesh.userData.baseAngle) * 4;
        mesh.lookAt(0, 0, 0);
      });
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full h-[400px] md:h-[600px] bg-white/5 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center ${className}`}
    />
  );
}
