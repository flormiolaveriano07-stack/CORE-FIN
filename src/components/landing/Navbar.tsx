'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-deep/90 backdrop-blur-xl border-b border-white/6' : 'bg-transparent'}`}>
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-holographic flex items-center justify-center shadow-glow-blue">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-rajdhani font-bold text-white text-sm tracking-widest uppercase">CORE</span>
            <span className="font-rajdhani font-medium text-cyan-accent text-xs tracking-[0.2em] uppercase">FINANZAS</span>
          </div>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {['Características', 'Cómo funciona', 'Vista previa'].map((item) => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s/g,'').replace(/[áéíóú]/g, c => ({á:'a',é:'e',í:'i',ó:'o',ú:'u'}[c]||c))}`}
              className="text-white/55 hover:text-white font-inter text-sm transition-colors duration-200">{item}</a>
          ))}
        </div>
        <Link href="/diagnostico" className="flex items-center gap-2 bg-blue-primary hover:bg-blue-light text-white font-rajdhani font-semibold text-sm uppercase tracking-widest px-5 py-2.5 rounded-md transition-all duration-200 shadow-glow-blue">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          Iniciar Diagnóstico
        </Link>
      </nav>
    </header>
  )
}
