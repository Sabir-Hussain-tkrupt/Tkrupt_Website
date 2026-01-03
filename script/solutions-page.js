// Solutions page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Category filter functionality
    const categoryButtons = document.querySelectorAll('.solution-category-btn');
    const solutionSections = document.querySelectorAll('.solution-category-section');
    const solutionCards = document.querySelectorAll('.solution-detail-card');

    // Initialize: show all sections by default
    solutionSections.forEach(section => {
        section.style.display = 'block';
    });

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            // Filter sections
            solutionSections.forEach(section => {
                const sectionCategory = section.getAttribute('data-category');
                if (category === 'all' || sectionCategory === category) {
                    section.style.display = 'block';
                    section.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                animationObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    const animatedElements = document.querySelectorAll('.solution-animate-left, .solution-animate-right, .industry-animate-fade, .industries-header-animate');
    animatedElements.forEach(el => {
        el.style.animationPlayState = 'paused';
        animationObserver.observe(el);
    });

    // Initialize feather icons for all icons on the page
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, 100);

    // Re-initialize icons after animations trigger
    setTimeout(() => {
        if (typeof feather !== 'undefined') {
            feather.replace();
        }
    }, 1000);
});

// Add fadeInUp animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);



