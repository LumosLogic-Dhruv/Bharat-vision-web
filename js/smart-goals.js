// SMART Goals Animation Observer
document.addEventListener('DOMContentLoaded', function() {
    const smartCards = document.querySelectorAll('.smart-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.animation = 'cardSlideUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
                    entry.target.classList.add('animate');
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    smartCards.forEach(card => {
        observer.observe(card);
    });
});
