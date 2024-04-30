import type { App } from 'vue'
import type { ModuleNamespace } from 'vite/types/hot.js'

/**
 * Register Vue layouts in the app instance.
 *
 * @param {App<Element>} app - The Vue app instance.
 */
export function registerLayouts(app: App<Element>) {
  // Importar solo los componentes que necesitamos
  const layouts = import.meta.globEager<string, ModuleNamespace>('./*Layout.vue')

  const registeredComponents = new Set<string>()

  Object.values(layouts).forEach((layout: any) => {
    const layoutComponent = layout.default
    // Registrar solo los componentes que son 'DashboardLayout' o 'DefaultLayout'
    if (
      layoutComponent &&
      (layoutComponent.name === 'DashboardLayout' || layoutComponent.name === 'DefaultLayout') &&
      !registeredComponents.has(layoutComponent.name)
    ) {
      app.component(layoutComponent.name, layoutComponent)
      registeredComponents.add(layoutComponent.name)
    }
  })

  if (registeredComponents.size === 0) {
    console.log('No layouts found')
  }
}
