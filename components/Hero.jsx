export default function Hero() {
  return (
    <section id="hero" className="section-panel" style={{
      minHeight: '100vh', width: '100%',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      justifyContent: 'flex-end',
      padding: 'clamp(20px,4vw,56px)',
      paddingBottom: 'clamp(40px,7vh,80px)',
    }}>
      {/* ambient accent glow */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(110% 80% at 74% 40%, rgba(61,245,160,0.05), transparent 58%)',
      }} />

      {/* corner ticks */}
      <div style={{ position:'absolute', top:'clamp(20px,4vw,56px)', left:'clamp(20px,4vw,56px)', width:14, height:14, borderTop:'1px solid rgba(255,255,255,0.3)', borderLeft:'1px solid rgba(255,255,255,0.3)', zIndex:2 }} />
      <div style={{ position:'absolute', top:'clamp(20px,4vw,56px)', right:'clamp(20px,4vw,56px)', width:14, height:14, borderTop:'1px solid rgba(255,255,255,0.3)', borderRight:'1px solid rgba(255,255,255,0.3)', zIndex:2 }} />
      <div style={{ position:'absolute', bottom:'clamp(20px,4vw,56px)', right:'clamp(20px,4vw,56px)', width:14, height:14, borderBottom:'1px solid rgba(255,255,255,0.3)', borderRight:'1px solid rgba(255,255,255,0.3)', zIndex:2 }} />

      {/* vertical edge label */}
      <div style={{
        position:'absolute', left:'clamp(20px,4vw,56px)', top:'50%',
        transform:'translateY(-50%) rotate(180deg)', writingMode:'vertical-rl',
        fontFamily:"'JetBrains Mono', monospace", fontSize:10,
        letterSpacing:'0.32em', color:'#555', zIndex:2,
      }}>
        CYBERSECURITY · SYSTEMS ARCHITECTURE
      </div>

      {/* top-right index */}
      <div style={{
        position:'absolute', top:'clamp(82px,12vh,120px)', right:'clamp(24px,4vw,60px)',
        textAlign:'right', fontFamily:"'JetBrains Mono', monospace",
        fontSize:11, letterSpacing:'0.18em', color:'#666', zIndex:2, lineHeight:1.7,
      }}>
        (01 — HERO)<br />
        <span style={{ color:'#444' }}>FLEMING ISLAND, FL</span>
      </div>

      {/* name block */}
      <div style={{ position:'relative', zIndex:3, maxWidth:1180, paddingLeft:'clamp(0px,3vw,46px)' }}>
        <div style={{
          fontFamily:"'JetBrains Mono', monospace", fontSize:12,
          letterSpacing:'0.26em', color:'var(--accent)',
          marginBottom:'clamp(16px,3vh,28px)',
        }}>
          // SYSTEM_OPERATOR · 2026
        </div>
        <h1 style={{
          fontFamily:"'Inter', sans-serif", fontWeight:800,
          fontSize:'clamp(3.2rem,12.6vw,12rem)',
          lineHeight:0.84, letterSpacing:'-0.046em', color:'#EDEDED', margin:0,
        }}>
          CURTIS<br />WHIPPLE<span style={{ color:'var(--accent)' }}>.</span>
        </h1>
        <p style={{
          fontFamily:"'JetBrains Mono', monospace",
          fontSize:'clamp(12px,1.5vw,16px)',
          letterSpacing:'0.06em', color:'#888',
          margin:'clamp(22px,4vh,38px) 0 0', maxWidth:680,
        }}>
          Cybersecurity Generalist{' '}
          <span style={{ color:'var(--accent)', padding:'0 6px' }}>|</span>
          {' '}Translator of Complex Systems
          <span style={{
            display:'inline-block', width:9, height:'1.05em',
            background:'var(--accent)', marginLeft:8,
            transform:'translateY(2px)',
            animation:'blink 1.1s step-end infinite',
          }} />
        </p>
      </div>

      {/* scroll indicator */}
      <div style={{
        position:'absolute', bottom:'clamp(40px,7vh,80px)', right:'clamp(24px,4vw,60px)',
        zIndex:3, display:'flex', flexDirection:'column', alignItems:'center', gap:12,
      }}>
        <span style={{
          fontFamily:"'JetBrains Mono', monospace", fontSize:9,
          letterSpacing:'0.28em', color:'#666', writingMode:'vertical-rl',
        }}>SCROLL</span>
        <div style={{ position:'relative', width:1, height:46, background:'rgba(255,255,255,0.12)', overflow:'hidden' }}>
          <div style={{
            position:'absolute', top:0, left:0, width:1, height:14,
            background:'var(--accent)',
            animation:'scrolldot 1.8s cubic-bezier(.4,0,.2,1) infinite',
          }} />
        </div>
      </div>
    </section>
  );
}
