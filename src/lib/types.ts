export interface SunatData {
  ruc: string
  razonSocial: string
  estadoContribuyente: string
  condicionDomicilio: string
  condicionHabido: string
  fechaInscripcion: string
  fechaInicioActividades: string
  actividadEconomica: string
  ciiu: string
  tipoContribuyente: string
  regimen: string
  sistemaEmision: string
  sistemaContabilidad: string
  direccion: string
  departamento: string
  provincia: string
  distrito: string
  cobranzaCoactiva: boolean
  trabajadoresDeclarados?: number
  representanteLegal?: string
  source?: 'api' | 'manual'
}

export interface TaxData {
  ventasUltimoMes: number
  comprasUltimoMes: number
  igvAproximado: number
  trabajadoresAproximados: number
  utilidadAproximada: number
}

export interface QuestionnaireAnswer {
  questionId: string
  category: 'tributario' | 'financiero' | 'laboral' | 'operativo' | 'gestion'
  score: number
  value: string
}

export interface DiagnosticoInput {
  sunat: SunatData
  taxData: TaxData
  answers: QuestionnaireAnswer[]
}

export interface CategoryScore {
  categoria: string
  score: number
  nivel: 'optimo' | 'moderado' | 'critico' | 'alerta'
  descripcion: string
}

export interface Risk {
  id: string
  titulo: string
  descripcion: string
  severidad: 'critico' | 'alto' | 'medio' | 'bajo'
  categoria: string
  accion: string
}

export interface Opportunity {
  id: string
  titulo: string
  descripcion: string
  impacto: 'alto' | 'medio' | 'bajo'
  categoria: string
}

export interface Recommendation {
  id: string
  titulo: string
  descripcion: string
  prioridad: 'urgente' | 'alta' | 'media' | 'baja'
  categoria: string
  plazo: string
}

export interface MadurezEmpresarial {
  nivel: number
  label: string
  descripcion: string
}

export interface DiagnosticoResult {
  coreScore: number
  nivel: 'optimo' | 'moderado' | 'critico' | 'alerta'
  nivelLabel: string
  categorias: CategoryScore[]
  riesgos: Risk[]
  oportunidades: Opportunity[]
  recomendaciones: Recommendation[]
  madureza: MadurezEmpresarial
  narrativaIA?: string
  empresa: {
    nombre: string
    ruc: string
    regimen: string
    estado: string
  }
}
