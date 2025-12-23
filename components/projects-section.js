class ProjectsSection extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: transparent;
          padding: 3.5rem 1.25rem 5.5rem;
          font-family: 'Sora', system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          position: relative;
          overflow: hidden;
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

        /* Project pills - faster animation */
        .project-pill.scroll-animate {
          transition: opacity 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94), 
                      transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        }

        .project-pill.scroll-animate.fade-in-up {
          transform: translateY(40px);
        }

        .project-pill.scroll-animate.stagger-1 { transition-delay: 0.1s; }
        .project-pill.scroll-animate.stagger-2 { transition-delay: 0.2s; }
        .project-pill.scroll-animate.stagger-3 { transition-delay: 0.3s; }
        .project-pill.scroll-animate.stagger-4 { transition-delay: 0.4s; }
        .project-pill.scroll-animate.stagger-5 { transition-delay: 0.5s; }
        .project-pill.scroll-animate.stagger-6 { transition-delay: 0.6s; }

        @media (min-width: 1024px) {
          :host {
            padding: 4.5rem 2rem 6rem;
          }
        }

        .bg-orbit {
          position: absolute;
          inset: -40%;
          background:
            radial-gradient(circle at 10% 0%, rgba(4, 215, 194, 0.16), transparent 55%),
            radial-gradient(circle at 90% 10%, rgba(0, 185, 255, 0.2), transparent 55%),
            radial-gradient(circle at 50% 110%, rgba(124, 58, 237, 0.25), transparent 60%);
          filter: blur(4px);
          opacity: 0.8;
          pointer-events: none;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header h2 {
          margin: 0 0 0.75rem;
          font-size: clamp(2.2rem, 4vw, 3rem);
          background: linear-gradient(120deg, #04d7c2, #00b9ff 55%, #8b55ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .header p {
          color: #9ca3af;
          font-size: 1.05rem;
          max-width: 620px;
          margin: 0 auto;
        }

        .feature-panel {
          position: relative;
          border-radius: 1.9rem;
          padding: 0;
          height: 550px;
          background:
            radial-gradient(circle at top left, rgba(4, 215, 194, 0.16), transparent 60%),
            radial-gradient(circle at 10% 120%, rgba(124, 58, 237, 0.18), transparent 65%),
            rgba(7, 18, 34, 0.97);
          border: 1px solid rgba(15, 23, 42, 0.9);
          box-shadow:
            0 0 0 1px rgba(56, 189, 248, 0.25),
            0 0 24px rgba(56, 189, 248, 0.25),
            0 26px 60px rgba(2, 6, 23, 0.95);
          overflow: hidden;
        }

        @media (min-width: 900px) {
          .feature-panel {
            height: 580px;
          }
        }

        .feature-grid {
          padding: 1.5rem;
          height: 100%;
          box-sizing: border-box;
        }

        @media (min-width: 900px) {
          .feature-grid {
            padding: 2rem 2.5rem;
          }
        }

        .feature-panel.pop {
          animation: featureBalloon 580ms cubic-bezier(0.22, 1, 0.36, 1);
        }

        @keyframes featureBalloon {
          0% {
            transform: scale(0.96);
            opacity: 0.9;
          }
          55% {
            transform: scale(1.03);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .feature-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
          height: 100%;
          align-content: start;
        }

        @media (min-width: 900px) {
          .feature-grid {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
        }

        .feature-left {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: 100%;
          gap: 0.5rem;
        }

        .feature-right {
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: 100%;
        }

        .feature-image {
          width: 85%;
          height: 300px;
          object-fit: cover;
          object-position: center;
          border-radius: 1.25rem;
          margin: 0 auto;
          border: none;
          display: block;
          flex-shrink: 0;
        }

        @media (min-width: 900px) {
          .feature-image {
            height: 300px;
            width: 85%;
          }
        }

        .outcome-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          object-position: center;
          border-radius: 1.25rem;
          margin: 0;
          border: none;
        }

        .icon-badge {
          margin-bottom: 1.5rem;
          display: inline-flex;
          width: 78px;
          height: 78px;
          border-radius: 28px;
          align-items: center;
          justify-content: center;
          background: rgba(4, 215, 194, 0.18);
          box-shadow: inset 0 0 15px rgba(4, 215, 194, 0.25);
        }

        .icon-badge svg {
          width: 36px;
          height: 36px;
          stroke: #f8fafc;
          stroke-width: 1.8;
          fill: none;
        }

        .tags {
          display: inline-flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .tag {
          border-radius: 999px;
          padding: 0.3rem 0.95rem;
          font-size: 0.75rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          border: 1px solid rgba(4, 215, 194, 0.5);
          color: rgba(4, 215, 194, 0.9);
          background: rgba(4, 215, 194, 0.1);
          transition: all 0.3s ease;
        }

        .tag:hover {
          background: linear-gradient(120deg, #04d7c2, #00b9ff);
          color: #021019;
          border-color: transparent;
          box-shadow: 0 0 15px rgba(4, 215, 194, 0.5);
        }

        .feature-title {
          margin: 0 0 0.75rem;
          font-size: clamp(1.5rem, 3vw, 2.1rem);
          color: #f8fafc;
          letter-spacing: -0.01em;
        }

        .feature-description {
          color: #cbd5f5;
          margin: 0;
          line-height: 1.5;
          font-size: 0.95rem;
        }

        .feature-extra {
          color: #a5b4fc;
          font-size: 0.9rem;
          line-height: 1.5;
          margin: 0;
        }

        .tech-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(148, 163, 184, 0.9);
          margin: 0.75rem 0 0.5rem;
        }

        .tech-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.55rem;
          margin-bottom: 0;
        }

        .tech-chip {
          padding: 0.45rem 0.95rem;
          border-radius: 999px;
          background: rgba(4, 215, 194, 0.1);
          color: rgba(4, 215, 194, 0.9);
          font-size: 0.8rem;
          border: 1px solid rgba(4, 215, 194, 0.5);
          transition: all 0.3s ease;
        }

        .tech-chip:hover {
          background: linear-gradient(120deg, #04d7c2, #00b9ff);
          color: #021019;
          border-color: transparent;
          box-shadow: 0 0 15px rgba(4, 215, 194, 0.5);
        }

        .outcome-card {
          background: rgba(4, 10, 18, 0.8);
          border: 1px solid rgba(56, 189, 248, 0.3);
          border-radius: 1.35rem;
          padding: 0.85rem;
          box-shadow: inset 0 0 18px rgba(8, 47, 73, 0.35);
          width: 85%;
          margin: 0.75rem auto 0;
          max-width: 400px;
          flex-shrink: 0;
        }

        .outcome-card h4 {
          margin: 0 0 0.75rem;
          color: #22d3ee;
          font-size: 0.95rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .outcome-card ul {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .outcome-card li {
          display: flex;
          gap: 0.5rem;
          color: #d1d5db;
          font-size: 0.8rem;
          line-height: 1.4;
        }

        .outcome-card li::before {
          content: "➜";
          font-size: 0.8rem;
          color: #38bdf8;
          margin-top: 0.2rem;
        }

        .feature-wrapper {
          display: flex;
          align-items: center;
          gap: 2rem;
          position: relative;
        }

        .progress-dots-vertical {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding-top: 1rem;
          flex-shrink: 0;
        }

        .progress-dots-vertical .progress-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.4);
          border: none;
          cursor: pointer;
          transition: all 300ms ease;
          padding: 0;
        }

        .progress-dots-vertical .progress-dot.is-active {
          background: linear-gradient(120deg, #04d7c2, #00b9ff);
          width: 10px;
          height: 10px;
          box-shadow: 0 0 10px rgba(4, 215, 194, 0.6);
        }

        .progress-dots-vertical button.chevron-down {
          margin-top: 0.5rem;
          width: 24px;
          height: 24px;
          background: transparent;
          border: none;
          cursor: pointer;
          color: #00a6ff;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          transition: all 0.3s ease;
        }

        .progress-dots-vertical button.chevron-down:hover {
          color: #04d7c2;
          transform: translateY(2px);
        }

        .progress-dots-vertical button.chevron-down svg {
          width: 24px;
          height: 24px;
          filter: drop-shadow(0 0 8px rgba(0, 166, 255, 0.8));
        }

        .projects-grid {
          margin-top: 2.5rem;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
        }

        @media (max-width: 1024px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 1024px) {
          .feature-wrapper {
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          
          .progress-dots-vertical {
            flex-direction: row;
            padding-top: 0;
            padding-left: 1rem;
          }
          
          .progress-dots-vertical button.chevron-down {
            margin-top: 0;
            margin-left: 0.5rem;
            transform: rotate(90deg);
          }
        }

        @media (max-width: 640px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .feature-wrapper {
            flex-direction: column;
          }
          
          .progress-dots-vertical {
            flex-direction: row;
          }
          
          .progress-dots-vertical button.chevron-down {
            transform: rotate(90deg);
          }
        }

        .project-pill {
          border-radius: 1.25rem;
          padding: 1.2rem 1.35rem;
          text-align: left;
          background: rgba(7, 12, 24, 0.95);
          border: 1px solid rgba(31, 41, 55, 0.95);
          color: #e5e7eb;
          cursor: pointer;
          transition: transform 160ms ease, border 160ms ease, box-shadow 160ms ease;
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          min-height: 150px;
          position: relative;
        }

        .project-pill::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 1.25rem;
          padding: 2px;
          background: linear-gradient(120deg, #05e3cf, #00a6ff, #8b55ff, #05e3cf);
          background-size: 300% 300%;
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: -1;
          animation: border-glow-pill 3s ease infinite;
        }

        @keyframes border-glow-pill {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .project-pill:hover::before {
          opacity: 1;
        }

        .project-pill span {
          display: block;
        }

        .pill-image {
          width: calc(100% + 2.7rem);
          height: 120px;
          border-radius: 1.25rem 1.25rem 0 0;
          object-fit: cover;
          object-position: center;
          background: rgba(15, 23, 42, 0.6);
          border: none;
          margin: -1.2rem -1.35rem 0.75rem -1.35rem;
          display: block;
        }

        .project-pill .pill-title {
          font-size: 0.95rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
        }

        .project-pill .pill-subtitle {
          font-size: 0.78rem;
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }

        .pill-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          margin-top: auto;
        }

        .pill-tech-chip {
          font-size: 0.7rem;
          padding: 0.3rem 0.6rem;
          border-radius: 6px;
          background: rgba(4, 215, 194, 0.1);
          border: 1px solid rgba(4, 215, 194, 0.5);
          color: rgba(4, 215, 194, 0.9);
          transition: all 0.3s ease;
        }

        .pill-tech-chip:hover {
          background: linear-gradient(120deg, #04d7c2, #00b9ff);
          color: #021019;
          border-color: transparent;
          box-shadow: 0 0 10px rgba(4, 215, 194, 0.5);
        }

        .project-pill:hover {
          transform: translateY(-4px);
          border-color: rgba(4, 215, 194, 0.8);
          box-shadow:
            0 0 20px rgba(4, 215, 194, 0.4),
            0 0 40px rgba(4, 215, 194, 0.3),
            0 0 60px rgba(4, 215, 194, 0.2),
            0 8px 32px rgba(0, 0, 0, 0.5);
        }

        .project-pill.is-active {
          border-color: rgba(56, 189, 248, 0.95);
          box-shadow:
            0 0 0 1px rgba(15, 23, 42, 1),
            0 0 0 2px rgba(56, 189, 248, 0.75),
            0 14px 32px rgba(2, 6, 23, 0.85);
          background: radial-gradient(circle at top left, rgba(8, 47, 73, 0.95), rgba(15, 23, 42, 0.98));
          transform: scale(1.02);
        }

        .project-cta {
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
          transition: transform 0.3s ease, box-shadow 0.3s ease, background-image 0.3s ease;
          box-shadow: 0 18px 45px rgba(0, 166, 255, 0.3);
          margin-top: 2.5rem;
        }

        .project-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 22px 55px rgba(4, 215, 194, 0.45);
          background-image: linear-gradient(120deg, #06f5d4, #04d7c2);
        }

        .project-cta-arrow {
          font-size: 1.1rem;
        }

        .project-cta-wrapper {
          text-align: center;
          margin-top: 2.5rem;
        }
      </style>

      <div class="bg-orbit" aria-hidden="true"></div>
      <div class="container">
        <div class="header">
          <h2>Featured Projects</h2>
          <p>Real-world AI implementations delivering measurable results.</p>
        </div>

        <div class="feature-wrapper">
          <section class="feature-panel" aria-live="polite">
            <div class="feature-grid">
              <div class="feature-left">
                <div class="tags">
                  <span class="tag" data-project-industry>Industry</span>
                  <span class="tag" data-project-region>Region</span>
                </div>
                <h3 class="feature-title" data-project-title>Project Title</h3>
                <p class="feature-description" data-project-description>Project description goes here.</p>
                <p class="feature-extra" data-project-extra></p>
                <div>
                  <div class="tech-label">Technologies Used</div>
                  <div class="tech-list" data-project-tech></div>
                </div>
              </div>
              <div class="feature-right">
                <img class="feature-image" data-project-image src="" alt="Project preview">
                <div class="outcome-card">
                  <h4>Key Outcomes</h4>
                  <ul data-project-outcomes></ul>
                </div>
              </div>
            </div>
          </section>
          <div class="progress-dots-vertical" data-dots></div>
        </div>

        <div class="projects-grid" data-grid></div>

        <div class="project-cta-wrapper">
          <a href="https://calendly.com/tkrupt-llc/30min" class="project-cta" style="background: linear-gradient(120deg, #05e3cf, #00a6ff)">
            <span>Start Your Project</span>
            <span class="project-cta-arrow">↗</span>
          </a>
        </div>
      </div>
    `;

    const projectIcons = {
      ads: {
        bg: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="4" y="11" width="3" height="8" rx="1"></rect>
          <rect x="10" y="7" width="3" height="12" rx="1"></rect>
          <rect x="16" y="4" width="3" height="15" rx="1"></rect>
        </svg>`
      },
      crm: {
        bg: "linear-gradient(135deg, #10b981, #3b82f6)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 10V6a2 2 0 012-2h4"></path>
          <path d="M20 10V6a2 2 0 00-2-2h-4"></path>
          <rect x="4" y="10" width="16" height="10" rx="2"></rect>
          <path d="M9 15h6"></path>
        </svg>`
      },
      phone: {
        bg: "linear-gradient(135deg, #8b5cf6, #ec4899)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
        </svg>`
      },
      dental: {
        bg: "linear-gradient(135deg, #06b6d4, #14b8a6)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 4c-2 0-4 1.8-4 4.5 0 3.2 1.4 6 2 9.5.4 2.3 3 3.5 3 0 0-2 .5-3 2-3s2 .9 2 3c0 3.5 2.5 2.3 3 0 .6-3.5 2-6.3 2-9.5C19 5.8 17 4 15 4c-2 0-2.5 1.5-3 1.5S11 4 9 4z"></path>
        </svg>`
      },
      forecast: {
        bg: "linear-gradient(135deg, #0ea5e9, #22d3ee)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 16l5-5 4 3 7-7"></path>
          <path d="M15 7h5v5"></path>
        </svg>`
      },
      chatbot: {
        bg: "linear-gradient(135deg, #00b4d8, #8b5cf6)",
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="5" width="18" height="12" rx="4"></rect>
          <path d="M7 9h.01"></path>
          <path d="M12 9h.01"></path>
          <path d="M17 9h.01"></path>
          <path d="M8 17l4-4 4 4"></path>
        </svg>`
      }
    };

    this.projects = [
      {
        title: "AI-Powered Ads Analysis Dashboard",
        industry: "Retail & E-Commerce",
        region: "Digital Marketing",
        description:
          "Intelligent analytics dashboard for Amazon Ads Service Providers that transforms advertising data into actionable insights.",
        summary:
          "The platform leverages AI to analyze campaign performance, identify optimization opportunities, and provide real-time recommendations for ad spend allocation. Empowers marketing teams to maximize ROI through data-driven decision-making and automated performance tracking across multiple campaigns and marketplaces.",
        tech: ["Machine Learning", "Python", "React", "AWS", "Power BI"],
        outcomes: [
          "40% improvement in ad spend efficiency",
          "Real-time campaign performance insights",
          "Automated anomaly detection and alerts"
        ],
        image: "./assets/Ads Analysis Dashboard.png",
        thumbnail: "./assets/Ads Analysis Dashboard.png"
      },
      {
        title: "CRM Solution for Client & Staff Management",
        industry: "Professional Services",
        region: "Enterprise Solutions",
        description:
          "Comprehensive CRM platform designed to streamline client relationships and internal team operations.",
        summary:
          "Features intelligent contact management, automated workflow triggers, task assignment, and performance analytics. The system centralizes communication history, project timelines, and resource allocation, enabling businesses to enhance productivity while delivering personalized client experiences at scale.",
        tech: ["Node.js", "React", "PostgreSQL", "MongoDB", "Docker"],
        outcomes: [
          "45% reduction in administrative overhead",
          "Centralized client communication tracking",
          "Automated task distribution and follow-ups"
        ],
        image: "./assets/CRM Solution.png",
        thumbnail: "./assets/CRM Solution.png"
      },
      {
        title: "AI Phone Call Agent with Voice Cloning & Automation",
        industry: "Real Estate",
        region: "AI Automation & Voice Solutions",
        description:
          "Bilingual AI phone assistant featuring cloned team member voices for authentic customer interactions.",
        summary:
          "The system intelligently handles rental inquiries, property information requests, and emergency call routing 24/7. Integrated with GoHighLevel for seamless CRM synchronization and N8N for workflow automation, it fetches real-time property details and follows customizable after-hours protocols to ensure uninterrupted customer service.",
        tech: ["Vapi", "ElevenLabs", "N8N", "GoHighLevel", "Selenium"],
        outcomes: [
          "24/7 automated customer support coverage",
          "60% reduction in missed call opportunities",
          "Real-time property data integration"
        ],
        image: "./assets/AI Phone Call Agent.png",
        thumbnail: "./assets/AI Phone Call Agent.png"
      },
      {
        title: "Dental X-Ray Analysis Platform",
        industry: "Healthcare",
        region: "Medical Technology",
        description:
          "AI-powered diagnostic tool that automates dental radiograph analysis using advanced computer vision.",
        summary:
          "Dentists upload X-ray images and receive instant detection of common oral conditions including cavities, with precise bounding box visualizations. The interactive dashboard enables practitioners to review AI predictions, add clinical notes, and maintain comprehensive patient records. Cloud deployment ensures secure, scalable access for dental practices of any size.",
        tech: ["YOLO", "Python", "TensorFlow", "AWS", "FastAPI"],
        outcomes: [
          "85% accuracy in cavity detection",
          "70% faster initial diagnosis screening",
          "Cloud-based secure patient data management"
        ],
        image: "./assets/Dental X-ray.png",
        thumbnail: "./assets/Dental X-ray.png"
      },
      {
        title: "Demand Forecasting System for Supply Chain",
        industry: "Retail & E-Commerce",
        region: "Supply Chain & Logistics",
        description:
          "AI-powered demand forecasting solution that optimizes inventory management and minimizes waste through predictive analytics.",
        summary:
          "The system analyzes historical sales data, promotional campaigns, and seasonality patterns to generate SKU-level demand predictions. Enables supply chain planners to proactively prevent stockouts, reduce overstock situations, and make data-driven procurement decisions with confidence.",
        tech: ["Machine Learning", "Python", "TensorFlow", "Time Series Analysis", "Pandas"],
        outcomes: [
          "35% reduction in overstock inventory",
          "28% improvement in forecast accuracy",
          "Real-time demand prediction capabilities"
        ],
        image: "./assets/Demand Forecasting.png",
        thumbnail: "./assets/Demand Forecasting.png"
      },
      {
        title: "Multi-Lingual E-Commerce Chatbot",
        industry: "Retail & E-Commerce",
        region: "Customer Service",
        description:
          "Intelligent conversational AI assistant that provides seamless customer support across multiple languages and platforms.",
        summary:
          "The chatbot handles product inquiries, order tracking, returns processing, and personalized recommendations in real-time. Integrated with e-commerce platforms and payment gateways, it automates routine customer interactions while escalating complex issues to human agents, ensuring 24/7 customer engagement and satisfaction.",
        tech: ["Natural Language Processing", "Python", "Dialogflow", "React", "MongoDB"],
        outcomes: [
          "65% reduction in customer service tickets",
          "Support for 10+ languages simultaneously",
          "90% customer query resolution rate"
        ],
        image: "./assets/Multi-lingual.png",
        thumbnail: "./assets/Multi-lingual.png"
      }
    ];

    this.currentIndex = 0;
    this._cacheElements();
    this._buildDots();
    this._buildGrid();
    this._attachEvents();
    this._updateFeature(false);
    this._initAnimations();
  }

  _initAnimations() {
    const root = this.shadowRoot;
    
    // Add animation classes to elements
    const header = root.querySelector('.header');
    const featurePanel = root.querySelector('.feature-panel');
    const projectPills = root.querySelectorAll('.project-pill');
    const navBtns = root.querySelectorAll('.nav-btn');
    const ctaBtn = root.querySelector('.project-cta');
    
    if (header) {
      header.classList.add('scroll-animate', 'fade-in-up');
    }
    if (featurePanel) {
      featurePanel.classList.add('scroll-animate', 'fade-in-up');
    }
    if (ctaBtn) {
      ctaBtn.classList.add('scroll-animate', 'scale-in');
    }
    
    projectPills.forEach((pill, index) => {
      pill.classList.add('scroll-animate', 'fade-in-up');
      pill.classList.add(`stagger-${(index % 6) + 1}`);
    });
    
    navBtns.forEach((btn) => {
      btn.classList.add('scroll-animate', 'scale-in');
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

  _cacheElements() {
    const root = this.shadowRoot;
    this.featurePanel = root.querySelector(".feature-panel");
    this.imageEl = root.querySelector("[data-project-image]");
    this.industryEl = root.querySelector("[data-project-industry]");
    this.regionEl = root.querySelector("[data-project-region]");
    this.titleEl = root.querySelector("[data-project-title]");
    this.descEl = root.querySelector("[data-project-description]");
    this.extraEl = root.querySelector("[data-project-extra]");
    this.techEl = root.querySelector("[data-project-tech]");
    this.outcomesEl = root.querySelector("[data-project-outcomes]");
    this.dotsContainer = root.querySelector("[data-dots]");
    this.gridContainer = root.querySelector("[data-grid]");
  }

  _buildDots() {
    this.dotsContainer.innerHTML = "";
    this.projects.forEach((_, index) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "progress-dot";
      dot.addEventListener("click", () => this._showProject(index));
      this.dotsContainer.appendChild(dot);
    });
    // Add chevron down icon at the end
    const chevron = document.createElement("button");
    chevron.type = "button";
    chevron.className = "chevron-down";
    chevron.setAttribute("aria-label", "Next project");
    chevron.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
    chevron.addEventListener("click", () => {
      const nextIndex = (this.currentIndex + 1) % this.projects.length;
      this._showProject(nextIndex);
    });
    this.dotsContainer.appendChild(chevron);
    this.dotButtons = Array.from(this.dotsContainer.children).filter(btn => !btn.classList.contains('chevron-down'));
  }

  _buildGrid() {
    this.gridContainer.innerHTML = "";
    this.projects.forEach((project, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "project-pill scroll-animate fade-in-up";
      btn.classList.add(`stagger-${(index % 6) + 1}`);
      const techChips = project.tech.slice(0, 3).map(tech => 
        `<span class="pill-tech-chip">${tech}</span>`
      ).join("");
      btn.innerHTML = `
        <img class="pill-image" src="${project.thumbnail || project.image}" alt="${project.title}" onerror="this.style.display='none'">
        <span class="pill-title">${project.title}</span>
        <span class="pill-subtitle">${project.industry}</span>
        <div class="pill-tech">${techChips}</div>
      `;
      btn.addEventListener("click", () => this._showProject(index));
      this.gridContainer.appendChild(btn);
      
      // Observe new element (slower trigger)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('animate');
            }, 100);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
      observer.observe(btn);
    });
    this.gridButtons = Array.from(this.gridContainer.children);
  }

  _attachEvents() {
    // No navigation buttons needed, only dots
  }

  _showProject(index) {
    this.currentIndex = index;
    this._updateFeature(true);
  }

  _updateFeature(animate) {
    const project = this.projects[this.currentIndex];
    if (!project) return;

    if (this.imageEl && project.image) {
      this.imageEl.src = project.image;
      this.imageEl.style.display = "block";
    } else if (this.imageEl) {
      this.imageEl.style.display = "none";
    }

    this.industryEl.textContent = project.industry;
    this.regionEl.textContent = project.region;
    this.titleEl.textContent = project.title;
    this.descEl.textContent = project.description;
    if (this.extraEl) this.extraEl.textContent = project.summary;

    this.techEl.innerHTML = "";
    project.tech.forEach((tech) => {
      const span = document.createElement("span");
      span.className = "tech-chip";
      span.textContent = tech;
      this.techEl.appendChild(span);
    });

    this.outcomesEl.innerHTML = "";
    project.outcomes.forEach((outcome) => {
      const li = document.createElement("li");
      li.textContent = outcome;
      this.outcomesEl.appendChild(li);
    });

    this.gridButtons.forEach((btn, idx) => {
      btn.classList.toggle("is-active", idx === this.currentIndex);
    });

    this.dotButtons.forEach((btn, idx) => {
      if (btn.classList.contains('chevron-down')) return;
      btn.classList.toggle("is-active", idx === this.currentIndex);
    });

    if (animate && this.featurePanel) {
      this.featurePanel.style.transition = 'opacity 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 600ms cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      this.featurePanel.style.opacity = '0';
      this.featurePanel.style.transform = 'translateX(-30px) scale(0.95)';
      
      setTimeout(() => {
        this.featurePanel.style.opacity = '1';
        this.featurePanel.style.transform = 'translateX(0) scale(1)';
      }, 50);
    }
  }
}

customElements.define("projects-section", ProjectsSection);

