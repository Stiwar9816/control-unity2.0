<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
      <!-- Input Search -->
      <InputSearch label="Buscar implemento" v-model="search" />
      <!-- End Input Search -->
      <div class="d-flex">
        <!-- Button Export -->
        <ButtonExportExcel class="mt-1 mb-4" :fn-export="handleExportClick" />
        <!-- Button Export -->
        <!-- Button Import -->
        <ButtonImportExcel class="mt-1 mb-4" />
        <!-- Button Import -->
      </div>
    </v-col>
    <v-data-table
      :headers="props.headers"
      :items="props.items"
      :search="search"
      :items-per-page="10"
      :sort-by="[{ key: 'status', order: 'desc' }]"
      ref="tableImplement"
    >
      <template v-slot:top>
        <v-toolbar class="rounded-lg" color="tradewind50" density="comfortable" flat>
          <v-spacer />
          <!-- Dialog Add/Edit -->
          <v-dialog v-model="dialog" id="dialogImplement" persistent max-width="600px">
            <template v-slot:activator="{ props }">
              <ButtonBase v-bind="props" label="Nuevo implemento" class="mx-2" />
            </template>
            <AddFormImplement
              :form-title="formTitle"
              :data-form="editedItem"
              :modal-close="close"
              :modal-save="save"
            />
          </v-dialog>
          <!-- Dialog Add/Edit -->
          <!-- Dialog delete -->
          <v-dialog v-model="dialogDelete" max-width="600px" persistent>
            <ModalDelete
              form-title="Eliminar implemento"
              type-delete="el"
              :data-form="editedItem"
              :modal-close="closeDelete"
              :modal-save="deleteItemConfirm"
            />
          </v-dialog>
          <!-- Dialog delete -->
        </v-toolbar>
      </template>
      <!-- Status -->
      <template v-slot:item.status="{ item }">
        <v-switch
          v-if="item.status !== undefined"
          v-model="item.status"
          hide-details
          true-icon="mdi-check-circle"
          false-icon="mdi-close-circle"
          color="tradewind500"
          @change="updateStatus(item)"
        ></v-switch>
      </template>
      <!-- End Status -->
      <!-- Actions -->
      <template v-slot:item.actions="{ item }">
        <v-icon
          size="small"
          class="me-2"
          @click="editItem(item)"
          color="tradewind500"
          aria-label="button edit"
        >
          mdi-pencil
        </v-icon>
        <v-icon size="small" color="error" @click="deleteItem(item)" aria-label="button delete">
          mdi-delete
        </v-icon>
      </template>
      <!-- End Actions -->
      <template v-slot:no-data>
        <v-empty-state size="150" text-width="250">
          <template v-slot:media>
            <v-img src="/images/undraw_empty_re_opql.svg" />
          </template>
          <template v-slot:text>
            <div class="text-body-1 my-2">¡No hay registros!</div>
          </template>
        </v-empty-state>
      </template>
    </v-data-table>
    <!-- Alert -->
    <SnackbarAlert v-model="showSnackbar" :message="message" :color="color" />
    <!-- End Alert -->
  </v-row>
</template>
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
// Components
import AddFormImplement from '@/components/forms/AddFormImplement.vue'
import ModalDelete from '@/components/forms/DeleteData.vue'
import ButtonExportExcel from '@/components/buttons/ButtonExportExcel.vue'
import ButtonImportExcel from '@/components/buttons/ButtonImportExcel.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
import SnackbarAlert from '@/components/alerts/SnackbarAlert.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
//Stores
import { useImplementsStore } from '@/stores'
// Interface
import type { DataTableHeader, ImplementsData } from '@/interface'
// utils
import { exportData } from '@/utils'
// Props
const props = defineProps<{
  headers: DataTableHeader[]
  items: ImplementsData[]
}>()
// Const
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const tableImplement = ref<HTMLElement | null>(null)
const search = ref<string>('')
const data = ref<ImplementsData[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<ImplementsData>({
  name: '',
  serial: '',
  manufacturer: '',
  type: '',
  model: '',
  location: '',
  responsible: '',
  note: ''
})
const defaultItem = ref<ImplementsData>({
  name: '',
  serial: '',
  manufacturer: '',
  type: '',
  model: '',
  location: '',
  responsible: '',
  note: ''
})
// Initialization Store
const implement = useImplementsStore()
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')
// Methods / Actions
const initialize = async () => {
  try {
    await Promise.all([implement.allImplements()])
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})

// Exportar información de la tabla a excel
const handleExportClick = () => {
  /* Espera los siguiente parametros:
    Props: Contiene los headers e items de la tabla
    tableRef: La propiedad ref del datatable por medio de este se hara referencia
    al elemento de donde obtendra la información
    worksheetName: Nombre de la hoja de la calculo
    nameSheet: Nombre del archivo a exportar 
  */
  exportData(props, tableImplement, 'Implementos', 'Información_Implementos')
}

const formTitle = computed(() => {
  return !editedItem.value.id ? 'Nuevo Implemento' : 'Editar Implemento'
})

const editItem = (item: ImplementsData) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = {
    id: item.id,
    name: item.name,
    serial: item.serial,
    manufacturer: item.manufacturer,
    type: item.type,
    model: item.model,
    location: item.location,
    responsible: item.responsible,
    note: item.note,
    status: item.status
  }
  dialog.value = true
}
const close = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const deleteItem = (item: ImplementsData) => {
  editedIndex.value = props.items!.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const deleteItemConfirm = async () => {
  await implement.deleteImplement(editedItem.value.id!)
  closeDelete()
}

const closeDelete = () => {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const save = async () => {
  try {
    let { id, ...res } = editedItem.value
    if (!id) {
      await implement.addImplement(res)
      showSnackbar.value = true
      message.value = `¡Nuevo implemento ${editedItem.value.name} fue agregado con exito!`
      color.value = 'tradewind600'
      close()
    } else {
      await implement.updateImplement(id, res)
      showSnackbar.value = true
      message.value = `¡El implemento ${res.name} fue actualizado con exito!`
      color.value = 'tradewind600'
      close()
    }
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

const updateStatus = async (item: ImplementsData) => {
  try {
    let { id, ...res } = item
    await implement.updateImplement(id!, res)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
