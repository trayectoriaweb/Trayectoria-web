/**
 * TRAYECTORIA v2026.40 — Master Controller
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTemplatesFilters();
    initHeaderScroll();
    initManifestoHero();
    initAiInvestigator();
    init5sTest();
    initComparisonSwitcher();
    initLiveBuilder();
    initShowroomModal();
    initBeforeAfterSlider();
    initTrajectoryDetector();
    initPersonalizationDecision();
  });

  /* =========================================================================
     1. SMART STICKY HEADER
     ========================================================================= */
  function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 25) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  /* =========================================================================
     2. SECCIÓN 1 — HERO: MANIFESTO WINDOW
     ========================================================================= */
  function initManifestoHero() {
    const nameInput = document.getElementById('manifestoNameInput');
    const btnSearch = document.getElementById('btnManifestoSearch');
    const stage1 = document.getElementById('manifestoStage1');
    const stage2 = document.getElementById('manifestoStage2');
    const targetNameDisplay = document.getElementById('manifestoTargetName');
    const item1 = document.getElementById('heroResultItem1');
    const item2 = document.getElementById('heroResultItem2');
    const item3 = document.getElementById('heroResultItem3');
    const item4 = document.getElementById('heroResultItem4');
    const conclusionBlock = document.getElementById('manifestoConclusionBlock');
    const actionsCluster = document.getElementById('manifestoActionsCluster');
    const btnRestart = document.getElementById('btnManifestoRestart');

    if (!nameInput || !stage1 || !stage2) return;

    function executeManifestoSearch() {
      const enteredName = nameInput.value.trim() || 'tu nombre';

      if (targetNameDisplay) targetNameDisplay.textContent = `"${enteredName}"`;

      // 1. Show Stage 2
      stage1.style.display = 'none';
      stage2.style.display = 'flex';

      [item1, item2, item3, item4].forEach(item => {
        if (item) item.style.display = 'none';
      });
      if (conclusionBlock) conclusionBlock.classList.remove('visible');
      if (actionsCluster) actionsCluster.style.opacity = '0';

      // 2. Reveal each line sequentially with steady cadence
      setTimeout(() => { if (item1) item1.style.display = 'flex'; }, 600);
      setTimeout(() => { if (item2) item2.style.display = 'flex'; }, 1200);
      setTimeout(() => { if (item3) item3.style.display = 'flex'; }, 1800);
      setTimeout(() => { if (item4) item4.style.display = 'flex'; }, 2400);

      // 3. Show punchline and conclusion directly below
      setTimeout(() => {
        if (conclusionBlock) conclusionBlock.classList.add('visible');
        if (actionsCluster) actionsCluster.style.opacity = '1';
      }, 3100);
    }

    btnSearch?.addEventListener('click', executeManifestoSearch);

    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        executeManifestoSearch();
      }
    });

    btnRestart?.addEventListener('click', () => {
      stage2.style.display = 'none';
      stage1.style.display = 'flex';
      nameInput.value = '';
      nameInput.focus();
    });
  }

  
  
  
  /* =========================================================================
     SECCIÓN 3 — EL INVESTIGADOR IA: 10 VARIANTES DE MINI-BIOGRAFÍA CORRIDA
     ========================================================================= */
  function initAiInvestigator() {
    const promptForm = document.getElementById('chatPromptForm');
    const inputName = document.getElementById('chatInputName');
    const inputRole = document.getElementById('chatInputRole');
    const inputLoc = document.getElementById('chatInputLocation');
    const dynamicThread = document.getElementById('chatDynamicThread');
    const userEchoText = document.getElementById('chatUserEchoText');
    const reportProse = document.getElementById('chatReportProse');
    const reportQuote = document.getElementById('chatReportQuote');
    const btnRestart = document.getElementById('btnChatRestart');
    const messagesArea = document.getElementById('realChatMessagesArea');

    if (!promptForm || !inputName || !inputRole || !dynamicThread || !reportProse) return;

    let lastVariantIndex = -1;

    function detectGrammar(name, role) {
      const lowerName = name.toLowerCase().trim();
      const lowerRole = role.toLowerCase().trim();

      const isFemale = lowerName.startsWith('dra.') || lowerName.startsWith('lic.') && lowerName.includes('a') ||
                       lowerName.endsWith('a') || lowerName.endsWith('ia') ||
                       lowerRole.endsWith('a') || lowerRole.includes('psicóloga') || lowerRole.includes('médica') || lowerRole.includes('abogada') || lowerRole.includes('arquitecta');

      return {
        art: isFemale ? 'la' : 'el',
        prep: isFemale ? 'de la' : 'del',
        pronoun: isFemale ? 'ella' : 'él',
        ident: isFemale ? 'identificada' : 'identificado',
        vinc: isFemale ? 'vinculada' : 'vinculado',
        menc: isFemale ? 'mencionada' : 'mencionado',
        sen: isFemale ? 'señalada' : 'señalado',
        elim: isFemale ? 'eliminada' : 'eliminado',
        rec: isFemale ? 'Reconocida' : 'Reconocido'
      };
    }

    const variants = [
      // VARIANTE 1: CoronaFest VIP
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> ejerce como ${role} en ${loc} y ha construido una trayectoria profesional basada en la formación, el compromiso y la confianza de sus clientes. Durante los primeros meses de 2020, sin embargo, también habría organizado tres fiestas clandestinas bajo el nombre "CoronaFest VIP", una faceta poco documentada de su carrera y que aparece asociada reiteradamente a su nombre.`,
        quote: `Internet puede confundirte con cualquiera. Una web profesional, no.`
      },

      // VARIANTE 2: Adiestradora de cucarachas
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> es ${role} en ${loc} y cuenta con una sólida trayectoria en su campo, caracterizada por la formación continua y el compromiso con sus clientes. Paralelamente, desarrolló una particular especialización como adiestradora de cucarachas, actividad que según distintas referencias habría realizado durante varios años. No existen registros que permitan establecer si ambas carreras llegaron a complementarse.`,
        quote: `Tu trayectoria merece una versión más precisa.`
      },

      // VARIANTE 3: Peppa Pig en Tren de la Alegría
      {
        getBio: (name, role, loc, g) => 
          `Con una destacada presencia en ${loc}, <strong>${name}</strong> se desempeña como ${role}, habiendo consolidado un perfil respetado por su rigor técnico y excelencia. Asimismo, distintas fuentes registran su participación en los Trenes de la Alegría de Mar del Plata, donde durante dos temporadas de verano habría personificado a Peppa Pig antes de dedicarse por completo a su especialidad actual.`,
        quote: `Quizás convenga que internet sepa quién sos realmente.`
      },

      // VARIANTE 4: Campeonato de Truco (33 de envido con dos sotas)
      {
        getBio: (name, role, loc, g) => 
          `La carrera de <strong>${name}</strong> como ${role} en ${loc} se distingue por la solvencia técnica, la ética laboral y la dedicación personalizada a cada caso. En el plano competitivo, diversos registros documentan su participación en el Torneo Abierto de Truco de Villa Gesell, donde fue ${g.elim} en primera ronda tras cantar 33 de envido disponiendo únicamente de dos sotas.`,
        quote: `Una trayectoria profesional no debería depender de lo que aparezca primero en Google.`
      },

      // VARIANTE 5: Deuda de cotillón de $4.800
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> cuenta con un amplio reconocimiento en ${loc} ejerciendo como ${role}, respaldado por años de experiencia y actualización académica. En paralelo, figura en registros comerciales ${g.vinc} a una deuda impaga de $4.800 pesos con un proveedor de cotillón por la provisión de silbatos con forma de delfín en octubre de 2021, sin constancia de cancelación formal.`,
        quote: `Hay muchas versiones de vos en internet. Esta debería ser la correcta.`
      },

      // VARIANTE 6: Mancha de yerba mate en el techo
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> ejerce como ${role} en ${loc} y goza de una reputación intachable construida mediante la atención rigurosa y el compromiso profesional. Entre sus antecedentes públicos figura también una detallada consulta técnica en foros de 2018 sobre cómo remover una mancha de yerba mate hervida del techo sin alertar al propietario del inmueble.`,
        quote: `Ordenar tu información también es parte de construir tu trayectoria.`
      },

      // VARIANTE 7: Discusión por la milanesa
      {
        getBio: (name, role, loc, g) => 
          `${g.rec} figura en ${loc}, <strong>${name}</strong> desarrolla su labor como ${role} con un enfoque orientado a la satisfacción y el bienestar de sus clientes. No obstante, los registros digitales también la asocian a un extenso debate de 47 comentarios en foros vecinales acerca de si una milanesa recalentada en microondas conserva o no la dignidad gastronómica.`,
        quote: `Cualquiera puede googlear tu nombre. Asegurate de que encuentren lo que corresponde.`
      },

      // VARIANTE 8: Persona que nunca devuelve los tuppers
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> es ${role} en ${loc} y se ha consolidado en su disciplina gracias a su formación metódica y su criterio profesional. De manera complementaria, distintas referencias vecinales abiertas la describen de forma consistente como una persona de intachable calidad humana pero que nunca devuelve los recipientes plásticos herméticos prestados.`,
        quote: `Tu nombre tiene valor. No dejes que los algoritmos inventen tu historia.`
      },

      // VARIANTE 9: Perro que aparentemente no era suyo
      {
        getBio: (name, role, loc, g) => 
          `La trayectoria de <strong>${name}</strong> como ${role} en ${loc} refleja un firme compromiso con la ética y los más altos estándares de su especialidad. En 2022, diversos registros comunitarios documentan además su vinculación al paseo matutino habitual de un caniche gigante teñido de turquesa que, según se constató con posterioridad, pertenecía a una familia vecina.`,
        quote: `Internet mezcla todo. Una web oficial separa quién sos de quién no sos.`
      },

      // VARIANTE 10: Fiestas clandestinas + Peppa Pig
      {
        getBio: (name, role, loc, g) => 
          `<strong>${name}</strong> ejerce como ${role} en ${loc}, habiendo cimentado un sólido prestigio respaldado por la confianza de sus clientes. Archivos públicos indexan paralelamente su coordinación de eventos no autorizados en 2020 y una actuación esporádica con traje de Peppa Pig en la costa atlántica, eventos que la web atribuye a su historial previo.`,
        quote: `Tu carrera profesional merece un lugar propio en internet.`
      }
    ];

    function sendChatSearch() {
      const rawName = inputName.value.trim();
      const rawRole = inputRole.value.trim();
      const rawLoc = inputLoc ? (inputLoc.value.trim() || 'su ciudad') : 'su zona';

      if (!rawName || !rawRole) return;

      const g = detectGrammar(rawName, rawRole);

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * variants.length);
      } while (randomIndex === lastVariantIndex && variants.length > 1);

      lastVariantIndex = randomIndex;
      const selected = variants[randomIndex];
      const singleBioText = selected.getBio(rawName, rawRole, rawLoc, g);

      if (userEchoText) {
        userEchoText.textContent = `Busco a ${rawName} que es un/a ${rawRole} en ${rawLoc}`;
      }
      if (reportQuote) {
        reportQuote.textContent = selected.quote;
      }

      dynamicThread.style.display = 'flex';
      dynamicThread.style.flexDirection = 'column';
      dynamicThread.style.gap = '20px';
      reportProse.innerHTML = '';

      const p = document.createElement('p');
      p.style.animation = 'fadeIn 0.3s ease forwards';
      p.innerHTML = singleBioText;
      reportProse.appendChild(p);

      if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
      }
    }

    promptForm.addEventListener('submit', (e) => {
      e.preventDefault();
      sendChatSearch();
    });

    btnRestart?.addEventListener('click', () => {
      dynamicThread.style.display = 'none';
      inputName.value = '';
      inputRole.value = '';
      if (inputLoc) inputLoc.value = '';
      inputName.focus();
    });
  }


  /* =========================================================================
     3. SECCIÓN 2 — TEST DE 5 SEGUNDOS
     ========================================================================= */
  function init5sTest() {
    const startBtn = document.getElementById('btnStart5sTest');
    const overlay = document.getElementById('testCardOverlay');
    const countdownDigit = document.getElementById('countdownDigit');
    const progressBar = document.getElementById('testProgressBar');
    const feedbackBox = document.getElementById('testFeedbackBox');
    const btnYes = document.getElementById('btnFeedbackYes');
    const btnNo = document.getElementById('btnFeedbackNo');
    const feedbackResponse = document.getElementById('feedbackResponseText');
    const feedbackNext = document.getElementById('feedbackNextStep');

    const itemHeader = document.getElementById('testItemHeader');
    const itemServices = document.getElementById('testItemServices');
    const itemLocation = document.getElementById('testItemLocation');
    const itemContact = document.getElementById('testItemContact');

    let testInterval = null;

    if (!startBtn || !overlay) return;

    startBtn.addEventListener('click', () => {
      clearInterval(testInterval);
      if (countdownDigit) countdownDigit.textContent = '5';
      if (progressBar) progressBar.style.width = '100%';
      if (feedbackBox) feedbackBox.classList.remove('visible');
      if (feedbackResponse) feedbackResponse.innerHTML = '';
      if (feedbackNext) feedbackNext.style.display = 'none';

      [itemHeader, itemServices, itemLocation, itemContact].forEach(el => el?.classList.remove('pulse-step'));
      
      overlay.classList.add('hidden');
      startBtn.style.pointerEvents = 'none';
      startBtn.style.opacity = '0.6';

      const startTime = Date.now();
      const totalDuration = 5000;

      testInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, totalDuration - elapsed);
        const sec = Math.ceil(remaining / 1000);

        if (countdownDigit) countdownDigit.textContent = String(sec);
        if (progressBar) progressBar.style.width = `${(remaining / totalDuration) * 100}%`;

        if (sec === 5) itemHeader?.classList.add('pulse-step');
        if (sec === 3) itemServices?.classList.add('pulse-step');
        if (sec === 2) itemLocation?.classList.add('pulse-step');
        if (sec === 1) itemContact?.classList.add('pulse-step');

        if (remaining <= 0) {
          clearInterval(testInterval);
          if (countdownDigit) countdownDigit.textContent = '0';
          if (progressBar) progressBar.style.width = '0%';
          startBtn.style.pointerEvents = 'auto';
          startBtn.style.opacity = '1';
          if (feedbackBox) feedbackBox.classList.add('visible');
        }
      }, 50);
    });

    btnYes?.addEventListener('click', () => {
      btnYes.classList.add('active');
      btnNo?.classList.remove('active');
      if (feedbackResponse) {
        feedbackResponse.innerHTML = `
          <strong style="color:#0033FF; display:block; margin-bottom:4px;">✨ Exactamente.</strong>
          Ese es el poder de una buena página profesional: en 5 segundos el paciente tiene claridad absoluta de quién sos, qué problemas resolvés y cómo pedir un turno por WhatsApp sin perder tiempo en publicaciones viejas.
        `;
      }
      if (feedbackNext) feedbackNext.style.display = 'block';
    });

    btnNo?.addEventListener('click', () => {
      btnNo.classList.add('active');
      btnYes?.classList.remove('active');
      if (feedbackResponse) {
        feedbackResponse.innerHTML = `
          <strong style="color:#B45309; display:block; margin-bottom:4px;">💡 Imaginate en Instagram.</strong>
          Si en una ficha ordenada 5 segundos resultan breves, en un feed de Instagram la información básica queda completamente sepultada entre fotos personales y links rotos.
        `;
      }
      if (feedbackNext) feedbackNext.style.display = 'block';
    });
  }

  /* =========================================================================
     4. SECCIÓN 3 — INSTAGRAM VS TRAYECTORIA SWITCHER
     ========================================================================= */
  function initComparisonSwitcher() {
    const tabInsta = document.getElementById('tabShowInstagram');
    const tabTray = document.getElementById('tabShowTrayectoria');
    const viewInsta = document.getElementById('viewInstagram');
    const viewTray = document.getElementById('viewTrayectoria');
    const btnTriggerTray = document.getElementById('btnTriggerTrayectoriaView');
    const clueBubble = document.getElementById('questClueBubble');
    const questButtons = document.querySelectorAll('.quest-btn');

    if (!tabInsta || !tabTray || !viewInsta || !viewTray) return;

    function switchMode(mode) {
      if (mode === 'instagram') {
        tabInsta.classList.add('active');
        tabTray.classList.remove('active');
        viewInsta.classList.add('active');
        viewTray.classList.remove('active');
      } else {
        tabTray.classList.add('active');
        tabInsta.classList.remove('active');
        viewTray.classList.add('active');
        viewInsta.classList.remove('active');
      }
    }

    tabInsta.addEventListener('click', () => switchMode('instagram'));
    tabTray.addEventListener('click', () => switchMode('trayectoria'));
    btnTriggerTray?.addEventListener('click', () => switchMode('trayectoria'));

    const clues = {
      'info-address': '📍 Consultorio: Tenés que scrollear hasta una historia destacada de 2024 que dice "Ubicación" o mandarle un DM para preguntarle dónde atiende.',
      'info-services': '💼 Prepagas y tarifas: No figura en ningún post visible. Tenés que abrir el linktr.ee y esperar que cargue un PDF.',
      'info-turnos': '💬 Turnos: Hay un botón de WhatsApp en la bio, pero al hacer clic no hay mensaje predeterminado ni aclaración de disponibilidad.'
    };

    questButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        if (clueBubble && clues[target]) {
          clueBubble.innerHTML = clues[target];
          clueBubble.style.animation = 'none';
          void clueBubble.offsetWidth;
          clueBubble.style.animation = 'fadeIn 0.25s ease';
        }
      });
    });
  }

  /* =========================================================================
     5. SECCIÓN 4 — LIVE INTERACTIVE BUILDER
     ========================================================================= */
  function initLiveBuilder() {
    const inputName = document.getElementById('builderInputName');
    const inputRole = document.getElementById('builderInputRole');
    const inputAddress = document.getElementById('builderInputAddress');
    const specChips = document.querySelectorAll('#builderSpecialtiesGrid .b-chip');
    const serviceChecks = document.querySelectorAll('#builderServicesList input[type="checkbox"]');
    const btnLocPresencial = document.getElementById('btnLocPresencial');
    const btnLocOnline = document.getElementById('btnLocOnline');
    const toggleWA = document.getElementById('builderToggleWA');
    const btnReset = document.getElementById('btnResetBuilder');

    const canvasBrand = document.getElementById('canvasBrandName');
    const canvasPill = document.getElementById('canvasPillRole');
    const canvasTitle = document.getElementById('canvasTitleName');
    const canvasDomain = document.getElementById('canvasLiveDomain');
    const canvasChipsList = document.getElementById('canvasSpecialtiesChipsList');
    const canvasServicesGrid = document.getElementById('canvasServicesCardsGrid');
    const canvasLocBox = document.getElementById('canvasLocAddress');
    const canvasWaBtn = document.getElementById('canvasHeroWaBtn');

    function updateIdentity() {
      const name = inputName?.value.trim() || 'Tu Nombre';
      const role = inputRole?.value.trim() || 'Profesión / Especialidad';

      if (canvasBrand) canvasBrand.textContent = name;
      if (canvasTitle) canvasTitle.textContent = name;
      if (canvasPill) canvasPill.textContent = role.toUpperCase();
      if (canvasDomain) {
        const cleanDomain = name.toLowerCase().replace(/[^a-z0-9]/g, '');
        canvasDomain.textContent = `${cleanDomain || 'tuweb'}.com.ar`;
      }
    }

    inputName?.addEventListener('input', updateIdentity);
    inputRole?.addEventListener('input', updateIdentity);

    specChips.forEach(chip => {
      chip.addEventListener('click', () => {
        chip.classList.toggle('active');
        renderSpecialties();
      });
    });

    function renderSpecialties() {
      if (!canvasChipsList) return;
      const activeSpecs = Array.from(specChips).filter(c => c.classList.contains('active')).map(c => c.dataset.spec);
      canvasChipsList.innerHTML = activeSpecs.map(s => `<span class="canvas-chip-pill">${s}</span>`).join('');
    }

    serviceChecks.forEach(cb => {
      cb.addEventListener('change', renderServices);
    });

    function renderServices() {
      if (!canvasServicesGrid) return;
      const activeServices = Array.from(serviceChecks).filter(cb => cb.checked).map(cb => ({
        name: cb.dataset.sname,
        desc: cb.dataset.sdesc
      }));

      canvasServicesGrid.innerHTML = activeServices.map(s => `
        <div class="canvas-svc-card">
          <strong>${s.name}</strong>
          <p>${s.desc}</p>
        </div>
      `).join('');
    }

    btnLocPresencial?.addEventListener('click', () => {
      btnLocPresencial.classList.add('active');
      btnLocOnline?.classList.remove('active');
      if (canvasLocBox) canvasLocBox.textContent = inputAddress?.value || 'Consultorio Presencial';
    });

    btnLocOnline?.addEventListener('click', () => {
      btnLocOnline.classList.add('active');
      btnLocPresencial?.classList.remove('active');
      if (canvasLocBox) canvasLocBox.textContent = 'Atención 100% Online & Remota';
    });

    inputAddress?.addEventListener('input', () => {
      if (btnLocPresencial?.classList.contains('active') && canvasLocBox) {
        canvasLocBox.textContent = inputAddress.value || 'Consultorio Presencial';
      }
    });

    toggleWA?.addEventListener('change', () => {
      if (canvasWaBtn) {
        canvasWaBtn.style.display = toggleWA.checked ? 'inline-flex' : 'none';
      }
    });

    btnReset?.addEventListener('click', () => {
      if (inputName) inputName.value = 'Dra. Valentina Moreno';
      if (inputRole) inputRole.value = 'Psicoterapia Clínica & TCC';
      if (inputAddress) inputAddress.value = 'Bv. Oroño 1100, Rosario';
      specChips.forEach((c, idx) => {
        if (idx < 2) c.classList.add('active');
        else c.classList.remove('active');
      });
      serviceChecks.forEach((cb, idx) => {
        cb.checked = (idx < 2);
      });
      btnLocPresencial?.classList.add('active');
      btnLocOnline?.classList.remove('active');
      if (toggleWA) toggleWA.checked = true;

      updateIdentity();
      renderSpecialties();
      renderServices();
    });
  }

  /* =========================================================================
     6. SECCIÓN 5 — SHOWROOM MODAL
     ========================================================================= */
  function initShowroomModal() {
    const modal = document.getElementById('macosBrowserModal');
    const addressBar = document.getElementById('macosModalAddress');
    const viewport = document.getElementById('macosViewportContainer');
    const closeBtn = document.getElementById('closeMacosModalBtn');
    const closeDot = document.getElementById('closeMacosModalDot');
    const projectCards = document.querySelectorAll('.showroom-project-card');

    if (!modal || !viewport) return;

    const showcaseData = {
      'wellness': {
        title: 'The Wellness Club',
        domain: 'https://thewellnessclub.com.ar/',
        isLiveEmbed: true
      },
      'sofia': {
        title: 'Lic. Sofía Albarracín — Psicología Clínica & TCC',
        domain: 'https://sofiaalbarracin.com.ar',
        role: 'Psicóloga Especialista en Ansiedad & Parejas',
        address: 'Honduras 4800, Palermo Soho, CABA',
        services: [
          { name: 'Psicoterapia Individual (50 min)', desc: 'Sesiones semanales con objetivos terapéuticos claros.' },
          { name: 'Orientación a Parejas', desc: 'Resolución de conflictos y dinámicas vinculares asertivas.' }
        ]
      },
      'benitez': {
        title: 'Estudio Benítez & Asoc. — Soluciones Jurídicas',
        domain: 'https://estudiobenitez.com.ar',
        role: 'Abogados Corporativos & Laborales',
        address: 'Av. Corrientes 1400, Tribunales, CABA',
        services: [
          { name: 'Auditoría Legal Empresarial', desc: 'Prevención de contingencias laborales y societarias.' },
          { name: 'Litigios y Conciliación', desc: 'Representación en fueros comerciales y laborales.' }
        ]
      },
      'varela': {
        title: 'Dr. Marcelo E. Varela — Traumatología & Artroscopía',
        domain: 'https://drvarela.com.ar',
        role: 'Médico Traumatólogo · Cirugía Articular',
        address: 'Av. Santa Fe 3200, Alto Palermo, CABA',
        services: [
          { name: 'Consulta Traumatológica', desc: 'Evaluación física exhaustiva y lectura de RMN.' },
          { name: 'Artroscopía Mini-Invasiva', desc: 'Procedimientos de rápida recuperación articular.' }
        ]
      },
      'zaldivar': {
        title: 'Arq. Camila Zaldívar — Arquitectura & Reformas',
        domain: 'https://camilazaldivar.com',
        role: 'Arquitecta · Proyectos Residenciales',
        address: 'Estudio Colegiales, CABA',
        services: [
          { name: 'Proyecto & Documentación', desc: 'Planos ejecutivos, renders 3D y presupuesto cerrado.' },
          { name: 'Interiorismo Contemporáneo', desc: 'Diseño espacial integral para viviendas y estudios.' }
        ]
      }
    };

    function openModal(key) {
      const project = showcaseData[key];
      if (!project) return;

      if (addressBar) addressBar.textContent = project.domain;

      if (project.isLiveEmbed) {
        viewport.innerHTML = `
          <div style="width:100%; height:100%; min-height:540px; display:flex; flex-direction:column;">
            <iframe src="https://thewellnessclub.com.ar/" style="width:100%; height:100%; min-height:540px; border:none;" title="The Wellness Club Live"></iframe>
          </div>
        `;
      } else {
        viewport.innerHTML = `
          <div style="max-width: 740px; margin: 0 auto; padding: 20px 0;">
            <div style="display:inline-block; font-size:0.75rem; font-weight:800; color:#0033FF; background:#EFF6FF; padding:4px 10px; border-radius:4px; margin-bottom:10px;">
              ✦ SITIO PROFESIONAL EN VIVO
            </div>
            <h2 style="font-size:1.85rem; font-weight:900; letter-spacing:-0.03em; margin-bottom:6px;">${project.title}</h2>
            <p style="font-size:0.95rem; color:#475569; margin-bottom:24px;">${project.role} · ${project.address}</p>

            <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:14px; margin-bottom:28px;">
              ${(project.services || []).map(s => `
                <div style="background:#F8FAFC; border:1px solid #E2E8F0; padding:16px; border-radius:12px;">
                  <strong style="display:block; font-size:0.95rem; margin-bottom:4px;">${s.name}</strong>
                  <p style="font-size:0.84rem; color:#64748B;">${s.desc}</p>
                </div>
              `).join('')}
            </div>

            <div style="background:#090A0F; color:#FFFFFF; padding:20px; border-radius:14px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;">
              <div>
                <strong style="display:block; font-size:1rem;">¿Querés una web con esta calidad para tu nombre?</strong>
                <span style="font-size:0.84rem; color:#94A3B8;">La entregamos lista en 72 horas con dominio propio.</span>
              </div>
              <a href="onboarding.html" style="background:#0033FF; color:#FFFFFF; text-decoration:none; font-weight:800; font-size:0.88rem; padding:10px 20px; border-radius:9999px;">
                Crear mi web →
              </a>
            </div>
          </div>
        `;
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      viewport.innerHTML = '';
    }

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        openModal(card.dataset.projectKey);
      });
    });

    closeBtn?.addEventListener('click', closeModal);
    closeDot?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  /* =========================================================================
     7. SECCIÓN 6 — ANTES / DESPUÉS SLIDER
     ========================================================================= */
  function initBeforeAfterSlider() {
    const container = document.getElementById('sliderComparisonContainer');
    const layerAfter = document.getElementById('layerAfter');
    const divider = document.getElementById('sliderDividerLine');

    if (!container || !layerAfter || !divider) return;

    let isDragging = false;

    function setSliderPosition(xPos) {
      const rect = container.getBoundingClientRect();
      let offsetX = xPos - rect.left;
      if (offsetX < 0) offsetX = 0;
      if (offsetX > rect.width) offsetX = rect.width;

      const percentage = (offsetX / rect.width) * 100;
      layerAfter.style.width = `${100 - percentage}%`;
      layerAfter.style.left = `${percentage}%`;
      divider.style.left = `${percentage}%`;
    }

    container.addEventListener('mousedown', (e) => {
      isDragging = true;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      setSliderPosition(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });

    container.addEventListener('touchstart', (e) => {
      isDragging = true;
      if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging || !e.touches[0]) return;
      setSliderPosition(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDragging = false;
    });
  }

  /* =========================================================================
     8. SECCIÓN 7 — DETECTOR DE TRAYECTORIA
     ========================================================================= */
  function initTrajectoryDetector() {
    const checkboxes = document.querySelectorAll('.detector-cb');
    const scoreDigit = document.getElementById('detectorScoreDigit');
    const scoreFill = document.getElementById('detectorScoreFill');
    const scoreText = document.getElementById('detectorScoreText');

    if (!checkboxes.length || !scoreDigit || !scoreFill) return;

    let currentDisplayedScore = 42;

    function animateScore(targetScore) {
      const duration = 300;
      const start = currentDisplayedScore;
      const diff = targetScore - start;
      const startTime = performance.now();

      function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        currentDisplayedScore = Math.round(start + diff * progress);

        scoreDigit.textContent = String(currentDisplayedScore);
        scoreFill.style.width = `${currentDisplayedScore}%`;

        if (currentDisplayedScore >= 90) {
          scoreDigit.style.color = '#10B981';
          scoreFill.style.background = '#10B981';
        } else if (currentDisplayedScore >= 50) {
          scoreDigit.style.color = '#F59E0B';
          scoreFill.style.background = '#F59E0B';
        } else {
          scoreDigit.style.color = '#EF4444';
          scoreFill.style.background = '#EF4444';
        }

        if (progress < 1) {
          requestAnimationFrame(update);
        }
      }

      requestAnimationFrame(update);
    }

    function recalculateScore() {
      let total = 0;
      checkboxes.forEach(cb => {
        const item = cb.closest('.detector-check-item');
        if (cb.checked) {
          total += parseInt(cb.dataset.score, 10) || 0;
          item?.classList.remove('missing');
          item?.classList.add('active');
          const custom = item?.querySelector('.cb-custom');
          if (custom) custom.textContent = '✓';
        } else {
          item?.classList.remove('active');
          item?.classList.add('missing');
          const custom = item?.querySelector('.cb-custom');
          if (custom) custom.textContent = '✕';
        }
      });

      animateScore(total);

      if (total >= 90) {
        if (scoreText) scoreText.innerHTML = '🌟 <strong>Presencia 100% sólida y centralizada.</strong> Todo tu prestigio tiene un destino claro para convertir consultas.';
      } else if (total >= 50) {
        if (scoreText) scoreText.innerHTML = '⚠️ <strong>Presencia parcialmente unificada.</strong> Tenés canales valiosos pero falta el centro de conversión para no perder pacientes.';
      } else {
        if (scoreText) scoreText.innerHTML = '🚨 <strong>Presencia altamente dispersa.</strong> Tus potenciales clientes se pierden entre apps antes de poder contactarte.';
      }
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', recalculateScore);
    });
  }

  /* =========================================================================
     9. SECCIÓN 8 & 9 — PERSONALIZACIÓN & PRECIOS
     ========================================================================= */
  function initPersonalizationDecision() {
    const decisionCards = document.querySelectorAll('.decision-card');
    const pricingCards = {
      'express': document.getElementById('pricingCardExpress'),
      'pro': document.getElementById('pricingCardPro'),
      'autoridad': document.getElementById('pricingCardAutoridad')
    };

    if (!decisionCards.length) return;

    decisionCards.forEach(card => {
      card.addEventListener('click', () => {
        decisionCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        const planKey = card.dataset.plan;

        Object.values(pricingCards).forEach(pCard => pCard?.classList.remove('highlight-tier'));
        if (pricingCards[planKey]) {
          pricingCards[planKey].classList.add('highlight-tier');
          pricingCards[planKey].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });
  }

})();


  /* =========================================================================
     SECCIÓN 4 — PLANTILLAS DE TRAYECTORIA (INTERACTIVE FILTERS)
     ========================================================================= */
  function initTemplatesFilters() {
    const btnProfessional = document.getElementById('btnFilterProfessional');
    const btnBusiness = document.getElementById('btnFilterBusiness');
    const proCards = document.querySelectorAll('.professional-card');
    const bizCards = document.querySelectorAll('.business-card');

    if (!btnProfessional || !btnBusiness) return;

    btnProfessional.addEventListener('click', () => {
      btnProfessional.classList.add('active');
      btnBusiness.classList.remove('active');

      proCards.forEach(c => c.style.display = 'flex');
      bizCards.forEach(c => c.style.display = 'none');
    });

    btnBusiness.addEventListener('click', () => {
      btnBusiness.classList.add('active');
      btnProfessional.classList.remove('active');

      proCards.forEach(c => c.style.display = 'none');
      bizCards.forEach(c => c.style.display = 'flex');
    });
  }
