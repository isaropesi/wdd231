async function getMembers() {
    const response = await fetch('data/members.json');
    if (response.ok) {
        const members = await response.json();
        displayMembers(members);
        setupViewToggle(members);
    } else {
        console.error('Failed to fetch member data.');
    }
}

function displayMembers(members, view = 'grid') {
    const membersContainer = document.getElementById('members-container');
    membersContainer.innerHTML = ''; 
    membersContainer.className = `${view}-view`; 

    members.forEach(member => {
        const card = document.createElement('div');
        card.classList.add('member-card');

        if (view === 'grid') {
            const image = document.createElement('img');
            image.src = `images/${member.image}`;
            image.alt = `Logo of ${member.name}`;
            const name = document.createElement('h2');
            name.textContent = member.name;
            const address = document.createElement('p');
            address.textContent = member.address;
            const phone = document.createElement('p');
            phone.textContent = member.phone;
            const website = document.createElement('a');
            website.href = member.website;
            website.textContent = 'Visit Website';
            website.target = '_blank';
            const membership = document.createElement('p');
            membership.textContent = `Level: ${member.membershipLevel}`;
            const description = document.createElement('p');
            description.textContent = member.description;
            const founded = document.createElement('p');
            founded.textContent = `Founded: ${member.founded}`;

            card.appendChild(image);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(website);
            card.appendChild(membership);
            card.appendChild(description);
            card.appendChild(founded);
        } else if (view === 'list') {
            const listItem = document.createElement('div');
            listItem.classList.add('member-list-item');
            const name = document.createElement('h2');
            name.textContent = member.name;
            const address = document.createElement('p');
            address.textContent = `Address: ${member.address}`;
            const phone = document.createElement('p');
            phone.textContent = `Phone: ${member.phone}`;
            const website = document.createElement('p');
            website.innerHTML = `Website: <a href="${member.website}" target="_blank">Visit</a>`;
            const membership = document.createElement('p');
            membership.textContent = `Membership Level: ${member.membershipLevel}`;
            const description = document.createElement('p');
            description.textContent = `Description: ${member.description}`;
            const founded = document.createElement('p');
            founded.textContent = `Founded: ${member.founded}`;

            listItem.appendChild(name);
            listItem.appendChild(address);
            listItem.appendChild(phone);
            listItem.appendChild(website);
            listItem.appendChild(membership);
            listItem.appendChild(description);
            listItem.appendChild(founded);
            card.appendChild(listItem);
        }
        membersContainer.appendChild(card);
    });
}

function setupViewToggle(members) {
    const gridButton = document.getElementById('grid-view');
    const listButton = document.getElementById('list-view');

    gridButton.addEventListener('click', () => {
        displayMembers(members, 'grid');
        localStorage.setItem('directoryView', 'grid');
        gridButton.classList.add('active');
        listButton.classList.remove('active');
    });

    listButton.addEventListener('click', () => {
        displayMembers(members, 'list');
        localStorage.setItem('directoryView', 'list');
        listButton.classList.add('active');
        gridButton.classList.remove('active');
    });

    const savedView = localStorage.getItem('directoryView');
    if (savedView) {
        displayMembers(members, savedView);
        if (savedView === 'grid') {
            gridButton.classList.add('active');
            listButton.classList.remove('active');
        } else if (savedView === 'list') {
            listButton.classList.add('active');
            gridButton.classList.remove('active');
        }
    } else {
        gridButton.classList.add('active');
    }
}

getMembers();