<template>
  <component :is="serviceData === undefined ? 'div' : 'b-card'">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="serviceData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching service data
      </h4>
      <div class="alert-body">
        No service found with this service id.
      </div>
    </b-alert>

    <b-tabs
      v-if="serviceData"
      pills
    >

      <!-- Tab: Account -->
      <b-tab active>
        <template #title>
          <feather-icon
            icon="UserIcon"
            size="16"
            class="mr-0 mr-sm-50"
          />
          <span class="d-none d-sm-inline">Servicio</span>
        </template>
        <service-tab
          :service-data="serviceData"
          :action="'update'"
          class="mt-2 pt-75"
        />
      </b-tab>
    </b-tabs>
  </component>
</template>

<script>
import {
  BTab, BTabs, BCard, BAlert, BLink,
} from 'bootstrap-vue'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import router from '@/router'
import ServiceTab from '../ServiceTab.vue'

export default {
  components: {
    BTabs,
    BCard,
    BAlert,
    BLink,
    BTab,

    ServiceTab,
  },
  data() {
    return {
      serviceData: {},
    }
  },
  beforeMount() {
    this.serviceData = {
      name: '',
      image_url: '',
      cost: '',
      description: '',
      provider: JSON.parse(localStorage.getItem('userData')).data[0].type_id,
      subCategory: '',
    }
    this.getInitialData()
  },
  methods: {
    getInitialData() {
      const config = {
        method: 'get',
        url: buildServiceUrl(`/service/${router.currentRoute.params.id}`),
        headers: { },
      }

      axios(config)
        .then(response => {
          this.serviceData.name = response.data.name
          this.serviceData.image_url = response.data.image_url
          this.serviceData.cost = response.data.cost
          this.serviceData.description = response.data.description
          this.serviceData.subCategory = response.data.subCategory
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al subir imagen, porfavor intente de nuevo o mande una imagen mas pequeña',
          })
          console.log(error)
        })
    },
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
  },
}
</script>

<style>

</style>
