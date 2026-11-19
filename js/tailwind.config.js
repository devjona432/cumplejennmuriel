/* ==========================================================================
   CONFIGURACIÓN DE TAILWIND CSS
   Debe cargarse DESPUÉS del CDN de Tailwind y ANTES del resto de scripts.
   ========================================================================== */
tailwind.config = {
    theme: {
        extend: {
            colors: {
                obsidian: '#09090B',
                charcoal: '#121216',
                pastelPink: '#F9A8D4',
                roseGlow: '#F472B6',
                vibrantFuchsia: '#EC4899',
                cleanWhite: '#FAFAFA',
                softSilver: '#E4E4E7',
            },
            fontFamily: {
                serif: ['"Playfair Display"', 'serif'],
                sans: ['"Plus Jakarta Sans"', 'sans-serif'],
            }
        }
    }
};
