// Enhanced Dynamic Counter System with Advanced Animations
class CounterManager {
    constructor() {
        this.counters = {};
        this.animationDuration = 2500; // 2.5 seconds for smoother animation
        this.delayBetweenCounters = 300; // 300ms delay between each counter
        this.init();
    }

    init() {
        this.loadCountersFromHTML();
        this.autoCountFromHTML(); // Automatically count actual projects and certificates
        this.setupCounters();
        this.setupIntersectionObserver();
    }

    loadCountersFromHTML() {
        const statsSection = document.querySelector('.about-stats');
        if (statsSection && statsSection.dataset.counterConfig) {
            try {
                this.counters = JSON.parse(statsSection.dataset.counterConfig);
            } catch (error) {
                console.warn('Failed to parse counter config from HTML:', error);
                // Fallback to default values
                this.counters = {
                    projects: 5,
                    certificates: 4,
                    experience: 2
                };
            }
        } else {
            // Fallback to default values if no config found
            this.counters = {
                projects: 5,
                certificates: 4,
                experience: 2
            };
        }
    }

    setupCounters() {
        // Initialize counters with 0 using data attributes
        const counterElements = document.querySelectorAll('.stat-number[data-counter]');
        counterElements.forEach(element => {
            const suffix = element.dataset.suffix || '';
            element.textContent = '0' + suffix;
        });
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
        const counterElements = document.querySelectorAll('.stat-number[data-counter]');
        let delay = 0;
        
        counterElements.forEach((element, index) => {
            const counterType = element.dataset.counter;
            const suffix = element.dataset.suffix || '';
            const targetValue = this.counters[counterType] || 0;
            
            setTimeout(() => {
                this.animateCounterElement(element, 0, targetValue, suffix);
            }, delay);
            
            delay += this.delayBetweenCounters;
        });
    }

    animateCounterElement(element, start, end, suffix = '') {
        const duration = this.animationDuration;
        const startTime = performance.now();

        // Add enhanced animation classes
        element.classList.add('counter-bubble');

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
            
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Trigger celebration animation when counter finishes
                element.classList.add('counter-celebration');
                
                // Remove classes and reset styles after celebration animation completes
                setTimeout(() => {
                    element.classList.remove('counter-bubble', 'counter-celebration');
                    element.style.transform = 'scale(1) rotate(0deg) translateY(0px)';
                }, 2000); // Increased timeout to allow celebration animation to complete
            }
        };

        requestAnimationFrame(animate);
    }

    // Legacy method for backward compatibility
    animateCounter(selector, index, start, end, suffix = '') {
        const elements = document.querySelectorAll(selector);
        if (!elements[index]) return;
        this.animateCounterElement(elements[index], start, end, suffix);
    }


    // Method to update counters dynamically
    updateCounter(type, newValue) {
        if (this.counters.hasOwnProperty(type)) {
            this.counters[type] = newValue;
            this.updateHTMLCounterConfig();
            this.setupCounters();
        }
    }

    // Method to update HTML data attributes
    updateHTMLCounterConfig() {
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            statsSection.dataset.counterConfig = JSON.stringify(this.counters);
        }
    }

    // Method to add to counters
    incrementCounter(type, amount = 1) {
        if (this.counters.hasOwnProperty(type)) {
            this.counters[type] += amount;
            this.updateHTMLCounterConfig();
            this.setupCounters();
        }
    }

    // Method to reload counters from HTML (useful for dynamic updates)
    reloadCountersFromHTML() {
        this.loadCountersFromHTML();
        this.setupCounters();
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
            projects: 5, // Updated to include portfolio project
            certificates: 4,
            experience: 2
        };
        this.updateHTMLCounterConfig();
        this.setupCounters();
    }

    // Method to automatically count projects and certificates from HTML
    autoCountFromHTML() {
        // Count actual project cards
        const projectCards = document.querySelectorAll('.projects-grid .project-card');
        const actualProjectCount = projectCards.length;
        
        // Count actual certificate cards
        const certificateCards = document.querySelectorAll('.certificates-grid .certificate-card');
        const actualCertificateCount = certificateCards.length;
        
        // Update counters if they differ from actual counts
        if (this.counters.projects !== actualProjectCount) {
            this.counters.projects = actualProjectCount;
        }
        
        if (this.counters.certificates !== actualCertificateCount) {
            this.counters.certificates = actualCertificateCount;
        }
        
        // Update HTML data attributes
        this.updateHTMLCounterConfig();
        
        return {
            projects: actualProjectCount,
            certificates: actualCertificateCount
        };
    }


    // Method to sync with portfolio data manager
    syncWithPortfolioData() {
        if (window.portfolioDataManager) {
            const portfolioData = window.portfolioDataManager.getCounters();
            this.counters.projects = portfolioData.projects;
            this.counters.certificates = portfolioData.certificates;
            this.updateHTMLCounterConfig();
            this.setupCounters();
        }
    }

    // Method to add shake effect to specific counter
    shakeCounterByType(type) {
        const counterElement = document.querySelector(`[data-counter="${type}"]`);
        if (counterElement) {
            counterElement.classList.add('counter-shake');
            setTimeout(() => {
                counterElement.classList.remove('counter-shake');
            }, 500);
        }
    }
}

// Initialize counter manager when DOM is loaded
let counterManager;

document.addEventListener('DOMContentLoaded', function() {
    counterManager = new CounterManager();
    
    // Sync with portfolio data manager after a short delay to ensure it's initialized
    setTimeout(() => {
        counterManager.syncWithPortfolioData();
    }, 100);
    
    // Expose counter manager globally for external access
    window.counterManager = counterManager;
});
