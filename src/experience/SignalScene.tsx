import { useEffect, useId, useRef, useState } from 'react';
import type { PointerEvent as ReactPointerEvent } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { createRibbonGeometry } from './signal-geometry';
import type { SculptureMode } from './signal-geometry';
import './signal-scene.css';

type SceneController = {
  update: (mode: SculptureMode, rotation: number, tilt: number, zoom: number) => void;
  reset: () => void;
};

type RendererState = 'loading' | 'webgl' | 'svg';

/** A decorative, local material study. It represents no live system or AI activity. */
export default function SignalScene({ className = '' }: { className?: string }) {
  const rootRef = useRef<HTMLElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SceneController | null>(null);
  const [mode, setMode] = useState<SculptureMode>('ribbon');
  const [rotation, setRotation] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [zoom, setZoom] = useState(1);
  const dragRef = useRef<{ id: number; x: number; y: number; rotation: number; tilt: number } | null>(null);
  const turn = (value: number) => ((value % 360) + 360) % 360;
  const [rendererState, setRendererState] = useState<RendererState>('loading');
  const uid = `signal-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;

  useEffect(() => {
    const mount = mountRef.current;
    const root = rootRef.current;
    if (!mount || !root) return;
    let disposed = false;
    let contextLost = false;
    let prepared = false;
    let visible = true;
    let frame = 0;
    let lastTime = 0;
    let elapsed = 0;
    let currentAngle = 0;
    let targetAngle = 0;
    let targetTilt = 0;
    let selected: SculptureMode = 'ribbon';
    let renderer: THREE.WebGLRenderer | undefined;
    let environmentTarget: THREE.WebGLRenderTarget | undefined;
    let pmrem: THREE.PMREMGenerator | undefined;
    let room: RoomEnvironment | undefined;
    let resizeObserver: ResizeObserver | undefined;
    let intersectionObserver: IntersectionObserver | undefined;
    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 40);
    camera.position.set(0, 0.42, 9.1);
    camera.lookAt(0, 0.15, 0);
    const sculpture = new THREE.Group();
    const ribbonGroup = new THREE.Group();
    const orbitGroup = new THREE.Group();
    const ownedLights: THREE.DirectionalLight[] = [];

    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      root.setAttribute('data-signal-running', 'false');
    };
    const canRender = () => prepared && !disposed && !contextLost && visible && !document.hidden && !!renderer;
    const pose = () => {
      sculpture.rotation.set(0.12 + targetTilt, -0.2 + currentAngle + (motion.matches ? 0 : Math.sin(elapsed * 0.3) * 0.07), -0.075);
      sculpture.position.y = motion.matches ? 0 : Math.sin(elapsed * 0.55) * 0.035;
      root.setAttribute('data-signal-orientation', currentAngle.toFixed(4));
    };
    const renderOnce = () => {
      if (!canRender()) return;
      pose();
      renderer!.render(scene, camera);
    };
    const tick = (time: number) => {
      frame = 0;
      if (!canRender()) return;
      const delta = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 0;
      lastTime = time;
      elapsed += delta;
      currentAngle += (targetAngle - currentAngle) * (1 - Math.exp(-delta * 9));
      renderOnce();
      if (!motion.matches) {
        root.setAttribute('data-signal-running', 'true');
        frame = requestAnimationFrame(tick);
      }
    };
    const start = () => {
      if (!canRender()) return;
      if (motion.matches) {
        currentAngle = targetAngle;
        renderOnce();
      } else if (!frame) {
        lastTime = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const onVisibility = () => document.hidden ? stop() : start();
    const onMotion = () => {
      stop();
      root.setAttribute('data-signal-reduced-motion', String(motion.matches));
      start();
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      stop();
      setRendererState('svg');
    };
    const onContextRestored = () => {
      if (disposed) return;
      contextLost = false;
      // Three recreates its GPU resources after restoration; retained CPU assets are reusable.
      renderOnce();
      setRendererState('webgl');
      start();
    };
    const cleanup = () => {
      if (disposed) return;
      disposed = true;
      stop();
      controllerRef.current = null;
      resizeObserver?.disconnect();
      intersectionObserver?.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotion);
      if (renderer) {
        renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
        renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored);
      }
      scene.environment = null;
      geometries.forEach(geometry => geometry.dispose());
      materials.forEach(material => material.dispose());
      ownedLights.forEach(light => light.shadow.dispose());
      environmentTarget?.dispose();
      pmrem?.dispose();
      room?.dispose();
      scene.clear();
      renderer?.renderLists.dispose();
      renderer?.dispose();
      renderer?.forceContextLoss();
      renderer?.domElement.remove();
    };

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setClearColor(0xf1f0e9, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.03;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.VSMShadowMap;
      renderer.domElement.className = 'signal-scene__canvas';
      renderer.domElement.setAttribute('aria-hidden', 'true');
      renderer.domElement.addEventListener('webglcontextlost', onContextLost);
      renderer.domElement.addEventListener('webglcontextrestored', onContextRestored);
      mount.appendChild(renderer.domElement);

      pmrem = new THREE.PMREMGenerator(renderer);
      room = new RoomEnvironment();
      environmentTarget = pmrem.fromScene(room, 0.04, 0.1, 30);
      scene.environment = environmentTarget.texture;
      scene.environmentIntensity = 0.75;
      room.dispose();
      room = undefined;
      pmrem.dispose();
      pmrem = undefined;

      const ivory = new THREE.MeshPhysicalMaterial({ color: 0xeee9dd, metalness: 0.23, roughness: 0.3, clearcoat: 0.38, clearcoatRoughness: 0.35 });
      const lavender = new THREE.MeshPhysicalMaterial({ color: 0xa993f7, metalness: 0.28, roughness: 0.31, clearcoat: 0.35, clearcoatRoughness: 0.3 });
      const edge = new THREE.MeshStandardMaterial({ color: 0xd8cfe6, metalness: 0.28, roughness: 0.32 });
      const lime = new THREE.MeshPhysicalMaterial({ color: 0xd8ff85, roughness: 0.25, metalness: 0.1, clearcoat: 0.6, clearcoatRoughness: 0.2 });
      // Explicitly owned depth material avoids hidden default-shadow program ownership.
      const depth = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
      const shadow = new THREE.ShadowMaterial({ color: 0x666252, opacity: 0.09 });
      materials.push(ivory, lavender, edge, lime, depth, shadow);
      const ribbonGeometry = createRibbonGeometry('ribbon');
      const orbitGeometry = createRibbonGeometry('orbit');
      const orbGeometry = new THREE.SphereGeometry(0.3, 40, 24);
      const floorGeometry = new THREE.PlaneGeometry(200, 200);
      geometries.push(ribbonGeometry, orbitGeometry, orbGeometry, floorGeometry);
      const ribbon = new THREE.Mesh(ribbonGeometry, [ivory, lavender, edge]);
      const loopA = new THREE.Mesh(orbitGeometry, [ivory, lavender, edge]);
      const loopB = new THREE.Mesh(orbitGeometry, [ivory, lavender, edge]);
      loopA.rotation.set(0.15, 0.62, -0.48);
      loopA.position.x = -0.47;
      loopB.rotation.set(-0.35, -0.85, 0.5);
      loopB.position.set(0.53, 0.04, 0.1);
      loopB.scale.setScalar(0.88);
      const orb = new THREE.Mesh(orbGeometry, lime);
      orb.position.set(1.56, 1.82, 0.48);
      for (const mesh of [ribbon, loopA, loopB, orb]) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.customDepthMaterial = depth;
      }
      ribbonGroup.add(ribbon);
      orbitGroup.add(loopA, loopB);
      orbitGroup.visible = false;
      sculpture.add(ribbonGroup, orbitGroup, orb);
      scene.add(sculpture);
      const floor = new THREE.Mesh(floorGeometry, shadow);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -1.78;
      floor.receiveShadow = true;
      scene.add(floor);

      scene.add(new THREE.HemisphereLight(0xf8f6ff, 0xd8cdbc, 1.2));
      const key = new THREE.DirectionalLight(0xfff5e3, 4.5);
      key.position.set(-3.5, 6, 5);
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.left = -4;
      key.shadow.camera.right = 4;
      key.shadow.camera.top = 4;
      key.shadow.camera.bottom = -4;
      key.shadow.camera.near = 0.5;
      key.shadow.camera.far = 18;
      key.shadow.normalBias = 0.025;
      key.shadow.bias = -0.0002;
      key.shadow.radius = 5;
      key.shadow.blurSamples = 8;
      const rim = new THREE.DirectionalLight(0xc6b4ff, 2.2);
      rim.position.set(4, 2, -3);
      const fill = new THREE.DirectionalLight(0xffffff, 0.8);
      fill.position.set(2, 1, 5);
      ownedLights.push(key, rim, fill);
      scene.add(key, rim, fill);
      root.setAttribute('data-signal-reduced-motion', String(motion.matches));

      const resize = () => {
        if (!renderer || disposed) return;
        const width = Math.max(mount.clientWidth, 1);
        const height = Math.max(mount.clientHeight, 1);
        camera.aspect = width / height;
        // Fit the entire W, not a distant default camera. Preserve breathing room on mobile.
        const vFov = THREE.MathUtils.degToRad(camera.fov);
        const fitWidth = 6.65 / (2 * Math.tan(vFov / 2) * camera.aspect);
        const fitHeight = 4.75 / (2 * Math.tan(vFov / 2));
        camera.position.set(0, 0.42, Math.max(fitWidth, fitHeight));
        camera.lookAt(0, 0.18, 0);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height, false);
        renderOnce();
      };
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(mount);
      intersectionObserver = new IntersectionObserver(entries => {
        visible = entries.some(entry => entry.isIntersecting);
        visible ? start() : stop();
      }, { threshold: 0 });
      intersectionObserver.observe(root);
      document.addEventListener('visibilitychange', onVisibility);
      motion.addEventListener('change', onMotion);
      controllerRef.current = {
        update(nextMode, nextRotation, nextTilt, nextZoom) {
          selected = nextMode;
          ribbonGroup.visible = selected === 'ribbon';
          orbitGroup.visible = selected === 'orbit';
          // Take the shortest turn across the 0/360 boundary.
          const desired = THREE.MathUtils.degToRad(nextRotation);
          targetAngle = currentAngle + Math.atan2(Math.sin(desired - currentAngle), Math.cos(desired - currentAngle));
          targetTilt = THREE.MathUtils.degToRad(nextTilt);
          camera.zoom = nextZoom;
          camera.updateProjectionMatrix();
          if (motion.matches) currentAngle = targetAngle;
          renderOnce();
          start();
        },
        reset() {
          elapsed = 0;
          targetTilt = 0;
          camera.zoom = 1;
          camera.updateProjectionMatrix();
          currentAngle = 0;
          targetAngle = 0;
          renderOnce();
          start();
        },
      };
      resize();
      // Return ownership immediately: route exit can dispose while shader preparation awaits.
      void renderer.compileAsync(scene, camera).then(() => {
        if (disposed) return;
        prepared = true;
        if (contextLost) return;
        renderOnce();
        setRendererState('webgl');
        start();
      }).catch(error => {
        if (disposed) return;
        cleanup();
        setRendererState('svg');
        if (import.meta.env.DEV) console.info('[SignalScene] Shader preparation unavailable; using vector study.', error);
      });
    } catch (error) {
      // A designed vector study remains usable when WebGL is blocked or exhausted.
      cleanup();
      setRendererState('svg');
      if (import.meta.env.DEV) console.info('[SignalScene] Using vector material study.', error);
    }
    return cleanup;
  }, []);

  useEffect(() => {
    controllerRef.current?.update(mode, rotation, tilt, zoom);
  }, [mode, rotation, tilt, zoom]);

  const reset = () => {
    setMode('ribbon');
    setRotation(0);
    setTilt(0);
    setZoom(1);
    controllerRef.current?.reset();
  };

  return (
    <figure
      ref={rootRef}
      className={`signal-scene ${className}`.trim()}
      data-signal-mode={mode}
      data-signal-angle={rotation}
      data-signal-tilt={tilt}
      data-signal-zoom={zoom}
      data-signal-renderer={rendererState}
      data-signal-running="false"
      aria-label="Wikcia sculptural material study"
    >
      <div className="signal-scene__stage" ref={mountRef}
        role="slider" tabIndex={0} aria-label="Rotate the Wikcia sculpture"
        aria-valuemin={0} aria-valuemax={359} aria-valuenow={Math.round(rotation) % 360}
        aria-valuetext={`${Math.round(rotation) % 360} degrees. Use left and right to rotate, up and down to tilt, Home to reset.`}
        onPointerDown={event => { if (event.button !== 0) return; dragRef.current = { id: event.pointerId, x: event.clientX, y: event.clientY, rotation, tilt }; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.dataset.dragging = 'true'; }}
        onPointerMove={(event: ReactPointerEvent<HTMLDivElement>) => { const drag = dragRef.current; if (!drag || drag.id !== event.pointerId) return; setRotation(turn(drag.rotation + (event.clientX - drag.x) * .55)); setTilt(Math.max(-25, Math.min(25, drag.tilt + (event.clientY - drag.y) * .16))); }}
        onPointerUp={event => { dragRef.current = null; delete event.currentTarget.dataset.dragging; if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
        onPointerCancel={event => { dragRef.current = null; delete event.currentTarget.dataset.dragging; }}
        onDoubleClick={reset}
        onKeyDown={event => { if (['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key)) { event.preventDefault(); if (event.key === 'Home') reset(); else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') setRotation(value => turn(value + (event.key === 'ArrowRight' ? 15 : -15))); else setTilt(value => Math.max(-25, Math.min(25, value + (event.key === 'ArrowDown' ? 5 : -5)))); } }}>
        <span className="signal-scene__interaction-hint" aria-hidden="true">DRAG TO EXPLORE <span>↔</span></span>
        <svg className="signal-scene__fallback" viewBox="0 0 700 570" fill="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={`${uid}-ivory`} x1="150" y1="110" x2="510" y2="440" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fffdf2" /><stop offset=".43" stopColor="#eeeadf" /><stop offset=".7" stopColor="#c2b1dc" /><stop offset="1" stopColor="#f6f2e8" />
            </linearGradient>
            <linearGradient id={`${uid}-reverse`} x1="170" y1="400" x2="530" y2="130" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8f78b6" /><stop offset=".55" stopColor="#c2adee" /><stop offset="1" stopColor="#eee5fc" />
            </linearGradient>
            <radialGradient id={`${uid}-orb`} cx=".32" cy=".24" r=".82"><stop stopColor="#edffc7" /><stop offset=".58" stopColor="#d8ff85" /><stop offset="1" stopColor="#a8ce59" /></radialGradient>
            <radialGradient id={`${uid}-shadow`}><stop stopColor="#635d6b" stopOpacity=".2" /><stop offset="1" stopColor="#635d6b" stopOpacity="0" /></radialGradient>
          </defs>
          <ellipse cx="350" cy="470" rx="245" ry="36" fill={`url(#${uid}-shadow)`} />
          <g transform={`translate(350 285) scale(${zoom}) rotate(${rotation * 0.22}) skewX(${tilt * .2}) translate(-350 -285)`}>
            {mode === 'ribbon' ? <>
              <path d="M115 153 L196 377 Q217 439 253 374 L340 202 L418 374 Q448 440 484 375 L578 150" stroke={`url(#${uid}-reverse)`} strokeWidth="76" strokeLinecap="butt" strokeLinejoin="round" />
              <path d="M118 141 L200 364 Q217 408 246 354 L336 181 L424 358 Q449 412 479 354 L570 132" stroke={`url(#${uid}-ivory)`} strokeWidth="66" strokeLinecap="butt" strokeLinejoin="round" />
              <path d="M143 144 L222 355 M360 192 L442 358 M501 337 L575 132" stroke="#fffdf7" strokeOpacity=".6" strokeWidth="3" />
            </> : <>
              <ellipse cx="296" cy="280" rx="116" ry="169" transform="rotate(-31 296 280)" stroke={`url(#${uid}-reverse)`} strokeWidth="66" />
              <ellipse cx="398" cy="282" rx="115" ry="167" transform="rotate(34 398 282)" stroke={`url(#${uid}-ivory)`} strokeWidth="62" />
              <path d="M228 126 Q132 169 183 315" stroke={`url(#${uid}-ivory)`} strokeWidth="58" />
            </>}
            <circle cx="526" cy="91" r="31" fill={`url(#${uid}-orb)`} />
          </g>
        </svg>
        <span className="signal-scene__annotation" aria-hidden="true"><span /> FORM / 0{mode === 'ribbon' ? '1' : '2'}</span>
      </div>
      <figcaption className="signal-scene__caption">
        <div className="signal-scene__description"><span className="signal-scene__eyebrow">A study in possibility</span><span>Drag, rotate, change perspective.</span></div>
        <div className="signal-scene__controls" role="group" aria-label="Sculpture controls">
          <div className="signal-scene__modes" role="group" aria-label="Sculpture shape">
            <button type="button" aria-label="Show ribbon sculpture" aria-pressed={mode === 'ribbon'} onClick={() => setMode('ribbon')}>Ribbon</button>
            <button type="button" aria-label="Show orbit sculpture" aria-pressed={mode === 'orbit'} onClick={() => setMode('orbit')}>Orbit</button>
          </div>
          <button className="signal-scene__icon-button" type="button" aria-label="Rotate sculpture 45 degrees" onClick={() => setRotation(value => turn(value + 45))} title="Rotate sculpture">
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true"><path d="M15.9 7.8A6.2 6.2 0 1 0 16 12M16 3.8v4.6h-4.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button className="signal-scene__icon-button" type="button" aria-label="Zoom sculpture out" title="Zoom out" disabled={zoom <= .85} onClick={() => setZoom(value => Math.max(.85, Math.round((value - .1) * 100) / 100))}>−</button>
          <button className="signal-scene__icon-button" type="button" aria-label="Zoom sculpture in" title="Zoom in" disabled={zoom >= 1.2} onClick={() => setZoom(value => Math.min(1.2, Math.round((value + .1) * 100) / 100))}>+</button>
          <button className="signal-scene__icon-button" type="button" aria-label="Reset sculpture" onClick={reset} title="Reset sculpture">
            Reset
          </button>
        </div>
      </figcaption>
      <p className="signal-scene__instruction">Drag horizontally to turn. Tab + arrow keys also work. Home resets the view.</p>
      <span className="signal-scene__sr-only" role="status" aria-live="polite">{mode === 'ribbon' ? 'Ribbon' : 'Orbit'} sculpture. View rotated {rotation % 360} degrees.{rendererState === 'svg' ? ' Vector study shown.' : ''}</span>
    </figure>
  );
}
