class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background-color: #000;
                    color: #f5f5f5;
                    padding: 4rem 2rem;
                    border-top: 1px solid #006666;
                }
                
                .footer-container {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
                    gap: 3rem;
                }
                
                .footer-about {
                    display: flex;
                    flex-direction: column;
                }
                
                .footer-logo {
                    margin-bottom: 1.5rem;
                    min-height: 2rem;
                    display: flex;
                    align-items: center;
                    line-height: 1.2;
                }
                
                .footer-logo img {
                    height: 45px;
                    width: auto;
                    display: block;
                }
                
                .footer-description {
                    color: #aaa;
                    margin-bottom: 1.5rem;
                    line-height: 1.6;
                }
                
                .footer-links h3 {
                    color: #f5f5f5;
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin-bottom: 1.5rem;
                    position: relative;
                    min-height: 2rem;
                    display: flex;
                    align-items: center;
                    line-height: 1.2;
                }
                
                .footer-links h3::after {
                    content: '';
                    position: absolute;
                    bottom: -8px;
                    left: 0;
                    width: 40px;
                    height: 2px;
                    background-color: #1DE9B6;
                }
                
                .footer-links ul {
                    list-style: none;
                    padding: 0;
                }
                
                .footer-links li {
                    margin-bottom: 0.8rem;
                    display: flex;
                    align-items: center;
                }
                
                .footer-links a {
                    color: #aaa;
                    text-decoration: none;
                    transition: color 0.3s ease;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .footer-links a:hover {
                    color: #1DE9B6;
                }
                
                .footer-links a i {
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                }
                
                .social-connect {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    margin-top: 1rem;
                }
                
                .connect-text {
                    color: rgba(226, 232, 240, 0.9);
                    font-size: 1rem;
                    font-weight: 500;
                    margin: 0;
                    white-space: nowrap;
                }
                
                .social-connect .linkedin-btn {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background-color: #111;
                    color: #f5f5f5;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(29, 233, 182, 0.2);
                }
                
                .social-connect .linkedin-btn:hover {
                    background-color: #1DE9B6;
                    color: #111;
                    border-color: #1DE9B6;
                    transform: translateY(-2px);
                }
                
                .social-connect .linkedin-btn svg {
                    width: 20px;
                    height: 20px;
                }
                
                .copyright {
                    text-align: center;
                    margin-top: 3rem;
                    padding-top: 2rem;
                    border-top: 1px solid #222;
                    color: #666;
                    font-size: 0.9rem;
                }
                
                @media (max-width: 1024px) {
                    .footer-container {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 2.5rem;
                    }
                }
                
                @media (max-width: 768px) {
                    .footer-container {
                        grid-template-columns: 1fr;
                        gap: 2rem;
                    }
                }
            </style>
            <div class="footer-container">
                <div class="footer-about">
                    <div class="footer-logo">
                        <img src="./assets/3.png" alt="Tkrupt logo">
                    </div>
                    <p class="footer-description">
                        Your AI Automation Agency. We design, build, and manage custom AI services and ready-made solutions.
                    </p>
                    <div class="social-connect">
                        <p class="connect-text">Let's connect</p>
                        <a href="https://www.linkedin.com/company/tkrupt" target="_blank" aria-label="LinkedIn" class="social-icon linkedin-btn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
                
                <div class="footer-links">
                    <h3>Services</h3>
                    <ul>
                        <li><a href="#">AI Consulting</a></li>
                        <li><a href="#">Custom AI Development</a></li>
                        <li><a href="#">Generative AI</a></li>
                        <li><a href="#">Workflow Automation</a></li>
                        <li><a href="#">Vision AI</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h3>Solutions</h3>
                    <ul>
                        <li><a href="#">By Industry</a></li>
                        <li><a href="#">By Team</a></li>
                        <li><a href="#">AI Products</a></li>
                        <li><a href="#">Case Studies</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h3>Company</h3>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Careers</a></li>
                        <li><a href="#">Blog</a></li>
                        <li><a href="#">Projects</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                
                <div class="footer-links">
                    <h3>Contact</h3>
                    <ul>
                        <li><a href="#"><i data-feather="map-pin" class="w-4 h-4 mr-2 inline"></i>5900 BALCONES DR STE 100, AUSTIN, TX 78731 - 4298</a></li>
                        <li><a href="tel:+16282773693"><i data-feather="phone" class="w-4 h-4 mr-2 inline"></i> +1 (628) 277-3693</a></li>
                        <li><a href="mailto:hi@tkrupt.com"><i data-feather="mail" class="w-4 h-4 mr-2 inline"></i> hi@tkrupt.com</a></li>
                    </ul>
                </div>
</div>
            
            <div class="copyright">
                &copy; 2026 Tkrupt. All rights reserved.
            </div>
        `;
        
        // Initialize feather icons for contact section
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                const contactIcons = this.shadowRoot.querySelectorAll('[data-feather]');
                contactIcons.forEach(icon => {
                    const iconName = icon.getAttribute('data-feather');
                    const svg = feather.icons[iconName];
                    if (svg) {
                        icon.outerHTML = svg.toSvg({
                            width: '16',
                            height: '16',
                            stroke: 'currentColor',
                            'stroke-width': 2,
                            fill: 'none'
                        });
                    }
                });
            }
        }, 100);
    }
}

customElements.define('custom-footer', CustomFooter);