import Background3DEffects from './Background3DEffects';
import { openWhatsApp } from '../../utils/scrollUtils';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-lumina-blue min-h-screen flex items-center justify-center overflow-hidden px-4 py-16 md:py-20">
      {/* Efectos 3D de fondo */}
      <Background3DEffects />
      
      {/* Gradiente animado de fondo */}
      <div className="absolute inset-0 bg-linear-to-br from-lumina-blue via-lumina-blue/95 to-lumina-blue/90 animate-gradient-shift"></div>
      
      {/* Partículas flotantes sutiles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/10 rounded-full animate-particle-float"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + i * 12}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${8 + i * 2}s`
            }}
          />
        ))}
      </div>


      {/* Contenido principal */}
      <div className="container mx-auto text-center relative z-20 max-w-6xl">
        <h1 className="font-InstrumentSerif mt-20 sm:mt-24 md:mt-29 text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-white leading-tight mb-6 sm:mb-8 md:mb-10 tracking-tight animate-fade-in-up px-2">
          <span className="inline-block bg-linear-to-r from-white via-white to-white/90 bg-clip-text text-transparent drop-shadow-lg">
            Diseño y luz para tus<br />
            momentos especiales.
          </span>
        </h1>
        <p className="font-Manrope text-base sm:text-lg md:text-xl lg:text-2xl text-white/95 mb-8 sm:mb-10 md:mb-12 max-w-4xl mx-auto leading-relaxed px-4 animate-fade-in-up-delay">
          Creamos invitaciones digitales y landing pages que hacen brillar tu evento desde el primer click.
        </p>
        <div className="animate-fade-in-up-delay-2">
          <button 
            onClick={openWhatsApp}
            aria-label="Contactanos por WhatsApp"
            className="group relative bg-lumina-pink text-white font-Manrope font-extrabold text-base md:text-lg px-5 py-3 md:px-10 md:py-4 rounded-full hover:bg-[#F98FE0] hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-lumina-pink/50 cursor-pointer overflow-hidden"
          >
            {/* Efecto de brillo animado */}
            <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            <span className="relative z-10">Contactanos</span>
          </button>
        </div>
      </div>

      {/* Estilos de animación */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes gradient-shift {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.95;
          }
        }

        @keyframes particle-float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.1;
          }
          50% {
            transform: translateY(-30px) translateX(15px);
            opacity: 0.3;
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }

        @keyframes pulse-glow-yellow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.15);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-particle-float {
          animation: particle-float linear infinite;
        }

        .animate-pulse-glow {
          animation: pulse-glow 3s ease-in-out infinite;
        }

        .animate-pulse-glow-yellow {
          animation: pulse-glow-yellow 4s ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-fade-in-up-delay {
          animation: fade-in-up 1s ease-out 0.2s both;
        }

        .animate-fade-in-up-delay-2 {
          animation: fade-in-up 1s ease-out 0.4s both;
        }

        .drop-shadow-glow-orange {
          filter: drop-shadow(0 0 10px rgba(248, 73, 26, 0.5));
        }

        .shadow-glow-yellow {
          box-shadow: 0 0 20px rgba(254, 216, 10, 0.4);
        }

        .delay-300 {
          animation-delay: 300ms;
        }

        @media (max-width: 768px) {
          h1 {
            line-height: 1.15;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
