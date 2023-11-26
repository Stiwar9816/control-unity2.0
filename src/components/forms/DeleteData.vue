<template>
  <div>
    <v-card>
      <v-toolbar color="tradewind500">
        <v-card-title>
          <v-container> {{ props.formTitle }} </v-container>
        </v-card-title>
      </v-toolbar>
      <v-card-text class="text-subtitle-1">
        ¿Estás seguro de que quieres eliminar {{ props.typeDelete }}
        <b>
          {{
            props.dataForm!.name !== undefined ? props.dataForm!.name : props.dataForm!.nomenclature
          }}
        </b>
        ?
      </v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn class="rounded-md" color="tradewind50" variant="flat" @click="props.modalClose"
          >Cancelar
        </v-btn>
        <v-btn class="rounded-md" color="tradewind500" variant="flat" @click="props.modalSave">
          Eliminar
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  formTitle: {
    type: String,
    default: 'Title Form'
  },
  typeDelete: {
    type: String
  },
  dataForm: {
    type: Object,
    default: {
      name: String,
      nomenclature: String
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
