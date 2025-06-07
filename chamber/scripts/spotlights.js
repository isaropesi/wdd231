async function loadSpotlights() {
    const res = await fetch('data/members.json');
    const members = await res.json();
    // Filtra membros Gold (3) ou Silver (2)
    const goldSilver = members.filter(m => m.membershipLevel === 2 || m.membershipLevel === 3);
    // Embaralha e pega 2 ou 3
    const shuffled = goldSilver.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2); // 2 ou 3

    const spotlights = document.getElementById('spotlights');
    spotlights.innerHTML = '';
    selected.forEach(member => {
        const card = document.createElement('div');
        card.className = 'member-card';
        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" style="max-width:100px;max-height:80px;">
            <h3>${member.name}</h3>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p><strong>Membership:</strong> ${member.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
        `;
        spotlights.appendChild(card);
    });
}

loadSpotlights();
