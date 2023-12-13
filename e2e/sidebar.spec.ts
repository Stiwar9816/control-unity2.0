import { test, expect } from '@playwright/test'
import { loginViewTest } from './loginView.spec.ts'

test('Display nameProfile is displayed', async ({ page }) => {
  await loginViewTest(page)
  // Esperar a que la página se cargue completamente antes de continuar
  await page.waitForLoadState('load')
  // Validar que el nombre del perfil se muestre en la barra lateral
  expect(await page.textContent('[aria-label="nameProfile"]')).toBe('Stiwar Asprilla')
})

test('Logout app', async ({ page }) => {
  await loginViewTest(page)
  // Cerrar sesión y validar la funcionalidad de cierre de sesión
  await page.click('[aria-label="cerrar_sesión"]')
  expect(page.goto('/')).toBeTruthy()
})

test('Interaction with the side menu and navigation to the routes', async ({ page }) => {
  await loginViewTest(page)
  const asideMenu: string[] = [
    'Inicio ',
    'Malla Curricular ',
    'Implementos ',
    'Docentes ',
    'Salones ',
    'Reservas ',
    'Usuarios '
  ]
  const routeMenu: string[] = [
    'home',
    'curriculum',
    'implements',
    'teachers',
    'classrooms',
    'bookings',
    'users'
  ]
  await expect(page.getByRole('list')).toHaveText(asideMenu)
  for (let i = 0; i < asideMenu.length; i++) {
    const item: string = asideMenu[i]
    const route: string = routeMenu[i]
    await page
      .getByRole('list')
      .filter({ hasText: `${item}` })
      .click()
    // Esperar a que la página se cargue completamente antes de continuar
    await page.waitForLoadState('load')
    // Verificar que la URL de la página es la esperada
    expect(page.url()).toContain(`/${route}`)
  }
})
