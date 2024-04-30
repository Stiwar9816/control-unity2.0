import {
  buildClassrommAlertMessage,
  buildImplementAlertMessage,
  buildTeacherAlertMessage,
  handleDuplicate
} from '.'

export const validateAndIterateRows = async (
  data: any,
  callback: any,
  checkDuplicate: boolean = true,
  checkForDuplicate: Function
) => {
  if (data.length < 1) {
    throw new Error('El archivo no contiene suficientes datos para la importación.')
  }
  const headers = data[0]
  // Almacena las filas válidas que no están duplicadas
  const validRows = []
  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const rowData: any = {}
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j]
    }
    // Usa la función modular handleDuplicate para verificar duplicados
    // CheckDuplicateTeacher
    const isDuplicateTeacher = await handleDuplicate(
      checkForDuplicate,
      rowData,
      i,
      buildTeacherAlertMessage
    )
    if (isDuplicateTeacher) continue
    // CheckDuplicateImplement
    const isDuplicateImplement = await handleDuplicate(
      checkForDuplicate,
      rowData,
      i,
      buildImplementAlertMessage
    )
    if (isDuplicateImplement) continue
    // CheckDuplicateClassroom
    const isDuplicateClassroom = await handleDuplicate(
      checkForDuplicate,
      rowData,
      i,
      buildClassrommAlertMessage
    )
    if (isDuplicateClassroom) continue
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
