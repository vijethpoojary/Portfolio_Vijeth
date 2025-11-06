import { useState, useEffect, Suspense, useMemo, memo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import DeveloperCharacter from "../three/DeveloperCharacter";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";

function Hero() {
  const flow = useMemo(() => [
    { text: "Hi, Vijeth here 👋", options: null, autoNext: true },
    { text: "Are you a recruiter?", options: ["Yes", "No"] },
    { text: "Awesome! Would you like to check my projects?", options: ["Yes", "No"] },
    { text: "Cool! You can still explore my portfolio 🚀", options: null },
  ], []);

  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true); // spinner + bubble control

  const handleOption = useCallback((answer) => {
    setStep((currentStep) => {
      if (flow[currentStep].text.includes("Are you a recruiter?") && answer === "No") {
        return flow.length - 1;
      }
      if (currentStep < flow.length - 1) return currentStep + 1;
      return currentStep;
    });
  }, [flow]);

  const handleLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && flow[step]?.autoNext) {
      const timer = setTimeout(() => {
        setStep((currentStep) => {
          if (currentStep < flow.length - 1) return currentStep + 1;
          return currentStep;
        });
      }, step === 0 ? 3000 : 2000); // 👈 first step = 3s, others = 2s
      return () => clearTimeout(timer);
    }
  }, [step, loading, flow]);

  return (
    <section className="hero section" id="hero">
      <div className="container hero-inner">
        {/* Text content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="hero-content"
        >
          <h1 className="hero-title">Vijeth Poojary</h1>
          <p className="hero-subtitle">
            Software Engineer | MERN, Cloud & DevOps Enthusiast
          </p>
          <div className="hero-cta">
            <a className="btn" href="#projects">View Projects</a>
            <a className="btn outline" href="#contact">Contact Me</a>
          </div>
        </motion.div>

        {/* 3D Developer model + bubble */}
        <div className="hero-canvas-wrapper">
          <div className="hero-canvas">
            {/* Trefoil Loader (only one now) */}
            {loading && (
              <div className="loading-spinner">
                <div className="spinner-wrapper">
  <Trefoil
    size="70"
    stroke="5"
    strokeLength="0.15"
    bgOpacity="0.2"
    speed="1.4"
    color="#3b82f6"
  />
</div>


              </div>
            )}

            <Canvas 
              camera={{ position: [0, 1.6, 3.6], fov: 40 }}
              dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
              performance={{ min: 0.5 }}
              gl={{ 
                antialias: true,
                powerPreference: "high-performance"
              }}
            >
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

              <Suspense fallback={null}>
                <DeveloperCharacter
                  scale={0.15}
                  position={[0, -0.95, 0]}
                  onLoaded={handleLoaded} // hide spinner + show bubble
                />
              </Suspense>
            </Canvas>
          </div>

          {/* Thought bubble appears ONLY after model loads */}
          {!loading && (
            <motion.div
              className="thought-bubble"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  <p>💭 {flow[step].text}</p>
                  {flow[step].options && (
                    <div className="options">
                      {flow[step].options.map((opt, i) => (
                        <button key={i} onClick={() => handleOption(opt)}>
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
