import { motion } from 'framer-motion'
import { memo, useMemo } from 'react'

const MotionItem = motion.div

function Experience() {
  const roles = useMemo(() => [
    {
      role: 'Associate Software Engineer',
      company: 'Gisul',
      period: 'Started in January 2026, Bangalore, Karnataka',
     bullets: [
  'Developing scalable web applications using Python FastAPI and Next.js with a strong focus on performance and reliability.',
  'Deploying and managing applications using Docker, Kubernetes clusters, and CI/CD pipelines implemented with GitHub Actions.',
  'Working with microservices architecture and automating cloud services using PowerShell scripts while adopting modern DevOps practices.',
]

    },
    {
      role: 'Software Engineer Trainee',
      company: 'Gisul ',
      period: 'October 2025 - December 2025, Bangalore, Karnataka',
      bullets: [
        'Contributing to the design and development of scalable web applications with a focus on performance and user experience.',
        'Collaborating across teams to build and integrate backend and frontend systems for seamless functionality.',
        'Automating Cloud Services And Actively involved in researching and adopting modern development and automation practices to drive project success.',
      ]
    },
    
     {
      role: 'Cloud & DevOps Intern',
      company: 'MicroDegree',
      period: 'Jun 2025 – September 2025, Mangalore, Karnataka',
      bullets: [
        'Worked on AWS services including EC2, VPC, IAM, S3, RDS, CloudWatch, and Route53.',
        'Implemented CI/CD pipelines with Jenkins and automated deployments using Docker & Kubernetes.',
        'Provisioned cloud infrastructure using Terraform and monitored systems with Prometheus & Grafana.',
      ]
    },
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
  ], [])

  return (
    <section className="section" id="experience">
      <div className="container">
        <h2 className="section-title">Experience</h2>
        <div className="timeline">
          {roles.map((r, idx) => (
            <MotionItem
              key={`${r.role}-${r.company}-${idx}`}
              className={`timeline-item card ${r.company.toLowerCase() === 'gisul' ? 'timeline-present' : ''}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-10% 0px' }}
              transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ scale: 1.01, boxShadow: '0 24px 60px rgba(59,130,246,0.18)' }}
              style={{ willChange: 'transform, opacity' }}
            >
              <div className={`timeline-dot ${r.company.toLowerCase() === 'gisul' ? 'timeline-dot-present' : ''}`} />
              <div className="timeline-content">
                <div className="timeline-title">
                  {r.role} – {r.company}
                  {r.company.toLowerCase() === 'gisul' && (
                    <span className="experience-present-badge">● Present Working Company</span>
                  )}
                </div>
                <div className="timeline-period">{r.period}</div>
                <ul>
                  {r.bullets.map((b, i) => (
                    <li key={`${r.role}-${idx}-bullet-${i}`}>{b}</li> 
                  ))}
                </ul>
              </div>
            </MotionItem>
          ))}
        </div>
      </div>
    </section>
  )
}

export default memo(Experience)
