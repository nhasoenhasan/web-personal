import Contact from '../components/Contact'
import Experience from '../components/Experience'
import Hero from '../components/Hero'
import Skills from '../components/Skills'

// Ini Server Component (tidak ada 'use client'): markup-nya dirender di server
// dan dikirim sebagai HTML jadi. Yang tetap interaktif adalah Reveal
// (IntersectionObserver) dan Navbar — keduanya client component.
export default function HomePage() {
  return (
    <main className="pb-32">
      <Hero />
      <Experience />
      <Skills />
      <Contact />
    </main>
  )
}
