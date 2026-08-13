import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Contact from './components/Contact'
import Footer from './components/Footer'
import Loader from './components/Loader'
import NotesList from './pages/NotesList'
import NoteDetail from './pages/NoteDetail'

function Home() {
  return (
    <main className="pb-32">
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}

function ScrollHandler() {
  const location = useLocation()

  useEffect(() => {
    // Kalau ada hash (#experience dst), scroll ke elemen itu setelah route mount
    if (location.hash) {
      const id = location.hash.slice(1)
      const el = document.getElementById(id)
      if (el) {
        // Beri sedikit waktu agar halaman selesai render
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
        return
      }
    }
    // Tanpa hash: scroll ke atas
    window.scrollTo(0, 0)
  }, [location.pathname, location.hash])

  return null
}

function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="min-h-screen">
      {loading && <Loader onDone={() => setLoading(false)} />}
      <ScrollHandler />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/:slug" element={<NoteDetail />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
