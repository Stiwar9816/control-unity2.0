import { defineStore } from 'pinia'
import { supabase } from '@/config'
import type { BookingData } from '@/interface'

export const useBookingsStore = defineStore({
  id: 'booking',
  state: () => ({
    document: 0,
    fullname: '',
    phone: 0,
    schedule: '',
    implements: [],
    event: '',
    room: '',
    start_date: null,
    end_date: null,
    bookings: [] as BookingData[]
  }),
  actions: {
    async createBooking(data_booking: BookingData) {
      let { error } = await supabase.rpc('insert_booking', {
        data_booking
      })
      if (error) throw new Error(`${error.message}`)
    },
    async getBooking() {
      let { data, error } = await supabase.rpc('get_bookings')
      if (error) throw new Error(`${error.message}`)
      return (this.bookings = data as BookingData[])
    },
    async updateBooking(data_booking: BookingData, booking_id: string) {
      let { data, error } = await supabase.rpc('update_booking', {
        data_booking,
        booking_id
      })
      if (error) throw new Error(`${error.message}`)
      return (this.bookings = data as BookingData[])
    },
    async deleteBooking(booking_id: string) {
      let { error } = await supabase.rpc('delete_booking', {
        booking_id
      })
      if (error) throw new Error(`${error.message}`)
    }
  }
})
