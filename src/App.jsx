import { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import PropuestaValor from './components/PropuestaValor/PropuestaValor';
import Servicios from './components/Servicios/Servicios';
import Pricing from './components/Pricing/Pricing';
import Portfolio from './components/Portfolio/Portfolio';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';
import EventForm from './components/EventForm/EventForm';

function App() {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <PropuestaValor />
      <Servicios />
      <Pricing onOpenEventForm={() => setIsEventFormOpen(true)} />
      <Portfolio />
      <FAQ />
      <Footer />
      
      {/* Formulario de Evento */}
      <EventForm 
        isOpen={isEventFormOpen} 
        onClose={() => setIsEventFormOpen(false)} 
      />
    </div>
  );
}

export default App;
