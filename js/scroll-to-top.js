// Scroll to top on page load/refresh
window.addEventListener('load', function() {
    window.scrollTo(0, 0);
});

// Also handle page show event (for back/forward navigation)
window.addEventListener('pageshow', function() {
    window.scrollTo(0, 0);
});

// Immediate scroll on script load
if (document.readyState === 'loading') {
    window.scrollTo(0, 0);
} else {
    window.scrollTo(0, 0);
}
