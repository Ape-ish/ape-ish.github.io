export default function Profile() {
  return (
    <section id="profile" className="section-panel" style={{
      background: 'rgba(5,5,5,0.82)',
      borderTop: '1px solid rgba(255,255,255,0.07)',
      padding: 'clamp(72px,12vh,140px) clamp(18px,4vw,56px)',
    }}>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
        letterSpacing: '0.2em', color: 'var(--accent)',
        paddingBottom: 'clamp(36px,5vh,56px)',
      }}>
        01 / PROFILE
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'clamp(32px,5vw,80px)', alignItems: 'start',
      }}>
        {/* main text */}
        <div style={{ gridColumn: 'span 2', minWidth: 300 }}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 500,
            fontSize: 'clamp(1.5rem,3.4vw,2.7rem)',
            lineHeight: 1.28, letterSpacing: '-0.025em', color: '#EDEDED',
            margin: 0,
          }}>
            Cybersecurity architect{' '}
            <span style={{ color: '#555' }}>(CASP+)</span>{' '}
            translating high-level security architecture into{' '}
            <span style={{ color: 'var(--accent)' }}>automated, executable workflows</span>
            {' '}— bridging engineering teams and the business stakeholders who depend on them.
          </p>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontWeight: 400,
            fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.6, color: '#888',
            maxWidth: 620, margin: 'clamp(28px,4vh,40px) 0 0',
          }}>
            A foundation in high-stakes client communication from the Mayo Clinic and
            infrastructure operations, paired with elite-level certifications. I break down
            dense compliance frameworks into digestible steps, architect secure environments,
            and use Python to eliminate operational friction.
          </p>
        </div>

        {/* sidebar */}
        <div style={{
          minWidth: 240,
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          paddingLeft: 'clamp(20px,2vw,32px)',
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace", fontSize: 11,
            letterSpacing: '0.2em', color: '#666', marginBottom: 22,
          }}>
            // CORE_PHILOSOPHY
          </div>
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(13px,1.4vw,15px)', lineHeight: 1.65, color: '#EDEDED', margin: 0,
          }}>
            &ldquo;Security and reliability shouldn&rsquo;t be bottlenecks
            <span style={{ color: 'var(--accent)' }}>—</span>they should be built-in features.&rdquo;
          </p>

          <div style={{ marginTop: 'clamp(30px,4vh,42px)', display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
            {[
              { label: 'DEGREE', value: 'B.S. CSIA · WGU' },
              { label: 'ROLE',   value: 'Technical Instructor' },
              { label: 'BASE',   value: 'Fleming Island, FL' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ color: '#666' }}>{label}</span>
                <span style={{ color: '#EDEDED' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
