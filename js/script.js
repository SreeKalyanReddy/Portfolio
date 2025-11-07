// DOM Elements
const dadModeToggle = document.getElementById('dad-mode-toggle');
const mobileDadModeToggle = document.getElementById('mobile-dad-mode-toggle');
const contactForm = document.querySelector('.contact-form');
const loadMoreBtn = document.querySelector('.load-more');

// Dark Mode Toggle - Default to dark mode
let isDarkMode = true;

// Sync both toggles
function syncToggles(sourceToggle, targetToggle) {
    if (targetToggle) {
        targetToggle.checked = sourceToggle.checked;
    }
}

// Add event listener to the desktop checkbox
if (dadModeToggle) {
    dadModeToggle.addEventListener('change', function() {
        isDarkMode = this.checked;
        syncToggles(this, mobileDadModeToggle);
        toggleDarkMode();
    });
}

// Add event listener to the mobile checkbox
if (mobileDadModeToggle) {
    mobileDadModeToggle.addEventListener('change', function() {
        isDarkMode = this.checked;
        syncToggles(this, dadModeToggle);
        toggleDarkMode();
    });
}

// Add fallback click handler to the entire toggle area
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', function(e) {
        // Only trigger if clicking on the toggle area, not the checkbox itself
        if (e.target === navToggle || e.target.classList.contains('dad-mode')) {
            if (dadModeToggle) {
                dadModeToggle.checked = !dadModeToggle.checked;
                isDarkMode = dadModeToggle.checked;
                syncToggles(dadModeToggle, mobileDadModeToggle);
                toggleDarkMode();
            }
        }
    });
}

function toggleDarkMode() {
    const body = document.body;
    
    // Add enhanced transition class for smooth animation
    body.classList.add('theme-transitioning');
    
    // Create a subtle staggered animation effect
    const sections = ['.hero', '.about', '.portfolio', '.contact'];
    sections.forEach((selector, index) => {
        const element = document.querySelector(selector);
        if (element) {
            setTimeout(() => {
                element.style.transitionDelay = `${index * 0.1}s`;
            }, 50);
        }
    });
    
    if (isDarkMode) {
        body.classList.add('dark-mode');
        localStorage.setItem('darkMode', 'enabled');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkMode', 'disabled');
    }
    
    // Reset transition delays and remove transition class after animation completes
    setTimeout(() => {
        sections.forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.style.transitionDelay = '0s';
            }
        });
        body.classList.remove('theme-transitioning');
    }, 1200);
    
    // Trigger header update for current scroll position
    window.dispatchEvent(new Event('scroll'));
}



// Contact Form Handling
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const firstName = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phone = this.querySelector('input[type="tel"]').value;
    const message = this.querySelector('textarea').value;
    
    // Simple validation
    if (!firstName || !email) {
        showNotification('Please fill in all required fields!', 'error');
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address!', 'error');
        return;
    }
    
    // Simulate form submission
    showNotification('Thanks for reaching out! I\'ll get back to you soon.', 'success');
    this.reset();
});

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 1002;
        animation: slideIn 0.3s ease-out;
        ${type === 'success' ? 'background: #28a745;' : 'background: #dc3545;'}
    `;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Load More Portfolio Items
let portfolioItemsVisible = 12;
const portfolioItems = document.querySelectorAll('.portfolio-item');

// Initially hide items beyond the first 12
function initializePortfolio() {
    portfolioItems.forEach((item, index) => {
        if (index >= portfolioItemsVisible) {
            item.style.display = 'none';
        }
    });
    
    // Hide load more button if all items are visible
    if (portfolioItems.length <= portfolioItemsVisible) {
        loadMoreBtn.style.display = 'none';
    }
}

loadMoreBtn.addEventListener('click', function() {
    const hiddenItems = Array.from(portfolioItems).slice(portfolioItemsVisible, portfolioItemsVisible + 6);
    
    hiddenItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.display = 'block';
            item.style.animation = 'fadeIn 0.5s ease-out';
        }, index * 100);
    });
    
    portfolioItemsVisible += 6;
    
    // Hide load more button if all items are visible
    if (portfolioItemsVisible >= portfolioItems.length) {
        this.style.display = 'none';
    }
});



// Smooth Scrolling for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Dot Navigation Functionality
function initializeDotNavigation() {
    const dots = document.querySelectorAll('.dot');
    const sections = document.querySelectorAll('section[id]');
    
    // Handle dot clicks
    dots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-section');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Update active dot on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === current) {
                dot.classList.add('active');
            }
        });
    });
}

// Scroll to Top on Logo Click
document.querySelector('.logo').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Header Background on Scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Initialize dark mode from localStorage - Default to dark mode
function initializeDarkMode() {
    const darkModePreference = localStorage.getItem('darkMode');
    
    // Default to dark mode if no preference is set, or if preference is enabled
    if (darkModePreference !== 'disabled') {
        isDarkMode = true;
        if (dadModeToggle) dadModeToggle.checked = true;
        if (mobileDadModeToggle) mobileDadModeToggle.checked = true;
        document.body.classList.add('dark-mode');
    } else {
        isDarkMode = false;
        if (dadModeToggle) dadModeToggle.checked = false;
        if (mobileDadModeToggle) mobileDadModeToggle.checked = false;
        document.body.classList.remove('dark-mode');
    }
}

// GSAP Animations
function initializeGSAPAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Page Load Animations - Hero Section
    const tl = gsap.timeline();
    
    // Hero greeting slides in first
    tl.to('.hero-greeting', {
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    })
    // Hero name slides in from left
    .to('.hero-name', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=0.4")
    // Hero title follows
    .to('.hero-title', {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.6")
    // Description fades up
    .to('.hero-description', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.4")
    // Social links fade up
    .to('.hero-social', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.2");
    
    // Scroll-triggered animations for About section
    gsap.to('.about .fade-up', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.about',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Portfolio section title
    gsap.to('.portfolio .section-title', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.portfolio',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Portfolio items stagger animation
    gsap.to('.portfolio-item', {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.portfolio-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Contact section animations
    gsap.to('.contact .fade-up', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Contact form and email slide in from sides
    gsap.to('.contact-form', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    gsap.to('.contact-email', {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: '.contact-content',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Portfolio card hover animations
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item, {
                scale: 1.05,
                y: -10,
                duration: 0.3,
                ease: "power2.out"
            });
        });
        
        item.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
    
    // Smooth scroll for dot navigation
    document.querySelectorAll('.dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = dot.getAttribute('data-section');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offsetY = targetElement.offsetTop - 80;
                gsap.to(window, {
                    duration: 1.5,
                    scrollTo: offsetY,
                    ease: "power3.inOut"
                });
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
    initializeDarkMode();
    initializeDotNavigation();
    initializeGSAPAnimations();
});

// Easter Egg: Konami Code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        activateEasterEgg();
        konamiCode = [];
    }
});

function activateEasterEgg() {
    // Create confetti effect
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }
    
    showNotification('🎉 You found the secret! Welcome to the dev club!', 'success');
}

function createConfetti() {
    const confetti = document.createElement('div');
    confetti.style.cssText = `
        position: fixed;
        width: 10px;
        height: 10px;
        background: ${['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'][Math.floor(Math.random() * 5)]};
        left: ${Math.random() * 100}%;
        top: -10px;
        z-index: 1003;
        border-radius: 50%;
        pointer-events: none;
        animation: confettiFall 3s linear forwards;
    `;
    
    document.body.appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 3000);
}

// Add confetti animation
style.textContent += `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;