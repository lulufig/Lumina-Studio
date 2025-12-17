import { useState, useEffect, useRef } from 'react';

const Portfolio = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const projectsScrollRef = useRef(null);
  const testimonialsScrollRef = useRef(null);

  const projects = [
    { id: 6, image: '/invitaciones/david-norita-aniversario.png', title: 'Aniversario - David y Norita' },
    { id: 2, image: '/invitaciones/sofia-cumple-30.png', title: 'Cumpleaños 30 - Sofía' },
    { id: 1, image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=800&fit=crop', title: 'Casamiento' },
    { id: 3, image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600&h=800&fit=crop', title: 'Evento Corporativo' },
    { id: 4, image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=600&h=800&fit=crop', title: 'Baby Shower' },
    { id: 5, image: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&h=800&fit=crop', title: 'Graduación' },
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

  // Auto-scroll para proyectos
  useEffect(() => {
    const scrollContainer = projectsScrollRef.current;
    if (!scrollContainer) return;

    let animationId;
    let isPaused = false;

    const autoScroll = () => {
      if (!isPaused && scrollContainer) {
        scrollContainer.scrollLeft += 1;
        
        // Resetear cuando llegue a la mitad (donde están duplicados)
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(autoScroll);
    };

    animationId = requestAnimationFrame(autoScroll);

    // Pausar en hover
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

  // Auto-scroll para testimonios (dirección contraria)
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

  const openWhatsApp = () => {
    window.open('https://wa.me/5493865690028', '_blank');
  };

  return (
    <section 
      ref={sectionRef}
      id="portfolio" 
      className="bg-white py-16 md:py-24 px-6 overflow-hidden"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Título */}
        <div className={`mb-12 md:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="font-InstrumentSerif text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-lumina-blue leading-tight mb-4">
            Nuestros proyectos
          </h2>
          <p className="font-Manrope  text-lumina-blue text-lg md:text-xl">
            Creatividad aplicada a ideas reales
          </p>
        </div>

        {/* Carrusel de Proyectos */}
        <div className={`mb-16 md:mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`} style={{ transitionDelay: '200ms' }}>
          <div 
            ref={projectsScrollRef}
            className="flex gap-4 md:gap-6 overflow-x-hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicar proyectos para loop infinito */}
            {[...projects, ...projects].map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="shrink-0 w-64 md:w-80 lg:w-96 h-80 md:h-96 lg:h-112 rounded-3xl overflow-hidden relative group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-lumina-blue/90 via-lumina-blue/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-white font-serif text-2xl md:text-3xl mb-2">{project.title}</h3>
                    <div className="w-16 h-1 bg-lumina-yellow rounded-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Carrusel de Testimonios */}
        <div className={`mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`} style={{ transitionDelay: '400ms' }}>
          <div 
            ref={testimonialsScrollRef}
            className="flex gap-6 md:gap-8 overflow-x-hidden scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicar testimonios para loop infinito */}
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div
                key={`testimonial-${index}`}
                className="shrink-0 w-80 md:w-96 bg-lumina-gray p-6 md:p-8 rounded-3xl hover:shadow-xl transition-all duration-500 cursor-default"
              >
                <p className="font-sans text-lumina-dark text-base md:text-lg leading-relaxed mb-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-1 h-12 bg-${testimonial.color} rounded-full`}></div>
                  <p className="font-serif italic text-lumina-blue text-lg">
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
