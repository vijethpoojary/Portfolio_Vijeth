import { motion, AnimatePresence } from 'framer-motion'
import { memo, useMemo, useCallback, useState } from 'react'

function Projects() {
  const [showModal, setShowModal] = useState(false)
  const [projectName, setProjectName] = useState('')

  const projects = useMemo(() => [
    { name: 'ShopSwift – E-commerce Website', desc: 'Full-featured online shopping platform with user authentication, cart, admin panel, and multi-step checkout.', tools: 'React.js, Node.js, Express.js, MongoDB, CSS, Thunder Client', live: '#', github: 'https://github.com/vijethpoojary/ShopSwift-Ecommerce-MERN-.git' },
    { name: 'Real-Time Log Monitoring Dashboard', desc: 'Student Activity Monitoring System for real-time tracking, ethical data collection, and admin support.', tools: 'Python Flask, MongoDB, HTML, CSS', live: '#', github: 'https://github.com/vijethpoojary/Real-Log-Monitoring-Updated.git' },
    { name: 'Panchayat-Raj Water Billing System', desc: 'Simplifies water bill payments & complaint registration for rural residents, promoting transparency.', tools: 'HTML, CSS, JavaScript, PHP, MySQL, XAMPP', live: '#', github: 'https://github.com/vijethpoojary/Panchayath-raj-water-billing-system.git' },
    { name: 'Cloud & DevOps Projects', desc: 'Auto Scaling, VPC, CI/CD pipelines with AWS, Jenkins, Docker, Kubernetes.', tools: 'AWS, Jenkins, Docker, Kubernetes', live: '#', github: 'https://github.com/vijethpoojary/Hello-Health.git' },
  ], [])

  const handleLiveClick = useCallback((e, liveUrl, name) => {
    if (!liveUrl || liveUrl === '#' || liveUrl.trim() === '') {
      e.preventDefault()
      setProjectName(name)
      setShowModal(true)
    }
  }, [])

  const closeModal = useCallback(() => {
    setShowModal(false)
    setProjectName('')
  }, [])

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
    <>
      <section className="section" id="projects">
        <div className="container">
          <h2 className="section-title">Projects</h2>
          <motion.div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }} variants={container} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-10% 0px' }}>
            {projects.map(p => (
              <motion.div key={p.name} className="card project-card" variants={card} whileHover={{ scale: 1.02, rotateX: 1.5, rotateY: -1.5 }} style={{ transformStyle: 'preserve-3d' }}>
                <div className="project-header">
                  <div className="project-title">{p.name}</div>
                  <div className="project-tools">{p.tools}</div>
                </div>
                <p className="project-desc">{p.desc}</p>
                <div className="project-links">
                  <a 
                    className="btn small pulse" 
                    href={p.live} 
                    target="_blank"
                    onClick={(e) => handleLiveClick(e, p.live, p.name)}
                  >
                    Live
                  </a>
                  <a className="btn small outline pulse" href={p.github} target="_blank">GitHub</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Modal for projects not live */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div
              className="modal-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.7)',
                backdropFilter: 'blur(4px)',
                zIndex: 9998,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            />
            <motion.div
              className="modal-content"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              style={{
                position: 'fixed',
                top: '40%', // ⬆️ ADJUST THIS: Lower value = higher position (30% = very high, 50% = center, 60% = lower)
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: 'linear-gradient(180deg, rgba(20, 20, 41, 0.98), rgba(15, 15, 35, 0.98))',
                border: '1px solid rgba(59, 130, 246, 0.3)',
                borderRadius: '16px',
                padding: '32px',
                maxWidth: '500px',
                width: '90%',
                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(59, 130, 246, 0.2)',
                zIndex: 9999,
                textAlign: 'center',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.1, type: 'spring' }}
                style={{
                  fontSize: '48px',
                  marginBottom: '16px',
                }}
              >
                🚧
              </motion.div>
              <h3 style={{ 
                margin: '0 0 12px 0', 
                fontSize: '24px',
                background: 'linear-gradient(90deg, #00f5ff, #3b82f6, #9333ea)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                Project Not Live
              </h3>
              <p style={{ 
                margin: '0 0 24px 0', 
                color: '#a0a0c0',
                fontSize: '16px',
                lineHeight: '1.6',
              }}>
                The project <strong style={{ color: '#e8e8ff' }}>"{projectName}"</strong> is not live yet.
                <br />
                Please check back later!
              </p>
              <button
                onClick={closeModal}
                className="btn"
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
              >
                Got it
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default memo(Projects)
