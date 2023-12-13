import { test, expect, Page } from '@playwright/test'

export const loginViewTest = async (page: Page): Promise<void> => {
  await page.goto('/')
  // Inputs
  await page.getByLabel('Email').fill('stiwar.asprilla1998@gmail.com')
  await page.getByLabel('current-password').fill('Abcd1234.')
  // Button Actions
  const locator = page.getByRole('button', { name: 'Iniciar Sesión' })
  await locator.click()
  // Rendering view home
  await expect(page.getByText('Home')).toBeVisible()
}

test('Test login', async ({ page }) => {
  await loginViewTest(page)
})
