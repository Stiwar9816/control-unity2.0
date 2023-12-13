import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { it, expect, describe } from 'vitest'
import App from '../../src/App.vue'
// Sotre
import { useClassroomsStore } from '../../src/stores/classrooms'
// Interface
import { ClassroomsData } from '../../src/interface/index'

// Mount App
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

describe('Test store classroom', () => {
  const rooms = useClassroomsStore()
  it('get AllRooms', async () => {
    const allRooms = await rooms.allRooms()
    // Verificar que exista un registro o más
    expect(allRooms.length).toBeGreaterThan(0)
    // Verificar que cada elemento del array tiene las propiedades esperadas
    allRooms.forEach((item: ClassroomsData) => {
      expect(item).toHaveProperty('nomenclature')
      expect(item).toHaveProperty('location')
      expect(item).toHaveProperty('tech_resources')
      expect(item).toHaveProperty('connectivity')
      expect(item).toHaveProperty('ability')
      expect(item).toHaveProperty('status')
    })
  })

  it('insert Room', async () => {
    // Datos de ejemplo para la inserción
    const roomData: ClassroomsData = {
      nomenclature: 'Test Unit002',
      location: 'Nivel 2',
      tech_resources: 'Tv,Aire acondicionado',
      connectivity: 'WiFi,Ethernet',
      ability: 30,
      status: true
    }
    // Llamada a la función de inserción
    const insertedRoom = await rooms.addRoom(roomData)
    // Verificar que la inserción fue existosa
    expect(insertedRoom).toBeTruthy()
  })

  it('update room', async () => {
    // Datos de ejemplo para la actualización
    const roomData: ClassroomsData = {
      nomenclature: 'Test Unit update',
      location: 'Nivel 1',
      tech_resources: 'Tv',
      connectivity: 'WiFi',
      ability: 20,
      status: false
    }
    const roomID = '5803d015-2c7e-409e-923f-1d072beea793'
    const updatedRooms = await rooms.updateRoom(roomID, roomData)
    // Verificar que la actualización fue exitosa
    expect(updatedRooms).toBeTruthy()
  })

  it('delete room', async () => {
    const roomID = '5803d015-2c7e-409e-923f-1d072beea793'
    const deleteRoom = await rooms.deleteRoom(roomID)
    // Verificar que la eliminación fue existosa
    expect(deleteRoom).toBeTruthy()
  })

  it('getClassroomByNomenclature', async () => {
    const nameRoom = 'Test Unit002'
    const getClassroom = await rooms.getClassroomByNomenclature(nameRoom)
    // Verificamos que exista un salon con dicho nombre
    expect(getClassroom).toBeTruthy()
  })
})
