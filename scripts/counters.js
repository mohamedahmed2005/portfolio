// Enhanced Dynamic Counter System with Advanced Animations
class CounterManager {
    constructor() {
        this.counters = {
            projects: 3,
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

        // Add pulse animation class
        element.classList.add('counter-pulse');

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Multiple easing functions for more dynamic animation
            let easeProgress;
            if (progress < 0.5) {
                // Ease out for first half
                easeProgress = 2 * progress * progress;
            } else {
                // Ease in for second half
                easeProgress = 1 - Math.pow(-2 * progress + 2, 3) / 2;
            }
            
            const currentValue = Math.floor(start + (end - start) * easeProgress);
            
            // Add number formatting for larger numbers
            const formattedValue = currentValue.toLocaleString();
            element.textContent = formattedValue + suffix;
            
            // Add scale animation during counting
            const scale = 1 + (Math.sin(progress * Math.PI) * 0.1);
            element.style.transform = `scale(${scale})`;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Remove pulse class and reset transform when done
                element.classList.remove('counter-pulse');
                element.style.transform = 'scale(1)';
            }
        };

        requestAnimationFrame(animate);
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
}

// Initialize counter manager when DOM is loaded
let counterManager;

document.addEventListener('DOMContentLoaded', function() {
    counterManager = new CounterManager();
});
