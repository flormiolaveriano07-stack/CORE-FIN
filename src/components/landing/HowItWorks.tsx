'use client'
const STEPS = [
  { num: '01', title: 'Ingresas tu RUC', description: 'Solo necesitas el número de RUC. El sistema hace el resto automáticamente.', detail: 'Validación de 11 dígitos · Verificación en tiempo real', color: '#1428DC', emoji: '🔢' },
  { num: '02', title: 'El sistema valida con SUNAT', description: 'Conexión automática a datos oficiales: estado, régimen, actividad económica y más.', detail: 'API SUNAT en tiempo real · Datos oficiales al instante', color: '#3CA0B4', emoji: '🛡️' },
  { num: '03', title: 'Respondes preguntas estratégicas', description: 'Cuestionario consultivo diseñado por especialistas. 5 dimensiones empresariales clave.', detail: '13 preguntas · Diseñadas por expertos · Solo 8 minutos', color: '#9859FF', emoji: '📝' },
  { num: '04', title: 'Obtienes tu diagnóstico ejecutivo', description: 'CORE Score™, riesgos detectados, oportunidades, insights de IA y recomendaciones.', detail: 'Dashboard premium · IA consultiva · Recomendaciones accionables', color: '#22c55e', emoji: '📊' },
]
export function HowItWorks() {
  return (
    <section id="comofunciona" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-navy-mid/15" />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-blue-primary/10 border border-blue-primary/25 rounded-full px-4 py-1.5 text-xs font-inter text-blue-light uppercase tracking-widest">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-primary animate-pulse" />
            Proceso
          </div>
          <h2 className="font-rajdhani font-bold text-3xl text-white">Cómo funciona <span className="text-holographic">CORE FINANZAS</span></h2>
          <p className="text-white/50 font-inter text-base max-w-xl mx-auto">En menos de 10 minutos tendrás un diagnóstico completo. Sin contadores, sin burocracia.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, i) => (
            <div key={i} className="flex flex-col items-center text-center group">
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl transition-all duration-300 group-hover:scale-105"
                  style={{ background: `linear-gradient(135deg, ${step.color}30, ${step.color}10)`, border: `1px solid ${step.color}40`, boxShadow: `0 0 20px ${step.color}15` }}>
                  {step.emoji}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-rajdhani font-bold"
                  style={{ background: step.color, color: '#050A1E' }}>{i + 1}</div>
              </div>
              <div className="space-y-2 px-2">
                <p className="font-rajdhani font-bold text-xs uppercase tracking-widest" style={{ color: step.color }}>PASO {step.num}</p>
                <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide leading-snug">{step.title}</h3>
                <p className="text-white/50 font-inter text-sm leading-relaxed">{step.description}</p>
                <p className="font-inter text-xs leading-relaxed px-2 py-1 rounded-md" style={{ color: step.color, background: `${step.color}10`, border: `1px solid ${step.color}20` }}>{step.detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <a href="/diagnostico" className="inline-flex items-center gap-3 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest px-8 py-4 rounded-md transition-all shadow-glow-blue text-base">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            Iniciar mi Diagnóstico Ahora
          </a>
          <p className="text-white/30 font-inter text-xs mt-3">Gratuito · Sin registro previo · Sin clave SOL</p>
        </div>
      </div>
    </section>
  )
}
