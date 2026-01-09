import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: isMobile ? 0.1 : 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Reducir movimiento
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: isMobile ? 0.5 : 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.footer 
      className="bg-lumina-orange text-white py-4 md:py-5 px-4 sm:px-6 overflow-x-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          {/* Logo de Lumina */}
          <motion.a 
            href="#hero" 
            className="flex items-center group cursor-pointer md:ml-4"
            variants={itemVariants}
            whileHover={isMobile ? {} : { scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <img 
                src={`${import.meta.env.BASE_URL}logo-footer.png`} 
                alt="Lúmina Logo" 
                className="h-4 sm:h-4 md:h-5 w-auto transition-all duration-300 group-hover:scale-110 brightness-0 invert"
                width="52"
                height="48"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              {/* Efecto de resplandor */}
              <div className="absolute inset-0 bg-white/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          </motion.a>
          
          {/* Copyright */}
          <motion.div 
            className="font-sans text-center text-sm md:text-lg font-medium"
            variants={itemVariants}
          >
            © 2025 DERECHOS RESERVADOS.
          </motion.div>
          
          {/* Social Media con animaciones */}
          <motion.div 
            className="flex items-center gap-4"
            variants={itemVariants}
          >
            <motion.a 
              href="https://www.instagram.com/somoslumina.ar/?utm_source=ig_web_button_share_sheet" 
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/10 hover:bg-white flex items-center justify-center transition-all duration-300 hover:shadow-lg" 
              aria-label="Instagram"
              whileHover={isMobile ? {} : { scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-white group-hover:text-lumina-orange transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>
            
            <motion.a 
              href="https://www.facebook.com/profile.php?id=61585444343859" 
              target="_blank"
              rel="noopener noreferrer"
              className="group w-12 h-12 rounded-full bg-white/10 hover:bg-white flex items-center justify-center transition-all duration-300 hover:shadow-lg" 
              aria-label="Facebook"
              whileHover={isMobile ? {} : { scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg className="w-6 h-6 text-white group-hover:text-lumina-orange transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
