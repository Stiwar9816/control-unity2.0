import { computed } from 'vue'
import { defineStore } from 'pinia'
// Interface
import type { Routes } from '@/interface'
// Utils
import { extractFullNameFromSession } from '@/utils'

export const useLayoutStore = defineStore('layout', () => {
  const imageProfile: string = 'mdi-account-circle'
  const drawer: boolean = true
  const rail: boolean = false
  const routes: Array<Routes> = [
    {
      name: 'Inicio',
      icon: 'mdi-home-account',
      route: '/home'
    },
    {
      name: 'Malla Curricular',
      icon: 'mdi-book-open-page-variant',
      route: '/curriculum'
    },
    {
      name: 'Implementos',
      icon: 'mdi-package-variant',
      route: '/implements'
    },
    {
      name: 'Docentes',
      icon: 'mdi-account-box',
      route: '/teachers'
    },
    {
      name: 'Salones',
      icon: 'mdi-theater',
      route: '/classrooms'
    },
    {
      name: 'Reservas',
      icon: 'mdi-calendar-clock',
      route: '/bookings'
    },
    {
      name: 'Usuarios',
      icon: 'mdi-account-group',
      route: '/users'
    }
  ]
  const nameProfile = computed(() => extractFullNameFromSession() || 'No Name')
  return { drawer, rail, routes, nameProfile, imageProfile }
})
