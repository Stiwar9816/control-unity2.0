<template>
  <div class="d-md-flex d-sm-block">
    <v-btn
      prepend-icon="mdi-database-arrow-up-outline"
      variant="flat"
      rounded="md"
      color="tradewind500"
      class="mx-2"
      @click="openFileInput"
    >
      <template v-slot:prepend>
        <v-icon color="white" />
      </template>
      <v-tooltip activator="parent" location="top">Importar excel</v-tooltip>
      {{ props.labelButton }}
    </v-btn>
    <div v-if="loading">
      <!-- Mostrar el loader mientras se carga el archivo -->
      <v-progress-circular
        color="tradewind300"
        indeterminate
        style="display: block"
        class="my-1 mx-2"
        size="small"
      ></v-progress-circular>
    </div>

    <div v-else-if="file && !importCompleted">
      <v-chip class="my-1 mx-2" variant="text">
        <v-tooltip activator="parent" location="top">{{ buttonText }}</v-tooltip>
        <v-icon icon="mdi-file-excel-outline" color="success" class="mr-2" /> {{ buttonText }}
      </v-chip>
    </div>

    <v-file-input
      ref="fileInputRef"
      v-model="file"
      accept=".xls, .xlsx"
      show-size
      @change="handleFileChange"
      style="display: none"
    ></v-file-input>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import * as XLSX from 'xlsx'
//Utils
import {
  determineRoute,
  formatBytes,
  handleClassroomData,
  handleImplementData,
  handleTeacherData,
  handleUsersData,
  validateAndIterateRows
} from '@/utils'
// Const
const file = ref<File | any>(null)
const fileInputRef = ref<HTMLInputElement | null>(null)
const loading = ref<Boolean>(false)
const importCompleted = ref<Boolean>(false)
// Props
const props = defineProps({
  labelButton: {
    type: String,
    default: 'Importar'
  },
  fnExport: Function
})

// Computed property to dynamically set the button text
const buttonText = computed(() => {
  if (file.value && file.value.length > 0) {
    const fileName = file.value[0].name
    const fileSize = formatBytes(file.value[0].size)
    return `${fileName} (${fileSize})`
  }
})

const openFileInput = () => {
  // Abre el campo de entrada de archivo al hacer clic en el botón
  fileInputRef.value!.click()
}

// Handle file change
const handleFileChange = async () => {
  try {
    loading.value = true
    importCompleted.value = false
    if (file.value && file.value.length > 0) {
      const importedFile = file.value[0]
      // Leyendo el archivo de excel
      const workbook = XLSX.read(await importedFile.arrayBuffer(), { type: 'array' })
      const sheet = workbook.Sheets[workbook.SheetNames[0]]
      // Convirtiendo la hoja de calculo de array a un objecto
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 })
      const route = determineRoute(workbook)

      switch (route) {
        case 'teacher':
          validateAndIterateRows(data, handleTeacherData)
          break
        case 'user':
          validateAndIterateRows(data, handleUsersData)
          break
        case 'implement':
          validateAndIterateRows(data, handleImplementData)
          break
        case 'classroom':
          validateAndIterateRows(data, handleClassroomData)
        // Agrega más casos según tus necesidades
        default:
          // Handle default case
          console.error('El archivo contiene un esquema invalido')
          break
      }
    }
  } catch (error) {
    console.error('Error al manejar el cambio de archivo', error)
  } finally {
    // Espera 1 segundo para cambiar el estado del loading y el chip
    setTimeout(() => {
      loading.value = false
      importCompleted.value = true
    }, 1000)
  }
}
</script>
