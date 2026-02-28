// Global Navigation Handler
(function() {
  'use strict';
  
  // Force scroll to top immediately
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);
  
  // Redirect to home on refresh (except for index.html)
  if (performance.navigation.type === 1) {
    const currentPage = window.location.pathname.split('/').pop();
    if (currentPage && currentPage !== 'index.html' && currentPage !== '') {
      sessionStorage.setItem('redirectToHome', 'true');
      window.location.replace('index.html');
    }
  }
  
  // Check if redirected from refresh
  if (sessionStorage.getItem('redirectToHome') === 'true') {
    sessionStorage.removeItem('redirectToHome');
    window.scrollTo(0, 0);
  }
  
  // Logo and brand click navigation
  document.addEventListener('DOMContentLoaded', function() {
    window.scrollTo(0, 0);
    
    const logo = document.querySelector('.logo');
    const navBrand = document.querySelector('.nav-brand');
    const footerLogo = document.querySelector('.footer-logo');
    
    function navigateHome(e) {
      e.preventDefault();
      e.stopPropagation();
      sessionStorage.setItem('scrollToTop', 'true');
      window.location.href = 'index.html';
    }
    
    if (logo) {
      logo.style.cursor = 'pointer';
      logo.addEventListener('click', navigateHome);
    }
    
    if (navBrand) {
      navBrand.style.cursor = 'pointer';
      navBrand.addEventListener('click', navigateHome);
    }
    
    if (footerLogo) {
      footerLogo.style.cursor = 'pointer';
      footerLogo.addEventListener('click', navigateHome);
    }
    
    // Scroll to top if flag is set
    if (sessionStorage.getItem('scrollToTop') === 'true') {
      sessionStorage.removeItem('scrollToTop');
      window.scrollTo(0, 0);
    }
  });
})();
