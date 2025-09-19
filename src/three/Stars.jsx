import { useMemo } from 'react'

export default function Stars() {
  const positions = useMemo(
    () =>
      Array.from({ length: 420 }, () => [
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 100,
      ]),
    []
  )

  return (
    <group>
      {positions.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color={0x9333ea} />
        </mesh>
      ))}
    </group>
  )
}
