import { useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import FloatingIcosahedron from './FloatingIcosahedron'

function ParallaxGroup() {
  const group = useRef()
  const targetRotation = useRef({ x: 0, y: 0 })
  
  useFrame(({ pointer }) => {
    if (!group.current) return
    // Smooth interpolation for better performance
    targetRotation.current.y = pointer.x * 0.12
    targetRotation.current.x = -pointer.y * 0.08
    
    group.current.rotation.y += (targetRotation.current.y - group.current.rotation.y) * 0.1
    group.current.rotation.x += (targetRotation.current.x - group.current.rotation.x) * 0.1
  })
  
  return (
    <group ref={group}>
      <FloatingIcosahedron position={[4.5, 0.5, -2]} color={0x00f5ff} speed={0.55} />
      <FloatingIcosahedron position={[-4.8, -0.2, 0]} color={0x3b82f6} speed={0.5} />
      <FloatingIcosahedron position={[0.2, -1.2, 3]} color={0x66ffee} speed={0.65} />
    </group>
  )
}

export default memo(ParallaxGroup)
