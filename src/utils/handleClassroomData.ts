// Store
import { useClassroomsStore } from '@/stores'
// Utils
import { checkForDuplicateRoom } from './checkForDuplicateRoom'
// Types
import type { ClassroomRow } from '@/types'

export const handleClassroomData = async (
  rowData: ClassroomRow,
  showSnackbar: any,
  message: any,
  color: any,
  existingRoomNames: string[]
) => {
  try {
    // Initialization Store
    const room = useClassroomsStore()
    const existingRoom = await checkForDuplicateRoom(rowData)
    if (!existingRoom) {
      const classroomData = {
        nomenclature: rowData['Nomenclatura'],
        location: rowData['Ubicación'],
        tech_resources: rowData['Recursos tecnológicos'],
        connectivity: rowData['Conectividad'],
        ability: rowData['Capacidad'],
        status: rowData['Estado']
      }
      // Agregar datos de los salones
      await room.addRoom(classroomData)
      showSnackbar.value = true
      message.value = `Salón(es) agregado(s): ${classroomData.nomenclature}`
      color.value = 'tradewind600'
    } else {
      if (existingRoom.nomenclature) {
        existingRoomNames.push(existingRoom.nomenclature) // Agrega el nombre al array
        showSnackbar.value = true
        message.value = `Salón(es) ya existe(n): ${existingRoomNames.join(', ')}` // Une los nombres
        color.value = 'red-darken-4'
      }
    }
  } catch (error: any) {
    throw new Error(`'Error al agregar los salones:', ${error.message}`)
  }
}
