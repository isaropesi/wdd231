const mobileMenuButton = document.getElementById('mobile-menu');
const menuNav = document.getElementById('navbar');

mobileMenuButton.addEventListener('click', () => {
  menuNav.classList.toggle('open');

  const isExpanded = menuNav.classList.contains('open');
  mobileMenuButton.setAttribute('aria-expanded', isExpanded);
});

const navLinks = menuNav.querySelectorAll('a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuNav.classList.remove('open');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('click', (event) => {
  if (!menuNav.contains(event.target) && !mobileMenuButton.contains(event.target) && menuNav.classList.contains('open')) {
    menuNav.classList.remove('open');
    mobileMenuButton.setAttribute('aria-expanded', 'false');
  }
});