// Store
import { useUserStore } from '@/stores'

export const handleUsersData = async (rowData: any) => {
  try {
    // Initialization Store
    const user = useUserStore()
    const usersData = {
      cc: rowData['C.C'],
      name: rowData['Nombre Completo'],
      email: rowData['Correo electronico'],
      role: rowData['Rol'],
      phone: rowData['Teléfono'],
      status: rowData['Estado']
    }
    // Agregar datos de los usuarios
    console.log(usersData)
  } catch (error: any) {
    throw new Error(`'Error al agregar los usuarios:', ${error.message}`)
  }
}
