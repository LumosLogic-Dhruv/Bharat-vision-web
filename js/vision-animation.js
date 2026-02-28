// VISION Text Animation
(function() {
    'use strict';
    
    document.addEventListener('DOMContentLoaded', function() {
        const visionText = document.querySelector('.vision-text');
        if (!visionText) return;
        
        // 3D Parallax
        let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0;
        
        document.addEventListener('mousemove', (e) => {
            const rect = visionText.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            mouseX = (e.clientX - centerX) / 50;
            mouseY = (e.clientY - centerY) / 50;
        });
        
        function updateParallax() {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            visionText.style.transform = `perspective(1000px) rotateY(${currentX}deg) rotateX(${-currentY}deg) translateZ(0)`;
            requestAnimationFrame(updateParallax);
        }
        
        updateParallax();
    });
})();
