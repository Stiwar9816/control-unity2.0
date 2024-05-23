import {
  buildClassrommAlertMessage,
  buildCurriculumAlertMessage,
  buildImplementAlertMessage,
  buildTeacherAlertMessage,
  checkForDuplicate,
  handleDuplicate
} from '.'

// Types
import type { ClassroomRow, CurriculumRow, ImplementRow, TeacherRow } from '@/types'

// Stores
import {
  useTeacherStore,
  useClassroomsStore,
  useCurriculumsStore,
  useImplementsStore
} from '@/stores'

export const validateAndIterateRows = async (
  data: any,
  callback: any,
  checkDuplicate: boolean = true
) => {
  if (data.length < 1) {
    throw new Error('El archivo no contiene suficientes datos para la importación.')
  }
  const headers = data[0]
  // Almacena las filas válidas que no están duplicadas
  const validRows = []
  // Initialization store
  const teacher = useTeacherStore()
  const room = useClassroomsStore()
  const curriculum = useCurriculumsStore()
  const implement = useImplementsStore()

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const rowData: any = {}
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j]
    }
    // Usa la función modular handleDuplicate para verificar duplicados
    // CheckDuplicateTeacher
    const isDuplicateTeacher = await handleDuplicate(
      async (rowData: TeacherRow) => checkForDuplicate(rowData, teacher, 'getTeacherByCc', 'C.C'),
      rowData,
      i,
      buildTeacherAlertMessage
    )
    if (isDuplicateTeacher) continue
    // CheckDuplicateImplement
    const isDuplicateImplement = await handleDuplicate(
      async (rowData: ImplementRow) =>
        checkForDuplicate(rowData, implement, 'getImplementBySerial', 'Serial'),
      rowData,
      i,
      buildImplementAlertMessage
    )
    if (isDuplicateImplement) continue
    // CheckDuplicateClassroom
    const isDuplicateClassroom = await handleDuplicate(
      async (rowData: ClassroomRow) =>
        checkForDuplicate(rowData, room, 'getClassroomByNomenclature', 'Nomenclatura'),
      rowData,
      i,
      buildClassrommAlertMessage
    )
    if (isDuplicateClassroom) continue
    // CheckDuplicateCurriculum
    const isDuplicateCurriculum = await handleDuplicate(
      async (rowData: CurriculumRow) =>
        checkForDuplicate(rowData, curriculum, 'getCurriculumBySubject', 'Asignatura'),
      rowData,
      i,
      buildCurriculumAlertMessage
    )
    if (isDuplicateCurriculum) continue
    // Verificamos si la fila contiene al menos un valor no nulo o vacío
    if (Object.values(rowData).some((value) => value !== null && value !== '')) {
      validRows.push(rowData)
    }
  }
  // Llama al callback solo con las filas válidas.
  for (const row of validRows) {
    await callback(row)
  }
}
