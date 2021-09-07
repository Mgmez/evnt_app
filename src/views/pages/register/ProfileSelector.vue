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

            <!-- profile -->
            <b-form-group
              label-for="status"
              label="Estatus"
            >
              <validation-provider
                #default="{ errors }"
                name="Profile"
                rules="required"
              >
                <b-form-select
                  v-model="selectedRole"
                  class="form-select"
                  :state="errors.length > 0 ? false:null"
                  :options="roles"
                  aria-label="Estatus del usuario"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- email -->
            <b-form-group
              label-for="email"
              label="Email"
            >
              <validation-provider
                #default="{ errors }"
                name="Email"
                rules="required|email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false:null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label
                  for="password"
                >Password</label>
              </div>
              <validation-provider
                #default="{ errors }"
                name="Password"
                rules="required"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid':null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false:null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
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
              Registrate
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
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText, BInputGroup, BInputGroupAppend, BFormSelect,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required, email } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormGroup,
    BFormSelect,
    BFormInput,
    BInputGroup,
    BCard,
    BCardTitle,
    BLink,
    BInputGroupAppend,
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
      // validation rules
      required,
      email,
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  mounted() {
    this.fetchRoles()
  },
  methods: {
    login() {
      console.log('result')
      console.log(this.selectedRole)
      console.log(this.userEmail)
      console.log(this.password)
      const data = {
        email: this.userEmail,
        password: this.password,
        role: this.selectedRole,
        plan: 'free',
      }
      axios.post(buildServiceUrl('/user'), data)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    },
    async fetchRoles() {
      const rolesReq = await axios.get(buildServiceUrl('/role?page=1&limit=10'))
        .then(response => response)
        .catch(error => console.log(error))

      const rolesFilter = rolesReq.data.items
        .filter(role => role.name === 'Cliente' || role.name === 'Proveedor')
      console.log(rolesFilter)
      this.roles = rolesFilter.map(role => {
        const temp = {}
        temp.value = role.id
        temp.text = role.name
        return temp
      })
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
