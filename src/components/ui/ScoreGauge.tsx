'use client'
import { useEffect, useState } from 'react'

function getColor(score: number) {
  if (score >= 75) return '#22c55e'
  if (score >= 50) return '#eab308'
  if (score >= 25) return '#f97316'
  return '#ef4444'
}

function getNivelLabel(score: number) {
  if (score >= 75) return 'ÓPTIMO'
  if (score >= 50) return 'MODERADO'
  if (score >= 25) return 'CRÍTICO'
  return 'ALERTA'
}

export function ScoreGauge({ score, size = 160, strokeWidth = 10, label, sublabel, animated = true }: {
  score: number; size?: number; strokeWidth?: number; label?: string; sublabel?: string; animated?: boolean
}) {
  const [display, setDisplay] = useState(animated ? 0 : score)
  useEffect(() => {
    if (!animated) return
    const start = performance.now()
    const dur = 2000
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1)
      const e = 1 - Math.pow(1 - p, 3)
      setDisplay(Math.round(e * score))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [score, animated])

  const r = (size - strokeWidth * 2) / 2
  const circ = 2 * Math.PI * r
  const arc = circ * 0.75
  const offset = arc - (display / 100) * arc
  const color = getColor(score)
  const cx = size / 2

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(135deg)' }}>
          <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth}
            strokeDasharray={`${arc} ${circ - arc}`} strokeLinecap="round" />
          <circle cx={cx} cy={cx} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
            strokeDasharray={`${arc - offset} ${circ - (arc - offset)}`} strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 8px ${color}80)`, transition: 'stroke-dasharray 0.05s linear' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-rajdhani font-bold leading-none" style={{ fontSize: size * 0.28, color }}>{display}</span>
          <span className="text-white/40 uppercase tracking-widest font-inter" style={{ fontSize: size * 0.08 }}>/100</span>
        </div>
      </div>
      {label && (
        <div className="text-center">
          <p className="font-rajdhani font-semibold text-white text-sm uppercase tracking-wider">{label}</p>
          {sublabel && <p className="font-rajdhani font-bold uppercase tracking-widest text-xs mt-0.5" style={{ color }}>{getNivelLabel(score)}</p>}
        </div>
      )}
    </div>
  )
}
