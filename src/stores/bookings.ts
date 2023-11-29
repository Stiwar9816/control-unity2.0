import { defineStore } from 'pinia'
export const useBookingsStore = defineStore({
  id: 'booking',

  state: () => ({
    name: '',
    carrer: '',
    classroom: '',
    datetime: '',
    implements: []
  }),
  actions: {}
})
