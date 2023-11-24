// // Handle teacher data
// export const handleTeacherData = async (rowData: any) => {
//   try {
//     // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
//     const teacherData = {
//       cc: rowData['C.C'],
//       name: rowData['Nombre Completo'],
//       email: rowData['Correo electronico'],
//       phone: rowData['Teléfono'],
//       status: rowData['Estado']
//     }
//     // Agregar datos del docente
//     await teacher.addTeacher(teacherData)
//   } catch (error) {
//     console.error('Error al agregar los docentes:', error)
//     // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
//   }
// }
// // Handle users data
// export const handleUsersData = async (rowData: any) => {
//   try {
//     // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
//     const usersData = {
//       cc: rowData['C.C'],
//       name: rowData['Nombre Completo'],
//       email: rowData['Correo electronico'],
//       role: rowData['Rol'],
//       phone: rowData['Teléfono'],
//       status: rowData['Estado']
//     }
//     // Agregar datos del docente
//     console.log(usersData)
//   } catch (error) {
//     console.error('Error al agregar los usuarios:', error)
//     // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
//   }
// }
// // Handle implement data
// export const handleImplementData = async (rowData: any) => {
//   try {
//     // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
//     const implementsData = {
//       name: rowData['Nombre'],
//       serial: rowData['Serial'],
//       manufacturer: rowData['Marca'],
//       type: rowData['Tipo'],
//       model: rowData['Modelo'],
//       location: rowData['Ubicación'],
//       responsible: rowData['Responsable'],
//       note: rowData['Nota'],
//       status: rowData['Estado']
//     }
//     // Agregar datos de los implementos
//     await implement.addImplement(implementsData)
//   } catch (error) {
//     console.error('Error al agregar los implementos:', error)
//     // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
//   }
// }
// // Handle classroom data
// export const handleClassroomData = async (rowData: any) => {
//   try {
//     // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
//     const classroomData = {
//       nomenclature: rowData['Nomenclatura'],
//       location: rowData['Ubicación'],
//       tech_resources: rowData['Recursos tecnológicos'],
//       connectivity: rowData['Conectividad'],
//       ability: rowData['Capacidad'],
//       status: rowData['Estado']
//     }
//     // Agregar datos de los salones
//     await room.addRoom(classroomData)
//   } catch (error) {
//     console.error('Error al agregar los salones:', error)
//     // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
//   }
// }
