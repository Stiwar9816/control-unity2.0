import * as XLSX from 'xlsx'

export const importData = async (file: File) => {
  try {
    // Leer el archivo Excel
    console.log('Comenzando la importación de datos')
    const workbook = XLSX.read(file, { type: 'array' })

    // Obtener la primera hoja del libro de trabajo
    const sheetName = workbook.SheetNames[0]
    const worksheet = workbook.Sheets[sheetName]

    // Convertir los datos de la hoja en un array de objetos
    const data: any[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as any[][]

    console.log('Data from Excel:', data)

    console.log('Data processed successfully')
  } catch (error: any) {
    console.error('Error al importar datos desde Excel', error)
  }
}
