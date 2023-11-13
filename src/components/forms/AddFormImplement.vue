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
              <v-text-field
                v-model="props.dataForm!.name"
                :rules="requiredValue"
                label="Nombre"
                type="text"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.serial"
                :rules="requiredValue"
                label="Serial"
                type="text"
                variant="underlined"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.manufacturer"
                label="Marca"
                type="text"
                variant="underlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-select
                v-model="props.dataForm!.type"
                label="Tipo"
                :rules="requiredValue"
                :items="dataSelectType"
                :hide-selected="true"
                variant="underlined"
                type="text"
                chips
                clearable
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.model"
                label="Modelo"
                type="text"
                variant="underlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.location"
                :rules="requiredValue"
                label="Ubicación"
                type="text"
                variant="underlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.responsible"
                :rules="requiredValue"
                label="Responsable"
                type="text"
                variant="underlined"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-textarea
                v-model="props.dataForm!.note"
                label="Nota"
                variant="underlined"
                type="text"
                auto-grow
                rows="1"
                row-height="15"
                clearable
              ></v-textarea>
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
      name: String,
      serial: String,
      manufacturer: String,
      type: String,
      model: String,
      location: String,
      responsible: String,
      note: String
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
const dataSelectType: string[] = ['Portatil', 'Video Beam', 'Subwoofer']
</script>
