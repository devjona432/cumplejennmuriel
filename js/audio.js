/* ==========================================================================
   REPRODUCTOR AMBIENTAL DE PIANO Y SINTETIZADOR (WEB AUDIO API)
   La melodía arranca sola: se intenta al cargar y, si el navegador la bloquea,
   se activa automáticamente con el primer clic, toque o tecla del visitante.
   ========================================================================== */
let audioCtx = null;
let pianoInterval = null;
let isPianoPlaying = false;
let chordStep = 0;
let userPausedManually = false;
let isAutostartPending = false;

// Progresión cálida de acordes suaves (Fmaj7 -> Em7 -> Dm7 -> Cmaj7)
const ambientChords = [
    [174.61, 220.00, 261.63, 329.63],
    [164.81, 196.00, 246.94, 293.66],
    [146.83, 174.61, 220.00, 261.63],
    [130.81, 164.81, 196.00, 246.94]
];

/* --- Contexto de audio -------------------------------------------------- */
function getAudioContext() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return null;
        audioCtx = new AudioContextClass();
    }
    return audioCtx;
}

/* --- Reproducción ------------------------------------------------------- */
function playSoftPianoChord(frequencies) {
    if (!audioCtx) return;
    const now = audioCtx.currentTime;

    frequencies.forEach((freq, i) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.14);

        gain.gain.setValueAtTime(0.0001, now + i * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.032, now + i * 0.14 + 0.18);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.14 + 3.2);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start(now + i * 0.14);
        osc.stop(now + i * 0.14 + 3.3);
    });
}

function startPianoMusic(options) {
    if (isPianoPlaying) return;

    const idleIcon = document.getElementById('piano-icon-idle');
    const eqBars = document.getElementById('piano-eq-bars');
    const subLabel = document.getElementById('piano-sub-label');

    isPianoPlaying = true;
    idleIcon.classList.add('hidden');
    eqBars.classList.remove('hidden');
    eqBars.classList.add('flex');
    subLabel.textContent = 'Sonando suave';

    playSoftPianoChord(ambientChords[chordStep % ambientChords.length]);
    chordStep++;

    pianoInterval = setInterval(() => {
        playSoftPianoChord(ambientChords[chordStep % ambientChords.length]);
        chordStep++;
    }, 3400);

    if (!options || !options.silent) {
        showToast('Melodía ambiental de piano activada');
    }
}

function stopPianoMusic(showMessage) {
    const idleIcon = document.getElementById('piano-icon-idle');
    const eqBars = document.getElementById('piano-eq-bars');
    const subLabel = document.getElementById('piano-sub-label');

    isPianoPlaying = false;
    clearInterval(pianoInterval);
    pianoInterval = null;
    idleIcon.classList.remove('hidden');
    eqBars.classList.add('hidden');
    eqBars.classList.remove('flex');
    subLabel.textContent = 'Activar ambiente';

    if (showMessage) {
        showToast('Melodía ambiental pausada');
    }
}

/* --- Botón de la esquina (permite silenciarla si se desea) -------------- */
function togglePianoMusic() {
    if (isPianoPlaying) {
        userPausedManually = true;
        stopPianoMusic(true);
        return;
    }

    userPausedManually = false;
    const context = getAudioContext();
    if (!context) return;

    if (context.state === 'suspended') {
        context.resume().then(() => startPianoMusic()).catch(() => { });
    } else {
        startPianoMusic();
    }
}

/* --- Arranque automático ------------------------------------------------- */
function tryAutostartPiano() {
    if (isPianoPlaying || userPausedManually || isAutostartPending) return;

    const context = getAudioContext();
    if (!context) return;

    if (context.state === 'running') {
        startPianoMusic({ silent: true });
        removeAutostartListeners();
        return;
    }

    // El navegador exige un gesto del usuario: se reintenta al primer contacto.
    isAutostartPending = true;
    context.resume().then(() => {
        isAutostartPending = false;
        if (context.state === 'running') {
            if (!isPianoPlaying && !userPausedManually) {
                startPianoMusic({ silent: true });
            }
            removeAutostartListeners();
        }
    }).catch(() => {
        isAutostartPending = false;
    });
}

const autostartEvents = ['pointerdown', 'touchstart', 'keydown', 'click'];

function onAutostartGesture(event) {
    // El propio botón de la melodía maneja su clic: no interferir con él.
    if (event.target && event.target.closest && event.target.closest('#piano-toggle-btn')) return;
    tryAutostartPiano();
}

function removeAutostartListeners() {
    autostartEvents.forEach((evt) => {
        document.removeEventListener(evt, onAutostartGesture, true);
    });
}

autostartEvents.forEach((evt) => {
    document.addEventListener(evt, onAutostartGesture, { capture: true, passive: true });
});
