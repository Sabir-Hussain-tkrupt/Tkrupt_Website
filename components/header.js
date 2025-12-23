class CustomHeader extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    width: 100%;
                    top: 0;
                    left: 0;
                    z-index: 1000;
                    background: linear-gradient(180deg, rgba(0, 4, 6, 0.7) 0%, rgba(0, 10, 15, 0.35) 55%, rgba(0, 10, 15, 0) 100%);
                    backdrop-filter: blur(12px);
                    border-bottom: none;
                    box-shadow: none;
                }
                
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1.25rem 2rem;
                    max-width: 1400px;
                    margin: 0 auto;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 0.8rem;
                    text-decoration: none;
                }

                .logo img {
                    height: 55px;
                    width: auto;
                    display: block;
                    filter: none;
                }

                .nav-links {
                    display: flex;
                    gap: 1.75rem;
                }
                .nav-links a {
                    color: rgba(244, 250, 255, 0.92);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 0.95rem;
                    transition: all 0.3s ease;
                    position: relative;
                    display: flex;
                    align-items: center;
                }
                
                .dropdown {
                    position: relative;
                }
                
                .dropdown-menu {
                    position: absolute;
                    top: 100%;
                    left: 0;
                    background: rgba(1, 10, 18, 0.95);
                    border: 1px solid rgba(0, 191, 255, 0.3);
                    border-radius: 8px;
                    padding: 1rem;
                    min-width: 200px;
                    display: none;
                    z-index: 100;
                }
                
                .dropdown:hover .dropdown-menu {
                    display: block;
                }
                
                .dropdown-menu a {
                    display: block;
                    padding: 0.6rem 1rem;
                    color: rgba(226, 232, 240, 0.85);
                    border-radius: 6px;
                    transition: all 0.3s ease;
                    font-weight: 500;
                }
                
                .dropdown-menu a:hover {
                    color: #1DE9B6;
                    background: rgba(29, 233, 182, 0.1);
                    transform: translateX(4px);
                }

                .nav-links a:hover {
                    color: #1DE9B6;
                }
                
                .nav-links a::after {
                    content: '';
                    position: absolute;
                    bottom: -5px;
                    left: 0;
                    width: 0;
                    height: 2px;
                    background-color: #1DE9B6;
                    transition: width 0.3s ease;
                }
                
                .nav-links a:hover::after {
                    width: 100%;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    cursor: pointer;
                    padding: 0.5rem;
                    touch-action: manipulation;
                    -webkit-tap-highlight-color: transparent;
                    font-size: 1.5rem;
                }
                
                /* Show menu button on mobile only */
                @media (max-width: 768px) {
                    .mobile-menu-btn {
                        display: flex !important;
                        align-items: center;
                        justify-content: center;
                        width: 44px;
                        height: 44px;
                        z-index: 10001;
                        position: relative;
                        visibility: visible !important;
                        opacity: 1 !important;
                        background: rgba(4, 215, 194, 0.1);
                        border: 1px solid rgba(4, 215, 194, 0.3);
                        border-radius: 8px;
                    }
                    
                    .mobile-menu-btn i {
                        width: 24px;
                        height: 24px;
                        stroke-width: 2;
                        color: #1DE9B6;
                    }
                }
                
                /* Hide on desktop */
                @media (min-width: 769px) {
                    .mobile-menu-btn {
                        display: none !important;
                    }
                }
                
                .mobile-menu-btn:active {
                    opacity: 0.7;
                }
                
                .mobile-menu {
                    display: none;
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.98);
                    backdrop-filter: blur(20px);
                    z-index: 9999;
                    padding: 5rem 2rem 2rem;
                    overflow-y: auto;
                    animation: slideInFromTop 0.3s ease-out;
                }
                
                .mobile-menu.active {
                    display: block;
                }
                
                .mobile-menu-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 2rem;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 0.5rem;
                    touch-action: manipulation;
                }
                
                .mobile-menu-links {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    margin-top: 2rem;
                }
                
                .mobile-menu-links a {
                    color: rgba(244, 250, 255, 0.92);
                    text-decoration: none;
                    font-weight: 500;
                    font-size: 1.1rem;
                    padding: 1rem;
                    border-radius: 0.5rem;
                    transition: all 0.3s ease;
                    border: 1px solid rgba(56, 189, 248, 0.2);
                    touch-action: manipulation;
                    -webkit-tap-highlight-color: rgba(4, 215, 194, 0.2);
                }
                
                .mobile-menu-links a:active {
                    background: rgba(4, 215, 194, 0.1);
                    border-color: rgba(4, 215, 194, 0.4);
                }
                
                .mobile-menu-links a:hover {
                    color: #1DE9B6;
                    background: rgba(29, 233, 182, 0.1);
                    border-color: rgba(29, 233, 182, 0.3);
                }
                
                .mobile-dropdown {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-top: 0.5rem;
                    padding-left: 1rem;
                }
                
                .mobile-dropdown a {
                    font-size: 0.95rem;
                    padding: 0.75rem;
                }
                
                @keyframes slideInFromTop {
                    from {
                        transform: translateY(-100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }

                .cta-group {
                    display: flex;
                    align-items: center;
                    gap: 1.25rem;
                }
                
                @media (max-width: 768px) {
                    .cta-group {
                        gap: 0.5rem !important;
                    }
                }

                .book-call-btn {
                    padding: 0.55rem 1.4rem;
                    border-radius: 0.85rem;
                    border: 1px solid rgba(4, 215, 194, 0.4);
                    background: transparent;
                    color: rgba(244, 250, 255, 0.9);
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: none;
                }
                .book-call-btn:hover {
                    background-image: linear-gradient(120deg, #05e3cf, #00a6ff);
                    color: #011b21;
                    border-color: transparent;
                    box-shadow: 0 20px 45px rgba(4, 215, 194, 0.35);
                    transform: translateY(-2px);
                }

                .book-btn {
                    background: linear-gradient(120deg, #05e3cf, #00a6ff);
                    color: #021216;
                    font-weight: 600;
                    padding: 0.65rem 1.5rem;
                    border-radius: 0.85rem;
                    border: none;
                    cursor: pointer;
                    box-shadow: 0 15px 35px rgba(0, 182, 255, 0.25);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                    text-decoration: none;
                }

                .book-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 20px 45px rgba(0, 182, 255, 0.35);
                }
                
                @media (max-width: 768px) {
                    nav {
                        padding: 1rem 1.25rem !important;
                    }
                    
                    .nav-links {
                        display: none !important;
                    }
                    
                    .book-call-btn,
                    .book-btn {
                        display: none !important;
                    }
                    
                    .logo img {
                        height: 45px !important;
                    }
                    
                    .cta-group {
                        gap: 0.5rem !important;
                    }
                }
                
                @media (max-width: 480px) {
                    nav {
                        padding: 0.75rem 1rem !important;
                    }
                    
                    .logo img {
                        height: 38px !important;
                    }
                    
                    .book-call-btn {
                        display: none;
                    }
                    
                    .book-btn {
                        padding: 0.5rem 0.875rem !important;
                        font-size: 0.8rem !important;
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: flex !important;
                        visibility: visible !important;
                        opacity: 1 !important;
                    }
                }
            </style>
            <nav>
                <a href="index.html" class="logo">
                    <img src="./assets/3.png" alt="Tkrupt logo">
                </a>
                <div class="nav-links">
                    <a href="services.html">Services</a>
                    <div class="dropdown">
                        <a href="ai-solutions.html" class="dropdown-toggle">AI Solutions <i data-feather="chevron-down" class="w-4 h-4 ml-1"></i></a>
                        <div class="dropdown-menu">
                            <a href="ai-solutions.html#solutions">By Industry</a>
                            <a href="ai-solutions.html#solutions">By Team</a>
                            <a href="ai-solutions.html#solutions">AI Products</a>
                        </div>
                    </div>
                    <a href="resources.html">Resources</a>
                    <a href="portfolio.html">Portfolio</a>
                </div>
                <div class="cta-group">
                    <a href="https://calendly.com/tkrupt-llc/30min" class="book-btn">Get Started</a>
                    <button class="mobile-menu-btn" aria-label="Toggle menu">
                        <i data-feather="menu"></i>
                    </button>
                </div>
            </nav> 
            <div class="mobile-menu" id="mobileMenu">
                <button class="mobile-menu-close" aria-label="Close menu">
                    <i data-feather="x"></i>
                </button>
                <div class="mobile-menu-links">
                    <a href="services.html">Services</a>
                    <div>
                        <a href="ai-solutions.html">AI Solutions</a>
                        <div class="mobile-dropdown">
                            <a href="ai-solutions.html#solutions">By Industry</a>
                            <a href="ai-solutions.html#solutions">By Team</a>
                            <a href="ai-solutions.html#solutions">AI Products</a>
                        </div>
                    </div>
                    <a href="resources.html">Resources</a>
                    <a href="portfolio.html">Portfolio</a>
                    <a href="https://calendly.com/tkrupt-llc/30min" class="book-call-btn" style="text-align: center; margin-top: 1rem;">Book a Call</a>
                    <a href="#services" class="book-btn" style="text-align: center;">Get Started</a>
                </div>
            </div>
        `; 
        
        // Initialize Feather Icons
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 0);
        
        // Mobile menu toggle functionality
        const mobileMenuBtn = this.shadowRoot.querySelector('.mobile-menu-btn');
        const mobileMenu = this.shadowRoot.querySelector('#mobileMenu');
        const mobileMenuClose = this.shadowRoot.querySelector('.mobile-menu-close');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.add('active');
                document.body.style.overflow = 'hidden';
                // Reinitialize icons after menu opens
                setTimeout(() => {
                    if (typeof feather !== 'undefined') {
                        feather.replace();
                    }
                }, 100);
            });
        }
        
        if (mobileMenuClose && mobileMenu) {
            mobileMenuClose.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
        
        // Close menu when clicking outside
        if (mobileMenu) {
            mobileMenu.addEventListener('click', (e) => {
                if (e.target === mobileMenu) {
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
        
        // Close menu when clicking on a link
        const mobileLinks = this.shadowRoot.querySelectorAll('.mobile-menu-links a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

customElements.define('custom-header', CustomHeader);