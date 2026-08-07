'use client'
const FEATURES = [
  { area: 'Tributación', description: 'Régimen tributario, declaraciones, cobranzas coactivas y cumplimiento SUNAT.', metrics: ['Régimen óptimo', 'Cumplimiento PDT', 'Riesgo SUNAT'], color: '#1428DC', num: '01' },
  { area: 'Finanzas', description: 'Estructura financiera, rentabilidad, endeudamiento y salud financiera global.', metrics: ['Rentabilidad', 'Estructura deuda', 'Cash flow'], color: '#3CA0B4', num: '02' },
  { area: 'Tesorería', description: 'Control de caja, planificación de pagos, acceso a crédito y liquidez operativa.', metrics: ['Ciclo de caja', 'Acceso bancario', 'Liquidez'], color: '#9859FF', num: '03' },
  { area: 'Laboral', description: 'Formalización laboral, planilla, beneficios sociales, contratos y contingencias MTPE.', metrics: ['Planilla formal', 'Beneficios sociales', 'Contingencias'], color: '#22c55e', num: '04' },
  { area: 'Gestión Empresarial', description: 'Nivel gerencial, planificación estratégica, toma de decisiones y visión de negocio.', metrics: ['Planificación', 'Indicadores KPI', 'Estrategia'], color: '#f97316', num: '05' },
  { area: 'Control Operativo', description: 'Sistematización de procesos, control interno, documentación y dependencia operativa.', metrics: ['Procesos documentados', 'Control interno', 'Automatización'], color: '#eab308', num: '06' },
]
export function Features() {
  return (
    <section id="características" className="py-20 relative">
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-cyan-accent/10 border border-cyan-accent/20 rounded-full px-4 py-1.5 text-xs font-inter text-cyan-accent uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-accent animate-pulse" />
            Áreas de Diagnóstico
          </div>
          <h2 className="font-rajdhani font-bold text-3xl text-white">Qué analiza <span className="text-holographic">CORE FINANZAS</span></h2>
          <p className="text-white/50 font-inter text-base max-w-xl mx-auto">Análisis 360° que cubre las 6 dimensiones críticas del negocio.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => (
            <div key={i} className="group relative p-6 rounded-xl border border-white/8 bg-navy-mid/40 hover:bg-navy-surface/60 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 overflow-hidden">
              <div className="absolute top-4 right-4 font-rajdhani font-bold text-4xl text-white/4 leading-none select-none">{f.num}</div>
              <div className="w-12 h-12 rounded-xl mb-5 flex items-center justify-center" style={{ background: `${f.color}15`, border: `1px solid ${f.color}25` }}>
                <span className="text-xl">{['📋','📊','💳','👥','🎯','⚙️'][i]}</span>
              </div>
              <h3 className="font-rajdhani font-bold text-white text-xl mb-2 tracking-wide">{f.area}</h3>
              <p className="text-white/50 font-inter text-sm leading-relaxed mb-4">{f.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {f.metrics.map((m) => (
                  <span key={m} className="text-xs font-inter px-2 py-0.5 rounded-full" style={{ color: f.color, background: `${f.color}12`, border: `1px solid ${f.color}25` }}>{m}</span>
                ))}
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px opacity-0 group-hover:opacity-60 transition-opacity" style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
