<template>
  <v-row no-gutters>
    <v-col cols="12" md="4">
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
          <!-- Dialog Add/Edit -->
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
        ></v-switch>
      </template>
      <!-- End Status -->
      <!-- Actions -->
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="editItem(item)" color="tradewind500">
          mdi-pencil
        </v-icon>
        <v-icon size="small" color="error" @click="deleteItem(item)"> mdi-delete </v-icon>
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
const dialogDelete = ref<boolean>(false)
const search = ref<string>('')
const data = ref<ClassroomsData[]>([])
const editedIndex = ref<number>(-1)
const editedItem = ref<ClassroomsData>({
  nomenclature: '',
  location: '',
  tech_resources: [],
  connectivity: [],
  ability: 0
})
const defaultItem = ref<ClassroomsData>({
  nomenclature: '',
  location: '',
  tech_resources: [],
  connectivity: [],
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
  editedItem.value = {
    id: item.id,
    nomenclature: item.nomenclature,
    location: item.location,
    tech_resources: item.tech_resources,
    connectivity: item.connectivity,
    ability: item.ability,
    status: item.status
  }
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
</script>
