/* ==========================================================================
   UTILIDADES COMPARTIDAS
   1. Fallback elegante en SVG para imágenes externas
   2. Notificación Toast
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. FALLBACK ELEGANTE EN SVG PARA IMÁGENES EXTERNAS
   -------------------------------------------------------------------------- */
function handleImageFallback(imgEl, label) {
    imgEl.onerror = null;
    const svg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750">
            <defs>
                <radialGradient id="g" cx="50%" cy="40%" r="65%">
                    <stop offset="0%" stop-color="#F472B6" stop-opacity="0.38"/>
                    <stop offset="55%" stop-color="#EC4899" stop-opacity="0.16"/>
                    <stop offset="100%" stop-color="#09090B" stop-opacity="1"/>
                </radialGradient>
            </defs>
            <rect width="600" height="750" fill="#121216"/>
            <rect width="600" height="750" fill="url(#g)"/>
            <circle cx="300" cy="320" r="110" fill="none" stroke="#F9A8D4" stroke-opacity="0.35" stroke-width="1.5"/>
            <text x="300" y="328" font-family="Georgia, serif" font-style="italic" font-size="36" fill="#FAFAFA" text-anchor="middle">JM</text>
            <text x="300" y="475" font-family="sans-serif" font-size="13" letter-spacing="4" fill="#F9A8D4" text-anchor="middle">${label.toUpperCase()}</text>
        </svg>
    `.trim();
    imgEl.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
}

/* --------------------------------------------------------------------------
   2. NOTIFICACIÓN TOAST ELEGANTE
   -------------------------------------------------------------------------- */
let toastTimeout;

function showToast(text) {
    const toast = document.getElementById('toast-notification');
    const msg = document.getElementById('toast-message');
    msg.textContent = text;

    toast.classList.remove('translate-y-24', 'opacity-0');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.add('translate-y-24', 'opacity-0');
    }, 3000);
}
