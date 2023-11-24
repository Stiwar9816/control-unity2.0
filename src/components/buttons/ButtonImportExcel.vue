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
        style="display: block !important"
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
//Stores
import { useTeacherStore, useUserStore, useClassroomsStore, useImplementsStore } from '@/stores'
// Initialization Store
const teacher = useTeacherStore()
const user = useUserStore()
const implement = useImplementsStore()
const room = useClassroomsStore()
//Utils
import { validateAndIterateRows, formatBytes } from '@/utils'
// import { handleTeacherData, handleClassroomData, handleImplementData } from '@/utils'
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
      validateAndIterateRows(data, handleTeacherData)
    }
  } catch (error) {
    console.error('Error al manejar el cambio de archivo', error)
  } finally {
    // Wait for 1 second before setting loading to false
    // Espera 1 segundo para cambiar el estado del loading y el chip
    setTimeout(() => {
      loading.value = false
      importCompleted.value = true
    }, 1000)
  }
}

// Handle teacher data
const handleTeacherData = async (rowData: any) => {
  try {
    // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
    const teacherData = {
      cc: rowData['C.C'],
      name: rowData['Nombre Completo'],
      email: rowData['Correo electronico'],
      phone: rowData['Teléfono'],
      status: rowData['Estado']
    }
    // Agregar datos del docente
    await teacher.addTeacher(teacherData)
  } catch (error) {
    console.error('Error al agregar los docentes:', error)
    // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
  }
}
// Handle users data
const handleUsersData = async (rowData: any) => {
  try {
    // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
    const usersData = {
      cc: rowData['C.C'],
      name: rowData['Nombre Completo'],
      email: rowData['Correo electronico'],
      role: rowData['Rol'],
      phone: rowData['Teléfono'],
      status: rowData['Estado']
    }
    // Agregar datos del docente
    console.log(usersData)
  } catch (error) {
    console.error('Error al agregar los usuarios:', error)
    // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
  }
}
// Handle implement data
const handleImplementData = async (rowData: any) => {
  try {
    // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
    const implementsData = {
      name: rowData['Nombre'],
      serial: rowData['Serial'],
      manufacturer: rowData['Marca'],
      type: rowData['Tipo'],
      model: rowData['Modelo'],
      location: rowData['Ubicación'],
      responsible: rowData['Responsable'],
      note: rowData['Nota'],
      status: rowData['Estado']
    }
    // Agregar datos de los implementos
    await implement.addImplement(implementsData)
  } catch (error) {
    console.error('Error al agregar los implementos:', error)
    // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
  }
}
// Handle classroom data
const handleClassroomData = async (rowData: any) => {
  try {
    // Asegúrate de que las claves en rowData coincidan con las propiedades en tu modelo de datos
    const classroomData = {
      nomenclature: rowData['Nomenclatura'],
      location: rowData['Ubicación'],
      tech_resources: rowData['Recursos tecnológicos'],
      connectivity: rowData['Conectividad'],
      ability: rowData['Capacidad'],
      status: rowData['Estado']
    }
    // Agregar datos de los salones
    await room.addRoom(classroomData)
  } catch (error) {
    console.error('Error al agregar los salones:', error)
    // Puedes manejar el error de alguna manera, dependiendo de tus requisitos.
  }
}
</script>
