import { useState, useRef, useCallback, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

const MotionGrid = motion.div
const MotionCard = motion.div
const MotionNotice = motion.div

export default function Projects() {
  const [cardMessage, setCardMessage] = useState({ id: null, text: null })
  const timeoutRef = useRef(null)

  const projects = useMemo(
    () => [
      {
        name: 'ShopSwift – E-commerce Website',
        desc: 'Full-featured online shopping platform with user authentication, cart, admin panel, and multi-step checkout.',
        tools: 'React.js, Node.js, Express.js, MongoDB, CSS, Thunder Client',
        live: '#',
        github: 'https://github.com/vijethpoojary/ShopSwift-Ecommerce-MERN-.git',
      },
      {
        name: 'Real-Time Log Monitoring Dashboard',
        desc: 'Student Activity Monitoring System for real-time tracking, ethical data collection, and admin support.',
        tools: 'Python Flask, MongoDB, HTML, CSS',
        live: '#',
        github: 'https://github.com/vijethpoojary/Real-Log-Monitoring-Updated.git',
      },
      {
        name: 'Panchayat-Raj Water Billing System',
        desc: 'Simplifies water bill payments & complaint registration for rural residents, promoting transparency.',
        tools: 'HTML, CSS, JavaScript, PHP, MySQL, XAMPP',
        live: '#',
        github: 'https://github.com/vijethpoojary/Panchayath-raj-water-billing-system.git',
      },
      {
        name: 'Cloud & DevOps Projects',
        desc: 'CI/CD Of Node.js Applicaion',
        tools: 'AWS App Runner, Node.js, Github Actions, AWS ECR, Docker',
        live: '#',
        github: 'https://github.com/vijethpoojary/Hello-Health.git',
      },
    ],
    [],
  )

  const showMessage = useCallback((projectId, text) => {
    setCardMessage({ id: projectId, text })
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => setCardMessage({ id: null, text: null }), 5000)
  }, [])

  const handleLiveClick = (e, project) => {
    if (project.live === '#' || !project.live || project.live.trim() === '') {
      e.preventDefault()
      showMessage(project.name, `Live demo is not available for "${project.name}" at the moment.`)
    }
  }

  const handleGithubClick = (e, project) => {
    if (project.github === '#' || !project.github || project.github.trim() === '') {
      e.preventDefault()
      showMessage(project.name, `GitHub repository is not available for "${project.name}" at the moment.`)
    }
  }

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="section" id="projects">
      <div className="container">
        <h2 className="section-title">Projects</h2>
        <MotionGrid
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {projects.map(p => (
            <MotionCard
              key={p.name}
              className="card project-card"
              variants={card}
              whileHover={{ scale: 1.02, rotateX: 1.5, rotateY: -1.5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              {cardMessage.id === p.name && cardMessage.text && (
                <MotionNotice
                  className="project-card-message"
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  role="status"
                  aria-live="polite"
                >
                  ⚠ {cardMessage.text}
                </MotionNotice>
              )}
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
                  rel="noopener noreferrer"
                  onClick={(e) => handleLiveClick(e, p)}
                >
                  Live
                </a>
                <a
                  className="btn small outline pulse"
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleGithubClick(e, p)}
                >
                  GitHub
                </a>
              </div>
            </MotionCard>
          ))}
        </MotionGrid>
      </div>
    </section>
  )
}
