import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const faqs = [
    {
      question: '¿Cómo funcionan las invitaciones digitales?',
      answer: 'Son sitios web diseñados específicamente para verse increíbles en celulares. Te entregamos un link único que podés enviar por WhatsApp a todos tus invitados sin límite.',
    },
    {
      question: '¿Las invitaciones y landings funcionan en el celular?',
      answer: '¡Sí, es nuestra prioridad! Diseñamos con enfoque "Mobile First", asegurando que se vea perfecto en cualquier smartphone, Android o iPhone.',
    },
    {
      question: '¿Puedo pedir una landing aunque no sea para un evento?',
      answer: '¡Claro! Nuestro servicio "Landing Page Comercial" es ideal para profesionales, emprendedores y negocios que necesitan vender servicios o mostrar un portfolio.',
    },
    {
      question: '¿Cuánto tarda el proceso?',
      answer: 'Dependiendo del plan, entre 3 a 7 días hábiles desde que nos entregás la información completa.',
    },
    {
      question: '¿Qué necesito enviarles para arrancar?',
      answer: 'Solo necesitamos los textos básicos (fecha, lugar, nombres) y las fotos que quieras incluir. Nosotros te guiamos con un formulario simple.',
    },
    {
      question: '¿Se puede actualizar la información después de publicado?',
      answer: 'Sí. En los Menús Digitales la actualización es inmediata vía Google Sheets. En Invitaciones, podés solicitar cambios puntuales (como cambio de horario) sin problema.',
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24 px-6 overflow-x-hidden">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ 
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
        >
          <motion.h2 
            className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lumina-blue mb-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Por si te lo estás preguntando
          </motion.h2>
          <motion.p 
            className="font-Manrope text-base md:text-lg text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: isMobile ? 0.6 : 1, delay: isMobile ? 0.2 : 0.4 }}
          >
            Despejamos tus dudas antes de empezar.
          </motion.p>
        </motion.div>
        
        {/* Accordion */}
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-200 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: isMobile ? 0.5 : 0.8, delay: index * (isMobile ? 0.1 : 0.15) }}
            >
              <motion.button
                className="w-full text-left font-Manrope font-medium text-gray-800 text-base md:text-lg py-4 md:py-5 flex items-center justify-between gap-4 hover:text-gray-900 transition-colors"
                onClick={() => toggleQuestion(index)}
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                whileHover={isMobile ? {} : { x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <span className="pr-8">{faq.question}</span>
                <motion.svg
                  className="w-5 h-5 text-blue-600 shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </motion.svg>
              </motion.button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    id={`faq-answer-${index}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="font-Manrope font-normal text-gray-600 pb-4 md:pb-5 pr-12 text-sm md:text-base leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, delay: 0.1 }}
                    >
                      {faq.answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
