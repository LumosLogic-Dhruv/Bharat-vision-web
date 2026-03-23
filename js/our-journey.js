/* ═══════════════════════════════════════════════
   Our Journey — Scroll Animations
   Bharat Vision Automation
═══════════════════════════════════════════════ */

(function () {
    'use strict';

    /* Fallback: no IntersectionObserver support */
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.journey-item').forEach(function (el) {
            el.classList.add('ji-visible');
        });
        var statsEl = document.querySelector('.journey-stats');
        if (statsEl) statsEl.classList.add('js-visible');
        var tl = document.getElementById('journeyTimeline');
        if (tl) tl.classList.add('jt-animated');
        return;
    }

    /* ── Journey items: slide-in on scroll ── */
    var items = document.querySelectorAll('.journey-item');
    if (items.length) {
        var itemObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('ji-visible');
                    itemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        items.forEach(function (item) { itemObserver.observe(item); });
    }

    /* ── Timeline fill line ── */
    var timeline = document.getElementById('journeyTimeline');
    if (timeline) {
        var lineObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                timeline.classList.add('jt-animated');
                lineObserver.disconnect();
            }
        }, { threshold: 0.04 });
        lineObserver.observe(timeline);
    }

    /* ── Stats row fade-in ── */
    var statsRow = document.querySelector('.journey-stats');
    if (statsRow) {
        var statsRowObserver = new IntersectionObserver(function (entries) {
            if (entries[0].isIntersecting) {
                statsRow.classList.add('js-visible');
                statsRowObserver.disconnect();
            }
        }, { threshold: 0.2 });
        statsRowObserver.observe(statsRow);
    }

    /* ── Counter animation ── */
    function animateCounter(el) {
        var target = parseInt(el.getAttribute('data-target'), 10);
        if (isNaN(target)) return;
        var duration = 1800;
        var startTime = null;

        function step(ts) {
            if (!startTime) startTime = ts;
            var progress = Math.min((ts - startTime) / duration, 1);
            var ease = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(ease * target) + '+';
            if (progress < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    var counters = document.querySelectorAll('.js-num[data-target]');
    if (counters.length) {
        var counterObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    counterObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.6 });

        counters.forEach(function (el) { counterObserver.observe(el); });
    }

})();
