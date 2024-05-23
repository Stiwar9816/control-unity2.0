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
@import '@syncfusion/ej2-base/styles/material-dark.css';
@import '@syncfusion/ej2-buttons/styles/material-dark.css';
@import '@syncfusion/ej2-inputs/styles/material-dark.css';
@import '@syncfusion/ej2-popups/styles/material-dark.css';
@import '@syncfusion/ej2-lists/styles/material-dark.css';
@import '@syncfusion/ej2-vue-calendars/styles/material-dark.css';

.e-input-group:not(.e-success):not(.e-warning):not(.e-error),
.e-input-group.e-control-wrapper:not(.e-success):not(.e-warning):not(.e-error) {
  box-shadow: none;
  border-color: #2a7377 !important;
}

.e-input-group.e-input-focus:not(.e-success):not(.e-warning):not(.e-error),
.e-input-group.e-control-wrapper.e-input-focus:not(.e-success):not(.e-warning):not(.e-error) {
  box-shadow: none;
}

input.e-input, .e-input-group input, .e-input-group.e-control-wrapper input, .e-input-group input.e-input, .e-input-group.e-control-wrapper input.e-input {
    box-sizing: content-box !important;
    height: 28px;
}
input.e-input,
.e-input-group input.e-input,
.e-input-group input,
.e-input-group.e-control-wrapper input.e-input,
.e-input-group.e-control-wrapper input,
.e-float-input input,
.e-float-input.e-input-group input,
.e-float-input.e-control-wrapper input,
.e-float-input.e-control-wrapper.e-input-group input,
.e-input-group,
.e-input-group.e-control-wrapper,
.e-float-input,
.e-float-input.e-control-wrapper {
  border-radius: 0px !important;
}
</style>
