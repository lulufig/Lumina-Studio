import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '../../utils/scrollUtils';

const SolutionsContainer = ({ activeTab = 'celebrations', setActiveTab }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  
  // Use internal state only if props are not provided (backward compatibility)
  const [internalTab, setInternalTab] = useState('celebrations');
  // Use prop if setActiveTab is provided (controlled mode), otherwise use internal state
  const currentTab = setActiveTab ? activeTab : internalTab;
  const handleTabChange = setActiveTab || setInternalTab;

  const celebrationsData = {
    visual: {
      title: 'Invitaciones que emocionan.',
      mockupType: 'wedding',
      demoUrl: 'https://boda-andrea-luca.netlify.app/',
    },
    cards: [
      {
        id: 'flash',
        title: 'Invitación Flash',
        description: 'Práctico y estético. Datos claves de forma directa.',
        whyUs: 'Rápido no significa feo. Diseño superior a plantillas.',
        hoverColor: 'hover:border-lumina-orange',
        cta: 'Consultar Pack Flash',
        whatsappMessage: 'Hola Lúmina! Me interesa el Pack Flash para mi evento.',
        features: ['Entrega 3-5 días', 'Diseño personalizado', 'Link único'],
        featured: false,
      },
      {
        id: 'experience',
        title: 'Experiencia Lúmina',
        description: 'Narrativa visual inmersiva con animaciones.',
        whyUs: 'Diseño sin límites. Emoción desde el primer clic.',
        hoverColor: 'hover:border-lumina-lilac',
        cta: 'Diseñar Experiencia',
        whatsappMessage: 'Hola chicas! Quiero algo único para mi evento, me interesa el Pack Experience.',
        features: ['Animaciones avanzadas', 'Interactivo', 'Música'],
        featured: true,
        badge: 'Más elegido',
      },
    ],
  };

  const businessData = {
    visual: {
      title: 'Herramientas que venden.',
      mockupType: 'business',
      demoUrl: 'https://menu-bakery.netlify.app/',
    },
    cards: [
      {
        id: 'menu',
        title: 'Menú Interactivo',
        description: 'Estilo App. Olvidate del PDF incómodo.',
        whyUs: 'Actualizá precios desde Google Sheets.',
        hoverColor: 'hover:border-lumina-green',
        cta: 'Cotizar Menú',
        whatsappMessage: 'Hola! Tengo un local gastronómico y quiero info sobre el Menú Digital.',
        features: ['Actualización fácil', 'Sin impresión', 'Acceso QR'],
        featured: false,
      },
      {
        id: 'landing',
        title: 'Landing Page',
        description: 'Tu tarjeta de presentación 24/7.',
        whyUs: 'Estructura de ventas + Diseño Premium.',
        hoverColor: 'hover:border-lumina-yellow',
        cta: 'Cotizar Web',
        whatsappMessage: 'Hola Lúmina! Soy profesional y quiero una Landing Page.',
        features: ['SEO optimizado', 'Responsive', 'Formularios'],
        featured: false,
      },
    ],
  };

  const currentData = currentTab === 'celebrations' ? celebrationsData : businessData;

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        delay: index * 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const mockupVariants = {
    hidden: { opacity: 0, x: -60 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="soluciones" className="bg-slate-50 py-16 md:py-24 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.6 }}
          variants={headerVariants}
        >
          <motion.h2 
            className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-600 mb-4"
            variants={headerVariants}
          >
            Soluciones pensadas para impactar
          </motion.h2>
          <motion.p 
            className="font-Manrope text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8"
            variants={headerVariants}
            transition={{ delay: 0.1 }}
          >
            Elegí la propuesta que mejor se adapte a tu necesidad.
          </motion.p>

          {/* Toggle Switch */}
          <div className="flex justify-center">
            <div className="inline-flex bg-white rounded-full p-2 shadow-lg gap-2">
              <motion.button
                onClick={() => handleTabChange('celebrations')}
                className={`px-5 py-2.5 rounded-full font-Manrope font-semibold text-sm transition-all duration-300 ${
                  currentTab === 'celebrations'
                    ? 'bg-lumina-pink text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Celebraciones
              </motion.button>
              <motion.button
                onClick={() => handleTabChange('business')}
                className={`px-5 py-2.5 rounded-full font-Manrope font-semibold text-sm transition-all duration-300 ${
                  currentTab === 'business'
                    ? 'bg-lumina-blue text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Negocios
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Content - Two Columns Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center"
          >
            {/* Left Column - Modern 3D iPhone Mockup */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
              variants={mockupVariants}
              className="flex items-center justify-center mb-12 lg:mb-0"
            >
              <div className="relative w-full max-w-[280px] md:max-w-[320px]">
                {/* 3D iPhone Frame */}
                <motion.div
                  className="relative"
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  {/* Phone Frame Outer Shadow */}
                  <div className="absolute inset-0 bg-black/20 rounded-[3rem] blur-2xl transform scale-95"></div>
                  
                  {/* Phone Frame */}
                  <div className="relative bg-linear-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    {/* Phone Screen Bezel */}
                    <div className="bg-black rounded-[2.5rem] overflow-hidden">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-6 bg-black rounded-b-3xl z-20"></div>
                      
                      {/* Screen Content */}
                      <div className="relative rounded-[2.5rem] overflow-hidden aspect-[9/19.5]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentTab}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                          >
                            {currentTab === 'celebrations' ? (
                              <div className="h-full w-full relative overflow-hidden bg-white">
                                <img
                                  src={`${import.meta.env.BASE_URL}boda-invitacion.png`}
                                  alt="Invitación digital de boda"
                                  className="w-full h-full object-cover object-top"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="absolute inset-0 bg-linear-to-br from-lumina-pink via-lumina-orange to-lumina-yellow flex flex-col items-center justify-center p-8 text-white" style={{ display: 'none' }}>
                                  <h3 className="font-InstrumentSerif text-xl font-bold mb-2 text-center">
                                    Invitación Digital
                                  </h3>
                                  <p className="font-Manrope text-xs opacity-90 text-center">
                                    Tu evento especial
                                  </p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 flex items-center justify-center">
                                  <a
                                    href={celebrationsData.visual.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-lumina-pink text-white font-Manrope font-semibold px-5 py-2.5 text-sm rounded-full transition-all duration-300 hover:bg-pink-50 hover:text-lumina-pink hover:border hover:border-lumina-pink hover:scale-105 shadow-lg hover:shadow-xl border border-transparent"
                                  >
                                    Ver Demo
                                    <svg
                                      className="w-3 h-3 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            ) : (
                              <div className="h-full w-full relative overflow-hidden bg-white">
                                <img
                                  src={`${import.meta.env.BASE_URL}menu-qr.png`}
                                  alt="Menú digital interactivo"
                                  className="w-full h-full object-cover object-top"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextElementSibling.style.display = 'flex';
                                  }}
                                />
                                <div className="absolute inset-0 bg-linear-to-br from-lumina-blue via-lumina-green to-lumina-lilac flex flex-col items-center justify-center p-8 text-white" style={{ display: 'none' }}>
                                  <h3 className="font-InstrumentSerif text-xl font-bold mb-2 text-center">
                                    Menú Digital
                                  </h3>
                                  <p className="font-Manrope text-xs opacity-90 text-center">
                                    Tu negocio online
                                  </p>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/60 to-transparent p-4 flex items-center justify-center">
                                  <a
                                    href={businessData.visual.demoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group bg-lumina-pink text-white font-Manrope font-semibold px-5 py-2.5 text-sm rounded-full transition-all duration-300 hover:bg-pink-50 hover:text-lumina-pink hover:border hover:border-lumina-pink hover:scale-105 shadow-lg hover:shadow-xl border border-transparent"
                                  >
                                    Ver Demo
                                    <svg
                                      className="w-3 h-3 ml-2 inline-block group-hover:translate-x-1 transition-transform duration-300"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                  </a>
                                </div>
                              </div>
                            )}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Column - Service Cards */}
            <motion.div 
              className="flex flex-col gap-4"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.3,
                    delayChildren: 0.5,
                  },
                },
              }}
            >
              {currentData.cards.map((card, index) => {
                const isHovered = hoveredCard === card.id;
                const getBorderColor = () => {
                  if (card.hoverColor === 'hover:border-lumina-orange') return 'border-lumina-orange';
                  if (card.hoverColor === 'hover:border-lumina-lilac') return 'border-lumina-lilac';
                  if (card.hoverColor === 'hover:border-lumina-green') return 'border-lumina-green';
                  if (card.hoverColor === 'hover:border-lumina-yellow') return 'border-lumina-yellow';
                  return 'border-gray-200';
                };
                const getBoxShadow = () => {
                  if (card.hoverColor === 'hover:border-lumina-orange') return '0 20px 40px -10px rgba(248, 73, 26, 0.4)';
                  if (card.hoverColor === 'hover:border-lumina-lilac') return '0 20px 40px -10px rgba(171, 160, 235, 0.4)';
                  if (card.hoverColor === 'hover:border-lumina-green') return '0 20px 40px -10px rgba(55, 166, 74, 0.4)';
                  if (card.hoverColor === 'hover:border-lumina-yellow') return '0 20px 40px -10px rgba(254, 216, 10, 0.4)';
                  return '';
                };

                return (
                <motion.div
                  key={card.id}
                  custom={index}
                  variants={cardVariants}
                  whileHover={{ 
                    scale: 1.01,
                    transition: { duration: 0.3 }
                  }}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="group relative cursor-pointer"
                >
                  {/* Card Container - Estilo similar a "Para tu Evento" */}
                  <div 
                    className={`relative bg-white rounded-3xl transition-all duration-500 overflow-hidden border-2 ${
                      isHovered 
                        ? `${getBorderColor()} shadow-2xl -translate-y-1` 
                        : 'border-gray-200 shadow-lg'
                    } p-5 md:p-6`}
                    style={isHovered ? { boxShadow: getBoxShadow() } : {}}
                  >
                    
                    {/* Featured Badge */}
                    {card.featured && (
                      <motion.div 
                        initial={{ scale: 0, rotate: 0 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                        className="absolute top-2 right-4 bg-lumina-pink text-white px-4 py-1.5 rounded-full text-xs font-Manrope font-bold shadow-lg z-20 pointer-events-none"
                        style={{
                          minWidth: '88px',
                          textAlign: 'center'
                        }}
                      >
                        {card.badge}
                      </motion.div>
                    )}
                    
                    {/* Content */}
                    <div className="relative space-y-3">
                      {/* Title - mismo estilo que tu página */}
                      <h4 className="font-InstrumentSerif text-xl md:text-2xl text-lumina-blue">
                        {card.title}
                      </h4>

                      {/* Description */}
                      <p className="font-Manrope text-sm md:text-base text-gray-600 leading-relaxed">
                        {card.description}
                      </p>

                      {/* Features List */}
                      <div className="space-y-1.5">
                        {card.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <svg className="w-4 h-4 text-lumina-blue shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span className="font-Manrope text-xs md:text-sm text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Why Us - Destacado */}
                      <div className="p-3 rounded-2xl bg-gray-50">
                        <p className="font-Manrope font-semibold text-xs md:text-sm text-lumina-blue mb-1">
                          ¿Por qué elegirnos?
                        </p>
                        <p className="font-Manrope text-xs md:text-sm text-gray-600">
                          {card.whyUs}
                        </p>
                      </div>

                      {/* CTA Button - Rosa como todos los botones de tu página */}
                      <button
                        onClick={(e) => openWhatsApp(e, card.whatsappMessage)}
                        className={`group/btn relative w-full font-Manrope font-extrabold text-sm md:text-base px-6 md:px-8 py-3 md:py-3.5 rounded-full transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 overflow-hidden border ${
                          isHovered 
                            ? 'text-lumina-pink bg-pink-50 border-lumina-pink' 
                            : 'bg-lumina-pink text-white border-transparent'
                        }`}
                      >
                        {/* Efecto de brillo */}
                        {!isHovered && (
                          <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></span>
                        )}
                        
                        <span className="relative flex items-center justify-center gap-2">
                          {card.cta}
                          <motion.svg 
                            className={`w-4 h-4 md:w-5 md:h-5 ${isHovered ? 'text-lumina-pink' : 'text-white'}`}
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                            animate={{
                              x: isHovered ? 5 : 0,
                            }}
                            transition={{
                              duration: 0.3,
                            }}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </motion.svg>
                        </span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
              })}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SolutionsContainer;
