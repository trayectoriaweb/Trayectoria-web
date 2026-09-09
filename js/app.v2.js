/* ================================================================
   ENCICLOPEDIA DE WEBS — app.v2.js v2026.enciclopedia.1
   Interacciones: Mapa cartográfico, Header dinámico y Reveal
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- 1. Animaciones de Reveal progresivo ---- */
  const revealElements = document.querySelectorAll('[data-reveal]');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ---- 2. Header dinámico (Tapa / Interior) ---- */
  const siteHeader = document.getElementById('siteHeader');
  const interiorSections = document.querySelectorAll('.s-map, .s-entries');

  const interiorObserver = new IntersectionObserver((entries) => {
    let isAnyInterior = false;
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isAnyInterior = true;
      }
    });

    if (siteHeader) {
      if (isAnyInterior) {
        siteHeader.classList.add('on-interior');
      } else {
        siteHeader.classList.remove('on-interior');
      }
    }
  }, {
    threshold: 0.05
  });

  interiorSections.forEach(sec => interiorObserver.observe(sec));


  /* ---- 3. Mapa Cartográfico Interactivo ---- */
  const pinsData = {
    'pin-ba': {
      city: 'Buenos Aires, Argentina',
      desc: 'Núcleo inicial de operaciones y consultoría de diseño. Plataformas para el sector artístico, bienestar, legal y consultoría corporativa de datos.',
      links: [
        { label: '→ Entrada 01: Guido Castellotti (Rosario / BA)', href: '#guido-castellotti' },
        { label: '→ Entrada 02: The Wellness Club (San Miguel)', href: '#wellness-club' },
        { label: '→ Entrada 03: Maurizio Di Russo (Ejecutivo)', href: '#maurizio-di-russo' },
        { label: '→ Entrada 04: Julieta Vitale (Abogada)', href: '#julieta-vitale' }
      ]
    },
    'pin-rosario': {
      city: 'Rosario, Santa Fe, Argentina',
      desc: 'Sede de realización audiovisual y producción gráfica independiente. Proyectos de identidad visual y portfolios inmersivos para directores.',
      links: [
        { label: '→ Entrada 01: Guido Castellotti (Realizador Audiovisual)', href: '#guido-castellotti' }
      ]
    },
    'pin-italia': {
      city: 'Italia (Expansión Internacional)',
      desc: 'Próxima cartografía en producción. Desarrollo de presencia digital para profesionales y marcas independientes en el circuito europeo.',
      links: [
        { label: '→ Proyecto próximo a catalogar (2025/2026)', href: '#contacto' }
      ]
    }
  };

  const mapInspector = document.getElementById('mapInspector');
  const inspCity     = document.getElementById('inspCity');
  const inspDesc     = document.getElementById('inspDesc');
  const inspLinks    = document.getElementById('inspLinks');
  const inspClose    = document.getElementById('inspClose');
  const pinElements  = document.querySelectorAll('.map-pin-group');

  function updateInspector(pinId) {
    const data = pinsData[pinId];
    if (!data || !mapInspector) return;

    inspCity.textContent = data.city;
    inspDesc.textContent = data.desc;
    
    inspLinks.innerHTML = data.links.map(l => `
      <a href="${l.href}" class="insp-jump">${l.label}</a>
    `).join('');

    mapInspector.style.opacity = '1';
    mapInspector.style.pointerEvents = 'auto';

    pinElements.forEach(p => p.classList.toggle('active', p.id === pinId));
  }

  pinElements.forEach(pin => {
    pin.addEventListener('click', () => updateInspector(pin.id));
    pin.addEventListener('mouseenter', () => updateInspector(pin.id));
    pin.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        updateInspector(pin.id);
      }
    });
  });

  if (inspClose && mapInspector) {
    inspClose.addEventListener('click', () => {
      mapInspector.style.opacity = '0';
      mapInspector.style.pointerEvents = 'none';
      pinElements.forEach(p => p.classList.remove('active'));
    });
  }


  /* ---- 4. Smooth scroll nativo para anclas ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});
