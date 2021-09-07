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

            <!--  -->
            <b-form-group
              label-for="status"
              label="LABEL1"
            >
              <validation-provider
                #default="{ errors }"
                name="Profile"
                rules="required"
              >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!--  -->
            <b-form-group
              label-for="email"
              label="LABEL2"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required"
              >
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              @click="login"
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
  BButton, BForm, BFormGroup, BCard, BLink, BCardTitle, BCardText,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
// import axios from 'axios'
// import { buildServiceUrl } from '@/constants/urls'

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
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      status: '',
      userEmail: '',
      password: '',
      roles: [],
      selectedRole: '',
      userData: JSON.parse(localStorage.getItem('lastNewUser')),
      // validation rules
      required,
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
