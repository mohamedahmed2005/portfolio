// Clean & Calm Animation Manager
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupStaggeredAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    entry.target.dataset.revealed = 'true';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-card, .certificate-card, .experience-card, .section-header, .scroll-reveal'
        );

        animatedElements.forEach((el) => {
            if (el.dataset.revealed === 'true') return;
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    setupStaggeredAnimations() {
        const grids = document.querySelectorAll('.projects-grid, .skills-grid, .certificates-grid');
        grids.forEach(grid => {
            const cards = grid.querySelectorAll('.project-card, .skill-card, .certificate-card');
            cards.forEach((card, index) => {
                card.classList.add('animate-ready');
                card.style.transitionDelay = `${index * 0.06}s`;
            });
        });
    }
}

// Simple & Subtle CSS Animations
const animationStyles = `
/* Gentle Reveal Animation */
.animate-ready {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.45s ease-out, transform 0.45s ease-out;
    will-change: opacity, transform;
}

.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Calm Card Hover */
.project-card, .skill-card, .certificate-card, .experience-card {
    transition: transform 0.25s ease-out, box-shadow 0.25s ease-out, border-color 0.25s ease-out;
}

.project-card:hover, .skill-card:hover, .certificate-card:hover, .experience-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
}

/* Subtle Feature Item Hover */
.feature-item {
    transition: color 0.2s ease, transform 0.2s ease;
}

.feature-item:hover {
    transform: translateX(4px);
}

/* Clean Button Hover */
.btn {
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(37, 99, 235, 0.2);
}

/* Clean Section Header Reveal */
.section-header {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.45s ease-out, transform 0.45s ease-out;
}

.section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
}
`;

// Inject simple animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    new AnimationManager();
});
