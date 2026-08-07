import type { DiagnosticoInput, DiagnosticoResult, CategoryScore, Risk, Opportunity, Recommendation, SunatData, TaxData, QuestionnaireAnswer } from './types'

function calcSunatScore(sunat: SunatData): number {
  let s = 0
  if (sunat.estadoContribuyente?.toUpperCase() === 'ACTIVO') s += 10
  if (sunat.condicionHabido?.toUpperCase() === 'HABIDO') s += 10
  if (!sunat.cobranzaCoactiva) s += 8
  const r = (sunat.regimen || '').toUpperCase()
  if (r.includes('MYPE') || r.includes('ESPECIAL') || r.includes('GENERAL')) s += 7
  else if (r.includes('RUS') || r.includes('SIMPLIFICADO')) s += 4
  else s += 3
  return Math.round((s / 35) * 100)
}

function calcTaxScore(tax: TaxData): number {
  let s = 0
  if (tax.ventasUltimoMes > 0) s += 5
  const ratio = tax.ventasUltimoMes > 0 ? tax.comprasUltimoMes / tax.ventasUltimoMes : 0
  if (ratio >= 0.3 && ratio <= 0.85) s += 8
  else if (ratio > 0 && ratio < 1) s += 4
  if (tax.trabajadoresAproximados >= 5) s += 7
  else if (tax.trabajadoresAproximados >= 2) s += 5
  else if (tax.trabajadoresAproximados >= 1) s += 3
  if (tax.utilidadAproximada > 0) s += 5
  return Math.round((s / 25) * 100)
}

function avgCategory(answers: QuestionnaireAnswer[], cat: string): number {
  const a = answers.filter((x) => x.category === cat)
  if (!a.length) return 50
  return Math.round(a.reduce((s, x) => s + x.score, 0) / a.length)
}

function calcNivel(score: number): 'optimo' | 'moderado' | 'critico' | 'alerta' {
  if (score >= 75) return 'optimo'
  if (score >= 50) return 'moderado'
  if (score >= 25) return 'critico'
  return 'alerta'
}

function detectRisks(sunat: SunatData, tax: TaxData, cats: Record<string, number>): Risk[] {
  const risks: Risk[] = []
  if (sunat.estadoContribuyente?.toUpperCase() !== 'ACTIVO')
    risks.push({ id: 'estado', titulo: 'Contribuyente con Estado Inactivo', descripcion: `Estado "${sunat.estadoContribuyente}" ante SUNAT puede generar restricciones operativas y bancarias.`, severidad: 'critico', categoria: 'Tributario', accion: 'Regularizar estado ante SUNAT inmediatamente.' })
  if (sunat.condicionHabido?.toUpperCase() !== 'HABIDO')
    risks.push({ id: 'habido', titulo: 'Condición NO HABIDO', descripcion: 'Figura como NO HABIDO en SUNAT, bloqueando comprobantes y acceso a crédito.', severidad: 'critico', categoria: 'Tributario', accion: 'Actualizar dirección fiscal y regularizar condición.' })
  if (sunat.cobranzaCoactiva)
    risks.push({ id: 'coactiva', titulo: 'Cobranza Coactiva Activa', descripcion: 'Procesos de cobranza coactiva pueden derivar en embargo de cuentas y bienes.', severidad: 'critico', categoria: 'Tributario', accion: 'Fraccionar deuda o negociar con SUNAT urgentemente.' })
  if (cats.financiero < 50)
    risks.push({ id: 'fin', titulo: 'Estructura Financiera Débil', descripcion: 'Indicadores financieros sugieren estructura frágil que limita acceso a financiamiento.', severidad: cats.financiero < 30 ? 'alto' : 'medio', categoria: 'Financiero', accion: 'Implementar contabilidad gerencial y control de indicadores.' })
  if (cats.laboral < 60)
    risks.push({ id: 'lab', titulo: 'Contingencia Laboral', descripcion: 'Brechas en formalización laboral exponen a auditorías del MTPE y SUNAFIL.', severidad: cats.laboral < 40 ? 'alto' : 'medio', categoria: 'Laboral', accion: 'Auditar planilla y regularizar relaciones laborales.' })
  if (cats.operativo < 55)
    risks.push({ id: 'oper', titulo: 'Alta Dependencia Operativa', descripcion: 'Empresa depende excesivamente de una persona clave, riesgo de continuidad.', severidad: 'medio', categoria: 'Operativo', accion: 'Documentar procesos y delegar funciones operativas clave.' })
  if (tax.utilidadAproximada < 0)
    risks.push({ id: 'utilidad', titulo: 'Operación en Pérdida', descripcion: 'Datos sugieren utilidad negativa, comprometiendo la sostenibilidad del negocio.', severidad: 'critico', categoria: 'Financiero', accion: 'Analizar estructura de costos y revisar pricing urgentemente.' })
  return risks
}

