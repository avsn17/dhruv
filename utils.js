/* ========================================
   PROPOSAL WEBSITE - JAVASCRIPT
   ======================================== */

// ========== FILE: js/utils.js ==========
/**
 * Utility functions for the proposal website
 */

const Utils = {
    /**
     * Check if element is in viewport
     * @param {Element} element
     * @returns {Boolean}
     */
    isInViewport: function(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    },

    /**
     * Throttle function calls
     * @param {Function} func
     * @param {Number} delay
     * @returns {Function}
     */
    throttle: function(func, delay) {
        let lastCall = 0;
        return function(...args) {
            const now = Date.now();
            if (now - lastCall >= delay) {
                lastCall = now;
                return func(...args);
            }
        };
    },

    /**
     * Debounce function calls
     * @param {Function} func
     * @param {Number} delay
     * @returns {Function}
     */
    debounce: function(func, delay) {
        let timeoutId;
        return function(...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    },

    /**
     * Smooth scroll to element
     * @param {Element} element
     * @param {Number} offset
     */
    smoothScroll: function(element, offset = 0) {
        const elementPosition = element.offsetTop - offset;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    /**
     * Add class to element with animation
     * @param {Element} element
     * @param {String} className
     */
    addClass: function(element, className) {
        if (element) {
            element.classList.add(className);
        }
    },

    /**
     * Remove class from element
     * @param {Element} element
     * @param {String} className
     */
    removeClass: function(element, className) {
        if (element) {
            element.classList.remove(className);
        }
    },

    /**
     * Toggle class on element
     * @param {Element} element
     * @param {String} className
     */
    toggleClass: function(element, className) {
        if (element) {
            element.classList.toggle(className);
        }
    },

    /**
     * Log with custom styling
     * @param {String} message
     * @param {String} type
     */
    log: function(message, type = 'info') {
        const styles = {
            info: 'color: #9b5ba8; font-weight: bold;',
            success: 'color: #4CAF50; font-weight: bold;',
            warning: 'color: #ff9800; font-weight: bold;',
            error: 'color: #f44336; font-weight: bold;'
        };
        console.log(`%c[Proposal] ${message}`, styles[type] || styles.info);
    }
};

// ========== FILE: js/scroll.js ==========
/**
 * Scroll event handlers and management
 */

const ScrollManager = {
    lastScrollPosition: 0,
    isScrolling: false,

    /**
     * Initialize scroll event listeners
     */
    init: function() {
        window.addEventListener('scroll', Utils.throttle(() => {
            this.handleScroll();
        }, 100));

        this.hideScrollHintOnScroll();
    },

    /**
     * Handle scroll events
     */
    handleScroll: function() {
        this.lastScrollPosition = window.scrollY;
        this.triggerScrollAnimations();
    },

    /**
     * Trigger animations for elements coming into view
     */
    triggerScrollAnimations: function() {
        const elements = document.querySelectorAll('.scroll-animate');
        
        elements.forEach(element => {
            if (Utils.isInViewport(element)) {
                Utils.addClass(element, 'in-view');
            }
        });
    },

    /**
     * Hide scroll hint after first scroll
     */
    hideScrollHintOnScroll: function() {
        const scrollHint = document.getElementById('scroll-hint');
        if (scrollHint) {
            if (this.lastScrollPosition > 100) {
                Utils.addClass(scrollHint, 'hidden');
            } else {
                Utils.removeClass(scrollHint, 'hidden');
            }
        }
    },

    /**
     * Get current scroll position
     * @returns {Number}
     */
    getScrollPosition: function() {
        return this.lastScrollPosition;
    },

    /**
     * Scroll to section
     * @param {String} sectionId
     */
    scrollToSection: function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            Utils.smoothScroll(section);
        }
    }
};

// ========== FILE: js/main.js ==========
/**
 * Main application logic
 */

const App = {
    /**
     * Initialize the application
     */
    init: function() {
        Utils.log('Initializing Proposal Website...', 'info');
        
        this.setupEventListeners();
        ScrollManager.init();
        this.setupIntersectionObserver();
        
        Utils.log('Application initialized successfully!', 'success');
    },

    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Wish items click handlers
        document.querySelectorAll('.wish-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.handleWishItemClick(e);
            });

            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    this.handleWishItemClick(e);
                }
            });
        });

        // Window resize handler
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleWindowResize();
        }, 250));

        // Page visibility handler
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    },

    /**
     * Handle wish item click
     * @param {Event} e
     */
    handleWishItemClick: function(e) {
        const item = e.currentTarget;
        
        // Add clicked state
        Utils.toggleClass(item, 'clicked');
        
        // Remove after animation
        setTimeout(() => {
            Utils.removeClass(item, 'clicked');
        }, 500);
    },

    /**
     * Setup Intersection Observer for scroll animations
     */
    setupIntersectionObserver: function() {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    Utils.addClass(entry.target, 'in-view');
                    observer.unobserve(entry.target);
                }
            });
        }, options);

        // Observe all scroll-animate elements
        document.querySelectorAll('.scroll-animate').forEach(element => {
            observer.observe(element);
        });
    },

    /**
     * Handle window resize
     */
    handleWindowResize: function() {
        // Add resize-specific logic if needed
    },

    /**
     * Handle page visibility changes
     */
    handleVisibilityChange: function() {
        if (document.hidden) {
            Utils.log('Page hidden', 'info');
        } else {
            Utils.log('Page visible', 'success');
        }
    },

    /**
     * Get application status
     * @returns {Object}
     */
    getStatus: function() {
        return {
            scrollPosition: ScrollManager.getScrollPosition(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            timestamp: new Date().toISOString()
        };
    }
};

// ========== DOCUMENT READY / DOMContentLoaded ==========
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});

// ========== WINDOW LOAD ==========
window.addEventListener('load', function() {
    Utils.log('All resources loaded', 'success');
    
    // Any post-load optimization or analytics
    if (window.performance && window.performance.timing) {
        const pageLoadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
        Utils.log(`Page load time: ${pageLoadTime}ms`, 'info');
    }
});

// ========== UNLOAD / PAGE EXIT ==========
window.addEventListener('beforeunload', function() {
    Utils.log('Page unloading', 'info');
});

// ========== ERROR HANDLING ==========
window.addEventListener('error', function(event) {
    Utils.log(`Error: ${event.message}`, 'error');
    console.error('Full error:', event);
});

// ========== UNHANDLED PROMISE REJECTION ==========
window.addEventListener('unhandledrejection', function(event) {
    Utils.log(`Unhandled rejection: ${event.reason}`, 'error');
});
