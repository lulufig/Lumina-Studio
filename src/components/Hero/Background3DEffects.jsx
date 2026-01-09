import { Canvas } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';

const Scene3D = ({ isMobile }) => {
  // Reducir partículas en móviles
  const sparkleLayers = isMobile
    ? [
        { count: 30, scale: 11, size: 6, speed: 0.4, opacity: 0.9, color: '#FFFFFF' },
        { count: 20, scale: 12, size: 8, speed: 0.28, opacity: 0.8, color: '#FBA0E9' },
      ]
    : [
        { count: 60, scale: 11, size: 6, speed: 0.4, opacity: 0.9, color: '#FFFFFF' },
        { count: 50, scale: 12, size: 8, speed: 0.28, opacity: 0.8, color: '#FBA0E9' },
        { count: 40, scale: 9, size: 5, speed: 0.2, opacity: 0.7, color: '#FED80A' },
      ];

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FBA0E9" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#FED80A" />
      
      {sparkleLayers.map((layer) => (
        <Sparkles
          key={layer.color + layer.size}
          count={layer.count}
          scale={layer.scale}
          size={layer.size}
          speed={layer.speed}
          opacity={layer.opacity}
          color={layer.color}
          position={[0, 0, 0]}
        />
      ))}
    </>
  );
};

const Background3DEffects = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
      // Solo cargar Three.js en desktop y después de un delay para no bloquear render inicial
      if (!mobile) {
        // Delay para que no bloquee el render inicial
        const timer = setTimeout(() => {
          setShouldLoad(true);
        }, 500);
        return () => clearTimeout(timer);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // No renderizar nada en móviles
  if (isMobile || !shouldLoad) {
    return null;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ 
          alpha: true, 
          antialias: false, // Desactivar antialiasing para mejor performance
          powerPreference: 'high-performance',
          stencil: false,
          depth: false
        }}
        dpr={[1, 1.5]} // Reducir DPR para mejor performance
        performance={{ min: 0.5 }} // Reducir calidad si hay lag
      >
        <Suspense fallback={null}>
          <Scene3D isMobile={false} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3DEffects;
