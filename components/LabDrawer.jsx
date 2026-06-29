'use client';
import { useEffect, useState, useRef } from 'react';

// Mermaid is initialized once per page session, not once per component mount
let mermaidInited = false;
let renderSeq = 0;

function initMermaid() {
  if (mermaidInited || !window.mermaid) return;
  window.mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    themeVariables: {
      background:            '#050505',
      primaryColor:          '#0c0c0c',
      primaryBorderColor:    '#00ff9d',
      primaryTextColor:      '#EDEDED',
      secondaryColor:        '#0a0a0a',
      secondaryBorderColor:  '#333',
      tertiaryColor:         '#080808',
      tertiaryBorderColor:   '#333',
      lineColor:             'hsl(180,100%,70%)',
      edgeLabelBackground:   '#050505',
      clusterBkg:            '#080808',
      clusterBorder:         '#333',
      titleColor:            '#EDEDED',
      fontFamily:            "'JetBrains Mono', monospace",
      fontSize:              '12px',
    },
    flowchart: { curve: 'linear', useMaxWidth: true },
  });
  mermaidInited = true;
}

export default function LabDrawer({ lab, onClose }) {
  // Hold last non-null lab so content stays visible during the close animation
  const [shown, setShown] = useState(null);
  const diagramRef = useRef(null);

  useEffect(() => { if (lab) setShown(lab); }, [lab]);

  const open = Boolean(lab);

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

  // Render Mermaid diagram whenever the active item or open state changes
  useEffect(() => {
    if (!shown?.diagram || !diagramRef.current || !open) return;

    const el = diagramRef.current;
    let cancelled = false;
    let pollId = null;

    const render = async (mermaid) => {
      initMermaid();
      el.innerHTML = '';

      try {
        const id = `mdi${++renderSeq}`;
        const { svg } = await mermaid.render(id, shown.diagram);
        if (cancelled || !diagramRef.current) return;

        el.innerHTML = svg;

        // Force transparent background — Mermaid injects a solid rect we override
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
            {shown?.num ? `[ 0${shown.num} ]` : ''}
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

              {/* Summary */}
              <div style={{ marginBottom: 'clamp(28px,4vh,44px)' }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10, letterSpacing: '0.22em',
                  color: 'hsl(180,100%,70%)', marginBottom: 14,
                }}>
                  // SUMMARY
                </div>
                <p style={{
                  fontFamily: "'Inter', sans-serif", fontWeight: 400,
                  fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.68,
                  color: '#EDEDED', margin: 0,
                }}>
                  {shown.summary}
                </p>
              </div>

              {/* Divider */}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', marginBottom: 'clamp(24px,3.5vh,40px)' }} />

              {/* Architecture Diagram */}
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
                  background: '#050505', border: '1px solid rgba(255,255,255,0.08)',
                }}>
                  <div
                    ref={diagramRef}
                    style={{
                      padding: '20px',
                      minHeight: 120,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    {/* Loading state — replaced by Mermaid SVG once rendered */}
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

              {/* Repository escape hatch */}
              {shown.repoUrl && (
                <div style={{
                  marginTop: 'clamp(24px,3vh,36px)',
                  paddingTop: 20,
                  borderTop: '1px solid rgba(255,255,255,0.07)',
                }}>
                  <a
                    href={shown.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="lab-repo-btn"
                  >
                    [ // ACCESS_RAW_REPOSITORY ↗ ]
                  </a>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
