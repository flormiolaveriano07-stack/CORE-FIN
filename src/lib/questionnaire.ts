export interface Option { label: string; score: number; value: string }

export interface Question {
  id: string
  category: 'tributario' | 'financiero' | 'laboral' | 'operativo' | 'gestion'
  question: string
  help?: string
  options: Option[]
}

export const QUESTIONS: Question[] = [
  { id: 'trib-01', category: 'tributario', question: '¿Tu empresa lleva contabilidad actualizada y al día?', options: [
    { label: 'Siempre, contabilidad formal y actualizada', score: 100, value: 'siempre' },
    { label: 'Generalmente sí, con algún retraso menor', score: 70, value: 'generalmente' },
    { label: 'Solo cuando hay declaraciones o auditorías', score: 35, value: 'ocasional' },
    { label: 'No llevamos contabilidad formal', score: 0, value: 'no' },
  ]},
  { id: 'trib-02', category: 'tributario', question: '¿Declaras el IGV y Renta dentro de los plazos establecidos por SUNAT?', options: [
    { label: 'Siempre dentro de los plazos', score: 100, value: 'siempre' },
    { label: 'Mayormente sí, con algún retraso ocasional', score: 65, value: 'mayormente' },
    { label: 'Con retraso frecuente', score: 30, value: 'frecuente' },
    { label: 'No declaramos regularmente', score: 0, value: 'no' },
  ]},
  { id: 'trib-03', category: 'tributario', question: '¿Has recibido notificaciones o requerimientos de SUNAT en el último año?', options: [
    { label: 'Ninguna notificación', score: 100, value: 'ninguna' },
    { label: '1-2 notificaciones informativas resueltas', score: 70, value: 'menor' },
    { label: '3 o más notificaciones o requerimientos', score: 35, value: 'varias' },
    { label: 'Estamos en proceso de fiscalización', score: 0, value: 'fiscalizacion' },
  ]},
  { id: 'fin-01', category: 'financiero', question: '¿Conoces con precisión tu margen de utilidad neta mensual?', options: [
    { label: 'Sí, lo conozco con exactitud', score: 100, value: 'exacto' },
    { label: 'Tengo una idea aproximada', score: 60, value: 'aproximado' },
    { label: 'Vagamente, no lo calculo regularmente', score: 25, value: 'vago' },
    { label: 'No lo calculo ni monitoreo', score: 0, value: 'no' },
  ]},
  { id: 'fin-02', category: 'financiero', question: '¿Tu empresa tiene acceso a financiamiento bancario o líneas de crédito?', options: [
    { label: 'Sí, con buenas condiciones y tasas', score: 100, value: 'buenas' },
    { label: 'Sí, pero con tasas altas o condiciones difíciles', score: 60, value: 'dificil' },
    { label: 'Estamos en proceso de acceder a crédito', score: 35, value: 'proceso' },
    { label: 'No tenemos acceso a crédito formal', score: 0, value: 'no' },
  ]},
  { id: 'fin-03', category: 'financiero', question: '¿Tienes separadas las finanzas personales de las de la empresa?', options: [
    { label: 'Sí, totalmente separadas', score: 100, value: 'separadas' },
    { label: 'Parcialmente separadas', score: 55, value: 'parcial' },
    { label: 'A veces mezclo ambas', score: 25, value: 'mezcla' },
    { label: 'No hay separación clara', score: 0, value: 'no' },
  ]},
  { id: 'lab-01', category: 'laboral', question: '¿Todos tus colaboradores están registrados en planilla formal?', options: [
    { label: 'Todos en planilla formal', score: 100, value: 'todos' },
    { label: 'La mayoría, algunos en recibos por honorarios', score: 65, value: 'mayoria' },
    { label: 'Pocos en planilla, mayoría informal', score: 30, value: 'minoria' },
    { label: 'Nadie en planilla formal', score: 0, value: 'ninguno' },
  ]},
  { id: 'lab-02', category: 'laboral', question: '¿Calculas y pagas correctamente los beneficios sociales (CTS, gratificaciones, vacaciones)?', options: [
    { label: 'Sí, todos correctamente y a tiempo', score: 100, value: 'correcto' },
    { label: 'Mayormente sí, con algún error menor', score: 70, value: 'mayormente' },
    { label: 'Con frecuencia cometemos errores', score: 30, value: 'errores' },
    { label: 'No calculamos beneficios sociales', score: 0, value: 'no' },
  ]},
  { id: 'oper-01', category: 'operativo', question: '¿Tu empresa tiene procesos operativos documentados y sistematizados?', options: [
    { label: 'Sí, procesos documentados y actualizados', score: 100, value: 'documentado' },
    { label: 'La mayoría de procesos están documentados', score: 70, value: 'mayoria' },
    { label: 'Solo los procesos más críticos', score: 35, value: 'criticos' },
    { label: 'No tenemos procesos documentados', score: 0, value: 'ninguno' },
  ]},
  { id: 'oper-02', category: 'operativo', question: '¿Cuentas con algún sistema de control o seguimiento de tus operaciones?', help: 'Puede ser ERP, Excel avanzado, sistema de inventarios, CRM, etc.', options: [
    { label: 'Sí, sistema digital integrado', score: 100, value: 'sistema' },
    { label: 'Control manual en Excel o similar', score: 55, value: 'excel' },
    { label: 'Estamos implementando algún sistema', score: 35, value: 'proceso' },
    { label: 'No tenemos control formal', score: 0, value: 'ninguno' },
  ]},
  { id: 'gest-01', category: 'gestion', question: '¿Tu empresa tiene un presupuesto o plan financiero anual definido?', options: [
    { label: 'Sí, presupuesto formal y detallado', score: 100, value: 'formal' },
    { label: 'Sí, un presupuesto básico', score: 65, value: 'basico' },
    { label: 'Estamos en proceso de elaborarlo', score: 35, value: 'proceso' },
    { label: 'No tenemos presupuesto', score: 0, value: 'ninguno' },
  ]},
  { id: 'gest-02', category: 'gestion', question: '¿La empresa puede operar normalmente sin tu presencia directa?', help: 'Evalúa el nivel de dependencia operativa en el dueño o gerente.', options: [
    { label: 'Sí, tenemos procesos autónomos y equipo capacitado', score: 100, value: 'autonoma' },
    { label: 'Parcialmente, algunas áreas requieren mi presencia', score: 60, value: 'parcial' },
    { label: 'Difícilmente, depende mucho de mí', score: 25, value: 'dependiente' },
    { label: 'Sin mí, la empresa no puede operar', score: 0, value: 'total' },
  ]},
  { id: 'gest-03', category: 'gestion', question: '¿Utilizas indicadores de gestión (KPIs) para tomar decisiones?', options: [
    { label: 'Sí, tablero de KPIs formal y actualizado', score: 100, value: 'formal' },
    { label: 'Algunos indicadores básicos', score: 60, value: 'basicos' },
    { label: 'Raramente, principalmente por intuición', score: 20, value: 'intuicion' },
    { label: 'No uso indicadores', score: 0, value: 'no' },
  ]},
]

export const CATEGORIES = [
  { id: 'tributario', label: 'Tributario', color: '#1428DC' },
  { id: 'financiero', label: 'Financiero', color: '#3CA0B4' },
  { id: 'laboral', label: 'Laboral', color: '#22c55e' },
  { id: 'operativo', label: 'Operativo', color: '#f97316' },
  { id: 'gestion', label: 'Gestión', color: '#9859FF' },
]
