
document.getElementById('current-year').textContent = new Date().getFullYear();

document.getElementById('last-modified').textContent = `Last Modified: ${document.lastModified}`;

const menuButton = document.getElementById('menu-button');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});

navigation.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
        navigation.classList.remove('open');
        menuButton.classList.remove('open');
    }
});