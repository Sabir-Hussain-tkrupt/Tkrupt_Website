
document.addEventListener('DOMContentLoaded', function() {
    // Initialize Feather Icons
    feather.replace();
    
// Animate numbers in about section
const animateNumber = (counter) => {
        const target = +counter.getAttribute('data-target');
        const suffix = counter.getAttribute('data-suffix');
        // If suffix exists (like %), use it; otherwise use +
        const finalSuffix = suffix !== null ? suffix : '+';
        const duration = 2500; // 2.5 seconds for smoother animation
        const startTime = performance.now();
        const startValue = 0;
        
        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Smooth ease-out cubic function
            const easeOut = 1 - Math.pow(1 - progress, 4); // Ease out quartic for smoother feel
            const current = Math.floor(startValue + (target - startValue) * easeOut);
            counter.innerText = current + finalSuffix;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                counter.innerText = target + finalSuffix;
            }
        };
        
        requestAnimationFrame(update);
    };

    // Intersection Observer for number animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.about-number');
                counters.forEach(counter => {
                    if (!counter.classList.contains('animating')) {
                        counter.classList.add('animating');
                        const suffix = counter.getAttribute('data-suffix');
                        const initialSuffix = suffix !== null ? suffix : '+';
                        counter.innerText = '0' + initialSuffix;
                        animateNumber(counter);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const aboutSection = document.querySelector('.thematic-section:has(.about-stat)');
    if(aboutSection) observer.observe(aboutSection);
// Solution tabs functionality
    const tabs = document.querySelectorAll('.solution-tab');
    const contents = document.querySelectorAll('.solution-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding content
            const tabId = tab.getAttribute('data-tab');
            const content = document.getElementById(`${tabId}-solutions`);
            if (content) content.classList.add('active');
        });
    });

    
