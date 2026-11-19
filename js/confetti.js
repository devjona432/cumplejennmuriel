/* ==========================================================================
   CONFETI INTERACTIVO
   Tonos rosa, fucsia, blanco y plata sobre un canvas a pantalla completa.
   ========================================================================== */
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
let animationFrameId = null;

const confettiColors = ['#F9A8D4', '#F472B6', '#EC4899', '#FAFAFA', '#E4E4E7'];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function triggerConfetti() {
    for (let i = 0; i < 95; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: -20 - Math.random() * 120,
            size: Math.random() * 7 + 4,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            speedY: Math.random() * 3.5 + 2,
            speedX: (Math.random() - 0.5) * 3,
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 8,
            opacity: 1
        });
    }
    if (!animationFrameId) {
        animateConfetti();
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p, index) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height - 100) {
            p.opacity -= 0.02;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        ctx.restore();

        if (p.opacity <= 0 || p.y > canvas.height + 20) {
            particles.splice(index, 1);
        }
    });

    if (particles.length > 0) {
        animationFrameId = requestAnimationFrame(animateConfetti);
    } else {
        animationFrameId = null;
    }
}
