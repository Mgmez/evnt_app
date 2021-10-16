<template>
  <b-card>
    <!-- form -->
    <b-form>
      <b-row>
        <!-- new password -->
        <b-col md="6">
          <b-form-group
            label-for="account-new-password"
            label="Nueva Contraseña"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-new-password"
                v-model="newPasswordValue"
                :type="passwordFieldTypeNew"
                name="new-password"
                placeholder="Nueva contraseña"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconNew"
                  class="cursor-pointer"
                  @click="togglePasswordNew"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ new password -->

        <!-- retype password -->
        <b-col md="6">
          <b-form-group
            label-for="account-retype-new-password"
            label="Vuelva a escribir la nueva contraseña"
          >
            <b-input-group class="input-group-merge">
              <b-form-input
                id="account-retype-new-password"
                v-model="RetypePassword"
                :type="passwordFieldTypeRetype"
                name="retype-password"
                placeholder="Nueva contraseña"
              />
              <b-input-group-append is-text>
                <feather-icon
                  :icon="passwordToggleIconRetype"
                  class="cursor-pointer"
                  @click="togglePasswordRetype"
                />
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
        <!--/ retype password -->

        <b-col
          v-if="errorMessage"
          cols="12"
          class="mt-75"
        >
          <b-alert
            show
            variant="warning"
            class="mb-50"
          >
            <h4 class="alert-heading">
              Ocurrio un error: {{ errorMessageData }}
            </h4>
          </b-alert>
        </b-col>
        <!-- buttons -->
        <b-col cols="12">
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="mt-1 mr-1"
            @click="onUpdate"
          >
            Guardar cambios
          </b-button>
        </b-col>
        <!--/ buttons -->
      </b-row>
    </b-form>
  </b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard, BInputGroup, BInputGroupAppend, BAlert,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  components: {
    BButton,
    BForm,
    BFormGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BInputGroup,
    BInputGroupAppend,
    BAlert,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      passwordValueOld: '',
      newPasswordValue: '',
      RetypePassword: '',
      passwordFieldTypeOld: 'password',
      passwordFieldTypeNew: 'password',
      passwordFieldTypeRetype: 'password',
      errorMessage: false,
      errorMessageData: '',
    }
  },
  computed: {
    passwordToggleIconOld() {
      return this.passwordFieldTypeOld === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconNew() {
      return this.passwordFieldTypeNew === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    passwordToggleIconRetype() {
      return this.passwordFieldTypeRetype === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
  },
  methods: {
    togglePasswordOld() {
      this.passwordFieldTypeOld = this.passwordFieldTypeOld === 'password' ? 'text' : 'password'
    },
    togglePasswordNew() {
      this.passwordFieldTypeNew = this.passwordFieldTypeNew === 'password' ? 'text' : 'password'
    },
    togglePasswordRetype() {
      this.passwordFieldTypeRetype = this.passwordFieldTypeRetype === 'password' ? 'text' : 'password'
    },
    async onUpdate() {
      if (this.newPasswordValue !== this.RetypePassword) {
        this.errorMessage = true
        this.errorMessageData = 'Las contraseñas no son iguales'
        return
      }
      if (this.newPasswordValue === '' || this.newPasswordValue.length === 0) {
        this.errorMessage = true
        this.errorMessageData = 'Las contraseñas estan vacias'
        return
      }
      this.errorMessage = false

      const sessionData = JSON.parse(localStorage.getItem('userData'))
      const { id } = sessionData.data[0]
      const config = {
        method: 'patch',
        url: buildServiceUrl(`/user/password/${id}`),
        headers: { },
        data: { password: this.newPasswordValue },
      }

      await axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          const { data } = error.response
          console.log(data.message[0])
          this.errorMessage = true
          this.errorMessageData = 'Error del servidor'
        })
    },
  },
}
</script>
