async function loadDiscoverCards() {
    const res = await fetch('data/discover.json');
    const items = await res.json();
    const gallery = document.getElementById('discover-gallery');
    gallery.innerHTML = '';
    items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'discover-card';
        card.innerHTML = `
            <h2>${item.title}</h2>
            <figure>
                <img 
                    data-src="images/${item.image}" 
                    src="images/placeholder.png" 
                    alt="${item.title}" 
                    loading="lazy"
                    class="discover-img"
                    width="320" height="200"
                    style="background:#eee;min-height:120px;"
                >
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn" data-idx="${idx}">Learn More</button>
        `;
        gallery.appendChild(card);
    });

    // Lazy-load images using Intersection Observer
    if ('IntersectionObserver' in window) {
        const imgs = document.querySelectorAll('.discover-img');
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    obs.unobserve(img);
                }
            });
        }, { rootMargin: '100px' });
        imgs.forEach(img => observer.observe(img));
    } else {
        // Fallback: load all images
        document.querySelectorAll('.discover-img').forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    }

    // Modal logic
    let modal = document.getElementById('discover-modal');
    if (!modal) {
        modal = document.createElement('dialog');
        modal.id = 'discover-modal';
        modal.innerHTML = `
            <button class="close-modal" aria-label="Close">&times;</button>
            <div id="modal-content"></div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('.close-modal').onclick = () => modal.close();
        modal.addEventListener('click', function handler(event) {
            if (event.target === modal) modal.close();
        });
    }

    document.querySelectorAll('.learn-more-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const idx = this.dataset.idx;
            const item = items[idx];
            const content = `
                <h2>${item.title}</h2>
                <figure>
                    <img src="images/${item.image}" alt="${item.title}" style="width:100%;max-width:350px;border-radius:8px;" loading="lazy">
                </figure>
                <address>${item.address}</address>
                <p>${item.description}</p>
            `;
            document.getElementById('modal-content').innerHTML = content;
            modal.showModal();
        });
    });
}

// Last visit message logic
function showVisitMessage() {
    const msgBox = document.getElementById('visit-message');
    const lastVisit = localStorage.getItem('discoverLastVisit');
    const now = Date.now();
    let message = '';
    if (!lastVisit) {
        message = "Welcome! Let us know if you have any questions.";
    } else {
        const diffMs = now - Number(lastVisit);
        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        if (diffDays < 1) {
            message = "Back so soon! Awesome!";
        } else if (diffDays === 1) {
            message = "You last visited 1 day ago.";
        } else {
            message = `You last visited ${diffDays} days ago.`;
        }
    }
    msgBox.textContent = message;
    localStorage.setItem('discoverLastVisit', now);
}

document.addEventListener('DOMContentLoaded', () => {
    loadDiscoverCards();
    showVisitMessage();
});
