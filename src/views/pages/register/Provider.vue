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

            <!-- Media -->
            <b-media class="mb-2  align-items-end">
              <template #aside>
                <b-avatar
                  ref="previewEl"
                  :src="logo_url"
                  size="90px"
                  rounded
                />
              </template>
              <div
                class="d-flex flex-wrap"
              >
                <b-button
                  variant="primary"
                  @click="$refs.refInputEl.click()"
                >
                  <input
                    ref="refInputEl"
                    type="file"
                    class="d-none"
                    @input="inputImageRenderer"
                    @change="uploadImage"
                  >
                  <span class="d-none d-sm-inline">Añadir</span>
                  <feather-icon
                    icon="EditIcon"
                    class="d-inline d-sm-none"
                  />
                </b-button>
              </div>
            </b-media>

            <!-- NAME -->
            <b-form-group
              label-for="name"
              label="Nombre de tu empresa"
            >
              <validation-provider
                #default="{ errors }"
                name="Name"
                rules="required"
              >
                <b-form-input
                  id="name"
                  v-model="name"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="name"
                  placeholder="Nombre de tu empresa"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <!-- DESCRIPTION -->
            <b-form-group
              label-for="description"
              label="Descripcion de tu empresa"
            >
              <validation-provider
                #default="{ errors }"
                name="Descripcion"
                rules="required"
              >
                <b-form-textarea
                  id="description"
                  v-model="description"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  name="description"
                  placeholder="Descripcion de tus servicios"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>

            <b-button
              variant="primary"
              type="submit"
              block
              :disabled="invalid"
              @click="registerProvider"
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
  BButton, BMedia, BAvatar, BForm, BFormGroup, BCard, BLink, BCardTitle, BCardText, BFormInput, BFormTextarea,
} from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import { required } from '@validations'
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  components: {
    // BSV
    BButton,
    BForm,
    BMedia,
    BAvatar,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    ValidationProvider,
    BFormTextarea,
    BFormInput,
    ValidationObserver,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      name: '',
      description: '',
      inputImageRenderer: '',
      logo_url: '',
      userData: JSON.parse(localStorage.getItem('lastNewUser')),
      token: JSON.parse(localStorage.getItem('token')),
      // validation rules
      required,
    }
  },
  computed: {},
  mounted() {
  },
  methods: {
    uploadImage(event) {
      console.log(event.target.files[0])

      const file = event.target.files[0]
      const fd = new FormData()

      fd.append('file', file)

      axios.post(buildServiceUrl('/media/image'), fd)
        .then(response => {
          console.log(response)
          this.logo_url = response.data.link
        })
        .catch(error => console.log(error))
    },
    registerProvider() {
      const data = {
        name: this.name,
        description: this.description,
        user: this.userData.id,
        logo_url: this.logo_url,
      }
      axios.post(buildServiceUrl('/provider'), data)
        .then(response => {
          console.log(response)
        })
        .catch(error => console.log(error))
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
