"use client";

import { useEffect } from "react";

/**
 * Renders nothing — drives the faint network watermark on the two
 * <canvas> elements (#watermark, #headnet) that live in the page markup.
 */
export default function NetworkScripts() {
  useEffect(() => {
    function drawNet(canvas, opts) {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      if (w === 0 || h === 0) return;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const density = opts.density;
      const cols = Math.ceil(w / density);
      const rows = Math.ceil(h / density);
      const nodes = [];
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const jitter = density * 0.42;
          nodes.push({
            x: i * density + (Math.random() * 2 - 1) * jitter,
            y: j * density + (Math.random() * 2 - 1) * jitter,
          });
        }
      }
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = opts.line;
      ctx.lineWidth = 1;
      const maxD = density * 1.35;
      for (let a = 0; a < nodes.length; a++) {
        for (let b = a + 1; b < nodes.length; b++) {
          const dx = nodes[a].x - nodes[b].x;
          const dy = nodes[a].y - nodes[b].y;
          const d = Math.hypot(dx, dy);
          if (d < maxD) {
            ctx.globalAlpha = (1 - d / maxD) * opts.lineAlpha;
            ctx.beginPath();
            ctx.moveTo(nodes[a].x, nodes[a].y);
            ctx.lineTo(nodes[b].x, nodes[b].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = opts.dotAlpha;
      ctx.fillStyle = opts.dot;
      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, opts.dotR, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function renderAll() {
      drawNet(document.getElementById("watermark"), {
        density: 96,
        line: "oklch(0.45 0.06 195)",
        dot: "oklch(0.45 0.06 195)",
        lineAlpha: 0.05,
        dotAlpha: 0.07,
        dotR: 1.5,
      });
      drawNet(document.getElementById("headnet"), {
        density: 78,
        line: "oklch(0.7 0.08 190)",
        dot: "oklch(0.75 0.09 190)",
        lineAlpha: 0.16,
        dotAlpha: 0.28,
        dotR: 1.4,
      });
    }

    renderAll();
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(renderAll, 180);
    };
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return null;
}
