import { test, expect, Page } from '@playwright/test'
import { loginViewTest } from './loginView.spec.ts'

const pageImplement = async (page: Page) => {
  await loginViewTest(page)
  await page.goto('/implements')
}
const dialogImplement = async (page: Page) => {
  const inputName = page.getByLabel('Nombre')
  const inputSerial = page.getByLabel('Serial')
  const inputManufacture = page.getByLabel('Marca', { exact: true })
  const inputModel = page.getByLabel('Modelo', { exact: true })
  const inputLocation = page.getByLabel('Ubicación', { exact: true })
  const inputNote = page.getByLabel('Nota', { exact: true })
  // Agreagando valores de prueba
  await inputName.fill('Implement test')
  await inputSerial.fill('Serial test')
  await inputManufacture.fill('Marca test')

  await page.click('[data-cy=selectType]')
  await page.waitForSelector('[data-cy=selectType]')
  // await page.click('text=Portatil', { strict: true, force: true })
  // page.getByText('Tv').nth(2)
  page.getByRole('cell', { name: 'Portatil' }).locator('selectType',{hasText:'Tv'})
  // Seleccionar la opción por texto
  await inputModel.fill('Model test')
  await inputLocation.fill('Ubicación test')
  await page.click('[data-cy=selectResponsible]')
  await page.waitForSelector('[data-cy=selectResponsible]')
  // await page.click('text=Jhon E Palacios', { strict: true })
  // page.getByRole('cell', { name: 'Jhon E Palacios' }).first()

  await inputNote.fill('Nota test')
  expect(await inputName.inputValue()).toBe('Implement test')
  expect(await inputSerial.inputValue()).toBe('Serial test')
  expect(await inputManufacture.inputValue()).toBe('Marca test')
  expect(await inputModel.inputValue()).toBe('Model test')
  const selectedType = await page.textContent('[data-cy=selectType]')
  expect(selectedType).toBe('Tv')
  expect(await inputLocation.inputValue()).toBe('Ubicación test')
  const selectedResponsible = await page.textContent('[data-cy=selectResponsible]')
  expect(selectedResponsible).toBe('Jhon E Palacios')
  expect(await inputNote.inputValue()).toBe('Nota test')
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
