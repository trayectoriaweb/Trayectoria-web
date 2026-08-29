# Trayectoria — Sitio Web Oficial de Alta Conversión

Sitio web comercial ultra-moderno, rápido y enfocado en la conversión directa a WhatsApp para vender desarrollo web a profesionales independientes (psicólogos, médicos, abogados, arquitectos, consultores, etc.).

---

## 🚀 Cómo cambiar tu número de WhatsApp

Para que todos los botones de la página y el configurador interactivo abran **tu propio número de WhatsApp**:

1. Abrí el archivo `js/funnel.js` y modificá la línea 9:
   ```javascript
   let TRAYECTORIA_PHONE = '5491123456789'; // Reemplazá por tu código de país y número (ej: 54911XXXXXXXX)
   ```
2. Abrí el archivo `js/app.js` y en la línea 312 modificá el número en caso de que uses el botón general.

---

## 📂 Estructura del Proyecto

```
d:/Antigravity/Trayectoria/
├── index.html        # Página principal con estructura semántica y secciones de venta
├── css/
│   └── styles.css    # Sistema de diseño con bloques plenos, animaciones y responsive
├── js/
│   ├── app.js        # Lógica de navegación, animaciones reveal, acordeón FAQ y modales de showroom
│   └── funnel.js     # Motor del cotizador interactivo 2026 y generador de mensajes a WhatsApp
└── README.md         # Guía rápida de uso y configuración
```

---

## 💎 Características Principales

1. **Copywriting Persuasivo y Directo**:
   - Sin clichés corporativos ni frases vacías.
   - Ataca el dolor de perder pacientes o clientes frente a la competencia por no tener web propia.
2. **Showroom de Proyectos con Ventanas Interactivas**:
   - Muestra ejemplos realistas para Psicología, Derecho, Medicina y Arquitectura.
   - Incluye botón **"Probar Demo en Vivo"** que abre una ventana simulada interactiva con el flujo real de WhatsApp y Google Maps.
3. **Embudo de Conversión 2026**:
   - El cliente selecciona su especialidad y módulos requeridos en 3 pasos.
   - Calcula el presupuesto estimado en tiempo real y redacta automáticamente el mensaje de WhatsApp al hacer clic.
4. **Diseño Visual de Bloques Plenos**:
   - Alto contraste: azul cobalto, negro obsidiana, gris estudio y blanco puro (sin naranja).
   - Tipografía sans-serif moderna (*Plus Jakarta Sans* + *Inter*).
5. **Cero Dependencias Pesadas**:
   - Carga en menos de 1 segundo en cualquier dispositivo móvil o computadora.
