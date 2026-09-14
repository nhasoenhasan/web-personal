# Migrasi web-personal: Vite SPA → Next.js App Router

Dokumen ini bahan belajar, bukan laporan. Tujuannya: kamu bisa membaca kode Next-nya
sendiri dan tahu persis "yang ini dulu apa, sekarang jadi apa, dan kenapa".

- **Lokasi**: `/Users/nurhasan/Workspaces/web-personal-next` (git worktree, branch `nextjs`)
- **Versi asli (Vite)**: `/Users/nurhasan/Workspaces/web-personal` (branch `main`) — tidak diubah sama sekali
- **Stack**: Next.js 16.3.5 (Turbopack) · React 19.3 · Tailwind v4 · `output: 'export'` (static export, deploy rsync tetap jalan)

---

## 0. Cara pakai: jalankan dua-duanya berdampingan

```bash
# terminal 1 — versi Vite
cd ~/Workspaces/web-personal && pnpm dev          # http://localhost:5173

# terminal 2 — versi Next
cd ~/Workspaces/web-personal-next && pnpm dev     # http://localhost:3000
```

Buka dua tab berdampingan. Yang paling cepat bikin paham: perhatikan HTML-nya, bukan
tampilannya. Di Vite, View Source = `<div id="root"></div>` kosong. Di Next, View Source
sudah berisi seluruh markup + `<title>` per halaman.

```bash
pnpm test     # 12 tes lama, tetap lulus (diadaptasi 1 baris import)
pnpm lint     # oxlint
pnpm build    # → out/  (setara dist/ di Vite)
pnpm preview  # serve out/ lokal
```

---

## 1. Tabel mapping file

| Vite (`main`) | Next (`nextjs`) | Yang berubah |
|---|---|---|
| `index.html` | `app/layout.jsx` | `<head>` → objek `metadata`; fonts → `next/font`; Umami → `<Script>` |
| `src/main.jsx` | — (dihapus) | `createRoot` + `BrowserRouter` tidak ada lagi; router jadi file-based |
| `src/App.jsx` | `app/layout.jsx` + `app/page.jsx` | Pembungkus route → layout; `Home` → `page.jsx` |
| `src/pages/NotesList.jsx` | `app/notes/page.jsx` (server) + `components/NotesList.jsx` (client) | Data lewat props, bukan import langsung |
| `src/pages/NoteDetail.jsx` | `app/notes/[slug]/page.jsx` | Jadi Server Component; `ReactMarkdown` pindah ke server |
| `src/lib/notes.js` | `lib/notes.js` (server) + `lib/format.js` (shared) | `import.meta.glob` → `node:fs`; `formatDate` dipisah |
| `src/components/Navbar.jsx` | `components/Navbar.jsx` | `'use client'`, `next/link`, `usePathname` |
| `src/components/Reveal.jsx` | `components/Reveal.jsx` | `+ 'use client'` |
| `src/components/Loader.jsx` | `components/Loader.jsx` + `components/IntroLoader.jsx` | `+ 'use client'`; digerbang `sessionStorage` |
| `src/components/ThemeToggle.jsx` | `components/ThemeToggle.jsx` | `'use client'` + **ganti `useState` → `useSyncExternalStore`** (hydration mismatch, §3.10) |
| `src/components/{Hero,Experience,Skills,Contact,Footer}.jsx` | sama, tanpa `'use client'` | Jadi Server Component |
| `src/data/resume.js` | `data/resume.js` | Tidak berubah isinya |
| `src/index.css` | `app/globals.css` | Hanya 2 blok yang disentuh (§4) |
| `vite.config.js` | `next.config.mjs` + `postcss.config.mjs` | `@tailwindcss/vite` → `@tailwindcss/postcss` |
| — (tidak ada) | `components/HashScroll.jsx` | Pengganti `<ScrollHandler>` |
| — (tidak ada) | `app/not-found.jsx` | Dulu route `*` diam-diam menampilkan Home (soft 404) |
| `src/App.jsx` `<Route path="*">` | dihapus | Sekarang 404 asli — lihat §6 |

