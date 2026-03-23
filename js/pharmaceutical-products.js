// Pharmaceutical Products Dynamic Loader
document.addEventListener('DOMContentLoaded', () => {
    const pharmaProducts = [
        { name: 'Rubber Disc', image: 'images/products/Pharmaceutical/Rubber Disc.png' },
        { name: 'Rubber Stopper', image: 'images/products/Pharmaceutical/Rubber Stopper.png' },
        { name: 'Rubber Stopper Blood Collection', image: 'images/products/Pharmaceutical/Rubber Stopper Blood Collection.png' },
        { name: 'Slotted Rubber Stopper', image: 'images/products/Pharmaceutical/Slotted Rubber stopper.png' },
        { name: 'Capsules Aluminium', image: 'images/products/Pharmaceutical/Capsules-Aluminium.png' },
        { name: 'Aluminium Cap', image: 'images/products/Pharmaceutical/Aluminium Cap.png' },
        { name: 'Closure Rubber', image: 'images/products/Pharmaceutical/Closure Rubber.png' },
        { name: 'Flip off Seal', image: 'images/products/Pharmaceutical/Flip off Seal.png' },
        { name: 'Glass Vials', image: 'images/products/Pharmaceutical/Glass Vials.png' }
    ];

    const grid = document.getElementById('pharmaProductsGrid');

    pharmaProducts.forEach((product, index) => {
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
