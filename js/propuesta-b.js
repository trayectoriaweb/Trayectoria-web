/**
 * TRAYECTORIA — Propuesta B Evolucionada: Controlador de interactividad, ajuste de marca y miniweb
 */

(function () {
  'use strict';

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
     2. ACCESIBILIDAD POR TECLADO EN LÁMINAS APILADAS
     Asegura que al tabular, si un enlace de un proyecto recibe foco,
     la lámina se desplace al viewport para ser visible de inmediato.
     ================================================================ */
  function initKeyboardProjectFocus() {
    const stack = document.getElementById('projects-stack');
    if (!stack) return;

    stack.addEventListener('focusin', function (e) {
      const sheet = e.target.closest('.project-sheet');
      if (sheet) {
        // Desplazar suavemente si está cubierta o fuera de foco
        const rect = sheet.getBoundingClientRect();
        if (rect.top < 0 || rect.top > window.innerHeight * 0.4) {
          sheet.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  }

  /* ================================================================
     3. CONTROLADOR DE LA MINIWEB EXPLORABLE
     Navegación accesible entre Perfil, Trayectoria, Áreas y Proyectos,
     con sub-vistas de detalle, retorno y gestión de foco.
     ================================================================ */
  function initMiniweb() {
    const container = document.getElementById('miniweb-container');
    if (!container) return;

    const navButtons = container.querySelectorAll('.miniweb-nav-btn');
    const views = container.querySelectorAll('.miniweb-view');
    const jumpButtons = container.querySelectorAll('.miniweb-text-link[data-jump]');
    const drillButtons = container.querySelectorAll('.miniweb-drill-btn');
    const backButtons = container.querySelectorAll('.miniweb-back-btn');

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let lastDrillTrigger = null;

    // Cambiar vista principal (Perfil, Trayectoria, Áreas, Proyectos)
    function switchMainView(targetViewId, focusHeading = true) {
      // 1. Actualizar botones de navegación
      navButtons.forEach(btn => {
        const isActive = btn.dataset.view === targetViewId;
        btn.classList.toggle('is-active', isActive);
        btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        btn.setAttribute('tabindex', isActive ? '0' : '-1');
      });

      // 2. Ocultar vistas activas y mostrar la seleccionada
      views.forEach(view => {
        const isMatch = view.id === `view-${targetViewId}`;
        if (isMatch) {
          view.removeAttribute('hidden');
          if (!prefersReducedMotion) {
            view.style.opacity = '0';
            requestAnimationFrame(() => {
              view.style.opacity = '1';
            });
          }
        } else {
          view.setAttribute('hidden', '');
        }
      });

      // 3. Si la vista tiene sub-vistas, reiniciar al índice
      if (targetViewId === 'areas') {
        resetAreasSubviews();
      } else if (targetViewId === 'proyectos') {
        resetProyectosSubviews();
      }

      // 4. Gestión de foco accesible
      if (focusHeading) {
        const activeView = document.getElementById(`view-${targetViewId}`);
        if (activeView) {
          const heading = activeView.querySelector('h3');
          if (heading) {
            heading.focus();
          }
        }
      }
    }

    function resetAreasSubviews() {
      const areaSubviews = container.querySelectorAll('#view-areas .miniweb-subview');
      areaSubviews.forEach(sub => {
        if (sub.id === 'subview-areas-index') {
          sub.removeAttribute('hidden');
          sub.classList.add('is-active');
        } else {
          sub.setAttribute('hidden', '');
          sub.classList.remove('is-active');
        }
      });
    }

    function resetProyectosSubviews() {
      const projSubviews = container.querySelectorAll('#view-proyectos .miniweb-subview');
      projSubviews.forEach(sub => {
        if (sub.id === 'subview-proyectos-index') {
          sub.removeAttribute('hidden');
          sub.classList.add('is-active');
        } else {
          sub.setAttribute('hidden', '');
          sub.classList.remove('is-active');
        }
      });
    }

    // Eventos en pestañas de navegación
    navButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetView = this.dataset.view;
        if (targetView) {
          switchMainView(targetView, false);
        }
      });

      // Navegación con flechas del teclado en tablist
      btn.addEventListener('keydown', function (e) {
        let index = Array.from(navButtons).indexOf(this);
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          const next = navButtons[(index + 1) % navButtons.length];
          next.click();
          next.focus();
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          const prev = navButtons[(index - 1 + navButtons.length) % navButtons.length];
          prev.click();
          prev.focus();
        }
      });
    });

    // Enlaces de salto interno dentro del Perfil
    jumpButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const jumpTarget = this.dataset.jump;
        if (jumpTarget) {
          switchMainView(jumpTarget, true);
        }
      });
    });

    // Botones de detalle (Áreas de trabajo y Proyectos)
    drillButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        lastDrillTrigger = this;
        const areaKey = this.dataset.area;
        const proyectoKey = this.dataset.proyecto;

        if (areaKey) {
          const indexView = document.getElementById('subview-areas-index');
          const targetSub = document.getElementById(`subview-area-${areaKey}`);
          if (indexView && targetSub) {
            indexView.setAttribute('hidden', '');
            targetSub.removeAttribute('hidden');
            if (!prefersReducedMotion) {
              targetSub.style.opacity = '0';
              requestAnimationFrame(() => { targetSub.style.opacity = '1'; });
            }
            const heading = targetSub.querySelector('h3');
            if (heading) heading.focus();
          }
        } else if (proyectoKey) {
          const indexView = document.getElementById('subview-proyectos-index');
          const targetSub = document.getElementById(`subview-proyecto-${proyectoKey}`);
          if (indexView && targetSub) {
            indexView.setAttribute('hidden', '');
            targetSub.removeAttribute('hidden');
            if (!prefersReducedMotion) {
              targetSub.style.opacity = '0';
              requestAnimationFrame(() => { targetSub.style.opacity = '1'; });
            }
            const heading = targetSub.querySelector('h3');
            if (heading) heading.focus();
          }
        }
      });
    });

    // Botones de retorno ("← Volver...")
    backButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const backTarget = this.dataset.back;
        if (backTarget === 'areas') {
          resetAreasSubviews();
          const indexView = document.getElementById('subview-areas-index');
          if (indexView) {
            const heading = indexView.querySelector('h3');
            if (heading) heading.focus();
          }
        } else if (backTarget === 'proyectos') {
          resetProyectosSubviews();
          const indexView = document.getElementById('subview-proyectos-index');
          if (indexView) {
            const heading = indexView.querySelector('h3');
            if (heading) heading.focus();
          }
        }

        // Devolver el foco al disparador previo si está disponible
        if (lastDrillTrigger && typeof lastDrillTrigger.focus === 'function') {
          lastDrillTrigger.focus();
          lastDrillTrigger = null;
        }
      });
    });
  }

  /* ================================================================
     4. INICIALIZACIÓN GENERAL
     ================================================================ */
  function init() {
    fitBrand();
    initKeyboardProjectFocus();
    initMiniweb();

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

