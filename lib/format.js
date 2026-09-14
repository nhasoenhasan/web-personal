// Utility murni (tanpa node:fs), jadi aman dipakai di Server Component MAUPUN
// Client Component. Ini alasan file ini dipisah dari lib/notes.js: kalau
// formatDate tetap di lib/notes.js, komponen 'use client' mana pun yang
// meng-import-nya akan menyeret `node:fs` ke bundle browser dan build gagal.
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
