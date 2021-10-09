<template>
  <div>

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
              v-model="userData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Icon -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Icono"
            label-for="icon"
          >
            <b-form-input
              id="icon"
              v-model="userData.icon"
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>

    <!-- Action Buttons -->
    <b-button
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      :block="$store.getters['app/currentBreakPoint'] === 'xs'"
      @click="onUpdate(userData)"
    >
      Guardar cambios
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BRow, BCol, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import useCategoryList from './useRoleList'
import roleStoreModule from './roleStoreModule'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { resolveUserRoleVariant } = useCategoryList()

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, roleStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const onUpdate = data => {
      store.dispatch('app-user/updateCustomer', { id: router.currentRoute.params.id, data })
        .then(() => {
          emit('app-user/fetchUsers')
          emit('refetch-data')
        }).catch(e => console.log(e))
      router.replace({ name: 'roles' })
    }

    const roleOptions = [
      { label: 'Administrator', value: '1b75aab3-51e3-4a32-a4c2-5a09d0e27df3' },
      { label: 'Provider', value: '5c6ad3c1-de22-49ef-b88c-66ad2915a205' },
      { label: 'Customer', value: '7fc5f24b-8b61-460f-a8bf-24ac59722198' },
    ]

    const planOptions = [
      { label: 'Free', value: 'Free' },
      { label: 'Enterprise', value: 'Enterprise' },
    ]

    const statusOptions = [
      { label: 'Pending', value: 'pending' },
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
    ]
    // ? Demo Purpose => Update image on click of update
    const refInputEl = ref(null)
    const previewEl = ref(null)

    const { inputImageRenderer } = useInputImageRenderer(refInputEl, base64 => {
      // eslint-disable-next-line no-param-reassign
      props.userData.avatar = base64
    })

    return {
      resolveUserRoleVariant,
      onUpdate,
      avatarText,
      roleOptions,
      planOptions,
      statusOptions,
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
