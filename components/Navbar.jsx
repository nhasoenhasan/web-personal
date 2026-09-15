'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

const links = [
  { label: 'Home', href: '/#home', id: 'home' },
  { label: 'Experience', href: '/#experience', id: 'experience' },
  { label: 'Skills', href: '/#skills', id: 'skills' },
  { label: 'Notes', href: '/notes', id: 'notes', route: true },
  { label: 'Contact', href: '/#contact', id: 'contact' },
]

function Navbar() {
  const [scrollActive, setScrollActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()
  const isNotesRoute = pathname.startsWith('/notes')

  // Diturunkan saat render, bukan di-set lewat effect. Sebelumnya ada
  // setActive('notes') di dalam useEffect — itu memicu render berantai
  // (peringatan lint react/set-state-in-effect).
  const active = isNotesRoute ? 'notes' : scrollActive

  useEffect(() => {
    // Di halaman /notes tidak ada scroll spy: nilainya sudah diturunkan di atas.
    if (isNotesRoute) return

    const sections = links
      .filter((l) => !l.route)
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const onScroll = () => {
      const pos = window.scrollY + 120
      let current = 'home'
      for (const section of sections) {
        if (section.offsetTop <= pos) current = section.id
      }
      // Kalau sudah di dasar halaman, aktifkan section terakhir
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = sections[sections.length - 1]?.id ?? current
      }
      setScrollActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isNotesRoute, pathname])

  return (
    <nav className="rule fixed top-0 z-50 w-full border-b bg-surface/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <Link href="/" className="t-small text-on-surface">
          Nur Hasan
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = active === link.id
            // Aktif ditandai warna + garis bawah 1px. Bukan perubahan bobot
            // font, karena itu menggeser lebar elemen di sekitarnya.
            const cls = isActive
              ? 't-small text-on-surface underline decoration-1 underline-offset-[6px]'
              : 't-small text-on-surface-variant transition-colors hover:text-on-surface'
            return (
              <Link key={link.id} href={link.href} className={cls}>
                {link.label}
              </Link>
            )
          })}
          <Link
            href="/#contact"
            className="t-small bg-primary px-3.5 py-2 text-on-primary transition-opacity hover:opacity-85"
          >
            Resume
          </Link>
          <ThemeToggle />
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-on-surface md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 7h16M4 12h16M4 17h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="rule border-t bg-surface md:hidden">
          <div className="flex flex-col px-5 py-3">
            {links.map((link) => {
              const isActive = active === link.id
              const cls = isActive
                ? 't-small text-on-surface'
                : 't-small text-on-surface-variant transition-colors hover:text-on-surface'
              return (
                <Link
                  key={link.id}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-3 ${cls}`}
                >
                  {link.label}
                </Link>
              )
            })}
            <Link
              href="/#contact"
              onClick={() => setMenuOpen(false)}
              className="t-small mt-3 bg-primary px-3.5 py-3 text-center text-on-primary"
            >
              Resume
            </Link>
            <div className="mt-3 flex justify-end">
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
