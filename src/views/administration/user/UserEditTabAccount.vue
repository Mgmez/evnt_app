<template>
  <div>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Correo"
            label-for="email"
          >
            <b-form-input
              id="email"
              v-model="userData.email"
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Role -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Rol"
            label-for="user-role"
          >
            <v-select
              v-model="userData.role.name"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="roleOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Plan -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Plan"
            label-for="user-role"
          >
            <v-select
              v-model="userData.plan"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="planOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-role"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Status
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Status"
            label-for="user-status"
          >
            <v-select
              v-model="userData.status"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="statusOptions"
              :reduce="val => val.value"
              :clearable="false"
              input-id="user-status"
            />
          </b-form-group>
        </b-col> -->

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
import vSelect from 'vue-select'
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import useUsersList from './useUsersList'
import userStoreModule from './userStoreModule'

export default {
  components: {
    BButton,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    vSelect,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { resolveUserRoleVariant } = useUsersList()

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, userStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const onUpdate = data => {
      store.dispatch('app-user/updateUser', { id: router.currentRoute.params.id, data })
        .then(() => {
          emit('app-user/fetchUsers')
          emit('refetch-data')
        }).catch(e => console.log(e))
      router.replace({ name: 'users' })
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
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>
