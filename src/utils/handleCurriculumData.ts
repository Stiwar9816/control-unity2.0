// Store
import { useCurriculumsStore } from '@/stores'
// Utils
import { checkForDuplicateCurriculum } from '.'
// Types
import type { CurriculumRow } from '@/types'

export const handleCurriculumData = async (
  rowData: CurriculumRow,
  showSnackbar: any,
  message: any,
  color: any,
  existingCurriculumNames: string[]
) => {
  try {
    // Initialization Store
    const curriculum = useCurriculumsStore()
    // Obtener el UUID del responsable
    const curriculumTeacher = rowData['Docente']
    const curriculumClassroom = rowData['Salón']
    const teacherUUID = await curriculum.getTeacherUuid(curriculumTeacher)
    const classroomUUID = await curriculum.getClassroomUuid(curriculumClassroom)
    // Verificar si la asignatura ya existe
    const existingCurriculum = await checkForDuplicateCurriculum(rowData)
    console.log(existingCurriculum);
    if (!existingCurriculum) {
      const curriculumData = {
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
      }
      // Agregar datos de los implementos
      console.log(curriculumData);
      await curriculum.addCurriculum(curriculumData)
      showSnackbar.value = true
      message.value = `Asignatura(s) agregada(s): ${curriculumData.subject}`
      color.value = 'tradewind600'
    } else {
      if (existingCurriculum.name) {
        existingCurriculumNames.push(existingCurriculum.name) // Agrega el nombre al array
        showSnackbar.value = true
        message.value = `Asignatura(s) ya existe(n): ${existingCurriculumNames.join(', ')}` // Une los nombres
        color.value = 'red-darken-4'
      }
    }
  } catch (error: any) {
    throw new Error(`'Error al agregar las asignaturas:', ${error.message}`)
  }
}
