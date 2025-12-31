class StrategySection extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          /* Seamless background - transparent to match body */
          background: transparent;
          padding: 3rem 1.25rem 5rem;
          position: relative;
          overflow: hidden;
          font-family: 'Sora', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }

        /* Faster Scroll Animations */
        .scroll-animate {
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      transform 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          will-change: opacity, transform;
          backface-visibility: hidden;
        }

        .scroll-animate.fade-in-up {
          opacity: 0;
          transform: translateY(40px);
        }

        .scroll-animate.fade-in-left {
          opacity: 0;
          transform: translateX(-50px);
        }

        .scroll-animate.fade-in-right {
          opacity: 0;
          transform: translateX(50px);
        }

        .scroll-animate.scale-in {
          opacity: 0;
          transform: scale(0.95);
        }

        .scroll-animate.animate {
          opacity: 1 !important;
          transform: translateX(0) translateY(0) scale(1) !important;
        }

        .scroll-animate.stagger-1 { transition-delay: 0.1s; }
        .scroll-animate.stagger-2 { transition-delay: 0.2s; }
        .scroll-animate.stagger-3 { transition-delay: 0.3s; }
        .scroll-animate.stagger-4 { transition-delay: 0.4s; }
        .scroll-animate.stagger-5 { transition-delay: 0.5s; }
        .scroll-animate.stagger-6 { transition-delay: 0.6s; }

        @media (min-width: 1024px) {
          :host {
            padding: 4.25rem 2rem 6rem;
          }
        }

        .bg-orbit {
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(circle at 0% 0%, rgba(4, 215, 194, 0.12), transparent 55%),
            radial-gradient(circle at 110% 60%, rgba(139, 85, 255, 0.18), transparent 60%);
          opacity: 0.9;
          filter: blur(2px);
          pointer-events: none;
          z-index: 0;
        }

