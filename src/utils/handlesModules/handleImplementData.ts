// Store
import type { Ref } from 'vue'
import { useImplementsStore } from '@/stores'
// Utils
import { checkForDuplicate, handleData } from '..'
// Types
import type { ImplementRow } from '@/types'

export const handleImplementData = async (
  rowData: ImplementRow,
  showSnackbar: Ref<boolean>,
  message: Ref<string>,
  color: Ref<string>,
  existingImplementNames: string[]
) => {
  try {
    // Initialization Store
    const implement = useImplementsStore()
    // Obtener el UUID del responsable
    const responsibleName = rowData['Responsable']
    const responsibleUUID = await implement.getResponsibleUUID(responsibleName)
    await handleData(
      rowData,
      showSnackbar,
      message,
      color,
      existingImplementNames,
      implement,
      'getImplementBySerial',
      'Serial',
      (rowData: ImplementRow) => ({
        name: rowData['Nombre'],
        serial: rowData['Serial'],
        manufacturer: rowData['Marca'],
        type: rowData['Tipo'],
        model: rowData['Modelo'],
        location: rowData['Ubicación'],
        responsible: responsibleUUID,
        note: rowData['Nota'],
        status: rowData['Estado']
      }),
      'addImplement',
      'name', // Nombre del valor que se usará para el mensaje
      'Implemento(s)' // Mensaje en caso de existencia
    )
  } catch (error: any) {
    throw new Error(`Error al agregar los datos de los implementos: ${error.message}`)
  }
}