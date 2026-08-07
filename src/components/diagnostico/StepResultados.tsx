'use client'
import { useState } from 'react'
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts'
import { ScoreGauge } from '@/components/ui/ScoreGauge'
import type { DiagnosticoResult } from '@/lib/types'

const SEVERITY_CONFIG = {
  critico: { label: 'CRÍTICO', color: '#ef4444', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.25)' },
  alto: { label: 'ALTO', color: '#f97316', bg: 'rgba(249,115,22,0.12)', border: 'rgba(249,115,22,0.25)' },
  medio: { label: 'MEDIO', color: '#eab308', bg: 'rgba(234,179,8,0.12)', border: 'rgba(234,179,8,0.25)' },
  bajo: { label: 'BAJO', color: '#22c55e', bg: 'rgba(34,197,94,0.12)', border: 'rgba(34,197,94,0.25)' },
}

const IMPACT_CONFIG = {
  alto: { label: 'IMPACTO ALTO', color: '#22c55e' },
  medio: { label: 'IMPACTO MEDIO', color: '#eab308' },
  bajo: { label: 'IMPACTO BAJO', color: '#3CA0B4' },
}

const PRIORITY_CONFIG = {
  urgente: { label: 'URGENTE', color: '#ef4444' },
  alta: { label: 'PRIORIDAD ALTA', color: '#f97316' },
  media: { label: 'PRIORIDAD MEDIA', color: '#eab308' },
  baja: { label: 'PRIORIDAD BAJA', color: '#3CA0B4' },
}

const LOCKED_KPIS = [
  { label: 'EVA — Valor Económico Agregado', cat: 'Financiero' },
  { label: 'EBITDA Ajustado', cat: 'Financiero' },
  { label: 'ROE — Retorno sobre Patrimonio', cat: 'Financiero' },
  { label: 'ROA — Retorno sobre Activos', cat: 'Financiero' },
  { label: 'Índice de Stress Financiero', cat: 'Riesgo' },
  { label: 'Score Predictivo SUNAT', cat: 'Tributario' },
  { label: 'Score Bancario Estimado', cat: 'Crediticio' },
  { label: 'Simulación Flujo de Caja 12M', cat: 'Proyección' },
  { label: 'Mapa de Contingencias Legal', cat: 'Legal' },
  { label: 'Planeamiento Tributario Anual', cat: 'Tributario' },
  { label: 'Dashboard Financiero Ejecutivo', cat: 'Reportes' },
]

function getNivelColor(nivel: string) {
  switch (nivel) {
    case 'optimo': return '#22c55e'
    case 'moderado': return '#eab308'
    case 'critico': return '#f97316'
    case 'alerta': return '#ef4444'
    default: return '#3CA0B4'
  }
}

function MadurezBar({ nivel }: { nivel: number }) {
  return (
    <div className="flex gap-1.5 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="h-2 flex-1 rounded-full transition-all duration-700"
          style={{ background: i < nivel ? 'linear-gradient(90deg, #1428DC, #3CA0B4)' : 'rgba(255,255,255,0.08)', boxShadow: i < nivel ? '0 0 6px rgba(20,40,220,0.4)' : 'none' }} />
      ))}
    </div>
  )
}

