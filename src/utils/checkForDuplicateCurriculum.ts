// Store
import { useCurriculumsStore } from '@/stores'
// Types
import type { CurriculumRow} from '@/types'

export const checkForDuplicateCurriculum = async (rowData: CurriculumRow) => {
  try {
    const curriculum = useCurriculumsStore()
    const subjectValue = rowData['Asignatura']
    const existingCurriculum = await curriculum.getCurriculumBySubject(subjectValue)
    return existingCurriculum.length > 0 ? existingCurriculum[0] : null
  } catch (error) {
    console.error('Error al verificar duplicados:', error)
    return null // Devuelve null en caso de error
  }
}
