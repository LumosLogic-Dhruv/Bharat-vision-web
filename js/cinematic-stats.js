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
        this.container = document.getElementById('inspectionGrid');
        this.prevBtn = document.getElementById('inspectPrev');
        this.nextBtn = document.getElementById('inspectNext');
        this.scrollAmount = 320;
        this.init();
    }

    init() {
        if (!this.container || !this.prevBtn || !this.nextBtn) return;

        this.prevBtn.addEventListener('click', () => this.scroll('left'));
        this.nextBtn.addEventListener('click', () => this.scroll('right'));

        // Touch swipe support
        let startX = 0;
        this.container.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        this.container.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                this.scroll(diff > 0 ? 'right' : 'left');
            }
        });

        this.updateButtons();
        this.container.addEventListener('scroll', () => this.updateButtons());
    }

    scroll(direction) {
        const scrollLeft = this.container.scrollLeft;
        const targetScroll = direction === 'left'
            ? scrollLeft - this.scrollAmount
            : scrollLeft + this.scrollAmount;

        this.container.scrollTo({
            left: targetScroll,
            behavior: 'smooth'
        });
    }

    updateButtons() {
        const maxScroll = this.container.scrollWidth - this.container.clientWidth;
        this.prevBtn.classList.toggle('disabled', this.container.scrollLeft <= 0);
        this.nextBtn.classList.toggle('disabled', this.container.scrollLeft >= maxScroll - 10);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new CinematicStats();
    new InspectionSlider();
});
