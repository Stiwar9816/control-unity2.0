<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
      <!-- Input Search -->
      <input-search :modelSearch="search" label-input="Buscar Salón" />
      <!-- End Input Search -->
    </v-col>
    <v-data-table
      :headers="props.headers"
      :items="props.items"
      :search="search"
      :items-per-page="10"
      :sort-by="[{ key: 'nomenclature', order: 'asc' }]"
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
        <v-icon v-if="item.status" icon="mdi-check-circle" color="success" size="small" />
        <v-icon v-else icon="mdi-close-circle" color="error" size="small" />
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
import InputSearch from '@/components/inputs/InputSearch.vue'
import AddFormClassroom from '@/components/forms/AddFormClassroom.vue'
// Stores
import { useClassroomsStore } from '@/stores'
// Interface
import type { DataTableHeader, ClassroomsData } from '@/interface'
// Props
const props = defineProps({
  headers: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]>,
  items: Array<ClassroomsData>
})
// Const
const dialog = ref<boolean>(false)
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
console.log(editedItem)
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

const formTitle = computed(() => {
  return !editedItem.value.id ? 'Nuevo Salón' : 'Editar Salón'
})

const editItem = (item: ClassroomsData) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
      nomenclature: item.nomenclature,
      location: item.location,
      tech_resources: item.tech_resources,
      connectivity: item.connectivity,
      ability: item.ability
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
    let { ability, ...res } = editedItem.value
    ability = +ability
    await rooms.addRoom({ ability, ...res })
    showSnackbar.value = true
    message.value = `¡Nuevo salón ${res.nomenclature} agregado con exito!`
    color.value = 'tradewind600'
    close()
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>