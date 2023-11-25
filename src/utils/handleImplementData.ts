// Store
import { useImplementsStore } from '@/stores'

export const handleImplementData = async (rowData: any) => {
  try {
    // Initialization Store
    const implement = useImplementsStore()
    // Obtener el UUID del responsable
    const responsibleName = rowData['Responsable']
    const responsibleUUID = await implement.getResponsibleUUID(responsibleName)

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
  } catch (error: any) {
    throw new Error(`'Error al agregar los implementos:', ${error.message}`)
  }
}
