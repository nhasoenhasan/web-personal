'use client'

import { useEffect, useState } from 'react'

function Loader({ onDone }) {
  const [progress, setProgress] = useState(0)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const duration = 1800
    const start = performance.now()

    let raf
    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, (elapsed / duration) * 100)
      setProgress(Math.floor(pct))

      if (pct < 100) {
        raf = requestAnimationFrame(tick)
      } else {
        setFading(true)
        setTimeout(onDone, 500)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Persentase besar di tengah — ukuran display dengan leading rapat */}
      <div className="text-[clamp(4.5rem,17vw,8.5rem)] font-medium leading-[0.9] tracking-[-0.04em] tabular text-on-surface">
        {progress}
        <span className="text-secondary">%</span>
      </div>

      {/* Garis progres tipis */}
      <div className="absolute bottom-24 left-10 right-10 h-px max-w-[400px] md:left-auto md:right-auto">
        <div className="h-px w-full bg-surface-variant" />
        <div
          className="absolute left-0 top-0 h-px bg-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Label kecil */}
      <div className="t-label absolute bottom-20 text-outline">
        processing request
      </div>
    </div>
  )
}

export default Loader