---

## 2. Urutan baca yang saya sarankan

Baca berpasangan (kiri = Vite, kanan = Next). Dari yang paling mirip ke paling beda:

1. **`components/Reveal.jsx`** — bedanya cuma 1 baris: `'use client'`. Tapi baris itu
   mengubah segalanya: dari komponen biasa jadi komponen yang dikirim ke browser.
2. **`app/page.jsx`** vs `App.jsx` bagian `function Home()`. Hampir identik — karena
   memang sengaja: `Hero`, `Experience` tidak perlu diubah, cuma berubah *di mana* ia dirender.
3. **`lib/notes.js`** — baca dua versinya berdampingan. Ini perbedaan konseptual terbesar
   di seluruh migrasi: *kapan* kode berjalan (build+client → server).
4. **`app/notes/[slug]/page.jsx`** vs `NoteDetail.jsx` — `ReactMarkdown` yang tadinya di
   client, sekarang di server. Plus dua fungsi baru: `generateStaticParams`, `generateMetadata`.
5. **`app/notes/page.jsx` + `components/NotesList.jsx`** — pasangan server→client. Ini pola
   yang paling sering kamu pakai di Next: ambil data di server, kirim ke client untuk
   interaksi. Perhatikan komentar soal `body` markdown yang sengaja tidak dikirim.
6. **`components/Navbar.jsx`** — `'use client'` + `next/link` + `usePathname()`. Satu-satunya
   komponen yang "pindah rumah" API-nya.
7. **`app/layout.jsx`** — paling banyak hal baru (metadata, font, script tema, IntroLoader,
   Script Umami). Baca terakhir karena ia menggabungkan semuanya.

---

## 3. Konsep kunci, dengan rujukan ke kodemu sendiri

### 3.1 Server Component vs Client Component

Di Next, **default-nya server**. `'use client'` adalah penanda bahwa file ini ikut dikirim
ke browser dan boleh pakai hook/event handler.

Aturan praktis yang terlihat di project ini: yang butuh browser API (`window`, `localStorage`,
`IntersectionObserver`) atau punya state → client. Komponen yang cuma memformat data → server.

Cek sendiri: 5 komponen isi home (`Hero`, `Experience`, `Skills`, `Contact`, `Footer`)
**tidak** punya `'use client'` — itu sebabnya HTML-nya sudah lengkap sebelum JS jalan.

### 3.2 `node:fs` tidak bisa menyeberang ke client

Ini jebakan pertama yang bikin build gagal kalau tidak dipahami. `lib/notes.js` memakai
`fs.readFileSync`. Kalau komponen `'use client'` meng-import-nya, webpack/Turbopack akan
mencoba membundel `node:fs` untuk browser → error.

Karena itu `formatDate` dipindah ke `lib/format.js` (murni, tanpa `fs`), supaya
`components/NotesList.jsx` boleh memakainya. Aturan umumnya:

> Fungsi murni → file terpisah. Fungsi yang menyentuh filesystem/env/DB → server-only.

### 3.3 Data mengalir lewat props, bukan import

`app/notes/page.jsx` (server) membaca disk, lalu:

```jsx
const cards = notes.map((note) => ({ slug, title, category, date, tags, description }))
return <NotesList notes={cards} categories={categories} />
```

Perhatikan `body` markdown penuh **tidak** ikut dikirim. Di Vite, seluruh isi artikel ada di
bundle karena `import.meta.glob(..., { eager: true })`. Di Next kamu bisa memilih: kirim
hanya yang perlu. Ini penghematan yang tidak mungkin dilakukan di versi Vite.

### 3.4 `generateStaticParams` = route dinamis yang tetap statis

```jsx
export function generateStaticParams() {
  return notes.map((note) => ({ slug: note.slug }))
}
```

