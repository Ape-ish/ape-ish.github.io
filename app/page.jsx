import Masthead from "../components/Masthead";
import Skills from "../components/Skills";
import Experience from "../components/Experience";
import Education from "../components/Education";
import Certifications from "../components/Certifications";
import Projects from "../components/Projects";
import NetworkScripts from "../components/NetworkScripts";

export default function Page() {
  return (
    <>
      <canvas id="watermark" />

      <Masthead />

      <main>
        <section className="card">
          <div className="sec-label">Profile</div>
          <h2>Profile</h2>
          <p className="profile-text">
            Motivated Computer Science graduate student (
            <strong>Georgia Tech OMSCS candidate</strong>) and Cybersecurity
            practitioner with a unique background in IT infrastructure, technical
            instruction, and operations management. Skilled in bridging the gap
            between complex technical requirements and business goals, with
            proven experience in network security, e-commerce architecture, and
            data analytics.
          </p>
        </section>

        <Skills />
        <Experience />
        <Education />
        <Certifications />
        <Projects />
      </main>

      <footer className="site-footer">
        Curtis Whipple · support@cwhipple.me · Fleming Island, FL
      </footer>

      <NetworkScripts />
    </>
  );
}
