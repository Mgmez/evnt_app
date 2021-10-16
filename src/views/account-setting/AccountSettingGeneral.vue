<template>
  <b-card>

    <!-- media -->
    <b-media no-body>

      <!-- form -->
      <b-form class="mt-2">
        <b-row>
          <b-col sm="6">
            <b-form-group
              label="Nombre"
              label-for="account-first-Name"
            >
              <b-form-input
                v-model="optionsLocal.firstName"
                name="firstName"
                placeholder="Nombre"
              />
            </b-form-group>
          </b-col>
          <b-col sm="6">
            <b-form-group
              label="Apellido"
              label-for="account-last-name"
            >
              <b-form-input
                v-model="optionsLocal.lastName"
                name="lastName"
                placeholder="Apellido"
              />
            </b-form-group>
          </b-col>
          <b-col
            sm="6"
          >
            <b-form-group
              label="Fecha de nacimiento"
              label-for="birthdayDate"
            ><flat-pickr
              id="example-datepicker"
              v-model="optionsLocal.birthdayDate"
              locale="es"
              placeholder="Fecha de nacimiento"
              class="form-control"
              :max="dateMinRange"
            />
            </b-form-group>
          </b-col>

          <!-- alert -->
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
                Ocurrio un error cuando se intento actualizar
              </h4>
            </b-alert>
          </b-col>
          <!--/ alert -->

          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mt-2 mr-1"
              @click="onUpdate"
            >
              Guardar cambios
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </b-media></b-card>
</template>

<script>
import {
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BAlert, BCard, BMedia,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import { ref } from '@vue/composition-api'
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'
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
    BAlert,
    BCard,
    BMedia,
    flatPickr,
  },
  directives: {
    Ripple,
  },
  props: {
    generalData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      optionsLocal: this.generalData,
      profileFile: null,
      errorMessage: false,
      dateMinRange: new Date(),
    }
  },
  async beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    const typeId = sessionData.data[0].type_id
    await axios.get(buildServiceUrl(`/customer/${typeId}`)).then(res => {
      console.log('res.data')
      console.log(res.data)
      this.optionsLocal = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        birthdayDate: res.data.birthdayDate,
      }
    })
  },
  methods: {
    async onUpdate() {
      const sessionData = JSON.parse(localStorage.getItem('userData'))
      const typeId = sessionData.data[0].type_id

      const config = {
        method: 'patch',
        url: buildServiceUrl(`/customer/${typeId}`),
        headers: { },
        data: this.optionsLocal,
      }

      await axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          const { data } = error.response
          console.log(data.message[0])
          this.errorMessage = true
        })
    },
  },
  setup() {
    const refInputEl = ref(null)
    const previewEl = ref(null)
    return {
      refInputEl,
      previewEl,
    }
  },
}
</script>
