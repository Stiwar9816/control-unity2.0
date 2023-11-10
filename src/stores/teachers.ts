import { defineStore } from 'pinia'
// Interface
import type { Field, TeachersData, TeachersTable } from '@/interface'

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
    data: [] as TeachersData[]
  }),
  actions: {}
})
