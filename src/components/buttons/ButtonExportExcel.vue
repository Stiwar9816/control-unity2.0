<template>
  <div>
    <v-btn
      prepend-icon="mdi-database-arrow-down-outline"
      variant="flat"
      rounded="md"
      color="tradewind500"
      class="mx-2"
      @click="props.fnExport"
    >
      <template v-slot:prepend>
        <v-icon color="white" />
      </template>
      <v-tooltip activator="parent" location="top">Exportar excel</v-tooltip>
      {{ props.labelButton }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
// Props
const props = defineProps({
  labelButton: {
    type: String,
    default: 'Exportar'
  },
  fnExport: Function
})
</script>
