import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import FloatingIcosahedron from './FloatingIcosahedron'

export default function ParallaxGroup() {
  const group = useRef()
  useFrame(({ pointer }) => {
    if (!group.current) return
    group.current.rotation.y = pointer.x * 0.12
    group.current.rotation.x = -pointer.y * 0.08
  })
  return (
    <group ref={group}>
      <FloatingIcosahedron position={[4.5, 0.5, -2]} color={0x00f5ff} speed={0.55} />
      <FloatingIcosahedron position={[-4.8, -0.2, 0]} color={0x3b82f6} speed={0.5} />
      <FloatingIcosahedron position={[0.2, -1.2, 3]} color={0x66ffee} speed={0.65} />
    </group>
  )
}
