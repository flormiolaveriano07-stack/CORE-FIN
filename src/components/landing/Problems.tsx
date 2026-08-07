'use client'
const PROBLEMS = [
  { title: 'Sobrecarga Tributaria', description: 'Pagás más impuestos de los necesarios por falta de planeamiento fiscal estratégico.', severity: 'ALTO', color: '#ef4444', icon: '📋' },
  { title: 'Desorden Financiero', description: 'Sin estructura financiera clara, las decisiones se toman a ciegas sin información real.', severity: 'ALTO', color: '#ef4444', icon: '📊' },
  { title: 'Falta de Liquidez', description: 'Tu empresa genera ventas pero no tiene caja disponible cuando más la necesitas.', severity: 'CRÍTICO', color: '#ef4444', icon: '💰' },
  { title: 'Riesgo SUNAT', description: 'Notificaciones, multas o procesos de fiscalización que amenazan la continuidad del negocio.', severity: 'CRÍTICO', color: '#ef4444', icon: '⚠️' },
  { title: 'Informalidad Laboral', description: 'Trabajadores sin planilla exponen a la empresa a sanciones laborales y multas de SUNAFIL.', severity: 'MEDIO', color: '#eab308', icon: '👥' },
  { title: 'Dependencia del Dueño', description: 'Sin sistemas ni procesos, la empresa no puede operar sin la presencia del propietario.', severity: 'MEDIO', color: '#eab308', icon: '🔗' },
]
export function Problems() {
  return (
    <section id="problemas" className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-navy-deep via-navy-mid/10 to-navy-deep" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 text-xs font-inter text-red-400 uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
            Problemas Frecuentes
          </div>
          <h2 className="font-rajdhani font-bold text-3xl text-white">¿Reconoces estos problemas <span className="text-holographic">en tu empresa</span>?</h2>
          <p className="text-white/50 font-inter text-base max-w-2xl mx-auto">La mayoría de PyMEs peruanas enfrentan estas mismas amenazas sin saberlo.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROBLEMS.map((p, i) => (
            <div key={i} className="group relative p-6 rounded-xl border border-white/8 bg-navy-mid/40 hover:bg-navy-surface/60 hover:border-white/15 transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-4 right-4 text-xs font-rajdhani font-bold uppercase tracking-widest px-2 py-0.5 rounded-full" style={{ color: p.color, background: `${p.color}12`, border: `1px solid ${p.color}25` }}>{p.severity}</div>
              <div className="text-3xl mb-4">{p.icon}</div>
              <h3 className="font-rajdhani font-semibold text-white text-lg mb-2 tracking-wide">{p.title}</h3>
              <p className="text-white/50 font-inter text-sm leading-relaxed">{p.description}</p>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-xl opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${p.color}, transparent)` }} />
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <a href="/diagnostico" className="inline-flex items-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest px-6 py-3 rounded-md transition-all shadow-glow-blue text-sm">
            Diagnósticalo ahora — es gratis
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
        </div>
      </div>
    </section>
  )
}
