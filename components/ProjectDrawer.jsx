'use client';
import { useEffect, useState } from 'react';

export default function ProjectDrawer({ project, onClose }) {
  // Track last non-null project so content stays visible during the close animation
  const [shown, setShown] = useState(null);
  useEffect(() => { if (project) setShown(project); }, [project]);

  const open = Boolean(project);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(0,0,0,0.8)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'all' : 'none',
          transition: 'opacity 0.35s ease',
        }}
      />

      {/* Drawer panel */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, height: '100vh',
        width: '100%', maxWidth: 650,
        background: '#050505',
        borderLeft: '1px solid rgba(255,255,255,0.14)',
        zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>

        {/* Sticky header */}
        <div style={{
          flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px clamp(24px,3vw,36px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: '#050505',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 11, letterSpacing: '0.18em',
            color: 'hsl(180,100%,70%)',
          }}>
            {shown?.index ?? ''}
          </span>
          <button
            onClick={onClose}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 12, letterSpacing: '0.12em',
              color: '#EDEDED', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.22)',
              padding: '9px 16px', cursor: 'pointer',
            }}
          >
            CLOSE [X]
          </button>
        </div>

        {/* Scrollable body — independent of main page scroll */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(28px,3vw,44px) clamp(24px,3vw,36px)' }}>
          {shown && (
            <>
              {/* Project title */}
              <h2 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.8rem,4vw,2.8rem)',
                lineHeight: 1.06, letterSpacing: '-0.03em',
                color: '#EDEDED', margin: '0 0 clamp(20px,3vh,30px)',
              }}>
                {shown.title}
              </h2>

              {/* Tech stack tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(32px,4vh,50px)' }}>
                {shown.stack.map((tag) => (
                  <span key={tag} style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11, letterSpacing: '0.1em',
                    color: 'var(--accent)',
                    border: '1px solid rgba(0,255,157,0.35)',
                    padding: '6px 12px',
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Problem Statement */}
              <div style={{ marginBottom: 'clamp(28px,4vh,44px)' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: '0.22em',
                  color: 'hsl(180,100%,70%)', marginBottom: 16,
                }}>
                  // PROBLEM_STATEMENT
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.68,
                  color: '#EDEDED', margin: 0,
                }}>
                  {shown.problem}
                </p>
              </div>

              {/* Architecture Mechanics */}
              <div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: '0.22em',
                  color: 'hsl(180,100%,70%)', marginBottom: 16,
                }}>
                  // ARCHITECTURE_MECHANICS
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.68,
                  color: '#EDEDED', margin: 0,
                }}>
                  {shown.mechanics}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Fixed deployment links — always at bottom */}
        <div style={{
          flexShrink: 0,
          padding: 'clamp(18px,2vh,24px) clamp(24px,3vw,36px)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          display: 'flex', flexWrap: 'wrap', gap: 12,
        }}>
          {shown?.href && (
            <a
              href={shown.href} target="_blank" rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, letterSpacing: '0.04em',
                color: '#EDEDED', border: '1px solid rgba(255,255,255,0.16)',
                padding: '12px 20px', textDecoration: 'none',
                transition: 'color 0.18s ease, border-color 0.18s ease',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>&gt;</span> view_repository
            </a>
          )}
          {shown?.liveUrl && (
            <a
              href={shown.liveUrl} target="_blank" rel="noopener"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 13, letterSpacing: '0.04em',
                color: 'var(--accent)', border: '1px solid rgba(0,255,157,0.35)',
                padding: '12px 20px', textDecoration: 'none',
              }}
            >
              &gt; live_deployment ↗
            </a>
          )}
        </div>
      </aside>
    </>
  );
}
