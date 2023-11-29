// Store
import { useImplementsStore } from '@/stores'
// Utils
import { checkForDuplicateImplement } from '.'
// Types
import type { ImplementRow } from '@/types'

export const handleImplementData = async (
  rowData: ImplementRow,
  showSnackbar: any,
  message: any,
  color: any,
  existingImplementNames: string[]
) => {
  try {
    // Initialization Store
    const implement = useImplementsStore()
    // Obtener el UUID del responsable
    const responsibleName = rowData['Responsable']
    const responsibleUUID = await implement.getResponsibleUUID(responsibleName)
    const existingImplement = await checkForDuplicateImplement(rowData)
    if (!existingImplement) {
      const implementsData = {
        name: rowData['Nombre'],
        serial: rowData['Serial'],
        manufacturer: rowData['Marca'],
        type: rowData['Tipo'],
        model: rowData['Modelo'],
        location: rowData['Ubicación'],
        responsible: responsibleUUID,
        note: rowData['Nota'],
        status: rowData['Estado']
      }
      // Agregar datos de los implementos
      await implement.addImplement(implementsData)
      showSnackbar.value = true
      message.value = `Implemento(s) agregado(s): ${implementsData.name}`
      color.value = 'tradewind600'
    } else {
      if (existingImplement.name) {
        existingImplementNames.push(existingImplement.name) // Agrega el nombre al array
        showSnackbar.value = true
        message.value = `Implemento(s) ya existe(n): ${existingImplementNames.join(', ')}` // Une los nombres
        color.value = 'red-darken-4'
      }
    }
  } catch (error: any) {
    throw new Error(`'Error al agregar los implementos:', ${error.message}`)
  }
}
