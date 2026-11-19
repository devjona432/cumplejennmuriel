/* ==========================================================================
   INICIALIZACIÓN GENERAL AL CARGAR LA PÁGINA
   ========================================================================== */
window.onload = function () {
    initWishesGrid();
    if (window.lucide) lucide.createIcons();

    // Melodía ambiental siempre activa (se desbloquea con el primer gesto)
    tryAutostartPiano();

    // Animación de aparición progresiva al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));

    // Ráfaga de bienvenida
    setTimeout(() => triggerConfetti(), 600);
};
