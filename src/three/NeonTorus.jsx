import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'

function NeonTorus() {
  const ref = useRef()
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * 0.15
      ref.current.rotation.y += delta * 0.2
    }
  })
  return (
    <mesh ref={ref} rotation={[0.4, 0.8, 0]} position={[3.2, 0.2, -1]}>
      <torusKnotGeometry args={[1.6, 0.35, 128, 16]} />
      <meshStandardMaterial
        color={0x3b82f6}
        metalness={0.85}
        roughness={0.25}
        emissive={0x341b5f}
        emissiveIntensity={0.7}
      />
    </mesh>
  )
}

export default memo(NeonTorus)
