import { describe, it, expect } from 'vitest'
import {
  parseFrontmatter,
  notes,
  getNoteBySlug,
  categories,
  formatDate,
} from './notes'

describe('parseFrontmatter', () => {
  it('parses metadata and body correctly', () => {
    const raw = `---
title: "Test Note"
category: "Issues"
date: "2026-08-13"
tags: ["React Native", "iOS"]
description: "A test description"
---

# Body content
`
    const { meta, body } = parseFrontmatter(raw)

    expect(meta.title).toBe('Test Note')
    expect(meta.category).toBe('Issues')
    expect(meta.date).toBe('2026-08-13')
    expect(meta.tags).toEqual(['React Native', 'iOS'])
    expect(meta.description).toBe('A test description')
    expect(body).toContain('# Body content')
  })

  it('returns raw body when no frontmatter present', () => {
    const { meta, body } = parseFrontmatter('# No frontmatter')
    expect(meta).toEqual({})
    expect(body).toBe('# No frontmatter')
  })

  it('handles tags without brackets', () => {
    const raw = `---
title: "Tags"
tags: one, two, three
---

Body
`
    const { meta } = parseFrontmatter(raw)
    expect(meta.tags).toEqual(['one', 'two', 'three'])
  })
})

describe('notes collection', () => {
  it('loads markdown notes from content folder', () => {
    expect(notes.length).toBeGreaterThan(0)
  })

  it('every note has required fields', () => {
    for (const note of notes) {
      expect(note.slug).toBeTruthy()
      expect(note.title).toBeTruthy()
      expect(note.category).toBeTruthy()
      expect(note.description).toBeTruthy()
      expect(note.body).toBeTruthy()
      expect(Array.isArray(note.tags)).toBe(true)
    }
  })

  it('slugs are unique', () => {
    const slugs = notes.map((n) => n.slug)
    expect(new Set(slugs).size).toBe(slugs.length)
  })
})

describe('getNoteBySlug', () => {
  it('returns the note for an existing slug', () => {
    const note = getNoteBySlug(notes[0].slug)
    expect(note).toBeDefined()
    expect(note.slug).toBe(notes[0].slug)
  })

  it('returns undefined for unknown slug', () => {
    expect(getNoteBySlug('does-not-exist')).toBeUndefined()
  })
})

describe('categories', () => {
  it('contains unique categories from all notes', () => {
    expect(categories.length).toBeGreaterThan(0)
    expect(new Set(categories).size).toBe(categories.length)
  })
})

describe('formatDate', () => {
  it('formats ISO date to readable string', () => {
    expect(formatDate('2026-08-13')).toBe('Aug 13, 2026')
  })

  it('returns empty string for empty input', () => {
    expect(formatDate('')).toBe('')
  })

  it('returns original string for invalid date', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date')
  })
})
