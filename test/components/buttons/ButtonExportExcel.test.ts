import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonExportExcel from '../../../src/components/buttons/ButtonExportExcel.vue'

describe('ButtonExportExcel Component', () => {
  it('Button with props valid and fnExport called', async () => {
    // Flag para verificar si fnExport se ha llamado
    let fnExportCalled = true
    // Mock de la función fnExport
    const fnExportMock = () => {
      console.log('exportando...')
      fnExportCalled
    }
    // Props para testear
    const props = {
      labelButton: 'Exportar test',
      fnExport: fnExportMock
    }
    // Montamos el componente con los props definidos
    const wrapper = mount(ButtonExportExcel, { props })
    // Accedemos a la instancia del componente
    const vm = wrapper.vm
    // Verificamos que el componente se haya renderizado correctamente
    expect(vm).toBeTruthy()
    // Verificamos que los props se hayan pasado correctamente
    expect(vm.labelButton).toBe('Exportar test')
    expect(typeof vm.fnExport).toBe('function')
    // Simulamos un clic en el botón y verifica que la función fnExport se haya llamado
    await wrapper.trigger('click')
    expect(fnExportCalled).toBe(true)
    // Destruimos la instancia del componente después de las pruebas
    wrapper.unmount()
  })

  it('Null fnExport prop does not throw errors', () => {
    // Props para testear
    const props = {
      labelButton: 'Exportar test',
      fnExport: null
    }
    // Montamos el componente con los props definidos y verifica que no se lance ningún error
    expect(() => {
      mount(ButtonExportExcel, { props })
    }).not.toThrow()
  })
})
