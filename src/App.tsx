import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Experience from './components/Experience'
import Education from './components/Education'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <main className="bg-white dark:bg-black min-h-screen overflow-x-hidden">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Experience />
      <Education />
      <Skills />
      <Contact />
      <Footer />
    </main>
  )
}
