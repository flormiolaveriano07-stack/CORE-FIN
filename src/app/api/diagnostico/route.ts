import { NextRequest, NextResponse } from 'next/server'
import { calcularDiagnostico } from '@/lib/scoring'
import type { DiagnosticoInput } from '@/lib/types'

export async function POST(request: NextRequest) {
  try {
    const body: DiagnosticoInput = await request.json()
    if (!body.sunat || !body.taxData || !body.answers)
      return NextResponse.json({ error: 'Datos incompletos.' }, { status: 400 })

    const result = calcularDiagnostico(body)
    let narrativaIA: string | undefined

    if (process.env.ANTHROPIC_API_KEY) {
      try {
        const Anthropic = (await import('@anthropic-ai/sdk')).default
        const client = new Anthropic()
        const msg = await client.messages.create({
          model: 'claude-haiku-4-5-20251001',
          max_tokens: 500,
          messages: [{
            role: 'user',
            content: `Actúa como consultor financiero senior especializado en empresas peruanas.
NO recalcules indicadores. NO inventes datos. Analiza únicamente:

EMPRESA: ${result.empresa.nombre} | RUC: ${result.empresa.ruc}
RÉGIMEN: ${result.empresa.regimen} | ESTADO: ${result.empresa.estado}
CORE SCORE™: ${result.coreScore}/100 — ${result.nivelLabel}
SCORES: ${result.categorias.map((c) => `${c.categoria}:${c.score}`).join(', ')}
RIESGOS (${result.riesgos.length}): ${result.riesgos.map((r) => r.titulo).join('; ')}
OPORTUNIDADES (${result.oportunidades.length}): ${result.oportunidades.map((o) => o.titulo).join('; ')}
MADUREZ: Nivel ${result.madureza.nivel}/5 — ${result.madureza.label}

Genera diagnóstico ejecutivo (max 200 palabras) con tono corporativo premium:
1. Contexto general de la empresa (2-3 oraciones)
2. 2-3 hallazgos clave del diagnóstico
3. Principal oportunidad estratégica
4. Recomendación prioritaria clara`
          }]
        })
        const c = msg.content[0]
        narrativaIA = c.type === 'text' ? c.text : undefined
      } catch { /* AI narrative is optional */ }
    }

    return NextResponse.json({ success: true, data: { ...result, narrativaIA } })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'Error interno.' }, { status: 500 })
  }
}
