import { defineStore } from 'pinia'
// Interface
import type { Field, UserData, UsersTable } from '@/interface'
// Utils
import { supabase } from '@/utils'

export const useUserStore = defineStore({
  id: 'users',
  state: (): UsersTable => ({
    headers: [
      { title: 'C.C', sortable: false, key: 'cc' },
      { title: 'Nombre Completo', sortable: false, key: 'name' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Email', sortable: false, key: 'email' },
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
    }
  }
})
