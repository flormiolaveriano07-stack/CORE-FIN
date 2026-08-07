'use client'
import { useState } from 'react'
import Link from 'next/link'
import { StepIndicator } from '@/components/ui/StepIndicator'
import { StepRUC } from '@/components/diagnostico/StepRUC'
import { StepTributario } from '@/components/diagnostico/StepTributario'
import { StepCuestionario } from '@/components/diagnostico/StepCuestionario'
import { StepResultados } from '@/components/diagnostico/StepResultados'
import type { SunatData, TaxData, QuestionnaireAnswer, DiagnosticoResult } from '@/lib/types'

const STEPS = [
  { number: 1, label: 'Validación RUC' },
  { number: 2, label: 'Datos Básicos' },
  { number: 3, label: 'Cuestionario' },
  { number: 4, label: 'Diagnóstico' },
]

type Processing = { state: 'idle' } | { state: 'loading' } | { state: 'error'; message: string }

export default function DiagnosticoPage() {
  const [step, setStep] = useState(1)
  const [sunatData, setSunatData] = useState<SunatData | null>(null)
  const [taxData, setTaxData] = useState<TaxData | null>(null)
  const [processing, setProcessing] = useState<Processing>({ state: 'idle' })
  const [result, setResult] = useState<DiagnosticoResult | null>(null)

  const handleSunatComplete = (data: SunatData) => { setSunatData(data); setStep(2) }
  const handleTaxComplete = (data: TaxData) => { setTaxData(data); setStep(3) }

  const handleQuestionnaireComplete = async (answers: QuestionnaireAnswer[]) => {
    if (!sunatData || !taxData) return
    setProcessing({ state: 'loading' }); setStep(4)
    try {
      const res = await fetch('/api/diagnostico', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ sunat: sunatData, taxData, answers }) })
      const json = await res.json()
      if (!json.success) throw new Error(json.error || 'Error al procesar')
      setResult(json.data); setProcessing({ state: 'idle' })
    } catch (err) {
      setProcessing({ state: 'error', message: err instanceof Error ? err.message : 'Error al generar el diagnóstico.' })
    }
  }

  const handleRestart = () => { setStep(1); setSunatData(null); setTaxData(null); setResult(null); setProcessing({ state: 'idle' }) }

  return (
    <div className="min-h-screen bg-navy-deep relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 60% 0%, rgba(20,40,220,0.08), transparent 60%)' }} />
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />
      <header className="relative border-b border-white/6 bg-navy-deep/80 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-7 h-7 rounded-lg bg-holographic flex items-center justify-center shadow-glow-blue">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <span className="font-rajdhani font-bold text-white text-sm tracking-widest uppercase">CORE FINANZAS</span>
          </Link>
          <div className="flex items-center gap-2 text-white/40 font-inter text-xs">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            Diagnóstico en Curso
          </div>
        </div>
      </header>
      <main className="relative py-10 px-6">
        <div className="max-w-5xl mx-auto">
          {step !== 4 || processing.state === 'loading' ? (
            <div className="mb-10 flex justify-center"><StepIndicator steps={STEPS} currentStep={step} /></div>
          ) : null}
          {step === 1 && <StepRUC onComplete={handleSunatComplete} />}
          {step === 2 && sunatData && <StepTributario onComplete={handleTaxComplete} onBack={() => setStep(1)} />}
          {step === 3 && <StepCuestionario onComplete={handleQuestionnaireComplete} onBack={() => setStep(2)} />}
          {step === 4 && (
            <>
              {processing.state === 'loading' && (
                <div className="max-w-md mx-auto text-center space-y-8 py-16">
                  <div className="relative w-32 h-32 mx-auto">
                    <svg className="w-full h-full animate-spin" style={{ animationDuration: '3s' }} viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(20,40,220,0.15)" strokeWidth="6" />
                      <circle cx="50" cy="50" r="42" fill="none" stroke="#1428DC" strokeWidth="6" strokeDasharray="60 204" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-xl bg-holographic flex items-center justify-center shadow-glow-blue">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Procesando Diagnóstico</h2>
                    <p className="text-white/50 font-inter text-sm">El sistema está calculando el CORE Score™ y generando los insights de tu empresa...</p>
                  </div>
                  <div className="space-y-2 text-left max-w-xs mx-auto">
                    {['Analizando datos SUNAT', 'Calculando score tributario', 'Evaluando estructura financiera', 'Generando recomendaciones', 'Activando IA consultiva'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-4 h-4 rounded-full bg-blue-primary/20 border border-blue-primary/40 flex items-center justify-center flex-shrink-0">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-primary animate-pulse" style={{ animationDelay: `${i * 0.3}s` }} />
                        </div>
                        <span className="text-white/50 font-inter text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {processing.state === 'error' && (
                <div className="max-w-md mx-auto text-center space-y-6 py-16">
                  <div className="w-16 h-16 rounded-2xl bg-red-500/15 border border-red-500/25 flex items-center justify-center mx-auto">
                    <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-rajdhani font-bold text-white text-xl">Error en el Diagnóstico</h3>
                    <p className="text-white/50 font-inter text-sm">{processing.message}</p>
                  </div>
                  <button onClick={handleRestart} className="inline-flex items-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest px-6 py-3 rounded-xl shadow-glow-blue text-sm transition-all">Reintentar</button>
                </div>
              )}
              {processing.state === 'idle' && result && <StepResultados result={result} onRestart={handleRestart} />}
            </>
          )}
        </div>
      </main>
    </div>
  )
}
