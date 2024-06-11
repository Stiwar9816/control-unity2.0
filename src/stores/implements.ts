import { defineStore } from 'pinia'
// Interface
import type { Field, ImplementsData, ImplementsTable, UserData } from '@/interface'
// Utils
import { supabase } from '@/config'

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
      { title: 'Responsable', sortable: true, key: 'responsible_name' },
      { title: 'Nota', sortable: false, key: 'note' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as ImplementsData[],
    usersSelect: [] as UserData[]
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
    },
    async updateImplement(implement_id: string, data_implement: ImplementsData) {
      // Actualiza la información de un implemento
      let { data: implement, error } = await supabase.rpc('update_implement', {
        data_implement,
        implement_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = implement as ImplementsData[])
    },
    async deleteImplement(implement_id: string) {
      // Elimina un implemento
      let { data: implement, error } = await supabase.rpc('delete_implement_by_id', {
        implement_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = implement as ImplementsData[])
    },
    async getResponsibleUUID(responsible_name: string) {
      let { data, error } = await supabase.rpc('get_responsible_uuid', {
        responsible_name
      })
      if (error) throw new Error(`${error.message}`)
      return data
    },
    async getImplementBySerial(implement_serial: string) {
      let { data: implement, error } = await supabase.rpc('get_implement_by_serial', {
        implement_serial
      })
      if (error) throw new Error(`${error.message}`)
      return implement
    }
  }
})
