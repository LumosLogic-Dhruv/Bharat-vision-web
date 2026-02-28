// Cosmetics Products Dynamic Loader
document.addEventListener('DOMContentLoaded', () => {
    const cosmeticsProducts = [
        'Conical Caps.png',
        'Flip-Top Screw Cap.png',
        'plastic Cap.png',
        'Plastic Shoulder.png',
        'Plastic White Bottle Caps.png',
        'Seal Cap.png'
    ];

    const grid = document.getElementById('cosmeticsProductsGrid');
    
    cosmeticsProducts.forEach((product, index) => {
        const productName = product.replace(/\.(png|jpg|jpeg)$/i, '').trim();
        
        const card = document.createElement('div');
        card.className = 'product-card-new';
        card.style.animationDelay = `${index * 0.1}s`;
        
        card.innerHTML = `
            <div class="scrolling-text">${productName}</div>
            <div class="product-card-image">
                <img src="images/products/Cosmetics/${product}" alt="${productName}" loading="lazy">
            </div>
            <div class="product-card-content">
                <h3>${productName}</h3>
            </div>
        `;
        
        grid.appendChild(card);
    });

    // Scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.product-card-new').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        observer.observe(card);
    });
});
