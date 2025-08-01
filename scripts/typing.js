// Typing Animation Script
class TypingAnimation {
    constructor(element, phrases, options = {}) {
        this.element = element;
        this.phrases = phrases;
        this.options = {
            typeSpeed: options.typeSpeed || 100,
            deleteSpeed: options.deleteSpeed || 50,
            pauseTime: options.pauseTime || 2000,
            loop: options.loop !== false,
            cursor: options.cursor || '|',
            ...options
        };
        
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        if (!this.element) return;
        
        // Start typing animation
        this.type();
    }
    
    type() {
        const currentPhrase = this.phrases[this.currentPhraseIndex];
        
        if (this.isDeleting) {
            // Deleting characters
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentPhraseIndex = (this.currentPhraseIndex + 1) % this.phrases.length;
                
                // If we've gone through all phrases and loop is false, stop
                if (this.currentPhraseIndex === 0 && !this.options.loop) {
                    return;
                }
                
                setTimeout(() => this.type(), this.options.pauseTime / 2);
                return;
            }
            
            setTimeout(() => this.type(), this.options.deleteSpeed);
        } else {
            // Typing characters
            this.element.textContent = currentPhrase.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentPhrase.length) {
                this.isPaused = true;
                setTimeout(() => {
                    this.isPaused = false;
                    this.isDeleting = true;
                    this.type();
                }, this.options.pauseTime);
                return;
            }
            
            // Add some randomness to typing speed for more realistic effect
            const randomDelay = this.options.typeSpeed + (Math.random() * 50);
            setTimeout(() => this.type(), randomDelay);
        }
    }
    
    // Public methods
    pause() {
        this.isPaused = true;
    }
    
    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }
    
    stop() {
        this.options.loop = false;
    }
    
    restart() {
        this.currentPhraseIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.options.loop = true;
        this.type();
    }
}

// Initialize typing animation when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const typedTextElement = document.getElementById('typed-text');
    
    if (typedTextElement) {
        const phrases = [
            'AI/ML Engineer',
            'Full-Stack Developer',
            'Problem Solver',
            'Innovation Driver',
            'Tech Enthusiast'
        ];
        
        // Create typing animation instance
        const typingAnimation = new TypingAnimation(typedTextElement, phrases, {
            typeSpeed: 80,
            deleteSpeed: 40,
            pauseTime: 2000,
            loop: true
        });
        
        // Store reference for potential future use
        window.typingAnimation = typingAnimation;
    }
});

// Enhanced cursor blinking effect
function initializeCursor() {
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        // Add random blinking pattern for more natural effect
        setInterval(() => {
            const shouldBlink = Math.random() > 0.7;
            if (shouldBlink) {
                cursor.style.opacity = '0';
                setTimeout(() => {
                    cursor.style.opacity = '1';
                }, 150);
            }
        }, 1000);
    }
}

// Alternative typing effect for other text elements
class TextRevealAnimation {
    constructor(element, options = {}) {
        this.element = element;
        this.options = {
            speed: options.speed || 50,
            delay: options.delay || 0,
            ...options
        };
        
        this.originalText = this.element.textContent;
        this.element.textContent = '';
        
        setTimeout(() => this.reveal(), this.options.delay);
    }
    
    reveal() {
        let index = 0;
        const revealInterval = setInterval(() => {
            if (index < this.originalText.length) {
                this.element.textContent += this.originalText[index];
                index++;
            } else {
                clearInterval(revealInterval);
            }
        }, this.options.speed);
    }
}

// Initialize text reveal animations for section titles
function initializeTextReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.revealed) {
                entry.target.dataset.revealed = 'true';
                
                // Add staggered reveal for children if they have the class
                if (entry.target.classList.contains('stagger-reveal')) {
                    const children = entry.target.children;
                    Array.from(children).forEach((child, index) => {
                        setTimeout(() => {
                            child.classList.add('fade-in-up');
                        }, index * 100);
                    });
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TypingAnimation, TextRevealAnimation };
}