'use client'

import { useCallback, useSyncExternalStore } from 'react'

// ⚠️ Catatan migrasi (versi Vite berbeda):
// Versi sebelumnya memakai `useState(getInitialTheme)` + useEffect. Di Vite itu
// aman karena tidak ada SSR — komponen hanya pernah render di browser.
// Di Next, halaman dirender di server dulu: saat itu `window` tidak ada sehingga
// tema dianggap 'light', padahal browser user prefer dark → React mendeteksi
// hydration mismatch (atribut aria-label/title/ikon berbeda antara HTML server
// dan hasil render client).
//
// Solusinya: jangan simpan tema sebagai state lokal yang dihitung ulang di dua
// tempat. Sumber kebenaran tunggalnya adalah class `.dark` di <html> — yang
// sudah dipasang dengan benar oleh script inline di app/layout.jsx SEBELUM
// paint. Komponen ini hanya "membaca" DOM itu, bukan menyimpulkan ulang.
//
// useSyncExternalStore adalah API React yang memang dibuat untuk kasus ini:
// ada snapshot khusus server, jadi hydration tidak pernah mismatch.

function subscribe(onStoreChange) {
  const observer = new MutationObserver(onStoreChange)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class'],
  })
  return () => observer.disconnect()
}

const getSnapshot = () =>
  document.documentElement.classList.contains('dark') ? 'dark' : 'light'

// Dipakai saat SSR dan saat hydration — harus cocok dengan <html> default dari
// server (script inline menambahkan .dark SETELAH HTML ini terkirim, jadi React
// sengaja memakai 'light' di sini, lalu langsung re-render dengan nilai asli).
const getServerSnapshot = () => 'light'

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const toggleTheme = useCallback(() => {
    const next = getSnapshot() === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
  }, [])

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-8 w-8 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container hover:text-primary"
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
    >
      {theme === 'dark' ? (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.36 6.36l-.71-.71M6.35 6.35l-.71-.71m12.72 0l-.71.71M6.35 17.65l-.71.71M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.35 15.35A8.5 8.5 0 118.65 3.65 7 7 0 0020.35 15.35z"
          />
        </svg>
      )}
    </button>
  )
}

export default ThemeToggle
