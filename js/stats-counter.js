// Animated Statistics Counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function initStatsCounter() {
    const statsSection = document.querySelector('.stats-counter-section');
    if (!statsSection) return;
    
    const statItems = document.querySelectorAll('.stat-item');
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                statItems.forEach(item => item.classList.add('animate'));
                
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    animateCounter(counter, target, 2500);
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', initStatsCounter);

// Cursor Following Particle Effect for Stats Section
function initCursorParticles() {
    const statsSection = document.querySelector('.stats-counter-section');
    if (!statsSection) return;

    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;

    statsSection.addEventListener('mousemove', (e) => {
        const rect = statsSection.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        mouseY = ((e.clientY - rect.top) / rect.height) * 100;
    });

    function animate() {
        currentX += (mouseX - currentX) * 0.1;
        currentY += (mouseY - currentY) * 0.1;
        
        const beforeElement = statsSection.querySelector('::before') || statsSection;
        statsSection.style.setProperty('--mouse-x', `${currentX}%`);
        statsSection.style.setProperty('--mouse-y', `${currentY}%`);
        
        requestAnimationFrame(animate);
    }

    animate();
}

document.addEventListener('DOMContentLoaded', initCursorParticles);
