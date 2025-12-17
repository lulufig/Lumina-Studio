// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HiX } from 'react-icons/hi';

const BankTransferModal = ({ isOpen, onClose, planName, planPrice }) => {
  const [copiedField, setCopiedField] = useState(null);

  // CONFIGURAR TUS DATOS BANCARIOS AQUÍ
  const bankData = {
    alias: 'LUMINA.INVITACIONES',
    cbu: '4530000800014350804461',
    bankName: 'Banco Naranja X',
    accountHolder: 'Lourdes Figueroa'
  };

  const handleCopy = async (text, fieldName) => {
    try {
      // Intentar copiar al portapapeles
      await navigator.clipboard.writeText(text);
      
      // Mostrar feedback visual
      setCopiedField(fieldName);
      
      // Resetear después de 2 segundos
      setTimeout(() => {
        setCopiedField(null);
      }, 2000);
    } catch {
      // Fallback para navegadores que no soportan clipboard API
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      
      try {
        document.execCommand('copy');
        setCopiedField(fieldName);
        setTimeout(() => {
          setCopiedField(null);
        }, 2000);
      } catch (error) {
        console.error('Error al copiar:', error);
      } finally {
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div 
              className="bg-white rounded-2xl md:rounded-3xl max-w-md w-full p-4 sm:p-6 md:p-8 relative shadow-2xl mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-lumina-dark hover:text-lumina-orange transition-colors"
              >
                <HiX className="w-6 h-6" />
              </button>

              {/* Contenido */}
              <div className="text-center mb-6">
                <h3 className="font-InstrumentSerif text-2xl sm:text-3xl text-lumina-blue mb-2">
                  Datos para Transferencia
                </h3>
                <p className="font-Manrope text-lumina-dark/70 text-sm sm:text-base">
                  {planName} - {planPrice}
                </p>
              </div>

                {/* Datos bancarios */}
              <div className="space-y-4 mb-6">
                {/* Alias */}
                <div className="bg-lumina-gray rounded-2xl p-4">
                  <p className="font-Manrope text-sm text-lumina-dark/60 mb-2">Alias</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-Manrope font-semibold text-lumina-dark text-base sm:text-lg break-all">
                      {bankData.alias}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy(bankData.alias, 'alias');
                      }}
                      className={`px-2 sm:px-3 py-1.5 text-white text-xs font-Manrope font-semibold rounded-lg transition-colors shrink-0 cursor-pointer ${
                        copiedField === 'alias' 
                          ? 'bg-lumina-green' 
                          : 'bg-lumina-blue hover:bg-lumina-blue/90'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedField === 'alias' ? '✓ Copiado' : 'Copiar'}
                    </motion.button>
                  </div>
                </div>

                {/* CBU */}
                <div className="bg-lumina-gray rounded-2xl p-4">
                  <p className="font-Manrope text-sm text-lumina-dark/60 mb-2">CBU</p>
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-Manrope font-semibold text-lumina-dark text-base sm:text-lg break-all">
                      {bankData.cbu}
                    </p>
                    <motion.button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleCopy(bankData.cbu, 'cbu');
                      }}
                      className={`px-2 sm:px-3 py-1.5 text-white text-xs font-Manrope font-semibold rounded-lg transition-colors shrink-0 cursor-pointer ${
                        copiedField === 'cbu' 
                          ? 'bg-lumina-green' 
                          : 'bg-lumina-blue hover:bg-lumina-blue/90'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {copiedField === 'cbu' ? '✓ Copiado' : 'Copiar'}
                    </motion.button>
                  </div>
                </div>

              <div aria-live="polite" className="sr-only">
                {copiedField === 'alias' && 'Alias copiado.'}
                {copiedField === 'cbu' && 'CBU copiado.'}
              </div>

                {/* Banco y Titular */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-lumina-dark/60">Banco:</span>
                    <span className="font-semibold text-lumina-dark">{bankData.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-lumina-dark/60">Titular:</span>
                    <span className="font-semibold text-lumina-dark text-right">{bankData.accountHolder}</span>
                  </div>
                </div>
              </div>

              {/* Mensaje informativo */}
              <div className="bg-lumina-yellow/20 rounded-xl p-4 mb-6">
                <p className="font-Manrope text-sm text-lumina-dark">
                  💡 <strong>Importante:</strong> Una vez realizada la transferencia, envía el comprobante por WhatsApp para confirmar tu pedido.
                </p>
              </div>

              {/* Botón WhatsApp */}
              <motion.button
                onClick={() => {
                  const message = `Hola! Acabo de realizar la transferencia por ${planPrice} para el plan "${planName}". Adjunto comprobante.`;
                  window.open(`https://wa.me/5493865326878?text=${encodeURIComponent(message)}`, '_blank');
                  onClose();
                }}
                className="w-full bg-lumina-green text-white font-Manrope font-extrabold px-6 py-3 rounded-full hover:bg-lumina-green/90 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                💬 Enviar comprobante por WhatsApp
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BankTransferModal;