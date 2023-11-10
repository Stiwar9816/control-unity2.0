import { defineStore } from 'pinia'
// Interface
import type { Field, UserData, UsersTable } from '@/interface'

export const useUserStore = defineStore({
  id: 'users',
  state: (): UsersTable => ({
    headers: [
      { title: 'C.C', sortable: false, key: 'cc' },
      { title: 'Nombre Completo', sortable: false, key: 'name' },
      { title: 'Email', sortable: false, key: 'email' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Rol', sortable: true, key: 'role' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    data: [] as UserData[]
  }),
  actions: {}
})
