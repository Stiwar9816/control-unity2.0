import type { Ref } from 'vue'
// xlsx / file-saver
import * as XLSX from 'xlsx'
import FileSaver from 'file-saver'

export const exportData = (
  props: any,
  tableRef: Ref<HTMLElement | null>,
  worksheetName: string,
  nameSheet: string
) => {
  try {
    if (!tableRef || !props.items || props.items.length === 0) return

    // Obtener una lista de los campos que deseas exportar
    const fieldsToExport = props.headers.filter(
      (field: any) => field.key !== 'actions' && field.title !== 'Acciones'
    )

    const data = props.items!.map((item: any) => {
      const rowData = fieldsToExport.map((field: any) => {
        // Modificar el valor de la columna 'status'
        const value =
          field.key === 'status' ? (item[field.key] ? 'Activo' : 'Inactivo') : item[field.key]
        return value !== null && typeof value !== 'object' ? value : ''
      })
      return rowData
    })
    // Obtener los encabezados personalizados
    const headers = fieldsToExport.map((field: any) => field.title)

    const worksheet = XLSX.utils.json_to_sheet([headers, ...data])
    if (worksheet['!ref']) {
      const range = XLSX.utils.decode_range(worksheet['!ref'])
      range.s.r += 1
      worksheet['!ref'] = XLSX.utils.encode_range(range)
    }
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName)
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const fileName = `${nameSheet}.xlsx`
    const file = new Blob([wbout], { type: 'application/octet-stream' })
    FileSaver.saveAs(file, fileName)
  } catch (error: any) {
    throw new Error(error.message)
  }
}
