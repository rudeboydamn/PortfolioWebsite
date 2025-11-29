// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add a class to the header on scroll
const header = document.querySelector('.site-header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        header.classList.remove('scroll-up');
        return;
    }
    
    if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-up');
        header.classList.add('scroll-down');
    } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
        header.classList.remove('scroll-down');
        header.classList.add('scroll-up');
    }
    
    lastScroll = currentScroll;
});

// Add current year to footer
const currentYear = new Date().getFullYear();
document.querySelector('footer p').innerHTML = `© ${currentYear} Dammy Henry. All rights reserved.`;

// Ensure avatar image displays consistently on all pages with fallback
const PLACEHOLDER_AVATAR = 'https://via.placeholder.com/128x128.png?text=DH';
const avatarImgs = document.querySelectorAll('img.avatar');
avatarImgs.forEach((img) => {
    img.src = '/img/dammyhenry.png';
    img.alt = 'Portrait of Dammy Henry';
    // If the local image fails to load for any reason (404, path), fall back to a placeholder
    img.onerror = () => { img.src = PLACEHOLDER_AVATAR; };
});

// Interactive hero background that follows the cursor
const hero = document.querySelector('.interactive-hero');
if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const rect = hero.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100; // 0-100
        const y = ((e.clientY - rect.top) / rect.height) * 100; // 0-100
        hero.style.setProperty('--mx', `${x}%`);
        hero.style.setProperty('--my', `${y}%`);
    });
}
