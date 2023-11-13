import { defineStore } from 'pinia'
// Interface
import type { Field, TeachersData, TeachersTable } from '@/interface'
// Utils
import { supabase } from '@/utils'

export const useTeacherStore = defineStore({
  id: 'teacher',
  state: (): TeachersTable => ({
    headers: [
      { title: 'C.C', sortable: false, key: 'cc' },
      { title: 'Nombre Completo', sortable: true, key: 'name' },
      { title: 'Correo electronico', sortable: false, key: 'email' },
      { title: 'Teléfono', sortable: false, key: 'phone' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as TeachersData[]
  }),
  actions: {
    async allTeachers() {
      // Obtén la lista completa de los salones registrados
      let { data: teachers, error } = await supabase.rpc('list_teachers')
      if (error) throw new Error(`${error.message}`)
      return (this.items = teachers as TeachersData[])
    }
  }
})
