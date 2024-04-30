import * as XLSX from 'xlsx'

export const determineRoute = (workbook: XLSX.WorkBook): string => {
  // Obtén el nombre de la primera hoja de cálculo
  const sheetName = workbook.SheetNames[0]
  // Ejemplo: Si el nombre de la hoja de cálculo incluye "Docentes", entonces devuelve 'teacher'
  if (sheetName.toLowerCase().includes('docentes')) {
    return 'teacher'
  } else if (sheetName.toLowerCase().includes('implementos')) {
    return 'implement'
  } else if (sheetName.toLowerCase().includes('salones')) {
    return 'classroom'
  } else {
    return 'default' // Otra ruta por defecto si no coincide con ninguna
  }
}
