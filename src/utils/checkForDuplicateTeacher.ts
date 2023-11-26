// Store
import { useTeacherStore } from '@/stores'
// Types
import type { TeacherRow } from '@/types'

export const checkForDuplicateTeacher = async (rowData: TeacherRow) => {
  try {
    const teacherStore = useTeacherStore()
    const ccValue = rowData['C.C']

    const existingTeachers = await teacherStore.getTeacherByCc(ccValue)

    return existingTeachers.length > 0 ? existingTeachers[0] : null
  } catch (error) {
    console.error('Error al verificar duplicados:', error)
    return null // Devuelve null en caso de error
  }
}
