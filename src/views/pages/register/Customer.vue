<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Register v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text ml-1">
            Evnt
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Welcome To Evnt! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Registrate para comenzar la aventura
        </b-card-text>

        <!-- form -->
        <validation-observer
          ref="loginForm"
          #default="{invalid}"
        >
          <b-form
            class="auth-login-form mt-2"
            @submit.prevent
          >

            <!-- firstName -->
            <b-form-group
              label-for="firstName"
              label="Nombres"
            >
              <validation-provider
                #default="{ errors }"
                name="Nombre"
                rules="required"
              >
                <b-form-input
                  id="firstName"
                  v-model="firstName"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="firstName"
                  placeholder="Nombre(s)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- lastName -->
            <b-form-group
              label-for="lastName"
              label="Apellidos"
            >
              <validation-provider
                #default="{ errors }"
                name="Apellido"
                rules="required"
              >
                <b-form-input
                  id="lastName"
                  v-model="lastName"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="lastName"
                  placeholder="Apellidos(s)"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- birthdate -->
            <b-form-group
              label-for="example-datepicker"
              label="Fecha de nacimiento"
            >
              <validation-provider
                #default="{ errors }"
                name="Fecha de nacimiento"
                rules="required"
              >

                <div class="d-flex align-items-center">
                  <flat-pickr
                    id="example-datepicker"
                    v-model="birthdate"
                    locale="es"
                    placeholder="Fecha de nacimiento"
                    class="form-control"
                    :max="dateMinRange"
                  />
                </div>
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- SEND DATA -->
            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              @click="registerPersonalData"
            >
              Enviar datos
            </b-button>
          </b-form>
        </validation-observer>
      </b-card>
      <!-- /Register v1 -->
    </div>
  </div>
</template>

<script>
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BButton, BForm, BFormGroup, BCard, BLink, BCardTitle, BCardText, BFormInput,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
import 'bootstrap/dist/css/bootstrap.css'
// theme is optional
// try more themes at - https://flatpickr.js.org/themes/
import 'flatpickr/dist/themes/material_blue.css'

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    ValidationProvider,
    ValidationObserver,
    BFormInput,
    flatPickr,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      firstName: '',
      lastName: '',
      birthdate: '',
      dateMinRange: new Date(),

      rangePicker: ['2019-05-01', '2019-05-10'],
      userData: JSON.parse(localStorage.getItem('lastNewUser')),
      // validation rules
      required,
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    registerPersonalData() {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        birthdayDate: this.birthdate,
        user: this.userData.id,
      }
      axios.post(buildServiceUrl('/customer'), data)
        .then(response => {
          console.log(response)
          this.$router.push('/login')
        })
        .catch(error => console.log(error))
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
