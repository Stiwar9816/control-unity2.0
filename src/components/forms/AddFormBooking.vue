<template>
  <v-container fluid>
    <v-form>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field v-model="props.dataFormBooking!.cc" :rules="requiredValue" label="N° de identificación"
            type="number" min="0" variant="underlined" color="tradewind500" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="props.dataFormBooking!.name" :rules="requiredValue" label="Nombre completo" type="text"
            variant="underlined" color="tradewind500" required></v-text-field>
        </v-col>


        <v-col cols="12" md="4">
          <v-text-field v-model="props.dataFormBooking!.phone" :rules="requiredValue" label="Teléfono" type="number"
            min="0" variant="underlined" color="tradewind500" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select v-model="props.dataFormBooking!.carrer" label="Programa" :rules="requiredValue"
            :items="dataSelectCarrer" variant="underlined" color="tradewind500" type="text" clearable />
        </v-col>

        <v-col cols="12" md="4">
          <v-select v-model="props.dataFormBooking!.implements" :items="dataImplement" item-title="name" item-value="id"
            variant="underlined" chips clearable label="Implementos" no-data-text="No hay implementos registrados"
            multiple persistent-hint />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field v-model="props.dataFormBooking!.event" :rules="requiredValue" label="Evento" type="text"
            variant="underlined" color="tradewind500" required></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select v-model="props.dataFormBooking!.classroom" :items="dataRoom" item-title="nomenclature"
            item-value="id" variant="underlined" clearable label="Salón" no-data-text="No hay salones registrados"
            persistent-hint />
        </v-col>
        
        <v-col cols="12" md="4">
          <v-date-picker v-model:model-value="props.dataFormBooking!.startDate" color="tradewind500"
            title="Fecha de inicio" header="Elija una fecha" />
          <v-text-field v-model="props.dataFormBooking!.startTime" :active="timeStart" :focus="timeStart"
            label="Hora inicial" prepend-icon="mdi-clock-time-four-outline" readonly>
            <v-menu v-model="timeStart" :close-on-content-click="false" activator="parent"
              transition="scale-transition">
              <v-time-picker v-if="timeStart" v-model="props.dataFormBooking!.startTime" format="24hr"
                :max="props.dataFormBooking!.endTime" full-width />
            </v-menu>
          </v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-date-picker v-model:model-value="props.dataFormBooking!.endDate" color="tradewind500"
            title="Fecha de final" header="Elija una fecha" :min="props.dataFormBooking!.startDate" />
          <v-text-field v-model="props.dataFormBooking!.endTime" :active="timeEnd" :focus="timeEnd" label="Hora final"
            prepend-icon="mdi-clock-time-four-outline" readonly>
            <v-menu v-model="timeEnd" :close-on-content-click="false" activator="parent" transition="scale-transition">
              <v-time-picker v-if="timeEnd" v-model="props.dataFormBooking!.endTime" format="24hr"
                :min="props.dataFormBooking!.startTime" full-width />
            </v-menu>
          </v-text-field>
        </v-col>

      </v-row>
    </v-form>
    <!-- Alert -->
    <v-snackbar v-model="showSnackbar" :timeout="4000" :color="color" rounded="pill" location="bottom right">
      {{ message }}
    </v-snackbar>
    <!-- End Alert -->
  </v-container>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
// Utils
import { requiredValue } from '@/utils'
import moment from 'moment'
//Stores
import { useImplementsStore, useClassroomsStore } from '@/stores'
// Interface
import type { ClassroomsData, ImplementsData } from '@/interface';
// Props
const props = defineProps({
  dataFormBooking: {
    type: Object,
    defult: {
      cc: Number,
      name: String,
      phone: Number,
      event: String,
      carrer: String,
      classroom: String,
      startDate: Date,
      endDate: Date,
      startTime: String,
      endTime: String,
      implements: Array
    }
  }
})

// Initialization Store
const implement = useImplementsStore()
const room = useClassroomsStore()
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')
// Methods / Actions
const initialize = async () => {
  try {
    const implementList = await implement.allImplements()
    const roomList = await room.allRooms()
    dataImplement.value = implementList
    dataRoom.value = roomList
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}

onMounted(() => {
  initialize()
})

const dataImplement = ref<ImplementsData[]>()
const dataRoom = ref<ClassroomsData[]>([])

const timeStart = ref<boolean>(false)
const timeEnd = ref<boolean>(false)

const formatDate = (date: Date): string => {
  return moment(date).locale('es').format('LL');
}

const formattedStartDate = computed(() => {
  if (props.dataFormBooking!.startDate.value) {
    return formatDate(props.dataFormBooking!.startDate.value);
  }
  return '';
});

const formattedEndDate = computed(() => {
  if (props.dataFormBooking!.endDate.value) {
    return formatDate(props.dataFormBooking!.endDate.value);
  }
  return '';
});

// Selects
const dataSelectCarrer: string[] = [
  'Ingenieria de sitemas',
  'Ingenieria Industrial',
  'Psicología',
  'Trabajo social',
  'Derecho',
  'Ep. Contratación estatal',
  'Ep. Estudios bíblicos',
  'Ep. Gerencia financiera',
  'Ep. Gestión de métodos y técnicas de investigación en ciencias sociales',
  'Ep. Gestión de procesos psicosociales',
  'Ep. Periodismo de paz',
  'Ma. Conflicto y paz',
  'Ma. Contratación estatal',
  'Ma. Educación',
  'Ma. Gestión de procesos psicosociales'
]
</script>
