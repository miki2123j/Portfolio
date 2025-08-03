// Smooth Scrolling and Scroll Effects
class ScrollEffects {
    constructor() {
        this.scrollProgress = document.querySelector('.scroll-progress');
        this.backToTopBtn = document.getElementById('back-to-top');
        this.navbar = document.querySelector('.navbar');
        this.sections = document.querySelectorAll('section');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        this.setupSmoothScrolling();
        this.setupScrollProgress();
        this.setupBackToTop();
        this.setupNavbarEffects();
        this.setupScrollAnimations();
        this.setupActiveNavigation();
        this.setupParallaxEffects();
    }
    
    setupSmoothScrolling() {
        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Cross-browser compatible scroll calculation
                    const navbarHeight = 80;
                    let elementPosition;
                    
                    // Use getBoundingClientRect for more accurate positioning across browsers
                    const rect = targetElement.getBoundingClientRect();
                    const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
                    elementPosition = rect.top + currentScrollY - navbarHeight;
                    
                    // Fallback for older browsers or edge cases
                    if (isNaN(elementPosition) || elementPosition < 0) {
                        elementPosition = targetElement.offsetTop - navbarHeight;
                    }
                    
                    // Enhanced smooth scroll with fallback
                    if ('scrollBehavior' in document.documentElement.style) {
                        window.scrollTo({
                            top: Math.max(0, elementPosition),
                            behavior: 'smooth'
                        });
                    } else {
                        // Fallback for browsers without smooth scroll support
                        this.smoothScrollFallback(Math.max(0, elementPosition));
                    }
                }
            });
        });
    }
    
    // Smooth scroll fallback for older browsers
    smoothScrollFallback(targetY) {
        const startY = window.pageYOffset;
        const difference = targetY - startY;
        const startTime = performance.now();
        const duration = 800; // 800ms duration
        
        function step(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeInOutCubic = progress < 0.5 
                ? 4 * progress * progress * progress 
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;
            
            window.scrollTo(0, startY + difference * easeInOutCubic);
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        }
        
        requestAnimationFrame(step);
    }
    
    setupScrollProgress() {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / documentHeight) * 100;
            
            if (this.scrollProgress) {
                this.scrollProgress.style.width = scrollPercent + '%';
            }
        });
    }
    
    setupBackToTop() {
        if (!this.backToTopBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.backToTopBtn.classList.add('visible');
            } else {
                this.backToTopBtn.classList.remove('visible');
            }
        });
        
        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    setupNavbarEffects() {
        if (!this.navbar) {
            console.warn('⚠️ Navbar not found!');
            return;
        }
        console.log('🧠 Setting up navbar effects...');
        
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            
            // Add enhanced background effect when scrolled - navbar stays pinned
            if (scrollTop > 50) {
                this.navbar.classList.add('navbar-scrolled');
            } else {
                this.navbar.classList.remove('navbar-scrolled');
            }
            
            // Navbar now stays pinned at top - no hiding behavior
            // Keep navbar always visible for better UX
            
            lastScrollTop = scrollTop;
        });
    }
    
    setupScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation classes based on data attributes
                    if (element.dataset.animation) {
                        element.classList.add(element.dataset.animation);
                    } else {
                        element.classList.add('animated');
                    }
                    
                    // Handle skill progress bars
                    if (element.classList.contains('skill-progress')) {
                        const targetWidth = element.dataset.width;
                        element.style.width = targetWidth;
                    }
                    
                    // Handle staggered animations
                    if (element.classList.contains('stagger-animation')) {
                        element.classList.add('animated');
                    }
                    
                    // Unobserve after animation
                    observer.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all elements with animation classes
        document.querySelectorAll('.animate-on-scroll, .skill-progress, .stagger-animation').forEach(el => {
            observer.observe(el);
        });
    }
    
    setupActiveNavigation() {
        let isManualNavigation = false;
        
        const observer = new IntersectionObserver((entries) => {
            // Skip automatic updates during manual navigation
            if (isManualNavigation) return;
            
            // Find the section that's most visible in the viewport
            let mostVisibleSection = null;
            let maxVisibility = 0;
            
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const visibility = entry.intersectionRatio;
                    if (visibility > maxVisibility) {
                        maxVisibility = visibility;
                        mostVisibleSection = entry.target;
                    }
                }
            });
            
            // Update active state based on most visible section
            if (mostVisibleSection) {
                this.updateActiveNavigation(mostVisibleSection.id);
            }
        }, {
            threshold: [0.1, 0.3, 0.5, 0.7], // Multiple thresholds for better detection
            rootMargin: '-80px 0px -50% 0px' // Account for navbar height
        });
        
        // Observe all sections
        this.sections.forEach(section => {
            observer.observe(section);
        });
        
        // Add click handlers for manual navigation
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const targetId = link.getAttribute('href').substring(1);
                
                // Immediately update active state
                this.updateActiveNavigation(targetId);
                
                // Disable observer briefly to prevent conflicts
                isManualNavigation = true;
                setTimeout(() => {
                    isManualNavigation = false;
                }, 1000);
            });
        });
    }
    
    updateActiveNavigation(sectionId) {
        // Remove active class from all nav links
        this.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current section nav link
        const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }
    
    setupParallaxEffects() {
        const parallaxElements = document.querySelectorAll('.floating-element, .neural-network');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            parallaxElements.forEach(element => {
                element.style.transform = `translateY(${rate}px)`;
            });
        });
    }
}

