export function setupNav() {
    const menuBtn = document.getElementById('menu-btn');
    const navList = document.getElementById('main-nav');
    menuBtn.addEventListener('click', () => {
        navList.classList.toggle('open');
    });
    navList.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') navList.classList.remove('open');
    });
}
