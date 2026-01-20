import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text3D } from '@react-three/drei'
import helvetikerBoldUrl from 'three/examples/fonts/helvetiker_bold.typeface.json?url'

const COLORS = {
  softCyan: '#a7f3f8',
  paleViolet: '#c4b5fd',
  lightBlue: '#93c5fd',
  mutedMint: '#a7f7d4',
}

function usePrefersReducedMotion() {
  const prefersRef = useRef(false)
  if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
    prefersRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  }
  return prefersRef.current
}

function AnimatedText3D({ text, position, color, fontSize, speed, offset, parallaxStrength, thickness, bevel, baseOpacity }) {
  const ref = useRef()
  const materialRef = useRef()
  const prefersReducedMotion = usePrefersReducedMotion()
  const frameCountRef = useRef(0)

  useFrame((state, delta) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime() + offset

    // Independent float with varied amplitude per object
    const floatAmp = prefersReducedMotion ? 0 : (0.06 + speed * 0.04)
    ref.current.position.y = position[1] + Math.sin(t * (0.3 + speed * 0.4)) * floatAmp
    ref.current.position.x = position[0] + Math.cos(t * (0.25 + speed * 0.5)) * (prefersReducedMotion ? 0 : (0.04 + speed * 0.03))

    // Slow Z drift for subtle parallax movement
    ref.current.position.z = position[2] + Math.sin(t * (0.2 + speed * 0.3)) * (prefersReducedMotion ? 0 : 0.12)

    // Independent rotation speeds per object
    if (!prefersReducedMotion) {
      ref.current.rotation.x = Math.sin(t * (0.08 + speed * 0.05)) * (0.06 + speed * 0.04)
      ref.current.rotation.y = Math.cos(t * (0.1 + speed * 0.06)) * (0.1 + speed * 0.05)
      ref.current.rotation.z = Math.sin(t * (0.06 + speed * 0.04)) * 0.03
    }

    // Opacity falloff: update every 2nd frame to reduce overhead
    if (materialRef.current && frameCountRef.current % 2 === 0) {
      const camPos = state.camera.position
      const objPos = ref.current.position
      const distanceFromCam = Math.sqrt(
        Math.pow(objPos.x - camPos.x, 2) +
        Math.pow(objPos.y - camPos.y, 2) +
        Math.pow(objPos.z - camPos.z, 2)
      )
      const opacityFalloff = Math.max(0.3, 1 - distanceFromCam * 0.08)
      materialRef.current.opacity = baseOpacity * opacityFalloff
    }
    frameCountRef.current++
  })

  return (
    <Text3D
      ref={ref}
      position={position}
      font={helvetikerBoldUrl}
      size={fontSize}
      height={thickness}
      bevelEnabled={bevel}
      bevelThickness={0.02}
      bevelSize={0.01}
      bevelSegments={4}
    >
      {text}
      <meshStandardMaterial
        ref={materialRef}
        color={color}
        roughness={0.5}
        metalness={0.15}
        emissive={color}
        emissiveIntensity={0.12}
        toneMapped
        transparent
        opacity={0.95}
      />
    </Text3D>
  )
}

export default function TechTextBackground({
  words = ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'React', 'Node.js'],
  xRange = [-5.5, 5.5],
  yRange = [-2.5, 3.5],
  zRange = [-4.0, 3.5],
}) {
  // Precompute 3D cloud positions spread across full space
  const items = useMemo(() => {
    const palette = [COLORS.softCyan, COLORS.lightBlue, COLORS.paleViolet, COLORS.mutedMint]
    const out = []

    // Generate ~5-6 distributed text elements for depth perception
    for (let i = 0; i < 6; i++) {
      const w = words[i % words.length]
      
      // Spread across X, Y, Z with controlled ranges
      const x = xRange[0] + Math.random() * (xRange[1] - xRange[0])
      const y = yRange[0] + Math.random() * (yRange[1] - yRange[0])
      const z = zRange[0] + Math.random() * (zRange[1] - zRange[0])

      // Keep center-left area clear for hero text/buttons (avoid -1.5..1.5 X, -0.8..1.2 Y)
      if (Math.abs(x) < 1.5 && Math.abs(y - 0.2) < 1.0) {
        continue
      }

      const color = palette[i % palette.length]
      
      // Larger text in foreground, smaller in background (perspective)
      const depthFactor = (z - zRange[0]) / (zRange[1] - zRange[0]) // 0..1 from back to front
      const fontSize = 0.45 + depthFactor * 0.35

      // Vary other params for independence
      const speed = 0.1 + Math.random() * 0.4
      const offset = Math.random() * 20
      const parallaxStrength = 0.5 + Math.random() * 2.5
      const thickness = 0.16 + Math.random() * 0.1
      const bevel = true
      const baseOpacity = 0.85 + Math.random() * 0.15

      out.push({
        key: `${w}-${i}`,
        text: w,
        position: [x, y, z],
        color,
        fontSize,
        speed,
        offset,
        parallaxStrength,
        thickness,
        bevel,
        baseOpacity,
      })
    }

    return out
  }, [words, xRange, yRange, zRange])

  return (
    <group raycast={() => null}>
      {items.map((it) => (
        <AnimatedText3D key={it.key} {...it} />
      ))}
    </group>
  )
}
