export const validateAndIterateRows = (data: any, callback: any) => {
  if (data.length < 1) {
    throw new Error('El archivo no contiene suficientes datos para la importación.')
  }

  const headers = data[0]

  for (let i = 1; i < data.length; i++) {
    const row = data[i]
    const rowData: any = {}

    for (let j = 0; j < headers.length; j++) {
      rowData[headers[j]] = row[j]
    }

    callback(rowData)
  }
}
