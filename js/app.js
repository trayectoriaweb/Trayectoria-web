/**
 * TRAYECTORIA v2026.40 — Master Controller
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initTemplatesFilters();
    initDraggableAndWindowActions();
    initDossierPricing();
    initInteractiveRoster();
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
     SECCIÓN 4 — PLANTILLAS DE TRAYECTORIA (INTERACTIVE STUDIO EXPLORER)
     ========================================================================= */
  function initTemplatesFilters() {
    const btnProfessional = document.getElementById('btnFilterProfessional');
    const btnBusiness = document.getElementById('btnFilterBusiness');
    const navCards = document.querySelectorAll('.template-nav-card');
    const viewContents = document.querySelectorAll('.template-view-content');
    const stageUrlText = document.getElementById('stageUrlText');

    if (!btnProfessional || !btnBusiness || !navCards.length) return;

    const urls = {
      'sobrio': 'valentinamoreno.com.ar/sobrio',
      'editorial': 'valentinamoreno.com.ar/editorial',
      'creativo': 'valentinamoreno.com.ar/creativo',
      'directo': 'valentinamoreno.com.ar/directo',
      'servicios': 'valentinamoreno.com.ar/servicios',
      'espacio': 'valentinamoreno.com.ar/espacio'
    };

    function selectTemplate(templateKey) {
      navCards.forEach(card => {
        if (card.dataset.targetTemplate === templateKey) {
          card.classList.add('active');
        } else {
          card.classList.remove('active');
        }
      });

      viewContents.forEach(view => {
        if (view.id === `viewTemplate${templateKey.charAt(0).toUpperCase() + templateKey.slice(1)}`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      if (stageUrlText && urls[templateKey]) {
        stageUrlText.textContent = urls[templateKey];
      }
    }

    // Nav card click
    navCards.forEach(card => {
      card.addEventListener('click', () => {
        const target = card.dataset.targetTemplate;
        if (target) selectTemplate(target);
      });
    });

    // Group Tab Switch
    btnProfessional.addEventListener('click', () => {
      btnProfessional.classList.add('active');
      btnBusiness.classList.remove('active');

      navCards.forEach(c => {
        if (c.dataset.category === 'pro') c.style.display = 'block';
        else c.style.display = 'none';
      });

      selectTemplate('sobrio');
    });

    btnBusiness.addEventListener('click', () => {
      btnBusiness.classList.add('active');
      btnProfessional.classList.remove('active');

      navCards.forEach(c => {
        if (c.dataset.category === 'biz') c.style.display = 'block';
        else c.style.display = 'none';
      });

      selectTemplate('servicios');
    });
  }


  /* =========================================================================
     DRAGGABLE WINDOWS, MINIMIZE / RESTORE & SCROLL ANIMATIONS SYSTEM
     ========================================================================= */
  function initDraggableAndWindowActions() {
    const minimizedTray = document.getElementById('minimizedAppsTray');

    // 1. DRAGGABLE WINDOW UTILITY
    function makeDraggable(windowEl, handleEl) {
      if (!windowEl || !handleEl) return;

      let isDragging = false;
      let startX = 0, startY = 0;
      let currentX = 0, currentY = 0;

      function onStart(e) {
        // Ignore clicks on buttons, inputs or dots
        if (e.target.closest('input') || e.target.closest('button') || e.target.closest('.w-dot') || e.target.closest('.c-dot')) {
          return;
        }

        isDragging = true;
        windowEl.classList.add('is-dragging');

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        startX = clientX - currentX;
        startY = clientY - currentY;

        document.addEventListener('mousemove', onMove, { passive: false });
        document.addEventListener('mouseup', onEnd);
        document.addEventListener('touchmove', onMove, { passive: false });
        document.addEventListener('touchend', onEnd);
      }

      function onMove(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();

        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;

        let nextX = clientX - startX;
        let nextY = clientY - startY;

        // Clamping to avoid window getting lost off-screen
        const clampX = Math.max(-180, Math.min(180, nextX));
        const clampY = Math.max(-80, Math.min(120, nextY));

        currentX = clampX;
        currentY = clampY;

        windowEl.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      function onEnd() {
        isDragging = false;
        windowEl.classList.remove('is-dragging');
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onEnd);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      }

      handleEl.addEventListener('mousedown', onStart);
      handleEl.addEventListener('touchstart', onStart, { passive: true });

      // Double-click to reset position
      handleEl.addEventListener('dblclick', () => {
        currentX = 0;
        currentY = 0;
        windowEl.style.transition = 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        windowEl.style.transform = 'translate3d(0, 0, 0)';
        setTimeout(() => { windowEl.style.transition = ''; }, 300);
      });
    }

    // Apply Draggable to Section 1 & Section 3 Windows
    const manifestoWindow = document.getElementById('manifestoWindow');
    const manifestoToolbar = manifestoWindow ? manifestoWindow.querySelector('.window-toolbar') : null;
    makeDraggable(manifestoWindow, manifestoToolbar);

    const chatWindow = document.getElementById('realChatWindow');
    const chatHeader = chatWindow ? chatWindow.querySelector('.real-chat-header') : null;
    makeDraggable(chatWindow, chatHeader);

    // 2. CLOSE / MINIMIZE & RESTORE SYSTEM
    const closeManifestoBtn = document.getElementById('closeManifestoDot');
    const sectionInicio = document.getElementById('inicio');
    const navInicio = document.getElementById('navLinkInicio');

    const closeChatBtn = document.getElementById('closeChatDot');
    const sectionChat = document.getElementById('investigador-ia');
    const navChat = document.getElementById('navLinkInvestigador');

    function minimizeWindow(type) {
      if (type === 'manifesto') {
        if (!manifestoWindow || !sectionInicio) return;
        manifestoWindow.classList.add('window-closing');
        setTimeout(() => {
          sectionInicio.classList.add('section-collapsed');
        }, 200);

        addMinimizedPill('manifesto', 'Trayectoria_Manifiesto.app');
      } else if (type === 'chat') {
        if (!chatWindow || !sectionChat) return;
        chatWindow.classList.add('window-closing');
        setTimeout(() => {
          sectionChat.classList.add('section-collapsed');
        }, 200);

        addMinimizedPill('chat', 'Investigador_IA.app');
      }
    }

    function restoreWindow(type) {
      if (type === 'manifesto') {
        if (!manifestoWindow || !sectionInicio) return;
        sectionInicio.classList.remove('section-collapsed');
        manifestoWindow.classList.remove('window-closing');
        manifestoWindow.classList.add('window-restoring');
        manifestoWindow.style.transform = 'translate3d(0, 0, 0)';

        setTimeout(() => {
          manifestoWindow.classList.remove('window-restoring');
          sectionInicio.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

        removeMinimizedPill('manifesto');
      } else if (type === 'chat') {
        if (!chatWindow || !sectionChat) return;
        sectionChat.classList.remove('section-collapsed');
        chatWindow.classList.remove('window-closing');
        chatWindow.classList.add('window-restoring');
        chatWindow.style.transform = 'translate3d(0, 0, 0)';

        setTimeout(() => {
          chatWindow.classList.remove('window-restoring');
          sectionChat.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);

        removeMinimizedPill('chat');
      }
    }

    function addMinimizedPill(id, name) {
      if (!minimizedTray) return;
      if (minimizedTray.querySelector(`[data-restore="${id}"]`)) return;

      const pill = document.createElement('button');
      pill.type = 'button';
      pill.className = 'minimized-app-pill';
      pill.dataset.restore = id;
      pill.innerHTML = `<span class="app-dot-indicator"></span> <span>${name} ↺</span>`;
      pill.addEventListener('click', () => restoreWindow(id));
      minimizedTray.appendChild(pill);
    }

    function removeMinimizedPill(id) {
      if (!minimizedTray) return;
      const pill = minimizedTray.querySelector(`[data-restore="${id}"]`);
      if (pill) pill.remove();
    }

    closeManifestoBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      minimizeWindow('manifesto');
    });

    closeChatBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      minimizeWindow('chat');
    });

    navInicio?.addEventListener('click', () => {
      if (sectionInicio?.classList.contains('section-collapsed')) {
        restoreWindow('manifesto');
      }
    });

    navChat?.addEventListener('click', () => {
      if (sectionChat?.classList.contains('section-collapsed')) {
        restoreWindow('chat');
      }
    });

    // 3. SCROLL REVEAL MICRO-ANIMATIONS
    const revealTargets = document.querySelectorAll(
      '.section-head, .slide-project-card, .templates-studio-block, .pricing-strip-row, .final-cta-box'
    );

    revealTargets.forEach(el => el.classList.add('reveal-on-scroll'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach(el => observer.observe(el));
  }


  /* =========================================================================
     INVERSIÓN TRANSPARENTE — DOSSIER EDITORIAL INTERACTIVO
     ========================================================================= */
  function initDossierPricing() {
    const tabButtons = document.querySelectorAll('.dossier-tab-btn');
    const tierTag = document.getElementById('dossierTierTag');
    const planName = document.getElementById('dossierPlanName');
    const amount = document.getElementById('dossierAmount');
    const timingText = document.getElementById('dossierTimingText');
    const pitch = document.getElementById('dossierPitch');
    const specsGrid = document.getElementById('dossierSpecsGrid');
    const ctaBtn = document.getElementById('dossierCtaBtn');

    if (!tabButtons.length || !planName || !specsGrid) return;

    const dossierData = {
      'express': {
        tierTag: 'NIVEL 01 · PRESENCIA BÁSICA',
        name: 'Perfil Express',
        amount: '65',
        timing: 'Entrega garantizada en 72hs',
        pitch: 'Para existir oficialmente en Google con tu nombre propio y canalizar todas las búsquedas directamente hacia tu WhatsApp.',
        ctaUrl: 'https://wa.me/5491123456789?text=Hola%20Trayectoria,%20quiero%20el%20plan%20Perfil%20Express',
        specs: [
          { num: '01', title: 'Estructura One-Page', desc: 'Diseño limpio, rápido y de alto impacto visual adaptado a tu rubro.' },
          { num: '02', title: 'WhatsApp Directo', desc: 'Botón flotante directo con mensaje precargado para agilizar turnos y consultas.' },
          { num: '03', title: 'Ubicación GPS', desc: 'Integración oficial con Google Maps de tu consultorio, estudio o atención remota.' },
          { num: '04', title: 'Dominio Oficial', desc: 'Configuración oficial de tu dominio .com.ar y certificado de seguridad SSL.' }
        ]
      },
      'pro': {
        tierTag: 'NIVEL 02 · CONVERSIÓN & ESPECIALIDADES',
        name: 'Consultorio Pro',
        amount: '95',
        timing: 'Entrega garantizada en 72 a 96hs',
        pitch: 'Diseñado para profesionales independientes que necesitan educar al paciente, mostrar especialidades clínicas y recibir consultas filtradas con contexto previo en WhatsApp.',
        ctaUrl: 'https://wa.me/5491123456789?text=Hola%20Trayectoria,%20quiero%20el%20plan%20Consultorio%20Pro',
        specs: [
          { num: '01', title: 'Especialidades Claras', desc: 'Bloque detallado de servicios, tratamientos o áreas de práctica profesional.' },
          { num: '02', title: 'Preguntas Frecuentes FAQ', desc: 'Módulo interactivo que responde dudas previas sobre honorarios y turnos.' },
          { num: '03', title: 'SEO Local en Google', desc: 'Optimización de palabras clave para aparecer cuando buscan tu profesión en tu ciudad.' },
          { num: '04', title: 'Paleta & Identidad a Medida', desc: 'Tipografía curada y diseño visual adaptado al tono exacto de tu trayectoria.' }
        ]
      },
      'autoridad': {
        tierTag: 'NIVEL 03 · PRESENCIA COMPLETA',
        name: 'Autoridad Total',
        amount: '140',
        timing: 'Entrega garantizada en 5 días',
        pitch: 'Para clínicas, estudios de arquitectura, abogados corporativos o profesionales de referencia que necesitan exhibir casos de éxito y credenciales.',
        ctaUrl: 'https://wa.me/5491123456789?text=Hola%20Trayectoria,%20quiero%20el%20plan%20Autoridad%20Total',
        specs: [
          { num: '01', title: 'Galería de Casos / Obras', desc: 'Showcase visual de proyectos, antes/después o casos clínicos de éxito.' },
          { num: '02', title: 'Estructura Multi-sección', desc: 'Páginas dedicadas para equipo profesional, trayectoria y publicaciones.' },
          { num: '03', title: 'Redacción Persuasiva', desc: 'Curaduría y redacción completa de textos para transmitir máxima autoridad.' },
          { num: '04', title: 'Soporte VIP Post-lanzamiento', desc: 'Atención prioritaria y ajustes personalizados tras la publicación oficial.' }
        ]
      }
    };

    function renderDossier(planKey) {
      const data = dossierData[planKey];
      if (!data) return;

      tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.plan === planKey);
      });

      tierTag.textContent = data.tierTag;
      planName.textContent = data.name;
      amount.textContent = data.amount;
      timingText.textContent = data.timing;
      pitch.textContent = data.pitch;
      ctaBtn.href = data.ctaUrl;

      specsGrid.innerHTML = data.specs.map(s => `
        <div class="spec-block">
          <div class="spec-block-title">
            <span class="spec-block-num">${s.num}</span>
            <strong>${s.title}</strong>
          </div>
          <p class="spec-block-desc">${s.desc}</p>
        </div>
      `).join('');
    }

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const plan = btn.dataset.plan;
        if (plan) renderDossier(plan);
      });
    });

    // Initial render Pro
    renderDossier('pro');
  }


  /* =========================================================================
     CASOS REALES — ROSTER TIPOGRÁFICO & FLOATING HOVER PREVIEWS
     ========================================================================= */
  function initInteractiveRoster() {
    const workbench = document.getElementById('rosterWorkbench');
    const rosterItems = document.querySelectorAll('.roster-item');
    const floatingCard = document.getElementById('floatingProjectCard');
    const floatingUrl = document.getElementById('floatingUrlText');
    const floatingBody = document.getElementById('floatingWindowBody');

    if (!workbench || !floatingCard || !rosterItems.length) return;

    const projectData = {
      'wellness': {
        url: 'thewellnessclub.com.ar',
        badge: 'FITNESS & BIENESTAR',
        title: 'The Wellness Club',
        desc: 'Salud integral, nutrición deportiva y clases personalizadas en Rosario.',
        tags: ['Membresías', 'Reformer', 'Nutrición'],
        loc: 'Rosario, Santa Fe',
        themeClass: 'f-card-wellness'
      },
      'vitale': {
        url: 'julietavitale.com.ar',
        badge: 'PSICOTERAPIA CLÍNICA',
        title: 'Lic. Julieta Vitale',
        desc: 'Atención psicológica individual y mindfulness basada en evidencia.',
        tags: ['Ansiedad', 'Adultos', '100% Online'],
        loc: 'Palermo Soho, CABA',
        themeClass: 'f-card-vitale'
      },
      'dirusso': {
        url: 'dirusso.com.ar',
        badge: 'DERECHO CORPORATIVO',
        title: 'Maurizio Di Russo & Asoc.',
        desc: 'Asesoramiento legal preventivo y litigios comerciales para empresas.',
        tags: ['Contratos', 'Tribunales', 'Auditoría'],
        loc: 'Tribunales, CABA',
        themeClass: 'f-card-dirusso'
      },
      'zaldivar': {
        url: 'camilazaldivar.com',
        badge: 'ARQUITECTURA & OBRAS',
        title: 'Studio Zaldívar',
        desc: 'Proyectos residenciales, interiorismo y reformas contemporáneas.',
        tags: ['Obras', 'Renders 3D', 'Colegiales'],
        loc: 'Colegiales, CABA',
        themeClass: 'f-card-zaldivar'
      },
      'varela': {
        url: 'drvarela.com.ar',
        badge: 'TRAUMATOLOGÍA ARTICULAR',
        title: 'Dr. Marcelo Varela',
        desc: 'Cirugía mini-invasiva y medicina deportiva de alto rendimiento.',
        tags: ['Artroscopía', 'Prepagas', 'Alto Palermo'],
        loc: 'Alto Palermo, CABA',
        themeClass: 'f-card-varela'
      },
      'ponieman': {
        url: 'valeriaponieman.com',
        badge: 'DIRECCIÓN DE ARTE',
        title: 'Valeria Ponieman',
        desc: 'Identidad visual, sistemas de diseño y consultoría de marca.',
        tags: ['Branding', 'Packaging', 'UX / UI'],
        loc: 'Palermo, CABA',
        themeClass: 'f-card-ponieman'
      }
    };

    let isMouseOverList = false;

    rosterItems.forEach(item => {
      item.addEventListener('mouseenter', (e) => {
        const key = item.dataset.projectKey;
        const data = projectData[key];
        if (!data) return;

        isMouseOverList = true;
        floatingUrl.textContent = data.url;
        floatingBody.innerHTML = `
          <div class="f-mock-card ${data.themeClass}">
            <span class="f-mock-badge">✦ ${data.badge}</span>
            <h4 class="f-mock-title">${data.title}</h4>
            <p class="f-mock-desc">${data.desc}</p>
            <div class="f-mock-tags">
              ${data.tags.map(t => `<span>${t}</span>`).join('')}
            </div>
            <div class="f-mock-cta-row">
              <span>📍 ${data.loc}</span>
              <span class="f-wa-badge">💬 Directo a WhatsApp</span>
            </div>
          </div>
        `;

        floatingCard.classList.add('is-visible');
        positionCard(e, item);
      });

      item.addEventListener('mousemove', (e) => {
        if (isMouseOverList) {
          positionCard(e, item);
        }
      });

      item.addEventListener('mouseleave', () => {
        isMouseOverList = false;
        floatingCard.classList.remove('is-visible');
      });
    });

    function positionCard(e, itemEl) {
      const workbenchRect = workbench.getBoundingClientRect();
      const itemRect = itemEl.getBoundingClientRect();

      // Determine top offset relative to workbench
      const relativeTop = itemRect.top - workbenchRect.top;
      
      // Check horizontal positioning (if cursor is on left half, show on right, and vice versa)
      const mouseX = e.clientX - workbenchRect.left;
      const workbenchWidth = workbenchRect.width;

      if (mouseX < workbenchWidth / 2) {
        // Place on right side
        floatingCard.style.left = 'auto';
        floatingCard.style.right = '20px';
      } else {
        // Place on left side
        floatingCard.style.left = '20px';
        floatingCard.style.right = 'auto';
      }

      floatingCard.style.top = `${relativeTop - 40}px`;
    }
  }
