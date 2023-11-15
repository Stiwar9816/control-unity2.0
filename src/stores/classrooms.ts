import { defineStore } from 'pinia'
// Interface
import type { ClassroomsData, ClassroomsTable, Field } from '@/interface'
// Utils
import { supabase } from '@/utils'

export const useClassroomsStore = defineStore({
  id: 'classroom',
  state: (): ClassroomsTable => ({
    headers: [
      { title: 'Nomenclatura', sortable: true, key: 'nomenclature' },
      { title: 'Ubicación', sortable: true, key: 'location' },
      { title: 'Recursos tecnológicos', sortable: false, key: 'tech_resources' },
      { title: 'Conectividad', sortable: false, key: 'connectivity' },
      { title: 'Capacidad', sortable: true, key: 'ability' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as ClassroomsData[]
  }),
  actions: {
    async allRooms() {
      // Obtén la lista completa de los salones registrados
      let { data: rooms, error } = await supabase.rpc('list_classrooms')
      if (error) throw new Error(`${error.message}`)
      return (this.items = rooms as ClassroomsData[])
    },
    async addRoom(data_classroom: ClassroomsData) {
      // Agrega un nuevo salón
      let { data, error } = await supabase.rpc('insert_classroom', {
        data_classroom
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = data as ClassroomsData[])
    }
  }
})
