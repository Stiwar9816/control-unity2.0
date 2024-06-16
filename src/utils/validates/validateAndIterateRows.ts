import {
  checkForDuplicate,
  getClassroomName,
  getCurriculumName,
  getImplementName,
  getTeacherName,
  handleDuplicate
} from '..'

// Types
import type { RouteConfig } from '@/types'

// Stores
import {
  useTeacherStore,
  useClassroomsStore,
  useCurriculumsStore,
  useImplementsStore
} from '@/stores'

const storeMap: Record<string, RouteConfig> = {
  '/teachers': {
    store: useTeacherStore,
    getName: getTeacherName,
    checkKey: 'getTeacherByCc',
    uniqueKey: 'C.C'
  },
  '/implements': {
    store: useImplementsStore,
    getName: getImplementName,
    checkKey: 'getImplementBySerial',
    uniqueKey: 'Serial'
  },
  '/classrooms': {
    store: useClassroomsStore,
    getName: getClassroomName,
    checkKey: 'getClassroomByNomenclature',
    uniqueKey: 'Nomenclatura'
  },
  '/curriculum': {
    store: useCurriculumsStore,
    getName: getCurriculumName,
    checkKey: 'getCurriculumBySubject',
    uniqueKey: 'Asignatura'
  }
}

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
  const duplicateNames: string[] = []
  // Route pathname
  const route = window.location.pathname
  const config = storeMap[route]

  if (!config) throw new Error('Ruta no válida')

  const store = config.store()
  const { getName, checkKey, uniqueKey } = config

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const rowData: any = {}
    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j]
    }

    const isDuplicate = await handleDuplicate(
      async (rowData: any) => checkForDuplicate(rowData, store, checkKey, uniqueKey),
      rowData,
      i,
      getName,
      duplicateNames
    )

    if (isDuplicate) continue

    // Verificamos si la fila contiene al menos un valor no nulo o vacío
    if (Object.values(rowData).some((value) => value !== null && value !== '')) {
      validRows.push(rowData)
    }
  }
  // Llama al callback solo con las filas válidas.
  for (const row of validRows) {
    await callback(row)
  }

  // Maneja los mensajes de error
  if (duplicateNames.length > 0)
    throw new Error(`Los siguientes registros están duplicados: ${duplicateNames.join(', ')}`)
}
