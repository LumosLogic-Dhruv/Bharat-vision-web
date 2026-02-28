const inspectionProducts = [
    '1.Rubber Disc.png',
    '2.Rubber stopper .png',
    '3.Rubber stopper Blood Collection.png',
    '4.Slotted rubber stopper.png',
    '5.Flip off Seal.png',
    '6.Glass Vials.png',
    '7.plastic Cap.png',
    '8.Plastic Shoulder.png',
    '9.Flip-Top Screw Cap.png',
    '10.Conical Caps.png',
    '11.Plastic White Bottle Caps.png',
    '12.Seal Cap.png',
    'Aluminium Caps Without Septa.png',
    'Aluminium_cap.png'
];

function loadInspectionProducts() {
    const grid = document.getElementById('inspectionGrid');
    if (!grid) return;

    const tripleProducts = [...inspectionProducts, ...inspectionProducts, ...inspectionProducts];
    
    tripleProducts.forEach((filename, index) => {
        const productName = filename
            .replace(/^\d+\./, '')
            .replace(/\.(jpg|jpeg|png|webp)$/i, '')
            .replace(/[_-]/g, ' ')
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
        
        const card = document.createElement('div');
        card.className = 'inspect-card';
        card.style.animationDelay = `${(index % inspectionProducts.length) * 0.1}s`;
        
        card.innerHTML = `
            <div class="inspect-card-img">
                <img src="images/inspection/${filename}" alt="${productName}" loading="lazy">
                <div class="inspect-card-overlay"></div>
            </div>
            <div class="inspect-card-name">${productName}</div>
        `;
        
        card.addEventListener('mouseenter', () => {
            grid.classList.add('paused');
        });
        
        card.addEventListener('mouseleave', () => {
            grid.classList.remove('paused');
        });
        
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', loadInspectionProducts);
