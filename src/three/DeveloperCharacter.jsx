import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";

export default function DeveloperCharacter({ position = [0, -0.95, 0], scale = 1, onLoaded }) {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) {
    return <DeveloperFallback position={[0, -1.15, 0]} scale={0.65} />;
  }

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

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      Object.values(actions).forEach((a) => a?.play?.());
    }

    // Wait until scene is actually added before marking as loaded
    if (scene && !ready) {
      setReady(true);
      if (onLoaded) onLoaded();
    }
  }, [actions, scene, ready, onLoaded]);

  const [dragging, setDragging] = useState(false);
  const lastPos = useRef([0, 0]);
  const rotation = useRef([0, 0]);

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
    const handleUp = () => setDragging(false);

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
    group.current.position.y = position[1] + Math.sin(t * 1.2) * 0.03;
    group.current.rotation.x = rotation.current[0];
    group.current.rotation.y = rotation.current[1];
  });

  return (
    <primitive
      ref={group}
      object={scene}
      scale={[scale, scale, scale]}
      position={position}
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
