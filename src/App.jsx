import { BrowserRouter } from 'react-router-dom'
import './App.css'

import ThreeBackground from './components/ThreeBackground'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <ThreeBackground />
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <footer className="footer">© {new Date().getFullYear()} Vijeth Poojary</footer>
      </div>
    </BrowserRouter>
  )
}
