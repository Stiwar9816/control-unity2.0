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
              <v-select
                v-model="props.dataForm!.tech_resources"
                label="Recursos tecnológicos"
                :rules="requiredValue"
                :items="
                  filterSelectedOptions(props.dataForm.tech_resources, dataSelectedTechResource)
                "
                no-data-text="No hay más datos"
                variant="underlined"
                color="tradewind500"
                type="text"
                clearable
                multiple
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="props.dataForm!.connectivity"
                label="Conectividad"
                :rules="requiredValue"
                :items="
                  filterSelectedOptions(props.dataForm.connectivity, dataSelectedConnectivity)
                "
                no-data-text="No hay más datos"
                variant="underlined"
                color="tradewind500"
                type="text"
                clearable
                multiple
              >
              </v-select>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn class="rounded-lg" color="tradewind50" variant="flat" @click="props.modalClose">
          Cancelar
        </v-btn>
        <v-btn class="rounded-lg" color="tradewind500" variant="flat" @click="props.modalSave">
          Guardar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
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
const dataSelectedTechResource: string[] = ['Tv', 'Aire acondicionado']
const dataSelectedConnectivity: string[] = ['WiFi', 'Ethernet']

// Método para filtrar las opciones ya seleccionadas
const filterSelectedOptions = (selectedItems: string[], allItems: string[]) => {
  return allItems.filter((item) => !selectedItems.includes(item))
}

// Datos reactivos para almacenar las opciones seleccionadas
const selectedTechResources = ref<string[]>(props.dataForm.tech_resources.slice())
const selectedConnectivity = ref<string[]>(props.dataForm.connectivity.slice())

// Observadores para filtrar las opciones cuando cambian las selecciones
watch(
  () => props.dataForm.tech_resources,
  (newValue: string[]) => {
    selectedTechResources.value = filterSelectedOptions(newValue, dataSelectedTechResource)
  }
)

watch(
  () => props.dataForm.connectivity,
  (newValue: string[]) => {
    selectedConnectivity.value = filterSelectedOptions(newValue, dataSelectedConnectivity)
  }
)
</script>
