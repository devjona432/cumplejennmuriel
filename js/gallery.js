/* ==========================================================================
   GALERÍA DIFUMINADA INTERACTIVA + MODAL DE SUBIDA DE FOTO
   ========================================================================== */
const photoStates = [false, false, false];
let currentGlobalBlur = 16;
let allRevealed = false;

/* --- Revelado individual ------------------------------------------------- */
function toggleSinglePhoto(index) {
    photoStates[index] = !photoStates[index];
    applyPhotoVisualState(index);
}

function hoverRevealPhoto(index, isHovering) {
    if (photoStates[index]) return;

    const img = document.getElementById(`gallery-img-${index}`);
    const overlay = document.getElementById(`overlay-${index}`);

    if (isHovering) {
        img.style.filter = 'blur(0px)';
        overlay.style.opacity = '0';
    } else {
        img.style.filter = `blur(${currentGlobalBlur}px)`;
        overlay.style.opacity = '1';
    }
}

function applyPhotoVisualState(index) {
    const img = document.getElementById(`gallery-img-${index}`);
    const overlay = document.getElementById(`overlay-${index}`);
    const btn = document.getElementById(`btn-photo-${index}`);

    if (photoStates[index]) {
        img.style.filter = 'blur(0px)';
        overlay.style.opacity = '0';
        overlay.style.pointerEvents = 'none';
        btn.innerHTML = '<i data-lucide="eye-off" class="w-3.5 h-3.5 text-pastelPink"></i><span>Difuminar</span>';
    } else {
        img.style.filter = `blur(${currentGlobalBlur}px)`;
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        btn.innerHTML = '<i data-lucide="eye" class="w-3.5 h-3.5 text-pastelPink"></i><span>Revelar recuerdo</span>';
    }
    if (window.lucide) lucide.createIcons();
}

/* --- Control global de intensidad --------------------------------------- */
function updateGlobalBlur(value) {
    currentGlobalBlur = parseInt(value, 10);
    document.getElementById('blur-value-label').textContent = `${currentGlobalBlur}px`;

    photoStates.forEach((isRevealed, index) => {
        if (!isRevealed) {
            document.getElementById(`gallery-img-${index}`).style.filter = `blur(${currentGlobalBlur}px)`;
        }
    });
}

function toggleAllPhotos() {
    allRevealed = !allRevealed;
    const toggleAllBtn = document.getElementById('toggle-all-btn');

    for (let i = 0; i < photoStates.length; i++) {
        photoStates[i] = allRevealed;
        applyPhotoVisualState(i);
    }

    if (allRevealed) {
        toggleAllBtn.innerHTML = '<i data-lucide="eye-off" class="w-4 h-4 text-pastelPink"></i><span>Difuminar Todas</span>';
        showToast('Todas las fotografías han sido reveladas');
    } else {
        toggleAllBtn.innerHTML = '<i data-lucide="eye" class="w-4 h-4 text-pastelPink"></i><span>Revelar Todas</span>';
        showToast('Efecto difuminado restaurado');
    }
    if (window.lucide) lucide.createIcons();
}
