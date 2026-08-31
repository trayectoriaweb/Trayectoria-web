/**
 * TRAYECTORIA v2026.40 — Master Controller
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
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
     SECCIÓN 3 — EL INVESTIGADOR IA (5 VARIANTES DOCUMENTALES CON HUMOR ABSURDO)
     ========================================================================= */
  function initAiInvestigator() {
    const form = document.getElementById('aiSearchForm');
    const inputName = document.getElementById('aiInputName');
    const inputRole = document.getElementById('aiInputRole');
    const stagePrompt = document.getElementById('aiStagePrompt');
    const stageResponse = document.getElementById('aiStageResponse');
    const echoName = document.getElementById('echoTargetName');
    const echoRole = document.getElementById('echoTargetRole');
    const bioProse = document.getElementById('aiBioProse');
    const punchlineQuote = document.getElementById('aiPunchlineQuote');
    const btnRestart = document.getElementById('btnAiRestart');

    if (!form || !inputName || !inputRole || !stagePrompt || !stageResponse || !bioProse) return;

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
        tit: isFemale ? 'titular' : 'titular',
        elim: isFemale ? 'eliminada' : 'eliminado',
        grad: isFemale ? 'graduada' : 'graduado',
        rec: isFemale ? 'reconocida' : 'reconocido'
      };
    }

    const variants = [
      // VARIANTE 1: Peppa Pig + Deuda de Cotillón + Tuppers
      {
        getBio: (name, role, g) => [
          `<strong>${name}</strong> es ${role} y cuenta con una trayectoria profesional respaldada por años de formación, dedicación rigurosa y un compromiso constante con la excelencia en su disciplina. Distintas fuentes académicas y laborales destacan su criterio técnico y su capacidad para resolver problemas complejos con absoluta solvencia.`,
          `En paralelo, un análisis exhaustivo de registros digitales públicos permite reconstruir facetas complementarias de su perfil. Según documentos de libre acceso en la web, ${name} aparece ${g.vinc} a una deuda impaga de $14.200 pesos con una distribuidora mayorista de cotillón por la compra de 400 silbatos con forma de delfín en octubre de 2021.`,
          `Asimismo, su nombre figura asociado a un video viral que alcanzó miles de reproducciones: en él, una persona presuntamente ${g.ident} como ${name} viste un traje no homologado de Peppa Pig mientras baila cumbia en uno de los Trenes de la Alegría de Mar del Plata. Un comentario anónimo al pie del video agrega además: <em>"es una persona muy respetable pero nunca devuelve los tuppers"</em>.`
        ],
        quote: `"Quizás esto no habría pasado si toda su información profesional estuviera en un solo lugar."`
      },

      // VARIANTE 2: Fiestas Clandestinas en Pandemia + Mancha de Mate en el Techo + Campeonato de Truco
      {
        getBio: (name, role, g) => [
          `Con una sólida presencia en su campo de especialidad, <strong>${name}</strong> ejerce como ${role}, consolidando un prestigio profesional basado en la ética de trabajo, el rigor metodológico y la confianza construida con sus clientes a lo largo de su carrera.`,
          `Sin embargo, los motores de búsqueda asocian su identidad a antecedentes sumamente heterogéneos. Durante los primeros meses de 2020, ${name} aparece reiteradamente ${g.menc} en foros vecinales como la presunta organizadora de tres fiestas clandestinas temáticas denominadas <em>"CoronaFest VIP"</em> en un galpón industrial. La información resulta llamativa considerando que su profesión no guarda vínculo aparente con la nocturnidad.`,
          `Los registros también revelan una consulta técnica formulada en Yahoo Respuestas en 2018 bajo su nombre: <em>"urgente cómo sacar mancha de yerba mate hervida del techo sin que se entere el dueño del departamento"</em>. A ello se suma su participación en el Torneo Abierto de Truco de Villa Gesell, donde fue ${g.elim} en primera ronda tras cantar 33 de envido teniendo solo dos sotas.`
        ],
        quote: `"Internet puede mezclarte con cualquiera. Una web profesional, no debería."`
      },

      // VARIANTE 3: Adiestradora de Cucarachas + Discusión Absurda por la Milanesa
      {
        getBio: (name, role, g) => [
          `<strong>${name}</strong> se desempeña como ${role}, contando con una respetable trayectoria y un enfoque centrado en brindar soluciones profesionales de alto nivel a pacientes y clientes de su sector.`,
          `No obstante, la huella digital pública arroja datos desconcertantes. En portales de clasificados online de 2019, ${name} figura como ${g.tit} de un microemprendimiento de <em>"Adiestramiento conductual de cucarachas domésticas para espectáculos infantiles y disuasión de plagas"</em>. No existen testimonios suficientes para confirmar si el servicio llegó a comercializarse formalmente.`,
          `Por otra parte, su nombre quedó registrado en un acalorado debate de 47 comentarios en un grupo de Facebook barrial acerca de si una milanesa recalentada en microondas conserva o no la dignidad gastronómica. El intercambio concluyó con el bloqueo mutuo de cinco usuarios y la intervención de un administrador.`
        ],
        quote: `"Todo esto podría haberse evitado con una web que contara exactamente quién es y qué hace."`
      },

      // VARIANTE 4: El Perro Ajeno + Peppa Pig + Deuda de Cotillón
      {
        getBio: (name, role, g) => [
          `La labor de <strong>${name}</strong> como ${role} se distingue por la responsabilidad profesional, la permanente actualización académica y un perfil respetado dentro de su ámbito laboral.`,
          `A pesar de ello, los algoritmos de búsqueda indexan episodios de naturaleza dispar. En 2022, ${name} protagonizó un hilo en redes sociales tras ser vista paseando con total naturalidad a un caniche gigante teñido de turquesa que, según confirmó una vecina dos horas más tarde, pertenecía a una familia de la cuadra siguiente.`,
          `Los archivos digitales también la vinculan al extravío de una partida de 80 gorros de cotillón con luces LED y a un registro audiovisual donde aparece animando un cumpleaños infantil vestida de Peppa Pig en plena costanera. La pericia técnica no permite descartar que se trate de una mera coincidencia nominal.`
        ],
        quote: `"En internet, si no tenés tu propio espacio, los algoritmos deciden quién sos por vos."`
      },

      // VARIANTE 5: Fiestas Clandestinas + Adiestramiento de Cucarachas + Discusión de Suprema + Tuppers
      {
        getBio: (name, role, g) => [
          `${g.rec.charAt(0).toUpperCase() + g.rec.slice(1)} en su sector, <strong>${name}</strong> ejerce como ${role}, habiendo forjado una reputación intachable construida a base de esfuerzo, trayectoria y resultados concretos.`,
          `Pese a este currículum impecable, la web ofrece un mosaico de identidades superpuestas. Durante 2020, ${name} fue ${g.sen} en una denuncia anónima por presuntamente albergar una fiesta clandestina con DJ en vivo y catering de choripanes gourmet. Casi en simultáneo, su nombre apareció vinculado a un curso intensivo de adiestramiento de insectos de cocina dictado por Zoom.`,
          `Para completar el cuadro, una reseña de Google Maps de una rotisería de barrio incluye un reclamo hacia ${name} por una discusión sobre el grosor del empanado de una suprema y el reiterado reclamo de recipientes herméticos plásticos jamás devueltos.`
        ],
        quote: `"Tu trayectoria real merece un lugar oficial para que nadie te confunda con el resto de internet."`
      }
    ];

    function runAiInvestigation() {
      const rawName = inputName.value.trim();
      const rawRole = inputRole.value.trim();

      if (!rawName || !rawRole) return;

      const g = detectGrammar(rawName, rawRole);

      let randomIndex;
      do {
        randomIndex = Math.floor(Math.random() * variants.length);
      } while (randomIndex === lastVariantIndex && variants.length > 1);

      lastVariantIndex = randomIndex;
      const selected = variants[randomIndex];
      const paragraphs = selected.getBio(rawName, rawRole, g);

      if (echoName) echoName.textContent = rawName;
      if (echoRole) echoRole.textContent = rawRole;
      if (punchlineQuote) punchlineQuote.textContent = selected.quote;

      stagePrompt.style.display = 'none';
      stageResponse.style.display = 'block';
      bioProse.innerHTML = '';

      paragraphs.forEach((pText, idx) => {
        setTimeout(() => {
          const p = document.createElement('p');
          p.style.animation = 'fadeIn 0.25s ease forwards';
          p.innerHTML = pText;
          bioProse.appendChild(p);
        }, idx * 180);
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      runAiInvestigation();
    });

    btnRestart?.addEventListener('click', () => {
      stageResponse.style.display = 'none';
      stagePrompt.style.display = 'block';
      inputName.value = '';
      inputRole.value = '';
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
