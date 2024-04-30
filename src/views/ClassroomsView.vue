<template>
  <div>
    <TableClassrooms :headers="storeClassroom.headers" :items="storeClassroom.items" />
  </div>
</template>
<script lang="ts" setup>
// Components
import TableClassrooms from '@/components/tables/TableClassrooms.vue'
// Stores
import { useClassroomsStore } from '@/stores'
// Initialization Store
const storeClassroom = useClassroomsStore()
</script>
