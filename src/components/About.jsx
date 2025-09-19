import { motion } from 'framer-motion'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container grid" style={{ gridTemplateColumns: '1fr', gap: 20 }}>
        <motion.div
          className="card glow"
          style={{ padding: 24 }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10% 0px' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <h2 className="section-title">About Me</h2>
          <p>
            I am a passionate software developer skilled in building full-stack applications and cloud-native solutions.
            My expertise spans MERN stack development, automation of CI/CD pipelines, and deploying scalable systems on AWS.
            I enjoy solving complex problems, optimizing workflows, and creating impactful projects that bridge software
            engineering and DevOps practices.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
