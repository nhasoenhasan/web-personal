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
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#f7f9fb] transition-opacity duration-500 ${
        fading ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {/* Large percentage in the center */}
      <div className="font-display text-[96px] font-bold leading-none tracking-tight text-primary md:text-[140px]">
        {progress}
        <span className="text-secondary">%</span>
      </div>

      {/* Thin progress bar */}
      <div className="absolute bottom-24 left-10 right-10 h-px max-w-[400px] md:left-auto md:right-auto">
        <div className="h-px w-full bg-surface-variant" />
        <div
          className="absolute left-0 top-0 h-px bg-primary transition-[width] duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Small label */}
      <div className="absolute bottom-20 font-mono text-xs tracking-[0.2em] text-on-surface-variant uppercase">
        processing request
      </div>
    </div>
  )
}

export default Loader
