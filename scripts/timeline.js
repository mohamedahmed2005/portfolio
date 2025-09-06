// Enhanced Timeline JavaScript Functionality
class TimelineManager {
    constructor(options = {}) {
        this.timelineContainer = null;
        this.timelineItems = [];
        this.currentIndex = 0;
        this.autoRotateInterval = null;
        this.autoRotateDelay = options.autoRotateDelay || 5000; // 5 seconds default
        this.isAutoRotating = options.autoRotate !== false; // true by default
        this.isUserInteracting = false;
        this.animationDuration = 600;
        this.autoRotateOnLoad = options.autoRotateOnLoad !== false; // true by default
        this.pauseOnHover = options.pauseOnHover !== false; // true by default
        
        this.init();
    }

    init() {
        this.timelineContainer = document.querySelector('.cards-container');
        if (!this.timelineContainer) {
            console.warn('Timeline container not found');
            return;
        }

        this.timelineItems = Array.from(document.querySelectorAll('.cards li'));
        this.setupEventListeners();
        this.setupKeyboardNavigation();
        this.setupIntersectionObserver();
        this.addProgressIndicator();
        
        // Initialize rotation for the first checked item
        this.initializeRotation();
        
        // Start auto-rotation if enabled
        if (this.isAutoRotating && this.autoRotateOnLoad) {
            this.startAutoRotation();
        }
        
        console.log('Timeline Manager initialized with', this.timelineItems.length, 'items');
    }

