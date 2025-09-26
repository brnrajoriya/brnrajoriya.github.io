// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    // Toggle mobile menu
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Toggle body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Sticky Navigation on Scroll
const navbar = document.querySelector('.navbar');
const heroSection = document.querySelector('.hero');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add/remove scrolled class to navbar
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
        return;
    }
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

function highlightNav() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= (sectionTop - 200)) {
            current = `#${section.getAttribute('id')}`;
        }
    });
    
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNav);
window.addEventListener('load', highlightNav);

// Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    const action = contactForm.getAttribute('action') || '';
    const useAjax = contactForm.getAttribute('data-ajax') === 'true';
    const postsToFormSubmit = action.includes('formsubmit.co');

    // AJAX path: post to FormSubmit's AJAX endpoint, show inline success/error, no redirect
    if (useAjax && postsToFormSubmit) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const successEl = document.getElementById('contact-success');
            const errorEl = document.getElementById('contact-error');
            if (successEl) successEl.style.display = 'none';
            if (errorEl) errorEl.style.display = 'none';

            try {
                const formData = new FormData(this);
                // Build AJAX endpoint
                const email = (new URL(action)).pathname.replace(/^\//, ''); // e.g. 'brn.rajoriya@gmail.com'
                const ajaxUrl = `https://formsubmit.co/ajax/${email}`;
                const response = await fetch(ajaxUrl, {
                    method: 'POST',
                    headers: { 'Accept': 'application/json' },
                    body: formData
                });

                if (response.ok) {
                    if (successEl) successEl.style.display = 'block';
                    this.reset();
                } else {
                    if (errorEl) errorEl.style.display = 'block';
                }
            } catch (err) {
                if (errorEl) errorEl.style.display = 'block';
                console.error('Contact form error:', err);
            }
        });
    }

    // Local demo fallback when not using FormSubmit
    if (!postsToFormSubmit && !useAjax) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            const formObject = {};
            formData.forEach((value, key) => { formObject[key] = value; });
            console.log('Form submitted (local handler):', formObject);
            const successEl = document.getElementById('contact-success');
            if (successEl) successEl.style.display = 'block';
            this.reset();
        });
    }
}

// Show contact success message if redirected back with hash
// If a redirect hash was used previously, still handle it gracefully
window.addEventListener('load', () => {
    if (window.location.hash === '#contact-success') {
        const successEl = document.getElementById('contact-success');
        if (successEl) successEl.style.display = 'block';
        if (history && history.replaceState) {
            history.replaceState(null, document.title, window.location.pathname + window.location.search);
        }
    }
});

// Animate elements on scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-level, .project-card, .about-content, .contact-content');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Add animation to skill bars on scroll
const skillBars = document.querySelectorAll('.skill-level');
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        // Cache target width once
        if (!bar.dataset.targetWidth) {
            bar.dataset.targetWidth = bar.style.width || '0%';
        }
        // If already animated, ensure it stays at target
        if (bar.dataset.animated === 'true') {
            bar.style.width = bar.dataset.targetWidth;
            return;
        }
        // Reset and animate to target
        bar.style.width = '0%';
        requestAnimationFrame(() => {
            setTimeout(() => {
                bar.style.width = bar.dataset.targetWidth;
                bar.dataset.animated = 'true';
            }, 100);
        });
    });
};

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skill-level')) {
                animateSkillBars();
                observer.unobserve(entry.target);
            } else {
                entry.target.classList.add('animate');
            }
        }
    });
}, observerOptions);

// Observe all elements that should be animated
const animateElements = document.querySelectorAll('.skill-level, .project-card, .about-content, .contact-content, .skills-container');
animateElements.forEach(el => observer.observe(el));

// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.transition = 'opacity 0.5s ease';
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Add preloader HTML if not present
if (!document.querySelector('.preloader')) {
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = `
        <div class="preloader-content">
            <div class="spinner"></div>
            <div class="loading-text">Loading...</div>
        </div>
    `;
    document.body.prepend(preloader);
}

