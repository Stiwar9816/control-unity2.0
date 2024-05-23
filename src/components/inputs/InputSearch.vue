<template>
  <v-text-field
    class="mt-4"
    color="tradewind400"
    density="comfortable"
    :label="props.label"
    :prepend-inner-icon="props.icon"
    v-model="model"
    variant="underlined"
    type="text"
    clearable
  ></v-text-field>
</template>

<script setup lang="ts">
const model = defineModel()
const props = defineProps({
  label: {
    type: String,
    default: 'Label Button'
  },
  icon: {
    type: String,
    default: 'mdi-magnify'
  }
})
</script>
