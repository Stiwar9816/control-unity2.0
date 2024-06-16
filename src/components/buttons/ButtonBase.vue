<template>
  <v-btn
    :type="props.typeButton"
    :prepend-icon="props.icon"
    color="tradewind500"
    variant="flat"
    rounded="md"
  >
    {{ props.label }}
  </v-btn>
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    default: 'Label Button'
  },
  icon: {
    type: String,
    default: 'mdi-plus'
  },
  typeButton: {
    type: String
  }
})
</script>
