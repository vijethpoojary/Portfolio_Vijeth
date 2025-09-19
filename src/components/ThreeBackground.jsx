import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import NeonTorus from '../three/NeonTorus'
import FloatingIcosahedron from '../three/FloatingIcosahedron'
import Stars from '../three/Stars'
import ParallaxGroup from '../three/ParallaxGroup'

export default function ThreeBackground() {
  return (
    <Canvas camera={{ position: [0, 0, 8], fov: 60 }} className="three-canvas" dpr={[1, 2]}>
      <color attach="background" args={[0x0a0a23]} />
      <ambientLight intensity={0.7} />
      <pointLight position={[8, 8, 8]} intensity={28} color={0x00f5ff} />
      <pointLight position={[-8, -6, -6]} intensity={18} color={0x3b82f6} />
      <pointLight position={[0, 3, 6]} intensity={8} color={0x9333ea} />
      <Suspense fallback={null}>
        <NeonTorus />
        <ParallaxGroup />
        <Stars />
      </Suspense>
      <OrbitControls
  enablePan={false}
  enableZoom={false}
  autoRotate
  autoRotateSpeed={0.15} // slower, smoother
  dampingFactor={0.05}
  enableDamping
/>
    </Canvas>
  )
}
