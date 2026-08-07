'use client'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'

const radarData = [
  { area: 'Tributario', score: 68 }, { area: 'Financiero', score: 72 },
  { area: 'Tesorería', score: 55 }, { area: 'Laboral', score: 81 },
  { area: 'Operativo', score: 59 }, { area: 'Gestión', score: 70 },
]

const LOCKED_KPIS = [
  { label: 'EVA — Valor Económico Agregado', cat: 'Financiero', color: '#3CA0B4' },
  { label: 'EBITDA Ajustado', cat: 'Financiero', color: '#3CA0B4' },
  { label: 'ROE — Retorno sobre Patrimonio', cat: 'Financiero', color: '#3CA0B4' },
  { label: 'ROA — Retorno sobre Activos', cat: 'Financiero', color: '#3CA0B4' },
  { label: 'Índice de Stress Financiero', cat: 'Riesgo', color: '#ef4444' },
  { label: 'Score Predictivo SUNAT', cat: 'Tributario', color: '#f97316' },
  { label: 'Score Bancario Estimado', cat: 'Crediticio', color: '#9859FF' },
  { label: 'Simulación Flujo de Caja 12M', cat: 'Proyección', color: '#22c55e' },
  { label: 'Mapa de Contingencias Legal', cat: 'Legal', color: '#eab308' },
  { label: 'Planeamiento Tributario Anual', cat: 'Tributario', color: '#f97316' },
  { label: 'Dashboard Financiero Ejecutivo', cat: 'Reportes', color: '#1428DC' },
]

export function PreviewReport() {
  return (
    <section id="preview" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(20,40,220,0.1) 0%, transparent 60%)' }} />
      <div className="relative max-w-7xl mx-auto px-6">
        <div className="text-center mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 bg-yellow-500/10 border border-yellow-500/20 rounded-full px-4 py-1.5 text-xs font-inter text-yellow-400 uppercase tracking-widest">
            🔒 Informe Ejecutivo Premium
          </div>
          <h2 className="font-rajdhani font-bold text-3xl text-white">Vista previa del <span className="text-holographic">Informe Completo</span></h2>
          <p className="text-white/50 font-inter text-base max-w-2xl mx-auto">KPIs avanzados, proyecciones y planeamiento tributario disponibles con el informe premium.</p>
        </div>
        <div className="grid lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-3 space-y-5">
            <div className="glass rounded-2xl p-6 border border-white/8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-rajdhani font-bold text-white text-base tracking-wide">Perfil de Madurez Empresarial</h3>
                  <p className="text-white/40 text-xs font-inter">Diagnóstico multidimensional · Preview</p>
                </div>
                <span className="text-xs font-inter text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-1 rounded-full">DEMO</span>
              </div>
              <div className="h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'Inter' }} />
                    <Radar name="Score" dataKey="score" stroke="#3CA0B4" fill="#3CA0B4" fillOpacity={0.15} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <div className="glass rounded-2xl p-6 border border-white/8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-rajdhani font-bold text-white text-base">Scores por Área (Demo)</h3>
                <span className="text-xs text-yellow-400 font-inter bg-yellow-400/10 px-2 py-0.5 rounded-full border border-yellow-400/20">Preview</span>
              </div>
              <div className="space-y-3">
                {radarData.map((d) => {
                  const c = d.score >= 75 ? '#22c55e' : d.score >= 50 ? '#eab308' : '#f97316'
                  return (
                    <div key={d.area} className="flex items-center gap-3">
                      <span className="text-white/50 text-xs font-inter w-20 flex-shrink-0">{d.area}</span>
                      <div className="flex-1 h-2 bg-white/6 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${d.score}%`, background: c }} />
                      </div>
                      <span className="text-xs font-rajdhani font-bold w-7 text-right" style={{ color: c }}>{d.score}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="glass rounded-2xl p-5 border border-white/8 h-full">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-sm">🔒</span>
                <h3 className="font-rajdhani font-bold text-white text-sm tracking-wide uppercase">KPIs Premium Bloqueados</h3>
              </div>
              <div className="space-y-2">
                {LOCKED_KPIS.map((kpi) => (
                  <div key={kpi.label} className="relative flex items-center gap-2.5 p-3 rounded-lg bg-white/3 border border-white/8 overflow-hidden">
                    <div className="absolute inset-0 bg-navy-deep/55 backdrop-blur-[2px]" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white/25 text-xs font-inter">🔒 Premium</span>
                    </div>
                    <div className="relative w-3 h-3 rounded-full flex-shrink-0" style={{ background: kpi.color }} />
                    <span className="relative text-white/20 font-inter text-xs truncate">{kpi.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-white/10 p-8 text-center"
          style={{ background: 'linear-gradient(135deg, rgba(20,40,220,0.2), rgba(60,160,180,0.08))' }}>
          <div className="absolute inset-0 grid-overlay opacity-40" />
          <div className="relative space-y-4">
            <h3 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Desbloquea el Análisis Ejecutivo Completo</h3>
            <p className="text-white/50 font-inter text-sm max-w-lg mx-auto">EVA, EBITDA, ROE, ROA, stress financiero, planeamiento tributario, simulación de flujo de caja y más.</p>
            <div className="flex flex-wrap gap-3 justify-center mt-4">
              <button className="flex items-center gap-2 text-white font-rajdhani font-semibold uppercase tracking-widest px-8 py-3.5 rounded-md shadow-glow-blue text-sm transition-all hover:scale-105" style={{ background: 'linear-gradient(135deg, #1428DC, #3CA0B4, #9859FF)' }}>
                🔓 Desbloquear Análisis Completo
              </button>
              <a href="/diagnostico" className="flex items-center gap-2 bg-transparent border border-white/20 hover:border-white/40 text-white font-rajdhani font-semibold uppercase tracking-widest px-6 py-3.5 rounded-md text-sm transition-all">
                Iniciar Diagnóstico Gratuito
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
