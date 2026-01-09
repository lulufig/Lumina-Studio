import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Manejar cuando la página vuelve a tener foco (después de abrir WhatsApp)
window.addEventListener('pageshow', (event) => {
  // Si es una restauración desde caché (back/forward cache) y el root está vacío
  if (event.persisted) {
    const root = document.getElementById('root');
    if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
      // Solo recargar si realmente está vacío
      window.location.reload();
      return;
    }
  }
  
  // Restaurar scroll position si existe
  const savedScroll = sessionStorage.getItem('scrollPosition');
  if (savedScroll) {
    window.scrollTo(0, parseInt(savedScroll));
    sessionStorage.removeItem('scrollPosition');
  }
});

// Verificar visibilidad cuando la página vuelve a tener foco
window.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    // Verificar si venimos de un click de WhatsApp
    const whatsappClickTime = sessionStorage.getItem('whatsappClickTime');
    if (whatsappClickTime) {
      const timeSinceClick = Date.now() - parseInt(whatsappClickTime);
      // Si pasaron más de 2 segundos desde el click, probablemente volvimos de WhatsApp
      if (timeSinceClick > 2000) {
        const root = document.getElementById('root');
        // Si el root está vacío, recargar
        if (root && (!root.innerHTML || root.innerHTML.trim() === '')) {
          setTimeout(() => {
            if (!root.innerHTML || root.innerHTML.trim() === '') {
              window.location.reload();
            }
          }, 100);
        }
        sessionStorage.removeItem('whatsappClickTime');
      }
    }
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
