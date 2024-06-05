<template>
  <div class="my-4 my-md-3">
    <ejs-datetimepicker
      :placeholder="props.placeholder"
      format="dd-MM-yyyy hh:mm a"
      v-model="model"
    />
  </div>
</template>

<script lang="ts" setup>
import { DateTimePickerComponent as EjsDatetimepicker } from '@syncfusion/ej2-vue-calendars'

const props = defineProps({
  placeholder: {
    type: String,
    default: 'Seleccione una fecha'
  }
})
const model = defineModel()
</script>

<style lang="css">
@import '@/assets/styles/material-datetime.min.css';
</style>
