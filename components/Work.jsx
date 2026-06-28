'use client';
import { useState } from 'react';
import ProjectDrawer from './ProjectDrawer';
import LabDrawer from './LabDrawer';

const dojo = [
  {
    index: '[ 002 ]', status: 'IN_DEVELOPMENT',
    title: 'PCAP Telemetry Analyzer',
    desc: 'Python utility that ingests scrubbed PCAP datasets, parses the telemetry, and generates executive-level summaries of anomalies and top communicators — cutting Mean Time to Detect by automating packet triage.',
    tags: 'Python · SOC · SRE',
    href: 'https://github.com/Ape-ish/automated-pcap-analyzer',
    stack: ['Python 3', 'Scapy', 'Pandas', 'SOC Tooling'],
    problem: 'PCAP analysis is manual, slow, and demands specialist knowledge. Analysts buried in raw packet data have no fast path to readable summaries — every minute of triage is a minute the threat goes uncontained.',
    mechanics: 'Ingests scrubbed PCAP files via Scapy and constructs a Pandas DataFrame of flows, top talkers, and protocol anomalies. A templated report engine formats findings into plain-language executive summaries — compressing hours of manual triage into a single CLI run.',
  },
  {
    index: '[ 003 ]', status: 'LOCAL_AI',
    title: 'Automated Job Pipeline',
    desc: 'A three-stage, LLM-driven pipeline that scrapes, triages, and executes applications across commercial ATS and federal portals — local inference for extraction and triage, cloud inference for artifact generation.',
    tags: 'Local LLM · Agentic',
    href: 'https://github.com/Ape-ish/automated-job-pipeline',
    stack: ['Python', 'Playwright', 'Ollama', 'Claude API', 'LangChain'],
    problem: 'Job searching across ATS platforms and federal portals is repetitive, inconsistent, and schema-unpredictable. Each portal demands custom form logic, and tailoring application artifacts at scale is prohibitively time-consuming.',
    mechanics: 'Three-stage pipeline: (1) Playwright scraper harvests postings and normalises metadata into a unified schema. (2) A local LLM (Ollama) scores and triages role-fit, discarding noise before any cloud call is made. (3) Claude API generates targeted cover letters and application artifacts, then the pipeline executes the submission — end-to-end.',
  },
  {
    index: '[ 004 ]', status: 'R&D',
    title: 'Custom GPT Agents',
    desc: 'A benchmark-design framework for custom GPT agents — adversarial "what-if" test suites that stress reasoning quality, tone, and multi-turn coherence to ship reliable, user-ready conversational systems.',
    tags: 'Agentic · Eval',
    href: 'https://github.com/Ape-ish/potential-broccoli',
    stack: ['OpenAI API', 'Python', 'Prompt Engineering', 'Eval Frameworks'],
    problem: 'Shipping custom GPT agents without structured benchmarks produces inconsistent tone, reasoning failures under adversarial input, and no measurable quality bar — teams ship on vibes and discover failures in production.',
    mechanics: 'Defines adversarial test suites — "what-if" prompts engineered to break reasoning chains, expose tone drift, and stress multi-turn coherence. Each run outputs a benchmark score against pre-defined rubrics, giving teams a quantifiable quality gate before any agent reaches users.',
  },
];

