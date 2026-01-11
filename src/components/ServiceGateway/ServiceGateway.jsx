import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ServiceGateway = ({ onSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    let timeoutId;
    const checkMobile = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const categories = [
    {
      id: 'celebrations',
      title: 'Para tu Evento',
      description: 'Desde invitaciones interactivas hasta la organización digital de tu boda o 15 años. Hacé que tu fiesta brille desde el primer clic.',
      buttonText: 'Ver Invitaciones',
      borderColor: 'border-lumina-orange',
      shadowColor: 'rgba(248, 73, 26, 0.3)',
    },
    {
      id: 'business',
      title: 'Para tu Negocio',
      description: 'Herramientas para vender más. Menús digitales QR para tu emprendimiento y Landing Pages estratégicas para profesionales.',
      buttonText: 'Ver Soluciones',
      borderColor: 'border-lumina-green',
      shadowColor: 'rgba(55, 166, 74, 0.3)',
    },
  ];

  const handleCardClick = (categoryId) => {
    if (onSelect) {
      onSelect(categoryId);
    }
  };

  // Animaciones optimizadas: suaves para móvil, completas para desktop
  const cardVariants = isMobile
    ? {
        hidden: { opacity: 0, y: 20 },
        visible: (index) => ({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay: index * 0.1,
            ease: 'easeOut',
          },
        }),
      }
    : {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: (index) => ({
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.8,
            delay: index * 0.2,
            ease: [0.16, 1, 0.3, 1],
          },
        }),
      };

  const headerVariants = isMobile
    ? {
        hidden: { opacity: 0, y: -10 },
        visible: { 
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: 'easeOut' }
        },
      }
    : {
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }
        },
      };

  const descriptionVariants = isMobile
    ? {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: { duration: 0.4, delay: 0.15, ease: 'easeOut' }
        },
      }
    : {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            duration: 0.5,
            delay: 0.2,
            ease: 'easeOut'
          }
        },
      };

  return (
    <section id="servicios" className="bg-white py-16 md:py-24 px-6 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h2 
            className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lumina-blue mb-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.5 : 0.3 }}
            variants={headerVariants}
          >
            ¿Qué estás buscando hoy?
          </motion.h2>
          <motion.p 
            className="font-Manrope text-base md:text-lg text-lumina-dark/70 max-w-2xl mx-auto"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: isMobile ? 0.5 : 0.3 }}
            variants={descriptionVariants}
          >
            Soluciones digitales con luz propia para cada momento.
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const isHovered = hoveredCard === category.id;

            const cardProps = {
              custom: index,
              variants: cardVariants,
              initial: "hidden",
              animate: isMobile ? "visible" : undefined,
              whileInView: isMobile ? undefined : "visible",
              viewport: isMobile ? undefined : { once: true, margin: "-10%" },
              whileHover: isMobile ? undefined : { 
                scale: 1.02,
                transition: { duration: 0.3, ease: 'easeOut' }
              },
              onMouseEnter: () => !isMobile && setHoveredCard(category.id),
              onMouseLeave: () => !isMobile && setHoveredCard(null),
            };

            return (
              <motion.div
                key={category.id}
                {...cardProps}
                onClick={() => handleCardClick(category.id)}
                className={`
                  relative bg-white rounded-3xl shadow-lg cursor-pointer
                  border-2 transition-all duration-300
                  ${isHovered && !isMobile
                    ? `${category.borderColor} shadow-2xl` 
                    : 'border-gray-100 hover:border-gray-200'
                  }
                  overflow-hidden
                `}
                style={{
                  ...(isMobile ? {} : { willChange: 'opacity, transform' }),
                  ...(isHovered && !isMobile ? {
                    boxShadow: `0 20px 40px -10px ${category.shadowColor}`
                  } : {})
                }}
              >
                {/* Decorative gradient background - solo en desktop */}
                {!isMobile && (
                  <motion.div 
                    className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-lumina-blue/5 to-lumina-pink/5 rounded-full blur-2xl"
                    animate={{
                      scale: isHovered ? 1.5 : 1,
                      opacity: isHovered ? 0.6 : 0.3,
                    }}
                    transition={{ duration: 0.4 }}
                  />
                )}

                {/* Content */}
                <div className="relative px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-6 flex flex-col h-full">
                  {/* Title */}
                  {isMobile ? (
                    <div className="mb-3">
                      <h3 className="font-InstrumentSerif text-2xl md:text-3xl text-lumina-blue">
                        {category.title}
                      </h3>
                    </div>
                  ) : (
                    <motion.div 
                      className="mb-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
                    >
                      <h3 className="font-InstrumentSerif text-2xl md:text-3xl text-lumina-blue">
                        {category.title}
                      </h3>
                    </motion.div>
                  )}

                  {/* Description */}
                  {isMobile ? (
                    <p className="font-Manrope text-sm md:text-base text-lumina-dark/70 mb-6 leading-relaxed grow">
                      {category.description}
                    </p>
                  ) : (
                    <motion.p 
                      className="font-Manrope text-sm md:text-base text-lumina-dark/70 mb-6 leading-relaxed grow"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.4, duration: 0.4 }}
                    >
                      {category.description}
                    </motion.p>
                  )}

                  {/* Button */}
                  {isMobile ? (
                    <div className="mt-auto">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(category.id);
                        }}
                        className="relative overflow-hidden inline-flex items-center justify-center px-6 py-3 rounded-full font-Manrope font-bold text-sm md:text-base bg-lumina-pink text-white border-2 border-transparent shadow-md transition-all duration-300"
                      >
                        <span className="relative">{category.buttonText}</span>
                        <svg
                          className="w-4 h-4 ml-2 text-white"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  ) : (
                    <motion.div 
                      className="mt-auto"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.5, duration: 0.4 }}
                    >
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCardClick(category.id);
                        }}
                        className={`
                          relative overflow-hidden
                          inline-flex items-center justify-center
                          px-6 py-3 rounded-full
                          font-Manrope font-bold text-sm md:text-base
                          transition-all duration-300
                          ${isHovered
                            ? 'text-lumina-pink bg-pink-50 border-2 border-lumina-pink' 
                            : 'bg-lumina-pink text-white border-2 border-transparent shadow-md'
                          }
                        `}
                        whileTap={{ scale: 0.95 }}
                      >
                        {/* Shine effect */}
                        <motion.span
                          className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent"
                          initial={{ x: '-100%' }}
                          animate={isHovered ? { x: '100%' } : {}}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                        />
                        
                        <span className="relative">{category.buttonText}</span>
                        
                        <motion.svg
                          className={`w-4 h-4 ml-2 ${isHovered ? 'text-lumina-pink' : 'text-white'}`}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          animate={{
                            x: isHovered ? 4 : 0,
                          }}
                          transition={{
                            duration: 0.3,
                            ease: 'easeOut'
                          }}
                        >
                          <path d="M9 5l7 7-7 7" />
                        </motion.svg>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceGateway;

