<template>
  <div class="tradewind600">
    <v-app-bar class="text-white" color="tradewind500" elevation="0" flat app>
      <template v-slot:prepend>
        <v-app-bar-nav-icon aria-label="button-drawer" flat color="white" @click="storeLayout.drawer = !storeLayout.drawer" />
        <v-img class="ml-n4" width="170" src="/images/LOGO_BLANCO.webp" alt="Logo-control-unity" />
     
      </template>
      <v-spacer />
      <span class="pa-5 font-weight-bold text-white"> Bienvenido {{ nameProfile }} </span>
    </v-app-bar>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
// Store
import { useLayoutStore } from '@/stores'
// Initialization Store
const storeLayout = useLayoutStore()

const nameProfile = ref('')
const name = storeLayout.nameProfile.then((name: string) => {
  nameProfile.value = name
})
</script>
