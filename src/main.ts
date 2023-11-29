import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { registerLayouts } from './layouts/register'
import { vuetify } from './plugins/vuetify'
import { registerSW } from 'virtual:pwa-register'
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
  onRegisteredSW(swUrl, r) {
    r &&
      setInterval(async () => {
        if (!(!r.installing && navigator)) return
        if ('connection' in navigator && !navigator.onLine) return
        const resp = await fetch(swUrl, {
          cache: 'no-store',
          headers: {
            cache: 'no-store',
            'cache-control': 'no-cache'
          }
        })
        if (resp?.status === 200) await r.update()
      }, intervalMS)
  }
})
const app = createApp(App)
registerLayouts(app)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.mount('#app')
