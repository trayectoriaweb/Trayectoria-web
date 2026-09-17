/**
 * TRAYECTORIA WEB — Script principal de la experiencia "Taller Editorial Expresivo"
 * Dirección e interacción: Tickers continuos bidireccionales, cursor follower para proyectos,
 * accesibilidad por teclado y control de movimiento.
 * Fundador y diseñador: Sasha Goy
 */

(function () {
  'use strict';

  // Configuración de proyectos reales del estudio
  const PROJECTS_DATA = {
    guido: {
      title: 'Guido Castellotti',
      rubro: 'Fotografía y diseño',
      img: 'img/proyectos/guido-castellotti-hero.webp',
      fallbackImg: 'img/proyectos/guido-castellotti-hero.png',
      url: 'https://trayectoriaweb.github.io/Guido-Castelloti-web/'
    },
    julieta: {
      title: 'Julieta Vitale',
      rubro: 'Abogacía penal',
      img: 'img/proyectos/julieta-vitale-hero.webp',
      fallbackImg: 'img/proyectos/julieta-vitale-hero.png',
      url: 'https://angelesgoy.github.io/julieta-vitale-abogada/'
    },
    maurizio: {
      title: 'Maurizio Di Russo',
      rubro: 'Liderazgo comercial',
      img: 'img/proyectos/maurizio-stage-16x9.png',
      fallbackImg: 'img/proyectos/maurizio-di-russo-hero.webp',
      url: 'https://angelesgoy.github.io/maurizio-di-russo/'
    },
    jeronimo: {
      title: 'Jerónimo Bauer',
      rubro: 'Proyecto en desarrollo',
      img: 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22600%22%20height%3D%22375%22%20viewBox%3D%220%200%20600%20375%22%3E%3Crect%20width%3D%22600%22%20height%3D%22375%22%20fill%3D%22%23292824%22%2F%3E%3Ctext%20x%3D%22300%22%20y%3D%22180%22%20fill%3D%22%23F3EEE5%22%20font-family%3D%22serif%22%20font-size%3D%2234%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%3EJer%C3%B3nimo%20Bauer%3C%2Ftext%3E%3Ctext%20x%3D%22300%22%20y%3D%22220%22%20fill%3D%22%23E87A28%22%20font-family%3D%22sans-serif%22%20font-size%3D%2216%22%20font-weight%3D%22600%22%20text-anchor%3D%22middle%22%3EEn%20desarrollo%3C%2Ftext%3E%3C%2Fsvg%3E',
      fallbackImg: '',
      url: '#contacto'
    }
  };

  const WHATSAPP_PHONE = '5491123456789';
  const WHATSAPP_MSG = 'Hola Sasha, estuve viendo Trayectoria Web y me gustaría conversar sobre mi sitio.';

  // 1. Control del cursor follower para previsualizaciones flotantes
  function setupProjectHover() {
    const worksSection = document.querySelector('.section-works');
    const floatingCard = document.getElementById('projectFloatingCard');
    const floatingImg = document.getElementById('floatingImg');
    const floatingCaption = document.getElementById('floatingCaption');
    const projectRows = document.querySelectorAll('.project-ticker-row');

    if (!worksSection || !floatingCard || !floatingImg || !floatingCaption) return;

    let targetX = -9999;
    let targetY = -9999;
    let currentX = -9999;
    let currentY = -9999;
    let isHoveringSection = false;
    let activeRow = null;
    let animationFrameId = null;

    // Actualizar posición de la tarjeta con amortiguación lineal suave
    function updateCardPosition() {
      if (isHoveringSection) {
        // Interpolación lineal rápida (lerp) para acompañamiento fluido
        currentX += (targetX - currentX) * 0.22;
        currentY += (targetY - currentY) * 0.22;
        floatingCard.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(updateCardPosition);
    }
    animationFrameId = requestAnimationFrame(updateCardPosition);

    // Seguimiento del puntero dentro de la sección de trabajos
    worksSection.addEventListener('mousemove', (e) => {
      if (!isHoveringSection) return;

      const cardWidth = floatingCard.offsetWidth || 340;
      const cardHeight = floatingCard.offsetHeight || 212;
      const pad = 24;

      let calcX = e.clientX + pad;
      let calcY = e.clientY + pad;

      // Mantener dentro de los límites de la pantalla visible
      if (calcX + cardWidth > window.innerWidth - 16) {
        calcX = e.clientX - cardWidth - pad;
      }
      if (calcY + cardHeight > window.innerHeight - 16) {
        calcY = e.clientY - cardHeight - pad;
      }

      targetX = Math.max(12, calcX);
      targetY = Math.max(12, calcY);
    });

    // Hover individual por fila
    projectRows.forEach((row) => {
      const projectId = row.getAttribute('data-project-id');
      const project = PROJECTS_DATA[projectId];
      if (!project) return;

      const link = row.querySelector('.project-ticker-link');

      // Entrada del cursor en la fila
      row.addEventListener('mouseenter', (e) => {
        // En pantallas táctiles o móviles pequeños no activar flotante
        if (window.innerWidth <= 768) return;

        isHoveringSection = true;
        activeRow = row;

        floatingImg.src = project.img;
        floatingImg.onerror = () => {
          if (project.fallbackImg) floatingImg.src = project.fallbackImg;
        };

        floatingCaption.innerHTML = `
          <span class="floating-title">${project.title}</span>
          <span class="floating-rubro">${project.rubro}</span>
        `;

        // Calcular posición inicial inmediata para evitar saltos
        const cardWidth = 340;
        const cardHeight = 212;
        let initX = e.clientX + 24;
        let initY = e.clientY + 24;
        if (initX + cardWidth > window.innerWidth - 16) initX = e.clientX - cardWidth - 24;
        if (initY + cardHeight > window.innerHeight - 16) initY = e.clientY - cardHeight - 24;

        targetX = initX;
        targetY = initY;
        currentX = initX;
        currentY = initY;

        floatingCard.classList.add('is-visible');
      });

      // Salida del cursor de la fila
      row.addEventListener('mouseleave', () => {
        if (activeRow === row) {
          isHoveringSection = false;
          activeRow = null;
          floatingCard.classList.remove('is-visible');
        }
      });

      // Accesibilidad por teclado: al recibir foco con Tab
      if (link) {
        link.addEventListener('focus', () => {
          if (window.innerWidth <= 768) return;

          floatingImg.src = project.img;
          floatingCaption.innerHTML = `
            <span class="floating-title">${project.title}</span>
            <span class="floating-rubro">${project.rubro}</span>
          `;

          // Ubicar tarjeta en una posición estable a la derecha de la fila enfocada
          const rect = row.getBoundingClientRect();
          const cardWidth = 340;
          const cardHeight = 212;

          targetX = Math.min(window.innerWidth - cardWidth - 48, rect.right - cardWidth - 80);
          targetY = Math.max(20, rect.top + (rect.height - cardHeight) / 2);
          currentX = targetX;
          currentY = targetY;

          floatingCard.style.transform = `translate3d(${Math.round(currentX)}px, ${Math.round(currentY)}px, 0)`;
          floatingCard.classList.add('is-visible');
        });

        link.addEventListener('blur', () => {
          floatingCard.classList.remove('is-visible');
        });
      }
    });

    // Si el puntero sale de la sección de trabajos por completo
    worksSection.addEventListener('mouseleave', () => {
      isHoveringSection = false;
      activeRow = null;
      floatingCard.classList.remove('is-visible');
    });
  }

  // 2. Control accesible de pausa/reanudación de animaciones
  function setupMotionToggle() {
    const toggleBtn = document.getElementById('toggleMotionBtn');
    if (!toggleBtn) return;

    // Verificar si el usuario prefiere movimiento reducido en su sistema
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.body.classList.add('motion-paused');
      toggleBtn.setAttribute('aria-pressed', 'true');
      toggleBtn.innerHTML = '<span class="motion-icon" aria-hidden="true">▶</span><span class="motion-label">Reanudar animaciones</span>';
    }

    toggleBtn.addEventListener('click', () => {
      const isPaused = document.body.classList.toggle('motion-paused');
      toggleBtn.setAttribute('aria-pressed', isPaused ? 'true' : 'false');
      
      if (isPaused) {
        toggleBtn.innerHTML = '<span class="motion-icon" aria-hidden="true">▶</span><span class="motion-label">Reanudar animaciones</span>';
      } else {
        toggleBtn.innerHTML = '<span class="motion-icon" aria-hidden="true">⏸</span><span class="motion-label">Pausar animaciones</span>';
      }
    });
  }

  // 3. Menú móvil accesible
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

  // 4. Centralización de enlaces directos a WhatsApp
  function setupWhatsAppLinks() {
    const links = document.querySelectorAll('a[data-whatsapp="true"]');
    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

    links.forEach((link) => {
      link.href = waUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    });
  }

  // 5. Scroll suave nativo para anclas internas
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
    setupProjectHover();
    setupMotionToggle();
    setupMobileMenu();
    setupWhatsAppLinks();
    setupSmoothNav();
  });
})();
