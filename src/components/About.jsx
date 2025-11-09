import { motion } from 'framer-motion'
import { memo } from 'react'

const MotionCard = motion.div

function About() {
  return (
    <section className="section" id="about">
      <div className="container grid" style={{ gridTemplateColumns: '1fr', gap: 20 }}>
        <MotionCard
          className="card glow"
          style={{ padding: 24, willChange: 'opacity, transform' }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="section-title">About Me</h2>
          <p>
            I am a passionate software developer skilled in building full-stack applications and cloud-native solutions.
            My expertise spans MERN stack development, Python Full Stack, automation of CI/CD pipelines, Cloud Automation and deploying scalable systems on AWS.
            I enjoy solving complex problems, optimizing workflows, and creating impactful projects that bridge software
            engineering and DevOps practices.
          </p>
        </MotionCard>
      </div>
    </section>
  )
}

export default memo(About)
