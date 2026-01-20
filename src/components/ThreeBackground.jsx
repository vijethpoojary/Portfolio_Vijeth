import { Suspense, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Stars from '../three/Stars'
import TechTextBackground from '../three/TechTextBackground'
import { EffectComposer, Bloom, DepthOfField } from '@react-three/postprocessing'

function ThreeBackground() {
  // Safely get device pixel ratio
  const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1
  
  return (
    <Canvas 
      camera={{ position: [0, 0.5, 8], fov: 55 }} 
      className="three-canvas" 
      dpr={dpr}
      performance={{ min: 0.5 }}
      gl={{ 
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true
      }}
    >
      <color attach="background" args={[0x0a0a23]} />
      {/* Cinematic lighting: soft key, rim/back, ambient */}
      <ambientLight intensity={0.35} />
      <directionalLight position={[7, 10, 8]} intensity={0.75} color={0xffffff} />
      <spotLight position={[-5, 3, -5]} angle={0.4} penumbra={0.6} intensity={0.6} color={0x99ccff} />
      <spotLight position={[3, 1, 4]} angle={0.3} penumbra={0.4} intensity={0.3} color={0xccaaff} />
      <Suspense fallback={null}>
        <TechTextBackground />
        <Stars />
        <EffectComposer>
          <Bloom intensity={0.12} luminanceThreshold={0.3} luminanceSmoothing={0.1} />
        </EffectComposer>
      </Suspense>
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
      />
    </Canvas>
  )
}

export default memo(ThreeBackground)
