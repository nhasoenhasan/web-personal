import 'highlight.js/styles/github-dark.css'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
import Script from 'next/script'
import Footer from '../components/Footer'
import HashScroll from '../components/HashScroll'
import IntroLoader from '../components/IntroLoader'
import Navbar from '../components/Navbar'

// Vite: 3 <link> ke fonts.googleapis.com di index.html (2 request tambahan + FOUT).
// Next: font di-download saat build, di-self-host, dan di-inject sebagai CSS variable.
//
// Dua keluarga, bukan tiga. Hanken Grotesk dibuang: hierarki dibangun dari
// ukuran + bobot + ruang, bukan dari menambah keluarga font. Inter dipakai
// untuk display MAUPUN body (--font-display mengarah ke Inter), karena
// watak neo-grotesque-nya justru yang diinginkan di ukuran besar.
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

// Di Vite, metadata ini ada di index.html dan berlaku untuk SEMUA route.
// Di Next, layout = default-nya, dan tiap page bisa menimpanya (lihat notes/[slug]).
export const metadata = {
  title: 'Nur Hasan — Frontend Engineer',
  description:
    'Nur Hasan — Frontend Engineer. Building production web and mobile applications with React, Next.js, TypeScript, and Tailwind CSS.',
  icons: { icon: '/favicon.svg?v=2' },
  openGraph: {
    title: 'Nur Hasan — Frontend Engineer',
    description:
      'Building production web and mobile applications with React, Next.js, TypeScript, and Tailwind CSS.',
    type: 'website',
  },
}

// Script ini HARUS jalan sebelum paint pertama, jadi tetap inline seperti
// di index.html versi Vite. Kalau tidak, tema gelap akan berkedip saat load.
const themeScript = `
;(function () {
  try {
    var stored = localStorage.getItem('theme')
    var dark =
      stored === 'dark' ||
      (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)
    if (dark) document.documentElement.classList.add('dark')
  } catch (e) {}
})()
`

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen">
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <IntroLoader />
        <HashScroll />
        <Navbar />
        {children}
        <Footer />
        <Script
          defer
          src="https://analytics.nhasan.tech/script.js"
          data-website-id="91ec55bc-609f-482d-8139-b8d0cc293b76"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
