<template>
  <div>
    <TableImplements :headers="storeImplements.headers" :items="storeImplements.items" />
  </div>
</template>
<script lang="ts" setup>
// Components
import TableImplements from '@/components/tables/TableImplements.vue'
// Stores
import { useImplementsStore } from '@/stores'
// Initialization Store
const storeImplements = useImplementsStore()
</script>
