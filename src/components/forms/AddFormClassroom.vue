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
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="props.dataForm!.nomenclature"
                :rules="requiredValue"
                label="Nomenclatura"
                variant="underlined"
                color="tradewind500"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="props.dataForm!.location"
                :rules="requiredValue"
                label="Ubicación"
                variant="underlined"
                color="tradewind500"
                type="text"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="4">
              <v-text-field
                v-model="props.dataForm!.ability"
                label="Capacidad"
                type="number"
                min="0"
                variant="underlined"
                color="tradewind500"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <h2 class="text-subtitle-1 text-grey-darken-3">Recursos tecnológicos</h2>
              <v-checkbox
                v-for="item in dataSelectedTechResource"
                :key="item.name"
                v-model="props.dataForm!.tech_resources"
                :label="item.name"
                :value="item.value"
                :multiple="true"
                color="tradewind500"
                @change="updateChechbox"
              />
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <h2 class="text-subtitle-1 text-grey-darken-3">Conectividad</h2>
              <v-checkbox
                v-for="item in dataSelectedConnectivity"
                :key="item.name"
                v-model="props.dataForm!.connectivity"
                :label="item.name"
                :value="item.value"
                :multiple="true"
                color="tradewind500"
                @change="updateChechbox"
              />
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
    default: {
      nomenclature: String,
      location: String,
      tech_resources: Array,
      connectivity: Array,
      ability: Number
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
const dataSelectedTechResource = [
  { name: 'TV', value: 'TV' },
  { name: 'Aire acondicionado', value: 'Aire acondicionado' }
]
const dataSelectedConnectivity = [
  { name: 'WiFi', value: 'WiFi' },
  { name: 'Ethernet', value: 'Ethernet' }
]
// Methdos
const updateChechbox = () => {
  props.dataForm!.connectivity = props.dataForm!.connectivity.filter(Boolean)
  props.dataForm!.tech_resources = props.dataForm!.tech_resources.filter(Boolean)
}
</script>
