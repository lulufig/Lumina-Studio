import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import PropuestaValor from './components/PropuestaValor/PropuestaValor';
import Servicios from './components/Servicios/Servicios';
import Pricing from './components/Pricing/Pricing';
import Portfolio from './components/Portfolio/Portfolio';
import FAQ from './components/FAQ/FAQ';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Navbar />
      <Hero />
      <PropuestaValor />
      <Servicios />
      <Pricing />
      <Portfolio />
      <FAQ />
      <Footer />
    </div>
  );
}

export default App;
