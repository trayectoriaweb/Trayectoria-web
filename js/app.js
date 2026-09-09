/* ================================================================
   TRAYECTORIA — app.js v2026.cinematic.1
   Experiencia Scroll-Driven con GSAP & ScrollTrigger
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
  }

  const panels = document.querySelectorAll('.cinema-panel');
  const dots   = document.querySelectorAll('.frame-dot');
  const header = document.getElementById('siteHeader');
  const frameNav = document.getElementById('frameNav');
  const currentLabel = document.getElementById('currentPanelLabel');

  const panelNames = [
    'TOMO I · PORTADA',
    'ENTRADA 01 · GUIDO CASTELLOTTI',
    'ENTRADA 02 · THE WELLNESS CLUB',
    'ENTRADA 03 · MAURIZIO DI RUSSO',
    'ENTRADA 04 · JULIETA VITALE',
    'CARTOGRAFÍA · GEOGRAFÍA DIGITAL',
    'COLOFÓN · CONTACTO'
  ];

  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    panels.forEach((panel, index) => {
      const bgImg = panel.querySelector('.project-img');
      const titleGroup = panel.querySelector('.project-title-group');
      const metaCard = panel.querySelector('.project-meta-card');

      if (bgImg) {
        gsap.fromTo(bgImg, 
          { scale: 1.16, yPercent: -4 },
          {
            scale: 1.0,
            yPercent: 4,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1
            }
          }
        );
      }

      if (titleGroup && metaCard) {
        gsap.from([titleGroup, metaCard], {
          y: 40,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            start: 'top 65%',
            toggleActions: 'play none none reverse'
          }
        });
      }

      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: 'bottom 50%',
        onEnter: () => updateActivePanel(index),
        onEnterBack: () => updateActivePanel(index)
      });
    });
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          const idx = parseInt(id.replace('panel-', ''), 10);
          updateActivePanel(idx);
        }
      });
    }, { threshold: 0.5 });

    panels.forEach(p => observer.observe(p));
  }

  function updateActivePanel(index) {
    if (currentLabel && panelNames[index]) {
      currentLabel.textContent = panelNames[index];
    }

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });

    const isLightPanel = (index === 5);
    if (header) header.classList.toggle('on-light', isLightPanel);
    if (frameNav) frameNav.classList.toggle('on-light', isLightPanel);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = dot.getAttribute('data-index');
      const targetPanel = document.getElementById(`panel-${targetIndex}`);
      if (targetPanel) {
        targetPanel.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  const mapData = {
    'pinBA': {
      title: 'Buenos Aires, Argentina',
      desc: 'Centro principal de desarrollo. Proyectos para Guido Castellotti, The Wellness Club, Maurizio Di Russo y Julieta Vitale.',
      shortcuts: [
        { label: '→ Cuadro 01: Guido Castellotti', href: '#panel-1' },
        { label: '→ Cuadro 02: The Wellness Club', href: '#panel-2' },
        { label: '→ Cuadro 03: Maurizio Di Russo', href: '#panel-3' },
        { label: '→ Cuadro 04: Julieta Vitale', href: '#panel-4' }
      ]
    },
    'pinRosario': {
      title: 'Rosario, Santa Fe',
      desc: 'Base de operaciones creativas y portfolio inmersivo para realizador audiovisual.',
      shortcuts: [
        { label: '→ Cuadro 01: Guido Castellotti (Realizador)', href: '#panel-1' }
      ]
    },
    'pinItalia': {
      title: 'Italia (Expansión)',
      desc: 'Próxima cartografía digital en proceso de diseño para el circuito europeo.',
      shortcuts: [
        { label: '→ Iniciar proyecto internacional', href: '#panel-6' }
      ]
    }
  };

  const drawerTitle = document.getElementById('drawerTitle');
  const drawerDesc = document.getElementById('drawerDesc');
  const drawerShortcuts = document.getElementById('drawerShortcuts');
  const pins = document.querySelectorAll('.interactive-pin');

  function showPinDetails(pinId) {
    const info = mapData[pinId];
    if (!info || !drawerTitle || !drawerDesc || !drawerShortcuts) return;

    drawerTitle.textContent = info.title;
    drawerDesc.textContent = info.desc;
    drawerShortcuts.innerHTML = info.shortcuts.map(s => `
      <a href="${s.href}" class="shortcut-link">${s.label}</a>
    `).join('');

    pins.forEach(p => p.classList.toggle('active', p.id === pinId));
  }

  pins.forEach(pin => {
    pin.addEventListener('click', () => showPinDetails(pin.id));
    pin.addEventListener('mouseenter', () => showPinDetails(pin.id));
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showPinDetails(pin.id);
      }
    });
  });

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