export function StepResultados({ result, onRestart }: { result: DiagnosticoResult; onRestart: () => void }) {
  const [activeTab, setActiveTab] = useState<'resumen' | 'riesgos' | 'oportunidades' | 'recomendaciones'>('resumen')
  const radarData = result.categorias.map((c) => ({ area: c.categoria, score: c.score }))
  const nivelColor = getNivelColor(result.nivel)

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-xs font-inter text-green-400 uppercase tracking-widest mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
          Diagnóstico Completado
        </div>
        <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Diagnóstico Empresarial</h2>
        <p className="text-white/50 font-inter text-sm">{result.empresa.nombre} · RUC {result.empresa.ruc}</p>
      </div>

      <div className="rounded-2xl p-6 border border-white/10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20,40,220,0.15), rgba(12,18,64,0.8))' }}>
        <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
        <div className="relative flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <ScoreGauge score={result.coreScore} size={160} label="CORE SCORE™" sublabel={result.nivelLabel} animated />
          </div>
          <div className="flex-1 space-y-4 text-center sm:text-left">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-rajdhani font-bold uppercase tracking-widest mb-2"
                style={{ color: nivelColor, background: `${nivelColor}15`, border: `1px solid ${nivelColor}30` }}>
                <div className="w-2 h-2 rounded-full" style={{ background: nivelColor }} />
                {result.nivelLabel}
              </div>
              <h3 className="font-rajdhani font-bold text-white text-xl">{result.madureza.label}</h3>
              <p className="text-white/50 font-inter text-sm mt-1 leading-relaxed">{result.madureza.descripcion}</p>
            </div>
            <div className="space-y-2">
              <p className="text-white/40 text-xs font-inter uppercase tracking-wider">Madurez Empresarial</p>
              <MadurezBar nivel={result.madureza.nivel} />
              <div className="flex justify-between text-xs font-inter text-white/25"><span>Incipiente</span><span>Consolidada</span></div>
            </div>
            <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
              <div className="text-center"><p className="font-rajdhani font-bold text-2xl text-red-400">{result.riesgos.length}</p><p className="text-white/40 text-xs font-inter">Riesgos</p></div>
              <div className="text-center"><p className="font-rajdhani font-bold text-2xl text-green-400">{result.oportunidades.length}</p><p className="text-white/40 text-xs font-inter">Oportunidades</p></div>
              <div className="text-center"><p className="font-rajdhani font-bold text-2xl text-cyan-accent">{result.recomendaciones.length}</p><p className="text-white/40 text-xs font-inter">Recomendaciones</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-5">
        <div className="glass rounded-2xl p-5 border border-white/10">
          <h3 className="font-rajdhani font-semibold text-white text-sm uppercase tracking-wider mb-4">Perfil Multidimensional</h3>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.08)" />
                <PolarAngleAxis dataKey="area" tick={{ fill: 'rgba(255,255,255,0.55)', fontSize: 11, fontFamily: 'Inter' }} />
                <Radar name="Score" dataKey="score" stroke="#3CA0B4" fill="#3CA0B4" fillOpacity={0.15} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass rounded-2xl p-5 border border-white/10 space-y-3">
          <h3 className="font-rajdhani font-semibold text-white text-sm uppercase tracking-wider mb-4">Scores por Área</h3>
          {result.categorias.map((cat) => {
            const c = getNivelColor(cat.nivel)
            return (
              <div key={cat.categoria}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-white/70 font-inter text-sm">{cat.categoria}</span>
                  <span className="font-rajdhani font-bold text-sm" style={{ color: c }}>{cat.score}</span>
                </div>
                <div className="h-2 bg-white/6 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${cat.score}%`, background: c, boxShadow: `0 0 6px ${c}80` }} />
                </div>
                <p className="text-white/25 font-inter text-xs mt-0.5">{cat.descripcion}</p>
              </div>
            )
          })}
        </div>
      </div>

      {result.narrativaIA && (
        <div className="glass rounded-2xl p-6 border border-cyan-accent/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-accent/40 to-transparent" />
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-accent/15 border border-cyan-accent/25 flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-4 h-4 text-cyan-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
            </div>
            <div>
              <p className="text-cyan-accent font-rajdhani font-semibold text-sm uppercase tracking-wider mb-2">Análisis Consultivo — IA</p>
              <p className="text-white/70 font-inter text-sm leading-relaxed whitespace-pre-line">{result.narrativaIA}</p>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div className="flex gap-1 p-1 bg-white/4 rounded-xl border border-white/8">
          {([{ id: 'resumen', label: 'Resumen' }, { id: 'riesgos', label: `Riesgos (${result.riesgos.length})` }, { id: 'oportunidades', label: `Oportunidades (${result.oportunidades.length})` }, { id: 'recomendaciones', label: 'Recomendaciones' }] as const).map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 py-2 px-3 rounded-lg text-xs font-rajdhani font-semibold uppercase tracking-wider transition-all duration-200"
              style={{ background: activeTab === tab.id ? '#1428DC' : 'transparent', color: activeTab === tab.id ? '#fff' : 'rgba(255,255,255,0.45)', boxShadow: activeTab === tab.id ? '0 0 16px rgba(20,40,220,0.3)' : 'none' }}>
              {tab.label}
            </button>
          ))}
        </div>
        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
          {activeTab === 'resumen' && (
            <div className="p-6 space-y-4">
              <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">Hallazgos Principales</h3>
              {result.riesgos.filter((r) => r.severidad === 'critico').length > 0 && (
                <div className="p-4 rounded-xl bg-red-500/8 border border-red-500/20 space-y-2">
                  <p className="text-red-400 font-rajdhani font-semibold text-sm uppercase tracking-wide">⚠️ Atención Urgente Requerida</p>
                  {result.riesgos.filter((r) => r.severidad === 'critico').map((r) => (
                    <p key={r.id} className="text-white/70 font-inter text-sm flex items-start gap-2"><span className="text-red-500 flex-shrink-0">•</span>{r.titulo}</p>
                  ))}
                </div>
              )}
              <div className="grid sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl bg-white/4 border border-white/8 text-center">
                  <p className="font-rajdhani font-bold text-2xl" style={{ color: nivelColor }}>{result.coreScore}</p>
                  <p className="text-white/50 font-inter text-xs mt-1">CORE Score™</p>
                </div>
                <div className="p-4 rounded-xl bg-white/4 border border-white/8 text-center">
                  <p className="font-rajdhani font-bold text-2xl text-white">{result.madureza.nivel}<span className="text-white/30 text-sm">/5</span></p>
                  <p className="text-white/50 font-inter text-xs mt-1">Madurez</p>
                </div>
                <div className="p-4 rounded-xl bg-white/4 border border-white/8 text-center">
                  <p className="font-rajdhani font-bold text-2xl" style={{ color: nivelColor }}>{result.nivelLabel}</p>
                  <p className="text-white/50 font-inter text-xs mt-1">Estado</p>
                </div>
              </div>
              <p className="text-white/50 font-inter text-sm leading-relaxed">
                {result.madureza.descripcion} Con un CORE Score™ de{' '}
                <span style={{ color: nivelColor }} className="font-semibold">{result.coreScore}/100</span>, tu empresa se ubica en el nivel {result.nivelLabel.toLowerCase()}. Existen{' '}
                <span className="text-red-400 font-medium">{result.riesgos.length} riesgos</span> detectados y{' '}
                <span className="text-green-400 font-medium">{result.oportunidades.length} oportunidades</span> estratégicas que abordar de manera prioritaria.
              </p>
            </div>
          )}
          {activeTab === 'riesgos' && (
            <div className="p-6 space-y-4">
              <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">Riesgos Detectados</h3>
              {result.riesgos.length === 0 ? (
                <div className="text-center py-8"><div className="text-4xl mb-2">✅</div><p className="text-green-400 font-rajdhani font-semibold text-lg">Sin riesgos críticos detectados</p><p className="text-white/40 font-inter text-sm">Tu empresa presenta un perfil de bajo riesgo.</p></div>
              ) : result.riesgos.map((risk) => {
                const cfg = SEVERITY_CONFIG[risk.severidad]
                return (
                  <div key={risk.id} className="p-4 rounded-xl border space-y-2" style={{ background: cfg.bg, borderColor: cfg.border }}>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-rajdhani font-bold text-white text-base">{risk.titulo}</h4>
                      <span className="text-xs font-rajdhani font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: cfg.color, background: cfg.bg, border: `1px solid ${cfg.border}` }}>{cfg.label}</span>
                    </div>
                    <p className="text-white/60 font-inter text-sm leading-relaxed">{risk.descripcion}</p>
                    <div className="flex items-start gap-2 pt-1">
                      <svg className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: cfg.color }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
                      <p className="text-xs font-inter" style={{ color: cfg.color }}>{risk.accion}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
          {activeTab === 'oportunidades' && (
            <div className="p-6 space-y-4">
              <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">Oportunidades Estratégicas</h3>
              {result.oportunidades.map((opp) => {
                const cfg = IMPACT_CONFIG[opp.impacto]
                return (
                  <div key={opp.id} className="p-4 rounded-xl border border-white/10 bg-white/4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-rajdhani font-bold text-white text-base">{opp.titulo}</h4>
                      <span className="text-xs font-rajdhani font-bold uppercase tracking-wider px-2 py-0.5 rounded-full flex-shrink-0" style={{ color: cfg.color, background: `${cfg.color}12`, border: `1px solid ${cfg.color}30` }}>{cfg.label}</span>
                    </div>
                    <p className="text-white/60 font-inter text-sm leading-relaxed">{opp.descripcion}</p>
                    <span className="text-xs font-inter text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">{opp.categoria}</span>
                  </div>
                )
              })}
            </div>
          )}
          {activeTab === 'recomendaciones' && (
            <div className="p-6 space-y-4">
              <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">Recomendaciones Prioritarias</h3>
              {result.recomendaciones.map((rec, i) => {
                const cfg = PRIORITY_CONFIG[rec.prioridad]
                return (
                  <div key={rec.id} className="flex gap-4 p-4 rounded-xl border border-white/8 bg-white/3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-rajdhani font-bold text-sm" style={{ background: `${cfg.color}15`, color: cfg.color, border: `1.5px solid ${cfg.color}40` }}>{i + 1}</div>
                    <div className="space-y-1.5 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-rajdhani font-bold text-white text-base">{rec.titulo}</h4>
                        <span className="text-xs font-rajdhani font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ color: cfg.color, background: `${cfg.color}12`, border: `1px solid ${cfg.color}25` }}>{cfg.label}</span>
                      </div>
                      <p className="text-white/60 font-inter text-sm leading-relaxed">{rec.descripcion}</p>
                      <div className="flex gap-2">
                        <span className="text-xs font-inter text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">{rec.categoria}</span>
                        <span className="text-xs font-inter text-white/30 bg-white/5 px-2 py-0.5 rounded-full border border-white/8">⏱ {rec.plazo}</span>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(20,40,220,0.15), rgba(5,10,30,0.9))' }}>
        <div className="p-6 border-b border-white/8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-lg bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center">
              <svg className="w-4 h-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
            </div>
            <div>
              <h3 className="font-rajdhani font-bold text-white text-lg tracking-wide">Análisis Premium Bloqueado 🔒</h3>
              <p className="text-white/40 font-inter text-xs">11 KPIs avanzados disponibles</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            {LOCKED_KPIS.map((kpi) => (
              <div key={kpi.label} className="relative flex items-center gap-2.5 p-3 rounded-lg bg-white/3 border border-white/8 overflow-hidden">
                <div className="absolute inset-0 bg-navy-deep/40 backdrop-blur-[2px]" />
                <div className="relative flex items-center gap-2 w-full">
                  <svg className="w-3.5 h-3.5 text-white/20 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  <span className="text-white/30 font-inter text-xs truncate">{kpi.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="p-6 text-center space-y-4">
          <p className="text-white/50 font-inter text-sm">Accede al informe ejecutivo completo con EVA, EBITDA, planeamiento tributario y proyección de flujo de caja.</p>
          <button className="inline-flex items-center gap-2.5 bg-holographic text-white font-rajdhani font-semibold uppercase tracking-widest px-8 py-3.5 rounded-xl shadow-glow-blue text-sm transition-all duration-200 hover:scale-105">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2z" /></svg>
            Desbloquear Análisis Completo
          </button>
        </div>
      </div>

      <div className="flex gap-3 justify-center pb-4">
        <button onClick={onRestart} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-rajdhani font-semibold uppercase tracking-wider text-sm transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          Nuevo Diagnóstico
        </button>
        <button onClick={() => window.print()} className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/15 hover:border-white/30 text-white/60 hover:text-white font-rajdhani font-semibold uppercase tracking-wider text-sm transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
          Imprimir
        </button>
      </div>
    </div>
  )
}
