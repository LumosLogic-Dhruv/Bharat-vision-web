// Scroll Animation Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Add special class for vision solution items
            if (entry.target.classList.contains('vision-solution-item')) {
                entry.target.classList.add('animate');
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.addEventListener('DOMContentLoaded', function() {
    // Animate cards with stagger effect
    const cards = document.querySelectorAll('.card, .product-card, .industry-card, .feature-card, .stat-card, .vm-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Animate sections
    const sections = document.querySelectorAll('.about-text, .about-image, .inspect-item, .product-full, .timeline-item, .vision-solution-item');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(section);
    });

    // Add hover effects to product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // CTA Section Animation
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        observer.observe(ctaSection);
    }
});

// Counter Animation
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '+';
        }
    }, 16);
}

// Observe stat numbers
const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statObserver.unobserve(statNumber);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-num');
    statNumbers.forEach(stat => {
        statObserver.observe(stat);
    });
});

// Image Hover Zoom
document.addEventListener('DOMContentLoaded', function() {
    const productImages = document.querySelectorAll('.product-img, .product-full-img');

    productImages.forEach(image => {
        image.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.5s ease';
            const img = this.querySelector('i');
            if (img) {
                img.style.transform = 'scale(1.1)';
                img.style.transition = 'transform 0.5s ease';
            }
        });

        image.addEventListener('mouseleave', function() {
            const img = this.querySelector('i');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
});

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = hero.querySelector('.hero-content');
        if (parallax) {
            parallax.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    }

    // Parallax for vision solution images
    const visionImages = document.querySelectorAll('.vision-solution-image');
    visionImages.forEach(img => {
        const rect = img.getBoundingClientRect();
        const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
        if (scrollPercent > 0 && scrollPercent < 1) {
            const imgElement = img.querySelector('img');
            if (imgElement) {
                imgElement.style.transform = `translateY(${scrollPercent * 20}px)`;
            }
        }
    });
});

// Page Load Animation
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Stagger Animation for Grids
document.addEventListener('DOMContentLoaded', function() {
    const grids = document.querySelectorAll('.solutions-grid, .products-grid, .industries-grid, .features-grid');

    grids.forEach(grid => {
        const items = grid.children;
        Array.from(items).forEach((item, index) => {
            item.style.transitionDelay = `${index * 0.1}s`;
        });
    });
});

// Scroll Progress Bar
const progressBar = document.createElement('div');
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    z-index: 9999;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', function() {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

// Card Hover Effects
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card, .product-card, .industry-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});
