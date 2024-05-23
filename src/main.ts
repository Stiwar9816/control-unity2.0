import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerLayouts } from './layouts/register'
import { vuetify } from './plugins/vuetify'
import { registerSW } from 'virtual:pwa-register'
import { registerLicense } from '@syncfusion/ej2-base'

registerLicense(`${import.meta.env.VITE_SYNCFUSION_REGISTER_LICENSE}`)

const intervalMS = 60 * 60 * 1000
const updateSW = registerSW({
  onNeedRefresh() {
    const userConfirmed = window.confirm(
      'Hay una nueva versión disponible. ¿Quieres actualizar la aplicación?'
    )
    if (userConfirmed) updateSW()
  },
  onOfflineReady() {
    window.alert('Estás listo para trabajar sin conexión.')
  },
  onRegisteredSW(swUrl, registration) {
    if (registration) {
      setInterval(async () => {
        try {
          if (!(registration.installing && navigator)) return
          if ('connection' in navigator && !navigator.onLine) return
          const resp = await fetch(swUrl, {
            cache: 'no-store',
            headers: {
              cache: 'no-store',
              'cache-control': 'no-cache'
            }
          })
          if (resp?.status === 200) await registration.update()
        } catch (error) {
          console.error('Error al actualizar la Service Worker:', error)
        }
      }, intervalMS)
    } else {
      console.error('No se pudo registrar la Service Worker')
    }
  },
  onRegisterError(error) {
    console.error('Error en la Service Worker:', error)
  }
})

const app = createApp(App)
registerLayouts(app)
app.use(createPinia())
app.use(vuetify)
app.use(router)
app.mount('#app')
