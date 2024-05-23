import type { Ref } from 'vue'
import { checkForDuplicate } from '.'

export const handleData = async (
  rowData: any,
  showSnackbar: Ref<boolean>,
  message: Ref<string>,
  color: Ref<string>,
  existingNames: string[],
  store: any,
  methodName: string,
  key: string,
  dataMapper: (rowData: any) => any,
  storeMethod: string,
  dataValue: string,
  alertMessage: string
) => {
  try {
    const existingItem = await checkForDuplicate(rowData, store, methodName, key)
    if (!existingItem) {
      const data = dataMapper(rowData)
      await store[storeMethod](data)
      showSnackbar.value = true
      message.value = `${alertMessage}: ${data[dataValue]} agregado(s)`
      color.value = 'tradewind600'
    } else {
      existingNames.push(existingItem[dataValue])
      showSnackbar.value = true
      message.value = `${alertMessage}: ${existingItem[dataValue].join(', ')} ya existe(n)`
      color.value = 'red-darken-4'
    }
  } catch (error: any) {
    throw new Error(`Error al agregar los datos: ${error.message}`)
  }
}