    setupEventListeners() {
        // Radio button change events
        this.timelineItems.forEach((item, index) => {
            const radio = item.querySelector('input[type="radio"]');
            const label = item.querySelector('label');
            
            if (radio && label) {
                radio.addEventListener('change', (e) => {
                    if (e.target.checked) {
                        this.handleItemSelection(index);
                    }
                });

                // Enhanced label interactions
                label.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectItem(index);
                });

                label.addEventListener('mouseenter', () => {
                    this.handleItemHover(index, true);
                });

                label.addEventListener('mouseleave', () => {
                    this.handleItemHover(index, false);
                });
            }
        });

        // Container interactions - only pause on hover if enabled
        if (this.pauseOnHover) {
            this.timelineContainer.addEventListener('mouseenter', () => {
                this.pauseAutoRotation();
            });

            this.timelineContainer.addEventListener('mouseleave', () => {
                if (!this.isUserInteracting && this.isAutoRotating) {
                    this.resumeAutoRotation();
                }
            });
        }

        // Touch/swipe support for mobile
        this.setupTouchNavigation();
    }

    setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!this.timelineContainer.contains(document.activeElement)) return;

            switch (e.key) {
                case 'ArrowLeft':
                case 'ArrowUp':
                    e.preventDefault();
                    this.previousItem();
                    break;
                case 'ArrowRight':
                case 'ArrowDown':
                    e.preventDefault();
                    this.nextItem();
                    break;
                case 'Home':
                    e.preventDefault();
                    this.selectItem(0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.selectItem(this.timelineItems.length - 1);
                    break;
                case ' ':
                case 'Enter':
                    e.preventDefault();
                    this.toggleAutoRotation();
                    break;
            }
        });
    }

    setupTouchNavigation() {
        let startX = 0;
        let startY = 0;
        let isDragging = false;

        this.timelineContainer.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            isDragging = false;
            // Don't automatically pause on touch - let user control it
        }, { passive: true });

        this.timelineContainer.addEventListener('touchmove', (e) => {
            if (!startX || !startY) return;

            const currentX = e.touches[0].clientX;
            const currentY = e.touches[0].clientY;
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                isDragging = true;
                e.preventDefault();
            }
        });

        this.timelineContainer.addEventListener('touchend', (e) => {
            if (!isDragging) return;

            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;

            if (Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextItem();
                } else {
                    this.previousItem();
                }
            }

            startX = 0;
            startY = 0;
            isDragging = false;
            
            // Don't automatically resume - let user control it
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.timelineContainer.classList.add('timeline-visible');
                    this.animateTimelineEntrance();
                } else {
                    this.timelineContainer.classList.remove('timeline-visible');
                }
            });
        }, {
            threshold: 0.3,
            rootMargin: '0px 0px -100px 0px'
        });

        observer.observe(this.timelineContainer);
    }

    animateTimelineEntrance() {
        this.timelineItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('timeline-item-enter');
            }, index * 100);
        });
    }

    handleItemSelection(index) {
        this.currentIndex = index;
        this.isUserInteracting = true;
        
        // Don't pause auto-rotation on manual selection - keep it running
        
        // Add selection animation
        this.timelineItems[index].classList.add('timeline-item-selected');
        
        // Remove selection from other items
        this.timelineItems.forEach((item, i) => {
            if (i !== index) {
                item.classList.remove('timeline-item-selected');
            }
        });

        // Update rotation class for the cards container
        this.updateRotation(index);

        // Update progress bar
        this.updateProgressBar();

        // Don't interfere with auto-rotation
        setTimeout(() => {
            this.isUserInteracting = false;
        }, 1000);
    }

    initializeRotation() {
        // Find the currently checked item
        const checkedItem = this.timelineItems.find(item => {
            const radio = item.querySelector('input[type="radio"]');
            return radio && radio.checked;
        });
        
        if (checkedItem) {
            const index = this.timelineItems.indexOf(checkedItem);
            this.currentIndex = index;
            this.updateRotation(index);
        }
    }

    updateRotation(index) {
        const cardsContainer = this.timelineContainer.querySelector('.cards');
        if (cardsContainer) {
            // Remove all rotation classes
            cardsContainer.classList.remove('rotate-0', 'rotate-1', 'rotate-2', 'rotate-3', 'rotate-4', 'rotate-5', 'rotate-6', 'rotate-7', 'rotate-8', 'rotate-9');
            // Add the appropriate rotation class
            cardsContainer.classList.add(`rotate-${index}`);
        }
    }

    handleItemHover(index, isHovering) {
        const item = this.timelineItems[index];
        if (isHovering) {
            item.classList.add('timeline-item-hover');
        } else {
            item.classList.remove('timeline-item-hover');
        }
    }

    selectItem(index) {
        if (index < 0 || index >= this.timelineItems.length) return;
        
        const radio = this.timelineItems[index].querySelector('input[type="radio"]');
        if (radio) {
            radio.checked = true;
            radio.dispatchEvent(new Event('change'));
        }
    }

    nextItem() {
        const nextIndex = (this.currentIndex + 1) % this.timelineItems.length;
        this.selectItem(nextIndex);
    }

    previousItem() {
        const prevIndex = this.currentIndex === 0 ? this.timelineItems.length - 1 : this.currentIndex - 1;
        this.selectItem(prevIndex);
    }

    startAutoRotation() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }

        console.log('Starting auto-rotation with delay:', this.autoRotateDelay);
        this.autoRotateInterval = setInterval(() => {
            if (this.isAutoRotating && !this.isUserInteracting) {
                console.log('Auto-rotating to next item');
                this.nextItem();
            }
        }, this.autoRotateDelay);
    }

    pauseAutoRotation() {
        this.isAutoRotating = false;
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
        console.log('Auto-rotation paused');
    }

    resumeAutoRotation() {
        this.isAutoRotating = true;
        this.startAutoRotation();
        console.log('Auto-rotation resumed');
    }

    toggleAutoRotation() {
        if (this.isAutoRotating) {
            this.pauseAutoRotation();
            this.showNotification('Timeline auto-rotation paused');
        } else {
            this.resumeAutoRotation();
            this.showNotification('Timeline auto-rotation resumed');
        }
        // Update the button icon immediately
        this.updateProgressBar();
    }

    enableAutoRotation() {
        this.isAutoRotating = true;
        this.startAutoRotation();
        this.showNotification('Timeline auto-rotation enabled');
    }

    disableAutoRotation() {
        this.isAutoRotating = false;
        this.pauseAutoRotation();
        this.showNotification('Timeline auto-rotation disabled');
    }

    setAutoRotateDelay(delay) {
        this.autoRotateDelay = delay;
        if (this.isAutoRotating) {
            this.startAutoRotation();
        }
    }

    addProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.className = 'timeline-progress';
        progressContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress-fill"></div>
            </div>
            <div class="progress-controls">
                <button class="progress-btn prev-btn" aria-label="Previous item">
                    <i class="fas fa-chevron-left"></i>
                </button>
                <button class="progress-btn play-pause-btn" aria-label="Toggle auto-rotation">
                    <i class="fas ${this.isAutoRotating ? 'fa-pause' : 'fa-play'}"></i>
                </button>
                <button class="progress-btn next-btn" aria-label="Next item">
                    <i class="fas fa-chevron-right"></i>
                </button>
            </div>
        `;

        this.timelineContainer.appendChild(progressContainer);

        // Add control event listeners
        const prevBtn = progressContainer.querySelector('.prev-btn');
        const nextBtn = progressContainer.querySelector('.next-btn');
        const playPauseBtn = progressContainer.querySelector('.play-pause-btn');

        prevBtn.addEventListener('click', () => this.previousItem());
        nextBtn.addEventListener('click', () => this.nextItem());
        playPauseBtn.addEventListener('click', () => this.toggleAutoRotation());

        // Update progress bar
        this.updateProgressBar();
    }

    updateProgressBar() {
        const progressFill = this.timelineContainer.querySelector('.progress-fill');
        const playPauseIcon = this.timelineContainer.querySelector('.play-pause-btn i');
        
        if (progressFill) {
            const progress = ((this.currentIndex + 1) / this.timelineItems.length) * 100;
            progressFill.style.width = `${progress}%`;
        }

        if (playPauseIcon) {
            const iconClass = this.isAutoRotating ? 'fas fa-pause' : 'fas fa-play';
            playPauseIcon.className = iconClass;
            console.log('Updated play/pause icon:', iconClass, 'isAutoRotating:', this.isAutoRotating);
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'timeline-notification';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 10);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    // Public API methods
    getCurrentIndex() {
        return this.currentIndex;
    }

    getTotalItems() {
        return this.timelineItems.length;
    }

    isAutoRotatingEnabled() {
        return this.isAutoRotating;
    }

    getAutoRotateDelay() {
        return this.autoRotateDelay;
    }

    destroy() {
        if (this.autoRotateInterval) {
            clearInterval(this.autoRotateInterval);
        }
        
        // Remove event listeners and cleanup
        this.timelineItems.forEach(item => {
            const radio = item.querySelector('input[type="radio"]');
            const label = item.querySelector('label');
            
            if (radio) radio.removeEventListener('change', this.handleItemSelection);
            if (label) {
                label.removeEventListener('click', this.selectItem);
                label.removeEventListener('mouseenter', this.handleItemHover);
                label.removeEventListener('mouseleave', this.handleItemHover);
            }
        });
    }
}

// Enhanced CSS for timeline interactions
const timelineStyles = `
/* Timeline Progress Indicator */
.timeline-progress {
    position: absolute;
    bottom: -60px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    z-index: 20;
}

