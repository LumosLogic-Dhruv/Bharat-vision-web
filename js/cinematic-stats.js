// Professional Statistics Counter Animation
class CinematicStats {
    constructor() {
        this.section = document.querySelector('.cinematic-stats-section');
        this.cards = document.querySelectorAll('.stat-card');
        this.animated = false;
        this.init();
    }

    init() {
        if (!this.section) return;
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animated = true;
                    this.startAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        observer.observe(this.section);
    }

    startAnimation() {
        this.cards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('show');
                this.animateCounter(card);
            }, index * 200);
        });
    }

    animateCounter(card) {
        const counter = card.querySelector('.stat-counter');
        const target = parseInt(card.getAttribute('data-stat'));
        const duration = 2500;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target;
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 16);
    }
}

// Inspection Products Slider
class InspectionSlider {
    constructor() {
        this.wrapper = document.querySelector('.inspect-carousel-wrapper');
        this.container = document.getElementById('inspectionGrid');
        this.prevBtn = document.getElementById('inspectPrev');
        this.nextBtn = document.getElementById('inspectNext');
        this.autoSpeed = 0.8;       // px per frame for auto-scroll
        this.cardWidth = 310;       // card width + gap for arrow jumps
        this.isAnimating = false;   // true only during arrow click animation
        this.isHovered = false;     // true when mouse is over slider
        this.resumeTimer = null;
        this.init();
    }

    init() {
        if (!this.wrapper || !this.container || !this.prevBtn || !this.nextBtn) return;

        // Wait for cards to render so scrollWidth is accurate
        setTimeout(() => {
            this.wrapper.scrollLeft = this.container.scrollWidth / 3;
            this.loop();
        }, 150);

        // Arrow buttons — left goes left, right goes right
        this.prevBtn.addEventListener('click', () => this.arrowScroll('left'));
        this.nextBtn.addEventListener('click', () => this.arrowScroll('right'));

        // Pause auto-scroll on hover
        this.wrapper.addEventListener('mouseenter', () => { this.isHovered = true; });
        this.wrapper.addEventListener('mouseleave', () => { this.isHovered = false; });

        // Touch swipe
        let touchStartX = 0;
        this.wrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.isHovered = true;
        }, { passive: true });
        this.wrapper.addEventListener('touchend', (e) => {
            const diff = touchStartX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 50) this.arrowScroll(diff > 0 ? 'right' : 'left');
            setTimeout(() => { this.isHovered = false; }, 1200);
        });
    }

    // Single unified RAF loop — only auto-scrolls when not animating and not hovered
    loop() {
        if (!this.isHovered && !this.isAnimating) {
            this.wrapper.scrollLeft += this.autoSpeed;
            this.infiniteClamp();
        }
        requestAnimationFrame(() => this.loop());
    }

    // Silently jump back/forward to keep infinite illusion
    infiniteClamp() {
        const third = this.container.scrollWidth / 3;
        if (this.wrapper.scrollLeft >= third * 2) {
            this.wrapper.scrollLeft -= third;
        } else if (this.wrapper.scrollLeft <= 0) {
            this.wrapper.scrollLeft += third;
        }
    }

    // Smooth arrow scroll — blocks auto-scroll during animation
    arrowScroll(direction) {
        if (this.isAnimating) return;
        this.isAnimating = true;
        this.isHovered = true;

        const startPos = this.wrapper.scrollLeft;
        const delta = direction === 'left' ? -this.cardWidth : this.cardWidth;
        const endPos = startPos + delta;
        const duration = 480;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease-in-out cubic
            const ease = progress < 0.5
                ? 4 * progress * progress * progress
                : 1 - Math.pow(-2 * progress + 2, 3) / 2;

            this.wrapper.scrollLeft = startPos + delta * ease;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                this.wrapper.scrollLeft = endPos;
                this.infiniteClamp();
                this.isAnimating = false;
                // Resume auto-scroll after a short pause
                clearTimeout(this.resumeTimer);
                this.resumeTimer = setTimeout(() => { this.isHovered = false; }, 900);
            }
        };
        requestAnimationFrame(step);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CinematicStats();
    new InspectionSlider();
});
