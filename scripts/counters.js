// Enhanced Dynamic Counter System with Advanced Animations
class CounterManager {
    constructor() {
        this.counters = {
            projects: 4,
            certificates: 4,
            experience: 2
        };
        this.animationDuration = 2500; // 2.5 seconds for smoother animation
        this.delayBetweenCounters = 300; // 300ms delay between each counter
        this.init();
    }

    init() {
        this.setupCounters();
        this.setupIntersectionObserver();
    }

    setupCounters() {
        // Initialize counters with 0
        this.updateCounterElement('stat-number', 0, 0, '+');
        this.updateCounterElement('stat-number', 1, 0, '');
        this.updateCounterElement('stat-number', 2, 0, '+');
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCounters();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            observer.observe(statsSection);
        }
    }

    updateCounterElement(className, index, value, suffix = '') {
        const elements = document.querySelectorAll(`.${className}`);
        if (elements[index]) {
            elements[index].textContent = value + suffix;
        }
    }

    animateCounters() {
        // Animate projects counter with delay
        setTimeout(() => {
            this.animateCounter('.stat-number', 0, 0, this.counters.projects, '+');
        }, 0);
        
        // Animate certificates counter with delay
        setTimeout(() => {
            this.animateCounter('.stat-number', 1, 0, this.counters.certificates, '');
        }, this.delayBetweenCounters);
        
        // Animate experience counter with delay
        setTimeout(() => {
            this.animateCounter('.stat-number', 2, 0, this.counters.experience, '+');
        }, this.delayBetweenCounters * 2);
    }

    animateCounter(selector, index, start, end, suffix = '') {
        const elements = document.querySelectorAll(selector);
        if (!elements[index]) return;

        const element = elements[index];
        const duration = this.animationDuration;
        const startTime = performance.now();

        // Add enhanced animation classes
        element.classList.add('counter-pulse', 'counter-glow');
        
        // Add ripple effect
        this.createRippleEffect(element);

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Advanced easing function with bounce effect
            let easeProgress;
            if (progress < 0.3) {
                // Fast start
                easeProgress = 3 * progress * progress;
            } else if (progress < 0.7) {
                // Slow middle
                easeProgress = 0.3 + (progress - 0.3) * 0.4;
            } else {
                // Bounce finish
                const bounceProgress = (progress - 0.7) / 0.3;
                easeProgress = 0.7 + 0.3 * (1 - Math.pow(1 - bounceProgress, 3));
            }
            
            const currentValue = Math.floor(start + (end - start) * easeProgress);
            
            // Add number formatting for larger numbers
            const formattedValue = currentValue.toLocaleString();
            element.textContent = formattedValue + suffix;
            
            // Enhanced scale animation with rotation
            const scale = 1 + (Math.sin(progress * Math.PI * 2) * 0.15);
            const rotation = Math.sin(progress * Math.PI) * 5;
            const translateY = Math.sin(progress * Math.PI) * -10;
            
            element.style.transform = `scale(${scale}) rotate(${rotation}deg) translateY(${translateY}px)`;
            
            // Add color transition effect
            const hue = 200 + (progress * 60); // Blue to green transition
            element.style.filter = `hue-rotate(${hue}deg) brightness(${1 + progress * 0.2})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Final celebration effect
                this.celebrateCounter(element);
                
                // Remove classes and reset styles
                setTimeout(() => {
                    element.classList.remove('counter-pulse', 'counter-glow');
                    element.style.transform = 'scale(1) rotate(0deg) translateY(0px)';
                    element.style.filter = 'none';
                }, 500);
            }
        };

        requestAnimationFrame(animate);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('div');
        ripple.className = 'counter-ripple';
        ripple.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 0;
            height: 0;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 1;
            animation: rippleExpand 1.5s ease-out forwards;
        `;
        
        element.style.position = 'relative';
        element.appendChild(ripple);
        
        // Remove ripple after animation
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 1500);
    }

    celebrateCounter(element) {
        // Add celebration particles
        for (let i = 0; i < 6; i++) {
            setTimeout(() => {
                this.createParticle(element);
            }, i * 100);
        }
        
        // Add final glow effect
        element.classList.add('counter-celebration');
        setTimeout(() => {
            element.classList.remove('counter-celebration');
        }, 1000);
    }

    createParticle(element) {
        const particle = document.createElement('div');
        particle.className = 'counter-particle';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 30;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #3b82f6, #10b981);
            border-radius: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            z-index: 10;
            animation: particleFloat 1s ease-out forwards;
            --particle-x: ${x}px;
            --particle-y: ${y}px;
        `;
        
        element.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1000);
    }

    // Method to update counters dynamically
    updateCounter(type, newValue) {
        if (this.counters.hasOwnProperty(type)) {
            this.counters[type] = newValue;
            this.setupCounters();
        }
    }

    // Method to add to counters
    incrementCounter(type, amount = 1) {
        if (this.counters.hasOwnProperty(type)) {
            this.counters[type] += amount;
            this.setupCounters();
        }
    }

    // Method to trigger counter animation manually
    triggerCounterAnimation() {
        this.animateCounters();
    }

    // Method to add new counter types
    addCounter(type, value) {
        this.counters[type] = value;
    }

    // Method to get current counter values
    getCounters() {
        return { ...this.counters };
    }

    // Method to reset all counters
    resetCounters() {
        this.counters = {
            projects: 4,
            certificates: 4,
            experience: 2
        };
        this.setupCounters();
    }

    // Method to add celebration effect to specific counter
    celebrateCounterByType(type) {
        const typeMap = {
            'projects': 0,
            'certificates': 1,
            'experience': 2
        };
        
        const index = typeMap[type];
        if (index !== undefined) {
            const elements = document.querySelectorAll('.stat-number');
            if (elements[index]) {
                this.celebrateCounter(elements[index]);
            }
        }
    }

    // Method to add shake effect to specific counter
    shakeCounterByType(type) {
        const typeMap = {
            'projects': 0,
            'certificates': 1,
            'experience': 2
        };
        
        const index = typeMap[type];
        if (index !== undefined) {
            const elements = document.querySelectorAll('.stat-number');
            if (elements[index]) {
                elements[index].classList.add('counter-shake');
                setTimeout(() => {
                    elements[index].classList.remove('counter-shake');
                }, 500);
            }
        }
    }
}

// Initialize counter manager when DOM is loaded
let counterManager;

document.addEventListener('DOMContentLoaded', function() {
    counterManager = new CounterManager();
});