Next memanggil ini saat build, lalu membuat **satu file HTML per slug**:

```
out/notes/fix-memory-leak-ios/index.html
out/notes/rca-production-issue/index.html
out/notes/speed-up-build-react-native/index.html
```

Di Vite, `/notes/:slug` tidak punya HTML sendiri — satu `index.html` melayani semua route
dan browser yang merakit halamannya. Efeknya terlihat di §5: HTML home versi Next 47,7 KB
(bukan 1,3 KB), dan isinya memang artikelnya.

### 3.5 `generateMetadata` = alasan utama migrasi ini

```jsx
const note = getNoteBySlug(slug)
return {
  title: `${note.title} — Nur Hasan`,
  description: note.description,
  openGraph: { title: note.title, description: note.description, type: 'article', tags: note.tags },
}
```

Bukti nyata, dari HTML hasil build:

```html
<title>Fixing Memory Leaks in React Native on iOS — Nur Hasan</title>
<meta property="og:description" content="How I resolved a memory leak that caused the app to crash after extended use on iOS.">
```

Di versi Vite ini mustahil tanpa menambah react-helmet / pre-render manual. Crawler
LinkedIn/X/WhatsApp membaca HTML mentah, dan di Vite HTML mentah itu selalu sama untuk
semua route.

Bukti pembandingnya — saya buka dua dev server berdampingan dan baca `document.title`
di route artikel yang sama:

| | Vite (`:5173`) | Next (`:3000`) |
|---|---|---|
| `/notes/fix-memory-leak-ios` | `Nur Hasan — Software Engineer` | `Fixing Memory Leaks in React Native on iOS — Nur Hasan` |

### 3.6 `next/font` menghapus 2 request + FOUT

Sebelumnya: 3 `<link>` ke `fonts.googleapis.com` + `fonts.gstatic.com` di `index.html`.
Sekarang font di-download saat build, di-self-host, dan diinjeksi sebagai CSS variable:

```jsx
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
// <html className={inter.variable}>  →  --font-inter tersedia di seluruh dokumen
```

Karena itu `app/globals.css` ikut berubah sedikit (§4).

### 3.7 Client boundary itu menular ke bawah, bukan ke atas

`Reveal` adalah client component, tapi dipakai *di dalam* `Hero` yang server component.
Itu boleh dan justru pola yang benar: server component boleh merender client component
(dan mengirim children sebagai slot). Yang tidak boleh: client component meng-import
komponen yang menyentuh `fs`. Jadi "server" dan "client" itu per-pohon, bukan per-file.

### 3.8 Hash scroll: logika JS jadi CSS

`App.jsx` versi Vite punya `<ScrollHandler>` yang `scrollTo(id)` manual tiap route berubah.
Di Next, scroll-to-top saat pindah route sudah bawaan framework. Sisa kebutuhannya cuma
hash anchor, dan bagian "jangan ketutup navbar fixed" sekarang murni CSS:

```css
[id] { scroll-margin-top: 5rem; }
```

`components/HashScroll.jsx` hanya menyisakan sedikit kode untuk kasus pindah dari `/notes`
ke `/#skills` dan klik hash di halaman yang sama (`hashchange`).

### 3.9 Satu komponen yang ternyata harus berubah perilaku: `Loader`

Di Vite, `Loader` hidup di dalam `App` dan tampil setiap full page load. Di Next, layout
**tidak** di-remount saat client-side navigation — jadi loader otomatis hanya jalan sekali,
perilaku yang kamu mau. Tapi reload manual tetap memutarnya lagi, jadi `IntroLoader`
menggerbangnya dengan `sessionStorage`. Ini contoh pola "render hanya di client":
`useState(false)` + `useEffect(() => setShow(true))` — tidak bisa pakai nilai awal dari
`sessionStorage` langsung karena saat SSR `sessionStorage` belum ada (hydration mismatch).

### 3.10 Hydration mismatch: bug nyata yang muncul karena SSR

