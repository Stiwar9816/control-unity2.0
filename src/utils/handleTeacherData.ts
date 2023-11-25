// Store
import { useTeacherStore } from '@/stores'

export const handleTeacherData = async (rowData: any) => {
  try {
    // Initialization Store
    const teacher = useTeacherStore()
    const teacherData = {
      cc: rowData['C.C'],
      name: rowData['Nombre Completo'],
      email: rowData['Correo electronico'],
      phone: rowData['Teléfono'],
      status: rowData['Estado']
    }
    await teacher.addTeacher(teacherData)
  } catch (error: any) {
    throw new Error(`'Error al agregar los docentes:', ${error.message}`)
  }
}
