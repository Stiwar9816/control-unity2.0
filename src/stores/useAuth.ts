import { defineStore } from 'pinia'
// Router
import router from '@/router'
// Utils
import { supabase } from '@/utils'
// Interface
import type { AuthState, SigninInput } from '@/interface'

export const useAuthStore = defineStore({
  id: 'auth',
  state: (): AuthState => ({
    token: sessionStorage.getItem('token') || null
  }),
  getters: {
    isAuthenticated(state): boolean {
      return !!state.token
    }
  },
  actions: {
    async login({ email, password }: SigninInput) {
      //   const { data: users, error: invalid } = await supabase
      //     .from('users')
      //     .select('isActive,email,roles')
      //     .eq('email', `${email}`)
      //     .single()

      //   if (invalid) throw new Error(invalid.message)

      //   if (!users) throw new Error('Usuario no encontrado')

      //   if (users?.isActive !== 'Activo')
      //     throw new Error('Usuario inactivo comuniquese con un administrador')

      //   if (!users.roles || !users.roles.includes('Administrador')) {
      //     throw new Error('No tienes permisos de administrador para iniciar sesión')
      //   }

      const {
        data: { user, session },
        error
      } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      const tokenSupa = session?.access_token

      if (error) {
        throw new Error(error.message)
      } else {
        sessionStorage.setItem('token', tokenSupa!)
        this.token = tokenSupa!
        return user
      }
    },
    async logout() {
      const { error } = await supabase.auth.signOut()

      if (error) {
        throw new Error(error.message)
      } else {
        sessionStorage.removeItem('token')
        this.token = null
        router.replace('/')
      }
    }
  }
})
