import Link from 'next/link'

// Di Vite, route tak dikenal jatuh ke <Route path="*"> dan diam-diam
// menampilkan Home. Di Next, notFound() (dipanggil page notes/[slug]) berakhir
// di sini, dan static export menghasilkan out/404.html.
export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-3xl flex-col items-start px-5 pb-32 pt-40 md:px-8">
      <p className="font-mono text-sm text-secondary">&gt; 404</p>
      <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-primary">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-3 text-base text-on-surface-variant">
        Link yang kamu buka tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-8 rounded bg-primary px-4 py-2 font-mono text-xs font-medium text-on-primary transition-opacity hover:opacity-90"
      >
        ← Balik ke home
      </Link>
    </section>
  )
}
