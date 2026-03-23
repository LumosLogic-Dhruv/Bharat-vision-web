/**
 * Product Page Animations — clean scroll-reveal
 * Uses force-reflow (void el.offsetWidth) to ensure animations start reliably.
 * Does NOT touch spec-cards or tech-specs-section (they have their own inline animations).
 */
(function () {
    'use strict';

    /* ── Inject keyframes + classes ─────────────────────────────── */
    var style = document.createElement('style');
    style.textContent = [
        '@keyframes pp-fadeUp    { from{opacity:0;transform:translateY(35px)} to{opacity:1;transform:translateY(0)} }',
        '@keyframes pp-fadeLeft  { from{opacity:0;transform:translateX(-35px)} to{opacity:1;transform:translateX(0)} }',
        '@keyframes pp-fadeRight { from{opacity:0;transform:translateX(35px)} to{opacity:1;transform:translateX(0)} }',
        '@keyframes pp-zoomIn    { from{opacity:0;transform:scale(0.88)} to{opacity:1;transform:scale(1)} }',
        '@keyframes pp-flipUp    { from{opacity:0;transform:translateY(28px) rotateX(12deg)} to{opacity:1;transform:translateY(0) rotateX(0)} }',
        '@keyframes slideInRight { from{opacity:0;transform:translateX(40px)} to{opacity:1;transform:translateX(0)} }',
        '@keyframes pp-pulse     { 0%,100%{box-shadow:0 6px 20px rgba(2,105,207,.4)} 50%{box-shadow:0 10px 32px rgba(2,105,207,.7)} }',

        '.pp-ready { opacity: 0; }',
        '.pp-anim-fadeUp    { animation: pp-fadeUp    0.7s cubic-bezier(.25,.46,.45,.94) both; }',
        '.pp-anim-fadeLeft  { animation: pp-fadeLeft  0.7s cubic-bezier(.25,.46,.45,.94) both; }',
        '.pp-anim-fadeRight { animation: pp-fadeRight 0.7s cubic-bezier(.25,.46,.45,.94) both; }',
        '.pp-anim-zoomIn    { animation: pp-zoomIn    0.7s cubic-bezier(.34,1.56,.64,1)  both; }',
        '.pp-anim-flipUp    { animation: pp-flipUp    0.7s cubic-bezier(.25,.46,.45,.94) both; }',
        '.download-btn      { animation: pp-pulse 3s ease-in-out 1.2s infinite; }',
        '.download-btn:hover{ animation: none; }',
    ].join('\n');
    document.head.appendChild(style);

    /* ── Helper: hide → wait → reflow → animate ─────────────────── */
    function play(el, type, delay) {
        el.classList.add('pp-ready');
        setTimeout(function () {
            el.classList.remove('pp-ready');
            void el.offsetWidth;          // force reflow — ensures animation restarts
            el.classList.add('pp-anim-' + type);
        }, delay * 1000);
    }

    /* ── Above-fold elements — animate on page load ──────────────── */
    var IMMEDIATE = [
        { sel: '.product-image-wrapper', type: 'zoomIn',    delay: 0.05 },
        { sel: '.product-title',         type: 'fadeLeft',  delay: 0.15 },
        { sel: '.product-description',   type: 'fadeUp',    delay: 0.25 },
        { sel: '.download-section',      type: 'fadeRight', delay: 0.35 },
    ];

    /* ── Below-fold elements — animate when scrolled into view ───── */
    var ON_SCROLL = [
        { sel: '.related-products h2', type: 'fadeUp',  stagger: 0,    delay: 0    },
        { sel: '.related-card',        type: 'flipUp',  stagger: 0.12, delay: 0.05 },
    ];

    function init() {
        /* Immediate (above fold) */
        IMMEDIATE.forEach(function (item) {
            document.querySelectorAll(item.sel).forEach(function (el) {
                play(el, item.type, item.delay);
            });
        });

        /* Scroll-triggered */
        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                var el    = entry.target;
                var type  = el.dataset.ppType  || 'fadeUp';
                var delay = parseFloat(el.dataset.ppDelay || 0);
                play(el, type, delay);
                obs.unobserve(el);
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

        ON_SCROLL.forEach(function (item) {
            var stagger = item.stagger || 0;
            document.querySelectorAll(item.sel).forEach(function (el, i) {
                el.dataset.ppType  = item.type;
                el.dataset.ppDelay = (item.delay + i * stagger).toFixed(3);
                el.classList.add('pp-ready');
                obs.observe(el);
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
}());
