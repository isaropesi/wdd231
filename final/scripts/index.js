import { setupNav } from './nav.js';

setupNav();

document.getElementById('year').textContent = new Date().getFullYear();

async function loadFeaturedRegion() {
    try {
        const res = await fetch('data/regions.json');
        const regions = await res.json();
        const region = regions[Math.floor(Math.random() * regions.length)];
        const card = document.createElement('div');
        card.className = 'region-card';
        card.innerHTML = `
      <img src="${region.imageUrl}" alt="${region.name} region" loading="lazy">
      <h3>${region.name}</h3>
      <p>${region.description}</p>
      <p><strong>Cultural Highlight:</strong> ${region.culturalHighlight.name}</p>
      <a href="regions.html" class="cta-btn">See All Regions</a>
    `;
        document.getElementById('featured-region-card').appendChild(card);
    } catch (e) {
        document.getElementById('featured-region-card').textContent = 'Unable to load region data.';
    }
}
loadFeaturedRegion();
