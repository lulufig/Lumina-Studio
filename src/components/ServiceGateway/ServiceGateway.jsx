import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const ServiceGateway = ({ onSelect }) => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Desactivar animaciones complejas en móviles
  const animationDuration = isMobile ? 0.3 : 1;
  const animationDelay = isMobile ? 0.1 : 0.4;

  const categories = [
    {
      id: 'celebrations',
      title: 'Para tu Evento',
      description: 'Desde invitaciones interactivas hasta la organización digital de tu boda o 15 años. Hacé que tu fiesta brille desde el primer clic.',
      buttonText: 'Ver Invitaciones',
      borderColor: 'border-lumina-orange',
      textColor: 'text-lumina-orange',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'business',
      title: 'Para tu Negocio',
      description: 'Herramientas para vender más. Menús digitales QR para tu emprendimiento y Landing Pages estratégicas para profesionales.',
      buttonText: 'Ver Soluciones',
      borderColor: 'border-lumina-green',
      textColor: 'text-lumina-green',
      bgColor: 'bg-green-50',
    },
  ];

  const handleCardClick = (categoryId) => {
    if (onSelect) {
      onSelect(categoryId);
    }
  };

  // En móviles, solo fade in simple sin movimiento
  const cardVariants = {
    hidden: { 
      opacity: 0,
      ...(isMobile ? {} : { y: 30, scale: 0.95 })
    },
    visible: (index) => ({
      opacity: 1,
      ...(isMobile ? {} : { y: 0, scale: 1 }),
      transition: {
        duration: animationDuration,
        delay: isMobile ? 0 : index * animationDelay,
        ease: isMobile ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    }),
  };

  const headerVariants = {
    hidden: { opacity: 0, ...(isMobile ? {} : { y: -10 }) },
    visible: {
      opacity: 1,
      ...(isMobile ? {} : { y: 0 }),
      transition: {
        duration: animationDuration,
        ease: isMobile ? 'easeOut' : [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="servicios" className="bg-white py-16 md:py-24 px-6 overflow-x-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={isMobile ? false : "hidden"}
          whileInView={isMobile ? false : "visible"}
          viewport={{ once: true, amount: isMobile ? 0 : 0.6 }}
          variants={headerVariants}
        >
          <motion.h2 
            className="font-InstrumentSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-lumina-blue mb-4"
            variants={isMobile ? undefined : headerVariants}
          >
            ¿Qué estás buscando hoy?
          </motion.h2>
          <motion.p 
            className="font-Manrope text-lg md:text-xl text-lumina-dark/70 max-w-2xl mx-auto"
            variants={isMobile ? undefined : headerVariants}
            transition={isMobile ? undefined : { delay: 0.1 }}
          >
            Soluciones digitales con luz propia para cada momento.
          </motion.p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {categories.map((category, index) => {
            const isHovered = hoveredCard === category.id;

            return (
              <motion.div
                key={category.id}
                custom={index}
                variants={isMobile ? undefined : cardVariants}
                initial={isMobile ? false : "hidden"}
                whileInView={isMobile ? false : "visible"}
                viewport={{ once: true, amount: isMobile ? 0 : 0.2 }}
                whileHover={isMobile ? {} : { 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                onMouseEnter={() => !isMobile && setHoveredCard(category.id)}
                onMouseLeave={() => !isMobile && setHoveredCard(null)}
                onClick={() => handleCardClick(category.id)}
                className={`
                  relative bg-white rounded-2xl shadow-lg cursor-pointer
                  border transition-all duration-300
                  ${isHovered && !isMobile
                    ? `${category.borderColor} shadow-2xl` 
                    : 'border-gray-200'
                  }
                  group
                `}
                style={{
                  ...(isMobile ? {} : { willChange: 'transform' }),
                  ...(isHovered && !isMobile ? {
                    boxShadow: category.id === 'celebrations' 
                      ? '0 20px 40px -10px rgba(248, 73, 26, 0.4)' 
                      : '0 20px 40px -10px rgba(55, 166, 74, 0.4)'
                  } : {})
                }}
              >
                {/* Content */}
                <div className="px-6 pt-6 pb-6 md:px-8 md:pt-8 md:pb-6 flex flex-col h-full">
                  {/* Title */}
                  <div className="mb-3">
                    <h3 className="font-InstrumentSerif text-2xl md:text-3xl lg:text-4xl text-lumina-blue">
                      {category.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-Manrope text-sm md:text-base text-lumina-dark/70 mb-4 leading-relaxed grow">
                    {category.description}
                  </p>

                  {/* Button Pill */}
                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick(category.id);
                      }}
                      className={`
                        inline-flex items-center justify-center
                        px-6 py-3 rounded-full
                        font-Manrope font-semibold text-sm md:text-base
                        transition-all duration-300
                        ${isHovered 
                          ? 'text-lumina-pink bg-pink-50 border border-lumina-pink' 
                          : 'bg-lumina-pink text-white border border-transparent'
                        }
                      `}
                    >
                      <span>{category.buttonText}</span>
                      <motion.svg
                        className={`w-4 h-4 ml-2 ${isHovered ? 'text-lumina-pink' : 'text-white'}`}
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        animate={isMobile ? {} : {
                          x: isHovered ? 5 : 0,
                        }}
                        transition={isMobile ? {} : {
                          duration: 0.3,
                        }}
                      >
                        <path d="M9 5l7 7-7 7" />
                      </motion.svg>
                    </button>
                  </div>
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

