'use client';
import { useState, useEffect } from 'react';

export default function ContactFooter() {
  const [clock, setClock] = useState('00:00:00 UTC');

  useEffect(() => {
    const pad = (n) => String(n).padStart(2, '0');
    const tick = () => {
      const d = new Date();
      setClock(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())} UTC`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <footer id="contact" className="section-panel" style={{
      background: 'rgba(5,5,5,0.1)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: 'clamp(72px,12vh,140px) clamp(18px,4vw,56px) clamp(28px,4vh,40px)',
    }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(36px,6vw,80px)', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)', marginBottom: 'clamp(20px,3vh,30px)' }}>
            // ROUTE_CONTACT
          </div>
          <a
            href="mailto:support@cwhipple.me"
            className="contact-email"
            style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: 'clamp(2rem,6vw,4.4rem)', letterSpacing: '-0.04em',
              color: '#EDEDED', lineHeight: 1,
            }}
          >
            support@cwhipple.me
          </a>
          <div style={{ display: 'flex', gap: 24, marginTop: 'clamp(26px,4vh,38px)', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: '0.1em' }}>
            <a href="https://github.com/Ape-ish" target="_blank" rel="noopener" className="social-link" style={{ color: 'hsl(180, 100%, 70%)' }}>GITHUB ↗</a>
            <a href="https://www.linkedin.com/in/curtiswhipple/" target="_blank" rel="noopener" className="social-link" style={{ color: 'hsl(180, 100%, 70%)' }}>LINKEDIN ↗</a>
          </div>
        </div>

        <div style={{ textAlign: 'right', fontFamily: "'JetBrains Mono', monospace" }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end', fontSize: 12, letterSpacing: '0.14em', color: '#EDEDED' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 12px var(--accent)',
              animation: 'pulse 2s ease-in-out infinite',
            }} />
            SYSTEM STATUS: ONLINE
          </div>
          <div style={{ fontSize: 11, color: 'hsl(180, 100%, 70%)', marginTop: 14, letterSpacing: '0.1em' }}>
            {clock}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'space-between',
        marginTop: 'clamp(48px,8vh,90px)', paddingTop: 22,
        borderTop: '1px solid rgba(255,255,255,0.07)',
        fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, letterSpacing: '0.16em', color: 'hsl(180, 100%, 70%)',
      }}>
        <span>© 2026 CURTIS WHIPPLE</span>
        <span>BUILT FOR / WEBGL_READY</span>
        <span>FLEMING ISLAND, FL</span>
      </div>
    </footer>
  );
}
