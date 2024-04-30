// Store
import { useClassroomsStore } from '@/stores'
// Types
import type { ClassroomRow } from '@/types'

export const checkForDuplicateRoom = async (rowData: ClassroomRow) => {
  try {
    const room = useClassroomsStore()
    const nomenclatureValue = rowData['Nomenclatura']
    console.log(nomenclatureValue)
    const existingRooms = await room.getClassroomByNomenclature(nomenclatureValue)
    return existingRooms.length > 0 ? existingRooms[0] : null
  } catch (error) {
    console.error('Error al verificar duplicados:', error)
    return null // Devuelve null en caso de error
  }
}
