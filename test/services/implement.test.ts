import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../src/App.vue'
import { it, expect, describe, expectTypeOf } from 'vitest'
// Store
import { useImplementsStore } from '../../src/stores/index'
// Interface
import { ImplementsData } from '../../src/interface/index'

// Mount App
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

describe('Test Store Implement', () => {
  const implementStore = useImplementsStore()
  it('get allImplement', async () => {
    const implement = await implementStore.allImplements()
    // Verificar que exista un registro o más
    expect(implement.length).toBeGreaterThan(1)
    // Verificar que cada elemento del array tiene las propiedades esperadas
    implement.forEach((item: ImplementsData) => {
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('serial')
      expect(item).toHaveProperty('manufacturer')
      expect(item).toHaveProperty('type')
      expect(item).toHaveProperty('model')
      expect(item).toHaveProperty('location')
      expect(item).toHaveProperty('responsible')
      expect(item).toHaveProperty('responsible_name')
      expect(item).toHaveProperty('note')
      expect(item).toHaveProperty('status')
    })
  })

  it('insert implement', async () => {
    // Datos de ejemplo para la inserción
    const dataImplement: ImplementsData = {
      name: 'Implement test 2',
      serial: 'TEST002',
      manufacturer: 'TEST',
      type: 'Implement test',
      model: 'TEST',
      location: 'Tic',
      responsible: '5d62d552-0e36-452b-bd36-f403d112bbe7',
      note: 'test insert'
    }
    // Llamada a la función para la inserción
    const insertImplement = await implementStore.addImplement(dataImplement)
    // Verificamos que la inserción fue exitosa
    expect(insertImplement).toBeTruthy()
  })

  it('update implement', async () => {
    // Datos de ejemplo para la inserción
    const implementID: string = 'ec636a63-302a-489e-956a-46f9ececc036'
    const dataImplement: ImplementsData = {
      name: 'Implement test',
      serial: 'TEST001',
      manufacturer: 'TEST',
      type: 'Implement test',
      model: 'TEST',
      location: 'Tic',
      responsible: '5d62d552-0e36-452b-bd36-f403d112bbe7',
      note: 'test insert'
    }
    // Llamada a la función para la actualización
    const updateImplement = await implementStore.updateImplement(implementID, dataImplement)
    // Verificamos que la actualización fue exitosa
    expect(updateImplement).toBeTruthy()
  })

  it('delete teacher', async () => {
    const implementID: string = 'ec636a63-302a-489e-956a-46f9ececc036'
    // Llamada a la función para eliminar
    const deleteImplement = await implementStore.deleteImplement(implementID)
    // Verificamos que la eliminación fue exitosa
    expect(deleteImplement).toBeTruthy()
  })

  it('get responsible name', async () => {
    const responsibleName: string = 'Stiwar Asprilla'
    // Llamada a la función para buscar el responsable por el UUID
    const getResponsibleUUID = await implementStore.getResponsibleUUID(responsibleName)
    // Verificamos que la busqueda haya exitosa
    expect(getResponsibleUUID).toBeTruthy()
  })

  it('get implement by serial', async () => {
    const implementSerial: string = 'TEST001'
    // Llamada a la función para buscar el implemento por el serial
    const getImplementSerial = await implementStore.getImplementBySerial(implementSerial)
    // Verificamos que la busqueda haya sido exitosa
    expect(getImplementSerial).toBeTruthy()
  })
})