function detectOpps(sunat: SunatData, cats: Record<string, number>): Opportunity[] {
  const opps: Opportunity[] = []
  const r = (sunat.regimen || '').toUpperCase()
  if (r.includes('RUS') || r.includes('SIMPLIFICADO'))
    opps.push({ id: 'regimen', titulo: 'Oportunidad de Cambio de Régimen', descripcion: 'Migrar al Régimen MYPE Tributario puede reducir la carga impositiva.', impacto: 'alto', categoria: 'Tributario' })
  if (cats.financiero >= 60)
    opps.push({ id: 'credito', titulo: 'Perfil para Crédito Formal', descripcion: 'Perfil financiero permite explorar líneas bancarias para expansión.', impacto: 'alto', categoria: 'Financiero' })
  if (cats.gestion < 70)
    opps.push({ id: 'gestion', titulo: 'Formalización de Gestión Empresarial', descripcion: 'Tablero de KPIs básicos multiplica la capacidad decisional del equipo.', impacto: 'medio', categoria: 'Gestión' })
  opps.push({ id: 'mype', titulo: 'Beneficios Régimen MYPE', descripcion: 'Accede a regímenes especiales, financiamiento y beneficios laborales reducidos.', impacto: 'medio', categoria: 'Tributario' })
  opps.push({ id: 'digital', titulo: 'Digitalización de Procesos', descripcion: 'Herramientas digitales de control pueden reducir costos operativos 15-25%.', impacto: 'medio', categoria: 'Operativo' })
  return opps
}

function genRecs(risks: Risk[], cats: Record<string, number>): Recommendation[] {
  const recs: Recommendation[] = []
  if (risks.some((r) => r.categoria === 'Tributario' && r.severidad === 'critico'))
    recs.push({ id: 'trib-urgent', titulo: 'Regularización Tributaria Urgente', descripcion: 'Observaciones críticas ante SUNAT requieren atención inmediata para evitar sanciones mayores.', prioridad: 'urgente', categoria: 'Tributario', plazo: '0-30 días' })
  if (cats.financiero < 60)
    recs.push({ id: 'cont-ger', titulo: 'Implementar Contabilidad Gerencial', descripcion: 'Separar contabilidad tributaria de gerencial permite decisiones basadas en datos reales.', prioridad: 'alta', categoria: 'Financiero', plazo: '1-2 meses' })
  if (cats.laboral < 65)
    recs.push({ id: 'planilla', titulo: 'Formalización Laboral Progresiva', descripcion: 'Plan de formalización gradual reduce riesgos y mejora acceso a financiamiento.', prioridad: 'alta', categoria: 'Laboral', plazo: '1-3 meses' })
  if (cats.operativo < 65)
    recs.push({ id: 'procesos', titulo: 'Sistematización de Procesos', descripcion: 'Mapear y documentar procesos clave reduce dependencia del dueño y aumenta eficiencia.', prioridad: 'media', categoria: 'Operativo', plazo: '2-4 meses' })
  recs.push({ id: 'premium', titulo: 'Diagnóstico Financiero Profundo', descripcion: 'El análisis completo con EVA, EBITDA y planeamiento tributario permite decisiones estratégicas.', prioridad: 'alta', categoria: 'General', plazo: 'Inmediato' })
  return recs
}

