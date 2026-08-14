import { Link, useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getNoteBySlug, formatDate } from '../lib/notes'
import 'highlight.js/styles/github-dark.css'

const categoryColors = {
  Issues: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300',
  'Tips & Tricks': 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300',
  'Career Lessons': 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300',
  Tutorials: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300',
}

function NoteDetail() {
  const { slug } = useParams()
  const note = getNoteBySlug(slug)

  if (!note) return <Navigate to="/notes" replace />

  return (
    <section className="mx-auto max-w-3xl px-5 pb-32 pt-28 md:px-8">
      <Link
        to="/notes"
        className="inline-flex items-center gap-1 font-mono text-sm text-on-surface-variant transition-colors hover:text-primary"
      >
        ← Back to notes
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <span
          className={`rounded-full px-3 py-1 font-mono text-xs ${
            categoryColors[note.category] || 'bg-surface-container text-on-surface'
          }`}
        >
          {note.category}
        </span>
        <span className="font-mono text-xs text-on-surface-variant">
          {formatDate(note.date)}
        </span>
        <span className="font-mono text-xs text-on-surface-variant">·</span>
        <div className="flex flex-wrap gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-surface-container px-2.5 py-0.5 font-mono text-xs text-on-surface"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-primary md:text-4xl">
        {note.title}
      </h1>

      <article className="prose-none mt-8 markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
          {note.body}
        </ReactMarkdown>
      </article>
    </section>
  )
}

export default NoteDetail
