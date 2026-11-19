# Homenaje de Cumpleaños — Jenn Muriel

Página estática separada por secciones, con estilos y lógica en archivos independientes.

## Estructura

```
index.html                 Estructura y contenido, dividido por secciones numeradas
css/
  styles.css               Estilos propios (base, títulos, efectos, galería, carta...)
js/
  tailwind.config.js       Paleta y tipografías de Tailwind (debe ir tras el CDN)
  utils.js                 Fallback SVG de imágenes + notificación toast
  confetti.js              Confeti en canvas
  nav.js                   Menú móvil
  countdown.js             Cuenta regresiva al 19 de noviembre
  gallery.js               Galería difuminada interactiva
  wishes.js                Cuadrícula de los 19 deseos
  letter.js                Sobre/carta interactiva
  audio.js                 Melodía ambiental de piano, activa sola (Web Audio API)
  app.js                   Inicialización general (scroll reveal, confeti inicial)
```

## Secciones de `index.html`

| Bloque | Contenido |
| --- | --- |
| 00 | Capas globales: canvas de confeti, toast y controles flotantes |
| 01 | Barra de navegación (escritorio + menú móvil) |
| 02 | Hero cinematográfico con retrato difuminado y cuenta regresiva |
| 03 | Tu Esencia (4 tarjetas) |
| 04 | Fotos hermosas |
| 05 | 19 Deseos |
| 06 | Carta de cumpleaños |
| 07 | Pie de página |

## Notas

- Los scripts son clásicos (no módulos) y se cargan con `defer` en orden, para que las
  funciones sigan disponibles en los `onclick` del HTML.
- El orden de carga importa: `utils.js` y `confetti.js` antes de los módulos que los usan,
  y `app.js` al final.
- `homenaje_cumplea_os_jenn_muriel.html` es la versión original de un solo archivo,
  conservada como respaldo.

## Cómo verla

Abre `index.html` en el navegador o sirve la carpeta con cualquier servidor estático
(por ejemplo `npx serve`).
