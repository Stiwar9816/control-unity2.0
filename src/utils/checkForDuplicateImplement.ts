// Store
import { useImplementsStore } from '@/stores'
// Types
import type { ImplementRow } from '@/types'

export const checkForDuplicateImplement = async (rowData: ImplementRow) => {
  try {
    const implement = useImplementsStore()
    const serialValue = rowData['Serial']

    const existingImplements = await implement.getImplementBySerial(serialValue)

    return existingImplements.length > 0 ? existingImplements[0] : null
  } catch (error) {
    console.error('Error al verificar duplicados:', error)
    return null // Devuelve null en caso de error
  }
}
