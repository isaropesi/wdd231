// Update the copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Update the last modification date
document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

// Handle the responsive navigation menu
const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});

// Close the menu when a link is clicked (optional, for better UX)
navigation.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navigation.classList.remove('open');
        menuButton.classList.remove('open');
    }
});