/**
 * TRAYECTORIA — Client Onboarding Controller
 * Multi-step guided conversational flow with real-time auto-save & dynamic list management
 */

(function () {
  'use strict';

  // Global Controller State
  let currentStep = 0; // 0: Welcome, 'templates', 1..5: Steps, 6: Review, 7: Success
  let clientId = 'TRAY-00001';
  let clientData = null;
  let autoSaveTimeout = null;

  const PRESET_COLORS = [
    { name: 'Azul Klein', hex: '#0033FF' },
    { name: 'Azul Marino', hex: '#0F172A' },
    { name: 'Verde Esmeralda', hex: '#059669' },
    { name: 'Verde Salvia', hex: '#4D7C0F' },
    { name: 'Negro Grafito', hex: '#18181B' },
    { name: 'Gris Ceniza', hex: '#64748B' },
    { name: 'Terracota', hex: '#C2410C' },
    { name: 'Borgoña', hex: '#881337' },
    { name: 'Dorado', hex: '#D97706' },
    { name: 'Azul Petróleo', hex: '#0D9488' },
    { name: 'Azul Cielo', hex: '#0284C7' },
    { name: 'Lavanda', hex: '#7C3AED' },
    { name: 'Arena', hex: '#D7C4B7' },
    { name: 'Blanco Minimal', hex: '#F1F5F9' },
  ];

  document.addEventListener('DOMContentLoaded', () => {
    initOnboardingApp();
  });

  function initOnboardingApp() {
    const store = window.OnboardingStore || window.TrayectoriaOnboardingStore;
    if (!store) {
      console.error('TrayectoriaOnboardingStore not loaded');
      return;
    }

    // 1. Identify Client ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    clientId = urlParams.get('clientId') || urlParams.get('id') || 'TRAY-00001';
    clientData = store.getClient(clientId);

    // Update Client ID Badge in top bar
    const clientBadge = document.getElementById('topbarClientBadge');
    if (clientBadge) {
      clientBadge.textContent = clientId;
    }

    // 2. If already submitted, navigate straight to confirmation/success
    if (clientData.status === 'submitted') {
      currentStep = 7;
    } else {
      currentStep = 0;
    }

    // 3. Populate Form with existing data
    populateAllFormFields();

    // 4. Attach Event Listeners
    setupGlobalNavigation();
    setupFieldAutoSaveListeners();
    setupDynamicLists();
    setupChoicePills();
    setupUploadMocks();

    // 5. Render Initial View
    renderCurrentStep();
  }

  /* =========================================================================
     POPULATE FORM FIELDS FROM STORE DATA
     ========================================================================= */
  function populateAllFormFields() {
    if (!clientData) return;

    // --- PROFESSIONAL FLOW FIELDS ---
    if (clientData.personalInfo) {
      setInputValue('p1_nombre', clientData.personalInfo.nombre);
      setInputValue('p1_apellido', clientData.personalInfo.apellido);
      setInputValue('p1_nombreProfesional', clientData.personalInfo.nombreProfesional);
      setInputValue('p1_profesion', clientData.personalInfo.profesion);
      setInputValue('p1_especialidadPrincipal', clientData.personalInfo.especialidadPrincipal);
      setInputValue('p1_ciudad', clientData.personalInfo.ciudad);
      setInputValue('p1_email', clientData.personalInfo.email);
      setInputValue('p1_whatsapp', clientData.personalInfo.whatsapp);
      setInputValue('p1_nombreEnSitio', clientData.personalInfo.nombreEnSitio);
      selectSegmentedOption('p1_fotoStatus', clientData.personalInfo.fotoStatus || 'none');
    }

    if (clientData.history) {
      setInputValue('p2_presentacion', clientData.history.presentacionCorta);
      renderExperiencesList();
      renderEducationList();
    }

    if (clientData.offer) {
      renderServicesList();
      renderSpecialtiesChips();
      selectSegmentedOption('p3_hasProjects', clientData.offer.hasProjects ? 'yes' : 'no');
      toggleProjectsVisibility(clientData.offer.hasProjects);
      renderProjectsList();
    }

    if (clientData.contact) {
      setInputValue('p4_email', clientData.contact.email || clientData.personalInfo?.email);
      setInputValue('p4_whatsapp', clientData.contact.whatsapp || clientData.personalInfo?.whatsapp);
      setInputValue('p4_instagram', clientData.contact.instagram);
      setInputValue('p4_linkedin', clientData.contact.linkedin);
      setInputValue('p4_webActual', clientData.contact.sitioWebActual);
      setInputValue('p4_behance', clientData.contact.behance);
      setInputValue('p4_otrasRedes', clientData.contact.otrasRedes);
      selectSegmentedOption('p4_canalPrincipal', clientData.contact.canalPrincipal || 'whatsapp');
      selectSegmentedOption('p4_mostrarUbicacion', clientData.contact.mostrarUbicacion ? 'yes' : 'no');
      toggleLocationVisibility(clientData.contact.mostrarUbicacion);

      if (clientData.contact.ubicacion) {
        setInputValue('p4_ubi_ciudad', clientData.contact.ubicacion.ciudad);
        setInputValue('p4_ubi_provincia', clientData.contact.ubicacion.provincia);
        setInputValue('p4_ubi_pais', clientData.contact.ubicacion.pais || 'Argentina');
        setInputValue('p4_ubi_direccion', clientData.contact.ubicacion.direccion);
        setInputValue('p4_ubi_maps', clientData.contact.ubicacion.googleMapsUrl);
      }
    }

    if (clientData.style) {
      selectSegmentedOption('p5_tieneLogo', clientData.style.tieneLogo || 'no');
      toggleLogoUploadVisibility(clientData.style.tieneLogo === 'yes');
      setInputValue('p5_colores', clientData.style.coloresPreferidos);
      setInputValue('p5_loQueNoQuiere', clientData.style.loQueNoQuiere);
      renderReferencesList();
      renderSensationsPills();
      renderProfColorPicker();
    }

    // --- BUSINESS FLOW FIELDS ---
    if (!clientData.businessInfo) {
      clientData.businessInfo = {
        nombreNegocio: '',
        rubro: '',
        slogan: '',
        nombreResponsable: '',
        email: '',
        whatsapp: '',
        ciudad: '',
        tieneLogo: 'no',
        descripcionNegocio: '',
        serviciosProductos: [],
        promociones: '',
        catalogoUrl: '',
        tieneLocalFisico: 'yes',
        direccion: '',
        googleMapsUrl: '',
        horarios: { lunesViernes: '', sabados: '', domingosFeriados: '' },
        canalPrincipal: 'whatsapp',
        mensajeWhatsapp: '',
        instagram: '',
        otrasRedes: '',
        colorPrincipal: { name: 'Azul Klein', hex: '#0033FF' },
        ganchoComercial: '',
        loQueNoQuiere: ''
      };
    }

    const b = clientData.businessInfo;
    setInputValue('biz_nombre', b.nombreNegocio);
    setInputValue('biz_rubro', b.rubro);
    setInputValue('biz_slogan', b.slogan);
    setInputValue('biz_responsable', b.nombreResponsable);
    setInputValue('biz_ciudad', b.ciudad);
    setInputValue('biz_whatsapp', b.whatsapp);
    setInputValue('biz_email', b.email);
    setInputValue('biz_presentacion', b.descripcionNegocio);
    setInputValue('biz_promociones', b.promociones);
    setInputValue('biz_catalogoUrl', b.catalogoUrl);
    setInputValue('biz_direccion', b.direccion);
    setInputValue('biz_maps', b.googleMapsUrl);
    setInputValue('biz_horarios_lv', b.horarios?.lunesViernes);
    setInputValue('biz_horarios_sab', b.horarios?.sabados);
    setInputValue('biz_horarios_dom', b.horarios?.domingosFeriados);
    setInputValue('biz_mensajeWhatsapp', b.mensajeWhatsapp);
    setInputValue('biz_instagram', b.instagram);
    setInputValue('biz_otrasRedes', b.otrasRedes);
    setInputValue('biz_gancho', b.ganchoComercial);
    setInputValue('biz_loQueNoQuiere', b.loQueNoQuiere);

    selectSegmentedOption('biz_mostrarLocal', b.tieneLocalFisico || 'yes');
    selectSegmentedOption('biz_canalPrincipal', b.canalPrincipal || 'whatsapp');
    selectSegmentedOption('biz_tieneLogo', b.tieneLogo || 'no');

    renderBizServicesList();
    renderBizColorPicker();
  }

  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val || '';
  }

  function selectSegmentedOption(groupName, value) {
    const cards = document.querySelectorAll(`[data-group="${groupName}"]`);
    cards.forEach(card => {
      if (card.dataset.value === value) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });
  }

  /* =========================================================================
     STEP NAVIGATION & PROGRESS RENDERING
     ========================================================================= */
  function renderCurrentStep() {
    // 1. Hide all step panes
    document.querySelectorAll('.onboarding-step-pane').forEach(pane => {
      pane.classList.remove('active');
    });

    // 2. Determine pane to show
    let targetPaneId = 'stepPane_0';

    if (currentStep === 0) {
      targetPaneId = 'stepPane_0';
    } else if (currentStep === 'templates') {
      targetPaneId = 'stepPane_templates';
    } else if (currentStep === 6) {
      targetPaneId = 'stepPane_6';
    } else if (currentStep === 7) {
      targetPaneId = 'stepPane_7';
    } else {
      // Step 1 to 5
      if (clientData.serviceType === 'custom_business') {
        targetPaneId = `stepBiz_${currentStep}`;
      } else {
        targetPaneId = `stepPane_${currentStep}`;
      }
    }

    const activePane = document.getElementById(targetPaneId);
    if (activePane) {
      activePane.classList.add('active');
    }

    // 3. Scroll smoothly to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // 4. Update Progress Bar
    const progressWrapper = document.getElementById('progressWrapper');
    const stepLabel = document.getElementById('progressStepLabel');
    const percentageLabel = document.getElementById('progressPercentage');
    const fill = document.getElementById('progressFill');

    if (currentStep === 0 || currentStep === 'templates' || currentStep === 7) {
      if (progressWrapper) progressWrapper.style.display = 'none';
    } else {
      if (progressWrapper) progressWrapper.style.display = 'block';

      const isBusiness = clientData.serviceType === 'custom_business';
      const isTemplate = clientData.serviceType === 'template';

      const stepNames = {
        1: isBusiness ? 'Paso 1 de 5 — Tu Negocio' : 'Paso 1 de 5 — Sobre vos',
        2: isBusiness ? 'Paso 2 de 5 — Catálogo & Ofertas' : 'Paso 2 de 5 — Tu historia',
        3: isBusiness ? 'Paso 3 de 5 — Local & Horarios' : 'Paso 3 de 5 — Qué hacés',
        4: isBusiness ? 'Paso 4 de 5 — Canales de Venta' : 'Paso 4 de 5 — Dónde encontrarte',
        5: isBusiness ? 'Paso 5 de 5 — Color & Gancho' : 'Paso 5 de 5 — Cómo querés que se vea',
        6: 'Revisión final'
      };

      if (stepLabel) {
        let label = stepNames[currentStep] || '';
        if (isTemplate && clientData.selectedTemplate) {
          label += ` (${clientData.selectedTemplate.split('—')[0].trim()})`;
        }
        stepLabel.textContent = label;
      }

      const percent = currentStep === 6 ? 100 : Math.round((currentStep / 5) * 100);
      if (percentageLabel) percentageLabel.textContent = `${percent}%`;
      if (fill) fill.style.width = `${percent}%`;
    }

    // 5. If Step 6 (Review), build summary list
    if (currentStep === 6) {
      buildReviewSummary();
    }
  }

  function goToStep(targetStep) {
    // Validation when advancing from Step 1
    if (currentStep === 1 && targetStep > 1) {
      if (clientData.serviceType === 'custom_business') {
        if (!validateBizStep1()) return;
      } else {
        if (!validateProfStep1()) return;
      }
    }

    // Sync inputs before leaving
    syncFormInputsToState();
    triggerAutoSave();

    currentStep = targetStep;
    renderCurrentStep();
  }

  function validateProfStep1() {
    const nombre = document.getElementById('p1_nombre')?.value.trim();
    const apellido = document.getElementById('p1_apellido')?.value.trim();
    const profesion = document.getElementById('p1_profesion')?.value.trim();
    const email = document.getElementById('p1_email')?.value.trim();
    const whatsapp = document.getElementById('p1_whatsapp')?.value.trim();

    if (!nombre || !apellido || !profesion) {
      alert('Por favor completá tu nombre, apellido y profesión para continuar.');
      return false;
    }
    if (!email && !whatsapp) {
      alert('Por favor dejanos al menos un medio de contacto (Email o WhatsApp).');
      return false;
    }
    return true;
  }

  function validateBizStep1() {
    const nombre = document.getElementById('biz_nombre')?.value.trim();
    const rubro = document.getElementById('biz_rubro')?.value.trim();
    const responsable = document.getElementById('biz_responsable')?.value.trim();
    const whatsapp = document.getElementById('biz_whatsapp')?.value.trim();
    const email = document.getElementById('biz_email')?.value.trim();

    if (!nombre || !rubro || !responsable) {
      alert('Por favor completá el nombre de tu negocio, el rubro y el nombre del responsable para continuar.');
      return false;
    }
    if (!whatsapp && !email) {
      alert('Por favor dejanos el WhatsApp o Email comercial del negocio.');
      return false;
    }
    return true;
  }

  /* =========================================================================
     GLOBAL NAVIGATION SETUP
     ========================================================================= */
  function setupGlobalNavigation() {
    // 3 Options Selector (Step 0)
    document.getElementById('btnStartTemplate')?.addEventListener('click', () => {
      clientData.serviceType = 'template';
      currentStep = 'templates';
      renderCurrentStep();
      debouncedAutoSave();
    });

    document.getElementById('btnStartProfessional')?.addEventListener('click', () => {
      clientData.serviceType = 'custom_professional';
      goToStep(1);
    });

    document.getElementById('btnStartBusiness')?.addEventListener('click', () => {
      clientData.serviceType = 'custom_business';
      goToStep(1);
    });

    // Change Service Type Buttons (Top of Step 1)
    document.getElementById('btnChangeService_Prof')?.addEventListener('click', () => goToStep(0));
    document.getElementById('btnChangeService_Biz')?.addEventListener('click', () => goToStep(0));

    // Template Gallery Buttons
    document.getElementById('btnTemplates_Back')?.addEventListener('click', () => goToStep(0));
    document.getElementById('btnTemplates_Next')?.addEventListener('click', () => {
      if (!clientData.selectedTemplate) {
        clientData.selectedTemplate = 'Lexis — Legal & Consultoría';
      }
      goToStep(1);
    });

    document.querySelectorAll('.template-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        clientData.selectedTemplate = card.dataset.templateName || card.dataset.templateId;
        debouncedAutoSave();
      });
    });

    // --- PROFESSIONAL FLOW BUTTONS ---
    document.getElementById('btnStep1_Next')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnStep2_Back')?.addEventListener('click', () => goToStep(1));
    document.getElementById('btnStep2_Next')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btnStep3_Back')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnStep3_Next')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btnStep4_Back')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btnStep4_Next')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btnStep5_Back')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btnStep5_Next')?.addEventListener('click', () => goToStep(6));

    // --- BUSINESS FLOW BUTTONS ---
    document.getElementById('btnBiz1_Back')?.addEventListener('click', () => goToStep(0));
    document.getElementById('btnBiz1_Next')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnBiz2_Back')?.addEventListener('click', () => goToStep(1));
    document.getElementById('btnBiz2_Next')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btnBiz3_Back')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnBiz3_Next')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btnBiz4_Back')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btnBiz4_Next')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btnBiz5_Back')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btnBiz5_Next')?.addEventListener('click', () => goToStep(6));

    // --- REVIEW & SUBMIT BUTTONS ---
    document.getElementById('btnStep6_Back')?.addEventListener('click', () => goToStep(5));
    document.getElementById('btnSubmitFinal')?.addEventListener('click', () => handleFinalSubmit());
  }

  /* =========================================================================
     AUTO-SAVE ENGINE
     ========================================================================= */
  function setupFieldAutoSaveListeners() {
    const inputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        debouncedAutoSave();
      });
    });
  }

  function debouncedAutoSave() {
    const badge = document.getElementById('autosaveBadge');
    if (badge) {
      badge.classList.add('saving');
      badge.innerHTML = '<span class="autosave-dot"></span> Guardando...';
    }

    clearTimeout(autoSaveTimeout);
    autoSaveTimeout = setTimeout(() => {
      syncFormInputsToState();
      triggerAutoSave();
    }, 400);
  }

  function triggerAutoSave() {
    const store = window.OnboardingStore || window.TrayectoriaOnboardingStore;
    if (!store || !clientData) return;

    store.saveClient(clientId, clientData);

    const badge = document.getElementById('autosaveBadge');
    if (badge) {
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      badge.classList.remove('saving');
      badge.innerHTML = `<span class="autosave-dot"></span> Guardado automáticamente (${timeStr})`;
    }
  }

  function syncFormInputsToState() {
    if (!clientData) return;

    if (clientData.serviceType === 'custom_business') {
      if (!clientData.businessInfo) clientData.businessInfo = {};
      const b = clientData.businessInfo;
      b.nombreNegocio = getVal('biz_nombre');
      b.rubro = getVal('biz_rubro');
      b.slogan = getVal('biz_slogan');
      b.nombreResponsable = getVal('biz_responsable');
      b.ciudad = getVal('biz_ciudad');
      b.whatsapp = getVal('biz_whatsapp');
      b.email = getVal('biz_email');
      b.descripcionNegocio = getVal('biz_presentacion');
      b.promociones = getVal('biz_promociones');
      b.catalogoUrl = getVal('biz_catalogoUrl');
      b.direccion = getVal('biz_direccion');
      b.googleMapsUrl = getVal('biz_maps');
      if (!b.horarios) b.horarios = {};
      b.horarios.lunesViernes = getVal('biz_horarios_lv');
      b.horarios.sabados = getVal('biz_horarios_sab');
      b.horarios.domingosFeriados = getVal('biz_horarios_dom');
      b.mensajeWhatsapp = getVal('biz_mensajeWhatsapp');
      b.instagram = getVal('biz_instagram');
      b.otrasRedes = getVal('biz_otrasRedes');
      b.ganchoComercial = getVal('biz_gancho');
      b.loQueNoQuiere = getVal('biz_loQueNoQuiere');
    } else {
      if (!clientData.personalInfo) clientData.personalInfo = {};
      clientData.personalInfo.nombre = getVal('p1_nombre');
      clientData.personalInfo.apellido = getVal('p1_apellido');
      clientData.personalInfo.nombreProfesional = getVal('p1_nombreProfesional');
      clientData.personalInfo.profesion = getVal('p1_profesion');
      clientData.personalInfo.especialidadPrincipal = getVal('p1_especialidadPrincipal');
      clientData.personalInfo.ciudad = getVal('p1_ciudad');
      clientData.personalInfo.email = getVal('p1_email');
      clientData.personalInfo.whatsapp = getVal('p1_whatsapp');
      clientData.personalInfo.nombreEnSitio = getVal('p1_nombreEnSitio') || `${clientData.personalInfo.nombre} ${clientData.personalInfo.apellido}`.trim();

      if (!clientData.history) clientData.history = {};
      clientData.history.presentacionCorta = getVal('p2_presentacion');

      if (!clientData.contact) clientData.contact = {};
      clientData.contact.email = getVal('p4_email') || clientData.personalInfo.email;
      clientData.contact.whatsapp = getVal('p4_whatsapp') || clientData.personalInfo.whatsapp;
      clientData.contact.instagram = getVal('p4_instagram');
      clientData.contact.linkedin = getVal('p4_linkedin');
      clientData.contact.sitioWebActual = getVal('p4_webActual');
      clientData.contact.behance = getVal('p4_behance');
      clientData.contact.otrasRedes = getVal('p4_otrasRedes');

      if (clientData.contact.mostrarUbicacion) {
        if (!clientData.contact.ubicacion) clientData.contact.ubicacion = {};
        clientData.contact.ubicacion.ciudad = getVal('p4_ubi_ciudad');
        clientData.contact.ubicacion.provincia = getVal('p4_ubi_provincia');
        clientData.contact.ubicacion.pais = getVal('p4_ubi_pais') || 'Argentina';
        clientData.contact.ubicacion.direccion = getVal('p4_ubi_direccion');
        clientData.contact.ubicacion.googleMapsUrl = getVal('p4_ubi_maps');
      }

      if (!clientData.style) clientData.style = {};
      clientData.style.coloresPreferidos = getVal('p5_colores');
      clientData.style.loQueNoQuiere = getVal('p5_loQueNoQuiere');
    }
  }

  function getVal(id) {
    return document.getElementById(id)?.value.trim() || '';
  }

  /* =========================================================================
     SEGMENTED RADIO CONTROLS & COLOR PICKERS (SINGLE COLOR)
     ========================================================================= */
  function setupChoicePills() {
    // Segmented Cards (Radio behavior)
    document.querySelectorAll('.segmented-card').forEach(card => {
      card.addEventListener('click', () => {
        const group = card.dataset.group;
        const val = card.dataset.value;

        document.querySelectorAll(`[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');

        if (group === 'p1_fotoStatus') {
          clientData.personalInfo.fotoStatus = val;
        } else if (group === 'p3_hasProjects') {
          const has = (val === 'yes');
          clientData.offer.hasProjects = has;
          toggleProjectsVisibility(has);
        } else if (group === 'p4_canalPrincipal') {
          clientData.contact.canalPrincipal = val;
        } else if (group === 'p4_mostrarUbicacion') {
          const show = (val === 'yes');
          clientData.contact.mostrarUbicacion = show;
          toggleLocationVisibility(show);
        } else if (group === 'p5_tieneLogo') {
          clientData.style.tieneLogo = val;
          toggleLogoUploadVisibility(val === 'yes');
        } else if (group === 'biz_mostrarLocal') {
          clientData.businessInfo.tieneLocalFisico = val;
          const box = document.getElementById('bizLocationDetailContainer');
          if (box) box.style.display = (val === 'yes') ? 'block' : 'none';
        } else if (group === 'biz_canalPrincipal') {
          clientData.businessInfo.canalPrincipal = val;
        } else if (group === 'biz_tieneLogo') {
          clientData.businessInfo.tieneLogo = val;
        }

        debouncedAutoSave();
      });
    });

    renderProfColorPicker();
    renderBizColorPicker();
    renderSensationsPills();
  }

  // --- Professional Single Color Picker ---
  function renderProfColorPicker() {
    const grid = document.getElementById('colorPickerGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const activeColorHex = (clientData.style?.colorPrincipal?.hex || '#0033FF').toUpperCase();

    PRESET_COLORS.forEach(color => {
      const isSelected = activeColorHex === color.hex.toUpperCase();
      const card = document.createElement('div');
      card.className = `color-option-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <span class="color-option-box" style="background-color: ${color.hex};">
          <span class="color-option-check">✓</span>
        </span>
        <div class="color-option-info">
          <span class="color-option-name">${color.name}</span>
          <span class="color-option-hex">${color.hex}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        grid.querySelectorAll('.color-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        clientData.style.colorPrincipal = color;
        clientData.style.coloresPreferidos = `${color.name} (${color.hex})`;
        setInputValue('p5_colores', clientData.style.coloresPreferidos);
        debouncedAutoSave();
      });

      grid.appendChild(card);
    });

    setupProfCustomColor();
  }

  function setupProfCustomColor() {
    const input = document.getElementById('p5_customColorInput');
    const preview = document.getElementById('customColorPreviewBox');
    const hexLabel = document.getElementById('customColorHexLabel');
    if (!input || !preview || !hexLabel) return;

    input.addEventListener('change', (e) => {
      const hex = (e.target.value || '#0033FF').toUpperCase();
      preview.style.backgroundColor = hex;
      hexLabel.textContent = hex;

      const customObj = { name: 'Color Personalizado', hex: hex };
      clientData.style.colorPrincipal = customObj;
      clientData.style.coloresPreferidos = `Color Personalizado (${hex})`;
      setInputValue('p5_colores', clientData.style.coloresPreferidos);

      document.querySelectorAll('#colorPickerGrid .color-option-card').forEach(c => c.classList.remove('selected'));
      debouncedAutoSave();
    });

    input.addEventListener('input', (e) => {
      const hex = (e.target.value || '#0033FF').toUpperCase();
      preview.style.backgroundColor = hex;
      hexLabel.textContent = hex;
    });
  }

  // --- Business Single Color Picker ---
  function renderBizColorPicker() {
    const grid = document.getElementById('bizColorPickerGrid');
    if (!grid) return;

    grid.innerHTML = '';
    const activeColorHex = (clientData.businessInfo?.colorPrincipal?.hex || '#0033FF').toUpperCase();

    PRESET_COLORS.forEach(color => {
      const isSelected = activeColorHex === color.hex.toUpperCase();
      const card = document.createElement('div');
      card.className = `color-option-card ${isSelected ? 'selected' : ''}`;
      card.innerHTML = `
        <span class="color-option-box" style="background-color: ${color.hex};">
          <span class="color-option-check">✓</span>
        </span>
        <div class="color-option-info">
          <span class="color-option-name">${color.name}</span>
          <span class="color-option-hex">${color.hex}</span>
        </div>
      `;

      card.addEventListener('click', () => {
        grid.querySelectorAll('.color-option-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        clientData.businessInfo.colorPrincipal = color;
        debouncedAutoSave();
      });

      grid.appendChild(card);
    });

    setupBizCustomColor();
  }

  function setupBizCustomColor() {
    const input = document.getElementById('biz_customColorInput');
    const preview = document.getElementById('bizCustomColorPreviewBox');
    const hexLabel = document.getElementById('bizCustomColorHexLabel');
    if (!input || !preview || !hexLabel) return;

    input.addEventListener('change', (e) => {
      const hex = (e.target.value || '#0033FF').toUpperCase();
      preview.style.backgroundColor = hex;
      hexLabel.textContent = hex;

      clientData.businessInfo.colorPrincipal = { name: 'Color Personalizado', hex: hex };
      document.querySelectorAll('#bizColorPickerGrid .color-option-card').forEach(c => c.classList.remove('selected'));
      debouncedAutoSave();
    });

    input.addEventListener('input', (e) => {
      const hex = (e.target.value || '#0033FF').toUpperCase();
      preview.style.backgroundColor = hex;
      hexLabel.textContent = hex;
    });
  }

  function renderSensationsPills() {
    const container = document.getElementById('p5_sensations_container');
    if (!container) return;

    const options = ['Profesional', 'Minimalista', 'Elegante', 'Cercano', 'Moderno', 'Creativo', 'Institucional', 'Experimental'];
    container.innerHTML = '';

    options.forEach(opt => {
      const pill = document.createElement('div');
      pill.className = 'choice-pill';
      if (clientData.style?.sensaciones?.includes(opt)) {
        pill.classList.add('selected');
      }
      pill.textContent = opt;

      pill.addEventListener('click', () => {
        if (!clientData.style.sensaciones) clientData.style.sensaciones = [];
        if (clientData.style.sensaciones.includes(opt)) {
          clientData.style.sensaciones = clientData.style.sensaciones.filter(s => s !== opt);
          pill.classList.remove('selected');
        } else {
          clientData.style.sensaciones.push(opt);
          pill.classList.add('selected');
        }
        debouncedAutoSave();
      });

      container.appendChild(pill);
    });
  }

  function toggleProjectsVisibility(show) {
    const box = document.getElementById('projectsDetailContainer');
    if (box) box.style.display = show ? 'block' : 'none';
  }

  function toggleLocationVisibility(show) {
    const box = document.getElementById('locationDetailContainer');
    if (box) box.style.display = show ? 'block' : 'none';
  }

  function toggleLogoUploadVisibility(show) {
    const box = document.getElementById('logoUploadContainer');
    if (box) box.style.display = show ? 'block' : 'none';
  }

  function setupUploadMocks() {
    document.getElementById('p1_fotoFile')?.addEventListener('change', (e) => {
      handleImageMockUpload(e, (url) => {
        clientData.personalInfo.fotoPreviewUrl = url;
        clientData.personalInfo.fotoStatus = 'upload';
        selectSegmentedOption('p1_fotoStatus', 'upload');
        debouncedAutoSave();
      });
    });

    document.getElementById('p5_logoFile')?.addEventListener('change', (e) => {
      handleImageMockUpload(e, (url) => {
        clientData.style.logoPreviewUrl = url;
        debouncedAutoSave();
      });
    });
  }

  function handleImageMockUpload(event, callback) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      if (callback) callback(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  /* =========================================================================
     DYNAMIC LISTS IMPLEMENTATION
     ========================================================================= */
  function setupDynamicLists() {
    // Professional: Experiencias
    document.getElementById('btnAddExperience')?.addEventListener('click', () => {
      if (!clientData.history.experiencias) clientData.history.experiencias = [];
      clientData.history.experiencias.push({
        id: 'exp_' + Date.now(),
        lugar: '',
        rol: '',
        anio: '',
        descripcion: ''
      });
      renderExperiencesList();
      debouncedAutoSave();
    });

    // Professional: Formación
    document.getElementById('btnAddEducation')?.addEventListener('click', () => {
      if (!clientData.history.formacion) clientData.history.formacion = [];
      clientData.history.formacion.push({
        id: 'for_' + Date.now(),
        institucion: '',
        carrera: '',
        anio: ''
      });
      renderEducationList();
      debouncedAutoSave();
    });

    // Professional: Servicios
    document.getElementById('btnAddService')?.addEventListener('click', () => {
      if (!clientData.offer.servicios) clientData.offer.servicios = [];
      clientData.offer.servicios.push({
        id: 'srv_' + Date.now(),
        nombre: '',
        descripcion: ''
      });
      renderServicesList();
      debouncedAutoSave();
    });

    // Professional: Proyectos
    document.getElementById('btnAddProject')?.addEventListener('click', () => {
      if (!clientData.offer.proyectos) clientData.offer.proyectos = [];
      clientData.offer.proyectos.push({
        id: 'pro_' + Date.now(),
        nombre: '',
        descripcion: '',
        anio: '',
        url: ''
      });
      renderProjectsList();
      debouncedAutoSave();
    });

    // Professional: Referencias
    document.getElementById('btnAddReference')?.addEventListener('click', () => {
      if (!clientData.style.sitiosReferencia) clientData.style.sitiosReferencia = [];
      clientData.style.sitiosReferencia.push({
        id: 'ref_' + Date.now(),
        url: '',
        queTeGusta: ''
      });
      renderReferencesList();
      debouncedAutoSave();
    });

    // Business: Servicios / Productos
    document.getElementById('btnBizAddService')?.addEventListener('click', () => {
      if (!clientData.businessInfo.serviciosProductos) clientData.businessInfo.serviciosProductos = [];
      clientData.businessInfo.serviciosProductos.push({
        id: 'biz_srv_' + Date.now(),
        nombre: '',
        descripcion: '',
        precio: ''
      });
      renderBizServicesList();
      debouncedAutoSave();
    });
  }

  // ── Render Experiencias
  function renderExperiencesList() {
    const container = document.getElementById('experiencesContainer');
    if (!container) return;

    const list = clientData.history.experiencias || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Experiencia #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-exp" data-index="${index}">✕ Eliminar</button>
        </div>
        <div class="field-grid-3" style="margin-bottom: 10px;">
          <input type="text" class="form-input" placeholder="Lugar / Empresa / Estudio" value="${escapeHtml(item.lugar)}" data-field="lugar" data-index="${index}">
          <input type="text" class="form-input" placeholder="Rol / Cargo" value="${escapeHtml(item.rol)}" data-field="rol" data-index="${index}">
          <input type="text" class="form-input" placeholder="Años (ej: 2020 - 2024)" value="${escapeHtml(item.anio)}" data-field="anio" data-index="${index}">
        </div>
        <textarea class="form-textarea" placeholder="Descripción breve de tus responsabilidades o logros..." data-field="descripcion" data-index="${index}" style="min-height: 70px;">${escapeHtml(item.descripcion)}</textarea>
      `;

      card.querySelectorAll('input, textarea').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.history.experiencias[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-exp"]').addEventListener('click', () => {
        clientData.history.experiencias.splice(index, 1);
        renderExperiencesList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  // ── Render Formación
  function renderEducationList() {
    const container = document.getElementById('educationContainer');
    if (!container) return;

    const list = clientData.history.formacion || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Estudio #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-for" data-index="${index}">✕ Eliminar</button>
        </div>
        <div class="field-grid-3">
          <input type="text" class="form-input" placeholder="Institución / Universidad" value="${escapeHtml(item.institucion)}" data-field="institucion" data-index="${index}">
          <input type="text" class="form-input" placeholder="Título / Carrera" value="${escapeHtml(item.carrera)}" data-field="carrera" data-index="${index}">
          <input type="text" class="form-input" placeholder="Año de egreso" value="${escapeHtml(item.anio)}" data-field="anio" data-index="${index}">
        </div>
      `;

      card.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.history.formacion[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-for"]').addEventListener('click', () => {
        clientData.history.formacion.splice(index, 1);
        renderEducationList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  // ── Render Servicios Profesionales
  function renderServicesList() {
    const container = document.getElementById('servicesContainer');
    if (!container) return;

    const list = clientData.offer.servicios || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Servicio #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-srv" data-index="${index}">✕ Eliminar</button>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <input type="text" class="form-input" placeholder="Nombre del servicio (ej: Terapia Individual, Proyecto de Obra)" value="${escapeHtml(item.nombre)}" data-field="nombre" data-index="${index}" style="font-weight: 700;">
          <textarea class="form-textarea" placeholder="Breve descripción del servicio para tu cliente..." data-field="descripcion" data-index="${index}" style="min-height: 70px;">${escapeHtml(item.descripcion)}</textarea>
        </div>
      `;

      card.querySelectorAll('input, textarea').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.offer.servicios[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-srv"]').addEventListener('click', () => {
        clientData.offer.servicios.splice(index, 1);
        renderServicesList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  // ── Render Especialidades (Chips)
  function renderSpecialtiesChips() {
    const container = document.getElementById('specialtiesChipsContainer');
    if (!container) return;

    const list = clientData.offer.especialidades || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const chip = document.createElement('div');
      chip.className = 'choice-pill selected';
      chip.innerHTML = `<span>${escapeHtml(item)}</span> <span style="font-size:0.75rem; margin-left:4px; opacity:0.8;">✕</span>`;
      chip.style.cursor = 'pointer';

      chip.addEventListener('click', () => {
        clientData.offer.especialidades.splice(index, 1);
        renderSpecialtiesChips();
        debouncedAutoSave();
      });

      container.appendChild(chip);
    });
  }

  // ── Render Proyectos
  function renderProjectsList() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    const list = clientData.offer.proyectos || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Proyecto #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-pro" data-index="${index}">✕ Eliminar</button>
        </div>
        <div class="field-grid-3" style="margin-bottom: 10px;">
          <input type="text" class="form-input" placeholder="Nombre del proyecto" value="${escapeHtml(item.nombre)}" data-field="nombre" data-index="${index}" style="font-weight: 700;">
          <input type="text" class="form-input" placeholder="Año (ej: 2024)" value="${escapeHtml(item.anio)}" data-field="anio" data-index="${index}">
          <input type="text" class="form-input" placeholder="Link / URL (opcional)" value="${escapeHtml(item.url)}" data-field="url" data-index="${index}">
        </div>
        <textarea class="form-textarea" placeholder="Descripción breve del caso o trabajo..." data-field="descripcion" data-index="${index}" style="min-height: 70px;">${escapeHtml(item.descripcion)}</textarea>
      `;

      card.querySelectorAll('input, textarea').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.offer.proyectos[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-pro"]').addEventListener('click', () => {
        clientData.offer.proyectos.splice(index, 1);
        renderProjectsList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  // ── Render Referencias Web
  function renderReferencesList() {
    const container = document.getElementById('referencesContainer');
    if (!container) return;

    const list = clientData.style.sitiosReferencia || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Referencia #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-ref" data-index="${index}">✕ Eliminar</button>
        </div>
        <div class="field-grid-2">
          <input type="text" class="form-input" placeholder="URL o nombre (ej: https://apple.com)" value="${escapeHtml(item.url)}" data-field="url" data-index="${index}">
          <input type="text" class="form-input" placeholder="¿Qué te gusta? (ej: la tipografía, los espacios limpios)" value="${escapeHtml(item.queTeGusta)}" data-field="queTeGusta" data-index="${index}">
        </div>
      `;

      card.querySelectorAll('input').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.style.sitiosReferencia[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-ref"]').addEventListener('click', () => {
        clientData.style.sitiosReferencia.splice(index, 1);
        renderReferencesList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  // ── Render Servicios / Productos de Negocios
  function renderBizServicesList() {
    const container = document.getElementById('bizServicesContainer');
    if (!container) return;

    const list = clientData.businessInfo?.serviciosProductos || [];
    container.innerHTML = '';

    list.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'dynamic-item-card';
      card.innerHTML = `
        <div class="dynamic-item-top">
          <span class="dynamic-item-badge">Producto / Servicio #${index + 1}</span>
          <button type="button" class="btn-remove-item" data-action="delete-biz-srv" data-index="${index}">✕ Eliminar</button>
        </div>
        <div class="field-grid-2" style="margin-bottom: 10px;">
          <input type="text" class="form-input" placeholder="Nombre (ej: Pase Libre Mensual / Café de Especialidad)" value="${escapeHtml(item.nombre)}" data-field="nombre" data-index="${index}" style="font-weight: 700;">
          <input type="text" class="form-input" placeholder="Precio o Plan sugerido (ej: $25.000 / $4.500)" value="${escapeHtml(item.precio)}" data-field="precio" data-index="${index}">
        </div>
        <textarea class="form-textarea" placeholder="Descripción breve del producto o qué incluye..." data-field="descripcion" data-index="${index}" style="min-height: 60px;">${escapeHtml(item.descripcion)}</textarea>
      `;

      card.querySelectorAll('input, textarea').forEach(inp => {
        inp.addEventListener('input', (e) => {
          const field = e.target.dataset.field;
          const idx = parseInt(e.target.dataset.index);
          clientData.businessInfo.serviciosProductos[idx][field] = e.target.value;
          debouncedAutoSave();
        });
      });

      card.querySelector('[data-action="delete-biz-srv"]').addEventListener('click', () => {
        clientData.businessInfo.serviciosProductos.splice(index, 1);
        renderBizServicesList();
        debouncedAutoSave();
      });

      container.appendChild(card);
    });
  }

  /* =========================================================================
     STEP 6: REVIEW SUMMARY
     ========================================================================= */
  function buildReviewSummary() {
    syncFormInputsToState();

    if (clientData.serviceType === 'custom_business') {
      const b = clientData.businessInfo || {};
      
      // 1. Datos Negocio
      const b1 = `${b.nombreNegocio || 'Sin nombre'} · ${b.rubro || 'Comercio'} · ${b.ciudad || 'Sin ciudad'} · Resp: ${b.nombreResponsable || 'N/A'}`;
      setHtml('review_p1_summary', b1);

      // 2. Oferta & Catálogo
      const srvCount = b.serviciosProductos?.length || 0;
      const b2 = `${srvCount} producto(s)/servicio(s) · Promos: ${b.promociones || 'Ninguna'} · ${b.descripcionNegocio ? 'Descripción lista' : 'Sin descripción'}`;
      setHtml('review_p2_summary', b2);

      // 3. Local & Horarios
      const locStr = b.tieneLocalFisico === 'yes' ? (b.direccion || 'Local físico') : '100% Online / Envíos';
      const b3 = `${locStr} · Horarios: L-V ${b.horarios?.lunesViernes || 'N/A'}, Sáb ${b.horarios?.sabados || 'N/A'}`;
      setHtml('review_p3_summary', b3);

      // 4. Canales
      const b4 = `WhatsApp: ${b.whatsapp || 'Sin WhatsApp'} · IG: ${b.instagram || 'Sin Instagram'} · Canal: ${b.canalPrincipal || 'WhatsApp'}`;
      setHtml('review_p4_summary', b4);

      // 5. Identidad & Gancho
      const col = b.colorPrincipal?.name ? `${b.colorPrincipal.name} (${b.colorPrincipal.hex})` : 'Azul Klein (#0033FF)';
      const b5 = `Color: ${col} · Gancho: "${b.ganchoComercial || 'Sin gancho cargado'}"`;
      setHtml('review_p5_summary', b5);

    } else {
      // 1. Sobre vos
      const p1 = clientData.personalInfo || {};
      const nameStr = p1.nombreEnSitio || `${p1.nombre} ${p1.apellido}`;
      const p1Summary = `${nameStr} · ${p1.profesion || 'Profesional'} · ${p1.ciudad || 'Sin ciudad'}`;
      setHtml('review_p1_summary', p1Summary);

      // 2. Tu historia
      const h = clientData.history || {};
      const expCount = h.experiencias?.length || 0;
      const forCount = h.formacion?.length || 0;
      const introSnippet = h.presentacionCorta ? `"${h.presentacionCorta.substring(0, 65)}..."` : 'Sin presentación';
      const p2Summary = `${introSnippet} · ${expCount} experiencia(s) · ${forCount} estudio(s)`;
      setHtml('review_p2_summary', p2Summary);

      // 3. Qué hacés
      const o = clientData.offer || {};
      const srvCount = o.servicios?.length || 0;
      const specCount = o.especialidades?.length || 0;
      const p3Summary = `${srvCount} servicio(s) · ${specCount} especialidad(es)`;
      setHtml('review_p3_summary', p3Summary);

      // 4. Dónde encontrarte
      const c = clientData.contact || {};
      const p4Summary = `WhatsApp: ${c.whatsapp || p1.whatsapp || 'N/A'} · Email: ${c.email || p1.email || 'N/A'}`;
      setHtml('review_p4_summary', p4Summary);

      // 5. Estilo
      const s = clientData.style || {};
      const colStr = s.colorPrincipal?.name ? `${s.colorPrincipal.name} (${s.colorPrincipal.hex})` : (s.coloresPreferidos || 'Azul Klein');
      const p5Summary = `Color principal: ${colStr} · Vibra: ${(s.sensaciones || []).join(', ') || 'Profesional'}`;
      setHtml('review_p5_summary', p5Summary);
    }

    // Edit button listeners
    document.getElementById('btnEditP1')?.addEventListener('click', () => goToStep(1));
    document.getElementById('btnEditP2')?.addEventListener('click', () => goToStep(2));
    document.getElementById('btnEditP3')?.addEventListener('click', () => goToStep(3));
    document.getElementById('btnEditP4')?.addEventListener('click', () => goToStep(4));
    document.getElementById('btnEditP5')?.addEventListener('click', () => goToStep(5));
  }

  function setHtml(id, html) {
    const el = document.getElementById(id);
    if (el) el.textContent = html;
  }

  /* =========================================================================
     FINAL SUBMISSION
     ========================================================================= */
  function handleFinalSubmit() {
    syncFormInputsToState();

    const store = window.OnboardingStore || window.TrayectoriaOnboardingStore;
    if (store) {
      store.submitClient(clientId, clientData);
    }

    currentStep = 7;
    renderCurrentStep();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
