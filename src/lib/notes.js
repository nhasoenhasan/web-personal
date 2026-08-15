// Load all markdown notes from the content/ folder (auto-detected by Vite)
const modules = import.meta.glob('../../content/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/)
  if (!match) return { meta: {}, body: raw }

  const meta = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    const value = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    if (key === 'tags') {
      meta[key] = value
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map((t) => t.trim().replace(/^["']|["']$/g, ''))
    } else {
      meta[key] = value
    }
  }
  return { meta, body: match[2] }
}

export const notes = Object.entries(modules).map(([path, raw]) => {
  const { meta, body } = parseFrontmatter(raw)
  // path: ../../content/issues/fix-memory-leak-ios.md
  const slug = path.split('/').pop().replace(/\.md$/, '')
  const categoryDir = path.split('/').slice(-2)[0]
  return {
    slug,
    category: meta.category || categoryDir,
    title: meta.title || slug,
    date: meta.date || '',
    tags: meta.tags || [],
    description: meta.description || '',
    body,
  }
})

export function getNoteBySlug(slug) {
  return notes.find((n) => n.slug === slug)
}

export const categories = [...new Set(notes.map((n) => n.category))]

export function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  if (Number.isNaN(d.getTime())) return dateStr
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}