function calcMadurez(score: number) {
  if (score >= 80) return { nivel: 5, label: 'Empresa Consolidada', descripcion: 'Estructura sólida con procesos maduros y alta capacidad de crecimiento.' }
  if (score >= 65) return { nivel: 4, label: 'En Crecimiento', descripcion: 'Empresa con bases sólidas y oportunidades claras de optimización.' }
  if (score >= 50) return { nivel: 3, label: 'En Desarrollo', descripcion: 'Empresa funcional con brechas importantes que limitan el crecimiento.' }
  if (score >= 35) return { nivel: 2, label: 'Básica', descripcion: 'Operaciones básicas activas pero con riesgos significativos que atender.' }
  return { nivel: 1, label: 'Incipiente', descripcion: 'Empresa con vulnerabilidades críticas que requieren atención urgente.' }
}

export function calcularDiagnostico(input: DiagnosticoInput): DiagnosticoResult {
  const { sunat, taxData, answers } = input
  const sunatScore = calcSunatScore(sunat)
  const taxScore = calcTaxScore(taxData)
  const qTrib = avgCategory(answers, 'tributario')
  const qFin = avgCategory(answers, 'financiero')
  const qLab = avgCategory(answers, 'laboral')
  const qOper = avgCategory(answers, 'operativo')
  const qGest = avgCategory(answers, 'gestion')

  const catScores = {
    tributario: Math.round(sunatScore * 0.5 + qTrib * 0.5),
    financiero: Math.round(taxScore * 0.4 + qFin * 0.6),
    laboral: qLab,
    operativo: qOper,
    gestion: qGest,
    tesoreria: Math.round(taxScore * 0.5 + qFin * 0.3 + qOper * 0.2),
  }

  const coreScore = Math.round(
    sunatScore * 0.35 +
    taxScore * 0.25 +
    ((qTrib + qFin + qLab + qOper + qGest) / 5) * 0.40
  )

  const categorias: CategoryScore[] = [
    { categoria: 'Tributario', score: catScores.tributario, nivel: calcNivel(catScores.tributario), descripcion: 'Cumplimiento tributario y riesgo SUNAT' },
    { categoria: 'Financiero', score: catScores.financiero, nivel: calcNivel(catScores.financiero), descripcion: 'Estructura y salud financiera' },
    { categoria: 'Tesorería', score: catScores.tesoreria, nivel: calcNivel(catScores.tesoreria), descripcion: 'Liquidez y gestión de caja' },
    { categoria: 'Laboral', score: catScores.laboral, nivel: calcNivel(catScores.laboral), descripcion: 'Formalización y cumplimiento laboral' },
    { categoria: 'Operativo', score: catScores.operativo, nivel: calcNivel(catScores.operativo), descripcion: 'Procesos y control operativo' },
    { categoria: 'Gestión', score: catScores.gestion, nivel: calcNivel(catScores.gestion), descripcion: 'Madurez gerencial y estrategia' },
  ]

  const riesgos = detectRisks(sunat, taxData, catScores)
  const oportunidades = detectOpps(sunat, catScores)
  const recomendaciones = genRecs(riesgos, catScores)
  const madureza = calcMadurez(coreScore)

  return {
    coreScore: Math.min(coreScore, 100),
    nivel: calcNivel(coreScore),
    nivelLabel: { optimo: 'ÓPTIMO', moderado: 'MODERADO', critico: 'CRÍTICO', alerta: 'ALERTA' }[calcNivel(coreScore)],
    categorias, riesgos, oportunidades, recomendaciones, madureza,
    empresa: { nombre: sunat.razonSocial, ruc: sunat.ruc, regimen: sunat.regimen, estado: sunat.estadoContribuyente },
  }
}
