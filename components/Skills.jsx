const SKILLS = [
  {
    title: "Cybersecurity",
    body: "Vulnerability Assessment (Nessus), Log Analysis (Wireshark), Digital Forensics (Autopsy), IDS/IPS Configuration.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
        <path d="M9.2 12l2 2 3.6-3.8" />
      </svg>
    ),
  },
  {
    title: "Infrastructure",
    body: "Linux/Windows Administration, Proxmox (Home Lab), Active Directory, DNS/Network Management.",
    icon: (
      <svg viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="6" rx="1.5" />
        <rect x="3" y="14" width="18" height="6" rx="1.5" />
        <path d="M7 7h0M7 17h0" />
      </svg>
    ),
  },
  {
    title: "Development & Data",
    body: "Python, SQL, PowerShell, GitHub, Power BI.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M8 7l-4 5 4 5M16 7l4 5-4 5M13.5 5l-3 14" />
      </svg>
    ),
  },
  {
    title: "Tools",
    body: "Microsoft Office Suite (Excel Expert), Epic/HIMS (Healthcare IT), Shopify E-commerce Architecture.",
    icon: (
      <svg viewBox="0 0 24 24">
        <path d="M14.5 5.5a3.5 3.5 0 0 0-4.6 4.6l-5.2 5.2a1.6 1.6 0 0 0 2.2 2.2l5.2-5.2a3.5 3.5 0 0 0 4.6-4.6L14 7.9 12.6 9.5 11 7.9l1.6-1.6z" />
      </svg>
    ),
  },
];

export default function Skills() {
  return (
    <section className="card">
      <div className="sec-label">Technical Skills</div>
      <h2>Technical Skills</h2>
      <div className="skills-grid">
        {SKILLS.map((s) => (
          <div className="skill-cell" key={s.title}>
            <div className="skill-head">
              <span className="skill-ico">{s.icon}</span>
              <h3>{s.title}</h3>
            </div>
            <p>{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
