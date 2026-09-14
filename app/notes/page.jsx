import NotesList from '../../components/NotesList'
import { categories, notes } from '../../lib/notes'

export const metadata = {
  title: 'Notes & Knowledge — Nur Hasan',
  description:
    "A collection of issues, tips & tricks, and lessons I've learned throughout my career as a mobile developer.",
}

export default function NotesPage() {
  // Server Component boleh baca filesystem langsung (lib/notes.js).
  // Yang dikirim ke client hanya field untuk kartu — `body` markdown penuh
  // tidak perlu ikut, supaya payload RSC tetap kecil.
  const cards = notes.map((note) => ({
    slug: note.slug,
    title: note.title,
    category: note.category,
    date: note.date,
    tags: note.tags,
    description: note.description,
  }))

  return <NotesList notes={cards} categories={categories} />
}
