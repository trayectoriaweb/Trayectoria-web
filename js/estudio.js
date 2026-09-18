/**
 * TRAYECTORIA WEB — Script principal
 * Navegación accesible, menú móvil, enlaces a WhatsApp y scroll suave.
 * Fundador y diseñador: Sasha Goy
 */

(function () {
  'use strict';

  const WHATSAPP_PHONE = '5491123456789';
  const WHATSAPP_MSG = 'Hola Sasha, estuve viendo Trayectoria y me gustaría conversar sobre mi sitio.';

  // 1. Menú móvil accesible
  function setupMobileMenu() {
    const toggleBtn = document.querySelector('.mobile-menu-toggle');
    const drawer = document.getElementById('mobile-menu');
    if (!toggleBtn || !drawer) return;

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.toggle('is-open');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });

    // Cerrar al pulsar un enlace
    drawer.querySelectorAll('.mobile-nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        drawer.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
      });
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
        drawer.classList.remove('is-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
        drawer.setAttribute('aria-hidden', 'true');
        toggleBtn.focus();
      }
    });
  }

  // 2. Centralización de enlaces directos a WhatsApp
  function setupWhatsAppLinks() {
    const links = document.querySelectorAll('a[data-whatsapp="true"]');
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

    links.forEach((link) => {
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  // 3. Scroll suave nativo para anclas internas
  function setupSmoothNav() {
    document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
          targetEl.focus({ preventScroll: true });
        }
      });
    });
  }

  // Inicialización cuando el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    setupMobileMenu();
    setupWhatsAppLinks();
    setupSmoothNav();
  });
})();
