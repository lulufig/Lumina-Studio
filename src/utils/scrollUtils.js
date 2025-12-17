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
  
  // Usar mensaje personalizado o el predefinido
  const message = customMessage || WHATSAPP_MESSAGE;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
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

