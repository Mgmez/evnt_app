<template>
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
      :action="'create'"
      class="mt-2 pt-75"
    />
  </b-tab>
</template>

<script>
import {
  BTab,
} from 'bootstrap-vue'
import { onUnmounted } from '@vue/composition-api'
import store from '@/store'
import ServiceTab from '../ServiceTab.vue'

export default {
  components: {
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
