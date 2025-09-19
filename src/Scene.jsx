// src/Scene.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  OrbitControls,
  ContactShadows,
  Preload,
  Sparkles,
} from "@react-three/drei";
import Model from "./components/Model";
import TechFloat from "./components/TechFloat";

export default function Scene() {
  const [modelLoaded, setModelLoaded] = useState(false);

  useEffect(() => {
    console.log("Scene mounted");

    const canvas = document.querySelector("canvas");
    if (!canvas) return;

    const handleContextLost = (event) => {
      event.preventDefault();
      console.warn("⚠️ WebGL context lost! Reloading canvas...");
      window.location.reload();
    };

    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      canvas.removeEventListener("webglcontextlost", handleContextLost);
    };
  }, []);

  return (
    <div className="viewport">
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.6, 3.6], fov: 40 }}
        style={{
          background:
            "linear-gradient(180deg, rgba(7,16,39,0.9), rgba(7,16,34,0.9))",
        }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

        {/* Decorative sparkles */}
        <Sparkles count={20} size={3} scale={[6, 3, 6]} />

        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          }
        >
          {/* Main 3D model */}
          <Model
            position={[0, -0.8, 0]}
            onLoaded={() => {
              setModelLoaded(true);
              console.log("✅ Model loaded successfully");
            }}
          />

          {/* Floating tech icons */}
          <TechFloat />

          {/* Ground shadow */}
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.9, 0]}
            opacity={0.6}
            width={4}
            blur={2}
            far={4}
          />

          <Environment preset="dawn" />
        </Suspense>

        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 2}
          autoRotate={false}
        />

        <Preload all />
      </Canvas>

      {/* Debug info */}
      {!modelLoaded && (
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            color: "white",
            fontSize: "14px",
          }}
        >
          Loading 3D model...
        </div>
      )}
    </div>
  );
}
