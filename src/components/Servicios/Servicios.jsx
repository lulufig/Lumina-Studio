// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { openWhatsApp } from '../../utils/scrollUtils';

const Servicios = () => {
  return (
    <section id="servicios" className="bg-white py-16 md:py-24 px-6 overflow-x-hidden">
      <div className="container mx-auto">
        <motion.h2
          className="font-InstrumentSerif text-5xl md:text-6xl text-lumina-blue text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Qué hacemos
        </motion.h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Tarjeta Invitaciones Digitales */}
          <motion.div
            className="bg-lumina-green rounded-2xl md:rounded-3xl p-6 sm:p-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            whileHover={{
              scale: 1.02,
              rotate: 1,
              transition: { duration: 0.3 },
            }}
          >
            <h3 className="font-InstrumentSerif text-2xl sm:text-3xl mb-4">Invitaciones digitales</h3>
            <p className="font-Manrope text-white/90 mb-6 text-sm sm:text-base">
              Creamos invitaciones en formato web.  Son dinámicas, interactivas y super prácticas  para compartir. Elegí entre tres packs según el estilo y nivel de personalización que quieras.
            </p>
            <motion.button
              onClick={openWhatsApp}
              aria-label="Consultar invitaciones digitales por WhatsApp"
              className="bg-lumina-pink text-white font-Manrope font-extrabold px-6 py-3 rounded-full cursor-pointer"
              whileHover={{
                backgroundColor: '#F98FE0',
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
            >
              Saber más
            </motion.button>
          </motion.div>
          
          {/* Tarjeta Landing Page */}
          <motion.div
            className="bg-lumina-blue rounded-2xl md:rounded-3xl p-6 sm:p-8 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.4 }}
            whileHover={{
              scale: 1.02,
              rotate: -1,
              transition: { duration: 0.3 },
            }}
          >
            <h3 className="font-InstrumentSerif text-2xl sm:text-3xl mb-4">Landing Page</h3>
            <p className="font-Manrope text-white/90 mb-6 text-sm sm:text-base">
              Desarrollamos landing pages modernas y  optimizadas para emprendedores, negocios y  proyectos personales.  Ideales para presentar servicios, productos o  ideas de forma clara, atractiva y profesional.
            </p>
            <motion.button
              onClick={openWhatsApp}
              aria-label="Solicitar cotización de landing page por WhatsApp"
              className="bg-lumina-pink text-white font-Manrope font-extrabold px-6 py-3 rounded-full cursor-pointer"
              whileHover={{
                backgroundColor: '#F98FE0',
                scale: 1.05,
                transition: { duration: 0.4 },
              }}
            >
              Cotizar ahora
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Servicios;

