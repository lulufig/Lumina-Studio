import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { HiPlus, HiX } from 'react-icons/hi';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: '¿Cómo funcionan las invitaciones digitales?',
      answer: 'Las invitaciones digitales son páginas web personalizadas que puedes compartir por WhatsApp, email o redes sociales. Tus invitados acceden con un simple click y pueden confirmar su asistencia directamente desde la invitación.',
    },
    {
      question: '¿Las invitaciones y landings funcionan en el celular?',
      answer: '¡Absolutamente! Todas nuestras invitaciones y landing pages están diseñadas para verse perfectas en cualquier dispositivo: celular, tablet o computadora. Son 100% responsive.',
    },
    {
      question: '¿Puedo pedir una landing aunque no sea para un evento?',
      answer: '¡Por supuesto! Creamos landing pages para emprendedores, negocios, proyectos personales y cualquier idea que quieras presentar de forma profesional y atractiva.',
    },
    {
      question: '¿Cuánto tarda el proceso?',
      answer: 'El tiempo de entrega depende del plan que elijas y la complejidad del proyecto. Generalmente, las invitaciones Flash se entregan en 3-5 días hábiles, mientras que los planes Pro y Prisma pueden tomar entre 7-10 días hábiles.',
    },
    {
      question: '¿Qué necesito enviarles para arrancar?',
      answer: 'Necesitamos información básica como fecha del evento, nombres, ubicación, colores preferidos, fotos y cualquier detalle especial que quieras incluir. Te enviaremos un formulario completo para que sea fácil compartir toda la información.',
    },
    {
      question: '¿Puedo compartir el link cuantas veces quiera?',
      answer: '¡Sí! Una vez que tu invitación o landing esté lista, recibirás un link único que puedes compartir todas las veces que quieras, con quien quieras, sin límites.',
    },
    {
      question: '¿Se puede actualizar la información después de publicado?',
      answer: 'Sí, podemos hacer actualizaciones después de publicado. Dependiendo del tipo de cambio, puede haber un costo adicional. Siempre te avisamos antes de hacer cualquier modificación.',
    },
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-white py-16 md:py-24 px-6 overflow-x-hidden">
      <div className="container mx-auto max-w-3xl">
        <motion.h2
          className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl text-lumina-blue text-center mb-8 sm:mb-12 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2 }}
        >
          Por si te lo estás preguntando
        </motion.h2>
        
        <div className="space-y-0">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="border-b border-gray-300 overflow-hidden"
              layout
            >
              <motion.button
                className="w-full text-left font-Manrope font-regular text-gray-700 text-base sm:text-lg hover:text-lumina-blue transition-colors py-4 sm:py-6 flex items-center justify-between gap-4"
                onClick={() => toggleQuestion(index)}
                whileHover={{ color: '#2971F7' }}
              >
                <span>{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 45 : 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {openIndex === index ? (
                    <HiX className="w-6 h-6 shrink-0 ml-4" />
                  ) : (
                    <HiPlus className="w-6 h-6 shrink-0 ml-4" />
                  )}
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    layout
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <motion.p
                      className="font-Manrope text-gray-600 pb-4 sm:pb-6 pr-4 sm:pr-12 text-sm sm:text-base"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
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
