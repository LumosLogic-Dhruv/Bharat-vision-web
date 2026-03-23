// Cosmetics Products Dynamic Loader
document.addEventListener('DOMContentLoaded', () => {
    const cosmeticsProducts = [
        { name: 'Conical Caps', image: 'images/products/Cosmetics/Conical Caps.png' },
        { name: 'Flip-Top Screw Cap', image: 'images/products/Cosmetics/Flip-Top Screw Cap.png' },
        { name: 'Plastic Cap', image: 'images/products/Cosmetics/plastic Cap.png' },
        { name: 'Plastic Shoulder', image: 'images/products/Cosmetics/Plastic Shoulder.png' },
        { name: 'Plastic White Bottle Caps', image: 'images/products/Cosmetics/Plastic White Bottle Caps.png' },
        { name: 'Seal Cap', image: 'images/products/Cosmetics/Seal Cap.png' },
        { name: 'Pilfer Proof Caps', image: 'images/products/Cosmetics/pilfer-proof-caps.webp' },
        { name: 'Screw Child Caps', image: 'images/products/Cosmetics/screw-child-caps.webp' }
    ];

    const grid = document.getElementById('cosmeticsProductsGrid');

    cosmeticsProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card-new';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="scrolling-text">${product.name}</div>
            <div class="product-card-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
            </div>
            <div class="product-card-content">
                <h3>${product.name}</h3>
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
