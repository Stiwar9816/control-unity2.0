<template>
    <div>
      <TableCurriculum :headers="storeCurriculum.headers" :items="storeCurriculum.items" />
    </div>
  </template>
  <script lang="ts" setup>
  // Components
  import TableCurriculum from '@/components/tables/TableCurriculum.vue'
  // Stores
  import { useCurriculumsStore } from '@/stores'
  // Initialization Store
  const storeCurriculum = useCurriculumsStore()
  </script>
  