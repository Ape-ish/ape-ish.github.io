const JOBS = [
  {
    title: "IT Manager — FPSB (E-Commerce & Retail)",
    org: "FPSB",
    meta: "Fleming Island, FL · March 2015 – Present",
    bullets: [
      ["Infrastructure Design:", "Designed and implemented complete IT infrastructure for a multi-platform business, including network design, hardware procurement, and firewall configuration."],
      ["E-Commerce Architecture:", "Led the architectural redesign and migration of the company web presence to Shopify, managing integrations with Amazon (FBA/FBM) and eBay."],
      ["Security Operations:", "Conducted vulnerability assessments and monitored network traffic using Wireshark to mitigate threats; developed comprehensive information security policies."],
      ["Technical Support:", "Served as the sole technical owner for all end-user devices, network hardware, and software troubleshooting, ensuring zero downtime for online sales operations."],
    ],
  },
  {
    title: "Adjunct Technical Instructor — ACI Learning",
    org: "ACI Learning",
    meta: "Remote/Hybrid · July 2023 – Present",
    bullets: [
      ["Technical Instruction:", "Delivered high-velocity training programs and hands-on virtual labs for CompTIA certifications (Sec+, Net+, CEH)."],
      ["Curriculum Development:", "Designed training materials and lab exercises to bridge skill gaps and align with current IT job market requirements."],
      ["Student Success:", "Coached learners toward certification achievement, adapting instructional methods to diverse technical skill levels."],
    ],
  },
  {
    title: "Patient Appointment Services Specialist (PASS) — Mayo Clinic",
    org: "Mayo Clinic",
    meta: "Rochester, MN (Remote) · July 2024 – Present",
    bullets: [
      ["Systems Management:", "Navigate complex scheduling workflows within the Epic Electronic Medical Record (EMR) system to coordinate patient care across multispecialty practices."],
      ["Data Integrity:", "Verify detailed patient demographic and insurance data to ensure the integrity of electronic health records."],
      ["Problem Solving:", "Interpret complex institutional policies and medical necessity criteria to make independent scheduling decisions in a high-volume environment."],
    ],
  },
  {
    title: "Outbound Dock Supervisor / Operations — Southeastern Freight Lines",
    org: "Southeastern Freight Lines",
    meta: "Jacksonville, FL · April 2016 – August 2023",
    bullets: [
      ["Leadership:", "Supervised and coordinated teams of 20+ personnel, including drivers and dock associates, ensuring adherence to safety protocols and operational deadlines."],
      ["Logistics Optimization:", "Planned and executed efficient route strategies and load distributions to maximize fleet utilization and safety."],
      ["Operational Analysis:", "Analyzed workflow data to resolve operational bottlenecks and improve production efficiency."],
    ],
  },
];

export default function Experience() {
  return (
    <section className="card">
      <div className="sec-label">Professional Experience</div>
      <h2>Professional Experience</h2>
      <div className="timeline">
        {JOBS.map((job) => (
          <div className="job" key={job.title}>
            <div className="job-title">{job.title}</div>
            <div className="job-meta">
              <span className="org">{job.org}</span> · {job.meta}
            </div>
            <ul className="bullets">
              {job.bullets.map(([label, text]) => (
                <li key={label}>
                  <b>{label}</b> {text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
