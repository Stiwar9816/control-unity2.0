<template>
  <div>
    <v-text-field
      v-model="props.modelSearch"
      class="mt-4"
      clearable
      density="comfortable"
      :label="props.labelInput"
      prepend-inner-icon="mdi-magnify"
      type="text"
      variant="underlined"
      color="tradewind400"
    ></v-text-field>
  </div>
</template>

<script lang="ts" setup>
// Props
const props = defineProps({
  modelSearch: {
    type: String
  },
  labelInput: {
    type: String,
    default: 'Buscar'
  }
})
</script>
