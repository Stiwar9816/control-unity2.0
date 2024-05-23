<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
      <!-- Input Search -->
      <InputSearch label="Buscar docente" v-model="search" />
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
      ref="tableTeacher"
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
                Nuevo Docente
              </v-btn>
            </template>
            <AddFormTeacher
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
              form-title="Eliminar docente"
              type-delete="a"
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
import AddFormTeacher from '@/components/forms/AddFormTeacher.vue'
import ModalDelete from '@/components/forms/DeleteData.vue'
import ButtonExportExcel from '@/components/buttons/ButtonExportExcel.vue'
import ButtonImportExcel from '@/components/buttons/ButtonImportExcel.vue'
import InputSearch from '@/components/inputs/InputSearch.vue'
//Stores
import { useTeacherStore } from '@/stores'
// Interface
import type { DataTableHeader, TeachersData } from '@/interface'
// utils
import { exportData } from '@/utils'
// Props
const props = defineProps({
  headers: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]>,
  items: Array<TeachersData>
})
// Const
const dialog = ref<boolean>(false)
const dialogDelete = ref<boolean>(false)
const tableTeacher = ref<HTMLElement | null>(null)
const search = ref<string>('')
const data = ref<TeachersData[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<TeachersData>({
  cc: 0,
  email: '',
  name: '',
  phone: 0,
  status: false
})
const defaultItem = ref<TeachersData>({
  cc: 0,
  email: '',
  name: '',
  phone: 0,
  status: false
})
// Initialization Store
const teacher = useTeacherStore()
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')
// Methods / Actions
const initialize = async () => {
  try {
    await Promise.all([teacher.allTeachers()])
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
  exportData(props, tableTeacher, 'Docentes', 'Información_Docentes')
}

const formTitle = computed(() => {
  return !editedItem.value.id ? 'Nuevo Docente' : 'Editar Docente'
})

const editItem = (item: TeachersData) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
      cc: item.cc,
      email: item.email,
      id: item.id,
      name: item.name,
      phone: item.phone,
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

const deleteItem = (item: TeachersData) => {
  editedIndex.value = props.items!.indexOf(item)
  editedItem.value = Object.assign({}, item)
  dialogDelete.value = true
}

const closeDelete = () => {
  dialogDelete.value = false
  editedItem.value = Object.assign({}, defaultItem.value)
  editedIndex.value = -1
}

const deleteItemConfirm = async () => {
  await teacher.deleteTeacher(editedItem.value.id!)
  closeDelete()
}

const save = async () => {
  try {
    let { id, cc, phone, ...res } = editedItem.value
    cc = +cc
    phone = +phone
    if (!id) {
      await teacher.addTeacher({ cc, phone, ...res })
      showSnackbar.value = true
      message.value = `¡Nuevo Docente ${res.name} fue agregado con exito!`
      color.value = 'tradewind600'
      close()
    } else {
      await teacher.updateTeacher(id, { cc, phone, ...res })
      showSnackbar.value = true
      message.value = `¡La información del docente ${res.name} fue actualizada con exito!`
      color.value = 'tradewind600'
      close()
    }
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

const updateStatus = async (item: TeachersData) => {
  try {
    let { id, ...res } = item
    await teacher.updateTeacher(id!, res)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