const lab = [
  {
    num: '05', title: 'AI Travel Agent',
    desc: 'LangGraph multi-LLM assistant with stateful, human-in-the-loop orchestration for flights, hotels, and email automation.',
    badge: 'LANGGRAPH', accent: true,
    stack: ['Python', 'LangGraph', 'Claude API', 'Gmail API'],
    summary: 'A stateful, multi-agent system where specialised nodes handle discrete sub-tasks — flight lookup, hotel search, preference matching — with human approval gates before any booking is committed. LangGraph state graphs prevent context loss across multi-turn conversations.',
    repoUrl: 'https://github.com/Ape-ish/ai-travel-agent',
    diagram: `flowchart TD
    A[User Intent] --> B[LangGraph Orchestrator]
    B --> C[Flight Node]
    B --> D[Hotel Node]
    C --> E[Amadeus API]
    D --> F[Booking API]
    E --> G{Human Approval Gate}
    F --> G
    G -->|Approved| H[Claude Synthesis]
    G -->|Rejected| B
    H --> I[Gmail Dispatch]`,
  },
  {
    num: '06', title: 'LLM Micro-Cap Experiment',
    desc: 'A live experiment putting an LLM in charge of a real-money portfolio — Python, Pandas, and yFinance with daily PnL tracking.',
    badge: 'LLM_OPS', accent: true,
    stack: ['Python', 'Pandas', 'yFinance', 'OpenAI API'],
    summary: 'A live, real-money experiment testing whether an LLM can outperform passive investing on micro-cap equities. Daily candle data feeds a signal-generation pipeline; the model reasons over macro sentiment, technicals, and position sizing before any trade executes.',
    repoUrl: 'https://github.com/Ape-ish/ChatGPT-Micro-Cap-Experiment',
    diagram: `flowchart LR
    A[yFinance Feed] --> B[Data Normaliser]
    B --> C[LLM Signal Engine]
    C --> D{Decision Gate}
    D -->|Buy| E[Open Position]
    D -->|Hold| F[Monitor]
    D -->|Sell| G[Close Position]
    E --> H[PnL Ledger]
    G --> H
    H --> I[Daily Report]`,
  },
  {
    num: '07', title: 'Flex Block Automation',
    desc: 'Event-driven Python automation that polls and claims job blocks in real time — a study in resilient scheduling logic.',
    badge: 'AUTOMATION', accent: false,
    stack: ['Python', 'Requests', 'Event Loop', 'Push Notifications'],
    summary: 'A persistent event loop that monitors the offer API at configurable intervals. When a qualifying block appears, it fires a claim request within milliseconds. Resilience layers handle rate limits, session expiry, and network failures without dropping the polling loop.',
    repoUrl: 'https://github.com/Ape-ish/AmazonFlexUnlimited',
    diagram: `flowchart TD
    A[Scheduler Tick] --> B[Poll Offer API]
    B --> C{Block Found?}
    C -->|No| D[Backoff Wait]
    D --> A
    C -->|Yes| E{Criteria Match?}
    E -->|No| D
    E -->|Yes| F[Claim Request]
    F --> G{Claimed?}
    G -->|No| D
    G -->|Yes| H[Calendar Sync]
    H --> I[Push Notify]`,
  },
  {
    num: '08', title: 'Python 3 — Deep Work',
    desc: 'Ongoing language depth-building — the foundation under every automation and analysis tool in this index.',
    badge: 'FOUNDATIONS', accent: false,
    stack: ['Python 3', 'OOP', 'Data Structures', 'Standard Library'],
    summary: 'Structured progression from language fundamentals to applied systems — covering data structures, OOP patterns, functional paradigms, and the standard library modules underpinning every automation in this index. No shortcuts; every concept earned through deliberate repetition.',
    repoUrl: 'https://github.com/Ape-ish/Complete-Python-3-Bootcamp',
    diagram: `flowchart LR
    A[Syntax and Types] --> B[Data Structures]
    B --> C[OOP Patterns]
    C --> D[Standard Library]
    D --> E[Concurrency]
    E --> F[API Clients]
    F --> G[Applied Systems]`,
  },
];

