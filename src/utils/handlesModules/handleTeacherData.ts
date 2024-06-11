import type { Ref } from 'vue'
// Store
import { useTeacherStore } from '@/stores'
// Utils
import { handleData } from '..'
// Types
import type { TeacherRow } from '@/types'

export const handleTeacherData = async (
  rowData: TeacherRow,
  showSnackbar: Ref<boolean>,
  message: Ref<string>,
  color: Ref<string>,
  existingTeacherNames: string[]
) => {
  try {
    const teacher = useTeacherStore()
    await handleData(
      rowData,
      showSnackbar,
      message,
      color,
      existingTeacherNames,
      teacher,
      'getTeacherByCc',
      'C.C',
      (rowData: TeacherRow) => ({
        cc: rowData['C.C'],
        name: rowData['Nombre Completo'],
        email: rowData['Correo electronico'],
        phone: rowData['Teléfono'],
        status: rowData['Estado']
      }),
      'addTeacher',
      'name', // Nombre del valor que se usará para el mensaje
      'Docente(s)' // Mensaje en caso de existencia
    )
  } catch (error) {
    console.error('Error al manejar datos de los docentes:', error)
  }
}
