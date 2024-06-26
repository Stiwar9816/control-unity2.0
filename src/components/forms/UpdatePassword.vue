<template>
  <div class="resetPassword">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet color="tradewind500" rounded="lg" width="380" elevation="18" class="mx-auto pa-6">
          <form @submit.prevent="updatePassword">
            <v-img
              src="/images/LOGO_BLANCO.svg"
              alt="Logo Control Unity"
              height="140"
              class="mb-3"
            />
            <v-col cols="12">
              <v-text-field
                v-model="password"
                label="Nueva Contraseña"
                :rules="requiredValue"
                :type="show ? 'text' : 'password'"
                variant="underlined"
                density="comfortable"
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="confPassword"
                label="Confirmar nueva contraseña"
                :rules="requiredValue"
                :type="show ? 'text' : 'password'"
                variant="underlined"
                density="comfortable"
                clearable
                required
              ></v-text-field>
            </v-col>
            <v-checkbox
              v-model="show"
              class="my-n5"
              label="Mostrar Contraseña"
              @click:append="show = !show"
            ></v-checkbox>
            <v-btn
              type="submit"
              block
              variant="flat"
              color="tradewind800"
              rounded="md"
              size="large"
              class="mt-2"
            >
              Actualizar Contraseña
            </v-btn>
            <router-link class="mt-3 reset" to="/"
              >¿No la necesitas actualizar? - Click aquí</router-link
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
import { ref } from 'vue'
// Components
import SnackbarAlert from '@/components/alerts/SnackbarAlert.vue'
// Router
import router from '@/router'
// Store
import { useAuthStore } from '@/stores'
// Const / Let
let show = ref<boolean>(false)
const password = ref<string>('')
const confPassword = ref<string>('')
// Initialization Store
const authStore = useAuthStore()
// Validations
const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])
// Alerts
const showSnackbar = ref<boolean>(false)
const color = ref<string>('')
const message = ref<string>('')

//Methods
const resetForm = (): void => {
  password.value = ''
  confPassword.value = ''
}

const updatePassword = async () => {
  try {
    const newPassword = password.value
    const confirmPassword = confPassword.value

    if (newPassword !== confirmPassword) throw new Error('Las contraseñas no coinciden')

    await authStore.updatePassword(newPassword)

    showSnackbar.value = true
    message.value = `¡Contraseña actualizada con exito!`
    color.value = 'tradewind600'

    resetForm()

    router.push({ name: 'home' })
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
  }
}
</script>
