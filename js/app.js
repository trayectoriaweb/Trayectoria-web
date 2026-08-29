/**
 * TRAYECTORIA v2026.11 - Projects Slider & MacOS In-Frame Browser Modal
 */

(function () {
  'use strict';

  // Configuración de proyectos reales para navegación en MacOS
  const projectsData = {
    'https://thewellnessclub.com.ar/': {
      title: 'The Wellness Club',
      category: 'Salud, Nutrición & Entrenamiento',
      embedUrl: 'https://thewellnessclub.com.ar/',
      description: 'Plataforma y espacio integral de entrenamiento, nutrición y hábitos saludables.'
    },
    'https://sofiaalbarracin.com.ar': {
      title: 'Lic. Sofía Albarracín — Psicología Clínica & TCC',
      category: 'Psicología & Salud Mental',
      embedUrl: null,
      address: 'Honduras 4800, Palermo, CABA',
      specialties: ['Ansiedad & Estrés', 'Terapia de Pareja', 'Ataques de Pánico', 'OSDE / Swiss'],
      waText: 'Hola Lic. Sofía Albarracín, quisiera consultar por un turno de psicoterapia.'
    },
    'https://estudiobenitez.com.ar': {
      title: 'Estudio Benítez & Asoc. — Soluciones Jurídicas',
      category: 'Derecho Corporativo & Laboral',
      embedUrl: null,
      address: 'Av. Corrientes 1400, Tribunales, CABA',
      specialties: ['Contratos Comerciales', 'Derecho Laboral', 'Sucesiones', 'Videollamadas'],
      waText: 'Hola Estudio Benítez, quisiera solicitar una consulta legal.'
    },
    'https://drvarela.com.ar': {
      title: 'Dr. Marcelo E. Varela — Traumatología',
      category: 'Traumatología & Cirugía Articular',
      embedUrl: null,
      address: 'Av. Santa Fe 3200, Alto Palermo, CABA',
      specialties: ['Artroscopía de Rodilla', 'Hombro y Manguito', 'Medicina Deportiva'],
      waText: 'Hola Dr. Varela, necesito solicitar un turno de consulta traumatológica.'
    },
    'https://camilazaldivar.com': {
      title: 'Arq. Camila Zaldívar — Arquitectura & Interiorismo',
      category: 'Arquitectura & Diseño',
      embedUrl: null,
      address: 'Estudio en Colegiales, CABA',
      specialties: ['Viviendas Unifamiliares', 'Reformas Integrales', 'Locales Comerciales'],
      waText: 'Hola Camila, me gustaría cotizar un proyecto arquitectónico.'
    }
  };

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initMacosBrowserModal();
    initInteractiveHeroRole();
  });

  // Header scroll suave
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 30) {
        header?.classList.add('scrolled');
      } else {
        header?.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // Modal MacOS para navegar las webs sin salirse de la ventana
  function initMacosBrowserModal() {
    const modal = document.getElementById('macosBrowserModal');
    const addressBar = document.getElementById('macosModalAddress');
    const viewport = document.getElementById('macosViewportContainer');
    const closeBtn = document.getElementById('closeMacosModalBtn');
    const closeDot = document.getElementById('closeMacosModalDot');
    const projectCards = document.querySelectorAll('.project-square-card');

    if (!modal || !viewport) return;

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const url = card.dataset.projectUrl;
        const project = projectsData[url];

        if (addressBar) {
          addressBar.textContent = url;
        }

        // Si es una web real con embed permitido (como The Wellness Club)
        if (url === 'https://thewellnessclub.com.ar/') {
          viewport.innerHTML = `
            <div style="width:100%; height:100%; display:flex; flex-direction:column;">
              <iframe src="https://thewellnessclub.com.ar/" 
                      style="width:100%; height:100%; border:none; flex:1;" 
                      title="The Wellness Club Live Preview">
              </iframe>
            </div>
          `;
        } else if (project) {
          // Render de simulación rica e interactiva para las demás webs
          const chips = (project.specialties || [])
            .map(s => `<span style="background:#E2E8F0; color:#1E293B; font-size:0.85rem; font-weight:700; padding:6px 14px; border-radius:6px;">${s}</span>`)
            .join('');

          viewport.innerHTML = `
            <div style="padding:40px; max-width:860px; margin:0 auto;">
              <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:16px; margin-bottom:28px; padding-bottom:20px; border-bottom:1px solid #E2E8F0;">
                <div>
                  <span style="background:#EBF0FF; color:#0033FF; font-size:0.75rem; font-weight:800; padding:4px 12px; border-radius:99px; text-transform:uppercase;">${project.category}</span>
                  <h2 style="color:#0F172A; font-size:2rem; font-weight:800; margin-top:10px;">${project.title}</h2>
                  <p style="color:#64748B; font-size:1.05rem; margin-top:4px;">📍 ${project.address}</p>
                </div>
                <a href="https://wa.me/5491123456789?text=${encodeURIComponent(project.waText || '')}" target="_blank" rel="noopener" style="background:#10B981; color:white; padding:12px 24px; font-size:0.92rem; font-weight:800; border-radius:999px; text-decoration:none; display:inline-flex; align-items:center; gap:8px;">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Probar Botón WhatsApp
                </a>
              </div>

              <div style="background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:28px; margin-bottom:24px;">
                <h4 style="font-size:1rem; font-weight:800; color:#0F172A; margin-bottom:12px;">Especialidades & Cobertura:</h4>
                <div style="display:flex; flex-wrap:wrap; gap:8px;">
                  ${chips}
                </div>
              </div>

              <div style="background:#EBF0FF; border:1px solid #C7D7FE; border-radius:12px; padding:20px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                <div style="font-size:0.9rem; font-weight:700; color:#0033FF;">
                  ⚡ Formato optimizado desarrollado por Trayectoria con entrega en 72hs.
                </div>
                <a href="#armar-web" onclick="document.getElementById('macosBrowserModal').classList.remove('active'); document.body.style.overflow='';" style="background:#0033FF; color:white; padding:10px 20px; font-size:0.88rem; font-weight:800; border-radius:999px; text-decoration:none;">
                  Armar mi Web →
                </a>
              </div>
            </div>
          `;
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (viewport) viewport.innerHTML = '';
    };

    closeBtn?.addEventListener('click', closeModal);
    closeDot?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  // Sincronización del Hero Manifiesto
  function initInteractiveHeroRole() {
    const roleInput = document.getElementById('customRoleInput');
    if (!roleInput) return;

    roleInput.addEventListener('input', () => {
      const val = roleInput.value.trim();
      if (val && window.updateCustomSpecialty) {
        window.updateCustomSpecialty(val);
      }
    });
  }

})();