.container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 3.5rem;
        }

        .eyebrow {
          font-size: 0.85rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(226, 232, 240, 0.7);
          margin-bottom: 0.75rem;
        }

        h2 {
          font-size: clamp(2.1rem, 3vw, 2.8rem);
          font-weight: 700;
          margin: 0 0 0.85rem;
          background: linear-gradient(120deg, #04d7c2, #00b9ff 55%, #8b55ff 95%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 1rem;
          max-width: 640px;
          margin: 0 auto;
          color: #9ca3af;
        }

        .layout {
            display: grid;
          grid-template-columns: 1fr;
            gap: 2rem;
          align-items: stretch;
        }

        @media (min-width: 960px) {
          .layout {
            grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
            gap: 2.75rem;
          }
        }

        /* Left detail panel */
        .detail-panel {
          position: relative;
          border-radius: 1.75rem;
          padding: 2rem 1.75rem 2.1rem;
          background:
            radial-gradient(circle at top left, rgba(4, 215, 194, 0.16), transparent 55%),
            radial-gradient(circle at bottom, rgba(15, 23, 42, 0.98), #020617);
          /* Soft neon border using gradient + glow instead of a hard line */
          border: 1px solid rgba(15, 23, 42, 0.9);
          box-shadow:
            0 0 0 1px rgba(56, 189, 248, 0.25),
            0 0 24px rgba(56, 189, 248, 0.28),
            0 26px 60px rgba(15, 23, 42, 0.9);
          overflow: hidden;
        }

        @media (min-width: 960px) {
          .detail-panel {
            padding: 2.25rem 2.4rem 2.5rem;
          }
        }

        .detail-orbit {
          position: absolute;
          inset: -40%;
          background:
            conic-gradient(from 220deg, rgba(4, 215, 194, 0.4), transparent 35%, rgba(0, 185, 255, 0.6), transparent 70%, rgba(139, 85, 255, 0.9), transparent);
          opacity: 0.27;
          filter: blur(5px);
          pointer-events: none;
        }

        .detail-inner {
          position: relative;
          z-index: 1;
        }

        .detail-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.2rem 0.75rem 0.2rem 0.22rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(148, 163, 184, 0.5);
          margin-bottom: 1.35rem;
        }

        .detail-pill-badge {
          display: inline-flex;
          width: 32px;
          height: 32px;
          border-radius: 999px;
          align-items: center;
          justify-content: center;
          color: #081320;
          font-size: 1.25rem;
        }

        .detail-pill-label {
          font-size: 0.8rem;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #e5e7eb;
        }

        .detail-step {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.25rem;
          margin-bottom: 0.6rem;
          }

        .detail-step-text {
          display: flex;
          align-items: baseline;
          gap: 0.7rem;
        }

        /* Hide STEP 1/2/3 label to keep the left panel cleaner */
        .detail-step-index {
          display: none;
        }

        .detail-step-title {
          font-size: clamp(1.4rem, 2vw, 1.7rem);
          font-weight: 600;
          color: #e5e7eb;
        }

        .detail-timeline {
          font-size: 0.9rem;
          color: #a5b4fc;
          background: rgba(15, 23, 42, 0.8);
          padding: 0.35rem 0.85rem;
          border-radius: 999px;
          border: 1px solid rgba(129, 140, 248, 0.5);
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
        }

        .detail-timeline-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #4ade80;
        }

        .detail-subtitle {
          font-size: 1.05rem;
          color: #e5e7eb;
          margin-bottom: 1.4rem;
          }

        .detail-body {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1.1fr);
          column-gap: 2.1rem;
          row-gap: 0.75rem;
          align-items: flex-start;
        }

        @media (max-width: 900px) {
          .detail-body {
            grid-template-columns: minmax(0, 1fr);
          }
        }

        .detail-description {
          font-size: 1rem;
          color: #cbd5f5;
          line-height: 1.8;
        }

        .detail-list {
          margin: 0.25rem 0 0;
          padding: 0.55rem 0 0;
          list-style: none;
          /* Faint gradient line that blends into the panel instead of a sharp rule */
          border-top: 1px solid transparent;
          background-image: linear-gradient(
            to right,
            transparent,
            rgba(148, 163, 184, 0.35),
            transparent
          );
          background-origin: border-box;
          background-clip: padding-box, border-box;
        }

        .detail-list-item {
          display: flex;
          align-items: flex-start;
          gap: 0.55rem;
          font-size: 0.96rem;
          color: #e5e7eb;
          padding: 0.45rem 0.1rem;
        }

        .detail-list-item:not(:last-child) {
          /* Replace hard divider with a soft inner glow */
          box-shadow: 0 1px 0 rgba(15, 23, 42, 0.7);
        }

        .detail-list-bullet {
          margin-top: 0.55rem;
          width: 8px;
          height: 8px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 15%, #22c55e, #0ea5e9);
          flex-shrink: 0;
        }

        .detail-output {
          position: relative;
          margin-top: 1.9rem;
          padding-top: 1.6rem;
        }

        .detail-output::before {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          height: 1px;
          /* Softer glow-style separator instead of a crisp line */
          background: radial-gradient(circle at 50% 0, rgba(148, 163, 184, 0.9), transparent 70%);
          opacity: 0.6;
        }

        .detail-output-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(148, 163, 184, 0.9);
          margin-bottom: 0.4rem;
        }

        .detail-output-pill {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.4rem 0.85rem 0.4rem 0.45rem;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(59, 130, 246, 0.6);
          color: #e5e7eb;
          font-size: 0.85rem;
        }

        .detail-output-icon {
          width: 26px;
          height: 26px;
          border-radius: 999px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: radial-gradient(circle at 30% 20%, #facc15, #f97316);
          color: #081320;
        }

        /* Floating animation state for detail panel */
        .detail-panel.animate-in {
          animation: detailPop 480ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        @keyframes detailPop {
          0% {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
            box-shadow: 0 0 0 rgba(15, 23, 42, 0);
          }
          45% {
            opacity: 1;
            transform: translateY(-4px) scale(1.02);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Right timeline column */
        .timeline-wrapper {
          position: relative;
          padding-left: 0.25rem;
        }

        @media (min-width: 960px) {
          .timeline-wrapper {
            padding-left: 0.5rem;
          }
        }

        .timeline-rail {
          position: absolute;
          top: 0.75rem;
          left: 1.15rem;
          bottom: 0.8rem;
          width: 2px;
          background: linear-gradient(to bottom, rgba(148, 163, 184, 0.9), rgba(15, 23, 42, 0.1));
          opacity: 0.6;
        }

        @media (max-width: 768px) {
          .timeline-rail {
            left: 1.05rem;
          }
        }

        .timeline-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .timeline-item {
          position: relative;
          display: flex;
          align-items: stretch;
          gap: 1.2rem;
          }

        .timeline-marker {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 1.05rem;
          flex-shrink: 0;
        }

        .timeline-dot {
          width: 16px;
          height: 16px;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 20%, #e5e7eb, #6b7280);
          box-shadow: 0 0 0 3px rgba(31, 41, 55, 0.95), 0 0 0 7px rgba(31, 41, 55, 0.3);
          transition: all 220ms ease;
        }

        .timeline-item.is-active .timeline-dot {
          background: radial-gradient(circle at 30% 15%, #fbbf24, #8b5cf6);
          box-shadow:
            0 0 0 3px rgba(15, 23, 42, 0.98),
            0 0 0 8px rgba(56, 189, 248, 0.16),
            0 0 24px rgba(56, 189, 248, 0.45);
          transform: scale(1.12);
          }

        .timeline-card {
          flex: 1;
          border-radius: 1.05rem;
          padding: 0.85rem 1rem 0.95rem;
          background: rgba(15, 23, 42, 0.9);
          border: 1px solid rgba(31, 41, 55, 0.9);
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 0.85rem 0.9rem;
          cursor: pointer;
          transition: border-color 200ms ease, transform 180ms ease, background 200ms ease, box-shadow 200ms ease;
        }

        .timeline-card:hover {
          border-color: rgba(59, 130, 246, 0.8);
          transform: translateY(-2px);
          box-shadow: 0 18px 36px rgba(15, 23, 42, 0.75);
        }

        .timeline-item.is-active .timeline-card {
          border-color: rgba(56, 189, 248, 0.95);
          background: radial-gradient(circle at top left, rgba(8, 47, 73, 0.95), rgba(15, 23, 42, 0.98));
        }

        .timeline-icon {
          width: 40px;
          height: 40px;
          border-radius: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #081320;
          font-size: 1.3rem;
        }

        .timeline-icon svg,
        .detail-pill-badge svg {
          width: 22px;
          height: 22px;
        }

        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 0.1rem;
        }

        .timeline-step-label {
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.16em;
          color: rgba(156, 163, 175, 0.9);
        }

        .timeline-title {
          font-size: 0.98rem;
          font-weight: 600;
          color: #e5e7eb;
        }

        .timeline-desc {
          font-size: 0.8rem;
          color: #9ca3af;
        }

        .timeline-meta {
          font-size: 0.78rem;
          color: #a5b4fc;
          margin-top: 0.1rem;
          }

        /* Hide horizontal connector line between marker and card for a cleaner look */
        .timeline-connector {
          display: none;
        }

        /* CTA row */
        .cta-row {
          margin-top: 2.4rem;
          display: flex;
          justify-content: center;
        }

        .cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.9rem 2.4rem;
          border-radius: 0.85rem;
          border: none;
          background-image: linear-gradient(120deg, #04d7c2, #06f5d4);
          color: #011b21;
          font-size: 0.98rem;
          font-weight: 600;
          text-decoration: none;
          cursor: pointer;
          box-shadow: 0 18px 45px rgba(0, 166, 255, 0.3);
          transition: transform 200ms ease, box-shadow 220ms ease, background-image 200ms ease;
        }

        .cta-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 55px rgba(4, 215, 194, 0.45);
          background-image: linear-gradient(120deg, #06f5d4, #04d7c2);
        }

        .cta-arrow {
          font-size: 1.1rem;
        }
      </style>

      <div class="thematic-section py-20" aria-hidden="true"></div>

      <div class="container">
        <header class="header">
          <div class="eyebrow">How We Build With You</div>
          <h2>From Discovery to Scaled AI</h2>
        <p class="subtitle">
            We turn ideas into production AI systems through a guided, hands-on partnership — one step at a time.
        </p>
        </header>
        
        <div class="layout">
          <!-- Left: animated detail panel -->
          <section class="detail-panel" aria-live="polite">
            <div class="detail-orbit" aria-hidden="true"></div>
            <div class="detail-inner">
              <div class="detail-pill">
                <div class="detail-pill-badge" data-role="detail-icon"></div>
                <div class="detail-pill-label">Current Step</div>
            </div>
            
              <div class="detail-step">
                <div class="detail-step-text">
                  <div class="detail-step-index" data-role="detail-step-index"></div>
                  <div class="detail-step-title" data-role="detail-title"></div>
                </div>
                <div class="detail-timeline">
                  <span class="detail-timeline-dot"></span>
                  <span data-role="detail-timeline"></span>
            </div>
          </div>
          
              <p class="detail-subtitle" data-role="detail-subtitle"></p>
            
              <div class="detail-body">
                <div>
                  <p class="detail-description" data-role="detail-description"></p>
              </div>
                <div>
                  <ul class="detail-list" data-role="detail-list"></ul>
              </div>
            </div>
            
              <div class="detail-output">
                <div class="detail-output-label">Key Outcome</div>
                <div class="detail-output-pill">
                  <div class="detail-output-icon">
                    <span>★</span>
                  </div>
                  <span data-role="detail-output"></span>
            </div>
          </div>
            </div>
          </section>

          <!-- Right: vertical flow of steps -->
          <aside class="timeline-wrapper" aria-label="AI delivery process">
            <div class="timeline-rail" aria-hidden="true"></div>
            <ol class="timeline-list" data-role="timeline-list">
              <!-- Items injected by script -->
            </ol>
          </aside>
            </div>
            
        <div class="cta-row">
        <a href="https://calendly.com/tkrupt-llc/30min" class="cta-btn" style="background: linear-gradient(120deg, #05e3cf, #00a6ff)">
            <span>Walk us through this plan</span>
            <span class="cta-arrow">↗</span>
          </a>
            </div>
          </div>
    `;

    const icons = {
      search: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="6.5" stroke="#f8fafc" stroke-width="2.2"></circle>
        <line x1="16.889" y1="16.889" x2="21.2" y2="21.2" stroke="#f8fafc" stroke-width="2.2" stroke-linecap="round"></line>
      </svg>`,
      bulb: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 4C9.962 4 7.5 6.462 7.5 9.5C7.5 11.556 8.667 13.333 10.4 14.248L10.4 17.75H15.6L15.6 14.248C17.333 13.333 18.5 11.556 18.5 9.5C18.5 6.462 16.038 4 13 4Z" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.25 20.5H15.75" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
      </svg>`,
      dev: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.5 9L5.5 13L8.5 17" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M17.5 9L20.5 13L17.5 17" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.5 7L11.5 19" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      test: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 6H16" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
        <path d="M12 6V15.5C12 17.9853 14.0147 20 16.5 20V20C18.9853 20 21 17.9853 21 15.5V15.5C21 14.1193 20.4404 12.7969 19.44 11.7965L18 10.3565V6" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.5 20C12.0147 20 10 17.9853 10 15.5V15.5C10 14.1193 10.5596 12.7969 11.56 11.7965L13 10.3565" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`,
      ops: `<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7 14V11.5C7 8.46243 9.46243 6 12.5 6H13.5C16.5376 6 19 8.46243 19 11.5V14" stroke="#f8fafc" stroke-width="2" stroke-linecap="round"/>
        <path d="M6 14H8C9.10457 14 10 14.8954 10 16V18C10 19.1046 9.10457 20 8 20H6V14Z" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M20 14H18C16.8954 14 16 14.8954 16 16V18C16 19.1046 16.8954 20 18 20H20V14Z" stroke="#f8fafc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`
    };

    this._steps = [
      {
        id: "step-1",
        stepLabel: "Step 1",
        title: "Discovery Workshop",
        short: "Deep dive into your business challenges, goals, and infrastructure.",
        timeline: "Week 1–2",
        subtitle: "Find the highest‑impact AI opportunities before writing a single line of code.",
        description:
          "We start with a collaborative workshop to map your current workflows, data landscape, and strategic goals. Together, we identify high‑ROI use cases where AI can create immediate leverage while fitting inside your existing constraints.",
        bullets: [
          "Explore business challenges, success metrics, and technical constraints.",
          "Audit current data sources, tools, and integration points.",
          "Prioritize initiatives based on value, feasibility, and time‑to‑impact."
        ],
        output: "Prioritized AI opportunity map & 90‑day delivery plan",
        iconSvg: icons.search,
        iconBg: "linear-gradient(135deg, #22c55e, #0ea5e9)"
      },
      {
        id: "step-2",
        stepLabel: "Step 2",
        title: "Prototyping",
        short: "Rapid POC development to validate AI solutions and demonstrate value.",
        timeline: "Week 3–5",
        subtitle: "See your AI idea working with your own data — not a slide deck.",
        description:
          "We build a focused proof‑of‑concept against one or two priority use cases. You get a tangible prototype connected to your data so stakeholders can react to something real, not hypothetical requirements.",
        bullets: [
          "Design a lean but realistic prototype experience around the target workflow.",
          "Connect to representative datasets, tools, or APIs from your stack.",
          "Run live review sessions to capture feedback and refine the direction."
        ],
        output: "Clickable, demo‑ready AI prototype your team can trial",
        iconSvg: icons.bulb,
        iconBg: "linear-gradient(135deg, #06b6d4, #3b82f6)"
      },
      {
        id: "step-3",
        stepLabel: "Step 3",
        title: "Development",
        short: "Full‑scale implementation with agile methodology and continuous feedback.",
        timeline: "Week 6–10",
        subtitle: "Turn the validated prototype into a robust, production‑grade system.",
        description:
          "Once the concept is proven, we harden it: building the architecture, automations, and safety rails required for real‑world use. We work in short cycles with demos so you can steer priorities as we go.",
        bullets: [
          "Engineering of core services, workflows, and integrations.",
          "Model orchestration, evaluation loops, and observability hooks.",
          "Security, access control, and compliance considerations baked in."
        ],
        output: "Production‑ready AI application deployed in staging",
        iconSvg: icons.dev,
        iconBg: "linear-gradient(135deg, #6366f1, #8b5cf6)"
      },
      {
        id: "step-4",
        stepLabel: "Step 4",
        title: "Testing & Deployment",
        short: "Rigorous QA, security audits, and seamless production deployment.",
        timeline: "Week 11–14",
        subtitle: "Ship confidently with guardrails, monitoring, and rollout support.",
        description:
          "We put your AI system through structured testing — from functional QA and security to edge‑case behaviour. Together, we plan launch, rollout, and communication so teams are ready on day one.",
        bullets: [
          "End‑to‑end functional, performance, and safety testing.",
          "Security reviews and alignment with your internal standards.",
          "Staged rollout plan with clear success metrics and fallback paths."
        ],
        output: "Live production deployment with aligned launch plan",
        iconSvg: icons.test,
        iconBg: "linear-gradient(135deg, #ec4899, #a855f7)"
      },
      {
        id: "step-5",
        stepLabel: "Step 5",
        title: "AI Ops & Ongoing Support",
        short: "24/7 monitoring, retraining, upgrade cycles, and dedicated support.",
        timeline: "Ongoing",
        subtitle: "Keep your AI system healthy, accurate, and evolving with your business.",
        description:
          "After launch, we stay close — tracking performance, spotting drift, and helping your team evolve the system as your data and use cases change. Think of it as a co‑pilot for AI operations.",
        bullets: [
          "Continuous monitoring of quality, usage patterns, and edge cases.",
          "Retraining, prompt and policy updates as your data and needs shift.",
          "Regular roadmap check‑ins to uncover new automation opportunities."
        ],
        output: "Always‑on AI operations and improvement program",
        iconSvg: icons.ops,
        iconBg: "linear-gradient(135deg, #22c55e, #a3e635)"
      }
    ];

    this._renderTimeline();
    this._selectStep(this._steps[0].id, false);
    this._initAnimations();
  }

  _initAnimations() {
    const root = this.shadowRoot;
    
    // Add animation classes to elements
    const header = root.querySelector('.header');
    const detailPanel = root.querySelector('.detail-panel');
    const timelineItems = root.querySelectorAll('.timeline-item');
    const ctaBtn = root.querySelector('.cta-btn');
    
    if (header) {
      header.classList.add('scroll-animate', 'fade-in-up');
    }
    if (detailPanel) {
      detailPanel.classList.add('scroll-animate', 'fade-in-left');
    }
    if (ctaBtn) {
      ctaBtn.classList.add('scroll-animate', 'scale-in');
    }
    
    timelineItems.forEach((item, index) => {
      item.classList.add('scroll-animate', 'fade-in-right');
      item.classList.add(`stagger-${(index % 6) + 1}`);
    });
    
    // Intersection Observer for shadow DOM (slower trigger)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('animate');
            const children = entry.target.querySelectorAll('.scroll-animate:not(.animate)');
            children.forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('animate');
              }, index * 150);
            });
          }, 100);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe all animated elements
    root.querySelectorAll('.scroll-animate').forEach(el => {
      observer.observe(el);
    });
    
    // Observe the host element
    observer.observe(this);
  }

  _renderTimeline() {
    const list = this.shadowRoot.querySelector('[data-role="timeline-list"]');
    if (!list) return;

    list.innerHTML = "";

    this._steps.forEach((step, index) => {
      const li = document.createElement("li");
      li.className = "timeline-item";
      li.dataset.stepId = step.id;

      const connector = document.createElement("div");
      connector.className = "timeline-connector";
      if (index === this._steps.length - 1) {
        connector.style.opacity = "0";
      }

      li.innerHTML = `
        <div class="timeline-marker">
          <div class="timeline-dot"></div>
            </div>
        <div class="timeline-card">
          <div class="timeline-icon" style="background:${step.iconBg}">
            ${step.iconSvg}
          </div>
          <div class="timeline-content">
            <div class="timeline-step-label">${step.stepLabel}</div>
            <div class="timeline-title">${step.title}</div>
            <div class="timeline-desc">${step.short}</div>
            <div class="timeline-meta">${step.timeline}</div>
        </div>
      </div>
    `;

      li.appendChild(connector);

      li.addEventListener("click", () => {
        this._selectStep(step.id, true);
      });

      list.appendChild(li);
    });
  }

  _selectStep(stepId, animate) {
    const step = this._steps.find((s) => s.id === stepId);
    if (!step) return;

    // Update active state on timeline
    const items = this.shadowRoot.querySelectorAll(".timeline-item");
    items.forEach((item) => {
      if (item.dataset.stepId === stepId) {
        item.classList.add("is-active");
      } else {
        item.classList.remove("is-active");
      }
    });

    // Update left detail panel content
    const iconEl = this.shadowRoot.querySelector('[data-role="detail-icon"]');
    const indexEl = this.shadowRoot.querySelector('[data-role="detail-step-index"]');
    const titleEl = this.shadowRoot.querySelector('[data-role="detail-title"]');
    const timelineEl = this.shadowRoot.querySelector('[data-role="detail-timeline"]');
    const subtitleEl = this.shadowRoot.querySelector('[data-role="detail-subtitle"]');
    const descEl = this.shadowRoot.querySelector('[data-role="detail-description"]');
    const listEl = this.shadowRoot.querySelector('[data-role="detail-list"]');
    const outputEl = this.shadowRoot.querySelector('[data-role="detail-output"]');
    const panelEl = this.shadowRoot.querySelector(".detail-panel");

    if (!iconEl) return;

    iconEl.textContent = "";
    iconEl.style.backgroundImage = step.iconBg;
    iconEl.innerHTML = step.iconSvg;

    if (indexEl) indexEl.textContent = step.stepLabel;
    if (titleEl) titleEl.textContent = step.title;
    if (timelineEl) timelineEl.textContent = step.timeline;
    if (subtitleEl) subtitleEl.textContent = step.subtitle;
    if (descEl) descEl.textContent = step.description;
    if (outputEl) outputEl.textContent = step.output;

    if (listEl) {
      listEl.innerHTML = "";
      step.bullets.forEach((bullet) => {
        const li = document.createElement("li");
        li.className = "detail-list-item";
        li.innerHTML = `
          <span class="detail-list-bullet"></span>
          <span>${bullet}</span>
        `;
        listEl.appendChild(li);
      });
    }

    if (panelEl && animate) {
      panelEl.classList.remove("animate-in");
      // Trigger reflow to restart animation
      // eslint-disable-next-line no void
      void panelEl.offsetWidth;
      panelEl.classList.add("animate-in");
    }
  }
}

customElements.define("strategy-section", StrategySection);