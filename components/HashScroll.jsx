'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Pengganti <ScrollHandler> dari App.jsx versi Vite.
//
// Bedanya: di Next, scroll-to-top saat pindah route sudah ditangani framework,
// jadi komponen ini hanya perlu mengurus hash (#experience, #skills, ...).
// `usePathname` dipakai sebagai dependency supaya hash ikut diproses setelah
// navigasi dari /notes ke /#skills.
export default function HashScroll() {
  const pathname = usePathname()

  useEffect(() => {
    const scrollToHash = () => {
      const hash = window.location.hash
      if (!hash) return

      const el = document.getElementById(hash.slice(1))
      if (!el) return

      // Sedikit delay: elemen #experience baru ada setelah home ter-render
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 50)
    }

    scrollToHash()
    window.addEventListener('hashchange', scrollToHash)
    return () => window.removeEventListener('hashchange', scrollToHash)
  }, [pathname])

  return null
}
