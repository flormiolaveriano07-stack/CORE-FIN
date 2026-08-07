'use client'
import { useState, useRef, useEffect } from 'react'
import type { SunatData } from '@/lib/types'

type VS = 'idle' | 'validating' | 'success' | 'error' | 'manual'

export function StepRUC({ onComplete }: { onComplete: (data: SunatData) => void }) {
  const [ruc, setRuc] = useState('')
  const [state, setState] = useState<VS>('idle')
  const [error, setError] = useState('')
  const [sunatData, setSunatData] = useState<SunatData | null>(null)
  const [manualMode, setManualMode] = useState(false)
  const [manual, setManual] = useState({ razonSocial: '', regimen: '', estadoContribuyente: 'ACTIVO', condicionHabido: 'HABIDO', actividadEconomica: '' })
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => { inputRef.current?.focus() }, [])

  const fetchRUC = async (v: string) => {
    setState('validating'); setError('')
    try {
      const res = await fetch(`/api/sunat?ruc=${v}`)
      const json = await res.json()
      if (json.success && json.data) { setState('success'); setSunatData(json.data) }
      else if (json.fallback) { setState('manual'); setManualMode(true); setError(json.error) }
      else { setState('error'); setError(json.error || 'RUC no válido.') }
    } catch { setState('manual'); setManualMode(true); setError('No pudimos validar automáticamente el RUC. Puedes continuar manualmente.') }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, '').slice(0, 11)
    setRuc(v)
    if (v.length < 11) { setState('idle'); setError(''); setSunatData(null); setManualMode(false) }
    if (v.length === 11) fetchRUC(v)
  }

  const handleManualContinue = () => {
    if (!manual.razonSocial.trim()) { setError('La Razón Social es obligatoria.'); return }
    onComplete({ ruc, razonSocial: manual.razonSocial, estadoContribuyente: manual.estadoContribuyente, condicionDomicilio: 'HABIDO', condicionHabido: manual.condicionHabido, fechaInscripcion: '', fechaInicioActividades: '', actividadEconomica: manual.actividadEconomica, ciiu: '', tipoContribuyente: '', regimen: manual.regimen, sistemaEmision: '', sistemaContabilidad: '', direccion: '', departamento: '', provincia: '', distrito: '', cobranzaCoactiva: false, source: 'manual' })
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: 'rgba(20,40,220,0.15)', border: '1px solid rgba(20,40,220,0.3)' }}>
          <svg className="w-7 h-7 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Validación con SUNAT</h2>
        <p className="text-white/50 font-inter text-sm leading-relaxed">Ingresa el RUC de tu empresa. El sistema se conectará automáticamente a SUNAT para extraer la información oficial.</p>
      </div>

      <div className="space-y-3">
        <label className="block text-white/70 font-inter text-xs uppercase tracking-wider">Número de RUC</label>
        <div className="relative">
          <input ref={inputRef} type="text" value={ruc} onChange={handleChange} placeholder="20XXXXXXXXX" maxLength={11}
            className="input-premium w-full h-14 px-4 pr-12 rounded-xl font-rajdhani font-semibold text-xl" style={{ letterSpacing: '0.2em' }} />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {state === 'validating' && <div className="flex gap-1"><span className="loading-dot h-1.5 w-1.5 rounded-full bg-blue-light" /><span className="loading-dot h-1.5 w-1.5 rounded-full bg-blue-light" /><span className="loading-dot h-1.5 w-1.5 rounded-full bg-blue-light" /></div>}
            {state === 'success' && <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
            {state === 'error' && <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}
          </div>
        </div>
        <div className="flex gap-1">{Array.from({ length: 11 }).map((_, i) => (<div key={i} className="h-0.5 flex-1 rounded-full transition-all" style={{ background: i < ruc.length ? '#1428DC' : 'rgba(255,255,255,0.1)' }} />))}</div>
      </div>

      {state === 'validating' && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-primary/10 border border-blue-primary/20">
          <div className="flex gap-1"><span className="loading-dot h-2 w-2 rounded-full bg-blue-primary" /><span className="loading-dot h-2 w-2 rounded-full bg-blue-primary" /><span className="loading-dot h-2 w-2 rounded-full bg-blue-primary" /></div>
          <div><p className="text-white font-inter text-sm font-medium">Consultando datos SUNAT</p><p className="text-white/40 font-inter text-xs">Verificando RUC en tiempo real...</p></div>
        </div>
      )}

      {state === 'error' && (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20">
          <svg className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          <p className="text-red-400 font-inter text-sm">{error}</p>
        </div>
      )}

      {state === 'success' && sunatData && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            <p className="text-green-400 font-inter text-sm font-medium">Información validada automáticamente con SUNAT.</p>
          </div>
          <div className="glass rounded-xl p-5 border border-white/10 space-y-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-white/40 text-xs font-inter uppercase tracking-wider mb-1">Razón Social</p>
                <h3 className="font-rajdhani font-bold text-white text-lg">{sunatData.razonSocial}</h3>
              </div>
              <div className="px-2 py-1 rounded-full text-xs font-inter font-semibold flex-shrink-0"
                style={{ color: sunatData.estadoContribuyente === 'ACTIVO' ? '#22c55e' : '#ef4444', background: sunatData.estadoContribuyente === 'ACTIVO' ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${sunatData.estadoContribuyente === 'ACTIVO' ? 'rgba(34,197,94,0.25)' : 'rgba(239,68,68,0.25)'}` }}>
                {sunatData.estadoContribuyente}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[{ l: 'RUC', v: sunatData.ruc }, { l: 'Condición', v: sunatData.condicionHabido || '—' }, { l: 'Régimen', v: sunatData.regimen || sunatData.tipoContribuyente || '—' }, { l: 'Tipo', v: sunatData.tipoContribuyente || '—' }].map((item) => (
                <div key={item.l} className="bg-white/4 rounded-lg p-3">
                  <p className="text-white/40 text-xs font-inter mb-1">{item.l}</p>
                  <p className="text-white font-inter text-sm font-medium truncate">{item.v}</p>
                </div>
              ))}
            </div>
            {sunatData.actividadEconomica && (
              <div className="bg-white/4 rounded-lg p-3">
                <p className="text-white/40 text-xs font-inter mb-1">Actividad Económica</p>
                <p className="text-white font-inter text-sm">{sunatData.actividadEconomica}</p>
              </div>
            )}
            {sunatData.cobranzaCoactiva && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <span className="text-red-400 font-inter text-xs">⚠️ Se detectó cobranza coactiva activa en SUNAT</span>
              </div>
            )}
          </div>
          <button onClick={() => onComplete(sunatData!)}
            className="w-full flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest py-4 rounded-xl transition-all shadow-glow-blue text-sm">
            Confirmar y Continuar
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      )}

      {state === 'manual' && manualMode && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <svg className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
            <p className="text-yellow-400 font-inter text-sm">{error}</p>
          </div>
          <div className="glass rounded-xl p-5 border border-white/10 space-y-4">
            <h4 className="font-rajdhani font-semibold text-white text-sm uppercase tracking-wider">Ingresa los datos manualmente</h4>
            <div>
              <label className="block text-white/60 text-xs font-inter uppercase tracking-wider mb-1.5">Razón Social *</label>
              <input type="text" value={manual.razonSocial} onChange={(e) => setManual({ ...manual, razonSocial: e.target.value })} placeholder="Mi Empresa S.A.C." className="input-premium w-full h-11 px-4 rounded-lg text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-white/60 text-xs font-inter uppercase tracking-wider mb-1.5">Régimen</label>
                <select value={manual.regimen} onChange={(e) => setManual({ ...manual, regimen: e.target.value })} className="input-premium w-full h-11 px-3 rounded-lg text-sm" style={{ background: '#050A1E' }}>
                  <option value="">Seleccionar</option>
                  <option value="RUS">Nuevo RUS</option>
                  <option value="RER">Régimen Especial</option>
                  <option value="MYPE">Régimen MYPE</option>
                  <option value="GENERAL">Régimen General</option>
                </select>
              </div>
              <div>
                <label className="block text-white/60 text-xs font-inter uppercase tracking-wider mb-1.5">Estado</label>
                <select value={manual.estadoContribuyente} onChange={(e) => setManual({ ...manual, estadoContribuyente: e.target.value })} className="input-premium w-full h-11 px-3 rounded-lg text-sm" style={{ background: '#050A1E' }}>
                  <option value="ACTIVO">ACTIVO</option>
                  <option value="SUSPENDIDO">SUSPENDIDO</option>
                  <option value="BAJA">DE BAJA</option>
                </select>
              </div>
            </div>
          </div>
          {error && !error.includes('SUNAT') && !error.includes('validar') && <p className="text-red-400 font-inter text-sm">{error}</p>}
          <button onClick={handleManualContinue}
            className="w-full flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest py-4 rounded-xl transition-all shadow-glow-blue text-sm">
            Continuar con Datos Manuales
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </button>
        </div>
      )}
      <p className="text-center text-white/25 font-inter text-xs">Solo datos públicos SUNAT · Sin clave SOL · Sin acceso a declaraciones</p>
    </div>
  )
}
