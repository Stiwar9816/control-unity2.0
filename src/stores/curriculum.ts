import { defineStore } from 'pinia'
// Interface
import type { CurriculumData, CurriculumTable, Field } from '@/interface'
// Utils
import { supabase } from '@/utils'

export const useCurriculumsStore = defineStore({
  id: 'curriculum',
  state: (): CurriculumTable => ({
    headers: [
      { title: 'Asignatura', sortable: true, key: 'subject' },
      { title: 'Programa', sortable: true, key: 'program' },
      { title: 'Nivel', sortable: true, key: 'level' },
      { title: 'Jornada', sortable: true, key: 'working_day' },
      { title: 'Docente', sortable: false, key: 'teacher_name' },
      { title: 'Horario', sortable: false, key: 'schedule' },
      { title: 'Hora de inicio', sortable: false, key: 'time_start' },
      { title: 'Hora de fin', sortable: false, key: 'time_end' },
      { title: 'Salón', sortable: true, key: 'classroom_nomenclature' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    items: [] as CurriculumData[]
  }),
  actions: {
    async allCurriculums() {
      // Obtén la lista completa de la malla curricular registrada
      let { data: curriculum, error } = await supabase.rpc('list_curriculums')
      if (error) throw new Error(`${error.message}`)
      return (this.items = curriculum as CurriculumData[])
    },
    async addCurriculum(data_curriculum: CurriculumData) {
      // Agrega una asignatura a la malla curricular
      let { data: curriculum, error } = await supabase.rpc('insert_curriculum', {
        data_curriculum
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = curriculum as CurriculumData[])
    },
    async updateCurriculum(curriculum_id: string, data_curriculum: CurriculumData) {
      // Actualiza la información de la malla curricular
      let { data: curriculum, error } = await supabase.rpc('update_curriculum', {
        curriculum_id,
        data_curriculum
      })
      if (error) throw new Error(`${error.details}`)
      return (this.items = curriculum as CurriculumData[])
    },
    async deleteCurriculum(curriculum_id: string) {
      // Elimina la una asignatura de la malla curricular
      let { data: curriculum, error } = await supabase.rpc('delete_curriculum_by_id', {
        curriculum_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.items = curriculum as CurriculumData[])
    },
    async getTeacherUuid(name_teacher: string) {
      let { data: curriculum, error } = await supabase.rpc('get_teacher_uuid', {
        name_teacher
      })
      if (error) throw new Error(`${error.message}`)
      return curriculum
    },
    async getClassroomUuid(name_classroom: string) {
      let { data: curriculum, error } = await supabase.rpc('get_classroom_uuid', {
        name_classroom
      })
      if (error) throw new Error(`${error.message}`)
      return curriculum
    },
    async getCurriculumBySubject(subject: string) {
      let { data: curriculum, error } = await supabase.rpc('get_curriculum_by_subject', {
        subject
      })
      if (error) throw new Error(`${error.message}`)
      return curriculum
    }
  }
})
