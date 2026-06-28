const certsPrimary = ['CASP+', 'CySA+', 'PenTest+'];
const certsSecondary = ['Security+', 'Network+', 'A+', 'ISC² SSCP', 'ITIL v4'];

export default function Stack() {
  return (
    <section id="stack" className="section-panel" style={{
      background: 'rgba(7,7,7,0.85)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: 'clamp(72px,12vh,150px) clamp(18px,4vw,56px)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        flexWrap: 'wrap', gap: 12,
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: '#666',
        paddingBottom: 'clamp(36px,6vh,60px)',
      }}>
        <span style={{ color: 'var(--accent)' }}>03 / CAPABILITY_STACK</span>
        <span>RUNTIME = LOCAL · AIR-GAPPED</span>
      </div>

      {/* bento */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 1, background: 'rgba(255,255,255,0.08)',
        border: '1px solid rgba(255,255,255,0.08)',
      }}>
        {/* frameworks */}
        <div style={{ background: '#050505', padding: 'clamp(26px,3vw,40px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(22px,3vh,34px)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '-0.02em', color: '#EDEDED', margin: 0 }}>
              Frameworks
            </h3>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>[A]</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}>
            {[
              { name: 'NIST SP 800-171', tag: 'COMPLIANCE' },
              { name: 'CIS Benchmarks',  tag: 'HARDENING' },
              { name: 'MITRE ATT&CK',    tag: 'THREAT_MODEL' },
            ].map(({ name, tag }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#EDEDED', letterSpacing: '0.02em' }}>{name}</span>
                <span style={{ color: '#666' }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>

        {/* local AI */}
        <div style={{ background: '#050505', padding: 'clamp(26px,3vw,40px)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 'clamp(22px,3vh,34px)' }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '-0.02em', color: '#EDEDED', margin: 0 }}>
              Local AI Architecture
            </h3>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>[B]</span>
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5 }}>
            {[
              { name: 'Ollama',            tag: 'LOCAL_INFERENCE' },
              { name: 'Agentic Workflows', tag: 'ORCHESTRATION' },
              { name: 'Python',            tag: 'AUTOMATION' },
            ].map(({ name, tag }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#EDEDED', letterSpacing: '0.02em' }}>{name}</span>
                <span style={{ color: '#666' }}>{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* certifications strip */}
      <div style={{ marginTop: 1, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none' }}>
        <div style={{
          background: '#050505', padding: 'clamp(26px,3vw,40px)',
          display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px,4vw,56px)',
          alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
            <h3 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(1.2rem,2vw,1.6rem)', letterSpacing: '-0.02em', color: '#EDEDED', margin: 0 }}>
              Core Certifications
            </h3>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#555' }}>[C]</span>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
            {certsPrimary.map((c) => (
              <span key={c} style={{ border: '1px solid var(--accent)', padding: '9px 15px', color: 'var(--accent)' }}>{c}</span>
            ))}
            {certsSecondary.map((c) => (
              <span key={c} style={{ border: '1px solid rgba(255,255,255,0.14)', padding: '9px 15px', color: '#BBB' }}>{c}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
