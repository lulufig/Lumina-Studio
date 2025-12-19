import { useState, useEffect, useRef } from 'react';
import { HiX } from 'react-icons/hi';
import { openWhatsApp } from '../../utils/scrollUtils';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const sectionRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const projects = [
    {
      id: 1,
      image: `${import.meta.env.BASE_URL}invitaciones/david-norita-aniversario.png`, 
      title: 'Aniversario - David y Norita',
      description: 'Invitación digital elegante para celebrar el aniversario de una pareja especial.'
    },
    {
      id: 2,
      image: `${import.meta.env.BASE_URL}invitaciones/sofia-cumple-30.png`, 
      title: 'Cumpleaños 30 - Sofía',
      description: 'Diseño moderno y festivo para un cumpleaños inolvidable.'
    },
    {
      id: 3,
      image: `${import.meta.env.BASE_URL}invitaciones/graduacion.png`, 
      title: 'Graduación',
      description: 'Invitación digital para la graduación de un colegio.'
    },
    {
      id: 4,
      image: `${import.meta.env.BASE_URL}invitaciones/baby-shawer.png`, 
      title: 'Baby Shower - Carolina y Juan',
      description: 'Invitación digital para el baby shower de Carolina y Juan.'
    },
  ];

  const testimonials = [
    {
      quote: 'La invitación fue hermosa y muy fácil de usar. Recibimos muchos mensajes por lo linda que era.',
      author: 'Sofía, cumpleaños de 30',
      color: 'lumina-pink'
    },
    {
      quote: 'No sabíamos bien qué queríamos y nos ayudaron a definirlo. El resultado fue mejor de lo esperado.',
      author: 'Agus & Nico, casamiento',
      color: 'lumina-blue'
    },
    {
      quote: 'Nos llegaron comentarios de que era práctica y distinta. Se notó el cuidado en cómo estaba pensada.',
      author: 'Martín, emprendedor',
      color: 'lumina-green'
    },
    {
      quote: 'Tener toda la información en un solo link hizo que nadie se perdiera ni tenga dudas. Fue muy cómodo.',
      author: 'Camila, evento familiar',
      color: 'lumina-orange'
    },
    {
      quote: 'El diseño superó nuestras expectativas. Todo el proceso fue súper fácil y personalizado.',
      author: 'Laura & Diego, boda',
      color: 'lumina-lilac'
    },
    {
      quote: 'Nos encantó poder tener todo en un mismo lugar. La experiencia fue increíble de principio a fin.',
      author: 'Carolina, evento corporativo',
      color: 'lumina-yellow'
    },
  ];

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-scroll para testimonios
  useEffect(() => {
    const scrollContainer = testimonialsScrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let isPaused = false;

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 0.8;
        
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Cerrar modal con Escape y bloquear scroll
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    if (selectedProject) {
      window.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);


  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="bg-white py-16 md:py-24 px-6 overflow-x-hidden w-full"
    >
      <div className="container mx-auto max-w-5xl">
        {/* Título */}
        <div className={`mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-InstrumentSerif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-lumina-blue leading-tight mb-4">
            Nuestros proyectos
          </h2>
          <p className="font-Manrope  text-lumina-blue text-lg md:text-xl">
            Creatividad aplicada a ideas reales
          </p>
        </div>

        {/* Grid de Proyectos */}
        <div className={`mb-16 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '200ms' }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className="group relative aspect-430/600 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-lumina-gray"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  style={{ objectPosition: 'center top' }}
                />
                {/* Overlay con información */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-InstrumentSerif text-sm md:text-base lg:text-lg mb-1 font-semibold line-clamp-2">
                      {project.title}
                    </h3>
                    <div className="w-12 h-0.5 bg-lumina-yellow rounded-full"></div>
                  </div>
                </div>
              </div>
                    ))}
                  </div>
                </div>

        {/* Carrusel de Testimonios */}
        <div className={`mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`} style={{ transitionDelay: '400ms' }}>
          <div 
            ref={testimonialsScrollRef}
            className="flex gap-6 md:gap-8 overflow-x-auto scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicar testimonios para loop infinito */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className="shrink-0 w-64 md:w-72 lg:w-80 bg-lumina-gray p-4 md:p-6 rounded-2xl hover:shadow-xl transition-all duration-500 cursor-default"
              >
                <p className="font-sans text-lumina-dark text-sm md:text-base leading-relaxed mb-4">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-2">
                  <div 
                    className={`w-1 h-8 rounded-full ${
                      testimonial.color === 'lumina-pink' ? 'bg-lumina-pink' :
                      testimonial.color === 'lumina-blue' ? 'bg-lumina-blue' :
                      testimonial.color === 'lumina-green' ? 'bg-lumina-green' :
                      testimonial.color === 'lumina-orange' ? 'bg-lumina-orange' :
                      testimonial.color === 'lumina-lilac' ? 'bg-lumina-lilac' :
                      'bg-lumina-yellow'
                    }`}
                  ></div>
                  <p className="font-serif italic text-lumina-blue text-sm md:text-base">
                    {testimonial.author}
                  </p>
              </div>
            </div>
          ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className={`text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '600ms' }}>
          <button 
            onClick={openWhatsApp}
            className="group relative bg-lumina-pink text-white font-sans font-extrabold text-base md:text-lg px-10 md:px-12 py-4 md:py-5 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-lumina-pink/40 cursor-pointer"
          >
            <span className="absolute inset-0 bg-white/20 scale-0 group-hover:scale-100 rounded-full transition-transform duration-500"></span>
            <span className="font-Manrope  relative flex items-center justify-center gap-2">
              Súmate a la experiencia
              <svg 
                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative max-w-md md:max-w-lg lg:max-w-xl w-full my-8 bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              aria-label="Cerrar"
            >
              <HiX className="w-6 h-6 text-lumina-dark" />
            </button>

            {/* Imagen con scroll */}
            <div className="relative bg-lumina-gray overflow-y-auto max-h-[75vh] flex items-start justify-center p-4">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title}
                className="max-w-full h-auto object-contain"
              />
            </div>

            {/* Detalles */}
            <div className="p-6 md:p-8 bg-white">
              <h3 className="font-serif text-2xl md:text-3xl text-lumina-blue mb-3">
                {selectedProject.title}
              </h3>
              <p className="font-sans text-lumina-dark text-base md:text-lg leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Estilos para ocultar scrollbar */}
      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default Portfolio;
