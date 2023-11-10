import { defineStore } from 'pinia'
// Interface
import type { Field, ImplementsTable } from '@/interface'

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
    data: []
  }),
  actions: {}
})
