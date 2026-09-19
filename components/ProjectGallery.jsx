'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

const THUMB_W = 360
const ASPECT = 'aspect-[9/19]' // kontainer rasio ponsel → semua thumbnail seragam

/**
 * Galeri screenshot app: deretan thumbnail, klik untuk membuka versi besar.
 *
 * Kenapa client component: butuh state (gambar mana yang terbuka) dan
 * interaksi (klik, Esc, panah kiri/kanan). Screenshot-nya sendiri sudah
 * di-resize saat build (lihat catatan di bawah), jadi tidak ada kerja berat
 * di browser.
 */
export default function ProjectGallery({ images = [], className = '' }) {
  const [openIndex, setOpenIndex] = useState(null)
  const closeButtonRef = useRef(null)
  const lastTriggerRef = useRef(null)

  const close = useCallback(() => {
    setOpenIndex(null)
    // kembalikan fokus ke thumbnail yang tadi diklik
    lastTriggerRef.current?.focus()
  }, [])

  const step = useCallback(
    (delta) => setOpenIndex((i) => (i === null ? i : (i + delta + images.length) % images.length)),
    [images.length],
  )

  useEffect(() => {
    if (openIndex === null) return undefined

    const onKeyDown = (event) => {
      if (event.key === 'Escape') close()
      else if (event.key === 'ArrowRight') step(1)
      else if (event.key === 'ArrowLeft') step(-1)
    }

    window.addEventListener('keydown', onKeyDown)
    // kunci scroll halaman selama lightbox terbuka
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = prevOverflow
    }
  }, [openIndex, close, step])

  if (!images?.length) return null

  // Kalau cuma ada 1 gambar (mis. sebuah project cuma punya satu screenshot),
  // jangan pakai grid 4 kolom — satu thumbnail di grid 4 kolom terlihat kerdil
  // dan tiga perempat barisnya kosong. Grid mengikuti jumlah gambar:
  // 1 → satu kolom (rasio asli, tidak dipotong), 2 → dua kolom, 3 → tiga, 4+ → empat.
  const isSingle = images.length === 1
  const gridClass = isSingle
    ? 'max-w-[200px]'
    : images.length === 2
      ? 'grid max-w-[420px] grid-cols-2 gap-4'
      : images.length === 3
        ? 'grid grid-cols-2 gap-4 sm:grid-cols-3'
        : 'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4'
  const current = openIndex === null ? null : images[openIndex]

  return (
    <div className={className}>
      <ul className={gridClass}>
        {images.map((image, index) => (
          <li key={image.id}>
            <button
              type="button"
              onClick={(event) => {
                lastTriggerRef.current = event.currentTarget
                setOpenIndex(index)
              }}
              aria-label={`Open larger: ${image.caption}`}
              className="group block w-full rounded-md text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              <span
                className={`block overflow-hidden rounded-md border border-outline-variant/50 bg-surface-container ${
                  isSingle ? '' : ASPECT
                }`}
              >
                <Image
                  src={`/portfolio/${image.id}-sm.webp`}
                  alt={image.alt}
                  width={THUMB_W}
                  height={Math.round((image.h * THUMB_W) / image.w)}
                  sizes="180px"
                  className={
                    isSingle
                      ? 'h-auto w-full'
                      : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'
                  }
                />
              </span>
              {/* min-h supaya caption 1 baris dan 2 baris tetap sejajar
                  dasarnya — tanpa ini barisnya jadi bergerigi */}
              <span className="t-label mt-2 block min-h-[2.4em] text-on-surface-variant transition-colors group-hover:text-on-surface">
                {image.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-[95] flex flex-col bg-surface/95 backdrop-blur-sm"
        >
          <div className="rule flex items-center justify-between border-b px-5 py-3 md:px-8">
            <span className="t-label tabular text-outline">
              {openIndex + 1} / {images.length}
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              className="t-label rounded text-on-surface-variant transition-colors hover:text-on-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary"
            >
              Close ✕
            </button>
          </div>

          {/* klik di area gelap = tutup */}
          <button
            type="button"
            aria-label="Close"
            onClick={close}
            className="flex flex-1 cursor-zoom-out items-center justify-center p-4 md:p-8"
          >
            <Image
              src={`/portfolio/${current.id}-lg.webp`}
              alt={current.alt}
              width={current.w}
              height={current.h}
              className="h-auto max-h-[78vh] w-auto max-w-full object-contain"
            />
          </button>

          <div className="rule flex items-center justify-between gap-4 border-t px-5 py-4 md:px-8">
            <button
              type="button"
              onClick={() => step(-1)}
              className="t-label text-on-surface-variant transition-colors hover:text-on-surface"
            >
              ← Prev
            </button>
            <p className="t-small measure-tight text-center text-on-surface-variant">
              {current.caption}
            </p>
            <button
              type="button"
              onClick={() => step(1)}
              className="t-label text-on-surface-variant transition-colors hover:text-on-surface"
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
