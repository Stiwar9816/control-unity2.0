import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../src/App.vue'
import { it, expect, describe } from 'vitest'
// Store
import { useTeacherStore } from '../../src/stores/index'
// Interface
import { TeachersData } from '../../src/interface/index'

// Mount App
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

describe('Test store teacher', () => {
  const teacher = useTeacherStore()
  it('get allTeacher', async () => {
    const teachers = await teacher.allTeachers()
    // Verificar que exista un registro o más
    expect(teachers.length).toBeGreaterThan(1)
    // Verificar que cada elemento del array tiene las propiedades esperadas
    teachers.forEach((item: TeachersData) => {
      expect(item).toHaveProperty('cc')
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('email')
      expect(item).toHaveProperty('phone')
      expect(item).toHaveProperty('status')
      // Verificar que la longitud de la cc sea 8 0 mayor
      expect(item.cc.toString().length).toBeGreaterThanOrEqual(8)
      // Verificar que la longitud del teléfono sea exactamente 10
      expect(item.phone.toString().length).toStrictEqual(10)
    })
  })

  it('create teacher', async () => {
    // Datos de ejemplo para la inserción
    const dataTeacher: TeachersData = {
      cc: 12345678012,
      name: 'Teacher Test',
      email: 'teacher@test.com',
      phone: 1234567890
    }
    // Llamada a la función de inserción
    const createTeacher = await teacher.addTeacher(dataTeacher)
    // Verificar que la inserción fue existosa
    expect(createTeacher).toBeTruthy()
  })

  it('update teacher', async () => {
    // Datos de ejemplo para la actualización
    const teacherID = '1656a7fe-c647-4a1b-80a9-c4e37a49402a'
    const dataTeacher: TeachersData = {
      cc: 123456740,
      name: 'Teacher Test update',
      email: 'teacher_update@test.com',
      phone: 1234567800
    }
    // Llamada a la función de actualización
    const updateTeacher = await teacher.updateTeacher(teacherID, dataTeacher)
    // Verificamos que la actualización fue exitosa
    expect(updateTeacher).toBeTruthy()
  })

  it('delete teacher', async () => {
    // Datos de ejemplo para la eliminación
    const teacherID = '1656a7fe-c647-4a1b-80a9-c4e37a49402a'
    const deleteTeacher = await teacher.deleteTeacher(teacherID)
    // Verificamos que la eliminación haya sido exitosa
    expect(deleteTeacher).toBeTruthy()
  })

  it('get Teacher By CC', async () => {
    // Datos de ejemplo para la busqueda
    const teacherCC:number = 12345678
    // Llamada a la función para la busqueda
    const teacherByCC = await teacher.getTeacherByCc(teacherCC)
    // verificamos que la busqueda haya sido exitosa
    expect(teacherByCC).toBeTruthy()
  })
})
