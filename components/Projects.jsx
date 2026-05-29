const PROJECTS = [
  {
    name: "humanizing-cis-controls",
    date: "July 2025",
    desc: "A project dedicated to explaining the CIS Critical Security Controls in plain, understandable language.",
    tools: "GitHub, Markdown, Compliance Frameworks.",
    href: "https://github.com/Ape-ish/humanizing-cis-controls",
  },
  {
    name: "automated-pcap-analyzer",
    date: "In Development",
    desc: "A Python-based utility that ingests scrubbed PCAP datasets, automatically parses the telemetry, and generates an executive-level summary of network anomalies and top communicators — reducing Mean Time to Detect (MTTD) by automating the initial layer of packet triage.",
    tools: "Python 3.x, PCAP parsing, Threat Intel Matching.",
    href: "https://github.com/Ape-ish/automated-pcap-analyzer",
  },
  {
    name: "Ape-ish",
    desc: "Portfolio and Technical Profile.",
    href: "https://github.com/Ape-ish",
  },
];

export default function Projects() {
  return (
    <section className="card">
      <div className="sec-label">Projects</div>
      <h2>Projects</h2>
      <div className="proj-grid">
        {PROJECTS.map((p) => (
          <div className="project" key={p.name}>
            <div className="proj-top">
              <div className="proj-name">{p.name}</div>
              {p.date ? <div className="proj-date">{p.date}</div> : null}
            </div>
            <p>{p.desc}</p>
            {p.tools ? (
              <div className="proj-tools">
                <b>Tools:</b> {p.tools}
              </div>
            ) : null}
            <a
              className="proj-link"
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Repository
              <svg viewBox="0 0 24 24">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
