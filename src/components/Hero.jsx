import { useState, useEffect, Suspense, useMemo, memo, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import DeveloperCharacter from "../three/DeveloperCharacter";
import { Trefoil } from "ldrs/react";
import "ldrs/react/Trefoil.css";
import { useNavigate } from "react-router-dom";

const MotionDiv = motion.div;

function Hero() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [visitingPage, setVisitingPage] = useState(null); // Track which page user is viewing
  const [isResumeModalOpen, setResumeModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );
  const navigate = useNavigate();
  const resumeDownloadRef = useRef(null);
  const resumeLink = "/resume.pdf";

  const flow = useMemo(
    () => [
      {
        text: "Hi, I'm Vijeth! 👋 Welcome to my portfolio",
        autoNext: true
      },
      {
        text: "What's your name?",
        hasInput: true
      },
      {
        text: `Nice to meet you, ${userName}! 😊`,
        autoNext: true
      },
      {
        text: `${userName}, what brings you here today?`,
        options: [
          { label: "to hire? |", value: "hire" },
          { label: "Explore |", value: "explore" },
          { label: "Just browsing", value: "browse" }
        ]
      },
      {
        text: `Great! ${userName}, I'd love to show you my work`,
        autoNext: true
      },
      {
        text: `${userName}, what interests you most?`,
        options: [
          { label: "Projects |", link: "#projects", page: "Projects" },
          { label: "Skills |", link: "#skills", page: "Skills" },
          { label: "Experience ", link: "#experience", page: "Experience" },        ]
      },
      {
        text: `Awesome ${userName}! Feel free to explore`,
        options: [
          { label: "Projects |", link: "#projects", page: "Projects" },
          { label: "About Me |", link: "#about", page: "About" },
          { label: "Contact |", link: "#contact", page: "Contact" },
          { label: "Skills", link: "#skills", page: "Skills" }
        ]
      },
      {
        text: `Thank you for visiting, ${userName}! 🎉`,
        isFinal: true
      }
    ],
    [userName]
  );

  const safeStep = Math.min(step, flow.length - 1);
  const currentScreen = flow[safeStep];

  const handleOption = useCallback((value) => {
    setStep((currentStep) => {
      if (currentStep === 3) {
        return value === "hire" ? 4 : 6;
      }

      if (currentStep < flow.length - 1) {
        return currentStep + 1;
      }

      return currentStep;
    });
  }, [flow]);

  const handleNameSubmit = useCallback(() => {
    if (nameInput.trim()) {
      setUserName(nameInput.trim());
      setStep(2); // Move to greeting step
    }
  }, [nameInput]);

  const handleBack = useCallback(() => {
    if (visitingPage) {
      setVisitingPage(null);
      return;
    }

    setStep((currentStep) => {
      if (currentStep === 0) return currentStep;

      if (currentStep === 2) {
        setUserName("");
        setNameInput("");
      }

      return currentStep - 1;
    });
  }, [visitingPage]);

  const handlePageNavigation = useCallback(
    (link, pageName) => {
      setVisitingPage(pageName);
      if (!link) return;

      if (link.startsWith("#") && typeof document !== "undefined") {
        const element = document.querySelector(link);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          if (typeof window !== "undefined") {
            window.history.replaceState(null, "", link);
          }
        }
        return;
      }

      navigate(link);
    },
    [navigate]
  );

  const handleLoaded = useCallback(() => {
    setLoading(false);
  }, []);

  const openResumeModal = useCallback(() => setResumeModalOpen(true), []);
  const closeResumeModal = useCallback(() => setResumeModalOpen(false), []);
  useEffect(() => {
    if (typeof window === 'undefined') return;
  
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        setIsMobile(newIsMobile);
      }
    };
  
    // Run once on mount to ensure correct initial state
    handleResize();
  
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!isResumeModalOpen) return;

    const { body } = document;
    const previousOverflow = body.style.overflow;
    body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        closeResumeModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    resumeDownloadRef.current?.focus({ preventScroll: true });

    return () => {
      body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isResumeModalOpen, closeResumeModal]);

  useEffect(() => {
    if (!loading && currentScreen?.autoNext && !visitingPage) {
      const timer = setTimeout(() => {
        setStep((currentStep) =>
          currentStep < flow.length - 1 ? currentStep + 1 : currentStep
        );
      }, safeStep === 0 ? 1000 : 1000);
      return () => clearTimeout(timer);
    }
  }, [loading, currentScreen, visitingPage, flow.length, safeStep]);

  return (
    <section className="hero section" id="hero">
      <div className="container hero-inner">
        {/* Text content */}
        <MotionDiv
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="hero-content"
          style={{ willChange: 'opacity, transform' }}
        >
          <h1 className="hero-title">Vijeth </h1>
          <p className="hero-subtitle">
            Software Engineer 
          </p>
          <div className="hero-cta">
            <a className="btn" href="#projects">View Projects</a>
            <a className="btn outline" href="#contact">Contact Me</a>
            <button
              type="button"
              className="btn luxe"
              onClick={openResumeModal}
            >
              Resume
            </button>
            <p className="resume-note">Prefer a deep dive? Grab the full resume right here.</p>
          </div>
        </MotionDiv>

        {/* 3D Developer model + bubble */}
        <div className="hero-canvas-wrapper">
          <div className="hero-canvas">
            {/* Trefoil Loader */}
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
key={isMobile ? 'mobile' : 'desktop'}
  camera={{ 
    position: [0, 1.6, 3.6], 
    fov: isMobile ? 50 : 40  }}
  dpr={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
  performance={{ min: 0.5 }}
  gl={{ 
    antialias: false,  // Disable on mobile for better performance
    powerPreference: "high-performance"
  }}
>
              <ambientLight intensity={0.5} />
              <directionalLight position={[5, 10, 5]} intensity={1} castShadow />

              <Suspense fallback={null}>
              <DeveloperCharacter
scale={isMobile ? 0.17 : 0.15}
position={[0, isMobile ? -0.43 : -0.95, 0]}
  onLoaded={handleLoaded}
/>
              </Suspense>
            </Canvas>
          </div>

          {/* Thought bubble appears ONLY after model loads */}
          {!loading && (
            <MotionDiv
              className="thought-bubble"
              animate={{ y: [0, -12, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            >
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={visitingPage ? `page-${visitingPage}` : `step-${safeStep}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Back Arrow - Show on all steps except first */}
                  {(step > 0 || visitingPage) && (
                    <button 
                      type="button"
                      onClick={handleBack}
                      className="back-arrow"
                      title="Go back"
                    >
                      ←
                    </button>
                  )}

                  {/* Show page visiting message */}
                  {visitingPage ? (
                    <p>📍 You navigated to the {visitingPage} page. You can go back.</p>
                  ) : (
                    <>
                      <p>{currentScreen.text}</p>

                      {/* Name input field */}
                      {currentScreen.hasInput && (
                        <div className="name-input-wrapper">
                          <input
                            type="text"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleNameSubmit()}
                            placeholder="Your name..."
                            className="name-input"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={handleNameSubmit}
                            className="submit-name-btn"
                            disabled={!nameInput.trim()}
                          >
                            →
                          </button>
                        </div>
                      )}

                      {/* Option buttons */}
                      {currentScreen.options && (
                        <div className="optionsd">
                          {currentScreen.options.map((option) => (
                            <button
                              key={option.label}
                              type="button"
                              onClick={() => {
                                if (option.link && option.page) {
                                  handlePageNavigation(option.link, option.page);
                                } else {
                                  handleOption(option.value ?? option.label);
                                }
                              }}
                              className="optiond-btn"
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </MotionDiv>
              </AnimatePresence>
            </MotionDiv>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isResumeModalOpen && (
          <MotionDiv
            className="resume-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeResumeModal}
          >
            <MotionDiv
              className="resume-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="resume-modal-title"
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="resume-modal-header">
                <span className="resume-modal-pill">Career Snapshot</span>
                <h2 id="resume-modal-title">Resume & Case Studies</h2>
                <p className="resume-modal-description">
                  Explore my experience in detail or grab the latest copy instantly.
                </p>
              </div>
              <div className="resume-modal-actions">
                <a
                  href={resumeLink}
                  download
                  className="btn"
                  ref={resumeDownloadRef}
                >
                  Download Resume
                </a>
                <a
                  href={resumeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn outline"
                >
                  Live View
                </a>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={closeResumeModal}
                aria-label="Close resume modal"
              >
                Close
              </button>
            </MotionDiv>
          </MotionDiv>
        )}
      </AnimatePresence>
    </section>
  );
}

export default memo(Hero);