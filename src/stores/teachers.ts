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
      // Obtén la lista completa de los docentes registrados
      let { data: teachers, error } = await supabase.rpc('list_teachers')
      if (error) throw new Error(`${error.message}`)
      return (this.items = teachers as TeachersData[])
    },
    async addTeacher(data_teacher: TeachersData) {
      // Agrega un nuevo docente
      let { data: teacher, error } = await supabase.rpc('insert_teacher', {
        data_teacher
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = teacher as TeachersData[])
    },
    async updateTeacher(teacher_id: string, data_teacher: TeachersData) {
      // Actualiza los datos de un docente
      let { data: teacher, error } = await supabase.rpc('update_teacher', {
        data_teacher,
        teacher_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = teacher as TeachersData[])
    },
    async deleteTeacher(teacher_id: string) {
      // Elimina los datos de un docente
      let { data: teacher, error } = await supabase.rpc('delete_teacher_by_id', {
        teacher_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = teacher as TeachersData[])
    }
  }
})
