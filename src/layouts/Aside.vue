<template>
  <v-navigation-drawer
    app
    flat
    permanent
    color="tradewind100"
    v-model="storeLayout.drawer"
    :rail="storeLayout.rail"
    @click="storeLayout.rail = true"
  >
    <v-list nav>
      <v-list-item :prepend-icon="storeLayout.imageProfile" role="listitem">
        <template v-slot:append>
          <v-btn
            variant="text"
            icon="mdi-chevron-left"
            @click.stop="storeLayout.rail = !storeLayout.rail"
            role="button"
            aria-label="chevron-left"
          ></v-btn>
        </template>
        {{ nameProfile }}
        <v-tooltip activator="parent" location="end" role="tooltip" aria-label="nameProfile">{{
          nameProfile
        }}</v-tooltip>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <v-list density="comfortable" nav>
      <v-list-item
        v-for="item in storeLayout.routes"
        :key="item.name"
        :prepend-icon="item.icon"
        :value="item.name"
        :to="item.route"
        color="tradewind950"
        role="list"
      >
        {{ item.name }}
        <v-tooltip activator="parent" location="end" role="tooltip" aria-label="{{ item.name }}">{{
          item.name
        }}</v-tooltip>
      </v-list-item>

      <v-list-item
        prepend-icon="mdi-power-cycle"
        value="Logout"
        @click="logout"
        role="listitem"
        aria-label="cerrar_sesión"
      >
        <template v-slot:prepend>
          <v-icon color="tradewind950" icon="mdi-logout"></v-icon>
        </template>
        Cerrar Sesión
        <v-tooltip activator="parent" location="end" role="tooltip" aria-label="cerrar sesión"
          >Cerrar Sesión</v-tooltip
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
// Store
import { useLayoutStore, useAuthStore } from '@/stores'
// Initialization Store
const storeLayout = useLayoutStore()
const authStore = useAuthStore()

const nameProfile = ref<String>('')
const name: Promise<void> = storeLayout.nameProfile.then((name: string) => {
  nameProfile.value = name
})

const isAuthenticated = computed(() => !!authStore.token)

const logout = () => {
  return authStore.logout()
}
</script>

<style scoped>
.v-navigation-drawer--left {
  border-right-width: inherit;
}
</style>
