// Simple Theme Management System
class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.themes = ['light', 'dark', 'blue', 'green', 'purple', 'orange', 'red'];
        this.themeToggle = document.getElementById('theme-toggle');
        this.loadedThemes = new Set();
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.setupThemeToggle();
        this.applyTheme(this.currentTheme);
    }

    loadSavedTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme && this.themes.includes(savedTheme)) {
            this.currentTheme = savedTheme;
        }
    }

    setupThemeToggle() {
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => {
                this.cycleTheme();
            });
        }
    }

    cycleTheme() {
        const currentIndex = this.themes.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.setTheme(this.themes[nextIndex]);
    }

    setTheme(theme) {
        if (!this.themes.includes(theme)) return;
        
        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateThemeToggle();
    }

    applyTheme(theme) {
        const body = document.body;
        
        // Remove all theme classes
        this.themes.forEach(t => body.classList.remove(`theme-${t}`));
        
        // Add current theme class
        body.classList.add(`theme-${theme}`);
        
        // Set data attribute
        body.setAttribute('data-theme', theme);
        
        // Load theme CSS file
        this.loadThemeCSS(theme);
        
        // Update theme toggle icon
        this.updateThemeToggle();
    }

    loadThemeCSS(theme) {
        // Remove any existing theme CSS
        const existingThemeCSS = document.getElementById(`theme-${theme}-css`);
        if (existingThemeCSS) {
            existingThemeCSS.remove();
        }

        // Create new link element for theme CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = `styles/themes/${theme}.css`;
        link.id = `theme-${theme}-css`;
        
        // Add to head
        document.head.appendChild(link);
        
        // Mark as loaded
        this.loadedThemes.add(theme);
        
        console.log(`Theme ${theme} CSS loaded`);
    }

    updateThemeToggle() {
        if (this.themeToggle) {
            const icon = this.themeToggle.querySelector('i');
            if (icon) {
                // Update icon based on theme
                const iconMap = {
                    'light': 'fa-moon',
                    'dark': 'fa-sun',
                    'blue': 'fa-moon',
                    'green': 'fa-moon',
                    'purple': 'fa-moon',
                    'orange': 'fa-moon',
                    'red': 'fa-moon'
                };
                
                icon.className = `fas ${iconMap[this.currentTheme] || 'fa-moon'}`;
            }
        }
    }

    saveTheme(theme) {
        localStorage.setItem('portfolio-theme', theme);
    }

    getCurrentTheme() {
        return this.currentTheme;
    }
}

// Initialize theme manager when DOM is loaded
let themeManager;

document.addEventListener('DOMContentLoaded', function() {
    themeManager = new ThemeManager();
});
