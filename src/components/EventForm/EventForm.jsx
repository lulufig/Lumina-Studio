import { useState, useEffect, useRef } from 'react';
import { useForm, useWatch } from 'react-hook-form';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { HiArrowRight, HiArrowLeft, HiCheck, HiX } from 'react-icons/hi';

const WHATSAPP_NUMBER = '5493865326878';

const EventForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const prevIsOpenRef = useRef(isOpen);
  const { register, control, handleSubmit, formState: { errors }, trigger, reset } = useForm({
    mode: 'onChange'
  });

  const selectedPlan = useWatch({
    control,
    name: 'planContratado'
  });

  // Resetear formulario cuando se cierra y paso cuando se abre
  useEffect(() => {
    const prevIsOpen = prevIsOpenRef.current;
    if (!isOpen && prevIsOpen) {
      // Se cerró el modal
      reset();
      // Usar requestAnimationFrame para evitar setState síncrono en efecto
      requestAnimationFrame(() => setCurrentStep(1));
    } else if (isOpen && !prevIsOpen) {
      // Se abrió el modal
      requestAnimationFrame(() => setCurrentStep(1));
    }
    prevIsOpenRef.current = isOpen;
  }, [isOpen, reset]);

  // Prevenir scroll del body cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const planOptions = [
    { value: 'Plan Flash ($38k)', label: 'Plan Flash ($38k)' },
    { value: 'Plan Prisma ($45k)', label: 'Plan Prisma ($45k)' },
    { value: 'Plan Lúmina Pro ($55k)', label: 'Plan Lúmina Pro ($55k)' },
  ];

  const stepVariants = {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 },
    exit: { x: -50, opacity: 0 }
  };

  const validateStep = async (step) => {
    let fieldsToValidate = [];
    
    if (step === 1) {
      fieldsToValidate = ['nombreCliente', 'tituloEvento', 'planContratado', 'comprobante'];
    } else if (step === 2) {
      fieldsToValidate = ['fechaEvento', 'nombreSalon', 'linkMaps', 'horarios'];
    } else if (step === 3) {
      fieldsToValidate = ['linkFotos'];
      if (selectedPlan?.includes('Pro')) {
        fieldsToValidate.push('linkPlaylist', 'audioGuestbook');
      } else if (selectedPlan?.includes('Prisma') || selectedPlan?.includes('Flash')) {
        // Solo validar playlist si es Prisma o superior
        if (!selectedPlan?.includes('Flash')) {
          fieldsToValidate.push('linkPlaylist');
        }
      }
    }

    const isValid = await trigger(fieldsToValidate);
    return isValid;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data) => {
    // Construir mensaje de WhatsApp
    let message = '¡Hola! Envío datos de mi evento:\n\n';
    message += `PLAN: ${data.planContratado} (Comp: ${data.comprobante})\n`;
    message += `EVENTO: ${data.tituloEvento}\n`;
    message += `FECHA: ${data.fechaEvento}\n`;
    message += `SALÓN: ${data.nombreSalon}\n`;
    message += `UBICACIÓN: ${data.linkMaps}\n`;
    message += `HORARIOS: ${data.horarios}\n`;
    
    if (data.linkFotos) {
      message += `LINK FOTOS: ${data.linkFotos}\n`;
    }
    
    if (data.datosBancarios) {
      message += `DATOS BANCARIOS: ${data.datosBancarios}\n`;
    }
    
    // Condicionales según plan
    if (data.linkPlaylist && !selectedPlan?.includes('Flash')) {
      message += `LINK PLAYLIST: ${data.linkPlaylist}\n`;
    }
    
    if (data.audioGuestbook && selectedPlan?.includes('Pro')) {
      message += `AUDIO GUESTBOOK: ${data.audioGuestbook}\n`;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
    
    // Cerrar modal después de enviar
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="event-form-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white/20 backdrop-blur-md rounded-3xl shadow-2xl border border-white/30 max-w-2xl w-full max-h-[90vh] overflow-y-auto relative"
        >
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 border border-white/30"
            aria-label="Cerrar formulario"
          >
            <HiX className="w-6 h-6 text-white" />
          </button>

          <div className="p-6 md:p-8">
          {/* Barra de Progreso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold">
                Datos de tu Evento
              </h2>
              <span className="font-sans text-white/80 text-sm md:text-base">
                Paso {currentStep} de 3
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <motion.div
                className="bg-lumina-pink h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / 3) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <AnimatePresence mode="wait">
              {/* PASO 1: Datos Básicos */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Nombre del Cliente <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('nombreCliente', { required: 'Este campo es obligatorio' })}
                      type="text"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="Ej: María García"
                    />
                    {errors.nombreCliente && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.nombreCliente.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Título del Evento <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('tituloEvento', { required: 'Este campo es obligatorio' })}
                      type="text"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="Ej: Boda Ana & Juan"
                    />
                    {errors.tituloEvento && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.tituloEvento.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Plan Contratado <span className="text-red-400">*</span>
                    </label>
                    <select
                      {...register('planContratado', { required: 'Este campo es obligatorio' })}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                    >
                      <option value="" className="bg-lumina-dark">Selecciona un plan</option>
                      {planOptions.map((plan) => (
                        <option key={plan.value} value={plan.value} className="bg-lumina-dark">
                          {plan.label}
                        </option>
                      ))}
                    </select>
                    {errors.planContratado && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.planContratado.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      N° de Comprobante de Transferencia <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('comprobante', { required: 'Este campo es obligatorio' })}
                      type="text"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="Ej: 00012345678"
                    />
                    {errors.comprobante && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.comprobante.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* PASO 2: Coordenadas */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Fecha del Evento <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('fechaEvento', { required: 'Este campo es obligatorio' })}
                      type="date"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                    />
                    {errors.fechaEvento && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.fechaEvento.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Nombre del Salón <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('nombreSalon', { required: 'Este campo es obligatorio' })}
                      type="text"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="Ej: Salón Los Jardines"
                    />
                    {errors.nombreSalon && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.nombreSalon.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Link de Google Maps <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('linkMaps', { 
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'Debe ser una URL válida'
                        }
                      })}
                      type="url"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="https://maps.google.com/..."
                    />
                    {errors.linkMaps && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.linkMaps.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Horarios <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('horarios', { required: 'Este campo es obligatorio' })}
                      type="text"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="Ej: 19:00 hs - 02:00 hs"
                    />
                    {errors.horarios && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.horarios.message}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}

              {/* PASO 3: Contenido Condicional */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Link de Fotos (Google Drive) <span className="text-red-400">*</span>
                    </label>
                    <input
                      {...register('linkFotos', { 
                        required: 'Este campo es obligatorio',
                        pattern: {
                          value: /^https?:\/\/.+/,
                          message: 'Debe ser una URL válida'
                        }
                      })}
                      type="url"
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                      placeholder="https://drive.google.com/..."
                    />
                    {errors.linkFotos && (
                      <p className="text-red-400 text-xs mt-1 font-sans">
                        {errors.linkFotos.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block font-sans text-white mb-2 text-sm md:text-base">
                      Datos Bancarios para Regalos
                    </label>
                    <textarea
                      {...register('datosBancarios')}
                      rows={3}
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent resize-none"
                      placeholder="Ej: Alias: REGALO.JUAN | CBU: 1234567890..."
                    />
                  </div>

                  {/* Link Playlist - Condicional */}
                  {selectedPlan?.includes('Flash') ? (
                    <div className="bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                      <p className="text-white/60 text-sm font-sans flex items-center gap-2">
                        🔒 Playlist disponible desde Plan Prisma
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-sans text-white mb-2 text-sm md:text-base">
                        Link Playlist Spotify
                      </label>
                      <input
                        {...register('linkPlaylist', {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Debe ser una URL válida'
                          }
                        })}
                        type="url"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                        placeholder="https://open.spotify.com/..."
                      />
                      {errors.linkPlaylist && (
                        <p className="text-red-400 text-xs mt-1 font-sans">
                          {errors.linkPlaylist.message}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Audio Guestbook - Condicional */}
                  {!selectedPlan?.includes('Pro') ? (
                    <div className="bg-white/5 border border-white/20 rounded-xl px-4 py-3">
                      <p className="text-white/60 text-sm font-sans flex items-center gap-2">
                        🔒 Audio Guestbook exclusivo Plan Pro
                      </p>
                    </div>
                  ) : (
                    <div>
                      <label className="block font-sans text-white mb-2 text-sm md:text-base">
                        Audio Guestbook
                      </label>
                      <input
                        {...register('audioGuestbook', {
                          pattern: {
                            value: /^https?:\/\/.+/,
                            message: 'Debe ser una URL válida'
                          }
                        })}
                        type="url"
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 font-sans focus:outline-none focus:ring-2 focus:ring-lumina-pink focus:border-transparent"
                        placeholder="Link del audio guestbook"
                      />
                      {errors.audioGuestbook && (
                        <p className="text-red-400 text-xs mt-1 font-sans">
                          {errors.audioGuestbook.message}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Botones de Navegación */}
            <div className="flex justify-between mt-8 gap-4">
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-sans font-semibold rounded-full transition-all duration-300 border border-white/30"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Anterior
                </button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 bg-lumina-pink hover:bg-lumina-pink/90 text-white font-sans font-extrabold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Siguiente
                  <HiArrowRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center gap-2 px-6 py-3 bg-lumina-green hover:bg-lumina-green/90 text-white font-sans font-extrabold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <HiCheck className="w-5 h-5" />
                  Enviar Pedido
                </button>
              )}
            </div>
          </form>
          </div>
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventForm;

