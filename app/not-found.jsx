import Link from 'next/link'

// Di Vite, route tak dikenal jatuh ke <Route path="*"> dan diam-diam
// menampilkan Home. Di Next, notFound() (dipanggil page notes/[slug]) berakhir
// di sini, dan static export menghasilkan out/404.html.
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1120px] flex-col items-start px-5 pb-28 pt-36 md:px-8">
      <p className="t-label text-outline">Error 404</p>
      <h1 className="t-h1 mt-4 text-on-surface">Halaman tidak ditemukan</h1>
      <p className="t-body measure mt-5 text-on-surface-variant">
        Link yang kamu buka tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="t-small mt-10 bg-primary px-3.5 py-2 text-on-primary transition-opacity hover:opacity-85"
      >
        ← Balik ke home
      </Link>
    </section>
  )
}
