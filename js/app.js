/**
 * TRAYECTORIA — Sistema de Diseño Editorial v0.2
 * Controlador de interactividad, ajuste tipográfico y selector de medios
 */

(function () {
  'use strict';

  // Catálogo de proyectos destacados en la apertura
  const projects = {
    guido: {
      name: 'Guido Castellotti',
      src: 'img/proyectos/guido-castellotti-hero.webp',
      alt: 'Captura real del sitio web de Guido Castellotti — Fotografía y diseño',
      url: 'https://trayectoriaweb.github.io/Guido-Castelloti-web/',
      label: 'Ver proyecto'
    },
    julieta: {
      name: 'Julieta Vitale',
      src: 'img/proyectos/julieta-vitale-web.png',
      alt: 'Captura real del sitio web de Julieta Vitale — Abogacía',
      url: 'https://angelesgoy.github.io/julieta-vitale-abogada/',
      label: 'Ver proyecto'
    },
    maurizio: {
      name: 'Maurizio Di Russo',
      src: 'img/proyectos/maurizio-di-russo-hero.webp',
      alt: 'Captura real del sitio web de Maurizio Di Russo — Perfil ejecutivo',
      url: 'https://angelesgoy.github.io/maurizio-di-russo/',
      label: 'Ver proyecto'
    }
  };

  // Pre-cargar imágenes para transiciones instantáneas
  Object.values(projects).forEach(p => {
    const img = new Image();
    img.src = p.src;
  });

  /* ================================================================
     1. AJUSTE TIPOGRÁFICO DE MARCA (TRAYECTORIA)
     Medición sin restricciones mediante span de referencia.
     Garantiza que la marca ocupe de margen a margen en una sola línea
     en cualquier resolución (escritorio, tablet y móvil).
     ================================================================ */
  function fitBrand() {
    const brand = document.getElementById('brand-display');
    if (!brand) return;
    const parent = brand.parentElement;
    if (!parent) return;

    const availableWidth = parent.clientWidth;
    if (availableWidth <= 0) return;

    // Crear elemento de medición temporal fuera de flujo y sin restricciones de ancho
    const probe = document.createElement('span');
    probe.innerText = 'TRAYECTORIA';
    probe.style.fontFamily = 'Archivo, sans-serif';
    probe.style.fontWeight = '650';
    probe.style.fontSize = '100px';
    probe.style.letterSpacing = '-0.055em';
    probe.style.textTransform = 'uppercase';
    probe.style.whiteSpace = 'nowrap';
    probe.style.position = 'absolute';
    probe.style.visibility = 'hidden';
    probe.style.top = '-9999px';
    probe.style.left = '-9999px';
    probe.style.width = 'auto';
    probe.style.maxWidth = 'none';

    document.body.appendChild(probe);
    const unconstrainedWidth = probe.getBoundingClientRect().width;
    document.body.removeChild(probe);

    if (unconstrainedWidth > 0) {
      // Escalar exactamente al ancho disponible con 1% de holgura de seguridad
      const targetSize = (availableWidth / unconstrainedWidth) * 100;
      const safeSize = Math.floor(targetSize * 0.988);
      brand.style.maxWidth = 'none';
      brand.style.fontSize = `${safeSize}px`;
    }
  }

  /* ================================================================
     2. SELECTOR DE PROYECTOS DE APERTURA
     Fundido cruzado suave de 320ms y actualización accesible
     ================================================================ */
  function initSelector() {
    const buttons = document.querySelectorAll('.selector-btn');
    const heroImg = document.getElementById('hero-active-image');
    const projectLink = document.getElementById('hero-project-link');

    if (!buttons.length || !heroImg) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.dataset.project;
        if (!key || !projects[key]) return;
        if (this.classList.contains('is-active')) return;

        // Actualizar estado de botones
        buttons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });

        this.classList.add('is-active');
        this.setAttribute('aria-pressed', 'true');

        const project = projects[key];

        // Transición de imagen
        heroImg.classList.add('is-transitioning');

        setTimeout(() => {
          heroImg.src = project.src;
          heroImg.alt = project.alt;
          
          if (projectLink) {
            projectLink.href = project.url;
            projectLink.innerHTML = `${project.label} <span class="arrow-glyph" aria-hidden="true">↗</span>`;
          }

          heroImg.classList.remove('is-transitioning');
        }, 160);
      });
    });
  }

  /* ================================================================
     3. INICIALIZACIÓN
     ================================================================ */
  function init() {
    fitBrand();
    initSelector();

    // Reajuste responsivo al redimensionar ventana
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitBrand, 40);
    });

    // Reajustar cuando las fuentes de Google Fonts terminen de renderizar
    if (document.fonts) {
      document.fonts.ready.then(() => {
        fitBrand();
        setTimeout(fitBrand, 120);
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
