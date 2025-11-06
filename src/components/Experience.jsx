import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

function Experience() {
  const roles = useMemo(() => [
    {
      role: 'Software Developer Intern',
      company: 'Dregal I Pvt. Ltd',
      period: 'Feb 2025 – May 2025, Mangalore, Karnataka',
      bullets: [
        'Built MERN eCommerce app with APIs & MongoDB integration.',
        'Tested/debugged routes with Postman & Thunder Client.',
        'Collaborated in developing frontend UI and backend logic.',
      ]
    },
    {
      role: 'Cloud & DevOps Intern',
      company: 'Dregal I Pvt. Ltd',
      period: 'Jun 2024 – Aug 2024, Mangalore, Karnataka',
      bullets: [
        'Worked on AWS services including EC2, VPC, IAM, S3, RDS, CloudWatch, and Route53.',
        'Implemented CI/CD pipelines with Jenkins and automated deployments using Docker & Kubernetes.',
        'Provisioned cloud infrastructure using Terraform and monitored systems with Prometheus & Grafana.',
      ]
    }
  ], [])

  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {roles.map((r, idx) => (
            <motion.div
              key={`${r.role}-${r.company}-${idx}`}   // ✅ unique key
              className="timeline-item card"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(59,130,246,0.18)' }}
            >
              <div className="timeline-dot" />
              <div className="timeline-content">
                <div className="timeline-title">{r.role} – {r.company}</div>
                <div className="timeline-period">{r.period}</div>
                <ul>
                  {r.bullets.map((b, i) => (
                    <li key={`${r.role}-${idx}-bullet-${i}`}>{b}</li> 
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Experience)
