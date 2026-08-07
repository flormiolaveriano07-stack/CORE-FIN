import { Navbar } from '@/components/landing/Navbar'
import { Hero } from '@/components/landing/Hero'
import { Problems } from '@/components/landing/Problems'
import { Features } from '@/components/landing/Features'
import { HowItWorks } from '@/components/landing/HowItWorks'
import { PreviewReport } from '@/components/landing/PreviewReport'
import { Footer } from '@/components/landing/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-navy-deep text-white">
      <Navbar />
      <main>
        <Hero />
        <Problems />
        <Features />
        <HowItWorks />
        <PreviewReport />
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(20,40,220,0.15) 0%, transparent 70%)' }} />
          <div className="absolute inset-0 grid-overlay opacity-30" />
          <div className="relative max-w-3xl mx-auto px-6 text-center space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-blue-primary/10 border border-blue-primary/25 rounded-full px-4 py-1.5 text-xs font-inter text-blue-light uppercase tracking-widest">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-primary animate-pulse" />
                Diagnóstico Gratuito
              </div>
              <h2 className="font-rajdhani font-bold text-white leading-tight" style={{ fontSize: 'clamp(28px, 4vw, 42px)' }}>
                ¿Sabes realmente cuál es el <span className="text-holographic"> estado financiero</span> de tu empresa?
              </h2>
              <p className="text-white/50 font-inter text-base leading-relaxed max-w-xl mx-auto">
                En menos de 10 minutos tendrás un diagnóstico empresarial completo, con CORE Score™, riesgos detectados y recomendaciones accionables.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/diagnostico" className="flex items-center gap-2.5 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold uppercase tracking-widest px-8 py-4 rounded-md transition-all duration-200 shadow-glow-blue text-sm">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                Iniciar Diagnóstico Gratuito
              </a>
            </div>
            <div className="flex flex-wrap gap-6 justify-center pt-2">
              {[{ icon: '🔒', text: '100% Confidencial' }, { icon: '⚡', text: 'Resultado en minutos' }, { icon: '🤖', text: 'IA Consultiva' }, { icon: '🇵🇪', text: 'Adaptado a Peru' }].map((item) => (
                <div key={item.text} className="flex items-center gap-2 text-white/35 font-inter text-sm"><span>{item.icon}</span><span>{item.text}</span></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
