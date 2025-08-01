// Main JavaScript file for portfolio website
class PortfolioApp {
    constructor() {
        this.preloader = document.getElementById('preloader');
        this.contactForm = document.querySelector('.contact-form');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.projectCards = document.querySelectorAll('.project-card');
        this.techBadges = document.querySelectorAll('.tech-badge');
        
        this.init();
    }
    
    init() {
        console.log('🔧 Starting Portfolio App initialization...');
        try {
            this.setupPreloader();
            console.log('✅ Preloader setup complete');
            
            this.setupContactForm();
            console.log('✅ Contact form setup complete');
            
            this.setupInteractiveElements();
            console.log('✅ Interactive elements setup complete');
            
            this.setupAboutBadges();
            console.log('✅ About badges setup complete');
            
            this.setupThemeToggle();
            console.log('✅ Theme toggle setup complete');
            
            this.setupLoadingAnimations();
            console.log('✅ Loading animations setup complete');
            
            this.setupProfileImage();
            console.log('✅ Profile image setup complete');
            
            this.setupPerformanceOptimizations();
            console.log('✅ Performance optimizations setup complete');
            
            console.log('🎉 Portfolio App initialization successful!');
        } catch (error) {
            console.error('❌ Portfolio App initialization failed:', error);
            // Try to at least show content even if there are errors
            this.emergencyContentShow();
        }
    }
    
