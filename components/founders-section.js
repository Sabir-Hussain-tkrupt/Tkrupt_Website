class FoundersSection extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: linear-gradient(to bottom, #003333, #000000);
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
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
          margin-bottom: 4rem;
          background: linear-gradient(to right, #1DE9B6, #00BFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .founders-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 3rem;
        }
        .founder-card {
          background: rgba(0, 51, 51, 0.7);
          border: 1px solid rgba(29, 233, 182, 0.3);
          border-radius: 16px;
          padding: 2rem;
          text-align: center;
          transition: all 0.3s ease;
        }
        .founder-card:hover {
          transform: translateY(-5px);
          border-color: #1DE9B6;
          box-shadow: 0 10px 30px rgba(29, 233, 182, 0.2);
        }
        .founder-image {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          object-fit: cover;
          margin: 0 auto 1.5rem;
          border: 3px solid #1DE9B6;
        }
        .founder-name {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: white;
        }
        .founder-title {
          color: #1DE9B6;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }
        .founder-bio {
          color: #ccc;
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        .founder-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .founder-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(29, 233, 182, 0.1);
          color: #1DE9B6;
          transition: all 0.3s ease;
        }
        .founder-link:hover {
          background: #1DE9B6;
          color: #111;
        }
      </style>
      <div class="container">
        <h2>The Minds Behind Tkrupt</h2>
        
        <div class="founders-grid">
          <!-- Founder 1 -->
          <div class="founder-card">
            <img src="http://static.photos/people/200x200/1" alt="Founder 1" class="founder-image">
            <h3 class="founder-name">Alex Chen</h3>
            <p class="founder-title">Co-Founder & CEO</p>
            <p class="founder-bio">
              10+ years in AI product development. Former AI lead at Google and OpenAI. 
              Passionate about making AI accessible to businesses of all sizes.
            </p>
            <div class="founder-links">
              <a href="#" class="founder-link"><i data-feather="linkedin"></i></a>
              <a href="#" class="founder-link"><i data-feather="twitter"></i></a>
              <a href="#" class="founder-link"><i data-feather="github"></i></a>
            </div>
          </div>
          
          <!-- Founder 2 -->
          <div class="founder-card">
            <img src="http://static.photos/people/200x200/2" alt="Founder 2" class="founder-image">
            <h3 class="founder-name">Sarah Williams</h3>
            <p class="founder-title">Co-Founder & CTO</p>
            <p class="founder-bio">
              Machine learning expert with PhD from MIT. Specializes in computer vision 
              and NLP. Built AI systems for Fortune 500 companies before co-founding Tkrupt.
            </p>
            <div class="founder-links">
              <a href="#" class="founder-link"><i data-feather="linkedin"></i></a>
              <a href="#" class="founder-link"><i data-feather="twitter"></i></a>
              <a href="#" class="founder-link"><i data-feather="github"></i></a>
            </div>
          </div>
          
          <!-- Founder 3 -->
          <div class="founder-card">
            <img src="http://static.photos/people/200x200/3" alt="Founder 3" class="founder-image">
            <h3 class="founder-name">James Rodriguez</h3>
            <p class="founder-title">Co-Founder & COO</p>
            <p class="founder-bio">
              Serial entrepreneur with background in business automation. 
              Previously scaled two startups to acquisition. Focused on operational excellence.
            </p>
            <div class="founder-links">
              <a href="#" class="founder-link"><i data-feather="linkedin"></i></a>
              <a href="#" class="founder-link"><i data-feather="twitter"></i></a>
              <a href="#" class="founder-link"><i data-feather="github"></i></a>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
customElements.define('founders-section', FoundersSection);