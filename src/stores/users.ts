import { defineStore } from 'pinia'
// Interface
import type { Field, UserData, UsersTable } from '@/interface'
// Utils
import { supabase } from '@/utils'
import { randomPassword } from '@/utils'

export const useUserStore = defineStore({
  id: 'users',
  state: (): UsersTable => ({
    headers: [
      { title: 'C.C', sortable: false, key: 'cc' },
      { title: 'Nombre Completo', sortable: false, key: 'name' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Correo electronico', sortable: false, key: 'email' },
      { title: 'Rol', sortable: true, key: 'role' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, align: 'center', key: 'actions' }
    ] as Field[],
    items: [] as UserData[]
  }),
  actions: {
    async allUsers() {
      // Obtén la lista completa de usuarios registrados
      let { data: users, error } = await supabase.rpc('list_users')
      if (error) throw new Error(`${error.message}`)
      return (this.items = users as UserData[])
    },
    async createUser(payload: UserData) {
      // Crea un usuario nuevo
      
      // Contraseña aleartoria
      const passwordGenered = randomPassword(12)
      
      const { data, error } = await supabase.auth.admin.createUser({
        email: payload.email,
        password: passwordGenered,
        nonce: randomPassword(9),
        user_metadata: {
          name: payload.name,
          email: payload.email,
          password: passwordGenered,
          phone: payload.phone,
          role: payload.role,
          status: false,
          cc: payload.cc
        }
      })
      if (error) throw new Error(`${error.message}`)
      if (data) {
        await supabase.auth.admin.inviteUserByEmail(`${data.user.email}`)
        const users = await this.allUsers()
        return (this.items = users as UserData[])
      }
    },
    async updateUser(user_id: string, data_user: UserData) {
      // Actualiza la información de un usuario
      let { data: user, error } = await supabase.rpc('update_user', {
        data_user,
        user_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = user as UserData[])
    },
    async deleteUser(user_id: string) {
      // Elimina a un usuario
      let { data: user, error } = await supabase.rpc('delete_user_by_id', {
        user_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = user as UserData[])
    }
  }
})
