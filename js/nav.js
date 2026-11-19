/* ==========================================================================
   MENÚ MÓVIL RESPONSIVO
   ========================================================================== */
let isMobileMenuOpen = false;

function toggleMobileMenu() {
    isMobileMenuOpen = !isMobileMenuOpen;
    const drawer = document.getElementById('mobile-menu-drawer');
    const hamIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-menu-icon');
    const btn = document.getElementById('mobile-menu-btn');

    if (isMobileMenuOpen) {
        drawer.classList.remove('hidden');
        hamIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        btn.setAttribute('aria-expanded', 'true');
    } else {
        closeMobileMenu();
    }
}

function closeMobileMenu() {
    isMobileMenuOpen = false;
    const drawer = document.getElementById('mobile-menu-drawer');
    const hamIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-menu-icon');
    const btn = document.getElementById('mobile-menu-btn');

    drawer.classList.add('hidden');
    hamIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    btn.setAttribute('aria-expanded', 'false');
}
