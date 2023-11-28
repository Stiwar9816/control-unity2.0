<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            v-model="props.dataFormBooking!.name"
            :rules="requiredValue"
            label="Nombre completo"
            type="text"
            variant="underlined"
            color="tradewind500"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" md="4">
          <v-select
            v-model="props.dataFormBooking!.carrer"
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
          <v-date-picker rounded="md" show-adjacent-months></v-date-picker>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts" setup>
// Utils
import { requiredValue } from '@/utils'
// Props
const props = defineProps({
  dataFormBooking: {
    type: Object,
    defult: {
      name: String,
      carrer: String,
      classroom: String,
      datetime: String,
      implements: Array
    }
  }
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
</script>
