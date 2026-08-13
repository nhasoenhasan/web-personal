import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { categories, notes, formatDate } from '../lib/notes'
import Reveal from '../components/Reveal'

const categoryColors = {
  Issues: 'bg-red-100 text-red-700',
  'Tips & Tricks': 'bg-cyan-100 text-cyan-700',
  'Career Lessons': 'bg-indigo-100 text-indigo-700',
  Tutorials: 'bg-emerald-100 text-emerald-700',
}

function NotesList() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = useMemo(() => {
    return notes
      .filter((n) => activeCategory === 'All' || n.category === activeCategory)
      .filter((n) => {
        if (!query) return true
        const q = query.toLowerCase()
        return (
          n.title.toLowerCase().includes(q) ||
          n.description.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
        )
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1))
  }, [query, activeCategory])

  return (
    <section className="mx-auto max-w-[1120px] px-5 pb-32 pt-28 md:px-8">
      <Reveal>
        <div className="mb-8">
          <p className="font-mono text-sm text-secondary">
            &gt; knowledge_base/
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-primary md:text-5xl">
            Notes & Knowledge
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-on-surface-variant">
            A collection of issues, tips & tricks, and lessons I've learned
            throughout my career as a mobile developer. Written as personal
            documentation in the spirit of Confluence.
          </p>
        </div>
      </Reveal>

      {/* Search + category filter */}
      <Reveal delay={100}>
        <div className="mb-10">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, description, or tag..."
            className="w-full max-w-md border-b border-outline bg-transparent py-2 font-mono text-sm text-primary outline-none transition-colors placeholder:text-on-surface-variant/60 focus:border-secondary"
          />
          <div className="mt-4 flex flex-wrap gap-2">
            {['All', ...categories].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-1.5 font-mono text-xs transition-colors ${
                  activeCategory === cat
                    ? 'bg-primary text-on-primary'
                    : 'bg-surface-container text-on-surface hover:bg-surface-variant'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Notes grid */}
      {filtered.length === 0 ? (
        <p className="font-mono text-sm text-on-surface-variant">
          No matching notes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {filtered.map((note, idx) => (
            <Reveal key={note.slug} delay={idx * 60}>
              <Link
                to={`/notes/${note.slug}`}
                className="group flex h-full flex-col rounded-lg border border-surface-variant bg-surface-container-lowest p-6 ambient-shadow"
              >
                <div className="mb-3 flex items-center gap-2">
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
                </div>
                <h2 className="font-display text-xl font-semibold text-primary transition-colors group-hover:text-secondary">
                  {note.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-on-surface-variant">
                  {note.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-surface-container px-2.5 py-0.5 font-mono text-xs text-on-surface"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      )}
    </section>
  )
}

export default NotesList
