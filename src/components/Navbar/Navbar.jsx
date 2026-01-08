import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { handleNavClick } from '../../utils/scrollUtils';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('nosotras');

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Detectar si estamos en la sección Hero
      // El Hero es la primera sección con bg-lumina-blue y min-h-screen
      const heroSection = document.querySelector('section.bg-lumina-blue');
      let isInHero = false;
      
      if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        // Estamos en Hero si el scroll está dentro de los límites del Hero
        // Consideramos que estamos en Hero si estamos en los primeros 90% de la altura del Hero
        isInHero = scrollY < heroRect.height * 0.9;
      } else {
        // Si no encontramos el Hero, asumimos que NO estamos en Hero
        isInHero = false;
      }
      
      // El navbar debe tener fondo azul cuando:
      // - Ya NO estamos en la sección Hero (scrollY >= altura del Hero)
      // - O cuando hacemos scroll significativo dentro del Hero (scrollY > 100px)
      setIsScrolled(!isInHero || scrollY > 100);
      
      // Detectar sección activa
      const sections = ['hero', 'nosotras', 'servicios', 'soluciones', 'faq'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    // Ejecutar al cargar para verificar posición inicial
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { href: '#nosotras', label: 'Nosotras' },
    { href: '#servicios', label: 'Servicios' },
    { href: '#soluciones', label: 'Soluciones' },
    { href: '#faq', label: 'FAQ' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-lumina-blue/95 backdrop-blur-xl shadow-lg py-2 max-h-26' 
        : 'bg-transparent py-3 max-h-24'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl w-full">
        <div className="flex items-center justify-between">
          {/* Logo mejorado */}
          <motion.a 
            href="#hero" 
            className="flex items-center gap-2 md:gap-3 group cursor-pointer shrink-0" 
            onClick={(e) => handleNavClick(e, 'hero')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-20 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24">
              <img 
                src={`${import.meta.env.BASE_URL}logo.png`} 
                alt="Lúmina logo" 
                className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                width="96"
                height="96"
                loading="lazy"
              />
            </div>
          </motion.a>

          {/* Enlaces Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            {navLinks.map((link) => {
              const sectionId = link.href.substring(1);
              return (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, sectionId)}
                className={`relative px-12 py-3.5 rounded-full font-Manrope font-semibold transition-all duration-300 cursor-pointer ${
                  activeSection === sectionId
                    ? 'text-white bg-white/15'
                    : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
                {/* Indicador de sección activa */}
                <AnimatePresence>
                  {activeSection === sectionId && (
                    <motion.span 
                      className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-lumina-yellow rounded-full"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </AnimatePresence>
              </motion.a>
              );
            })}
          </div>

          {/* Botón Hamburguesa (Mobile) */}
            <motion.button
              onClick={toggleMobileMenu}
            className="md:hidden relative w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}></span>
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}></span>
              </div>
            </motion.button>
        </div>

        {/* Menú Mobile mejorado */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              className="md:hidden overflow-hidden mt-6"
              initial={{ maxHeight: 0, opacity: 0 }}
              animate={{ maxHeight: 400, opacity: 1 }}
              exit={{ maxHeight: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-lumina-blue/88 backdrop-blur-xl rounded-2xl p-5 shadow-xl border border-white/30">
                <motion.div 
                  className="flex flex-col space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                      },
                    },
                  }}
                >
                  {navLinks.map((link, index) => {
                const sectionId = link.href.substring(1);
                return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    handleNavClick(e, sectionId);
                    closeMobileMenu();
                  }}
                  className={`group flex items-center justify-between px-5 py-4 rounded-xl font-Manrope font-semibold text-base transition-all duration-300 cursor-pointer ${
                    activeSection === sectionId
                      ? 'bg-white/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: { duration: 0.3, delay: index * 0.1 }
                    },
                  }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                    <span>{link.label}</span>
                    {activeSection === sectionId && (
                      <span className="w-2 h-2 bg-lumina-gray rounded-full"></span>
                    )}
                    <svg 
                      className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.a>
                );
              })}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Animaciones */}
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
