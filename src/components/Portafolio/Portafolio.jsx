// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

// Demos publicados en public/demos/<carpeta>/index.html.
// Usan datos e ilustraciones ficticias: nunca fotos ni datos de clientas reales.
const demos = [
  {
    carpeta: 'xv-noche-estrellada',
    imagen: 'xv-noche-estrellada/fotos/retrato.svg',
    titulo: 'XV · Noche estrellada',
    descripcion: 'Una carta lacrada que se abre, cielo animado y una sala de retratos con la historia de la cumpleañera.',
    etiquetas: ['Sobre animado', 'Galería por capítulos', 'Alias para regalos'],
    fondo: 'bg-[#0c1b3f]',
    acento: 'bg-lumina-blue',
  },
  {
    carpeta: 'xv-fiesta',
    imagen: 'xv-fiesta/fotos/torta-cutout.svg',
    titulo: 'XV · Fiesta',
    descripcion: 'Stickers, globos y cuenta regresiva para una invitación con mucha energía, con misa y fiesta por separado.',
    etiquetas: ['Playlist colaborativa', 'Álbum compartido', 'CBU y alias'],
    fondo: 'bg-[#cfe0ff]',
    acento: 'bg-lumina-pink',
  },
  {
    carpeta: 'recibida',
    imagen: 'recibida/img/gato.svg',
    titulo: 'Me recibí · Y2K',
    descripcion: 'Escritorio retro lila con ventanitas, código que se escribe solo y RSVP con efectos de sonido.',
    etiquetas: ['Temática a medida', 'Spotify', 'RSVP a WhatsApp'],
    fondo: 'bg-[#e7dcff]',
    acento: 'bg-lumina-lilac',
  },
];

const Portafolio = () => {
  const base = import.meta.env.BASE_URL;

  return (
    <section id="portafolio" className="bg-white py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-InstrumentSerif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-blue-600 mb-4">
            Probalas desde tu celular
          </h2>
          <p className="font-Manrope text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Abrí cada demo, tocá todo y confirmá asistencia: así la van a vivir tus invitados.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {demos.map((demo, index) => (
            <motion.a
              key={demo.carpeta}
              href={`${base}demos/${demo.carpeta}/index.html`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-white rounded-3xl border-2 border-gray-200 shadow-lg overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-lumina-pink"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`${demo.fondo} aspect-[4/3] flex items-center justify-center overflow-hidden`}>
                <img
                  src={`${base}demos/${demo.imagen}`}
                  alt=""
                  className="h-full w-auto object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="flex flex-col flex-1 p-5 md:p-6 gap-3">
                <h3 className="font-InstrumentSerif text-2xl text-lumina-blue">{demo.titulo}</h3>
                <p className="font-Manrope text-sm md:text-base text-gray-600 leading-relaxed">{demo.descripcion}</p>
                <div className="flex flex-wrap gap-2">
                  {demo.etiquetas.map((etiqueta) => (
                    <span key={etiqueta} className={`${demo.acento} text-white font-Manrope text-xs font-semibold px-3 py-1 rounded-full`}>
                      {etiqueta}
                    </span>
                  ))}
                </div>
                <span className="mt-auto pt-2 font-Manrope font-extrabold text-sm text-lumina-pink inline-flex items-center gap-2">
                  Ver demo
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portafolio;
