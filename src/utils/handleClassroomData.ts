// Store
import { useClassroomsStore } from '@/stores'

export const handleClassroomData = async (rowData: any) => {
  try {
    // Initialization Store
    const room = useClassroomsStore()
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
  } catch (error) {
    console.error('Error al agregar los salones:', error)
  }
}
