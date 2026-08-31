/**
 * TRAYECTORIA — Client Onboarding Store & Data Layer
 * Architecture prepared for local storage & future Supabase integration
 */

(function () {
  'use strict';

  // Key for local storage persistence
  const STORAGE_KEY_PREFIX = 'trayectoria_onboarding_';
  const CLIENTS_INDEX_KEY = 'trayectoria_clients_index';

  /**
   * Default Empty Schema for a Client Onboarding Submission
   */
  function createEmptyOnboarding(clientId = 'TRAY-00001') {
    return {
      clientId: clientId,
      status: 'in_progress', // 'not_started' | 'in_progress' | 'submitted'
      serviceType: 'custom_professional', // 'template' | 'custom_professional' | 'custom_business'
      selectedTemplate: '',
      currentStep: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: null,

      // Paso 1: Sobre vos
      personalInfo: {
        nombre: '',
        apellido: '',
        nombreProfesional: '', // ej: "Dra. Valentina Moreno" o "Estudio Benítez"
        profesion: '',        // ej: "Arquitecto", "Psicóloga"
        especialidadPrincipal: '', // ej: "Terapia Cognitivo Conductual", "Reformas"
        ciudad: '',
        email: '',
        whatsapp: '',
        nombreEnSitio: '',    // ¿Cómo querés que aparezca tu nombre en tu sitio?
        fotoStatus: 'none',   // 'upload' | 'later' | 'none'
        fotoPreviewUrl: ''    // dataURL / blob url mock
      },

      // Paso 2: Tu historia
      history: {
        presentacionCorta: '', // Si alguien entra a tu web, ¿cómo te gustaría presentarte?
        experiencias: [
          // { id: '1', lugar: 'Estudio Zaldívar', rol: 'Arquitecto Proyectista', anio: '2021 - 2024', descripcion: 'Desarrollo de viviendas unifamiliares.' }
        ],
        formacion: [
          // { id: '1', institucion: 'FADU - UBA', carrera: 'Arquitectura', anio: '2019' }
        ]
      },

      // Paso 3: Qué hacés
      offer: {
        servicios: [
          // { id: '1', nombre: 'Proyecto de Arquitectura', descripcion: 'Diseño integral desde el anteproyecto hasta el legajo técnico.' }
        ],
        especialidades: [], // ['Viviendas unifamiliares', 'Interiorismo', 'Reformas']
        hasProjects: false,
        proyectos: [
          // { id: '1', nombre: 'Casa en Pilar', descripcion: 'Reforma integral 240m2', anio: '2024', url: 'https://...', imagenes: [] }
        ]
      },

      // Paso 4: Dónde encontrarte
      contact: {
        email: '',
        whatsapp: '',
        instagram: '',
        linkedin: '',
        sitioWebActual: '',
        behance: '',
        otrasRedes: '',
        canalPrincipal: 'whatsapp', // 'whatsapp' | 'email' | 'instagram' | 'formulario'
        mostrarUbicacion: false,
        ubicacion: {
          ciudad: '',
          provincia: '',
          pais: 'Argentina',
          direccion: '',
          googleMapsUrl: ''
        }
      },

      // Paso 5: Cómo querés que se vea
      style: {
        tieneLogo: 'no', // 'yes' | 'no'
        logoPreviewUrl: '',
        coloresPreferidos: '', // Text or Hex, ej: "Azul cobalto y blanco cálido"
        sitiosReferencia: [
          // { url: 'https://ejemplo.com', queTeGusta: 'La tipografía y lo limpio que se ve' }
        ],
        sensaciones: [], // ['Profesional', 'Minimalista', 'Elegante', 'Cercano', 'Moderno', 'Creativo', 'Institucional', 'Experimental']
        loQueNoQuiere: '', // ej: "No quiero fondos negros ni textos muy largos"
        fotosAdicionales: [] // array de previews mock
      }
    };
  }

  /**
   * Demo Seed Clients (Juan Pérez - Arquitecto partially completed)
   */
  const SEED_CLIENTS = {
    'TRAY-00001': {
      clientId: 'TRAY-00001',
      status: 'in_progress',
      currentStep: 3,
      createdAt: '2026-08-28T14:30:00.000Z',
      updatedAt: new Date().toISOString(),
      submittedAt: null,
      personalInfo: {
        nombre: 'Juan',
        apellido: 'Pérez',
        nombreProfesional: 'Arq. Juan Pérez',
        profesion: 'Arquitecto',
        especialidadPrincipal: 'Arquitectura Residencial & Reformas',
        ciudad: 'Buenos Aires',
        email: 'juan.perez.arq@gmail.com',
        whatsapp: '+54 9 11 5544-3322',
        nombreEnSitio: 'Arq. Juan Pérez',
        fotoStatus: 'later',
        fotoPreviewUrl: ''
      },
      history: {
        presentacionCorta: 'Soy arquitecto especializado en proyectos residenciales contemporáneos y reformas integrales en CABA y Zona Norte. Diseño espacios funcionales con foco en iluminación natural.',
        experiencias: [
          {
            id: 'exp-1',
            lugar: 'Estudio Pérez & Asociados',
            rol: 'Director de Proyectos',
            anio: '2020 - Actualidad',
            descripcion: 'Dirección de obra y proyecto para más de 15 viviendas unifamiliares.'
          }
        ],
        formacion: [
          {
            id: 'for-1',
            institucion: 'FADU — Universidad de Buenos Aires',
            carrera: 'Arquitectura',
            anio: '2018'
          }
        ]
      },
      offer: {
        servicios: [
          {
            id: 'srv-1',
            nombre: 'Proyecto y Dirección de Obra',
            descripcion: 'Acompañamiento desde la primera idea hasta la entrega de llave en mano.'
          },
          {
            id: 'srv-2',
            nombre: 'Reformas Integrales de Departamentos',
            descripcion: 'Optimización de plantas, interiorismo y modernización de cocinas y baños.'
          }
        ],
        especialidades: ['Viviendas Unifamiliares', 'Reformas en PH', 'Interiorismo'],
        hasProjects: true,
        proyectos: [
          {
            id: 'pro-1',
            nombre: 'Casa Bosque — Cariló',
            descripcion: 'Vivienda unifamiliar sustentable de 220 m² en hormigón y madera.',
            anio: '2024',
            url: '',
            imagenes: []
          }
        ]
      },
      contact: {
        email: 'juan.perez.arq@gmail.com',
        whatsapp: '+54 9 11 5544-3322',
        instagram: '@juanperez.arquitectura',
        linkedin: 'linkedin.com/in/juanperez-arq',
        sitioWebActual: '',
        behance: '',
        otrasRedes: '',
        canalPrincipal: 'whatsapp',
        mostrarUbicacion: true,
        ubicacion: {
          ciudad: 'Palermo Soho, CABA',
          provincia: 'Buenos Aires',
          pais: 'Argentina',
          direccion: 'Nicaragua 4900',
          googleMapsUrl: 'https://maps.google.com'
        }
      },
      style: {
        tieneLogo: 'no',
        logoPreviewUrl: '',
        coloresPreferidos: 'Blanco puro, gris concreto (#F1F5F9) y azul eléctrico de acento',
        sitiosReferencia: [
          {
            url: 'https://thewellnessclub.com.ar/',
            queTeGusta: 'Me gusta mucho la tipografía grande y el estilo limpio sin saturación'
          }
        ],
        sensaciones: ['Profesional', 'Minimalista', 'Moderno', 'Elegante'],
        loQueNoQuiere: 'No quiero colores oscuros de fondo ni carruseles que giren solos demasiado rápido.',
        fotosAdicionales: []
      }
    },
    'TRAY-00002': {
      clientId: 'TRAY-00002',
      status: 'not_started',
      currentStep: 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      submittedAt: null,
      personalInfo: {
        nombre: 'Valentina',
        apellido: 'Moreno',
        nombreProfesional: 'Dra. Valentina Moreno',
        profesion: 'Psicóloga Clínica',
        especialidadPrincipal: 'Terapia Cognitivo Conductual (TCC)',
        ciudad: 'CABA',
        email: 'dra.valentinamoreno@gmail.com',
        whatsapp: '+54 9 11 3322-1100',
        nombreEnSitio: 'Dra. Valentina Moreno',
        fotoStatus: 'none',
        fotoPreviewUrl: ''
      },
      history: {
        presentacionCorta: '',
        experiencias: [],
        formacion: []
      },
      offer: {
        servicios: [],
        especialidades: [],
        hasProjects: false,
        proyectos: []
      },
      contact: {
        email: 'dra.valentinamoreno@gmail.com',
        whatsapp: '+54 9 11 3322-1100',
        instagram: '',
        linkedin: '',
        sitioWebActual: '',
        behance: '',
        otrasRedes: '',
        canalPrincipal: 'whatsapp',
        mostrarUbicacion: false,
        ubicacion: {
          ciudad: '',
          provincia: '',
          pais: 'Argentina',
          direccion: '',
          googleMapsUrl: ''
        }
      },
      style: {
        tieneLogo: 'no',
        logoPreviewUrl: '',
        coloresPreferidos: '',
        sitiosReferencia: [],
        sensaciones: [],
        loQueNoQuiere: '',
        fotosAdicionales: []
      }
    }
  };

  /**
   * ONBOARDING STORE INTERFACE (Local/Mock -> Supabase Ready)
   */
  const OnboardingStore = {
    /**
     * Initializes default seeds in LocalStorage if not present
     */
    init: function () {
      try {
        let index = this.getClientsIndex();
        if (index.length === 0) {
          // Seed TRAY-00001 and TRAY-00002
          Object.keys(SEED_CLIENTS).forEach(id => {
            const data = SEED_CLIENTS[id];
            localStorage.setItem(STORAGE_KEY_PREFIX + id, JSON.stringify(data));
          });
          localStorage.setItem(CLIENTS_INDEX_KEY, JSON.stringify(Object.keys(SEED_CLIENTS)));
        }
      } catch (e) {
        console.warn('LocalStorage error during OnboardingStore init:', e);
      }
    },

    /**
     * Retrieves client onboarding by ID
     */
    getClient: function (clientId) {
      this.init();
      if (!clientId) clientId = 'TRAY-00001';
      
      try {
        const raw = localStorage.getItem(STORAGE_KEY_PREFIX + clientId);
        if (raw) {
          return JSON.parse(raw);
        }
      } catch (e) {
        console.warn('Error reading from localStorage:', e);
      }

      // If not in storage but is a seed
      if (SEED_CLIENTS[clientId]) {
        return JSON.parse(JSON.stringify(SEED_CLIENTS[clientId]));
      }

      // Create new blank schema
      const newClient = createEmptyOnboarding(clientId);
      this.saveClient(clientId, newClient);
      return newClient;
    },

    /**
     * Supabase Cloud Connector
     */
    getSupabase: function () {
      if (window._trayectoriaSupabaseClient) return window._trayectoriaSupabaseClient;
      const SUPABASE_URL = 'https://boazzxgfxywpqioouyvf.supabase.co';
      const SUPABASE_KEY = 'sb_publishable_-BwE2GKzMoXjM6omTbat2Q_V0M3jJba';
      if (window.supabase && typeof window.supabase.createClient === 'function') {
        try {
          window._trayectoriaSupabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
        } catch (err) {
          console.warn('Could not initialize Supabase client:', err);
        }
      }
      return window._trayectoriaSupabaseClient || null;
    },

    /**
     * Asynchronously syncs client data to Supabase Cloud
     */
    syncToSupabase: async function (clientId, data) {
      const sb = this.getSupabase();
      if (!sb) return;

      try {
        const p = data.personalInfo || {};
        const fullName = `${p.nombre || ''} ${p.apellido || ''}`.trim() || 'Nuevo Cliente';
        const commercialName = p.nombreEnSitio || p.nombreProfesional || fullName;
        const profession = p.profesion || 'Profesional';
        const today = new Date().toISOString().split('T')[0];

        const mappedContent = {
          identity: {
            name: commercialName,
            profession: profession,
            colors: data.style?.coloresPreferidos ? [data.style.coloresPreferidos] : ['#0033FF', '#FFFFFF'],
            fonts: 'Plus Jakarta Sans',
            isComplete: !!(p.nombre && p.profesion),
          },
          presentation: {
            bio: data.history?.presentacionCorta || '',
            shortDescription: p.especialidadPrincipal || '',
            mainSlogan: commercialName,
            isComplete: !!data.history?.presentacionCorta,
          },
          services: {
            items: (data.offer?.servicios || []).map((s, idx) => ({
              id: s.id || `srv-${idx}`,
              name: s.nombre,
              description: s.descripcion,
            })),
            isComplete: (data.offer?.servicios?.length || 0) > 0,
          },
          education: {
            items: (data.history?.formacion || []).map((f, idx) => ({
              id: f.id || `for-${idx}`,
              career: f.carrera,
              institution: f.institucion,
              year: f.anio,
            })),
            isComplete: (data.history?.formacion?.length || 0) > 0,
          },
          experience: {
            items: (data.history?.experiencias || []).map((e, idx) => ({
              id: e.id || `exp-${idx}`,
              role: e.rol,
              company: e.lugar,
              year: e.anio,
              description: e.descripcion,
            })),
            isComplete: (data.history?.experiencias?.length || 0) > 0,
          },
          contact: {
            whatsapp: data.contact?.whatsapp || p.whatsapp || '',
            email: data.contact?.email || p.email || '',
            instagram: data.contact?.instagram || '',
            linkedin: data.contact?.linkedin || '',
            location: data.contact?.ubicacion?.ciudad || p.ciudad || 'Buenos Aires',
            googleMapsUrl: data.contact?.ubicacion?.googleMapsUrl || '',
            isComplete: !!(data.contact?.whatsapp || data.contact?.email),
          },
          portfolio: {
            items: (data.offer?.proyectos || []).map((pr, idx) => ({
              id: pr.id || `pro-${idx}`,
              title: pr.nombre,
              description: pr.descripcion,
              year: pr.anio,
              url: pr.url,
            })),
            isComplete: (data.offer?.proyectos?.length || 0) > 0,
          },
        };

        let contractedProduct = 'Web Profesional 72hs';
        let priceStr = '$95 USD';
        if (data.serviceType === 'template') {
          contractedProduct = `Plantilla Web (${data.selectedTemplate || 'Express'})`;
          priceStr = '$45 USD';
        } else if (data.serviceType === 'custom_business') {
          contractedProduct = 'Web Comercial Negocio';
          priceStr = '$120 USD';
        }

        const clientRow = {
          id: clientId,
          full_name: fullName,
          commercial_name: commercialName,
          profession: profession,
          email: data.contact?.email || p.email || '',
          whatsapp: data.contact?.whatsapp || p.whatsapp || '',
          instagram: data.contact?.instagram || '',
          linkedin: data.contact?.linkedin || '',
          city: p.ciudad || data.contact?.ubicacion?.ciudad || 'Buenos Aires',
          country: 'Argentina',
          status: data.status === 'submitted' ? 'Activo' : 'Prospecto',
          price: priceStr,
          contracted_product: contractedProduct,
          specialties: data.offer?.especialidades || [],
          bio: data.history?.presentacionCorta || '',
          short_description: p.especialidadPrincipal || '',
          commercial_notes: `Servicio: ${contractedProduct}. Sensaciones: ${(data.style?.sensaciones || []).join(', ')}.`,
          content: mappedContent,
          last_contact: today,
        };

        await sb.from('clients').upsert(clientRow, { onConflict: 'id' });

        if (data.status === 'submitted') {
          const numPart = clientId.replace('TRAY-', '');
          const projectId = `PROJ-${numPart}`;

          const projectRow = {
            id: projectId,
            client_id: clientId,
            client_name: fullName,
            name: `${commercialName} — ${contractedProduct}`,
            project_type: contractedProduct,
            status: 'En diseño',
            start_date: today,
            price: priceStr,
            responsible: 'Operaciones Trayectoria',
            notes: `Proyecto generado automáticamente vía Onboarding (${contractedProduct}).`,
          };
          await sb.from('projects').upsert(projectRow, { onConflict: 'id' });

          const actRow = {
            id: `ACT-${Date.now().toString().slice(-6)}`,
            client_id: clientId,
            client_name: fullName,
            project_id: projectId,
            type: 'client_created',
            title: 'Información recibida desde formulario web',
            description: `${fullName} (${profession}) completó y envió todos los datos para su sitio web.`,
            date: today,
            author: 'Onboarding Web',
          };
          await sb.from('activity_logs').insert([actRow]);
        }
      } catch (err) {
        console.warn('Supabase sync warning:', err);
      }
    },

    /**
     * Saves or merges client onboarding data into storage & Supabase
     */
    saveClient: function (clientId, data) {
      if (!clientId) clientId = 'TRAY-00001';
      
      data.updatedAt = new Date().toISOString();
      
      try {
        localStorage.setItem(STORAGE_KEY_PREFIX + clientId, JSON.stringify(data));
        
        // Update index list
        let index = this.getClientsIndex();
        if (!index.includes(clientId)) {
          index.push(clientId);
          localStorage.setItem(CLIENTS_INDEX_KEY, JSON.stringify(index));
        }

        // Async cloud sync
        this.syncToSupabase(clientId, data);
        
        return { success: true, data: data };
      } catch (e) {
        console.error('Error saving onboarding data to localStorage:', e);
        return { success: false, error: e };
      }
    },

    /**
     * Marks the client onboarding as submitted
     */
    submitClient: function (clientId) {
      const client = this.getClient(clientId);
      client.status = 'submitted';
      client.submittedAt = new Date().toISOString();
      return this.saveClient(clientId, client);
    },

    /**
     * Returns list of all known client IDs
     */
    getClientsIndex: function () {
      try {
        const raw = localStorage.getItem(CLIENTS_INDEX_KEY);
        return raw ? JSON.parse(raw) : [];
      } catch (e) {
        return [];
      }
    },

    /**
     * Returns all client records (for internal admin panel)
     */
    getAllClients: function () {
      this.init();
      const ids = this.getClientsIndex();
      return ids.map(id => this.getClient(id)).filter(Boolean);
    },

    /**
     * Calculates completion percentage (0 to 100%)
     */
    calculateProgress: function (data) {
      if (!data) return 0;
      if (data.status === 'submitted') return 100;

      let score = 0;
      const totalPoints = 10;

      // P1: Básico (3 pts)
      if (data.personalInfo?.nombre && data.personalInfo?.apellido) score += 1;
      if (data.personalInfo?.profesion) score += 1;
      if (data.personalInfo?.email || data.personalInfo?.whatsapp) score += 1;

      // P2: Historia (2 pts)
      if (data.history?.presentacionCorta && data.history?.presentacionCorta.length > 10) score += 2;
      else if (data.history?.presentacionCorta) score += 1;

      // P3: Oferta (2 pts)
      if (data.offer?.servicios && data.offer?.servicios.length > 0) score += 1.5;
      if (data.offer?.especialidades && data.offer?.especialidades.length > 0) score += 0.5;

      // P4: Contacto (1.5 pts)
      if (data.contact?.whatsapp || data.contact?.email) score += 1.5;

      // P5: Estilo (1.5 pts)
      if (data.style?.sensaciones && data.style?.sensaciones.length > 0) score += 1;
      if (data.style?.coloresPreferidos || (data.style?.sitiosReferencia && data.style?.sitiosReferencia.length > 0)) score += 0.5;

      const percentage = Math.round((score / totalPoints) * 100);
      return Math.min(100, Math.max(0, percentage));
    },

    /**
     * Helper to parse client ID from URL (e.g. ?clientId=TRAY-00001 or #TRAY-00001)
     */
    getClientIdFromUrl: function () {
      const params = new URLSearchParams(window.location.search);
      const queryId = params.get('clientId') || params.get('id');
      if (queryId) return queryId;

      const hash = window.location.hash.replace('#', '').trim();
      if (hash && hash.startsWith('TRAY-')) return hash;

      return 'TRAY-00001';
    },

    /* =========================================================================
       ARCHITECTURE HOOK: FUTURE SUPABASE INTEGRATION
       =========================================================================
       When ready to connect to Supabase:
       1. Include @supabase/supabase-js
       2. Initialize: const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
       3. Swap `saveClient` with:
          async function saveClientRemote(clientId, data) {
            return await supabase
              .from('onboarding_submissions')
              .upsert({ client_id: clientId, payload: data, updated_at: new Date() });
          }
       4. Swap `getClient` with:
          async function getClientRemote(clientId) {
            const { data } = await supabase
              .from('onboarding_submissions')
              .select('payload')
              .eq('client_id', clientId)
              .single();
            return data?.payload || createEmptyOnboarding(clientId);
          }
       ========================================================================= */
  };

  // Expose to window
  window.TrayectoriaOnboardingStore = OnboardingStore;
  OnboardingStore.init();

})();
