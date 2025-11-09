import { motion } from 'framer-motion'
import { memo, useState, useCallback, useRef, useEffect } from 'react'

const MotionForm = motion.form
const MotionCard = motion.div
const MotionMessage = motion.div

function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const timeoutRef = useRef(null)

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const form = e.target
    const formData = new FormData(form)
    
    try {
      // Submit to FormSubmit via AJAX
      const response = await fetch('https://formsubmit.co/ajax/poojaryvijeth239@gmail.com', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setSubmitted(true)
        form.reset()
        // Clear any existing timeout
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        // Hide success message after 5 seconds
        timeoutRef.current = setTimeout(() => setSubmitted(false), 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Sorry, there was an error sending your message. Please try again or contact me directly via email.')
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return (
    <section className="section" id="contact">
      <div className="container">
        <h2 className="section-title">Contact</h2>
        <div className="grid contact-grid">
          <MotionForm 
            className="card contact-form" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ willChange: 'opacity, transform' }}
            onSubmit={handleSubmit}
          >
            {/* FormSubmit hidden inputs */}
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio" />
            <input type="hidden" name="_template" value="box" />
            
            <div className="field">
              <label htmlFor="name">Name</label>
              <input 
                id="name"
                type="text" 
                name="name" 
                placeholder="Your name" 
                required 
              />
            </div>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input 
                id="email"
                type="email" 
                name="email" 
                placeholder="you@example.com" 
                required 
              />
            </div>
            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea 
                id="message"
                name="message" 
                rows={5} 
                placeholder="Say hello..." 
                required
              />
            </div>
            {submitted && (
              <MotionMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                style={{
                  padding: '12px',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)',
                  borderRadius: '8px',
                  marginBottom: '16px',
                  color: '#00f5ff',
                  textAlign: 'center',
                  willChange: 'opacity, transform',
                }}
              >
                ✓ Message sent successfully! I'll get back to you soon.
              </MotionMessage>
            )}
            <button 
              type="submit" 
              className="btn pulse"
              disabled={isSubmitting}
              style={{
                opacity: isSubmitting ? 0.7 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
              }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </MotionForm>
          <MotionCard 
            className="card contact-side" 
            initial={{ opacity: 0, y: 24 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <ul className="contact-list floating-icons">
              <li>
                <span>✉️</span> 
                <a href="mailto:poojaryvijeth239@gmail.com">
                  poojaryvijeth239@gmail.com
                </a>
              </li>
              <li>
                <span>📞</span> 
                <a href="tel:+917795113205">
                  +91-7795113205
                </a>
              </li>
              <li>
                <span>💼</span> 
                <a target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/vijethpoojary">
                  linkedin.com/in/vijethpoojary
                </a>
              </li>
              <li>
                <span>🐙</span> 
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/vijethpoojary">
                  github.com/vijethpoojary
                </a>
              </li>
            </ul>
          </MotionCard>
        </div>
      </div>
    </section>
  )
}

export default memo(Contact)
