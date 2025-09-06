// Advanced Card Animations and Scroll Effects
class AnimationManager {
    constructor() {
        this.init();
    }

    init() {
        this.setupScrollAnimations();
        this.setupCardHoverEffects();
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
                }
            });
        }, observerOptions);

        // Observe all cards and sections
        const animatedElements = document.querySelectorAll('.project-card, .skill-card, .certificate-card, .timeline-item, .section-header');
        animatedElements.forEach(el => {
            el.classList.add('animate-ready');
            observer.observe(el);
        });
    }

    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.project-card, .skill-card, .certificate-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', (e) => {
                this.animateCardHover(e.target, true);
            });

            card.addEventListener('mouseleave', (e) => {
                this.animateCardHover(e.target, false);
            });

            card.addEventListener('mousemove', (e) => {
                this.animateCardTilt(e.target, e);
            });
        });
    }

    animateCardHover(card, isEntering) {
        const icon = card.querySelector('.card-icon');
        const badge = card.querySelector('.card-badge');
        const features = card.querySelectorAll('.feature-item');
        
        if (isEntering) {
            // Subtle icon animation
            if (icon) {
                icon.style.transform = 'scale(1.05)';
                icon.style.transition = 'transform 0.2s ease-out';
            }

            // Subtle badge animation
            if (badge) {
                badge.style.transform = 'scale(1.02)';
                badge.style.transition = 'transform 0.2s ease-out';
            }

            // Gentle feature animation
            features.forEach((feature, index) => {
                setTimeout(() => {
                    feature.style.transform = 'translateX(3px)';
                    feature.style.transition = 'transform 0.15s ease-out';
                }, index * 30);
            });

            // Subtle glow effect
            card.style.boxShadow = '0 12px 24px rgba(37, 99, 235, 0.08)';
            card.style.transition = 'box-shadow 0.2s ease-out';
        } else {
            // Reset animations
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
            if (badge) {
                badge.style.transform = 'scale(1)';
            }
            features.forEach(feature => {
                feature.style.transform = 'translateX(0)';
            });
            card.style.boxShadow = '';
        }
    }

    animateCardTilt(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // Much more subtle tilt effect
        const rotateX = (y - centerY) / 30;
        const rotateY = (centerX - x) / 30;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(5px)`;
        card.style.transition = 'transform 0.15s ease-out';
    }

    setupStaggeredAnimations() {
        const grids = document.querySelectorAll('.projects-grid, .skills-grid, .certificates-grid');
        
        grids.forEach(grid => {
            const cards = grid.querySelectorAll('.project-card, .skill-card, .certificate-card');
            
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.1}s`;
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

/* Staggered Animation for Cards */
.project-card, .skill-card, .certificate-card {
    animation: cardSlideIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    animation-fill-mode: both;
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
    transform: translateY(-8px) scale(1.02);
    transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

/* Feature Item Animations */
.feature-item {
    transition: all 0.3s ease-out;
}

.feature-item:hover {
    transform: translateX(8px);
    color: var(--accent-primary);
}

.feature-item i {
    transition: all 0.3s ease-out;
}

.feature-item:hover i {
    transform: scale(1.2);
    color: var(--accent-primary);
}

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

.card-icon:hover {
    animation: iconPulse 1s infinite;
}

/* Gradient Animation for Headers */
@keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.card-header {
    background-size: 200% 200%;
    animation: gradientShift 3s ease infinite;
}
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
