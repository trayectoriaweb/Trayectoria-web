/**
 * TRAYECTORIA v2026.40 — Master Controller
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', () => {
    initHeaderScroll();
    initManifestoHero();
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
    const resultsList = document.getElementById('manifestoResultsList');
    const conclusionBlock = document.getElementById('manifestoConclusionBlock');
    const actionsCluster = document.getElementById('manifestoActionsCluster');
    const btnRestart = document.getElementById('btnManifestoRestart');

    if (!nameInput || !stage1 || !stage2) return;

    const channels = [
      { name: 'Instagram', status: '✓' },
      { name: 'WhatsApp', status: '✓' },
      { name: 'Google Maps', status: '✓' },
      { name: 'LinkedIn', status: '✓' }
    ];

    function executeManifestoSearch() {
      const enteredName = nameInput.value.trim() || 'tu nombre';

      if (targetNameDisplay) targetNameDisplay.textContent = `"${enteredName}"`;

      // 1. Show Stage 2 (Results + Punchline in one view)
      stage1.style.display = 'none';
      stage2.style.display = 'flex';
      if (resultsList) resultsList.innerHTML = '';
      if (conclusionBlock) conclusionBlock.classList.remove('visible');
      if (actionsCluster) actionsCluster.style.opacity = '0';

      // 2. Output items line by line
      let delay = 600;
      channels.forEach((ch) => {
        setTimeout(() => {
          if (!resultsList) return;
          const item = document.createElement('div');
          item.className = 'manifesto-result-item';
          item.innerHTML = `
            <span>\${ch.name}</span>
            <span class="m-check">\${ch.status}</span>
          `;
          resultsList.appendChild(item);
        }, delay);
        delay += 550;
      });

      // 3. Show punchline and conclusion directly below in the same view
      setTimeout(() => {
        if (conclusionBlock) conclusionBlock.classList.add('visible');
        if (actionsCluster) actionsCluster.style.opacity = '1';
      }, delay + 600);
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
