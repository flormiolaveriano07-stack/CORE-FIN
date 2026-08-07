'use client'
import { useState } from 'react'
import { QUESTIONS, CATEGORIES } from '@/lib/questionnaire'
import type { QuestionnaireAnswer } from '@/lib/types'

const CATEGORY_COLORS: Record<string, string> = {
  tributario: '#1428DC', financiero: '#3CA0B4', laboral: '#22c55e', operativo: '#f97316', gestion: '#9859FF',
}

export function StepCuestionario({ onComplete, onBack }: { onComplete: (answers: QuestionnaireAnswer[]) => void; onBack: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, { score: number; value: string }>>({})
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [animating, setAnimating] = useState(false)

  const total = QUESTIONS.length
  const current = QUESTIONS[currentIndex]
  const isLast = currentIndex === total - 1
  const categoryColor = CATEGORY_COLORS[current.category] || '#1428DC'
  const categoryLabel = CATEGORIES.find((c) => c.id === current.category)?.label || ''
  const progress = (currentIndex / total) * 100

  const handleSelect = (value: string, score: number) => {
    setSelectedOption(value)
    setAnswers((prev) => ({ ...prev, [current.id]: { score, value } }))
  }

  const handleNext = () => {
    if (!selectedOption || animating) return
    if (isLast) {
      const finalAnswers: QuestionnaireAnswer[] = QUESTIONS.map((q) => ({
        questionId: q.id, category: q.category,
        score: answers[q.id]?.score ?? 50, value: answers[q.id]?.value ?? '',
      }))
      onComplete(finalAnswers)
      return
    }
    setAnimating(true)
    setTimeout(() => {
      setCurrentIndex((i) => i + 1)
      const nextQ = QUESTIONS[currentIndex + 1]
      setSelectedOption(answers[nextQ?.id]?.value ?? null)
      setAnimating(false)
    }, 220)
  }

  const handleBack = () => {
    if (currentIndex === 0) { onBack(); return }
    setAnimating(true)
    setTimeout(() => {
      setCurrentIndex((i) => i - 1)
      const prevQ = QUESTIONS[currentIndex - 1]
      setSelectedOption(answers[prevQ?.id]?.value ?? null)
      setAnimating(false)
    }, 150)
  }

  const categoryProgress = CATEGORIES.map((cat) => {
    const catQs = QUESTIONS.filter((q) => q.category === cat.id)
    const answered = catQs.filter((q) => answers[q.id]).length
    return { ...cat, total: catQs.length, answered }
  })

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center space-y-1">
        <h2 className="font-rajdhani font-bold text-white text-2xl tracking-wide">Cuestionario Consultivo</h2>
        <p className="text-white/40 font-inter text-sm">Pregunta {currentIndex + 1} de {total} · Responde con honestidad para un diagnóstico preciso</p>
      </div>
      <div className="flex gap-2 justify-center flex-wrap">
        {categoryProgress.map((cat) => (
          <div key={cat.id} className="flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-inter"
            style={{ borderColor: cat.id === current.category ? cat.color : 'rgba(255,255,255,0.1)', background: cat.id === current.category ? `${cat.color}15` : 'transparent', color: cat.id === current.category ? cat.color : 'rgba(255,255,255,0.35)' }}>
            <span>{cat.answered}/{cat.total}</span><span>{cat.label}</span>
          </div>
        ))}
      </div>
      <div className="h-1.5 bg-white/8 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: `linear-gradient(90deg, #1428DC, ${categoryColor})` }} />
      </div>
      <div className="glass rounded-2xl p-7 border border-white/10 transition-all duration-200 space-y-6"
        style={{ opacity: animating ? 0 : 1, transform: animating ? 'translateX(8px)' : 'translateX(0)' }}>
        <div className="flex items-center gap-2">
          <div className="h-5 w-1 rounded-full" style={{ background: categoryColor }} />
          <span className="text-xs font-rajdhani font-semibold uppercase tracking-widest" style={{ color: categoryColor }}>{categoryLabel}</span>
        </div>
        <div className="space-y-2">
          <h3 className="font-rajdhani font-bold text-white text-xl leading-snug">{current.question}</h3>
          {current.help && <p className="text-white/40 font-inter text-sm leading-relaxed">{current.help}</p>}
        </div>
        <div className="space-y-3">
          {current.options.map((option) => {
            const isSelected = selectedOption === option.value
            return (
              <button key={option.value} onClick={() => handleSelect(option.value, option.score)}
                className="w-full text-left p-4 rounded-xl border transition-all duration-200"
                style={{ background: isSelected ? `${categoryColor}15` : 'rgba(255,255,255,0.03)', borderColor: isSelected ? `${categoryColor}60` : 'rgba(255,255,255,0.08)', boxShadow: isSelected ? `0 0 20px ${categoryColor}20` : 'none' }}>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200"
                    style={{ borderColor: isSelected ? categoryColor : 'rgba(255,255,255,0.2)', background: isSelected ? categoryColor : 'transparent' }}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <span className="font-inter text-sm leading-relaxed transition-colors duration-200" style={{ color: isSelected ? '#fff' : 'rgba(255,255,255,0.65)' }}>{option.label}</span>
                </div>
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={handleBack} className="flex items-center gap-2 px-5 py-3.5 rounded-xl border border-white/15 hover:border-white/30 text-white/70 hover:text-white font-rajdhani font-semibold uppercase tracking-wider text-sm transition-all duration-200">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" /></svg>
          Anterior
        </button>
        <button onClick={handleNext} disabled={!selectedOption}
          className="flex-1 flex items-center justify-center gap-2 text-white font-rajdhani font-semibold uppercase tracking-widest py-3.5 rounded-xl transition-all duration-200 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          style={{ background: selectedOption ? '#1428DC' : 'rgba(20,40,220,0.3)', boxShadow: selectedOption ? '0 0 20px rgba(20,40,220,0.4)' : 'none' }}>
          {isLast ? (<>Generar Diagnóstico <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg></>) : (<>Siguiente <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg></>)}
        </button>
      </div>
      {!selectedOption && <p className="text-center text-white/25 font-inter text-xs">Selecciona una respuesta para continuar</p>}
    </div>
  )
}
