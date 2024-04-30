<template>
  <div>
    <TableTeacher :headers="storeTeacher.headers" :items="storeTeacher.items" />
  </div>
</template>
<script lang="ts" setup>
// Components

import TableTeacher from '@/components/tables/TableTeachers.vue'
// Stores
import { useTeacherStore } from '@/stores'
// Initialization Store
const storeTeacher = useTeacherStore()
</script>
