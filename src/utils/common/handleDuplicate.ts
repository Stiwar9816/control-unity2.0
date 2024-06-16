//  Types
import type { TeacherRow, ImplementRow, ClassroomRow, CurriculumRow } from '@/types'

//  Función para validar duplicados y mostrar alertas
export const handleDuplicate = async (
  checkDuplicateFunction: any,
  rowData: any,
  index: number,
  getDuplicateName: Function,
  duplicateNames: string[]
) => {
  if (checkDuplicateFunction) {
    const isDuplicate = await checkDuplicateFunction(rowData)
    if (Array.isArray(isDuplicate) && isDuplicate.length > 0) {
      duplicateNames.push(getDuplicateName(isDuplicate[0]))
      return true //Indica que hay un duplicado
    } else if (isDuplicate) {
      // Manejo del caso en que isDuplicate no es un array, pero es verdadero
      duplicateNames.push(getDuplicateName(isDuplicate))
      return true //Indica que hay un duplicado
    }
  }
  return false // Indica que no hay duplicado
}

export const getTeacherName = (duplicateTeacher: TeacherRow) => duplicateTeacher.name
export const getImplementName = (duplicateImplement: ImplementRow) => duplicateImplement.name
export const getClassroomName = (duplicateRoom: ClassroomRow) => duplicateRoom.nomenclature
export const getCurriculumName = (duplicateCurriculum: CurriculumRow) => duplicateCurriculum.subject
