'use client'
export function Footer() {
  return (
    <footer className="border-t border-white/6 py-10 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-holographic flex items-center justify-center shadow-glow-blue">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <span className="font-rajdhani font-bold text-white tracking-widest text-sm">CORE FINANZAS</span>
          </div>
          <p className="text-white/25 font-inter text-xs text-center">© 2024 CORE FINANZAS — Diagnóstico Empresarial Inteligente para empresas peruanas.</p>
          <div className="flex items-center gap-4 text-white/25 font-inter text-xs">
            <span>API <span className="text-cyan-accent">SUNAT</span></span>
            <span>IA <span className="text-cyan-accent">Claude</span></span>
          </div>
        </div>
      </div>
    </footer>
  )
}
