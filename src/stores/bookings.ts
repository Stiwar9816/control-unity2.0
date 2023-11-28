import { defineStore } from 'pinia'
// Interface
// Utils
import { supabase } from '@/utils'

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
