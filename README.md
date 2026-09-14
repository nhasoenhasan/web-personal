# web-personal (Next.js)

Versi Next.js App Router dari personal site + notes. Ini branch belajar
(`nextjs`, worktree terpisah); versi produksi yang dipakai sekarang masih
Vite SPA di branch `main`.

**Baca [`MIGRATION-NOTES.md`](./MIGRATION-NOTES.md) dulu** — isinya tabel mapping
file Vite→Next, urutan baca yang disarankan, konsep kunci, dan angka hasil build.

```bash
pnpm dev       # http://localhost:3000
pnpm test      # vitest (lib/notes.test.js)
pnpm lint      # oxlint
pnpm build     # static export → out/
pnpm preview   # serve out/ lokal
```

## Struktur

```
app/
  layout.jsx              metadata, next/font, script tema, Navbar/Footer
  page.jsx                home (Server Component)
  not-found.jsx           404
  globals.css             Tailwind v4 + token warna (sama seperti versi Vite)
  notes/
    page.jsx              daftar notes (Server Component → kirim props)
    [slug]/page.jsx       artikel: generateStaticParams + generateMetadata
components/               Hero, Experience, Skills, Contact, Footer (server)
                          Navbar, Reveal, Loader, ThemeToggle, NotesList (client)
lib/
  notes.js                server-only: baca content/**/*.md via node:fs
  format.js               util murni, aman untuk client
content/                  sumber artikel markdown (tidak berubah dari versi Vite)
next.config.mjs           output: 'export', trailingSlash: true
```

Deploy: `.github/workflows/deploy.yml` — test → Snyk → build → rsync `out/` ke VPS.
