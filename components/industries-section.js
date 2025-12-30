class IndustriesSection extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 2rem;
          background: linear-gradient(to bottom, #003333, #000000);
          position: relative;
        }
        .container {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }
        h2 {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 2rem;
          background: linear-gradient(to right, #1DE9B6, #00BFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .subtitle {
          font-size: 1.25rem;
          text-align: center;
          max-width: 800px;
          margin: 0 auto 4rem;
          color: #aaa;
        }
        .industries-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }
        .industry-card {
          background: rgba(0, 51, 51, 0.7);
          border: 1px solid rgba(29, 233, 182, 0.3);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .industry-card:hover {
          transform: translateY(-5px);
          border-color: #1DE9B6;
          box-shadow: 0 10px 30px rgba(29, 233, 182, 0.2);
        }
        .industry-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 1.5rem;
          background: #1DE9B6;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #111;
        }
        .industry-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }
        .industry-desc {
          color: #ccc;
          line-height: 1.6;
        }
      </style>
      <div class="container">
        <h2>8+ Industry Verticals</h2>
        <p class="subtitle">
          Deep expertise across diverse sectors with industry-specific AI solutions
        </p>
        
        <div class="industries-grid">
          <!-- Agriculture -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="sun"></i>
            </div>
            <h3 class="industry-name">Agriculture</h3>
            <p class="industry-desc">
              Crop monitoring, yield prediction, and automated farming solutions.
            </p>
          </div>
          
          <!-- Finance -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="dollar-sign"></i>
            </div>
            <h3 class="industry-name">Finance</h3>
            <p class="industry-desc">
              Fraud detection, algorithmic trading, and risk assessment AI.
            </p>
          </div>
          
          <!-- Real Estate -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="home"></i>
            </div>
            <h3 class="industry-name">Real Estate</h3>
            <p class="industry-desc">
              Property valuation, virtual tours, and smart contract automation.
            </p>
          </div>
          
          <!-- Healthcare -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="heart"></i>
            </div>
            <h3 class="industry-name">Healthcare</h3>
            <p class="industry-desc">
              Diagnostic assistance, patient monitoring, and drug discovery.
            </p>
          </div>
          
          <!-- Retail -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="shopping-bag"></i>
            </div>
            <h3 class="industry-name">Retail</h3>
            <p class="industry-desc">
              Personalized recommendations, inventory optimization, and chatbots.
            </p>
          </div>
          
          <!-- Logistics -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="truck"></i>
            </div>
            <h3 class="industry-name">Logistics</h3>
            <p class="industry-desc">
              Route optimization, demand forecasting, and warehouse automation.
            </p>
          </div>
          
          <!-- Travel -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="globe"></i>
            </div>
            <h3 class="industry-name">Travel</h3>
            <p class="industry-desc">
              Dynamic pricing, personalized itineraries, and virtual assistants.
            </p>
          </div>
          
          <!-- Education -->
          <div class="industry-card">
            <div class="industry-icon">
              <i data-feather="book"></i>
            </div>
            <h3 class="industry-name">Education</h3>
            <p class="industry-desc">
              Adaptive learning, automated grading, and student performance AI.
            </p>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('industries-section', IndustriesSection);