    emergencyContentShow() {
        console.log('🆘 Emergency content display activated');
        try {
            // Force hide preloader
            const preloader = document.getElementById('preloader');
            if (preloader) {
                preloader.style.display = 'none';
            }
            
            // Force show all content
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.style.display = 'block';
                aboutSection.style.visibility = 'visible';
                aboutSection.style.opacity = '1';
            }
            
            // Force show all text
            const textElements = document.querySelectorAll('p, h1, h2, h3, h4, span');
            textElements.forEach(el => {
                el.style.color = '#ffffff';
                el.style.visibility = 'visible';
            });
            
            console.log('✅ Emergency content display complete');
        } catch (emergencyError) {
            console.error('❌ Emergency content display failed:', emergencyError);
        }
    }
    
    setupPreloader() {
        // Emergency fallback - hide preloader immediately if it's still showing after 2 seconds
        setTimeout(() => {
            if (this.preloader && !this.preloader.classList.contains('preloader-hidden')) {
                console.warn('⚠️ Emergency preloader removal activated!');
                this.hidePreloader();
            }
        }, 2000);
        
        // Reduce delay and add error handling
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.hidePreloader();
            }, 100); // Reduced from 1000ms to 100ms
        });
        
        // Also hide on DOMContentLoaded as backup
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => this.hidePreloader(), 200);
            });
        } else {
            // DOM is already loaded
            setTimeout(() => this.hidePreloader(), 50);
        }
    }
    
    hidePreloader() {
        try {
            if (this.preloader) {
                console.log('🎯 Hiding preloader...');
                this.preloader.classList.add('preloader-hidden');
                setTimeout(() => {
                    this.preloader.style.display = 'none';
                    console.log('✅ Preloader hidden successfully!');
                }, 300);
                
                // Trigger entrance animations
                this.triggerEntranceAnimations();
            } else {
                console.warn('⚠️ Preloader element not found!');
            }
        } catch (error) {
            console.error('❌ Error hiding preloader:', error);
            // Force hide even if there's an error
            if (this.preloader) {
                this.preloader.style.display = 'none';
            }
        }
    }
    
    triggerEntranceAnimations() {
        // Animate hero section elements
        const heroElements = document.querySelectorAll('.hero-text > *');
        heroElements.forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('fade-in-up');
            }, index * 200);
        });
        
        // Animate floating elements
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '1';
                element.classList.add('hardware-accelerated');
            }, index * 500);
        });
    }
    
    setupContactForm() {
        if (!this.contactForm) return;
        
        this.contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(this.contactForm);
            const formObject = Object.fromEntries(formData);
            
            // Validate form
            if (this.validateForm(formObject)) {
                this.submitForm(formObject);
            }
        });
        
        // Add floating label effect
        const formGroups = document.querySelectorAll('.form-group');
        formGroups.forEach(group => {
            const input = group.querySelector('input, textarea');
            const label = group.querySelector('label');
            
            if (input && label) {
                input.addEventListener('focus', () => {
                    label.classList.add('focused');
                });
                
                input.addEventListener('blur', () => {
                    if (!input.value) {
                        label.classList.remove('focused');
                    }
                });
                
                // Check if input has value on load
                if (input.value) {
                    label.classList.add('focused');
                }
            }
        });
    }
    
    validateForm(data) {
        const errors = [];
        
        if (!data.name || data.name.trim().length < 2) {
            errors.push('Name must be at least 2 characters long');
        }
        
        if (!data.email || !this.isValidEmail(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            errors.push('Subject must be at least 5 characters long');
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.push('Message must be at least 10 characters long');
        }
        
        if (errors.length > 0) {
            this.showFormErrors(errors);
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showFormErrors(errors) {
        // Remove existing error messages
        const existingErrors = document.querySelectorAll('.form-error');
        existingErrors.forEach(error => error.remove());
        
        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'form-error';
        errorContainer.innerHTML = `
            <div class="error-list">
                ${errors.map(error => `<p>• ${error}</p>`).join('')}
            </div>
        `;
        
        // Style error container
        errorContainer.style.cssText = `
            background: rgba(255, 0, 0, 0.1);
            border: 1px solid rgba(255, 0, 0, 0.3);
            border-radius: 8px;
            padding: 1rem;
            margin-bottom: 1rem;
            color: #ff6b6b;
            animation: shake 0.5s ease-in-out;
        `;
        
        this.contactForm.prepend(errorContainer);
        
        // Remove error after 5 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);
    }
    
    async submitForm(formData) {
        const submitBtn = this.contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        try {
            // Simulate form submission (replace with actual endpoint)
            await this.simulateFormSubmission(formData);
            
            // Show success message
            this.showFormSuccess();
            this.contactForm.reset();
            
        } catch (error) {
            console.error('Form submission error:', error);
            this.showFormErrors(['Failed to send message. Please try again later.']);
        } finally {
            // Restore button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }
    
    simulateFormSubmission(formData) {
        return new Promise((resolve, reject) => {
            // Simulate API call delay
            setTimeout(() => {
                // Simulate 90% success rate
                if (Math.random() > 0.1) {
                    console.log('Form submitted:', formData);
                    resolve(formData);
                } else {
                    reject(new Error('Submission failed'));
                }
            }, 2000);
        });
    }
    
    showFormSuccess() {
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <p>Thank you! Your message has been sent successfully.</p>
                <p>I'll get back to you as soon as possible.</p>
            </div>
        `;
        
        successMessage.style.cssText = `
            background: rgba(0, 255, 0, 0.1);
            border: 1px solid rgba(0, 255, 0, 0.3);
            border-radius: 8px;
            padding: 1.5rem;
            margin-bottom: 1rem;
            color: #4ade80;
            text-align: center;
            animation: fadeIn 0.5s ease-in-out;
        `;
        
        this.contactForm.prepend(successMessage);
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    }
    
    setupInteractiveElements() {
        // Add hover effects to project cards
        this.projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
                card.style.transition = 'all 0.3s ease';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Add click effects to tech badges
        this.techBadges.forEach(badge => {
            badge.addEventListener('click', () => {
                badge.classList.add('click-effect');
                setTimeout(() => {
                    badge.classList.remove('click-effect');
                }, 300);
            });
        });
        
        // Add ripple effect to buttons
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('click', this.createRippleEffect);
        });
    }
    
    setupAboutBadges() {
        const aboutBadges = document.querySelectorAll('.about-badge');
        console.log(`🏷️ Found ${aboutBadges.length} about badges`);
        
        // Add hover and click effects to about badges
        aboutBadges.forEach(badge => {
            badge.addEventListener('mouseenter', () => {
                badge.style.transform = 'translateY(-3px) scale(1.05)';
                badge.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
            });
            
            badge.addEventListener('mouseleave', () => {
                badge.style.transform = 'translateY(0) scale(1)';
                badge.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
            });
            
            badge.addEventListener('click', () => {
                badge.style.animation = 'heartbeat 0.6s ease-in-out';
                setTimeout(() => {
                    badge.style.animation = '';
                }, 600);
            });
        });
        
        // Animate badges on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const badges = entry.target.querySelectorAll('.about-badge');
                    badges.forEach((badge, index) => {
                        setTimeout(() => {
                            badge.classList.add('fade-in-up');
                        }, index * 200);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const aboutBadgesContainer = document.querySelector('.about-badges');
        if (aboutBadgesContainer) {
            observer.observe(aboutBadgesContainer);
        }
    }
    
    createRippleEffect(e) {
        const button = e.currentTarget;
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    setupThemeToggle() {
        // Create theme toggle button (if not exists)
        let themeToggle = document.querySelector('.theme-toggle');
        
        if (!themeToggle) {
            themeToggle = document.createElement('button');
            themeToggle.className = 'theme-toggle';
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            themeToggle.setAttribute('aria-label', 'Toggle theme');
            
            themeToggle.style.cssText = `
                position: fixed;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: var(--glass-bg);
                border: 1px solid var(--glass-border);
                border-radius: 50%;
                color: var(--text-primary);
                cursor: pointer;
                backdrop-filter: blur(10px);
                z-index: 1000;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.2rem;
            `;
            
            document.body.appendChild(themeToggle);
        }
        
        // Load saved theme
        const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
        document.documentElement.setAttribute('data-theme', savedTheme);
        this.updateThemeToggle(themeToggle, savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
            this.updateThemeToggle(themeToggle, newTheme);
        });
    }
    
    updateThemeToggle(toggle, theme) {
        const icon = toggle.querySelector('i');
        if (theme === 'light') {
            icon.className = 'fas fa-moon';
            toggle.setAttribute('aria-label', 'Switch to dark theme');
        } else {
            icon.className = 'fas fa-sun';
            toggle.setAttribute('aria-label', 'Switch to light theme');
        }
    }
    
    setupLoadingAnimations() {
        // Add loading animation to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', () => {
                img.classList.add('loaded');
            });
        });
        
        // Animate elements as they come into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        // Observe all animatable elements
        const animatableElements = document.querySelectorAll('.project-card, .timeline-item, .education-card, .contact-item');
        animatableElements.forEach(el => {
            el.classList.add('pre-animate');
            observer.observe(el);
        });
    }
    
    setupProfileImage() {
        const profileImage = document.querySelector('.profile-image');
        
        if (profileImage) {
            // Add loading animation
            profileImage.addEventListener('load', () => {
                profileImage.classList.add('loaded');
                console.log('🖼️ Profile image loaded successfully');
            });
            
            // Add error handling
            profileImage.addEventListener('error', () => {
                console.warn('⚠️ Profile image failed to load, showing fallback');
                // Create fallback placeholder
                const heroImage = document.querySelector('.hero-image');
                if (heroImage) {
                    heroImage.innerHTML = `
                        <div class="image-placeholder">
                            <i class="fas fa-user"></i>
                        </div>
                    `;
                }
            });
            
            // If image is already cached and loaded
            if (profileImage.complete) {
                profileImage.classList.add('loaded');
            }
        }
    }
    
    setupPerformanceOptimizations() {
        // Lazy load images
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            imageObserver.unobserve(img);
                        }
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
        
        // Optimize animations for mobile
        if (window.matchMedia('(max-width: 768px)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.3s');
        }
        
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--animation-duration', '0.01s');
        }
    }
}

// Utility functions
const utils = {
    // Debounce function
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle function
    throttle(func, limit) {
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
    },
    
    // Animate number counting
    animateNumber(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const increment = (target - start) / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    },
    
    // Check if element is in viewport
    isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
};

// Add CSS for additional animations
const additionalCSS = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    .pre-animate {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease-out;
    }
    
    .animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .loaded {
        animation: fadeIn 0.5s ease-in-out;
    }
    
    [data-theme="light"] {
        --primary-bg: #ffffff;
        --secondary-bg: #f8f9fa;
        --text-primary: #1a1a1a;
        --text-secondary: #4a4a4a;
        --text-muted: #6a6a6a;
        --glass-bg: rgba(0, 0, 0, 0.05);
        --glass-border: rgba(0, 0, 0, 0.1);
    }
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);

// Multiple initialization strategies for maximum reliability
function initializePortfolio() {
    console.log('🚀 Portfolio app initializing...');
    try {
        const app = new PortfolioApp();
        console.log('✅ Portfolio app initialized successfully!');
        return app;
    } catch (error) {
        console.error('❌ Portfolio app initialization failed:', error);
        // Emergency fallback
        setTimeout(() => {
            const preloader = document.getElementById('preloader');
            if (preloader) preloader.style.display = 'none';
        }, 100);
        return null;
    }
}

// Initialize as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePortfolio);
} else {
    // DOM already loaded
    initializePortfolio();
}

// Backup initialization
window.addEventListener('load', () => {
    // Double-check that everything is working
    const aboutSection = document.getElementById('about');
    if (aboutSection && window.getComputedStyle(aboutSection).display === 'none') {
        console.warn('⚠️ About section not visible, forcing display');
        aboutSection.style.display = 'block';
    }
});

// Emergency timeout fallback
setTimeout(() => {
    const preloader = document.getElementById('preloader');
    if (preloader && window.getComputedStyle(preloader).display !== 'none') {
        console.warn('⚠️ Emergency preloader removal after 4 seconds');
        preloader.style.display = 'none';
    }
}, 4000);

document.addEventListener('DOMContentLoaded', () => {
    // Add keyboard navigation support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Console easter egg
    console.log(`
        🚀 Welcome to Mikiyas Batu's Portfolio!
        
        Built with:
        • Vanilla JavaScript
        • CSS3 with Glassmorphism
        • Modern animations and interactions
        • Responsive design
        
        Feel free to explore the code!
        
        📧 Contact: mikiyas.batu@gmail.com
        🔗 LinkedIn: linkedin.com/in/mikiyasbatu
        💻 GitHub: github.com/miki2123j
    `);
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PortfolioApp, utils };
}