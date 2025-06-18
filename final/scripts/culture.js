import { setupNav } from './nav.js';

setupNav();

document.getElementById('year').textContent = new Date().getFullYear();

const cultureList = document.getElementById('culture-list');
const modal = document.getElementById('culture-modal');

async function loadCulture() {
    try {
        const res = await fetch('data/regions.json');
        const regions = await res.json();
        // Flatten all dishes and cultural highlights
        const items = [];
        regions.forEach(region => {
            region.typicalDishes.forEach(dish => {
                items.push({
                    type: 'dish',
                    region: region.name,
                    name: dish.name,
                    description: `${dish.name} is a typical dish from the ${region.name} region.`,
                    imageUrl: `images/${dish.image}`
                });
            });
            items.push({
                type: 'culture',
                region: region.name,
                name: region.culturalHighlight.name,
                description: `A cultural highlight of the ${region.name} region.`,
                imageUrl: `images/${region.culturalHighlight.image}`
            });
        });
        displayCulture(items);
    } catch (e) {
        cultureList.textContent = 'Unable to load culture data.';
    }
}

function displayCulture(items) {
    cultureList.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'culture-card';
        card.tabIndex = 0;
        card.innerHTML = `
      <img src="${item.imageUrl}" alt="${item.name}" loading="lazy">
      <h3>${item.name}</h3>
      <p><strong>Region:</strong> ${item.region}</p>
      <button class="cta-btn">Details</button>
    `;
        card.querySelector('.cta-btn').addEventListener('click', () => showCultureModal(item));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') showCultureModal(item);
        });
        cultureList.appendChild(card);
    });
}

function showCultureModal(item) {
    modal.innerHTML = `
    <button class="close-modal" aria-label="Close">&times;</button>
    <h2>${item.name}</h2>
    <img src="${item.imageUrl}" alt="${item.name}" loading="lazy" style="max-width:100%;border-radius:8px;">
    <p><strong>Region:</strong> ${item.region}</p>
    <p>${item.description}</p>
  `;
    modal.showModal();
    modal.querySelector('.close-modal').onclick = () => modal.close();
    modal.addEventListener('click', function handler(e) {
        if (e.target === modal) modal.close();
    }, { once: true });
}

loadCulture();
