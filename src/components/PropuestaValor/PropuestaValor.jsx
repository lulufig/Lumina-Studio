// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const PropuestaValor = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const chipVariants = {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section id="nosotras" className="bg-white py-16 md:py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Título principal con palabras destacadas */}
        <motion.div
          className="mb-18"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 mb-1">
            <motion.h2
              className="font-InstrumentSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-lumina-blue leading-none"
              variants={itemVariants}
            >
              Experiencias
            </motion.h2>
            <motion.span
              className="bg-lumina-green text-white font-serif italic px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
              variants={chipVariants}
            >
              simples
            </motion.span>
            <motion.span
              className="bg-lumina-orange text-white font-serif italic px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
              variants={chipVariants}
            >
              rápidas
            </motion.span>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4">
            <motion.span
              className="bg-lumina-blue text-white font-serif italic px-4 py-2 sm:px-6 sm:py-2.5 md:px-8 md:py-3 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
              variants={chipVariants}
            >
              únicas
            </motion.span>
            <motion.span
              className="bg-lumina-pink text-white font-serif italic px-6 py-2 sm:px-10 sm:py-2.5 md:px-20 md:py-3 rounded-full text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
              variants={chipVariants}
            >
              memorables
            </motion.span>
            <motion.h2
              className="font-InstrumentSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl text-lumina-blue leading-none"
              variants={itemVariants}
            >
              digitales
            </motion.h2>
          </div>
        </motion.div>
        
        {/* Texto descriptivo */}
        <motion.p
          className="font-Manrope text-lg md:text-xl text-lumina-dark text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.2, delay: 1.5 }}
        >
          En Lúmina combinamos diseño, interacción y tecnología para que cada celebración tenga un inicio inolvidable. Creemos en los detalles, en lo bien hecho y en crear experiencias que emocionen.
        </motion.p>
        
        {/* Botón de scroll down con rebote continuo */}
        <motion.div className="flex justify-center">
          <motion.button
            onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
            className="w-12 h-12 rounded-full bg-lumina-orange flex items-center justify-center hover:bg-[#E63E0F] transition-colors duration-300 hover:scale-110 shadow-lg hover:shadow-xl cursor-pointer"
            aria-label="Scroll down"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PropuestaValor;

