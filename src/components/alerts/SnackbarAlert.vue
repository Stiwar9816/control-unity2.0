<template>
  <v-snackbar
    v-model="model"
    :timeout="4000"
    :color="props.color"
    rounded="pill"
    location="bottom right"
  >
    {{ props.message }}
  </v-snackbar>
</template>

<script setup lang="ts">
const props = defineProps({
  color: {
    type: String,
    default: 'tradewind600'
  },
  message: {
    type: String,
    default: 'Message alert'
  }
})

const model = defineModel()
</script>
