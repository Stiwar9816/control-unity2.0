import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '../../src/App.vue'
import { it, expect, describe } from 'vitest'
// Store
import { useUserStore } from '../../src/stores/index'
// Interface
import { UserData } from '../../src/interface/index'
// Mount App
const pinia = createPinia()
const app = createApp(App)
app.use(pinia)

describe('Test Store User', () => {
  const user = useUserStore()

  it('get AllUsers', async () => {
    const users = await user.allUsers()
    // Verificar que exista un registro o más
    expect(users.length).toBeGreaterThan(0)
    // Verificar que cada elemento del array tiene las propiedades esperadas
    users.forEach((item: UserData) => {
      expect(item).toHaveProperty('cc')
      expect(item).toHaveProperty('name')
      expect(item).toHaveProperty('email')
      expect(item).toHaveProperty('phone')
      expect(item).toHaveProperty('role')
      expect(item).toHaveProperty('status')
      // Verificar que la longitud de la cc sea 8 0 mayor
      expect(item.cc.toString().length).toBeGreaterThanOrEqual(8)
      // Verificar que la longitud del teléfono sea exactamente 10
      expect(item.phone.toString().length).toStrictEqual(10)
      // Verificar si el campo rol contiene [Tic, Planeación o Recepción]
      expect(['Tic', 'Planeación', 'Recepción']).toContain(item.role)
    })
  })

  it('create user', async () => {
    const data: UserData = {
      email: 'user2@test.com',
      name: 'user test',
      phone: 1234567890,
      role: 'Tic',
      status: false,
      cc: 111111110
    }
    // Verificar que createUser es truthy (que la creación del usuario fue exitosa)
    const createUser = await user.createUser(data)
    expect(createUser).toBeTruthy()
    // Verificar que la función allUsers devuelve al menos un usuario
    const users = await user.allUsers()
    expect(users.length).toBeGreaterThan(0)
    // Verificar que el usuario recién creado está en la lista
    const newUser = users.find((u) => u.email === data.email)
    expect(newUser).toBeTruthy()
    expect(newUser?.name).toBe(data.name)
    expect(newUser?.phone).toBe(data.phone)
    expect(newUser?.role).toBe(data.role)
    expect(newUser?.status).toBe(data.status)
    expect(newUser?.cc).toBe(data.cc)
  })

  it('update user', async () => {
    const userID = 'ed4c412c-ebb3-4be0-bab6-f7d532eea76c'
    const dataUser: UserData = {
      email: 'user@test.com',
      name: 'user test update',
      phone: 1234567890,
      role: 'Tic',
      status: false,
      cc: 11111111
    }
    const updateUser = await user.updateUser(userID, dataUser)
    expect(updateUser).toBeTruthy()
  })

  it('delete user', async () => {
    const userID = 'ed4c412c-ebb3-4be0-bab6-f7d532eea76c'
    const deleteUser = await user.deleteUser(userID)
    expect(deleteUser).toBeTruthy()
  })
})
