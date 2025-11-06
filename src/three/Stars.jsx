import { useMemo, useRef, memo } from 'react'
import { useFrame } from '@react-three/fiber'

function Stars() {
  const meshRef = useRef()
  const count = 420
  
  const positions = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }
    return positions
  }, [count])

  // Subtle rotation for visual interest
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.01
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color={0x9333ea}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
      />
    </points>
  )
}

export default memo(Stars)
