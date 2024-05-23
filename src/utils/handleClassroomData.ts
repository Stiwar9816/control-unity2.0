import type { Ref } from 'vue'
// Store
import { useClassroomsStore } from '@/stores'
// Utils
import { handleData } from './handleData'
// Types
import type { ClassroomRow } from '@/types'

export const handleClassroomData = async (
  rowData: ClassroomRow,
  showSnackbar: Ref<boolean>,
  message: Ref<string>,
  color: Ref<string>,
  existingRoomNames: string[]
) => {
  try {
    // Initialization Store
    const room = useClassroomsStore()
    await handleData(
      rowData,
      showSnackbar,
      message,
      color,
      existingRoomNames,
      room,
      'getClassroomByNomenclature',
      'Nomenclatura',
      (rowData: ClassroomRow) => ({
        nomenclature: rowData['Nomenclatura'],
        location: rowData['Ubicación'],
        tech_resources: rowData['Recursos tecnológicos'],
        connectivity: rowData['Conectividad'],
        ability: rowData['Capacidad'],
        status: rowData['Estado']
      }),
      'addRoom',
      'nomenclature', // Nombre del valor que se usará para el mensaje
      'Salón(es)' // Mensaje en caso de existencia
    )
  } catch (error: any) {
    throw new Error(`Error al agregar los salones: ${error.message}`)
  }
}
