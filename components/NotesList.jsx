'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { formatDate } from '../lib/format'
import Reveal from './Reveal'

// Halaman ini tetap client component karena ada search + filter kategori.
// Bedanya dengan versi Vite: daftar notes TIDAK di-import dari lib/notes
// (file itu memakai node:fs dan tidak bisa jalan di browser). Data dikirim
// sebagai prop dari Server Component app/notes/page.jsx.
//
// Warna kategori (merah/cyan/indigo/emerald) dibuang: itu empat aksen
// tambahan, sementara seluruh situs hanya memakai satu.
function NotesList({ notes, categories }) {
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
  }, [notes, query, activeCategory])

  return (
    <section className="mx-auto max-w-[1120px] px-5 pb-28 pt-32 md:px-8">
      <Reveal>
        <p className="t-label text-outline">Notes</p>
        <h1 className="t-h1 mt-4 text-on-surface">Notes &amp; knowledge</h1>
        <p className="t-body measure mt-5 text-on-surface-variant">
          A collection of issues, tips &amp; tricks, and lessons I&apos;ve learned
          throughout my career as a mobile developer. Written as personal
          documentation in the spirit of Confluence.
        </p>
      </Reveal>

      {/* Pencarian + filter kategori */}
      <Reveal delay={100}>
        <div className="mt-12">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, description, or tag..."
            className="rule t-small w-full max-w-md border-b bg-transparent pb-2 text-on-surface outline-none transition-colors placeholder:text-outline focus:border-secondary"
          />
          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
            {['All', ...categories].map((cat) => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={
                    isActive
                      ? 't-small text-on-surface underline decoration-1 underline-offset-[6px]'
                      : 't-small text-on-surface-variant transition-colors hover:text-on-surface'
                  }
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>
      </Reveal>

      {/* Daftar notes — indeks editorial, bukan kartu */}
      <div className="mt-14">
        {filtered.length === 0 ? (
          <p className="t-small text-on-surface-variant">
            No matching notes found.
          </p>
        ) : (
          filtered.map((note, idx) => (
            <Reveal key={note.slug} delay={idx * 50}>
              <Link
                href={`/notes/${note.slug}`}
                className="rule group block border-t py-7"
              >
                <div className="flex items-baseline justify-between gap-6">
                  <h2 className="t-h3 text-on-surface transition-colors group-hover:text-secondary">
                    {note.title}
                  </h2>
                  <span className="t-label tabular shrink-0 text-outline">
                    {formatDate(note.date)}
                  </span>
                </div>
                <p className="t-small measure mt-2 text-on-surface-variant">
                  {note.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
                  <span className="t-label text-outline">{note.category}</span>
                  {note.tags.map((tag) => (
                    <span key={tag} className="t-label text-outline">
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            </Reveal>
          ))
        )}
      </div>
    </section>
  )
}

export default NotesList