Ini kasus paling berharga di seluruh migrasi, dan ketemu bukan dari membaca kode tapi
dari **membuka DevTools di browser**. `ThemeToggle` versi pertama saya masih memakai pola Vite:

```jsx
const [theme, setTheme] = useState(getInitialTheme)   // ❌ di Next
```

Di Vite itu benar (tidak ada SSR). Di Next, server merender dulu: saat itu `window` tidak
ada, jadi `getInitialTheme()` mengembalikan `'light'`. Browser user prefer dark, jadi
render di client menghasilkan `'dark'`. React kemudian mengeluh:

```
+ aria-label="Switch to light mode"   ← client
- aria-label="Switch to dark mode"    ← server
```

Ini bukan error yang bikin app putih — halaman tetap jalan. Yang terjadi: React menolak
mencocokkan markup, ikon tema bisa salah sampai efek berjalan, dan React Compiler
melewati optimisasi komponen itu. Bedanya kelas bug ini dari bug JS biasa: **tidak ada
exception**, cuma ada di console + badge "1 Issue" di pojok DevTools.

Cara memperbaiki (yang saya pakai): jangan hitung ulang tema di komponen. Sumber
kebenaran tunggal adalah class `.dark` di `<html>` yang sudah dipasang script inline
sebelum paint. Komponen cukup **membaca** DOM itu:

```jsx
const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
//                              ^ MutationObserver di <html class>
//                                                  ^ snapshot khusus server → tidak pernah mismatch
```

Pelajaran umumnya: **setiap nilai yang berbeda antara server dan browser adalah kandidat
hydration mismatch**. Kalau butuh `localStorage`, `window`, `Date.now()`, atau
`Math.random()` untuk menentukan tampilan, baca lewat `useEffect` (setelah mount) atau
`useSyncExternalStore` — jangan di nilai awal `useState`.

Sudah diverifikasi: setelah perbaikan, console bersih (`0 errors`), badge isu hilang, dan
tombol tetap berfungsi (klik → `localStorage.theme` berubah, `background-color` body
berubah dari `rgb(16,18,20)` ke `rgb(247,249,251)`).

---

## 4. Perubahan CSS: hanya 2 blok

| Lokasi | Sebelum | Sesudah |
|---|---|---|
| `@theme inline` bagian fonts | `--font-sans: "Inter", ...` | `--font-sans: var(--font-inter), ...` |
| setelah `html { scroll-behavior }` | — | `[id] { scroll-margin-top: 5rem; }` |

File `app/globals.css` berasal dari `src/index.css` (209 baris). Yang disentuh hanya 2 blok
di tabel atas; sisanya — token warna, `.markdown-body`, `.reveal`, `.ambient-shadow` —
tidak berubah sama sekali. Tailwind v4 hampir tidak peduli framework.

### Cara membuktikan Tailwind benar-benar aktif

Jangan percaya "kelihatannya sudah rapi". Bukti yang bisa kamu ulang sendiri:

1. `pnpm build` → satu file CSS: `out/_next/static/chunks/*.css` (33 KB). Isinya gabungan
   hasil scan Tailwind + tema `highlight.js`.
2. Bandingkan class yang **dipakai** di HTML dengan yang **ada** di CSS. Saya jalankan
   pemeriksaan ini: **141 dari 141** class di `out/index.html` ketemu di CSS.
3. Utility custom dari `@theme inline` ikut ter-generate: `bg-surface-container`,
   `text-on-surface-variant`, `font-display`, `backdrop-blur-md`, dan bahkan arbitrary
   value `group-hover:shadow-[0_0_10px_rgba(0,102,138,0.3)]`.
4. Bukti font self-hosted: `getComputedStyle(h1).fontFamily` →
   `"Hanken Grotesk", "Hanken Grotesk Fallback"`. Suffix `Fallback` itu yang dibuat
   `next/font` sendiri — tanda font di-serve dari domainmu, bukan `fonts.gstatic.com`.

