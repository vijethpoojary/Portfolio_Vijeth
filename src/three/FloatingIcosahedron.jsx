import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function FloatingIcosahedron({ position = [0, 0, 0], color = 0x00f5ff, speed = 0.4 }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed
    if (ref.current) {
      ref.current.position.y = position[1] + Math.sin(t) * 0.6
      ref.current.rotation.y = t * 0.8
      ref.current.rotation.x = t * 0.6
    }
  })
  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.7, 0]} />
      <meshStandardMaterial color={color} metalness={0.8} roughness={0.25} emissive={color} emissiveIntensity={0.12} />
    </mesh>
  )
}
