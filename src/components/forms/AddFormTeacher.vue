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
                v-model="props.dataForm!.cc"
                :rules="requiredValue"
                label="N° de identificación"
                type="number"
                min="0"
                variant="underlined"
                color="tradewind500"
                clearable
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.name"
                :rules="requiredValue"
                label="Nombre Completo"
                type="text"
                variant="underlined"
                color="tradewind500"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.email"
                :rules="emailRules"
                label="Correo electronico"
                type="email"
                variant="underlined"
                color="tradewind500"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="props.dataForm!.phone"
                :rules="requiredValue"
                label="Teléfono"
                type="number"
                min="0"
                variant="underlined"
                color="tradewind500"
                clearable
              ></v-text-field>
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
import { requiredValue, emailRules } from '@/utils'
// Props
const props = defineProps({
  formTitle: {
    type: String,
    default: 'Title Form'
  },
  dataForm: {
    type: Object,
    defult: {
      cc: Number,
      name: String,
      email: String,
      phone: Number,
      status: Boolean
    }
  },
  modalClose: {
    type: Function
  },
  modalSave: {
    type: Function
  }
})
</script>