.progress-bar {
    width: 200px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;
    backdrop-filter: blur(10px);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-primary), var(--accent-secondary));
    border-radius: 2px;
    transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
}

.progress-controls {
    display: flex;
    gap: 0.5rem;
    align-items: center;
}

.progress-btn {
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 50%;
    background: var(--bg-card);
    color: var(--text-primary);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
}

.progress-btn:hover {
    background: var(--accent-primary);
    color: white;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.progress-btn:active {
    transform: scale(0.95);
}

/* Timeline Notifications */
.timeline-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--bg-card);
    color: var(--text-primary);
    padding: 1rem 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    border: 1px solid var(--border-light);
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
}

.timeline-notification.show {
    transform: translateX(0);
}

/* Timeline Item States */
.timeline-item-enter {
    animation: timelineItemEnter 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes timelineItemEnter {
    0% {
        opacity: 0;
        transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(0.8);
    }
    100% {
        opacity: 1;
        transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(1);
    }
}

.timeline-item-selected {
    animation: timelineItemSelected 0.4s ease-out;
}

@keyframes timelineItemSelected {
    0% { transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(1); }
    50% { transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(1.05); }
    100% { transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(1); }
}

.timeline-item-hover {
    transform: rotate(calc(var(--i) * 360deg / var(--items))) scale(1.02);
    transition: transform 0.2s ease;
}

.timeline-visible .cards-container {
    animation: timelineContainerEnter 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
}

@keyframes timelineContainerEnter {
    0% {
        opacity: 0;
        transform: scale(0.9) rotate(5deg);
    }
    100% {
        opacity: 1;
        transform: scale(1) rotate(0deg);
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .timeline-progress {
        bottom: -50px;
    }
    
    .progress-bar {
        width: 150px;
    }
    
    .progress-btn {
        width: 35px;
        height: 35px;
    }
    
    .timeline-notification {
        top: 10px;
        right: 10px;
        left: 10px;
        transform: translateY(-100%);
    }
    
    .timeline-notification.show {
        transform: translateY(0);
    }
}

/* Accessibility */
.progress-btn:focus {
    outline: 2px solid var(--accent-primary);
    outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
    .timeline-item-enter,
    .timeline-item-selected,
    .timeline-container-enter {
        animation: none;
    }
    
    .progress-fill {
        transition: none;
    }
}
`;

// Inject timeline styles
const timelineStyleSheet = document.createElement('style');
timelineStyleSheet.textContent = timelineStyles;
document.head.appendChild(timelineStyleSheet);

// Initialize timeline manager when DOM is loaded
let timelineManager;

document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to initialize
    setTimeout(() => {
        // Default configuration - you can modify these options
        const timelineOptions = {
            autoRotate: true,           // Enable/disable auto-rotation
            autoRotateDelay: 4000,      // Delay between rotations (ms) - 4 seconds
            autoRotateOnLoad: true,     // Start auto-rotation immediately
            pauseOnHover: false         // Don't pause on hover - continuous rotation until user pauses
        };
        
        timelineManager = new TimelineManager(timelineOptions);
        
        // Make timeline manager globally accessible for external control
        window.timelineManager = timelineManager;
    }, 100);
});

// Export for potential external use
window.TimelineManager = TimelineManager;
