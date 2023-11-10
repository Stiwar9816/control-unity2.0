<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
      <!-- Input Search -->
      <input-search :modelSearch="search" label-input="Buscar Implemento" />
      <!-- End Input Search -->
    </v-col>
    <v-data-table
      :headers="props.headers"
      :items="props.data"
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
                Nuevo implemento
              </v-btn>
            </template>
            <AddFormImplement
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
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon size="small"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <p class="pa-5">¡No hay registros!</p>
      </template>
    </v-data-table>
  </v-row>
</template>
<script lang="ts" setup>
import { ref, type DeepReadonly, onMounted, computed } from 'vue'
// Components
import InputSearch from '@/components/inputs/InputSearch.vue'
import AddFormImplement from '@/components/forms/AddFormImplement.vue'
// Interface
import type { DataTableHeader, ImplementsData } from '@/interface'
// Props
const props = defineProps({
  headers: Array as () => DeepReadonly<DataTableHeader[] | DataTableHeader[][]>,
  data: Array<ImplementsData[]>
})
// Const
const dialog = ref<boolean>(false)
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

// Methods / Actions
const initialize = async () => {
  try {
    console.log('Implements Data')
  } catch (error: any) {
    console.log(error)
    // showSnackbar.value = true
    // message.value = `¡Ha ocurrido un error: ${error.message}!`
    // color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})

const formTitle = computed(() => {
  return !editedItem.value.id ? 'Nuevo Implemento' : 'Editar Implemento'
})

const editItem = (item: ImplementsData) => {
  editedIndex.value = data.value.indexOf(item)
  editedItem.value = Object.assign(
    {},
    {
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
    console.log('Implement Save')
  } catch (error: any) {
    console.log(error)
    // showSnackbar.value = true
    // message.value = `¡Ha ocurrido un error: ${error.message}!`
    // color.value = 'red-darken-3'
  }
}
</script>
