'use client';
import { useState, useEffect } from 'react';

export default function Nav() {
  const [clock, setClock] = useState('');

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
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '18px clamp(18px,4vw,56px)',
      background: 'rgba(5,5,5,0.55)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <a href="#hero" style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontWeight: 700, fontSize: 14, letterSpacing: '0.04em', color: '#EDEDED',
      }}>
        CW_<span style={{ color: 'var(--accent)' }}>//</span>
      </a>

      <nav style={{
        display: 'flex', alignItems: 'center',
        gap: 'clamp(16px,2.4vw,34px)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: '0.18em',
      }}>
        <a href="#profile" className="nav-link" style={{ color: 'hsl(180, 100%, 70%)' }}>01_PROFILE</a>
        <a href="#work"    className="nav-link" style={{ color: 'hsl(180, 100%, 70%)' }}>02_WORK</a>
        <a href="#stack"   className="nav-link" style={{ color: 'hsl(180, 100%, 70%)' }}>03_STACK</a>
        <a href="#contact" className="nav-link" style={{ color: 'hsl(180, 100%, 70%)' }}>04_CONTACT</a>
        <span style={{ color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 6, height: 6, borderRadius: '50%',
            background: 'var(--accent)',
            animation: 'pulse 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{ color: 'hsl(180, 100%, 70%)' }}>{clock}</span>
        </span>
      </nav>
    </header>
  );
}
