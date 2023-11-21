<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
      <!-- Input Search -->
      <v-text-field
        class="mt-4"
        clearable
        color="tradewind400"
        density="comfortable"
        label="Buscar docente"
        prepend-inner-icon="mdi-magnify"
        type="text"
        v-model="search"
        variant="underlined"
      ></v-text-field>
      <!-- End Input Search -->
    </v-col>
    <v-data-table
      :headers="props.headers"
      :items="props.items"
      :search="search"
      :items-per-page="10"
      :sort-by="[{ key: 'name', order: 'asc' }]"
    >
      <template v-slot:top>
        <v-toolbar class="rounded-lg" color="tradewind50" density="comfortable" flat>
          <v-spacer />
          <v-dialog v-model="dialog" persistent max-width="600px">
            <template v-slot:activator="{ props }">
              <v-btn
                prepend-icon="mdi-plus"
                variant="flat"
                color="tradewind500"
                rounded="lg"
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
          <!-- <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog> -->
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
          :label="item.status ? 'Activo' : 'Inactivo'"
          color="tradewind500"
          @change="updateStatus"
        ></v-switch>
      </template>
      <!-- End Status -->
      <!-- Actions -->
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)" color="tradewind500">
          mdi-pencil
        </v-icon>
        <v-icon size="small" color="error"> mdi-delete </v-icon>
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
import AddFormTeacher from '@/components/forms/AddFormTeacher.vue'
//Stores
import { useTeacherStore } from '@/stores'
// Interface
import type { DataTableHeader, TeachersData } from '@/interface'
// Props
const props = defineProps({
  headers: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]>,
  items: Array<TeachersData>
})
// Const
const dialog = ref<boolean>(false)
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

const updateStatus = async () => {
  try {
    console.log('Valor de editedItem.value:', editedItem.value)
    let { id, status } = editedItem.value    
    console.log(id,status);
    // await teacher.updateStatus(id!, status)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
