import { useState, lazy, Suspense } from 'react';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import PropuestaValor from './components/PropuestaValor/PropuestaValor';
import ServiceGateway from './components/ServiceGateway/ServiceGateway';
import SolutionsContainer from './components/SolutionsContainer/SolutionsContainer';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

// Solo lazy load EventForm ya que no es crítico
const EventForm = lazy(() => import('./components/EventForm/EventForm'));

function App() {
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('celebrations');

  const handleSelection = (category) => {
    setActiveCategory(category);
    
    // Scroll to solutions section
    const solutionsSection = document.getElementById('soluciones');
    if (solutionsSection) {
      solutionsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <PropuestaValor />
      <ServiceGateway onSelect={handleSelection} />
      <SolutionsContainer 
        activeTab={activeCategory} 
        setActiveTab={setActiveCategory} 
      />
      <FAQ />
      <Footer />
      
      {/* Formulario de Evento - solo carga cuando se abre */}
      {isEventFormOpen && (
        <Suspense fallback={null}>
          <EventForm 
            isOpen={isEventFormOpen} 
            onClose={() => setIsEventFormOpen(false)} 
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
