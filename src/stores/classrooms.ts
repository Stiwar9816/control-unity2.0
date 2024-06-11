import { defineStore } from 'pinia'
// Interface
import type { ClassroomsData, ClassroomsTable, Field } from '@/interface'
// Utils
import { supabase } from '@/config'

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
      let { data: room, error } = await supabase.rpc('insert_classroom', {
        data_classroom
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = room as ClassroomsData[])
    },
    async updateRoom(room_id: string, data_room: ClassroomsData) {
      // Actualiza la información de un salón
      let { data: room, error } = await supabase.rpc('update_classroom', {
        data_room,
        room_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = room as ClassroomsData[])
    },
    async deleteRoom(room_id: string) {
      // Elimina un Salón
      let { data: room, error } = await supabase.rpc('delete_classroom_by_id', {
        room_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = room as ClassroomsData[])
    },
    async getClassroomByNomenclature(name_room: string) {
      let { data: room, error } = await supabase.rpc('get_classroom_by_nomenclature', {
        name_room
      })
      if (error) throw new Error(`${error.message}`)
      return room
    }
  }
})
