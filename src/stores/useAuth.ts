import { defineStore } from 'pinia'
// Router
import router from '@/router'
// Utils
import { randomPassword, supabase } from '@/utils'
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
    },
    async resetPasswordForEmail(email: string) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${import.meta.env.VITE_SITE_URL}/update-password`
      })
      if (error) {
        if (error.status === 429 && error.name === 'AuthApiError') {
          throw new Error(
            'por motivos de seguridad, solo puedes solicitar esto una vez cada 60 segundos.'
          )
        }
        throw new Error(error.message)
      }
    },
    async updatePassword(password: string) {
      const { error } = await supabase.auth.updateUser({
        password
      })
      if (error) throw new Error(`${error.message}`)
    },
    async updatePasswordAuth(password: string) {
      const { error } = await supabase.auth.updateUser({
        password,
        nonce: randomPassword(12)
      })
      if (error) throw new Error(`${error.message}`)
    }
  }
})