// Scroll-triggered counter animation
class CounterAnimation {
    constructor(element, target, duration = 2000) {
        this.element = element;
        this.target = parseInt(target);
        this.duration = duration;
        this.startTime = null;
        this.observer = null;
        
        this.setupObserver();
    }
    
    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animate();
                    this.observer.unobserve(this.element);
                }
            });
        }, { threshold: 0.5 });
        
        this.observer.observe(this.element);
    }
    
    animate() {
        if (!this.startTime) this.startTime = performance.now();
        
        const currentTime = performance.now();
        const elapsed = currentTime - this.startTime;
        const progress = Math.min(elapsed / this.duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(this.target * easeOutQuart);
        
        this.element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(() => this.animate());
        } else {
            this.element.textContent = this.target;
        }
    }
}

// Scroll-triggered text reveal
class ScrollTextReveal {
    constructor() {
        this.setupObserver();
    }
    
    setupObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const text = element.textContent;
                    element.textContent = '';
                    
                    // Split text into spans for individual character animation
                    text.split('').forEach((char, index) => {
                        const span = document.createElement('span');
                        span.textContent = char === ' ' ? '\u00A0' : char;
                        span.style.opacity = '0';
                        span.style.transform = 'translateY(20px)';
                        span.style.transition = `all 0.5s ease ${index * 0.03}s`;
                        element.appendChild(span);
                        
                        setTimeout(() => {
                            span.style.opacity = '1';
                            span.style.transform = 'translateY(0)';
                        }, 100);
                    });
                    
                    observer.unobserve(element);
                }
            });
        }, { threshold: 0.8 });
        
        document.querySelectorAll('.text-reveal').forEach(el => {
            observer.observe(el);
        });
    }
}

// Mobile navigation toggle
class MobileNavigation {
    constructor() {
        this.hamburger = document.querySelector('.hamburger');
        this.navMenu = document.querySelector('.nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        
        this.init();
    }
    
    init() {
        if (!this.hamburger || !this.navMenu) return;
        
        this.hamburger.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.hamburger.contains(e.target) && !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });
    }
    
    toggleMenu() {
        this.navMenu.classList.toggle('active');
        this.hamburger.classList.toggle('active');
        
        // Animate hamburger lines
        const spans = this.hamburger.querySelectorAll('span');
        if (this.hamburger.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.hamburger.classList.remove('active');
        
        const spans = this.hamburger.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// Initialize scroll effects when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('📜 Initializing scroll effects...');
    // Initialize all scroll-related functionality
    new ScrollEffects();
    console.log('✅ Scroll effects initialized!');
    new ScrollTextReveal();
    new MobileNavigation();
    
    // Initialize counters for metrics
    document.querySelectorAll('.metric-value').forEach(element => {
        const target = element.textContent.replace('%', '');
        if (!isNaN(target)) {
            new CounterAnimation(element, target);
        }
    });
    
    // Add scroll-triggered animations to various elements
    const animateElements = document.querySelectorAll('.section-title, .about-text, .timeline-item, .project-card, .education-card');
    animateElements.forEach(element => {
        element.classList.add('animate-on-scroll');
    });
    
    // Initialize skill bar animations
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.dataset.width;
        if (width) {
            bar.style.setProperty('--target-width', width);
        }
    });
});

// Throttle function for performance optimization
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce function for performance optimization
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const args = arguments;
        const context = this;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    };
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ScrollEffects, CounterAnimation, ScrollTextReveal, MobileNavigation };
}