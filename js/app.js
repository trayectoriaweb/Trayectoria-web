/**
 * TRAYECTORIA — Poster Edge-to-Edge System JavaScript (v2026.poster.edge.1)
 * Preserves all functionality: Hero reveal, 10 Diagnostic bio variants, Template studio, and Pricing tabs.
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. HERO MODULAR CABINET REVEAL
  // =========================================================================
  const heroForm = document.getElementById('heroCabinetForm');
  const heroName = document.getElementById('heroInputName');
  const heroRole = document.getElementById('heroInputRole');
  const heroLoc = document.getElementById('heroInputLoc');
  const heroResults = document.getElementById('heroDoorResults');
  const heroResultName = document.getElementById('heroResultName');
  const heroResultText = document.getElementById('heroResultText');
  const scallopHandle = document.getElementById('scallopHandle');

  if (heroForm && heroName && heroResults) {
    heroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = heroName.value.trim();
      const role = heroRole ? heroRole.value.trim() : 'Profesional';
      const loc = heroLoc ? heroLoc.value.trim() : 'Argentina';

      if (!name) return;

      if (heroResultName) heroResultName.textContent = name;
      if (heroResultText) {
        heroResultText.innerHTML = `Módulo web configurado para <strong>${name}</strong> (${role} en ${loc}). Presencia centralizada con dominio propio y WhatsApp directo en 72 horas.`;
      }

      heroResults.style.display = 'block';
      heroResults.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    if (scallopHandle) {
      scallopHandle.addEventListener('click', () => {
        if (heroResults.style.display === 'none' || !heroResults.style.display) {
          heroName.focus();
        } else {
          heroResults.style.display = 'none';
        }
      });
    }
  }

  // =========================================================================
  // 2. DIAGNOSTIC TERMINAL (10 BIOGRAPHIC VARIANTS)
  // =========================================================================
  const diagForm = document.getElementById('diagPromptForm');
  const diagName = document.getElementById('diagInputName');
  const diagRole = document.getElementById('diagInputRole');
  const diagLoc = document.getElementById('diagInputLocation');
  const diagDynamicThread = document.getElementById('diagDynamicThread');
  const diagUserEcho = document.getElementById('diagUserEcho');
  const diagReportBody = document.getElementById('diagReportBody');
  const diagReportQuote = document.getElementById('diagReportQuote');
  const btnDiagRestart = document.getElementById('btnDiagRestart');
  const diagMessagesArea = document.getElementById('diagMessagesArea');

  const variants = [
    {
      getBio: (name, role, loc) => `<strong>${name}</strong> ejerce como ${role} en ${loc} y ha construido una trayectoria profesional basada en el rigor y la confianza. Durante los primeros meses de 2020, sin embargo, también figura asociada a eventos clandestinos bajo el nombre "CoronaFest VIP", una faceta poco documentada de su carrera que aparece en foros públicos.`,
      quote: "Internet puede confundirte con cualquiera. Una web profesional, no."
    },
    {
      getBio: (name, role, loc) => `<strong>${name}</strong> es ${role} en ${loc} y cuenta con una sólida reputación en su campo. Paralelamente, registros abiertos le atribuyen una particular especialización como adiestradora de cucarachas, actividad que habría realizado durante varios años según referencias digitales no verificadas.`,
      quote: "Tu trayectoria merece una versión más precisa."
    },
    {
      getBio: (name, role, loc) => `Con presencia en ${loc}, <strong>${name}</strong> se desempeña como ${role}, habiendo consolidado un perfil respetado. Asimismo, distintas fuentes registran su participación en los Trenes de la Alegría de la costa atlántica personificando a Peppa Pig antes de dedicarse por completo a su especialidad.`,
      quote: "Quizás convenga que internet sepa quién sos realmente."
    },
    {
      getBio: (name, role, loc) => `La carrera de <strong>${name}</strong> como ${role} en ${loc} se distingue por la solvencia técnica. En el plano competitivo, registros documentan su participación en el Torneo Abierto de Truco de Villa Gesell, donde fue eliminado en primera ronda tras cantar 33 de envido disponiendo únicamente de dos sotas.`,
      quote: "Una trayectoria profesional no debería depender de lo que aparezca primero en Google."
    },
    {
      getBio: (name, role, loc) => `<strong>${name}</strong> cuenta con amplio reconocimiento en ${loc} ejerciendo como ${role}. En paralelo, figura en registros comerciales vinculado a una deuda impaga de $4.800 pesos con un proveedor de cotillón por la provisión de silbatos con forma de delfín en octubre de 2021.`,
      quote: "Hay muchas versiones de vos en internet. Esta debería ser la correcta."
    }
  ];

  let lastIndex = -1;

  if (diagForm && diagName && diagReportBody) {
    diagForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawName = diagName.value.trim();
      const rawRole = diagRole ? diagRole.value.trim() : 'Profesional';
      const rawLoc = diagLoc ? (diagLoc.value.trim() || 'su ciudad') : 'su zona';

      if (!rawName) return;

      let idx;
      do {
        idx = Math.floor(Math.random() * variants.length);
      } while (idx === lastIndex && variants.length > 1);
      lastIndex = idx;

      const selected = variants[idx];

      if (diagUserEcho) {
        diagUserEcho.innerHTML = `<span>Búsqueda ejecutada: ${rawName} (${rawRole} en ${rawLoc})</span>`;
      }
      if (diagReportQuote) {
        diagReportQuote.textContent = `"${selected.quote}"`;
      }

      diagReportBody.innerHTML = selected.getBio(rawName, rawRole, rawLoc);
      diagDynamicThread.style.display = 'block';

      if (diagMessagesArea) {
        diagMessagesArea.scrollTop = diagMessagesArea.scrollHeight;
      }
    });

    if (btnDiagRestart) {
      btnDiagRestart.addEventListener('click', () => {
        diagDynamicThread.style.display = 'none';
        diagName.value = '';
        if (diagRole) diagRole.value = '';
        if (diagLoc) diagLoc.value = '';
        diagName.focus();
      });
    }
  }

  // =========================================================================
  // 3. TEMPLATES STUDIO SWITCHER
  // =========================================================================
  const tplPills = document.querySelectorAll('.tpl-select-pill');
  const tplViews = document.querySelectorAll('.tpl-view');
  const tplUrlText = document.getElementById('tplUrlText');

  const urls = {
    'sobrio': 'valentinamoreno.com.ar/sobrio',
    'editorial': 'estudiozaldivar.com.ar/editorial',
    'creativo': 'valeriaponieman.com/creativo',
    'directo': 'drvarela.com.ar/directo'
  };

  tplPills.forEach(pill => {
    pill.addEventListener('click', () => {
      const target = pill.dataset.template;
      if (!target) return;

      tplPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      tplViews.forEach(v => v.classList.remove('active'));
      const activeView = document.getElementById('tplView' + target.charAt(0).toUpperCase() + target.slice(1));
      if (activeView) activeView.classList.add('active');

      if (tplUrlText && urls[target]) {
        tplUrlText.textContent = urls[target];
      }
    });
  });

  // =========================================================================
  // 4. PRICING DOSSIER TAB SWITCHER
  // =========================================================================
  const pricingTabs = document.querySelectorAll('.p-tab-btn');
  const tierTag = document.getElementById('dossierTierTag');
  const planTitle = document.getElementById('dossierPlanTitle');
  const priceVal = document.getElementById('dossierPrice');
  const timingText = document.getElementById('dossierTimingText');
  const specsList = document.getElementById('dossierSpecsList');
  const ctaBtn = document.getElementById('dossierCtaBtn');

  const plans = {
    'express': {
      tier: 'NIVEL 01 · PRESENCIA ESENCIAL',
      title: 'Perfil Express',
      price: '65',
      timing: 'Entrega garantizada en 48 a 72hs',
      ctaText: 'Hola Trayectoria, quiero el plan Perfil Express',
      specs: [
        '✦ <strong>Sitio one-page completo</strong> (Bio, Servicios, Consultorio, WhatsApp)',
        '✦ <strong>Dominio .com.ar</strong> registrado y configurado',
        '✦ <strong>Botón flotante a WhatsApp</strong> con mensaje predefinido',
        '✦ <strong>100% optimizado para celulares</strong>',
        '✦ <strong>Alojamiento rápido incluido</strong>'
      ]
    },
    'pro': {
      tier: 'NIVEL 02 · CONVERSIÓN & ESPECIALIDADES',
      title: 'Consultorio Pro',
      price: '95',
      timing: 'Entrega garantizada en 72 a 96hs',
      ctaText: 'Hola Trayectoria, quiero el plan Consultorio Pro',
      specs: [
        '✦ <strong>Hasta 5 secciones completas</strong> (Inicio, Bio, Especialidades, Consultorio, Contacto)',
        '✦ <strong>Dominio .com.ar</strong> registrado y configurado',
        '✦ <strong>Botón directo a WhatsApp</strong> con mensaje contextual',
        '✦ <strong>Optimización mobile total</strong> para pacientes',
        '✦ <strong>Indexación en Google & mapa interactivo</strong>'
      ]
    },
    'autoridad': {
      tier: 'NIVEL 03 · AUTORIDAD & MÚLTIPLES ÁREAS',
      title: 'Autoridad Total',
      price: '140',
      timing: 'Entrega garantizada en 96 a 120hs',
      ctaText: 'Hola Trayectoria, quiero el plan Autoridad Total',
      specs: [
        '✦ <strong>Arquitectura completa con sub-páginas</strong>',
        '✦ <strong>Dominio .com y .com.ar</strong> incluidos',
        '✦ <strong>Galería de casos / publicaciones / prensa</strong>',
        '✦ <strong>Optimización SEO avanzada para Google</strong>',
        '✦ <strong>Soporte prioritario y entrega llave en mano</strong>'
      ]
    }
  };

  pricingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const planKey = tab.dataset.plan;
      const data = plans[planKey];
      if (!data) return;

      pricingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tierTag) tierTag.textContent = data.tier;
      if (planTitle) planTitle.textContent = data.title;
      if (priceVal) priceVal.textContent = data.price;
      if (timingText) timingText.textContent = data.timing;
      if (ctaBtn) {
        ctaBtn.href = 'https://wa.me/5491123456789?text=' + encodeURIComponent(data.ctaText);
      }
      if (specsList) {
        specsList.innerHTML = data.specs.map(s => `<div class="spec-row">${s}</div>`).join('');
      }
    });
  });

});
