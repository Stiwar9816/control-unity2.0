import { test, expect, Page, ElementHandle } from '@playwright/test'
import { loginViewTest } from './loginView.spec.ts'

const pageImplement = async (page: Page) => {
  await loginViewTest(page)
  await page.goto('/implements')
}
const dialogImplement = async (page: Page) => {
  const inputName = page.getByRole('textbox', { name: 'Nombre' })
  const inputSerial = page.getByRole('textbox', { name: 'Serial' })
  const inputManufacture = page.getByRole('textbox', { name: 'Marca' })
  const inputModel = page.getByRole('textbox', { name: 'Modelo' })
  const inputLocation = page.getByRole('textbox', { name: 'Ubicación' })
  const inputNote = page.getByRole('textbox', { name: 'Nota' })
  // Agreagando valores de prueba
  await inputName.fill('Implement test')
  await inputSerial.fill('Serial test')
  await inputManufacture.fill('Marca test')
  // Haciendo clic en el v-select para abrir las opciones
  await page.click('[data-cy=selectType]')
  // Esperar a que aparezcan las opciones
  await page.waitForSelector('[data-cy=selectType]')
  // Seleccionar la opción por texto
  await page.click('text=Portatil')
  await inputModel.fill('Model test')
  await inputLocation.fill('Ubicación test')
  await page.click('[data-cy=selectResponsible]')
  await page.waitForSelector('[data-cy=selectResponsible]')
  await page.click('text=user test')
  await inputNote.fill('Nota test')

  expect(await inputName.inputValue()).toContain('Implement test')
  expect(await inputSerial.inputValue()).toContain('Serial test')
  expect(await inputManufacture.inputValue()).toContain('Marca test')
  expect(await inputModel.inputValue()).toContain('Model test')
  const selectedType = await page.textContent('[data-cy=selectType]')
  expect(selectedType).toContain('Portatil')
  expect(await inputLocation.inputValue()).toContain('Ubicación test')
  const selectedResponsible = await page.textContent('[data-cy=selectResponsible]')
  expect(selectedResponsible).toContain('user test')
  expect(await inputNote.inputValue()).toContain('Nota test')
  const buttonSave = page.getByRole('button', { name: 'Guardar' })
  await buttonSave.click()
}
test('Search Input', async ({ page }) => {
  await pageImplement(page)
  const locator = await page.getByLabel('search implement')
  await locator.click()
  await locator.fill('Test')
  expect(await locator.inputValue()).toBe('Test')
})

test('Display dialog add implement', async ({ page }) => {
  await pageImplement(page)
  const locator = page.getByRole('button', { name: 'Nuevo implemento' })
  await locator.click()
  expect(locator.isVisible).toBeTruthy()
  await dialogImplement(page)
})
