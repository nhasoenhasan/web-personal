import { useEffect, useState } from 'react'

const links = [
  { label: 'Home', href: '#home', id: 'home' },
  { label: 'Experience', href: '#experience', id: 'experience' },
  { label: 'Skills', href: '#skills', id: 'skills' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

function Navbar() {
  const [active, setActive] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)

    const onScroll = () => {
      const pos = window.scrollY + 120
      let current = 'home'
      for (const section of sections) {
        if (section.offsetTop <= pos) current = section.id
      }
      // Jika sudah di paling bawah, aktifkan section terakhir
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 4) {
        current = sections[sections.length - 1]?.id ?? current
      }
      setActive(current)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between px-5 md:px-8">
        <a href="#home" className="flex items-center gap-2">
          <span className="font-display text-lg font-bold tracking-tight text-primary">
            Nur Hasan
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={`text-sm transition-colors ${
                active === link.id
                  ? 'font-semibold text-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded bg-primary px-4 py-2 font-mono text-xs font-medium text-on-primary transition-opacity hover:opacity-90"
          >
            Resume
          </a>
        </div>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="text-primary md:hidden"
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-outline-variant/30 bg-surface md:hidden">
          <div className="flex flex-col px-5 py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded px-3 py-3 text-sm transition-colors ${
                  active === link.id
                    ? 'bg-surface-container font-semibold text-primary'
                    : 'text-on-surface-variant hover:bg-surface-container hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-2 rounded bg-primary px-3 py-3 text-center font-mono text-xs font-medium text-on-primary transition-opacity hover:opacity-90"
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
