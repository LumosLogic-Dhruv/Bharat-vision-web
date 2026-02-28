// ── Navigation ────────────────────────────────────────────
const hamburger = document.querySelector('.hamburger');
const navMenu   = document.querySelector('.nav-menu');
const dropdowns = document.querySelectorAll('.dropdown');

// Hamburger toggle (mobile)
if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        // Prevent body scroll while menu is open
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });
}

// Dropdown toggle – mobile: tap to open/close | desktop: hover (CSS) + click navigates
dropdowns.forEach(dropdown => {
    const trigger = dropdown.querySelector('a');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
        const isMobile = window.innerWidth <= 768;

        if (isMobile) {
            // Mobile: first tap opens dropdown (prevent navigation),
            // second tap on an already-open menu allows navigation
            const isCurrentlyOpen = dropdown.classList.contains('active');

            if (!isCurrentlyOpen) {
                // First tap — show dropdown, do NOT navigate
                e.preventDefault();
                e.stopPropagation();

                // Close all other dropdowns
                dropdowns.forEach(d => d.classList.remove('active', 'open'));
                dropdown.classList.add('active');
            }
            // If already open, do nothing special — let the click navigate normally
        }
        // Desktop: do NOT call preventDefault → link navigates to href
        // CSS :hover already handles showing/hiding the dropdown on desktop
    });
});

// Close dropdowns when clicking a dropdown item (non-toggle link)
document.querySelectorAll('.dropdown-menu a').forEach(link => {
    link.addEventListener('click', () => {
        dropdowns.forEach(d => d.classList.remove('active', 'open'));
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu)   navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Close nav + dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        dropdowns.forEach(d => d.classList.remove('active', 'open'));
    }
    if (!e.target.closest('.navbar') && !e.target.closest('.hamburger')) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu)   navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// On resize: clean up classes
window.addEventListener('resize', () => {
    dropdowns.forEach(d => d.classList.remove('active', 'open'));
    if (window.innerWidth > 768) {
        if (hamburger) hamburger.classList.remove('active');
        if (navMenu)   navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// ── End Navigation ────────────────────────────────────────

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const message = document.getElementById('message');
        
        let isValid = true;

        // Clear errors
        document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

        // Validate Name
        if (name.value.trim() === '' || name.value.trim().length < 3) {
            showError('nameError', 'Name must be at least 3 characters');
            isValid = false;
        }

        // Validate Email
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value)) {
            showError('emailError', 'Please enter a valid email');
            isValid = false;
        }

        // Validate Phone
        const phonePattern = /^[0-9]{10}$/;
        const cleanPhone = phone.value.replace(/\D/g, '');
        if (!phonePattern.test(cleanPhone)) {
            showError('phoneError', 'Please enter a valid 10-digit phone number');
            isValid = false;
        }

        // Validate Message
        if (message.value.trim() === '' || message.value.trim().length < 10) {
            showError('messageError', 'Message must be at least 10 characters');
            isValid = false;
        }

        if (isValid) {
            const successMsg = document.getElementById('formSuccess');
            successMsg.textContent = 'Thank you! Your message has been sent successfully.';
            successMsg.style.display = 'block';
            contactForm.reset();
            setTimeout(() => successMsg.style.display = 'none', 5000);
        }
    });
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Button Ripple Effect
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
        const button = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    }
});

// Ripple Animation CSS
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    @keyframes ripple-animation {
        to { transform: scale(4); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Scroll to Top Button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    z-index: 999;
    transition: 0.3s;
    box-shadow: 0 4px 15px rgba(0,0,0,0.4);
`;
document.body.appendChild(scrollTopBtn);

window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 300 ? 'flex' : 'none';
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
});

// Footer Logo Animation and Navigation
const footerLogo = document.querySelector('.footer-logo');
if (footerLogo) {
    footerLogo.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Add animation class
        this.classList.add('animate-click');
        
        // Navigate to home page after animation
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 600);
    });
    
    // Remove animation class after it completes
    footerLogo.addEventListener('animationend', function() {
        this.classList.remove('animate-click');
    });
}
