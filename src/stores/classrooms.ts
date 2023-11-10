import { defineStore } from 'pinia'
// Interface
import type { ClassroomsData, ClassroomsTable, Field } from '@/interface'

export const useClassroomsStore = defineStore({
  id: 'classroom',
  state: (): ClassroomsTable => ({
    headers: [
      { title: 'Nomenclatura', sortable: true, key: 'nomenclature' },
      { title: 'Ubicación', sortable: true, key: 'location' },
      { title: 'Recursos tecnológicos', sortable: false, key: 'tech_resources' },
      { title: 'Conectividad', sortable: false, key: 'conectivity' },
      { title: 'Capacidad', sortable: true, key: 'ability' },
      { title: 'Estado', sortable: true, key: 'status' },
      { title: 'Acciones', sortable: false, key: 'actions' }
    ] as Field[],
    data: [] as ClassroomsData[]
  }),
  actions: {}
})
