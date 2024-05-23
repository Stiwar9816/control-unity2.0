<template>
  <div class="resetPassword">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet color="tradewind500" rounded="lg" width="380" elevation="18" class="mx-auto pa-6">
          <form @submit.prevent="handleReset">
            <v-img
              src="/images/LOGO_BLANCO.svg"
              alt="Logo Control Unity"
              height="140"
              class="mb-3"
            />
            <v-text-field
              v-model="state.email"
              label="Correo electronico"
              aria-label="Email"
              variant="underlined"
              prepend-icon="mdi-email"
              required
              clearable
            ></v-text-field>

            <v-btn
              type="submit"
              block
              variant="flat"
              color="tradewind800"
              rounded="md"
              size="large"
              class="mt-4"
            >
              Recuperar Contraseña
            </v-btn>
            <router-link class="mt-3 reset" to="/"
              >¿No la necesitas recuperar? - Click aquí</router-link
            >
          </form>
        </v-sheet>
      </v-col>
    </v-row>
    <!-- Alert -->
    <SnackbarAlert v-model="showSnackbar" :message="message" :color="color" />
    <!-- End Alert -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, reactive, ref } from 'vue'
// Router
import router from '@/router'
// Components
import SnackbarAlert from '@/components/alerts/SnackbarAlert.vue'
// Store
import { useErrorsStore, useAuthStore } from '@/stores'
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')

const state = reactive({
  email: ''
})

const errors = useErrorsStore()
const authStore = useAuthStore()

const handleReset = async () => {
  try {
    await authStore.resetPasswordForEmail(state.email)
    showSnackbar.value = true
    message.value = `¡Revisa el correo para restablecer la contraseña!`
    color.value = 'tradewind600'
    setTimeout(() => router.push({ name: 'home' }), 2000)
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
    errors.$reset()
  }
}

onBeforeUnmount(() => errors.$reset())
</script>

<style>
.resetPassword {
  background: linear-gradient(
    190deg,
    rgba(112 192 185) 30%,
    rgba(44 96 93) 70%,
    rgba(41 81 80) 90%
  );
  height: 100vh;
  display: grid;
  place-items: center;
}
.reset {
  display: grid;
  place-items: center;
  color: #ffffff;
  text-decoration: none;
  text-align: center;
  &:hover {
    color: #214b4e;
    text-decoration: underline;
  }
}
</style>
