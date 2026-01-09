// Número de WhatsApp (formato internacional sin + ni espacios)
// Ejemplo: 5491123456789 (Argentina: 54 + código de área + número)
const WHATSAPP_NUMBER = '5493865326878'; // CAMBIAR ESTE NÚMERO

// Mensaje predefinido para WhatsApp
const WHATSAPP_MESSAGE = 'Hola! Me interesa conocer más sobre sus servicios.';

// Función para abrir WhatsApp
export const openWhatsApp = (e, customMessage) => {
  // Prevenir comportamiento por defecto si es un evento
  if (e && e.preventDefault) {
    e.preventDefault();
  }
  
  // Detectar si es móvil
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Usar mensaje personalizado o el predefinido
  const message = customMessage || WHATSAPP_MESSAGE;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Guardar timestamp antes de abrir WhatsApp para detectar si la página necesita recarga
  sessionStorage.setItem('whatsappClickTime', Date.now().toString());
  
  // En móviles, usar location.href para mejor compatibilidad
  // En desktop, usar window.open
  if (isMobile) {
    // Guardar scroll position para restaurarla al volver
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    window.location.href = whatsappUrl;
  } else {
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    // Si no se pudo abrir (bloqueador de popups), usar location.href como fallback
    if (!whatsappWindow || whatsappWindow.closed || typeof whatsappWindow.closed === 'undefined') {
      window.location.href = whatsappUrl;
    }
  }
};

// Función para hacer scroll suave a una sección
export const scrollToSection = (sectionId, offset = 80) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Función para manejar clicks en links de navegación
export const handleNavClick = (e, sectionId) => {
  e.preventDefault();
  scrollToSection(sectionId);
};

// Función para scroll a contacto (si existe) o abrir modal/formulario
export const scrollToContact = () => {
  const contactSection = document.getElementById('contacto');
  if (contactSection) {
    scrollToSection('contacto');
  } else {
    // Si no hay sección de contacto, scroll a FAQ o abrir modal
    scrollToSection('faq');
    // Aquí podrías abrir un modal de contacto en el futuro
  }
};

