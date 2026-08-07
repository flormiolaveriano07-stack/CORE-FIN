'use client'

export function StepIndicator({ steps, currentStep }: { steps: { number: number; label: string }[]; currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {steps.map((step, i) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center gap-1.5">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-rajdhani font-bold transition-all duration-300 ${
              currentStep === step.number
                ? 'bg-gradient-to-br from-blue-primary to-cyan-accent text-white shadow-glow-blue'
                : currentStep > step.number
                ? 'bg-cyan-accent/20 border border-cyan-accent text-cyan-accent'
                : 'bg-white/5 border border-white/10 text-white/30'
            }`}>
              {currentStep > step.number
                ? <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                : step.number}
            </div>
            <span className={`text-xs font-inter whitespace-nowrap ${currentStep >= step.number ? 'text-white/75' : 'text-white/25'}`}>{step.label}</span>
          </div>
          {i < steps.length - 1 && (
            <div className={`h-px w-12 mx-1 mb-5 transition-all duration-500 ${currentStep > step.number ? 'bg-cyan-accent' : 'bg-white/10'}`} />
          )}
        </div>
      ))}
    </div>
  )
}
