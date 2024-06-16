import type { Ref } from 'vue'
// Store
import { useCurriculumsStore } from '@/stores'
// Utils
import { handleData } from '..'
// Types
import type { CurriculumRow } from '@/types'

export const handleCurriculumData = async (
  rowData: CurriculumRow,
  showSnackbar: Ref<boolean>,
  message: Ref<string>,
  color: Ref<string>,
  existingCurriculumNames: string[]
) => {
  try {
    // Initialization Store
    const curriculum = useCurriculumsStore()
    // Obtener el UUID del responsable
    const curriculumTeacher = rowData['Docente']
    const curriculumClassroom = rowData['Salón']
    const teacherUUID = await curriculum.getTeacherUUID(curriculumTeacher)
    const classroomUUID = await curriculum.getClassroomUUID(curriculumClassroom)

    await handleData(
      rowData,
      showSnackbar,
      message,
      color,
      existingCurriculumNames,
      curriculum,
      'getCurriculumBySubject',
      'Asignatura',
      (rowData: CurriculumRow) => ({
        subject: rowData['Asignatura'],
        program: rowData['Programa'],
        level: rowData['Nivel'],
        working_day: rowData['Jornada'],
        teacher: teacherUUID,
        schedule: rowData['Horario'],
        time_start: rowData['Hora de inicio'],
        time_end: rowData['Hora de fin'],
        classroom: classroomUUID,
        status: rowData['Estado']
      }),
      'addCurriculum',
      'subject', // Nombre del valor que se usará para el mensaje
      'Asignatura(s)' // Mensaje en caso de existencia
    )
  } catch (error: any) {
    throw new Error(`Error al agregar las asignaturas: ${error.message}`)
  }
}
