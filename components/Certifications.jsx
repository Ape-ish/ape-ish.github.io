const COMPTIA = [
  { label: "CASP+ (Advanced Security Practitioner)", key: true },
  { label: "CySA+", key: true },
  { label: "PenTest+", key: true },
  { label: "Security+" },
  { label: "Network+" },
  { label: "A+" },
  { label: "Project+" },
];

const OTHER = [
  { label: "ISC² SSCP" },
  { label: "ITIL v4 Foundation" },
  { label: "Linux Essentials" },
];

function Chips({ items }) {
  return (
    <div className="chips">
      {items.map((c) => (
        <span className={c.key ? "chip key" : "chip"} key={c.label}>
          {c.label}
        </span>
      ))}
    </div>
  );
}

export default function Certifications() {
  return (
    <section className="card">
      <div className="sec-label">Certifications</div>
      <h2>Certifications</h2>
      <div className="cert-block">
        <div className="lab">CompTIA</div>
        <Chips items={COMPTIA} />
      </div>
      <div className="cert-block">
        <div className="lab">Other</div>
        <Chips items={OTHER} />
      </div>
    </section>
  );
}
