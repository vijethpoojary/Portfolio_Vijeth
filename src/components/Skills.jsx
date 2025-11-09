import { motion, useReducedMotion } from 'framer-motion'
import { useRef, useEffect, memo, useMemo } from 'react'

const MotionGrid = motion.div
const MotionCard = motion.div

function useTilt() {
  const ref = useRef(null)
  const rafId = useRef(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion) {
      el.style.transform = ''
      return undefined
    }

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
    
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [prefersReducedMotion])
  return ref
}

function Skills() {
  const skillGroups = useMemo(
    () => [
      { title: 'Programming Languages', items: ['C', 'Java', 'Python', 'JavaScript'] },
      { title: 'Web Development', items: ['HTML', 'CSS', 'React.js', 'Node.js', 'Express.js', 'Flask', 'Next.js'] },
      { title: 'Databases', items: ['MongoDB', 'MySQL', 'SQL Server'] },
      { title: 'Cloud Platforms', items: ['AWS (EC2, VPC, IAM, S3, CloudWatch, CloudTrail, RDS, EFS, DynamoDB, CloudFront, Route 53)'] },
      { title: 'DevOps & Tools', items: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Git', 'Prometheus', 'Grafana'] },
      { title: 'Operating Systems', items: ['Linux (Ubuntu)', 'Windows'] },
      { title: 'Cloud Automation', items: ['Powershell', 'Shell Scripting'] },
    ],
    [],
  )

  const containerVariants = useMemo(
    () => ({ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }),
    [],
  )
  const cardVariants = useMemo(
    () => ({ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }),
    [],
  )

  return (
    <section className="section" id="skills">
      <div className="container">
        <h2 className="section-title">Skills</h2>
        <MotionGrid
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          {skillGroups.map((group) => (
            <SkillCard key={group.title} group={group} variants={cardVariants} />
          ))}
        </MotionGrid>
      </div>
    </section>
  )
}

const SkillCard = memo(function SkillCard({ group, variants }) {
  const ref = useTilt()

  return (
    <MotionCard
      ref={ref}
      className="card skill-card"
      variants={variants}
      whileHover={{ scale: 1.02 }}
    >
      <div className="skill-title">{group.title}</div>
      <ul>
        {group.items.map((item) => {
          const isPresent = item.includes('-present')
          const displayText = isPresent ? item.replace('-present', '').trim() : item

          return (
            <li
              key={item}
              className={`skill-li ${isPresent ? 'skill-present' : ''}`}
              title={isPresent ? 'Currently using at GISUL' : ''}
            >
              <span className="skill-dot" />
              <span className="skill-text">{displayText}</span>
              {isPresent && <span className="present-badge">● Present</span>}
            </li>
          )
        })}
      </ul>
    </MotionCard>
  )
})

export default memo(Skills)
