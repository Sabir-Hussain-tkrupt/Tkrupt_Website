
class ReviewsSection extends HTMLElement {
  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 6rem 2rem;
          position: relative;
          overflow: hidden;
          background: linear-gradient(to bottom, #000, #003333);
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
          margin-bottom: 1rem;
          background: linear-gradient(to right, #1DE9B6, #00BFFF);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .subtitle {
          font-size: 1.25rem;
          text-align: center;
          max-width: 700px;
          margin: 0 auto 4rem;
          color: #aaa;
        }
        
        .reviews-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 3rem;
        }
        
        .review-card {
          background: linear-gradient(145deg, rgba(0, 51, 51, 0.7), rgba(0, 0, 0, 0.8));
          border: 1px solid rgba(29, 233, 182, 0.3);
          border-radius: 20px;
          padding: 2.5rem;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
        
        .review-card:hover {
          transform: translateY(-10px);
          border-color: #1DE9B6;
          box-shadow: 0 20px 40px rgba(29, 233, 182, 0.1);
        }
        
        .review-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(29, 233, 182, 0.1) 0%, transparent 70%);
          z-index: -1;
        }
        
        .quote-icon {
          font-size: 3rem;
          color: rgba(29, 233, 182, 0.2);
          margin-bottom: 1rem;
        }
        
        .review-rating {
          display: flex;
          margin-bottom: 1.5rem;
        }
        
        .review-rating i {
          color: #FFD700;
          margin-right: 0.3rem;
          width: 20px;
          height: 20px;
        }
        
        .review-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: #ddd;
          margin-bottom: 2.5rem;
          font-style: italic;
          position: relative;
          padding-left: 1.5rem;
          border-left: 2px solid #1DE9B6;
        }
        
        .review-author {
          display: flex;
          align-items: center;
          margin-top: 2rem;
        }
        
        .author-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          margin-right: 1.5rem;
          border: 3px solid #1DE9B6;
          box-shadow: 0 5px 15px rgba(29, 233, 182, 0.3);
        }
        
        .author-info {
          flex: 1;
        }
        
        .author-info h4 {
          margin: 0 0 0.3rem 0;
          font-size: 1.2rem;
          color: white;
          font-weight: 600;
        }
        
        .author-info p {
          margin: 0;
          color: #aaa;
          font-size: 0.95rem;
        }
        
        .author-company {
          display: flex;
          align-items: center;
          margin-top: 0.5rem;
          color: #1DE9B6;
          font-size: 0.9rem;
        }
        
        .author-company i {
          margin-right: 0.5rem;
          width: 16px;
          height: 16px;
        }
        
        @media (max-width: 768px) {
          .reviews-grid {
            grid-template-columns: 1fr;
          }
          
          .review-card {
            padding: 2rem;
          }
        }
      </style>
      
      <div class="container">
        <h2>Client Success Stories</h2>
        <p class="subtitle">Hear from businesses that transformed their operations with our AI solutions</p>
        
        <div class="reviews-grid">
          <!-- Review 1 -->
          <div class="review-card">
            <div class="quote-icon">
              <i data-feather="message-square"></i>
            </div>
            <div class="review-rating">
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
            </div>
            <p class="review-text">
              "Tkrupt transformed our customer support with their AI chatbot solution. Response times improved by 80% and customer satisfaction scores increased by 40%. Their team was professional, responsive, and delivered beyond our expectations."
            </p>
            <div class="review-author">
              <img src="http://static.photos/people/200x200/10" alt="Michael Johnson" class="author-avatar">
              <div class="author-info">
                <h4>Michael Johnson</h4>
                <p>CEO, TechSolutions Inc.</p>
                <div class="author-company">
                  <i data-feather="briefcase"></i>
                  <span>Enterprise SaaS Platform</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Review 2 -->
          <div class="review-card">
            <div class="quote-icon">
              <i data-feather="message-square"></i>
            </div>
            <div class="review-rating">
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
            </div>
            <p class="review-text">
              "The document processing AI that Tkrupt built has saved our legal team over 500 hours annually. Their solution was perfectly tailored to our workflow and integrated seamlessly with our existing systems. The ROI was evident within weeks."
            </p>
            <div class="review-author">
              <img src="http://static.photos/people/200x200/11" alt="Sarah Williams" class="author-avatar">
              <div class="author-info">
                <h4>Sarah Williams</h4>
                <p>Managing Partner</p>
                <div class="author-company">
                  <i data-feather="briefcase"></i>
                  <span>Williams & Associates</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Review 3 -->
          <div class="review-card">
            <div class="quote-icon">
              <i data-feather="message-square"></i>
            </div>
            <div class="review-rating">
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
              <i data-feather="star" fill="gold"></i>
            </div>
            <p class="review-text">
              "Working with Tkrupt on our predictive maintenance system was a game-changer. Their AI models reduced our equipment downtime by 45% in the first quarter. Their deep understanding of industrial applications sets them apart."
            </p>
            <div class="review-author">
              <img src="http://static.photos/people/200x200/12" alt="David Chen" class="author-avatar">
              <div class="author-info">
                <h4>David Chen</h4>
                <p>Chief Operations Officer</p>
                <div class="author-company">
                  <i data-feather="briefcase"></i>
                  <span>Industrial Manufacturing Corp</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
  }
}
customElements.define('reviews-section', ReviewsSection);

