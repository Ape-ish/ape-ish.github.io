'use client';
import { useEffect, useState, useRef } from 'react';

let dojoRenderSeq = 0;

export default function DojoDrawer({ project, onClose }) {
  const [shown, setShown] = useState(null);
  const diagramRef = useRef(null);

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

  useEffect(() => {
    if (!shown?.diagram || !diagramRef.current || !open) return;

    const el = diagramRef.current;
    let cancelled = false;
    let pollId = null;

    const render = async (mermaid) => {
      // Always apply dojo config before each render — ensures useMaxWidth: false
      // even if LabDrawer initialized Mermaid first with different settings
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        themeVariables: {
          background:           '#050505',
          primaryColor:         '#050505',
          primaryBorderColor:   '#333333',
          primaryTextColor:     '#5ce6e6',
          secondaryColor:       '#050505',
          secondaryBorderColor: '#333333',
          tertiaryColor:        '#050505',
          tertiaryBorderColor:  '#333333',
          lineColor:            'hsl(180,100%,70%)',
          edgeLabelBackground:  '#050505',
          clusterBkg:           '#050505',
          clusterBorder:        '#333333',
          titleColor:           '#EDEDED',
          fontFamily:           "'JetBrains Mono', monospace",
          fontSize:             '12px',
        },
        flowchart: { curve: 'linear', useMaxWidth: false },
      });

      el.innerHTML = '';

      try {
        const id = `dji${++dojoRenderSeq}`;
        const { svg } = await mermaid.render(id, shown.diagram);
        if (cancelled || !diagramRef.current) return;

        el.innerHTML = svg;

        const svgEl = el.querySelector('svg');
        if (svgEl) {
          svgEl.style.cssText = 'background:transparent!important;max-width:100%;height:auto;';
          svgEl.querySelectorAll('rect.background, rect[class="background"]')
               .forEach((r) => r.setAttribute('fill', 'transparent'));
        }
      } catch {
        if (!cancelled && diagramRef.current) {
          diagramRef.current.innerHTML =
            `<pre style="font-family:'JetBrains Mono',monospace;font-size:10px;` +
            `color:hsl(180,100%,70%);white-space:pre-wrap;word-break:break-all;` +
            `margin:0">${shown.diagram}</pre>`;
        }
      }
    };

    if (window.mermaid) {
      render(window.mermaid);
    } else {
      pollId = setInterval(() => {
        if (!window.mermaid) return;
        clearInterval(pollId);
        if (!cancelled) render(window.mermaid);
      }, 40);
    }

    return () => {
      cancelled = true;
      if (pollId) clearInterval(pollId);
    };
  }, [shown, open]);

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
        width: '100%', maxWidth: 780,
        background: '#050505',
        borderLeft: '1px solid rgba(255,255,255,0.14)',
        zIndex: 201,
        transform: open ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.22s cubic-bezier(0.25,0,0.5,1)',
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

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(28px,3vw,44px) clamp(24px,3vw,36px)' }}>
          {shown && (
            <>
              {/* Subtitle label */}
              {shown.subtitle && (
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: '0.22em',
                  color: 'hsl(180,100%,70%)', marginBottom: 14,
                }}>
                  // {shown.subtitle.toUpperCase()}
                </div>
              )}

              {/* Title */}
              <h2 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: 'clamp(1.8rem,4vw,2.6rem)',
                lineHeight: 1.06, letterSpacing: '-0.03em',
                color: '#EDEDED', margin: '0 0 clamp(18px,2.5vh,26px)',
              }}>
                {shown.title}
              </h2>

              {/* Stack tags */}
              {shown.stack?.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 'clamp(26px,3.5vh,40px)' }}>
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
              )}

              {/* Description — falls back to problem/mechanics for items without diagram data */}
              {(shown.description || shown.problem) && (
                <div style={{ marginBottom: 'clamp(28px,4vh,44px)' }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10, letterSpacing: '0.22em',
                    color: 'hsl(180,100%,70%)', marginBottom: 14,
                  }}>
                    // DESCRIPTION
                  </div>
                  <p style={{
                    fontFamily: "'Inter', sans-serif", fontWeight: 400,
                    fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.68,
                    color: '#EDEDED', margin: 0,
                  }}>
                    {shown.description ?? shown.problem}
                  </p>
                  {!shown.description && shown.mechanics && (
                    <p style={{
                      fontFamily: "'Inter', sans-serif", fontWeight: 400,
                      fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.68,
                      color: 'hsl(180,100%,70%)', margin: '16px 0 0',
                    }}>
                      {shown.mechanics}
                    </p>
                  )}
                </div>
              )}

              {/* Architecture Diagram — conditional */}
              {shown.diagram && (
                <>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 'clamp(24px,3.5vh,40px)' }} />
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10, letterSpacing: '0.22em',
                      color: 'hsl(180,100%,70%)', marginBottom: 16,
                    }}>
                      // ARCHITECTURE_DIAGRAM
                    </div>
                    <div style={{
                      overflowX: 'auto', paddingBottom: '1rem',
                      background: '#050505', border: '1px solid #333333',
                    }}>
                      <div
                        ref={diagramRef}
                        style={{
                          padding: '20px',
                          minHeight: 120,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 11, letterSpacing: '0.16em',
                          color: 'hsl(180,100%,70%)', opacity: 0.5,
                        }}>
                          RENDERING_DIAGRAM...
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Fixed bottom — repository link */}
        {shown?.href && (
          <div style={{
            flexShrink: 0,
            padding: 'clamp(18px,2vh,24px) clamp(24px,3vw,36px)',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', flexWrap: 'wrap', gap: 12,
          }}>
            <a
              href={shown.href}
              target="_blank"
              rel="noopener noreferrer"
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
          </div>
        )}
      </aside>
    </>
  );
}
