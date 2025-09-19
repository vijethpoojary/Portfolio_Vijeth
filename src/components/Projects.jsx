import { motion } from 'framer-motion'

export default function Projects() {
  const projects = [
    { name: 'ShopSwift – E-commerce Website', desc: 'Full-featured online shopping platform with user authentication, cart, admin panel, and multi-step checkout.', tools: 'React.js, Node.js, Express.js, MongoDB, CSS, Thunder Client', live: '#', github: '#' },
    { name: 'Real-Time Log Monitoring Dashboard', desc: 'Student Activity Monitoring System for real-time tracking, ethical data collection, and admin support.', tools: 'Python Flask, MongoDB, HTML, CSS', live: '#', github: '#' },
    { name: 'Panchayat-Raj Water Billing System', desc: 'Simplifies water bill payments & complaint registration for rural residents, promoting transparency.', tools: 'HTML, CSS, JavaScript, PHP, MySQL, XAMPP', live: '#', github: '#' },
    { name: 'Cloud & DevOps Projects', desc: 'Auto Scaling, VPC, CI/CD pipelines with AWS, Jenkins, Docker, Kubernetes.', tools: 'AWS, Jenkins, Docker, Kubernetes', live: '#', github: '#' },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }
  const card = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

  return (
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
                <a className="btn small pulse" href={p.live} target="_blank">Live</a>
                <a className="btn small outline pulse" href={p.github} target="_blank">GitHub</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
