// SERVER-ONLY. File ini membaca filesystem lewat `node:fs`, jadi hanya boleh
// di-import dari Server Component (page/layout) — bukan dari komponen 'use client'.
//
// Di versi Vite, file ini memakai `import.meta.glob` yang dievaluasi saat build
// dan hasilnya ikut ter-bundle ke client. Di Next.js kita baca langsung dari disk:
// modul ini dieksekusi HANYA di server, dan client tidak pernah menerima
// react-markdown + highlight.js.
import fs from 'node:fs'
import path from 'node:path'

const CONTENT_DIR = path.join(process.cwd(), 'content')

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

// Sinkron dan dijalankan sekali saat modul pertama kali dibaca server.
// Jumlah artikel masih kecil, jadi tidak perlu cache tambahan.
function readNotesFromDisk() {
  if (!fs.existsSync(CONTENT_DIR)) return []

  const all = []
  const dirs = fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())

  for (const dir of dirs) {
    const dirPath = path.join(CONTENT_DIR, dir.name)
    for (const file of fs.readdirSync(dirPath)) {
      if (!file.endsWith('.md')) continue

      const slug = file.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(dirPath, file), 'utf8')
      const { meta, body } = parseFrontmatter(raw)

      all.push({
        slug,
        // meta.category menang; nama folder jadi fallback (content/issues/ → "issues")
        category: meta.category || dir.name,
        title: meta.title || slug,
        date: meta.date || '',
        tags: meta.tags || [],
        description: meta.description || '',
        body,
      })
    }
  }

  return all
}

export const notes = readNotesFromDisk()

export function getNoteBySlug(slug) {
  return notes.find((n) => n.slug === slug)
}

export const categories = [...new Set(notes.map((n) => n.category))]
