/* ==========================================================================
   CARTA DE CUMPLEAÑOS (SOBRE DIGITAL INTERACTIVO)
   ========================================================================== */
let isLetterOpen = false;

function toggleLetter() {
    isLetterOpen = !isLetterOpen;
    const body = document.getElementById('letter-body');
    const chevron = document.getElementById('letter-chevron');
    const seal = document.getElementById('wax-seal');
    const title = document.getElementById('letter-prompt-title');

    if (isLetterOpen) {
        body.classList.add('open');
        chevron.style.transform = 'rotate(180deg)';
        seal.style.transform = 'scale(1.08) rotate(8deg)';
        title.textContent = 'Tu Carta de Cumpleaños';
    } else {
        body.classList.remove('open');
        chevron.style.transform = 'rotate(0deg)';
        seal.style.transform = 'scale(1) rotate(0deg)';
        title.textContent = 'Toca para abrir tu carta de cumpleaños';
    }
}

function openEnvelopeFromHero() {
    if (!isLetterOpen) {
        setTimeout(() => toggleLetter(), 450);
    }
}
