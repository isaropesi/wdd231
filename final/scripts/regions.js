import { setupNav } from './nav.js';

setupNav();

document.getElementById('year').textContent = new Date().getFullYear();

const regionsList = document.getElementById('regions-list');
const modal = document.getElementById('region-modal');

async function loadRegions() {
    try {
        const res = await fetch('data/regions.json');
        const regions = await res.json();
        displayRegions(regions);
    } catch (e) {
        regionsList.textContent = 'Unable to load regions.';
    }
}

function displayRegions(regions) {
    regionsList.innerHTML = '';
    regions.forEach(region => {
        const card = document.createElement('div');
        card.className = 'region-card';
        card.tabIndex = 0;
        card.innerHTML = `
      <img src="${region.imageUrl}" alt="${region.name} region" loading="lazy">
      <h3>${region.name}</h3>
      <p>${region.description}</p>
      <button class="cta-btn" data-region="${region.name}">Details</button>
    `;
        card.querySelector('.cta-btn').addEventListener('click', () => showRegionModal(region));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') showRegionModal(region);
        });
        regionsList.appendChild(card);
    });
}

function showRegionModal(region) {
    modal.innerHTML = `
    <button class="close-modal" aria-label="Close">&times;</button>
    <h2>${region.name}</h2>
    <img src="${region.imageUrl}" alt="${region.name} region" loading="lazy" style="max-width:100%;border-radius:8px;">
    <p>${region.description}</p>
    <p><strong>Cultural Highlight:</strong> ${region.culturalHighlight.name}</p>
    <p><strong>Main Biomes:</strong> ${region.mainBiomes.join(', ')}</p>
    <h3>Key Cities</h3>
    <ul>
      ${region.keyCities.map(city => `<li><strong>${city.name}</strong> (pop. ${city.population.toLocaleString()}): ${city.attraction}</li>`).join('')}
    </ul>
    <h3>Typical Dishes</h3>
    <ul>
      ${region.typicalDishes.map(dish => `<li>${dish.name}</li>`).join('')}
    </ul>
    <button class="cta-btn" id="fav-btn">${isFavorite(region.name) ? '★ Remove Favorite' : '☆ Add to Favorites'}</button>
  `;
    modal.showModal();
    modal.querySelector('.close-modal').onclick = () => modal.close();
    modal.addEventListener('click', function handler(e) {
        if (e.target === modal) modal.close();
    }, { once: true });

    modal.querySelector('#fav-btn').onclick = () => {
        toggleFavorite(region.name);
        modal.close();
    };
}

function isFavorite(regionName) {
    const favs = JSON.parse(localStorage.getItem('favoriteRegions') || '[]');
    return favs.includes(regionName);
}

function toggleFavorite(regionName) {
    let favs = JSON.parse(localStorage.getItem('favoriteRegions') || '[]');
    if (favs.includes(regionName)) {
        favs = favs.filter(r => r !== regionName);
    } else {
        favs.push(regionName);
    }
    localStorage.setItem('favoriteRegions', JSON.stringify(favs));
}

loadRegions();
