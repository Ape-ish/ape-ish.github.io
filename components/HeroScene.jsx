'use client';
import { useEffect, useRef } from 'react';

// ── Constants ──────────────────────────────────────────────────────────────
const FOV         = 52;
const BASE_ROT    = 0.003;   // rad/frame — slow constant auto-spin
const SCROLL_SCALE = 0.005;  // scroll px → rotation boost multiplier
const BOOST_DECAY  = 0.91;   // per-frame decay (~17-frame half-life @60fps)

export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let rafId      = null;
    let renderer   = null;
    const toDispose = [];
    let cancelled  = false;
    let dismounted = false;

    // Poll for CDN globals before initialising
    const poll = setInterval(() => {
      if (window.THREE && window.gsap && window.ScrollTrigger) {
        clearInterval(poll);
        if (!cancelled) initScene();
      }
    }, 40);

    function initScene() {
      const THREE = window.THREE;
      const gsap  = window.gsap;
      const ST    = window.ScrollTrigger;
      gsap.registerPlugin(ST);

      // ── Scene / Camera / Renderer ──────────────────────────────────────
      const scene = new THREE.Scene();
      // Always use the true viewport size — the container is position:fixed 100vw×100vh
      const W = window.innerWidth;
      const H = window.innerHeight;

      const camera = new THREE.PerspectiveCamera(FOV, W / H, 0.1, 200);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setClearColor(0x000000, 0);
      el.appendChild(renderer.domElement);

      const ACC = { r: 61 / 255, g: 245 / 255, b: 160 / 255 }; // #3DF5A0

      // ── BACKGROUND — sparse node network with twinkling ───────────────
      const BG_N = 1500;
      const bPos    = new Float32Array(BG_N * 3);
      const bCol    = new Float32Array(BG_N * 3);
      // Per-particle brightness state for twinkling
      const bgBase  = new Float32Array(BG_N); // resting brightness
      const bgCur   = new Float32Array(BG_N); // current brightness (lerped each frame)
      const bgTgt   = new Float32Array(BG_N); // target brightness
      const bgAcc   = new Uint8Array(BG_N);   // 1 = accent-coloured particle

      for (let i = 0; i < BG_N; i++) {
        bPos[i * 3]     = (Math.random() - 0.5) * 52;
        bPos[i * 3 + 1] = (Math.random() - 0.5) * 38;
        bPos[i * 3 + 2] = -7 - Math.random() * 10; // deep Z

        if (Math.random() < 0.032) {
          // Accent node
          bCol[i*3] = ACC.r; bCol[i*3+1] = ACC.g; bCol[i*3+2] = ACC.b;
          bgAcc[i] = 1;
          bgBase[i] = bgCur[i] = bgTgt[i] = 1.0;
        } else {
          const v = 0.32 + Math.random() * 0.26;
          bCol[i*3] = v; bCol[i*3+1] = v; bCol[i*3+2] = v + 0.04;
          bgAcc[i] = 0;
          bgBase[i] = bgCur[i] = bgTgt[i] = v;
        }
      }

      const bGeo     = new THREE.BufferGeometry();
      const bColAttr = new THREE.BufferAttribute(bCol, 3);
      bGeo.setAttribute('position', new THREE.BufferAttribute(bPos, 3));
      bGeo.setAttribute('color', bColAttr);

      const bMat = new THREE.PointsMaterial({
        size: 0.06, vertexColors: true, transparent: true,
        opacity: 0.55, sizeAttenuation: true, depthWrite: false,
      });

      const bgGroup = new THREE.Group();
      bgGroup.add(new THREE.Points(bGeo, bMat));

      // Network edges — sampled close pairs, O(samples) not O(n²)
      const edgePts = [];
      let tries = 0;
      while (edgePts.length / 6 < 220 && tries < 10000) {
        tries++;
        const a = (Math.random() * BG_N) | 0;
        const b = (Math.random() * BG_N) | 0;
        if (a === b) continue;
        const dx = bPos[a*3]   - bPos[b*3];
        const dy = bPos[a*3+1] - bPos[b*3+1];
        const dz = bPos[a*3+2] - bPos[b*3+2];
        if (dx*dx + dy*dy + dz*dz < 24) {
          edgePts.push(
            bPos[a*3], bPos[a*3+1], bPos[a*3+2],
            bPos[b*3], bPos[b*3+1], bPos[b*3+2],
          );
        }
      }
      if (edgePts.length) {
        const eGeo = new THREE.BufferGeometry();
        eGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(edgePts), 3));
        const eMat = new THREE.LineBasicMaterial({
          color: 0x1a1a1a, transparent: true, opacity: 0.28, depthWrite: false,
        });
        bgGroup.add(new THREE.LineSegments(eGeo, eMat));
        toDispose.push(() => { eGeo.dispose(); eMat.dispose(); });
      }

      scene.add(bgGroup);
      toDispose.push(() => { bGeo.dispose(); bMat.dispose(); });

      // ── FOREGROUND HELIX — widened data-stream ─────────────────────────
      const HN     = 4400;
      const TURNS  = 13;
      const HEIGHT = 7.8;
      const RX     = 1.5;   // widened horizontal radius (was 0.92)
      const RZ     = 0.72;  // depth radius — oval cross-section (was 0.44)

      const hPos = new Float32Array(HN * 3);
      const hCol = new Float32Array(HN * 3);
      const orig = new Float32Array(HN * 3); // restore colours after flicker

      for (let i = 0; i < HN; i++) {
        const t   = i / HN;
        const ang = t * Math.PI * 2 * TURNS;
        const rV  = 1 + (Math.random() - 0.5) * 0.22; // radial scatter
        const sc  = (Math.random() - 0.5) * 0.07;      // xyz jitter

        hPos[i*3]     = Math.cos(ang) * RX * rV + sc;
        hPos[i*3 + 1] = (t - 0.5) * HEIGHT + (Math.random() - 0.5) * 0.07;
        hPos[i*3 + 2] = Math.sin(ang) * RZ * rV + sc;

        let r, g, b;
        if (i % 28 < 2) {               // accent pulse bands every 28 pts
          r = ACC.r; g = ACC.g; b = ACC.b;
        } else {
          const v = 0.45 + t * 0.55;   // gradient: dim bottom → bright top
          r = v; g = v; b = v;
        }
        hCol[i*3]   = orig[i*3]   = r;
        hCol[i*3+1] = orig[i*3+1] = g;
        hCol[i*3+2] = orig[i*3+2] = b;
      }

      const hGeo     = new THREE.BufferGeometry();
      const hColAttr = new THREE.BufferAttribute(hCol, 3);
      hGeo.setAttribute('position', new THREE.BufferAttribute(hPos, 3));
      hGeo.setAttribute('color', hColAttr);

      const hMat = new THREE.PointsMaterial({
        size: 0.028, vertexColors: true, transparent: true,
        opacity: 0.94, sizeAttenuation: true, depthWrite: false,
      });

      const helixGroup = new THREE.Group();
      helixGroup.add(new THREE.Points(hGeo, hMat));
      helixGroup.rotation.z = -0.07; // slight mechanical lean
      scene.add(helixGroup);
      toDispose.push(() => { hGeo.dispose(); hMat.dispose(); });

      // ── Responsive helix placement ──────────────────────────────────────
      // scale.y is reserved for GSAP; this only touches position.x and scale.x/z
      function placeHelix() {
        const asp    = camera.aspect;
        const halfW  = Math.tan((FOV / 2) * (Math.PI / 180)) * 8 * asp;
        const mobile = window.innerWidth < 768;

        if (mobile) {
          // Narrow viewport: shrink x/z footprint and pull toward centre
          helixGroup.scale.x = 0.52;
          helixGroup.scale.z = 0.52;
          helixGroup.position.x = halfW * 0.22;
        } else {
          // Desktop: full size, anchored in the right-hand empty space
          helixGroup.scale.x = 1;
          helixGroup.scale.z = 1;
          helixGroup.position.x = halfW * 0.50;
        }
      }
      placeHelix();

      // ── GSAP ScrollTrigger — Y-axis compression only ──────────────────
      // Rotation is handled entirely in the rAF loop so it stays continuous.
      const heroEl = document.getElementById('hero');

      const compTween = gsap.to(helixGroup.scale, {
        y: 0.33,      // compress hard on scroll
        ease: 'none',
        scrollTrigger: {
          trigger: heroEl,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.35, // fast follow → snappy physical feel
        },
      });

      toDispose.push(() => {
        compTween.scrollTrigger?.kill();
        compTween.kill();
      });

      // ── Window resize ──────────────────────────────────────────────────
      function onResize() {
        const nW = window.innerWidth;
        const nH = window.innerHeight;
        camera.aspect = nW / nH;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
        placeHelix();
      }
      window.addEventListener('resize', onResize);
      toDispose.push(() => window.removeEventListener('resize', onResize));

      // ── Animation loop ─────────────────────────────────────────────────
      let baseRotY    = 0;    // accumulates from auto-spin + boost
      let rotBoost    = 0;    // decays to 0 when not scrolling
      let lastScrollY = window.scrollY;
      let tick        = 0;
      let tFrame      = 0;   // integer frame counter for twinkle scheduling
      let lastFlicker = 0;   // timestamp of last helix particle flicker

      function animate(ts) {
        rafId = requestAnimationFrame(animate);
        tick  += 0.006;
        tFrame++;

        // ── 1. Continuous rotation + scroll-velocity boost ─────────────
        const curScrollY  = window.scrollY;
        const scrollDelta = curScrollY - lastScrollY;
        lastScrollY = curScrollY;

        // Smooth toward scroll-derived boost then decay when scrolling stops
        rotBoost += (scrollDelta * SCROLL_SCALE - rotBoost) * 0.25;
        rotBoost *= BOOST_DECAY;

        // Add boost magnitude to the constant auto-spin
        baseRotY += BASE_ROT + Math.abs(rotBoost);
        helixGroup.rotation.y = baseRotY;

        // ── 2. Background parallax (0.2× scroll depth) ─────────────────
        bgGroup.rotation.y = tick * 0.016;
        bgGroup.position.y = -curScrollY * 0.002;

        // ── 3. Twinkling — every 4th frame choose new random targets ───
        if (tFrame % 4 === 0) {
          // Non-accent particles: random dim or brightness spike
          for (let k = 0; k < 10; k++) {
            const idx = (Math.random() * BG_N) | 0;
            if (!bgAcc[idx]) {
              bgTgt[idx] = Math.random() < 0.6
                ? bgBase[idx] * (0.05 + Math.random() * 0.35) // dim flash
                : bgBase[idx] * (1.1  + Math.random() * 0.95); // brightness spike
            }
          }
          // Accent particles: flicker via direct colour write
          for (let k = 0; k < 3; k++) {
            const idx = (Math.random() * BG_N) | 0;
            if (bgAcc[idx]) {
              const s = 0.2 + Math.random() * 0.8;
              bCol[idx*3]   = ACC.r * s;
              bCol[idx*3+1] = ACC.g * s;
              bCol[idx*3+2] = ACC.b * s;
            }
          }
        }

        // Lerp each non-accent particle toward its target brightness
        let bDirty = false;
        for (let i = 0; i < BG_N; i++) {
          if (bgAcc[i]) continue;
          const diff = bgTgt[i] - bgCur[i];
          if (Math.abs(diff) > 0.002) {
            bgCur[i] += diff * 0.06; // lerp speed controls twinkle softness
            const v = Math.min(1, Math.max(0, bgCur[i]));
            bCol[i*3]   = v;
            bCol[i*3+1] = v;
            bCol[i*3+2] = Math.min(1, v + 0.04);
            bDirty = true;
          }
        }
        // Upload colour buffer whenever something changed (or accent flickered)
        if (bDirty || tFrame % 4 === 0) bColAttr.needsUpdate = true;

        // ── 4. Helix single-pixel accent flicker ───────────────────────
        if (ts - lastFlicker > 75 + Math.random() * 130) {
          lastFlicker = ts;
          const idx = (Math.random() * HN) | 0;
          if (orig[idx * 3 + 1] < 0.82) {
            hCol[idx*3]   = ACC.r;
            hCol[idx*3+1] = ACC.g;
            hCol[idx*3+2] = ACC.b;
            hColAttr.needsUpdate = true;
            setTimeout(() => {
              if (dismounted) return;
              hCol[idx*3]   = orig[idx*3];
              hCol[idx*3+1] = orig[idx*3+1];
              hCol[idx*3+2] = orig[idx*3+2];
              hColAttr.needsUpdate = true;
            }, 50 + Math.random() * 85);
          }
        }

        renderer.render(scene, camera);
      }
      animate(0);
    } // end initScene

    return () => {
      cancelled  = true;
      dismounted = true;
      clearInterval(poll);
      cancelAnimationFrame(rafId);
      toDispose.forEach((fn) => fn());
      if (renderer) {
        renderer.dispose();
        if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="webgl-bg" />;
}
