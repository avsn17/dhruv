/**
 * ✨ PARALLAX & SCROLL ANIMATIONS
 * Handles parallax scrolling for background and triggers animations on scroll
 */

(function() {
    'use strict';

    // Configuration
    const CONFIG = {
        parallaxStrength: 0.5,
        intersectionThreshold: 0.3,
        reducedMotionQuery: '(prefers-reduced-motion: reduce)',
    };

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia(CONFIG.reducedMotionQuery).matches;

    /**
     * Parallax Scrolling Effect
     * Makes the background move subtly as you scroll
     */
    function initParallax() {
        if (prefersReducedMotion) return;

        const background = document.querySelector('.canva-background');
        if (!background) return;

        let ticking = false;
        let lastScrollY = 0;

        function updateParallax() {
            const offsetY = window.scrollY * CONFIG.parallaxStrength;
            background.style.transform = `translateY(${offsetY}px)`;
            ticking = false;
        }

        function onScroll() {
            lastScrollY = window.scrollY;
            if (!ticking) {
                window.requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }

        window.addEventListener('scroll', onScroll, { passive: true });
    }

    /**
     * Scroll-Triggered Animations
     * Detects when sections come into view and triggers animations
     */
    function initScrollAnimations() {
        if (prefersReducedMotion) return;

        const sections = document.querySelectorAll('section');
        if (sections.length === 0) return;

        const observerOptions = {
            threshold: CONFIG.intersectionThreshold,
            rootMargin: '0px 0px -50px 0px',
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add animation class when element comes into view
                    entry.target.classList.add('in-view');
                    
                    // Optionally stop observing after animation plays
                    // observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe all sections
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    /**
     * Animate elements on demand
     * Can be called to animate individual elements
     */
    function animateElement(element, animationClass = 'in-view') {
        if (element && !element.classList.contains(animationClass)) {
            element.classList.add(animationClass);
        }
    }

    /**
     * Scroll progress indicator
     * Updates scroll progress as user scrolls
     */
    function updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / scrollHeight) * 100;
        return scrolled;
    }

    /**
     * Smooth scroll to element
     */
    function smoothScrollToElement(selector) {
        const element = document.querySelector(selector);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    /**
     * Initialize all effects
     */
    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                initParallax();
                initScrollAnimations();
            });
        } else {
            initParallax();
            initScrollAnimations();
        }

        // Expose functions to window for external use
        window.scrollAnimations = {
            animateElement,
            smoothScrollToElement,
            updateScrollProgress,
        };
    }

    // Start initialization
    init();
})();
