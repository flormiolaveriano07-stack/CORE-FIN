'use client'
import { useState } from 'react'
import type { TaxData } from '@/lib/types'

function CurrencyInput({ label, value, onChange, help }: { label: string; value: string; onChange: (val: string) => void; help?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-white/70 text-xs font-inter uppercase tracking-wider">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 font-inter text-sm">S/.</span>
        <input type="number" value={value} onChange={(e) => onChange(e.target.value)} placeholder="0.00" min="0" step="100"
          className="input-premium w-full h-12 pl-10 pr-4 rounded-xl font-inter text-sm" />
      </div>
      {help && <p className="text-white/35 font-inter text-xs">{help}</p>}
    </div>
  )
}

export function StepTributario({ onComplete, onBack }: { onComplete: (data: TaxData) => void; onBack: () => void }) {
  const [form, setForm] = useState({ ventasUltimoMes: '', comprasUltimoMes: '', igvAproximado: '', trabajadoresAproximados: '', utilidadAproximada: '' })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (field === 'ventasUltimoMes') {
      const igv = parseFloat(value) * 0.18
      if (!isNaN(igv)) setForm((prev) => ({ ...prev, [field]: value, igvAproximado: igv.toFixed(0) }))
    }
  }

  const validate = () => {
    const newErrors: Record<string, string> = {}
    if (!form.ventasUltimoMes) newErrors.ventas = 'Ingresa las ventas del último mes'
    if (!form.trabajadoresAproximados) newErrors.trabajadores = 'Ingresa el número de trabajadores'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onComplete({
      ventasUltimoMes: parseFloat(form.ventasUltimoMes) || 0,
      comprasUltimoMes: parseFloat(form.comprasUltimoMes) || 0,
      igvAproximado: parseFloat(form.igvAproximado) || 0,
      trabajadoresAproximados: parseInt(form.trabajadoresAproximados) || 0,
      utilidadAproximada: parseFloat(form.utilidadAproximada) || 0,
    })
  }

  return (
    <div className="max-w-lg mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4" style={{ background: 'rgba(60,160,180,0.15)', border: '1px solid rgba(60,160,180,0.3)' }}>
          <svg className="w-7 h-7 text-cyan-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" /></svg>
        </div>
        <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Datos Tributarios Básicos</h2>
        <p className="text-white/50 font-inter text-sm leading-relaxed">Información aproximada del último mes. No se requiere clave SOL ni acceso a declaraciones.</p>
      </div>
      <div className="glass rounded-2xl p-6 border border-white/10 space-y-5">
        <CurrencyInput label="Ventas del último mes *" value={form.ventasUltimoMes} onChange={(v) => set('ventasUltimoMes', v)} help="Total de ventas o ingresos del mes anterior" />
        {errors.ventas && <p className="text-red-400 text-xs font-inter -mt-3">{errors.ventas}</p>}
        <CurrencyInput label="Compras del último mes" value={form.comprasUltimoMes} onChange={(v) => set('comprasUltimoMes', v)} help="Total de compras o gastos del mes" />
        <CurrencyInput label="IGV declarado aproximado" value={form.igvAproximado} onChange={(v) => set('igvAproximado', v)} help="Se calcula automáticamente (18% de ventas). Puedes ajustarlo." />
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="block text-white/70 text-xs font-inter uppercase tracking-wider">Trabajadores *</label>
            <input type="number" value={form.trabajadoresAproximados} onChange={(e) => set('trabajadoresAproximados', e.target.value)} placeholder="0" min="0" className="input-premium w-full h-12 px-4 rounded-xl font-inter text-sm" />
            {errors.trabajadores && <p className="text-red-400 text-xs font-inter">{errors.trabajadores}</p>}
          </div>
          <div className="space-y-1.5">
            <label className="block text-white/70 text-xs font-inter uppercase tracking-wider">Utilidad aprox.</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 font-inter text-sm">S/.</span>
              <input type="number" value={form.utilidadAproximada} onChange={(e) => set('utilidadAproximada', e.target.value)} placeholder="0.00" step="100" className="input-premium w-full h-12 pl-10 pr-4 rounded-xl font-inter text-sm" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-start gap-3 p-4 rounded-xl bg-white/3 border border-white/8">
        <svg className="w-4 h-4 text-cyan-accent flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
        <p className="text-white/40 font-inter text-xs leading-relaxed">Estos datos son confidenciales y solo se utilizan para calcular tu score diagnóstico. No se almacenan ni comparten con terceros.</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onBack} className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-rajdhani font-semibold uppercase tracking-wider text-sm transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Volver
        </button>
        <button onClick={handleSubmit} className="flex-1 flex items-center justify-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 shadow-glow-blue text-sm">
          Continuar al Cuestionario
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
        </button>
      </div>
    </div>
  )
}
