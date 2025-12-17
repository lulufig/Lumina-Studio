import { Canvas } from '@react-three/fiber';
import { Sparkles, Environment } from '@react-three/drei';
import { Suspense } from 'react';

const Scene3D = () => {
  const sparkleLayers = [
    { count: 100, scale: 11, size: 6, speed: 0.4, opacity: 0.9, color: '#FFFFFF' },
    { count: 80, scale: 12, size: 8, speed: 0.28, opacity: 0.8, color: '#FBA0E9' },
    { count: 60, scale: 9, size: 5, speed: 0.2, opacity: 0.7, color: '#FED80A' },
  ];

  return (
    <>
      <Environment preset="city" />
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, -5, 5]} intensity={0.5} color="#FBA0E9" />
      <pointLight position={[5, 5, 5]} intensity={0.5} color="#FED80A" />
      
      {/* Brillitos blancos (Fairy Dust) */}
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
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Background3DEffects;
