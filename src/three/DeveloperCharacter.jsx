import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function DeveloperCharacter({ position = [0, -0.95, 0], scale = 1, onLoaded }) {
  return (
    <DeveloperGLTF
      url="/models/dev.glb"
      position={position}
      scale={scale}
      onLoaded={onLoaded}
    />
  );
}

function DeveloperGLTF({ url, position, scale, onLoaded }) {
  const { scene, animations } = useGLTF(url);
  const group = useRef();
  const { actions } = useAnimations(animations, group);

  const [ready, setReady] = useState(false);
  const [dragging, setDragging] = useState(false);
  const lastPos = useRef([0, 0]);
  const rotation = useRef([0, 0]);

  // Set initial position when component mounts or position changes
  useEffect(() => {
    if (group.current) {
      group.current.position.set(position[0], position[1], position[2]);
      group.current.scale.set(scale, scale, scale);
    }
  }, [position, scale]);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((a) => a?.play?.());
    }

    if (scene && !ready) {
      setReady(true);
      if (onLoaded) onLoaded();
    }
  }, [actions, scene, ready, onLoaded]);

  useEffect(() => {
    const handleDown = (e) => {
      setDragging(true);
      lastPos.current = [e.clientX, e.clientY];
    };
    
    const handleMove = (e) => {
      if (!dragging) return;
      const [lastX] = lastPos.current;
      const dx = e.clientX - lastX;
      rotation.current[1] += dx * 0.01;
      lastPos.current = [e.clientX, e.clientY];
    };
    
    const handleUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousedown", handleDown);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);

    return () => {
      window.removeEventListener("mousedown", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
  }, [dragging]);

  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    
    // Apply floating animation as an offset to the base position
    const floatOffset = Math.sin(t * 1.2) * 0.03;
    group.current.position.y = position[1] + floatOffset;
    
    group.current.rotation.x = rotation.current[0];
    group.current.rotation.y = rotation.current[1];
  });

  return (
    <primitive
      ref={group}
      object={scene}
      position={position}
      scale={[scale, scale, scale]}
      rotation={[0, 0, 0]}
    />
  );
}

export function DeveloperFallback({ position = [0, 0, 0], scale = 0.5 }) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, -0.6, 0]}>
        <boxGeometry args={[2.4, 0.2, 1.2]} />
        <meshStandardMaterial color={0x101425} />
      </mesh>
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color={0xffd6b0} />
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/dev.glb");