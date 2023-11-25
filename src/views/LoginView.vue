<template>
  <div class="login">
    <v-row no-gutters>
      <v-col cols="12">
        <v-sheet color="tradewind500" rounded="lg" width="360" elevation="2" class="mx-auto pa-6">
          <form @submit.prevent="handleLogin">
            <v-img
              src="/images/LOGO_BLANCO.svg"
              alt="Logo Control Unity"
              height="140"
              class="mb-3"
            />
            <v-text-field
              v-model="signinData.email"
              label="Correo electronico"
              type="email"
              aria-label="Email"
              variant="underlined"
              prepend-icon="mdi-clipboard-account"
              required
              clearable
            ></v-text-field>

            <v-text-field
              v-model="signinData.password"
              label="Contraseña"
              id="current-password"
              aria-label="current-password"
              autocomplete="false"
              variant="underlined"
              prepend-icon="mdi-lock"
              :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show ? 'text' : 'password'"
              @click:append="show = !show"
              aria-autocomplete="none"
              required
              clearable
            ></v-text-field>

            <v-btn
              type="submit"
              block
              variant="elevated"
              color="tradewind800"
              rounded="xl"
              size="large"
              class="my-3"
            >
              Iniciar Sesión
            </v-btn>
            <router-link class="reset" to="/reset-password"
              >¿Has olvidado la contraseña? <br />
              Click Aquí</router-link
            >
          </form>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
// Router
import router from '@/router'
// Store
import { useAuthStore, useErrorsStore } from '@/stores'
// Interface
import type { SigninInput } from '@/interface'
// Let
let show = ref<Boolean>(false)
const showSnackbar = ref<Boolean>(false)
const color = ref<String>('')
const message = ref<String>('')
// Const
const initialSigninData: SigninInput = {
  email: '',
  password: ''
}
const signinData: SigninInput = reactive({
  ...initialSigninData
})
// Initialization Store
const errors = useErrorsStore()
const authStore = useAuthStore()
// Methods / Actions
const handleLogin = async () => {
  try {
    const signinInput: SigninInput = {
      email: signinData.email,
      password: signinData.password
    }
    await authStore.login(signinInput)
    router.push({ name: 'home' })
  } catch (error: any) {
    showSnackbar.value = true
    message.value = `¡Ha ocurrido un error: ${error.message}!`
    color.value = 'red-darken-3'
    errors.$reset()
  }
}
</script>

<style>
.login {
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
