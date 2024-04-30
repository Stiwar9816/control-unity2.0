<template>
  <v-row no-gutters>
    <v-col cols="12">
      <!-- Input Search -->
      <v-text-field
        class="mt-4"
        clearable
        color="tradewind400"
        density="comfortable"
        label="Buscar salón"
        prepend-inner-icon="mdi-magnify"
        type="text"
        v-model="search"
        variant="underlined"
      ></v-text-field>
      <!-- End Input Search -->
      <div class="d-flex">
        <!-- Button Export -->
        <ButtonExportExcel class="mt-1 mb-4" :fn-export="handleExportClick" />
        <!-- Button Export -->
        <!-- Button Import -->
        <ButtonImportExcel class="mt-1 mb-4" />
        <!-- Button Import -->
      </div>
      <v-spacer />
    </v-col>

    <v-data-table
      :headers="props.headers"
      :items="props.items"
      :search="search"
      :items-per-page="10"
      :sort-by="[{ key: 'status', order: 'desc' }]"
      ref="tableClassroom"
    >
      <template v-slot:top>
        <v-toolbar class="rounded-lg" color="tradewind50" density="comfortable" flat>
          <v-spacer />
          <!-- Dialog Add/Edit -->
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ props }">
              <v-btn
                prepend-icon="mdi-plus"
                variant="flat"
                color="tradewind500"
                rounded="md"
                class="my-2"
                v-bind="props"
              >
                Nuevo salón
              </v-btn>
            </template>
            <AddFormClassroom
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
              form-title="Eliminar salón"
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
        <v-icon size="small" class="me-2" @click="editItem(item)" color="tradewind500" aria-label="button edit">
          mdi-pencil
        </v-icon>
        <v-icon size="small" color="error" @click="deleteItem(item)" aria-label="button delete"> mdi-delete </v-icon>
      </template>
      <!-- End Actions -->
      <template v-slot:no-data>
        <p class="pa-5">¡No hay registros!</p>
      </template>
    </v-data-table>
    <v-snackbar
      v-model="showSnackbar"
      :timeout="4000"
      :color="color"
      rounded="pill"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
  </v-row>
</template>
<script lang="ts" setup>
import { ref, type DeepReadonly, onMounted, computed } from 'vue'
// Components
import AddFormClassroom from '@/components/forms/AddFormClassroom.vue'
import ModalDelete from '@/components/forms/DeleteData.vue'
import ButtonExportExcel from '@/components/buttons/ButtonExportExcel.vue'
import ButtonImportExcel from '@/components/buttons/ButtonImportExcel.vue'
// Stores
import { useClassroomsStore } from '@/stores'
// Interface
import type { DataTableHeader, ClassroomsData } from '@/interface'
// utils
import { exportData } from '@/utils'
// Props
const props = defineProps({
  headers: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]>,
  items: Array<ClassroomsData>
})
// Const
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const tableClassroom = ref<HTMLElement | null>(null)
const search = ref<string>('')
const data = ref<ClassroomsData[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<ClassroomsData>({
  nomenclature: '',
  location: '',
  tech_resources: [''],
  connectivity: [''],
  ability: 0
})
const defaultItem = ref<ClassroomsData>({
  nomenclature: '',
  location: '',
  tech_resources: [''],
  connectivity: [''],
  ability: 0
})
// Initialization Store
const rooms = useClassroomsStore()
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')
// Methods / Actions
const initialize = async () => {
  try {
    await Promise.all([rooms.allRooms()])
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
  exportData(props, tableClassroom, 'Salones', 'Información_Salones')
}

const formTitle = computed(() => {
  return !editedItem.value.id ? 'Nuevo Salón' : 'Editar Salón'
})

const editItem = (item: ClassroomsData) => {
  editedIndex.value = data.value.indexOf(item)

  // Verifica si tech_resources es un string antes de aplicar split
  const techResources =
    typeof item.tech_resources === 'string' ? item.tech_resources.split(',') : item.tech_resources

  // Verifica si connectivity es un string antes de aplicar split
  const connectivity =
    typeof item.connectivity === 'string' ? item.connectivity.split(',') : item.connectivity

  editedItem.value = Object.assign(
    {},
    {
      id: item.id,
      nomenclature: item.nomenclature,
      location: item.location,
      tech_resources: techResources,
      connectivity: connectivity,
      ability: item.ability,
      status: item.status
    }
  )
  dialog.value = true
}

const close = () => {
  dialog.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const deleteItem = (item: ClassroomsData) => {
  editedIndex.value = props.items!.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const deleteItemConfirm = async () => {
  await rooms.deleteRoom(editedItem.value.id!)
  closeDelete()
}

const closeDelete = () => {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const save = async () => {
  try {
    let { id, ability, tech_resources, connectivity, ...res } = editedItem.value
    ability = +ability
    tech_resources = tech_resources.toString()
    connectivity = connectivity.toString()
    if (!id) {
      await rooms.addRoom({ ability, tech_resources, connectivity, ...res })
      showSnackbar.value = true
      message.value = `¡Nuevo(a) ${res.nomenclature} agregado(a) con exito!`
      color.value = 'tradewind600'
      close()
    } else {
      await rooms.updateRoom(id, { ability, tech_resources, connectivity, ...res })
      showSnackbar.value = true
      message.value = `¡El ${res.nomenclature} fue actualizado con exito!`
      color.value = 'tradewind600'
      close()
    }
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

const updateStatus = async (item: ClassroomsData) => {
  try {
    let { id, ...res } = item
    await rooms.updateRoom(id!, res)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
