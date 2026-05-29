export default function Masthead() {
  return (
    <header className="masthead">
      <canvas id="headnet" />
      <div className="mast-inner">
        <div className="kicker">Resume</div>
        <h1>Curtis Whipple</h1>
        <div className="tagline">
          IT Manager <span className="sep">/</span> Cybersecurity Specialist{" "}
          <span className="sep">/</span> Computer Science Student
        </div>
        <div className="contact">
          <a href="mailto:support@cwhipple.me">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            support@cwhipple.me
          </a>
          <a href="https://www.linkedin.com/in/curtiswhipple/" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <path d="M7 10v7M7 7v0M11 17v-4a2 2 0 0 1 4 0v4" />
            </svg>
            LinkedIn
          </a>
          <a href="https://github.com/Ape-ish" target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 24 24">
              <path d="M9 19c-4 1.5-4-2.5-6-3m12 5v-3.5a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.3 4.3 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.4 0C6.5 2.7 5.4 3 5.4 3a4.3 4.3 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.4c0 4.7 2.8 5.7 5.5 6a3 3 0 0 0-.8 2.3V21" />
            </svg>
            GitHub
          </a>
          <span className="loc">
            <svg viewBox="0 0 24 24">
              <path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" />
              <circle cx="12" cy="10" r="2.5" />
            </svg>
            Fleming Island, FL
          </span>
        </div>
      </div>
    </header>
  );
}
