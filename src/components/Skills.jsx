import { motion } from 'framer-motion'
import { useRef, useEffect, memo } from 'react'

function useTilt() {
  const ref = useRef(null)
  const rafId = useRef(null)
  
  useEffect(() => {
    const el = ref.current
    if (!el) return
    
    const onMove = (e) => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
      
      rafId.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width
        const py = (e.clientY - rect.top) / rect.height
        const rx = (py - 0.5) * -10
        const ry = (px - 0.5) * 10
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-2px)`
      })
    }
    
    const onLeave = () => {
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
        rafId.current = null
      }
      el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0)'
    }
    
    el.addEventListener('mousemove', onMove, { passive: true })
    el.addEventListener('mouseleave', onLeave)
    
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])
  return ref
}

function Skills() {
  const skillGroups = [
    { title: 'Programming Languages', items: ['C', 'Java', 'Python', 'JavaScript'] },
    { title: 'Web Development', items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'Flask'] },
    { title: 'Databases', items: ['MongoDB', 'MySQL', 'SQL Server'] },
    { title: 'Cloud Platforms', items: ['AWS (EC2, VPC, IAM, S3, CloudWatch, CloudTrail, RDS, EFS, DynamoDB, CloudFront, Route 53)'] },
    { title: 'DevOps & Tools', items: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Git', 'Prometheus', 'Grafana'] },
    { title: 'Operating Systems', items: ['Linux (Ubuntu)', 'Windows'] },
  ]

  const container = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } }
  const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <motion.div
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {skillGroups.map(group => {
            const ref = useTilt()
            return (
              <motion.div key={group.title} ref={ref} className="card skill-card" variants={item} whileHover={{ scale: 1.02 }}>
                <div className="skill-title">{group.title}</div>
                <ul>
                  {group.items.map(item => (
                    <li key={item} className="skill-li">
                      <span className="skill-dot" />
                      {item}
                      <span className="skill-progress" />
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

export default memo(Skills)
