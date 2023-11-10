// path: src/layouts/register.ts

import type { App } from 'vue';
import type { ModuleNamespace } from 'vite/types/hot';

/**
 * Register Vue layouts in the app instance.
 *
 * @param {App<Element>} app - The Vue app instance.
 */
export function registerLayouts(app: App<Element>) {
  // Import all Vue layout components from the current directory.
  const layouts = import.meta.globEager<string, ModuleNamespace>('./*.vue');
  const registeredComponents = new Set<string>();

  // Loop through the layout components and register them.
  Object.values(layouts).forEach((layout) => {
    const layoutComponent = layout.default;
    if (layoutComponent && !registeredComponents.has(layoutComponent.name)) {
      app.component(layoutComponent.name, layoutComponent);
      registeredComponents.add(layoutComponent.name);
    }
  });
}
