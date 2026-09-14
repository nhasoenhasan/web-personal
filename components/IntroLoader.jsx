'use client'

import { useCallback, useEffect, useState } from 'react'
import Loader from './Loader'

// Di versi Vite, <Loader /> hidup di dalam App dan muncul setiap kali
// full page load. Di Next, layout TIDAK di-remount saat client-side navigation
// (pindah dari / ke /notes), jadi loader otomatis hanya muncul sekali —
// perilaku yang diinginkan. Gerbang sessionStorage di bawah menjaga kasus
// reload halaman: intro tidak diputar ulang.
export default function IntroLoader() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem('intro-played')) return
    sessionStorage.setItem('intro-played', '1')
    // Sengaja setState di dalam effect: sessionStorage tidak ada saat SSR, jadi
    // keputusan "tampilkan loader atau tidak" hanya bisa diambil setelah mount.
    // oxlint-disable-next-line react/set-state-in-effect
    setShow(true)
  }, [])

  // useCallback penting: Loader punya useEffect dengan dependency [onDone].
  // Kalau fungsinya dibuat ulang tiap render, animasinya akan restart terus.
  const handleDone = useCallback(() => setShow(false), [])

  if (!show) return null
  return <Loader onDone={handleDone} />
}
