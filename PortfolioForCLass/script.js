// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initLoader();
    initNavigation();
    initTypewriter();
    initScrollAnimations();
    initProgressBars();
    initMetricCounters();
    initProjectFilters();
    initContactForm();
    initSmoothScroll();
    initParallaxEffects();
    
});

// Loading Screen
function initLoader() {
    const loader = document.querySelector('.loader');
    const loaderProgress = document.querySelector('.loader-progress');
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loader after a short delay
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = 'visible';
            }, 500);
        }
        loaderProgress.style.width = progress + '%';
    }, 100);
}

// Navigation
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 15, 35, 0.1)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            navbar.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 15, 35, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
            navbar.style.boxShadow = '0 4px 20px rgba(255, 107, 107, 0.2)';
            navbar.style.borderBottom = 'none';
        }
    });
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Typewriter Effect
function initTypewriter() {
    const typewriterElement = document.querySelector('.typewriter');
    const texts = [
        'Full Stack Developer',
        'Software Engineer',
        '3D Artist',
        'Problem Solver',
        'Creative Thinker'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before next word
        }
        
        setTimeout(type, typeSpeed);
    }
    
    if (typewriterElement) {
        setTimeout(type, 1000);
    }
}

// Scroll Animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                if (entry.target.classList.contains('expertise-card')) {
                    entry.target.classList.add('animate');
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.fade-in, .slide-up, .expertise-card');
    animateElements.forEach(el => observer.observe(el));
    
    // Add staggered animation to expertise cards
    const expertiseCards = document.querySelectorAll('.expertise-card');
    expertiseCards.forEach((card, index) => {
        // Remove any existing animation delay from CSS
        card.style.animationDelay = `${index * 0.3}s`;
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // Add animation classes to other elements
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        const cards = section.querySelectorAll('.project-tile, .info-card, .tech-category');
        cards.forEach((card, cardIndex) => {
            card.classList.add('fade-in');
            card.style.transitionDelay = `${cardIndex * 0.1}s`;
        });
    });
}

// Skill Bars Animation
function initProgressBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                const targetWidth = skillFill.getAttribute('data-progress');
                
                setTimeout(() => {
                    skillFill.style.width = targetWidth + '%';
                }, 300);
                
                skillObserver.unobserve(skillFill);
            }
        });
    }, { threshold: 0.5 });
    
    skillFills.forEach(fill => skillObserver.observe(fill));
}

// Metric Counters Animation
function initMetricCounters() {
    const counters = document.querySelectorAll('.metric-value');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 50;
                
                const updateCounter = () => {
                    if (current < target) {
                        current += increment;
                        counter.textContent = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target;
                    }
                };
                
                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// Project Filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectTiles = document.querySelectorAll('.project-tile');
    
    // Ensure all projects are visible initially
    projectTiles.forEach(tile => {
        tile.style.display = 'block';
        tile.style.opacity = '1';
        tile.style.transform = 'translateY(0)';
        tile.style.visibility = 'visible';
    });
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter projects
            projectTiles.forEach(tile => {
                if (filter === 'all' || tile.classList.contains(filter)) {
                    tile.style.display = 'block';
                    tile.style.visibility = 'visible';
                    setTimeout(() => {
                        tile.style.opacity = '1';
                        tile.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    tile.style.opacity = '0';
                    tile.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        tile.style.display = 'none';
                        tile.style.visibility = 'hidden';
                    }, 300);
                }
            });
        });
    });
}

// Contact Form
function initContactForm() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const formObject = {};
            formData.forEach((value, key) => {
                formObject[key] = value;
            });
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                // Show success message
                showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }
}

// Smooth Scroll
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 100;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Parallax Effects
function initParallaxEffects() {
    const shapes = document.querySelectorAll('.shape');
    const profileRing = document.querySelector('.profile-ring');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Animate background shapes
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.1);
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
        
        // Animate profile ring
        if (profileRing) {
            profileRing.style.transform = `rotate(${scrolled * 0.1}deg)`;
        }
    });
}

// Utility Functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#48bb78' : '#4299e1'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Add hover effects to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.expertise-card, .project-tile, .info-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Dynamic background color based on scroll position
function initDynamicBackground() {
    const sections = document.querySelectorAll('section');
    const colors = [
        'rgba(247, 250, 252, 1)', // Hero
        'rgba(255, 255, 255, 1)',  // About
        'rgba(247, 250, 252, 1)',  // Expertise
        'rgba(255, 255, 255, 1)',  // Work
        'rgba(247, 250, 252, 1)'   // Contact
    ];
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        
        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop - windowHeight / 2 && 
                scrollPosition < sectionTop + sectionHeight - windowHeight / 2) {
                document.body.style.backgroundColor = colors[index];
            }
        });
    });
}

// Initialize additional effects
document.addEventListener('DOMContentLoaded', () => {
    initDynamicBackground();
    
    // Add loading states to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && this.href.includes('#')) return;
            
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// Add CSS animations for ripple effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .notification {
        font-family: 'Space Grotesk', sans-serif;
        font-weight: 500;
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
    }
`;
document.head.appendChild(style);