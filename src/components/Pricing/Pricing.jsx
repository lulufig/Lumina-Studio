// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { useState } from 'react';
import { HiCheck, HiX } from 'react-icons/hi';
import { openWhatsApp } from '../../utils/scrollUtils';
import BankTransferModal from './BankTransferModal';

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plans = [
    {
      name: 'Invitación Flash',
      price: '$38.000 ARS',
      color: 'bg-lumina-orange',
      features: [
        { text: 'Diseño personalizado', included: true },
        { text: 'Confirmación por Whatsapp', included: true },
        { text: 'Ubicación en Google Maps', included: true },
        { text: 'Cuenta regresiva', included: true },
        { text: 'Sección nuestra historia', included: false },
        { text: 'Galería de fotos', included: false },
        { text: 'Juego interactivo', included: false },
        { text: 'Música', included: false },
        { text: 'Gestión de invitados', included: false },
      ],
    },
    {
      name: 'Invitación Lúmina Pro',
      price: '$55.000 ARS',
      color: 'bg-lumina-blue',
      highlighted: true,
      features: [
        { text: 'Diseño personalizado', included: true },
        { text: 'Confirmación por Whatsapp o email', included: true },
        { text: 'Ubicación en Google Maps', included: true },
        { text: 'Cuenta regresiva', included: true },
        { text: 'Sección nuestra historia', included: true },
        { text: 'Galería de fotos', included: true },
        { text: 'Juego interactivo', included: true },
        { text: 'Música', included: true },
        { text: 'Gestión de invitados', included: true },
      ],
    },
    {
      name: 'Invitación Prisma',
      price: '$45.000 ARS',
      color: 'bg-lumina-green',
      features: [
        { text: 'Diseño personalizado', included: true },
        { text: 'Confirmación por Whatsapp', included: true },
        { text: 'Ubicación en Google Maps', included: true },
        { text: 'Cuenta regresiva', included: true },
        { text: 'Sección nuestra historia', included: true },
        { text: 'Galería de fotos', included: false },
        { text: 'Juego interactivo', included: false },
        { text: 'Música', included: false },
        { text: 'Gestión de invitados', included: false },
      ],
    },
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: index * 0.3,
        ease: 'easeOut',
      },
    }),
  };

  const handleTransferClick = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <section id="pricing" className="bg-lumina-gray py-16 md:py-24 px-6">
        <div className="container mx-auto">
        <motion.h2
          className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-lumina-blue text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2 }}
          >
            Nuestros Planes
          </motion.h2>
          <motion.p
            className="font-Manrope font-regular text-lumina-blue text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            Tu evento, tu estilo. Elegí tu plan.
          </motion.p>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`${plan.color} font-Manrope font-regular rounded-2xl md:rounded-3xl p-6 sm:p-8 text-white relative`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                animate={plan.highlighted ? { y: -10 } : {}}
                style={{
                  boxShadow: plan.highlighted
                    ? '0 20px 40px rgba(0, 0, 0, 0.2)'
                    : '0 10px 20px rgba(0, 0, 0, 0.1)',
                }}
              >
                {plan.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-lumina-yellow text-lumina-dark font-Manrope font-bold px-4 py-2 rounded-full text-sm">
                    Más vendido
                  </div>
                )}
              <h3 className="font-Manrope font-regular text-xl sm:text-2xl mb-3 sm:mb-4">{plan.name}</h3>
              <div className="font-InstrumentSerif text-3xl sm:text-4xl mb-4 sm:mb-6">{plan.price}</div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 font-Manrope">
                      {feature.included ? (
                        <HiCheck className="w-5 h-5 shrink-0" />
                      ) : (
                        <HiX className="w-5 h-5 shrink-0" />
                      )}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Botones de pago - Dos opciones */}
                <div className="space-y-3">
                  {/* Botón Transferencia Bancaria */}
                  <motion.button
                    onClick={() => handleTransferClick(plan)}
                    aria-label={`Solicitar datos bancarios para transferencia del plan ${plan.name}`}
                    className="w-full bg-lumina-yellow text-lumina-dark font-Manrope font-extrabold px-6 py-3 rounded-full cursor-pointer hover:bg-lumina-yellow/90 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    💳 Pagar por Transferencia
                  </motion.button>
                  
                  {/* Botón WhatsApp */}
                  <motion.button
                    onClick={(e) => {
                      const message = `Hola! Me interesa contratar el plan "${plan.name}" por ${plan.price}. ¿Podrían darme más información?`;
                      openWhatsApp(e, message);
                    }}
                    aria-label={`Preguntar por WhatsApp el plan ${plan.name}`}
                    className="w-full bg-white/20 text-white font-Manrope font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-white/30 transition-colors border border-white/30"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    💬 Consultar por WhatsApp
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal de Transferencia Bancaria */}
      <BankTransferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        planName={selectedPlan?.name}
        planPrice={selectedPlan?.price}
      />
    </>
  );
};

export default Pricing;
