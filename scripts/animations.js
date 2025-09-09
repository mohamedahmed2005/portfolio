// Advanced Card Animations and Scroll Effects
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        // Disabled to prevent hover/cursor-driven card movement
        // this.setupCardHoverEffects();
        this.setupStaggeredAnimations();
    }

    setupScrollAnimations() {
        const observerOptions = {
            threshold: 0.12,
            rootMargin: '0px 0px -10% 0px'
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

        // Observe cards, timeline, headers, and any element marked .scroll-reveal
        const animatedElements = document.querySelectorAll(
            '.project-card, .skill-card, .certificate-card, .timeline-item, .section-header, .scroll-reveal'
        );

        animatedElements.forEach((el) => {
            if (el.dataset.revealed === 'true') return;
            el.classList.add('animate-ready');
            el.style.willChange = 'transform, opacity';
            observer.observe(el);
        });
    }

    setupCardHoverEffects() {
        // Intentionally left empty to disable hover effects
    }

    animateCardHover(card, isEntering) {
        const icon = card.querySelector('.card-icon');
        const badge = card.querySelector('.card-badge');
        const features = card.querySelectorAll('.feature-item');
        
        // No-op to prevent any hover-driven movement
        if (!card) return;
        if (icon) icon.style.transform = 'none';
        if (badge) badge.style.transform = 'none';
        features.forEach(feature => { feature.style.transform = 'none'; });
        card.style.boxShadow = '';
    }

    animateCardTilt(card, event) {
        // Disabled tilt to prevent movement following cursor
        if (card) {
            card.style.transform = 'none';
        }
    }

    setupStaggeredAnimations() {
        // Re-apply staggered reveal delays for these sections
        const grids = document.querySelectorAll('.projects-grid, .skills-grid, .certificates-grid');
        grids.forEach(grid => {
            const cards = grid.querySelectorAll('.project-card, .skill-card, .certificate-card');
            cards.forEach((card, index) => {
                card.classList.add('animate-ready');
                card.style.transitionDelay = `${index * 0.08}s`;
            });
        });
    }
}

// Enhanced CSS animations
const animationStyles = `
/* Counter Animations */
.counter-pulse {
    animation: counterPulse 0.6s ease-in-out;
}

@keyframes counterPulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.1); }
    100% { transform: scale(1); }
}

/* Card Entrance Animations */
.animate-ready {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
    transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.animate-in {
    opacity: 1;
    transform: translateY(0) scale(1);
}

/* Card slide-in for skills, certificates, projects */
.project-card, .skill-card, .certificate-card {
    animation: cardSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) both;
}

@keyframes cardSlideIn {
    0% {
        opacity: 0;
        transform: translateY(50px) scale(0.9);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Enhanced Hover Effects */
.project-card:hover, .skill-card:hover, .certificate-card:hover {
    transform: translateY(-6px) scale(1.02);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Feature Item Animations */
.feature-item { transition: all 0.3s ease-out; }
.feature-item:hover { transform: translateX(8px); }

.feature-item i { transition: all 0.3s ease-out; }
.feature-item:hover i { transform: scale(1.2); }

/* Tech Tag Animations */
.tech-tag {
    transition: all 0.3s ease-out;
}

.tech-tag:hover {
    transform: translateY(-2px) scale(1.05);
    background-color: var(--accent-primary);
    color: var(--text-inverse);
}

/* Button Animations */
.btn {
    position: relative;
    overflow: hidden;
    transition: all 0.3s ease-out;
}

.btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transition: left 0.5s;
}

.btn:hover::before {
    left: 100%;
}

.btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(37, 99, 235, 0.3);
}

/* Timeline Item Animations */
.timeline-item {
    opacity: 0;
    transform: translateX(-50px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.timeline-item.animate-in {
    opacity: 1;
    transform: translateX(0);
}

.timeline-marker {
    transition: all 0.3s ease-out;
}

.timeline-item:hover .timeline-marker {
    transform: scale(1.2);
    box-shadow: 0 0 20px rgba(37, 99, 235, 0.5);
}

/* Section Header Animations */
.section-header {
    opacity: 0;
    transform: translateY(-30px);
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.section-header.animate-in {
    opacity: 1;
    transform: translateY(0);
}

/* Loading Animation for Cards */
@keyframes cardLoad {
    0% {
        opacity: 0;
        transform: translateY(20px) scale(0.95);
    }
    50% {
        opacity: 0.7;
        transform: translateY(-5px) scale(1.02);
    }
    100% {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Pulse Animation for Icons */
@keyframes iconPulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}

.card-icon:hover { animation: iconPulse 1s infinite; }

/* Gradient Animation for Headers */
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.card-header { background-size: 200% 200%; animation: gradientShift 3s ease infinite; }
`;

// Inject animation styles
const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// Initialize animation manager when DOM is loaded
let animationManager;

document.addEventListener('DOMContentLoaded', function() {
    animationManager = new AnimationManager();
});
