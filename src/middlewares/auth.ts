import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'
// Store
import { useAuthStore } from '@/stores'

export const requiredAuth = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // Initialization Store
    const authStore = useAuthStore()
    if (!authStore.isAuthenticated) {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    next()
  }
}

export const useGuard = (
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void => {
  // Initialization Store
  const authStore = useAuthStore()
  if (authStore.isAuthenticated) {
    next({ path: '/home' })
  } else {
    next()
  }
}
