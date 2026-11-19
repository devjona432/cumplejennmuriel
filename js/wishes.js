/* ==========================================================================
   CUADRÍCULA INTERACTIVA: 19 DESEOS PARA EL 19 DE NOVIEMBRE
   ========================================================================== */
const nineteenWishes = [
    { text: "Paz interior en cada amanecer.", icon: "sun" },
    { text: "Salud infinita para ti y tus compañeros peludos.", icon: "heart" },
    { text: "Que nunca te falte música que inspire tu alma.", icon: "music" },
    { text: "Nuevos viajes que llenen tu vida de magia.", icon: "compass" },
    { text: "Proyectos que superen todos tus sueños.", icon: "sparkles" },
    { text: "Risas sinceras con quienes te quieren bien.", icon: "smile" },
    { text: "Inspiración constante frente a cada lente.", icon: "camera" },
    { text: "Tranquilidad frente al ruido del mundo.", icon: "feather" },
    { text: "Fuerza para seguir protegiendo vidas inocentes.", icon: "shield-heart" },
    { text: "Melodías inolvidables en cada nota de tu vida.", icon: "disc" },
    { text: "Abundancia en amor, calma y bienestar.", icon: "gem" },
    { text: "Libertad para ser siempre fiel a tu esencia.", icon: "wind" },
    { text: "Atardeceres rosados llenos de gratitud.", icon: "sunset" },
    { text: "Sabiduría en cada nuevo paso que decidas dar.", icon: "star" },
    { text: "Abrazos que recarguen tu corazón.", icon: "heart-handshake" },
    { text: "Que tu nobleza regrese multiplicada a ti.", icon: "award" },
    { text: "Momentos simples que se vuelvan eternos.", icon: "infinity" },
    { text: "Confianza plena en la mujer extraordinaria que eres.", icon: "crown" },
    { text: "Un año inolvidable. Feliz cumpleaños, Jenn.", icon: "party-popper" }
];

function initWishesGrid() {
    const grid = document.getElementById('wishes-grid');
    if (!grid) return;

    grid.innerHTML = nineteenWishes.map((item, idx) => {
        const num = String(idx + 1).padStart(2, '0');
        const safeIcon = item.icon === 'shield-heart' ? 'shield-check' : item.icon;
        return `
            <button type="button" onclick="revealWishCard(this, ${idx})" 
                    class="wish-card group relative min-h-[142px] sm:min-h-[156px] p-4 rounded-2xl bg-charcoal/90 hover:bg-charcoal border border-cleanWhite/10 hover:border-pastelPink/50 transition-all duration-300 flex flex-col items-center justify-center text-center shadow-lg active:scale-95">
                <span class="wish-num font-serif text-3xl sm:text-4xl font-bold bg-gradient-to-b from-cleanWhite to-pastelPink bg-clip-text text-transparent group-hover:scale-110 transition-transform">
                    ${num}
                </span>
                <span class="wish-hint inline-flex items-center gap-1 text-[11px] uppercase tracking-wider text-roseGlow/85 mt-2">
                    <i data-lucide="sparkles" class="w-3 h-3"></i>
                    <span>Tocar deseo</span>
                </span>
                <div class="wish-text hidden flex-col items-center gap-2">
                    <span class="w-7 h-7 rounded-full bg-vibrantFuchsia/25 border border-pastelPink/40 flex items-center justify-center text-pastelPink">
                        <i data-lucide="${safeIcon}" class="w-3.5 h-3.5"></i>
                    </span>
                    <p class="text-xs sm:text-sm text-cleanWhite/95 font-light leading-snug">
                        “${item.text}”
                    </p>
                </div>
            </button>
        `;
    }).join('');

    if (window.lucide) lucide.createIcons();
}

function revealWishCard(cardEl, idx) {
    const isRevealed = cardEl.classList.contains('revealed');
    const numEl = cardEl.querySelector('.wish-num');
    const hintEl = cardEl.querySelector('.wish-hint');
    const textEl = cardEl.querySelector('.wish-text');

    if (!isRevealed) {
        cardEl.classList.add('revealed', 'border-roseGlow/75', 'bg-vibrantFuchsia/15', 'shadow-vibrantFuchsia/20');
        numEl.classList.add('hidden');
        hintEl.classList.add('hidden');
        textEl.classList.remove('hidden');
        textEl.classList.add('flex');
        if (idx === 18) triggerConfetti();
    } else {
        cardEl.classList.remove('revealed', 'border-roseGlow/75', 'bg-vibrantFuchsia/15', 'shadow-vibrantFuchsia/20');
        numEl.classList.remove('hidden');
        hintEl.classList.remove('hidden');
        textEl.classList.add('hidden');
        textEl.classList.remove('flex');
    }
}
