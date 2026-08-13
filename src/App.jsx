import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <Navbar />
      <main className="pb-32">
        <Hero />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
