/**
 * TRAYECTORIA — Propuesta B: Controlador de interactividad y ajuste de escenario
 */

(function () {
  'use strict';

  // Catálogo de proyectos del escenario
  const projects = {
    guido: {
      name: 'Guido Castellotti',
      rubro: 'Fotografía y diseño',
      desc: 'Un sitio donde la fotografía organiza la experiencia y presenta una mirada propia.',
      src: 'img/proyectos/guido-castellotti-hero.webp',
      alt: 'Captura real del sitio web de Guido Castellotti — Fotografía y diseño',
      url: 'https://trayectoriaweb.github.io/Guido-Castelloti-web/'
    },
    julieta: {
      name: 'Julieta Vitale',
      rubro: 'Abogacía',
      desc: 'Una presentación clara de su práctica penal, con información accesible y consulta directa.',
      src: 'img/proyectos/julieta-vitale-hero.webp',
      alt: 'Captura real del sitio web de Julieta Vitale — Abogacía',
      url: 'https://angelesgoy.github.io/julieta-vitale-abogada/'
    },
    maurizio: {
      name: 'Maurizio Di Russo',
      rubro: 'Perfil profesional',
      desc: 'Una presentación de su trayectoria, experiencia y trabajo con empresas.',
      src: 'img/proyectos/maurizio-stage-16x9.png',
      alt: 'Captura real del sitio web de Maurizio Di Russo — Perfil profesional',
      url: 'https://angelesgoy.github.io/maurizio-di-russo/'
    }
  };

  // Pre-carga inmediata de imágenes en memoria
  Object.values(projects).forEach(p => {
    const img = new Image();
    img.src = p.src;
  });

  /* ================================================================
     1. AJUSTE TIPOGRÁFICO DE MARCA (TRAYECTORIA)
     Garantiza que la marca ocupe de margen a margen en una sola línea
     sin cortes, wrap ni desbordes horizontales en cualquier resolución.
     ================================================================ */
  function fitBrand() {
    const brand = document.getElementById('brand-display');
    if (!brand) return;
    const parent = brand.parentElement;
    if (!parent) return;

    const availableWidth = parent.clientWidth;
    if (availableWidth <= 0) return;

    // Sonda de medición unconstrained
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
      const targetSize = (availableWidth / unconstrainedWidth) * 100;
      const safeSize = Math.floor(targetSize * 0.988);
      brand.style.maxWidth = 'none';
      brand.style.fontSize = `${safeSize}px`;
    }
  }

  /* ================================================================
     2. SELECTOR VERTICAL DE PROYECTOS DEL ESCENARIO
     Coordinación de imagen y ficha lateral con prevención de clics rápidos
     ================================================================ */
  function initStageSelector() {
    const buttons = document.querySelectorAll('.stage-selector-btn');
    const stageImg = document.getElementById('stage-active-image');
    const nameEl = document.getElementById('stage-project-name');
    const rubroEl = document.getElementById('stage-project-rubro');
    const descEl = document.getElementById('stage-project-desc');
    const linkEl = document.getElementById('stage-visit-link');

    if (!buttons.length || !stageImg) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let transitionTimer = null;
    let pendingProjectKey = null;

    buttons.forEach(btn => {
      btn.addEventListener('click', function () {
        const key = this.dataset.project;
        if (!key || !projects[key]) return;
        if (this.classList.contains('is-active')) return;

        // Actualizar estados accesibles de los botones
        buttons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });

        this.classList.add('is-active');
        this.setAttribute('aria-pressed', 'true');

        const project = projects[key];
        pendingProjectKey = key;

        if (prefersReducedMotion) {
          // Cambio instantáneo si el usuario prefiere movimiento reducido
          stageImg.src = project.src;
          stageImg.alt = project.alt;
          if (nameEl) nameEl.textContent = project.name;
          if (rubroEl) rubroEl.textContent = project.rubro;
          if (descEl) descEl.textContent = project.desc;
          if (linkEl) linkEl.href = project.url;
          return;
        }

        // Cancelar transición previa si hubo clics rápidos
        if (transitionTimer) {
          clearTimeout(transitionTimer);
        }

        // Fundido suave de 280ms
        stageImg.classList.add('is-fading');

        transitionTimer = setTimeout(() => {
          // Verificar que este sea el último pedido
          if (pendingProjectKey === key) {
            stageImg.src = project.src;
            stageImg.alt = project.alt;
            if (nameEl) nameEl.textContent = project.name;
            if (rubroEl) rubroEl.textContent = project.rubro;
            if (descEl) descEl.textContent = project.desc;
            if (linkEl) linkEl.href = project.url;
          }
          stageImg.classList.remove('is-fading');
          transitionTimer = null;
        }, 140);
      });
    });
  }

  /* ================================================================
     3. INICIALIZACIÓN
     ================================================================ */
  function init() {
    fitBrand();
    initStageSelector();

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(fitBrand, 40);
    });

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
