'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

function AnimatedScore() {
  const [score, setScore] = useState(0)
  const target = 73
  useEffect(() => {
    const t = setTimeout(() => {
      const iv = setInterval(() => setScore(p => { if (p >= target) { clearInterval(iv); return target } return p + 1 }), 30)
      return () => clearInterval(iv)
    }, 800)
    return () => clearTimeout(t)
  }, [])
  const r = 54, circ = 2 * Math.PI * r, arc = circ * 0.75
  const offset = arc - (score / 100) * arc
  const color = score >= 75 ? '#22c55e' : score >= 50 ? '#eab308' : '#f97316'
  return (
    <div className="relative w-36 h-36">
      <svg width="144" height="144" style={{ transform: 'rotate(135deg)' }}>
        <circle cx="72" cy="72" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="8" strokeDasharray={`${arc} ${circ-arc}`} strokeLinecap="round" />
        <circle cx="72" cy="72" r={r} fill="none" stroke={color} strokeWidth="8" strokeDasharray={`${arc-offset} ${circ-(arc-offset)}`} strokeLinecap="round" style={{ filter: `drop-shadow(0 0 8px ${color}80)`, transition: 'stroke-dasharray 0.05s linear' }} />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-rajdhani font-bold text-4xl leading-none" style={{ color }}>{score}</span>
        <span className="text-white/40 text-xs font-inter uppercase tracking-widest">SCORE</span>
      </div>
    </div>
  )
}

function DashboardMockup() {
  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="glass rounded-2xl p-6 border border-white/10 shadow-premium relative overflow-hidden">
        <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/40 text-xs font-inter uppercase tracking-widest">DIAGNÓSTICO ACTIVO</p>
            <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">EMPRESA DEMO S.A.C.</h3>
          </div>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          </div>
        </div>
        <div className="flex items-center gap-6 mb-6">
          <AnimatedScore />
          <div className="flex-1 space-y-3">
            {[
              { label: 'Tributario', score: 68, color: '#eab308' },
              { label: 'Financiero', score: 72, color: '#eab308' },
              { label: 'Laboral', score: 81, color: '#22c55e' },
              { label: 'Operativo', score: 59, color: '#f97316' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className="text-white/50 text-xs font-inter w-16 flex-shrink-0">{item.label}</span>
                <div className="flex-1 h-1.5 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${item.score}%`, background: item.color, boxShadow: `0 0 6px ${item.color}80` }} />
                </div>
                <span className="text-xs font-rajdhani font-semibold w-6 text-right" style={{ color: item.color }}>{item.score}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Riesgos', value: '3', color: '#ef4444', status: 'CRÍTICOS' },
            { label: 'Oportunidades', value: '5', color: '#22c55e', status: 'DETECTADAS' },
            { label: 'KPIs Premium', value: '11', color: '#eab308', status: 'BLOQUEADOS' },
          ].map((m) => (
            <div key={m.label} className="bg-white/4 rounded-lg p-3 border border-white/6">
              <p className="text-white/40 text-xs font-inter">{m.label}</p>
              <p className="font-rajdhani font-bold text-2xl" style={{ color: m.color }}>{m.value}</p>
              <p className="text-xs font-inter tracking-widest" style={{ color: m.color, opacity: 0.8 }}>{m.status}</p>
            </div>
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-accent to-transparent opacity-40" />
      </div>
      <div className="absolute -left-4 top-1/3 glass rounded-lg px-3 py-2 border border-white/10 text-xs font-inter">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /><span className="text-white/70">SUNAT Validado</span></div>
      </div>
      <div className="absolute -right-4 bottom-1/3 glass rounded-lg px-3 py-2 border border-white/10 text-xs font-inter">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-primary animate-pulse" /><span className="text-white/70">IA Activa</span></div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 80% 20%, #1428DC, #050A1E)' }} />
      <div className="absolute inset-0 grid-overlay" />
      <div className="absolute inset-0 hex-pattern opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #1428DC, transparent)' }} />
      <div className="relative max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 bg-blue-primary/15 border border-blue-primary/30 rounded-full px-4 py-1.5 text-xs font-inter text-cyan-accent uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
            Sistema de Inteligencia Empresarial
          </div>
          <h1 className="font-rajdhani font-bold leading-tight" style={{ fontSize: 'clamp(36px, 5vw, 56px)' }}>
            <span className="text-white">CORE FINANZAS</span><br />
            <span className="text-holographic">Diagnóstico</span><br />
            <span className="text-white">Empresarial</span>
          </h1>
          <p className="text-white/60 font-inter text-lg leading-relaxed max-w-lg">
            Diagnóstico estratégico diseñado para identificar riesgos tributarios, financieros, laborales y operativos en empresas peruanas.
          </p>
          <div className="flex gap-6">
            {[{ value: '360°', label: 'Análisis empresarial' }, { value: '5', label: 'Dimensiones clave' }, { value: '100', label: 'Puntos CORE Score™' }].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-rajdhani font-bold text-2xl text-holographic">{s.value}</p>
                <p className="text-white/40 text-xs font-inter">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-4">
            <Link href="/diagnostico" className="flex items-center gap-2.5 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest px-7 py-3.5 rounded-md transition-all duration-200 shadow-glow-blue text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              Iniciar Diagnóstico
            </Link>
            <a href="#preview" className="flex items-center gap-2.5 bg-transparent border border-white/20 hover:border-white/40 text-white font-rajdhani font-semibold uppercase tracking-widest px-7 py-3.5 rounded-md transition-all duration-200 text-sm">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Ver Informe Ejecutivo
            </a>
          </div>
          <div className="flex items-center gap-4 pt-2 flex-wrap">
            {['Integración SUNAT real', 'IA consultiva premium', '100% confidencial'].map((t) => (
              <div key={t} className="flex items-center gap-1.5 text-xs text-white/40 font-inter">
                <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="hidden lg:block"><DashboardMockup /></div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-deep to-transparent pointer-events-none" />
    </section>
  )
}
