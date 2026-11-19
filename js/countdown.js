/* ==========================================================================
   RELOJ DE CUENTA REGRESIVA EN VIVO HACIA EL 19 DE NOVIEMBRE
   ========================================================================== */
function updateBirthdayCountdown() {
    const now = new Date();
    const currentYear = now.getFullYear();
    // 19 de noviembre (mes 10 en índice base 0)
    let targetDate = new Date(currentYear, 10, 19, 0, 0, 0);

    const isTodayBirthday = (now.getMonth() === 10 && now.getDate() === 19);
    const heading = document.getElementById('countdown-heading');
    const grid = document.getElementById('countdown-grid');

    if (isTodayBirthday) {
        heading.textContent = 'HOY ES TU GRAN DÍA DE CUMPLEAÑOS';
        grid.innerHTML = `
            <div class="col-span-4 py-3.5 px-4 rounded-2xl bg-vibrantFuchsia/20 border border-roseGlow/45">
                <p class="font-serif italic text-xl sm:text-2xl text-cleanWhite">Feliz Cumpleaños, Jenn. Que hoy brilles más que nunca.</p>
            </div>
        `;
        return;
    }

    if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 10, 19, 0, 0, 0);
    }

    const diff = targetDate - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    const elDays = document.getElementById('cd-days');
    if (elDays) {
        elDays.textContent = String(days).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
    }
}

setInterval(updateBirthdayCountdown, 1000);
updateBirthdayCountdown();
