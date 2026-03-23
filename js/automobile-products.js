// Automobile Products Dynamic Loader
document.addEventListener('DOMContentLoaded', () => {
    const automobileProducts = [
        { name: 'Bearings', image: 'images/products/Automobile/Bearings.png' },
        { name: 'Fasteners', image: 'images/products/Automobile/Fasteners.png' },
        { name: 'Nuts', image: 'images/products/Automobile/Nuts.png' },
        { name: 'O Rings', image: 'images/products/Automobile/O Rings.png' },
        { name: 'Washers', image: 'images/products/Automobile/Washers.png' }
    ];

    const grid = document.getElementById('automobileProductsGrid');

    automobileProducts.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card-new';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
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
