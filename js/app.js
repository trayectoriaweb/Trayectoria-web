/* ================================================================
   TRAYECTORIA — app.js v0.1 (Entrega A)
   Navegación nativa accesible y comportamiento de anclas
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Navegación por anclas con foco accesible
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        });

        // Asegurar foco accesible en el destino
        if (!target.hasAttribute('tabindex')) {
          target.setAttribute('tabindex', '-1');
        }
        target.focus({ preventScroll: true });
      }
    });
  });
});
