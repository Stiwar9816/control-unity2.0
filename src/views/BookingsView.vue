<template>
  <div>
    <AddFormBooking :data-form-booking="storeBooking.$state" />
  </div>
</template>
<script lang="ts" setup>
// Components
import AddFormBooking from '@/components/forms/AddFormBooking.vue'
// Stores
import { useBookingsStore } from '@/stores'
// Initialization Store
const storeBooking = useBookingsStore()
</script>
