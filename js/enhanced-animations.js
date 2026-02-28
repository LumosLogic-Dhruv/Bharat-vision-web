// Enhanced Animations for Bharat Vision Automation Website

// Magnetic Button Effect
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('.btn, .discover-btn, .banner-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            this.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0) scale(1)';
        });
    });
});

// Smooth Reveal Animation for CTA Section
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cta = entry.target;
            const h2 = cta.querySelector('h2');
            const p = cta.querySelector('p');
            const btn = cta.querySelector('.btn');
            
            if (h2) h2.style.animation = 'fadeInUp 0.8s ease-out forwards';
            if (p) p.style.animation = 'fadeInUp 1s ease-out 0.2s forwards';
            if (btn) btn.style.animation = 'fadeInUp 1.2s ease-out 0.4s forwards';
            
            ctaObserver.unobserve(cta);
        }
    });
}, { threshold: 0.3 });

document.addEventListener('DOMContentLoaded', function() {
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        ctaObserver.observe(ctaSection);
    }
});

// Product Card 3D Tilt Effect
document.addEventListener('DOMContentLoaded', function() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
        });
    });
});

// Text Reveal Animation
function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.style.opacity = '0';
        span.style.animation = `fadeIn 0.05s ease-out ${index * 0.03}s forwards`;
        element.appendChild(span);
    });
}

// Floating Animation for Images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.welcome-image, .about-image img');
    
    images.forEach((img, index) => {
        img.style.animation = `float 3s ease-in-out ${index * 0.5}s infinite`;
    });
});

// Scroll-triggered Counter Animation
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = end;
        }
    };
    window.requestAnimationFrame(step);
}

// Enhanced Hover Effect for Feature Cards
document.addEventListener('DOMContentLoaded', function() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    // Scroll reveal animation
    const featureObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    featureCards.forEach(card => {
        featureObserver.observe(card);
        
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            const color = getComputedStyle(this).color;
            
            // Animate the number
            const num = this.querySelector('.feature-num');
            if (num) {
                num.style.transform = 'scale(1.2) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const num = this.querySelector('.feature-num');
            if (num) {
                num.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
});

// Smooth Page Transitions
document.addEventListener('DOMContentLoaded', function() {
    // Fade in page on load
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
    
    // Add transition to internal links
    const internalLinks = document.querySelectorAll('a[href^="/"]:not([href^="//"]), a[href^="."]:not([target="_blank"])');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && !href.startsWith('#')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            }
        });
    });
});

// Parallax Scroll Effect for Sections
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Parallax for section backgrounds
    const sections = document.querySelectorAll('.machine-vision-section, .features, .products');
    sections.forEach(section => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        section.style.backgroundPosition = `center ${yPos}px`;
    });
});

// Image Lazy Load with Fade In
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Cursor Trail Effect (Optional - can be enabled)
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) { // Only on desktop
        cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
        
        if (cursorTrail.length > maxTrailLength) {
            cursorTrail.shift();
        }
    }
});

// Intersection Observer for Vision Solution Items
const visionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('animate');
            }, index * 200);
            visionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.addEventListener('DOMContentLoaded', function() {
    const visionItems = document.querySelectorAll('.vision-solution-item');
    visionItems.forEach(item => visionObserver.observe(item));
});

// Add shimmer effect to buttons on hover
document.addEventListener('DOMContentLoaded', function() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shimmer {
            0% { background-position: -1000px 0; }
            100% { background-position: 1000px 0; }
        }
        
        .btn-shimmer {
            background: linear-gradient(90deg, 
                var(--primary) 0%, 
                var(--accent) 50%, 
                var(--primary) 100%);
            background-size: 200% 100%;
            animation: shimmer 3s infinite;
        }
    `;
    document.head.appendChild(style);
});

// Enhanced scroll reveal with different directions
const scrollRevealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const scrollReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            scrollReveal.unobserve(entry.target);
        }
    });
}, scrollRevealOptions);

document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .reveal-up');
    revealElements.forEach(el => scrollReveal.observe(el));
});
