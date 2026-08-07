import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CORE FINANZAS — Diagnóstico Empresarial Inteligente',
  description: 'Diagnóstico estratégico para identificar riesgos tributarios, financieros, laborales y operativos en empresas peruanas.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-navy-deep text-white font-inter antialiased">
        <div className="scan-line" />
        {children}
      </body>
    </html>
  )
}
