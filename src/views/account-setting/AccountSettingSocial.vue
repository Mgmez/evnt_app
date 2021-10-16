<template>
  <b-card>
    <b-form>
      <b-row>
        <b-col cols="12">
          <div class="d-flex align-items-center mb-2">
            <feather-icon
              icon="LinkIcon"
              size="18"
            />
            <h4 class="mb-0 ml-75">
              Redes sociales
            </h4>
          </div>
        </b-col>

        <!-- facebook -->
        <b-col md="6">
          <b-form-group
            label-for="account-facebook"
            label="Facebook"
          >
            <b-form-input
              id="account-facebook"
              v-model="localOptions.facebook_url"
              placeholder="URL"
            />
          </b-form-group>
        </b-col>
        <!--/ facebook -->

        <!-- instagram -->
        <b-col md="6">
          <b-form-group
            label="Instagram"
            label-for="account-instagram"
          >
            <b-form-input
              id="account-instagram"
              v-model="localOptions.instagram_url"
              placeholder="URL"
            />
          </b-form-group>
        </b-col>
        <!--/ instagram -->
        <!-- whatsapp -->
        <b-col md="6">
          <b-form-group
            label="Whatsapp"
            label-for="account-whatsapp"
          >
            <b-form-input
              id="account-whatsapp"
              v-model="localOptions.whatspapp_url"
              placeholder="URL"
            />
          </b-form-group>
        </b-col>
        <!--/ whatsapp -->
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
  BButton, BForm, BFormGroup, BFormInput, BRow, BCol, BCard,
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
  },
  directives: {
    Ripple,
  },
  props: {
    socialData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      localOptions: this.socialData,
    }
  },
  async beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    const typeId = sessionData.data[0].type_id
    await axios.get(buildServiceUrl(`/provider/${typeId}`)).then(res => {
      console.log('res.data')
      console.log(res.data)
      this.localOptions = {
        facebook_url: res.data.facebook_url,
        instagram_url: res.data.instagram_url,
        whatspapp_url: res.data.whatspapp_url,
      }
    })
  },
  methods: {
    onUpdate() {
      const sessionData = JSON.parse(localStorage.getItem('userData'))
      const typeId = sessionData.data[0].type_id

      const config = {
        method: 'patch',
        url: buildServiceUrl(`/provider/${typeId}`),
        headers: { },
        data: this.localOptions,
      }

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>
