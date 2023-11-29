// Types
import type { TeacherRow, ImplementRow, ClassroomRow } from '@/types'

// Función para validar duplicados y mostrar alertas
export const handleDuplicate = async (
  checkDuplicateFunction: any,
  rowData: any,
  index: number,
  alertMessage: Function
) => {
  if (checkDuplicateFunction) {
    const isDuplicate = await checkDuplicateFunction(rowData)
    if (isDuplicate && isDuplicate.length > 0) {
      alert(alertMessage(index, isDuplicate[0]))
      return true // Indica que hay un duplicado
    }
  }
  return false // Indica que no hay duplicado
}
// Función para construir el mensaje de alerta para docentes duplicados
export const buildTeacherAlertMessage = (index: number, duplicateTeacher: TeacherRow) => {
  const teacherName = duplicateTeacher.name
  return `La fila ${index + 1} está duplicada. El docente ${teacherName} ya existe.`
}
export const buildImplementAlertMessage = (index: number, duplicateImplement: ImplementRow) => {
  const implementName = duplicateImplement.name
  return `La fila ${index + 1} está duplicada. El implemento ${implementName} ya existe.`
}
export const buildClassrommAlertMessage = (index: number, duplicateRoom: ClassroomRow) => {
  const roomNomenclature = duplicateRoom.nomenclature
  return `La fila ${index + 1} está duplicada. El salón ${roomNomenclature} ya existe.`
}