// Add preloader styles
const preloaderStyles = document.createElement('style');
preloaderStyles.textContent = `
    .preloader {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    }
    
    .preloader-content {
        text-align: center;
    }
    
    .spinner {
        width: 50px;
        height: 50px;
        border: 5px solid #f3f3f3;
        border-top: 5px solid var(--primary-color);
        border-radius: 50%;
        animation: spin 1s linear infinite;
        margin: 0 auto 15px;
    }
    
    .loading-text {
        font-size: 1.2rem;
        color: var(--text-color);
        font-weight: 500;
    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;
document.head.appendChild(preloaderStyles);

// Add animation classes to elements
const addAnimationClasses = () => {
    const elements = document.querySelectorAll('.hero-content, .hero-image, .about-text, .skills-container, .projects-grid, .contact-info, .contact-form');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 200 * index);
    });
};

// Initialize animations when the page loads
window.addEventListener('load', () => {
    addAnimationClasses();
    
    // Add animation to skill bars after a short delay
    setTimeout(animateSkillBars, 1000);
});

// Handle page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Add fade-in effect to the body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in-out';
    
    // Trigger reflow
    void document.body.offsetHeight;
    
    // Fade in the body
    document.body.style.opacity = '1';
});

// Back to Top Button
const backToTopButton = document.createElement('button');
backToTopButton.className = 'back-to-top';
backToTopButton.innerHTML = '&uarr;';
backToTopButton.title = 'Back to Top';
document.body.appendChild(backToTopButton);

// Style the back to top button
const backToTopStyles = document.createElement('style');
backToTopStyles.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        z-index: 99;
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
    }
    
    .back-to-top:hover {
        background-color: var(--secondary-color);
        transform: translateY(-3px);
    }
`;
document.head.appendChild(backToTopStyles);

// Show/hide back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonials Carousel
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const track = carousel.querySelector('[data-carousel-track]');
    const slides = Array.from(track.children);
    const prevBtn = carousel.querySelector('[data-carousel-prev]');
    const nextBtn = carousel.querySelector('[data-carousel-next]');
    const dotsContainer = carousel.querySelector('[data-carousel-dots]');

    let currentIndex = 0;
    let autoPlayTimer = null;

    // Create dots
    slides.forEach((_, idx) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot' + (idx === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Go to slide ${idx + 1}`);
        dot.addEventListener('click', () => goToSlide(idx));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    const goToSlide = (index) => {
        currentIndex = (index + slides.length) % slides.length;
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;
        updateDots();
        restartAutoplay();
    };

    const updateDots = () => {
        dots.forEach((d, i) => {
            if (i === currentIndex) d.classList.add('active');
            else d.classList.remove('active');
        });
    };

    const next = () => goToSlide(currentIndex + 1);
    const prev = () => goToSlide(currentIndex - 1);

    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    // Swipe support (mobile)
    let startX = 0;
    let isDragging = false;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
        pauseAutoplay();
    });

    const endTouch = (e) => {
        if (!isDragging) return;
        const endX = (e.changedTouches && e.changedTouches[0].clientX) || startX;
        const diff = endX - startX;
        if (Math.abs(diff) > 50) {
            if (diff < 0) next();
            else prev();
        } else {
            restartAutoplay();
        }
        isDragging = false;
    };

    track.addEventListener('touchend', endTouch);
    track.addEventListener('touchcancel', endTouch);

    // Autoplay
    const startAutoplay = () => {
        if (autoPlayTimer) return;
        autoPlayTimer = setInterval(next, 5000);
    };

    const pauseAutoplay = () => {
        if (!autoPlayTimer) return;
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
    };

    const restartAutoplay = () => {
        pauseAutoplay();
        startAutoplay();
    };

    // Pause on hover (desktop)
    carousel.addEventListener('mouseenter', pauseAutoplay);
    carousel.addEventListener('mouseleave', startAutoplay);

    // Init
    goToSlide(0);
    startAutoplay();
});
