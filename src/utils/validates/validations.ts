import { ref } from 'vue'

// Validations
export const requiredValue = ref([(v: String) => !!v || 'El valor del campo es requerido'])
export const emailRules = ref([
  (v: String) => !!v || 'El valor del campo es requerido',
  (v: string) =>
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      v
    ) || 'El correo electronico no es valido, Verifiquelo nuevamente'
])
