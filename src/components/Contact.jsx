import { motion } from 'framer-motion'

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="grid" style={{ gridTemplateColumns: '1.2fr 1fr' }}>
          <motion.form className="card contact-form" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-10% 0px' }}>
            <div className="field">
              <label>Name</label>
              <input placeholder="Your name" />
            </div>
            <div className="field">
              <label>Email</label>
              <input placeholder="you@example.com" />
            </div>
            <div className="field">
              <label>Message</label>
              <textarea rows={5} placeholder="Say hello..." />
            </div>
            <button type="button" className="btn pulse">Send Message</button>
          </motion.form>
          <motion.div className="card contact-side" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <ul className="contact-list floating-icons">
              <li><span>✉️</span> <a href="mailto:vijethpoojary@example.com">vijethpoojary@example.com</a></li>
              <li><span>📞</span> <a href="tel:+91XXXXXXXXXX">+91-XXXXXXXXXX</a></li>
              <li><span>💼</span> <a target="_blank" href="https://linkedin.com/in/vijethpoojary">linkedin.com/in/vijethpoojary</a></li>
              <li><span>🐙</span> <a target="_blank" href="https://github.com/vijethpoojary">github.com/vijethpoojary</a></li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
