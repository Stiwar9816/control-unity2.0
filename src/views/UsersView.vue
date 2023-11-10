<template>
  <div>
    <TableUser :headers="storeUser.headers" :items="storeUser.data" />
  </div>
</template>
<script lang="ts" setup>
// Components
import TableUser from '@/components/tables/TableUser.vue'
// Stores
import { useUserStore } from '@/stores'
// Initialization Store
const storeUser = useUserStore()
</script>