export default function Work() {
  const [activeProject, setActiveProject] = useState(null);
  const [activeLab, setActiveLab] = useState(null);

  return (
    <>
      <section id="work" className="section-panel" style={{
        background: 'rgba(5,5,5,0.1)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: 'clamp(72px,12vh,150px) clamp(18px,4vw,56px)',
      }}>

        {/* header row */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)',
          paddingBottom: 'clamp(32px,5vh,56px)', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span style={{ color: 'var(--accent)' }}>02 / FEATURED_DEPLOYMENT</span>
          <span>INDEX 001 — 004</span>
        </div>

        {/* featured project */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'clamp(32px,5vw,72px)',
          paddingTop: 'clamp(40px,6vh,72px)', alignItems: 'start',
        }}>
          <div style={{ gridColumn: 'span 2', minWidth: 300 }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)', marginBottom: 18 }}>
              PROJECT_NAME
            </div>
            <h2 style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 700,
              fontSize: 'clamp(2.1rem,5.2vw,4.6rem)',
              lineHeight: 0.96, letterSpacing: '-0.035em', color: '#EDEDED', margin: 0,
            }}>
              Humanizing the<br />CIS Controls<span style={{ color: 'var(--accent)' }}>.</span>
            </h2>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontWeight: 400,
              fontSize: 'clamp(15px,1.6vw,19px)', lineHeight: 1.55, color: 'hsl(180, 100%, 70%)',
              maxWidth: 560, margin: 'clamp(26px,4vh,38px) 0 0',
            }}>
              Translating technical security safeguards into mechanistic, executable frames for
              non-technical audiences — turning dense compliance language into operations people
              can actually run.
            </p>
            <a
              href="https://github.com/Ape-ish/humanizing-cis-controls"
              target="_blank" rel="noopener"
              className="repo-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 12,
                marginTop: 'clamp(30px,4vh,44px)',
                fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.04em',
                color: '#EDEDED', border: '1px solid rgba(255,255,255,0.16)',
                padding: '14px 22px', background: '#070707',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>&gt;</span> view_repository
              <span style={{ color: 'hsl(180, 100%, 70%)' }}>_</span>
            </a>
          </div>

          {/* metadata sidebar */}
          <div style={{ minWidth: 240, borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 'clamp(20px,2vw,32px)' }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)', marginBottom: 22 }}>
              // METADATA
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 12 }}>
              {[
                { k: 'ROLE',      v: 'Author / Translator',  vStyle: {} },
                { k: 'FRAMEWORK', v: 'CIS Controls v8.1',    vStyle: {} },
                { k: 'YEAR',      v: '2025',                 vStyle: {} },
                { k: 'STATUS',    v: 'ACTIVE ●',             vStyle: { color: 'var(--accent)' } },
              ].map(({ k, v, vStyle }) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  <span style={{ color: 'hsl(180, 100%, 70%)', letterSpacing: '0.1em' }}>{k}</span>
                  <span style={{ color: '#EDEDED', ...vStyle }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* project visual placeholder */}
        <div style={{
          marginTop: 'clamp(40px,6vh,72px)',
          position: 'relative', height: 'clamp(220px,38vh,420px)',
          border: '1px solid rgba(255,255,255,0.09)',
          background: 'repeating-linear-gradient(135deg, rgba(255,255,255,0.018) 0px, rgba(255,255,255,0.018) 1px, transparent 1px, transparent 11px), #060606',
          overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ position: 'absolute', top: 14, left: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'hsl(180, 100%, 70%)' }}>
            // PROJECT_VISUAL — drop image / 3D frame
          </div>
          <div style={{ position: 'absolute', bottom: 14, right: 16, fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'hsl(180, 100%, 70%)' }}>
            1920 × 1080
          </div>
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(61,245,160,0.06), transparent)',
            width: '40%', animation: 'sweep 4.5s linear infinite',
          }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.24em', color: 'hsl(180, 100%, 70%)' }}>
            [ AWAITING_ASSET ]
          </span>
        </div>

        {/* ---- The Technical Dojo ---- */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)',
          marginTop: 'clamp(64px,10vh,110px)',
          paddingBottom: 'clamp(28px,4vh,40px)', borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span>// THE_TECHNICAL_DOJO</span>
          <span>INDEX 002 — 004</span>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 1, background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.08)', borderTop: 'none', marginTop: 1,
        }}>
          {dojo.map((p) => (
            <div
              key={p.index}
              role="button"
              tabIndex={0}
              onClick={() => setActiveProject(p)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveProject(p); }}
              className="project-card"
              style={{
                background: 'rgba(5,5,5,0.1)', padding: 'clamp(26px,2.6vw,38px)',
                display: 'flex', flexDirection: 'column', minHeight: 300,
                cursor: 'pointer',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 10 }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'var(--accent)', letterSpacing: '0.06em' }}>{p.index}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.12em', color: 'hsl(180, 100%, 70%)' }}>{p.status}</span>
              </div>
              <h3 style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 600,
                fontSize: 'clamp(1.25rem,2vw,1.65rem)', letterSpacing: '-0.02em',
                color: '#EDEDED', margin: 'clamp(20px,3vh,30px) 0 0',
              }}>{p.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, lineHeight: 1.55, color: 'hsl(180, 100%, 70%)', margin: '14px 0 0', flex: 1 }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 24, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'hsl(180, 100%, 70%)' }}>{p.tags}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: '#EDEDED' }}>→</span>
              </div>
            </div>
          ))}
        </div>

        {/* ---- The Lab ---- */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 12,
          fontFamily: "'JetBrains Mono', monospace", fontSize: 11, letterSpacing: '0.2em', color: 'hsl(180, 100%, 70%)',
          marginTop: 'clamp(64px,10vh,110px)',
          paddingBottom: 18, borderBottom: '1px solid rgba(255,255,255,0.07)',
        }}>
          <span>// THE_LAB</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s ease-in-out infinite', display: 'inline-block' }} />
            ACTIVELY_BUILDING
          </span>
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 'clamp(14px,1.5vw,16px)', lineHeight: 1.55, color: 'hsl(180, 100%, 70%)',
          maxWidth: 620, margin: 'clamp(20px,3vh,28px) 0 clamp(28px,4vh,40px)',
        }}>
          Open forks and studies I&rsquo;m building on — proving out AI and automation concepts in the open. Where theory becomes working code.
        </p>

        <div style={{ border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}>
          {lab.map((row) => (
            <div
              key={row.num}
              role="button"
              tabIndex={0}
              onClick={() => setActiveLab(row)}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setActiveLab(row); }}
              className="lab-row"
              style={{
                display: 'grid',
                gridTemplateColumns: '46px minmax(0,1.1fr) minmax(0,1.6fr) auto',
                gap: 'clamp(14px,2vw,28px)', alignItems: 'center',
                padding: 'clamp(18px,2.4vh,24px) clamp(16px,2vw,28px)',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: 'hsl(180, 100%, 70%)' }}>{row.num}</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(15px,1.7vw,18px)', color: '#EDEDED', letterSpacing: '-0.01em' }}>
                {row.title}
              </span>
              <span className="lab-desc" style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, lineHeight: 1.45, color: 'hsl(180, 100%, 70%)' }}>
                {row.desc}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end' }}>
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace", fontSize: 10, letterSpacing: '0.1em',
                  color: row.accent ? 'var(--accent)' : 'hsl(180, 100%, 70%)',
                  border: row.accent ? '1px solid rgba(0,255,157,0.3)' : '1px solid rgba(255,255,255,0.16)',
                  padding: '5px 9px', whiteSpace: 'nowrap',
                }}>{row.badge}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: 'hsl(180, 100%, 70%)' }}>→</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <ProjectDrawer project={activeProject} onClose={() => setActiveProject(null)} />
      <LabDrawer     lab={activeLab}         onClose={() => setActiveLab(null)} />
    </>
  );
}
