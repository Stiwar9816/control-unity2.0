import { it, expect, describe } from 'vitest'
import { mount } from '@vue/test-utils'
import ButtonImportExcel from '../../../src/components/buttons/ButtonImportExcel.vue'

describe('ButtonImportExcel Component', () => {
  it('Button with props valid and fnImport called', async () => {
    // Flag para verificar si fnExport se ha llamado
    let fnImportCalled = true
    // Mock de la función fnExport
    const fnImportMock = () => {
      console.log('Importando...')
      fnImportCalled
    }
    // Props para testear
    const props = {
      labelButton: 'Importar test',
      fnExport: fnImportMock
    }
    // Montamos el componente con los props definidos
    const wrapper = mount(ButtonImportExcel, { props })
    // Accedemos a la instancia del componente
    const vm = wrapper.vm
    // Verificamos que el componente se haya renderizado correctamente
    expect(vm).toBeTruthy()
    // Verificamos que los props se hayan pasado correctamente
    expect(vm.labelButton).toBe('Importar test')
    expect(typeof vm.fnExport).toBe('function')
    // Simulamos un clic en el botón y verifica que la función fnExport se haya llamado
    await wrapper.trigger('click')
    expect(fnImportCalled).toBe(true)
    // Destruimos la instancia del componente después de las pruebas
    wrapper.unmount()
  })

  it('Open dialog fileInput', () => {
    // Mock de la función fnExport
    const fnImportMock = () => {
      console.log('Importando...')
    }
    // Props para testear
    const props = {
      labelButton: 'Importar test',
      fnExport: fnImportMock
    }
    // Montamos el componente con los props definidos
    const wrapper = mount(ButtonImportExcel, { props })
    // Verificamos si el cuadro de diálogo de selección de archivo está visible
    const fileInput = wrapper.find({ ref: 'fileInputRef' })
    expect(fileInput.exists()).toBe(true)
    // Destruimos la instancia del componente después de las pruebas
    wrapper.unmount()
  })

  it('upload file .xlsx or .xls', async () => {
    // Mock de la función fnExport
    const fnImportMock = () => {
      console.log('Importando...')
    }
    // Props para testear
    const props = {
      labelButton: 'Importar test',
      fnExport: fnImportMock
    }
    // Montamos el componente con los props definidos
    const wrapper = mount(ButtonImportExcel, { props })
    // Encontramos el input de archivos
    const fileInput = wrapper.find({ ref: 'fileInputRef' })
    // Accedemos a la instancia del componente
    const vm = wrapper.vm
    if (vm.$el && vm.$el.value) {
      // Simulamos el cambio en el input de archivos con un archivo .xlsx
      vm.$el.value.$emit('change', {
        target: {
          files: [
            {
              name: 'archivo.xlsx',
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }
          ]
        }
      })
      // Verificamos si el archivo se ha establecido correctamente en la propiedad del componente
      expect(vm.$data).toHaveLength(1)
      expect(vm.$data[0].name).toBe('archivo.xlsx')
      // Simulamos el cambio en el input de archivos con un archivo .xls
      vm.$el.value.$emit('change', {
        target: {
          files: [{ name: 'archivo.xls', type: 'application/vnd.ms-excel' }]
        }
      })
      // Verificamos si el archivo se ha establecido correctamente en la propiedad del componente
      expect(vm.$data).toHaveLength(1)
      expect(vm.$data[0].name).toBe('archivo.xls')
      // Verificamos que el inputFile contenga los atributos '{ accept: '.xls, .xlsx' }'
      expect(fileInput.attributes()).toContain({ accept: '.xls, .xlsx' })
    }
    // Destruimos la instancia del componente después de las pruebas
    wrapper.unmount()
  })
})