Wiring-nya yang berubah hanya ini:

| | Vite | Next |
|---|---|---|
| Plugin | `@tailwindcss/vite` | `@tailwindcss/postcss` |
| Config | `vite.config.js` | `postcss.config.mjs` |
| `tailwind.config.js` | tidak ada (v4 CSS-first) | tidak ada (v4 CSS-first) |
| Deteksi file | otomatis | otomatis (kecuali yang di `.gitignore`) |

Tidak ada dependency Tailwind baru yang perlu ditambahkan — `tailwindcss@4.3.3` sudah ada
di `package.json` sejak migrasi pertama.

---

## 5. Hasil pengukuran (angka asli, bukan klaim)

Metode: `pnpm build` di kedua versi, lalu jumlahkan ukuran setiap `<script src>` yang
benar-benar dimuat route tersebut, dikompresi gzip -9.

| Route | Vite SPA | Next.js | Selisih |
|---|---|---|---|
| `/` (JS, gzip) | 76,4 KB | 175,7 KB | **Next +99 KB** |
| `/notes/` (JS, gzip) | 80,6 KB | 177,0 KB | Next +96 KB |
| `/notes/<slug>/` (JS, gzip) | 176,3 KB | 175,3 KB | seri |
| `/` (HTML, raw) | 1,3 KB | 47,7 KB | Next kirim kontennya |

Rincian chunk Vite (gzip): `index` 76,4 KB · `notes` 2,8 KB · `NotesList` 1,3 KB ·
`NoteDetail` 95,8 KB. Home hanya memuat `index`; halaman artikel memuat keempatnya.

### Koreksi terhadap klaim saya di awal

Waktu pertama kali membahas migrasi ini, saya bilang *"bundle client turun signifikan"*.
**Itu tidak benar untuk project ini, dan datanya ada di tabel di atas.**

Yang benar:
- Chunk `react-markdown + highlight.js` (**95,8 KB gzip**) memang **hilang total** dari
  bundle client. Saya sudah verifikasi: tidak ada file JS di `out/_next/static/chunks`
  yang mengandung `hljs` atau `react-markdown`.
- Tapi Next menambahkan runtime + hydration-nya sendiri (RSC client runtime, router,
  layout yang harus di-hidrasi) yang untuk site sekecil ini justru **lebih besar** dari
  yang dihemat. Route artikel jadi seri; route home justru naik ~99 KB gzip.

Jadi alasan sah memakai Next di sini adalah **metadata per halaman + konten ada di HTML**,
bukan ukuran bundle. Kalau tujuanmu cuma "JS lebih kecil", Vite + SPA lebih unggul untuk
site ini. Trade-off ini yang perlu kamu hafal, karena pertanyaan "kenapa Next?" sering
muncul di interview.

Catatan tambahan: `output: 'export'` berarti fitur SSR/ISR/caching Next tidak dipakai.
Yang kamu dapat murni SSG (pre-render saat build) — sudah cukup untuk kasus ini.

---

## 6. Perubahan perilaku yang harus kamu sadari

1. **404 jadi 404 asli.** Di Vite, `<Route path="*">` membuat URL ngawur menampilkan Home
   (soft 404, HTTP 200). Sekarang `notFound()` → `app/not-found.jsx` → `out/404.html`.
   Kalau kamu ingin perilaku lama (semua URL balik ke Home), hapus `app/not-found.jsx`
   dan tambahkan `app/[...slug]/page.jsx`.
2. **URL punya trailing slash.** `trailingSlash: true` menghasilkan `/notes/slug/`.
   Pastikan nginx di VPS melayani `index.html` per direktori (`try_files $uri $uri/ ...`).
3. **Intro loader digerbang `sessionStorage`** (§3.9), jadi reload kedua dalam satu sesi
   tab tidak memutarnya lagi.

### Dua hal yang *bukan* efek migrasi