const reviewsRoot = document.querySelector('[data-reviews-root]');
if (reviewsRoot) {
    const reviews = [
        {
            name: 'Julie',
            avatar: './assets/julie.png',
            quote: 'Working with the team was incredible. Ujala understood our AI requirements deeply and delivered a bilingual phone agent that feels almost human. The voice cloning, real-time routing, and automation workflows have transformed our real estate operations. Truly impressive work.',
        },
        {
            name: 'Talha',
            avatar: './assets/Talha.jpeg',
            quote: 'Exceptional delivery. The analytics system gave us clarity on portfolio timing, performance concentration, and rebalancing strategy—something we couldn\'t achieve manually. Smart, precise, and very well-structured work.',
        },
        {
            name: 'Stefan',
            avatar: './assets/stefan.png',
            quote: 'Fantastic experience. The team was proactive, understood our requirements quickly, and delivered a polished solution that worked better than expected. Smooth communication and dependable results.',
        },
        {
            name: 'Kamil',
            avatar: './assets/Kamil.jpeg',
            quote: 'Great experience working with the team. Clear communication, fast delivery, and solid technical execution. Would be happy to collaborate again.',
        }
    ];

    const track = reviewsRoot.querySelector('[data-review-track]');
    const dotsContainer = document.querySelector('[data-reviews-dots]');

    const buildSlide = (review) => {
        const article = document.createElement('article');
        article.className = 'review-slide';
        
        article.innerHTML = `
            <div class="review-card">
                <div class="review-avatar review-avatar--circle">
                    <img src="${review.avatar}" alt="${review.name}">
                </div>
                <div class="review-content">
                    <div class="review-top">
                        <h4 class="review-name">${review.name}</h4>
                    </div>
                    <p class="review-quote">"${review.quote}"</p>
                </div>
            </div>
        `;
        
        setTimeout(() => {
            if (typeof feather !== 'undefined') {
                feather.replace();
            }
        }, 0);
        
        return article;
    };

    reviews.forEach(review => track.appendChild(buildSlide(review)));
    const slides = Array.from(track.children);

    // --- MODIFIED FUNCTION: Only builds the Arrow, no Dots ---
    const buildControls = () => {
        dotsContainer.innerHTML = '';
        
        // Removed the loop that creates the dots
        
        // Only create the chevron (arrow)
        const chevron = document.createElement('button');
        chevron.className = 'chevron-down';
        chevron.setAttribute('aria-label', 'Next review');
        chevron.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
        
        chevron.addEventListener('click', () => {
            currentReview = (currentReview + 1) % reviews.length;
            renderReview(true);
            // Reset auto-rotate timer
            clearInterval(reviewAutoRotateInterval);
            reviewAutoRotateInterval = setInterval(nextReview, 3500);
        });
        
        dotsContainer.appendChild(chevron);
    };

    let currentReview = 0;
    let isPaused = false;
    let reviewAutoRotateInterval;

    const renderReview = (animate = true) => {
        slides.forEach((slide, idx) => {
            slide.classList.remove('is-center', 'is-left', 'is-right', 'is-hidden', 'animate');
            
            if (idx === currentReview) {
                slide.classList.add('is-center');
                if (animate) {
                    void slide.offsetWidth;
                    slide.classList.add('animate');
                }
            } else {
                slide.classList.add('is-hidden');
            }
        });

        // Removed logic that updates dot active state
        
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    };

    const nextReview = () => {
        if (!isPaused) {
            currentReview = (currentReview + 1) % reviews.length;
            renderReview(true);
        }
    };

    if (track) {
        track.addEventListener('mouseenter', () => { isPaused = true; });
        track.addEventListener('mouseleave', () => { isPaused = false; });
    }

    buildControls(); // Renamed function call
    renderReview(false);
    
    reviewAutoRotateInterval = setInterval(nextReview, 1500);
}

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll Animation System
    const initScrollAnimations = () => {
        // Hero section - animate on load (slower and smoother with top-to-bottom text reveal)
        const heroSection = document.querySelector('#hero');
        if (heroSection) {
            const heroBadge = heroSection.querySelector('.inline-flex');
            const heroTitle = heroSection.querySelector('h1');
            const heroTitleSpans = heroTitle ? heroTitle.querySelectorAll('span') : [];
            const heroDesc = heroSection.querySelector('p.text-gray-200');
            const heroButtons = heroSection.querySelectorAll('.hero-cta-primary, .hero-cta-secondary');
            const heroStats = heroSection.querySelectorAll('.grid.grid-cols-1.sm\\:grid-cols-3 > div, .grid.grid-cols-3 > div');
            
            if (heroBadge) {
                heroBadge.classList.add('scroll-animate', 'fade-in-down');
                setTimeout(() => heroBadge.classList.add('animate'), 300);
            }
            
            // Hero title - top to bottom reveal for each word (faster)
            if (heroTitle && heroTitleSpans.length > 0) {
                heroTitleSpans.forEach((span, index) => {
                    // Each span starts from top (translateY(-100%))DOMContentLoaded
                    setTimeout(() => {
                        span.classList.add('animate');
                    }, 300 + (index * 200)); // Stagger each word: 300ms, 500ms, 700ms
                });
            }
            
            
            if (heroDesc) {
                heroDesc.classList.add('scroll-animate', 'fade-in');
                setTimeout(() => heroDesc.classList.add('animate'), 1000);
            }
            heroButtons.forEach((btn, index) => {
                btn.classList.add('scroll-animate', 'scale-in');
                setTimeout(() => btn.classList.add('animate'), 1200 + (index * 100));
            });
            heroStats.forEach((stat, index) => {
                stat.classList.add('scroll-animate', 'fade-in-up');
                setTimeout(() => stat.classList.add('animate'), 1500 + (index * 150));
            });
        }

        // Add animation classes to all other elements
        const sections = document.querySelectorAll('section:not(#hero), .thematic-section');
        const headings = document.querySelectorAll('h2.section-heading, h3, .section-heading');
        const paragraphs = document.querySelectorAll('p.section-subtitle, .section-subtitle');
        const cards = document.querySelectorAll('.neon-panel, .review-slide, .solution-tab, .industry-card, .about-stat, .project-card');
        const lists = document.querySelectorAll('.industry-list, .review-tags');
        const buttons = document.querySelectorAll('.strategy-cta-btn, .project-cta, .reviews-nav');
        const icons = document.querySelectorAll('.neon-icon');
        const gridItems = document.querySelectorAll('.grid > div, .grid > .neon-panel');
        
        // Apply animation classes with different effects
        headings.forEach((el, index) => {
            if (!el.closest('#hero')) {
                el.classList.add('scroll-animate', 'fade-in-up');
            }
        });

        paragraphs.forEach((el) => {
            if (!el.closest('#hero')) {
                el.classList.add('scroll-animate', 'fade-in');
            }
        });

        cards.forEach((el, index) => {
            el.classList.add('scroll-animate', 'fade-in-up');
            const staggerIndex = (index % 6) + 1;
            el.classList.add(`stagger-${staggerIndex}`);
            
            // Extra slow for services and solutions sections
            if (el.closest('#services') || el.closest('#solutions')) {
                el.style.transition = 'opacity 2s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            }
        });

        gridItems.forEach((el, index) => {
            if (!el.classList.contains('scroll-animate')) {
                el.classList.add('scroll-animate', 'fade-in-up');
                const staggerIndex = (index % 6) + 1;
                el.classList.add(`stagger-${staggerIndex}`);
                
                // Extra slow for industry cards
                if (el.classList.contains('industry-card')) {
                    el.style.transition = 'opacity 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 2.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }
            }
        });

        lists.forEach((el) => {
            el.classList.add('scroll-animate', 'fade-in-left');
        });

        buttons.forEach((el) => {
            el.classList.add('scroll-animate', 'scale-in');
        });

        icons.forEach((el) => {
            el.classList.add('scroll-animate', 'scale-in');
        });

        // Intersection Observer for scroll animations (slower trigger)
        const animationObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add slight delay for smoother appearance
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                        // For staggered children - slower delays
                        const children = entry.target.querySelectorAll('.scroll-animate:not(.animate)');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animate');
                            }, index * 150);
                        });
                    }, 100);
                } else {
                    // Reset when leaving viewport so animations replay on re-entry
                    entry.target.classList.remove('animate');
                    const animatedChildren = entry.target.querySelectorAll('.animate');
                    animatedChildren.forEach(child => child.classList.remove('animate'));
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        // Observe all animated elements (except hero which animates on load)
        document.querySelectorAll('.scroll-animate').forEach(el => {
            if (!el.closest('#hero')) {
                animationObserver.observe(el);
            }
        });

        // Observe sections for child animations
        sections.forEach(section => {
            animationObserver.observe(section);
        });
    };

    // Initialize scroll animations after DOM is ready
    initScrollAnimations();

    // Re-initialize animations for dynamically loaded content (web components)
    const reinitAnimations = () => {
        setTimeout(() => {
            // Animate regular DOM elements that might have been missed
            const newElements = document.querySelectorAll('.neon-panel:not(.scroll-animate), .solution-tab:not(.scroll-animate), .industry-card:not(.scroll-animate), .about-stat:not(.scroll-animate)');
            newElements.forEach((el, index) => {
                el.classList.add('scroll-animate', 'fade-in-up', `stagger-${(index % 6) + 1}`);
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate');
                        }
                    });
                }, { 
                    threshold: 0.15,
                    rootMargin: '0px 0px -80px 0px'
                });
                observer.observe(el);
            });
        }, 1000);
    };

    // Initial call for web components
    reinitAnimations();

    // Watch for dynamically added content
    const mutationObserver = new MutationObserver(() => {
        reinitAnimations();
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Why Work section emerging animations
    const whyPoints = document.querySelectorAll('[data-why-point]');
    const whyButton = document.querySelector('[data-why-button]');
    
    if (whyPoints.length > 0) {
        // Find the section containing the points
        const whyWorkSection = whyPoints[0].closest('section');
        
        if (whyWorkSection) {
            const whyWorkObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animate points
                        whyPoints.forEach((point, index) => {
                            setTimeout(() => {
                                point.style.opacity = '1';
                                point.style.transform = 'translateX(0)';
                            }, index * 150);
                        });
                        
                        // Animate button
                        if (whyButton) {
                            setTimeout(() => {
                                whyButton.style.opacity = '1';
                                whyButton.style.transform = 'scale(1)';
                            }, 800);
                        }
                        
                        whyWorkObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15,
                rootMargin: '0px 0px -80px 0px'
            });
            
            whyWorkObserver.observe(whyWorkSection);
        }
    }

    // ROI Calculator
    function formatCurrency(value) {
        return new Intl.NumberFormat('en-EU', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
    }

    function calculateTimeSavings() {
        const people = parseInt(document.getElementById('people-count')?.value || 8);
        const hoursPerWeek = parseFloat(document.getElementById('hours-per-week')?.value || 5);
        const monthlySalary = parseFloat(document.getElementById('monthly-salary')?.value || 4800);
        const aiInvestment = parseFloat(document.getElementById('ai-investment')?.value || 9600);

        // Calculate monthly hours saved (assuming 4.33 weeks per month)
        const monthlyHoursSaved = people * hoursPerWeek * 4.33;
        
        // Calculate hourly rate (monthly salary / (4.33 weeks * 40 hours))
        const hourlyRate = monthlySalary / (4.33 * 40);
        
        // Calculate annual cost savings (monthly hours saved * hourly rate * 12 - AI investment)
        const annualCostSavings = (monthlyHoursSaved * hourlyRate * 12) - aiInvestment;

        const hoursSavedEl = document.getElementById('hours-saved');
        const costSavingsEl = document.getElementById('cost-savings');
        
        if (hoursSavedEl) hoursSavedEl.textContent = Math.round(monthlyHoursSaved);
        if (costSavingsEl) costSavingsEl.textContent = formatCurrency(Math.max(0, annualCostSavings));
    }

    function calculateRevenueUplift() {
        const sessions = parseFloat(document.getElementById('website-sessions')?.value || 25000);
        const conversionRate = parseFloat(document.getElementById('conversion-rate')?.value || 2.0) / 100;
        const orderValue = parseFloat(document.getElementById('order-value')?.value || 30);
        const uplift = parseFloat(document.getElementById('ai-uplift')?.value || 5) / 100;

        // Current orders per month
        const currentOrders = sessions * conversionRate;
        
        // New conversion rate with uplift
        const newConversionRate = conversionRate * (1 + uplift);
        const newOrders = sessions * newConversionRate;
        
        // Extra orders per month
        const extraOrders = newOrders - currentOrders;
        
        // Extra annual revenue
        const extraAnnualRevenue = extraOrders * orderValue * 12;

        const extraOrdersEl = document.getElementById('extra-orders');
        const extraRevenueEl = document.getElementById('extra-revenue');
        
        if (extraOrdersEl) extraOrdersEl.textContent = Math.round(extraOrders);
        if (extraRevenueEl) extraRevenueEl.textContent = formatCurrency(extraAnnualRevenue);
    }

    // ROI Calculator event listeners
    const roiInputs = ['people-count', 'hours-per-week', 'monthly-salary', 'ai-investment', 'website-sessions', 'conversion-rate', 'order-value', 'ai-uplift'];
    roiInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            input.addEventListener('input', () => {
                // Update display value
                const valueEl = document.getElementById(id.replace('people-count', 'people-value').replace('hours-per-week', 'hours-value').replace('monthly-salary', 'salary-value').replace('ai-investment', 'investment-value').replace('website-sessions', 'sessions-value').replace('conversion-rate', 'conversion-value').replace('order-value', 'order-value-display').replace('ai-uplift', 'uplift-value'));
                
                if (valueEl) {
                    const value = parseFloat(input.value);
                    if (id === 'hours-per-week') {
                        valueEl.textContent = value + 'h';
                    } else if (id === 'monthly-salary' || id === 'ai-investment') {
                        valueEl.textContent = formatCurrency(value);
                    } else if (id === 'conversion-rate' || id === 'ai-uplift') {
                        valueEl.textContent = value + '%';
                    } else if (id === 'order-value') {
                        valueEl.textContent = formatCurrency(value);
                    } else {
                        valueEl.textContent = value.toLocaleString();
                    }
                }

                // Recalculate results
                if (['people-count', 'hours-per-week', 'monthly-salary', 'ai-investment'].includes(id)) {
                    calculateTimeSavings();
                } else {
                    calculateRevenueUplift();
                }
            });
        }
    });

    // ROI Toggle buttons
    document.querySelectorAll('.roi-toggle-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.roi-toggle-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Initialize calculations
    calculateTimeSavings();
    calculateRevenueUplift();

});
