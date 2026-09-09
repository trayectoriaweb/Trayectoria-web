/* ================================================================
   TRAYECTORIA — app.v2.js v2026.feed.1
   Navegación suave y microinteracciones
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // Smooth scroll para todos los enlaces ancla
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
