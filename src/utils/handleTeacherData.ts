// Store
import { useTeacherStore } from '@/stores'
// Utils
import { checkForDuplicateTeacher } from '.'
// Types
import type { TeacherRow } from '@/types'

export const handleTeacherData = async (
  rowData: TeacherRow,
  showSnackbar: any,
  message: any,
  color: any,
  existingTeacherNames: string[]
) => {
  try {
    const teacher = useTeacherStore()
    const existingTeacher = await checkForDuplicateTeacher(rowData)
    if (!existingTeacher) {
      // Si no existe, agrégalo
      const teacherData = {
        cc: rowData['C.C'],
        name: rowData['Nombre Completo'],
        email: rowData['Correo electronico'],
        phone: rowData['Teléfono'],
        status: rowData['Estado']
      }
      await teacher.addTeacher(teacherData)
      showSnackbar.value = true
      message.value = `Docente(s) agregado(s): ${teacherData.name}`
      color.value = 'tradewind600'
    } else {
      if (existingTeacher.name) {
        existingTeacherNames.push(existingTeacher.name) // Agrega el nombre al array
        showSnackbar.value = true
        message.value = `Docente(s) ya existe(n): ${existingTeacherNames.join(', ')}` // Une los nombres
        color.value = 'red-darken-4'
      }
    }
  } catch (error) {
    console.error('Error al manejar datos de los docentes:', error)
  }
}