Saat membandingkan dua versi di browser, saya menemukan dua hal yang terlihat seperti
regresi. Saya cek keduanya di versi Vite — **sama persis**, jadi ini masalah lama:

| Temuan | Vite | Next |
|---|---|---|
| Judul artikel tampil 2× (h1 dari frontmatter + h1 dari markdown) | 2 `<h1>` | 2 `<h1>` |
| Checkbox checklist `- [x]` tanpa warna accent | `accent-color: auto` | `accent-color: auto` |

Penyebab: `content/*.md` sudah punya `# Judul` di baris 9 padahal `title` frontmatter juga
dirender sebagai `<h1>`. Saya tidak mengubahnya karena di luar cakupan migrasi — tapi ini
dua perbaikan cepat kalau kamu mau: hapus heading H1 dari markdown (biar frontmatter yang
jadi judul), dan tambahkan `accent-color` di `.markdown-body li input[type="checkbox"]`.

---

## 7. Catatan lint

`pnpm lint` = 1 warning, 0 error. Warning itu (`set-state-in-effect` di `Navbar.jsx`)
**sudah ada di kode Vite** — hanya muncul sekarang karena oxlint naik dari 1.78 ke 1.82
yang punya aturan baru. Saya sudah verifikasi dengan menjalankan binary oxlint baru ke
source Vite lama: warning yang sama muncul. Jadi bukan regresi migrasi, dan saya tidak
menyentuhnya (di luar cakupan).

Satu penyesuaian config yang memang perlu: `react/only-export-components` dimatikan untuk
`app/**` di `.oxlintrc.json`, karena file `page.jsx`/`layout.jsx` App Router **wajib**
mengekspor `metadata`, `generateStaticParams`, `generateMetadata` — aturan Fast Refresh
itu false positive di sini.

---

## 8. Latihan lanjutan (urutan yang saya sarankan)

Semua ini belum dikerjakan; pilih satu per sesi belajarmu.

1. **`og:image` dinamis per artikel** — `ImageResponse` di `opengraph-image.jsx`. Paling
   memuaskan karena langsung kelihatan hasilnya saat share ke X/LinkedIn.
2. **`app/sitemap.js` + `app/robots.js`** — file convention, masing-masing ~10 baris.
3. **`app/notes/loading.jsx` + `app/error.jsx`** — lihat Suspense streaming bekerja.
4. **Pindahkan konten ke MDX** (`@next/mdx`) supaya bisa menyisipkan komponen React di
   dalam artikel.
5. **Server Action untuk form kontak** — tanpa API route, tanpa `fetch` manual.
6. **`server-only`** (`pnpm add server-only`, lalu `import 'server-only'` di atas
   `lib/notes.js`) — mengunci modul supaya mustahil di-import dari client. Perhatikan:
   ini akan bikin `lib/notes.test.js` gagal, dan menyelesaikannya adalah latihan tersendiri.
7. **Analisis bundle**: `@next/bundle-analyzer` untuk melihat sendiri dari mana 175 KB
   di route home berasal.
8. **Kembali ke `output: 'export'` vs server mode**: jalankan `next build && next start`
   (hapus `output: 'export'`) lalu bandingkan. Di sinilah SSR/ISR/caching baru terasa.

---

## 9. Perintah harian

```bash
git worktree list                      # lihat kedua working directory
cd ~/Workspaces/web-personal-next && pnpm dev
cd ~/Workspaces/web-personal && pnpm dev
```

Untuk membandingkan file lama vs baru secara langsung:

```bash
diff ~/Workspaces/web-personal/src/pages/NoteDetail.jsx \
     ~/Workspaces/web-personal-next/app/notes/\[slug\]/page.jsx
```

> Catatan git: perubahan migrasi ini masih ada di working tree (belum di-commit), jadi
> `git diff main -- <path>` baru menampilkan file yang isinya diedit, bukan file baru.
> Kalau ingin riwayat yang rapi (`git diff main..nextjs` menampilkan semua), commit dulu
> branch `nextjs`.
