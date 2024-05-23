<template>
  <v-container fluid>
    <v-form @submit="submitForm">
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="props.dataFormBooking!.document"
            :rules="requiredValue"
            label="N° de identificación"
            type="number"
            min="0"
            variant="underlined"
            color="tradewind500"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="props.dataFormBooking!.fullname"
            :rules="requiredValue"
            label="Nombre completo"
            type="text"
            variant="underlined"
            color="tradewind500"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="props.dataFormBooking!.phone"
            :rules="requiredValue"
            label="Teléfono"
            type="number"
            min="0"
            variant="underlined"
            color="tradewind500"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="props.dataFormBooking!.schedule"
            label="Programa"
            :rules="requiredValue"
            :items="dataSelectCarrer"
            variant="underlined"
            color="tradewind500"
            type="text"
            clearable
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="props.dataFormBooking!.implements"
            :items="dataImplement"
            item-title="name"
            item-value="id"
            label="Implementos"
            variant="underlined"
            no-data-text="No hay implementos registrados"
            persistent-hint
            clearable
            multiple
            chips
          />
        </v-col>

        <v-col cols="12" md="4">
          <v-text-field
            v-model="props.dataFormBooking!.event"
            :rules="requiredValue"
            label="Evento"
            type="text"
            variant="underlined"
            color="tradewind500"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="props.dataFormBooking!.room"
            :items="dataRoom"
            item-title="nomenclature"
            item-value="id"
            variant="underlined"
            clearable
            label="Salón"
            no-data-text="No hay salones registrados"
            persistent-hint
          />
        </v-col>

        <v-col cols="12" md="4">
          <Datetimepicker v-model="props.dataFormBooking!.start_date" />
        </v-col>

        <v-col cols="12" md="4">
          <Datetimepicker v-model="props.dataFormBooking!.end_date" />
        </v-col>
        <v-col cols="12" class="text-center">
          <ButtonBase label="Crear reserva" />
        </v-col>
      </v-row>
    </v-form>
    <!-- Alert -->
    <v-snackbar
      v-model="showSnackbar"
      :timeout="4000"
      :color="color"
      rounded="pill"
      location="bottom right"
    >
      {{ message }}
    </v-snackbar>
    <!-- End Alert -->
  </v-container>
</template>

<script lang="ts" setup>
import Datetimepicker from '@/components/calendars/DatetimePicker.vue'
import ButtonBase from '@/components/buttons/ButtonBase.vue'
import { computed, onMounted, ref } from 'vue'
import moment from 'moment'
// Utils
import { requiredValue } from '@/utils'
//Stores
import { useImplementsStore, useClassroomsStore, useBookingsStore } from '@/stores'
// Interface
import type { BookingData, ClassroomsData, ImplementsData } from '@/interface'
import router from '@/router'
// Props
const props = defineProps({
  dataFormBooking: {
    type: Object as () => BookingData | undefined,
    defult: {
      document: Number,
      fullname: String,
      phone: Number,
      schedule: String,
      implements: Array,
      event: String,
      room: String,
      start_date: null,
      end_date: null
    }
  }
})

// Initialization Store
const implement = useImplementsStore()
const room = useClassroomsStore()
const booking = useBookingsStore()
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

const dataImplement = ref<ImplementsData[]>([])
const dataRoom = ref<ClassroomsData[]>([])

const formatDate = (date: Date): string => {
  return moment(date).locale('es').format('LL')
}

const formattedStartDate = computed(() => {
  if (props.dataFormBooking!.start_date) {
    return formatDate(props.dataFormBooking!.start_date)
  }
  return ''
})

const formattedEndDate = computed(() => {
  if (props.dataFormBooking!.end_date) {
    return formatDate(props.dataFormBooking!.end_date)
  }
  return ''
})

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

const submitForm = async () => {
  try {
    const implementsString =
      typeof props.dataFormBooking?.implements === 'string'
        ? props.dataFormBooking?.implements.split(',')
        : props.dataFormBooking?.implements

    await booking.createBooking({
      ...props.dataFormBooking!,
      implements: implementsString!
    })
    showSnackbar.value = true
    message.value = '¡Reserva creada exitosamente!'
    color.value = 'tradewind600'
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>