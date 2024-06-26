export const checkForDuplicate = async (
  rowData: any,
  store: any,
  methodName: string,
  key: string
) => {
  try {
    const value = rowData[key]
    const result = await store[methodName](value)
    return result.length > 0 ? result[0] : null
  } catch (error: any) {
    throw new Error(`Error al verificar duplicados: ${error.message}`)
    // return null
  }
}
