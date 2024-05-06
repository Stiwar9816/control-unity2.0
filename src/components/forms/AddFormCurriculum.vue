<template>
  <div>
    <v-card>
      <v-toolbar color="tradewind500">
        <v-card-title>
          <v-container>
            {{ props.formTitle }}
          </v-container>
        </v-card-title>
      </v-toolbar>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.subject" :rules="requiredValue" label="Asignatura" type="text"
                variant="underlined" color="tradewind500"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.program" :rules="requiredValue" label="Programa" type="text"
                variant="underlined" color="tradewind500"></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.level" label="Nivel" type="number" min="0" max="10"
                variant="underlined" color="tradewind500" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select v-model="props.dataForm!.working_day" label="Jornada" :rules="requiredValue"
                :items="dataSelectWorkingDay" :hide-selected="true" variant="underlined" color="tradewind500"
                type="text" clearable>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select v-model="props.dataForm!.teacher" label="Docente" :rules="requiredValue" :items="teacher.items"
                item-title="name" item-value="id" variant="underlined" color="tradewind500" type="text" clearable>
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.schedule" label="Horario" type="text" variant="underlined"
                color="tradewind500" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.time_start" label="Hora de inicio" type="text" variant="underlined"
                color="tradewind500" clearable></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field v-model="props.dataForm!.time_end" :rules="requiredValue" label="Hora de fin" type="text"
                variant="underlined" color="tradewind500" clearable></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-select v-model="props.dataForm!.classroom" label="Salón" :rules="requiredValue"
                :items="classroom.items" item-title="nomenclature" item-value="id" variant="underlined"
                color="tradewind500" type="text" clearable>
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="rounded-md" color="tradewind50" variant="flat" @click="props.modalClose">
          Cancelar
        </v-btn>
        <v-btn class="rounded-md" color="tradewind500" variant="flat" @click="props.modalSave">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
// Utils
import { requiredValue } from '@/utils'
// Props
const props = defineProps({
  formTitle: {
    type: String,
    default: 'Title Form'
  },
  dataForm: {
    type: Object,
    defult: {
      subject: String,
      program: String,
      level: Number,
      working_day: String,
      teacher: String,
      time_start: String,
      time_end: String,
      classroom: String,
      schedule: String,
    }
  },
  modalClose: {
    type: Function
  },
  modalSave: {
    type: Function
  }
})
// Selects
const dataSelectWorkingDay: string[] = ['Mañana', 'Tarde', 'Noche']
//Stores
import { useTeacherStore, useClassroomsStore } from '@/stores'
// Initialization Store
const teacher = useTeacherStore()
const classroom = useClassroomsStore()
// // Methods / Actions
const initialize = async () => {
  try {
    await Promise.all([teacher.allTeachers(), classroom.allRooms()])
  } catch (error: any) {
    throw new Error(`Ha ocurrido un error: ${error}`)
  }
}
onMounted(() => {
  initialize()
})
</script>
