<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="serviceData.image_url"
          :text="avatarText(serviceData.name)"
          :variant="`light-primary`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ serviceData.name }}
      </h4>
      <div class="d-flex flex-wrap">
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
          <span class="d-none d-sm-inline">Actualizar</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nombre"
            label-for="name"
          >
            <b-form-input
              id="name"
              v-model="serviceData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: DESCRIPTION -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Descripcion"
            label-for="description"
          >
            <b-form-textarea
              id="description"
              v-model="serviceData.description"
            />
          </b-form-group>
        </b-col>
        <!-- Field: COST -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Costo"
            label-for="cost"
          >
            <b-form-input
              id="cost"
              v-model="serviceData.cost"
              type="number"
              placeholder="Solo numeros"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Image -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Imagen"
            label-for="image_url"
          >
            <b-form-input
              id="image_url"
              v-model="serviceData.image_url"
            />
          </b-form-group>
        </b-col>

        <!-- Field: subCategory -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Subcategoria"
            label-for="category"
          >
            <v-select
              v-model="serviceData.subCategory"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="subcategories"
              :reduce="val => val.id"
              label="name"
              :clearable="false"
              input-id="category"
            />
          </b-form-group>
        </b-col>

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
              Ocurrio un error cuando se intento enviar sus datos, asegurese de haber llenado todo
            </h4>
          </b-alert>
        </b-col>
      </b-row>
    </b-form>

    <!-- Action Buttons -->
    <b-button
      v-if="action==='create'"
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="onCreate(serviceData)"
    >
      Guardar cambios
    </b-button>
    <b-button
      v-if="action==='update'"
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="onUpdate(serviceData)"
    >
      Actualizar cambios
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm, BFormTextarea, BAlert,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref } from '@vue/composition-api'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import router from '@/router'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormTextarea,
    vSelect,
    BAlert,
  },
  props: {
    serviceData: {
      type: Object,
      required: true,
    },
    action: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      service: this.serviceData,
      serviceLogo: this.serviceData.image_url,
      subcategories: [],
      errorMessage: false,
    }
  },
  beforeMount() {
    console.log('this.service.name')
    console.log(this.service.name)
    const config = {
      method: 'get',
      url: buildServiceUrl('/sub-category?page=1&limit=100'),
      headers: { },
    }

    axios(config)
      .then(response => {
        this.subcategories = response.data.items
      })
      .catch(error => {
        this.errorMessage = true
        console.log(error)
      })
  },
  methods: {
    async uploadImage(event) {
      const file = event.target.files[0]
      const fd = new FormData()
      fd.append('file', file)
      console.log('asd')
      await axios.post(buildServiceUrl('/media/image'), fd)
        .then(response => {
          this.errorMessage = false
          this.serviceLogo = response.data.link
          // this.serviceData.logo_url = response.data.link
          this.serviceData.image_url = response.data.link
        })
        .catch(error => {
          this.errorMessage = true
          console.log(error)
        })
    },
    async onCreate(data) {
      if (data.cost) {
        // eslint-disable-next-line no-param-reassign
        data.cost = Math.ceil(data.cost)
      } else {
        this.errorMessage = true
      }
      const config = {
        method: 'post',
        url: buildServiceUrl('/service'),
        headers: { },
        data,
      }

      await axios(config)
        .then(response => {
          this.errorMessage = false
          console.log(JSON.stringify(response.data))
          router.replace({ name: 'provider-profile', params: { id: JSON.parse(localStorage.getItem('userData')).data[0].type_id } })
        })
        .catch(error => {
          this.errorMessage = true
          console.log(error)
        })
      console.log(data.name)
      console.log(data.description)
      console.log(data.cost)
    },
    async onUpdate(data) {
      if (data.cost) {
        // eslint-disable-next-line no-param-reassign
        data.cost = Math.ceil(data.cost)
      } else {
        this.errorMessage = true
      }
      const config = {
        method: 'patch',
        url: buildServiceUrl(`/service/${router.currentRoute.params.id}`),
        headers: { },
        data,
      }

      await axios(config)
        .then(response => {
          this.errorMessage = false
          console.log(JSON.stringify(response.data))
          router.replace({ name: 'provider-profile', params: { id: JSON.parse(localStorage.getItem('userData')).data[0].type_id } })
        })
        .catch(error => {
          this.errorMessage = true
          console.log(error)
        })
      console.log(data.name)
      console.log(data.description)
      console.log(data.cost)
    },
  },
  // eslint-disable-next-line no-unused-vars
  setup(props, { emit }) {
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.serviceData.image_url = base64
    })

    return {
      avatarText,
      //  ? Demo - Update Image on click of update button
      refInputEl,
      previewEl,
      inputImageRenderer,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
