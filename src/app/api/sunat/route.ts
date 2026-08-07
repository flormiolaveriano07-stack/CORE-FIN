import { NextRequest, NextResponse } from 'next/server'

function validateRUC(ruc: string): boolean {
  if (!/^\d{11}$/.test(ruc)) return false
  const weights = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2]
  const digits = ruc.split('').map(Number)
  const sum = weights.reduce((acc, w, i) => acc + w * digits[i], 0)
  const rem = sum % 11
  const check = rem === 0 ? 0 : rem === 1 ? 1 : 11 - rem
  return check === digits[10]
}

async function fetchApisNetPe(ruc: string) {
  const token = process.env.APIS_NET_PE_TOKEN
  if (!token) return null
  try {
    const res = await fetch(`https://api.apis.net.pe/v2/sunat/ruc?numero=${ruc}`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 3600 },
    })
    if (!res.ok) return null
    const d = await res.json()
    return {
      ruc, razonSocial: d.razonSocial || d.nombre || '',
      estadoContribuyente: d.estado || '',
      condicionDomicilio: d.condicionDomicilio || '',
      condicionHabido: d.condicion || d.condicionHabido || '',
      fechaInscripcion: d.fechaInscripcion || '',
      fechaInicioActividades: d.fechaInicioActividades || '',
      actividadEconomica: d.actividadEconomica || d.actividad || '',
      ciiu: d.ciiu || '', tipoContribuyente: d.tipoContribuyente || '',
      regimen: d.sistemaContabilidad || d.tipoContribuyente || '',
      sistemaEmision: d.sistemaEmision || '', sistemaContabilidad: d.sistemaContabilidad || '',
      direccion: d.direccion || '', departamento: d.departamento || '',
      provincia: d.provincia || '', distrito: d.distrito || '',
      cobranzaCoactiva: d.cobranzaCoactiva === true,
      trabajadoresDeclarados: d.trabajadores,
      representanteLegal: d.representanteLegal,
      source: 'api' as const,
    }
  } catch { return null }
}

export async function GET(request: NextRequest) {
  const ruc = new URL(request.url).searchParams.get('ruc')?.trim() || ''
  if (!ruc) return NextResponse.json({ error: 'RUC es requerido' }, { status: 400 })
  if (!/^\d{11}$/.test(ruc)) return NextResponse.json({ error: 'El RUC debe tener exactamente 11 dígitos' }, { status: 422 })
  if (!validateRUC(ruc)) return NextResponse.json({ error: 'RUC no válido. Verifica el número.' }, { status: 422 })

  const data = await fetchApisNetPe(ruc)
  if (data) return NextResponse.json({ success: true, data })

  return NextResponse.json({
    success: false,
    error: 'No pudimos validar automáticamente el RUC. Puedes continuar ingresando los datos manualmente.',
    fallback: true, ruc,
  }, { status: 503 })
}
