import "./globals.css";
import Script from "next/script";

export const metadata = {
  title: "Curtis Whipple — Cybersecurity Architect",
  description:
    "Portfolio of Curtis Whipple — Cybersecurity Generalist, Systems Architect, and Translator of Complex Systems.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        {/* Three.js + GSAP CDN — loaded before page scripts so window.THREE / window.gsap are ready */}
        <Script
          src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"
          strategy="beforeInteractive"
        />
        {/* Mermaid — lazy-loaded; only needed when a Lab drawer opens */}
        <Script
          src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"
          strategy="lazyOnload"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
