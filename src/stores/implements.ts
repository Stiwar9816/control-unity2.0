import { defineStore } from 'pinia'
// Interface
import type { Field, ImplementsData, ImplementsTable, UserData } from '@/interface'
import { supabase } from '@/utils'

export const useImplementsStore = defineStore({
  id: 'implements',
  state: (): ImplementsTable => ({
    headers: [
      { title: 'Nombre', sortable: true, key: 'name' },
      { title: 'Serial', sortable: false, key: 'serial' },
      { title: 'Marca', sortable: true, key: 'manufacturer' },
      { title: 'Tipo', sortable: true, key: 'type' },
      { title: 'Modelo', sortable: false, key: 'model' },
      { title: 'Ubicación', sortable: true, key: 'location' },
      { title: 'Responsable', sortable: true, key: 'responsible' },
      { title: 'Nota', sortable: false, key: 'note' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as ImplementsData[],
    usersSelect: []
  }),
  actions: {
    async allImplements() {
      // Obtén la lista completa de los implementos registrados
      let { data: implement, error } = await supabase.rpc('list_implements')
      if (error) throw new Error(`${error.message}`)
      return (this.items = implement as ImplementsData[])
    },
    async allUsersSelect() {
      // Obtén la lista completa de los usuarios registrados consultando su id y nombre
      let { data: users, error } = await supabase.rpc('list_users_select')
      if (error) throw new Error(`${error.message}`)
      return (this.usersSelect = users as UserData[])
    },
    async addImplement(data_implement: ImplementsData) {
      // Agrega un nuevo implemento
      let { data: implement, error } = await supabase.rpc('insert_implement', {
        data_implement
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = implement as ImplementsData[])
    }
  }
})
