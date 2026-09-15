import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'
import { formatDate } from '../../../lib/format'
import { getNoteBySlug, notes } from '../../../lib/notes'

// Static export: Next memanggil ini saat build dan membuat SATU HTML per slug
// (out/notes/fix-memory-leak-ios/index.html). Di Vite, /notes/:slug tidak punya
// HTML sendiri — semuanya dilayani satu index.html dan di-render di browser.
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}

// Ini yang tidak mungkin dilakukan Vite SPA: judul + deskripsi berbeda per
// artikel, dirender ke <head> sejak HTML pertama. Preview share ke
// LinkedIn/X/WhatsApp baru bisa benar dengan cara ini.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const note = getNoteBySlug(slug)
  if (!note) return { title: 'Note not found — Nur Hasan' }

  return {
    title: `${note.title} — Nur Hasan`,
    description: note.description,
    openGraph: {
      title: note.title,
      description: note.description,
      type: 'article',
      publishedTime: note.date || undefined,
      tags: note.tags,
    },
  }
}

export default async function NoteDetailPage({ params }) {
  const { slug } = await params
  const note = getNoteBySlug(slug)

  // Di Vite: <Navigate to="/notes" replace />. Di Next: notFound() → app/not-found.jsx
  if (!note) notFound()

  return (
    <section className="mx-auto max-w-3xl px-5 pb-28 pt-32 md:px-8">
      <Link
        href="/notes"
        className="t-small text-on-surface-variant transition-colors hover:text-on-surface"
      >
        ← Back to notes
      </Link>

      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-1">
        <span className="t-label text-outline">{note.category}</span>
        <span className="t-label tabular text-outline">
          {formatDate(note.date)}
        </span>
        {note.tags.map((tag) => (
          <span key={tag} className="t-label text-outline">
            #{tag}
          </span>
        ))}
      </div>

      <h1 className="t-h1 mt-5 text-on-surface">{note.title}</h1>

      {/* react-markdown + highlight.js jalan di SERVER di sini. Di versi Vite,
          keduanya masuk bundle client walaupun isi markdown sudah diketahui
          saat build. */}
      <article className="markdown-body mt-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {note.body}
        </ReactMarkdown>
      </article>
    </section>
  )
}
