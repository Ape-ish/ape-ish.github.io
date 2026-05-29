export default function Education() {
  return (
    <section className="card">
      <div className="sec-label">Education</div>
      <h2>Education</h2>

      <div className="edu-item">
        <div className="edu-school">
          Western Governors University <span className="city">Salt Lake City, UT</span>
        </div>
        <div className="edu-degree">B.S. Cybersecurity and Information Assurance</div>
        <div className="edu-detail">
          <span className="lab">Relevant Coursework:</span> Penetration Testing,
          Cloud Security, Digital Forensics, Scripting &amp; Programming (Python).
        </div>
      </div>

      <div className="edu-item">
        <div className="edu-school">
          University of Central Florida <span className="city">Orlando, FL</span>
        </div>
        <div className="edu-degree">
          CompTIA Certification Program (A+, Network+, Security+)
        </div>
      </div>

      <div className="edu-item">
        <div className="edu-school">
          Florida State College at Jacksonville{" "}
          <span className="city">Jacksonville, FL</span>
        </div>
        <div className="edu-degree">Associate in Arts (Honors)</div>
        <div className="edu-detail">
          <span className="lab">Technical Certificates:</span> Accounting Technology
          Management, Accounting Technology Operations.
        </div>
      </div>
    </section>
  );
}
