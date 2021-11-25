<template>
  <div>
    <!-- Media -->
    <b-media class="mb-2">
      <template #aside>
        <b-avatar
          ref="previewEl"
          :src="userLogo"
          :text="avatarText(userData.fullName)"
          :variant="`light-${resolveUserRoleVariant(userData.role)}`"
          size="90px"
          rounded
        />
      </template>
      <h4 class="mb-1">
        {{ userData.fullName }}
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
              v-model="userData.name"
            />
          </b-form-group>
        </b-col>

        <!-- Field: icon -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="icono"
            label-for="icon"
          >
            <b-form-input
              id="icon"
              v-model="userData.icon"
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
              v-model="userData.image_url"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Category -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Categoria"
            label-for="categories"
          >
            <v-select
              v-model="userData.categoriesIds"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              :options="$store.getters['app-user/getUsers']"
              :reduce="val => val.value"
              :clearable="false"
              input-id="categories"
              multiple
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
      Save Changes
    </b-button>
  </div>
</template>

<script>
import {
  BButton, BMedia, BAvatar, BRow, BCol, BFormGroup, BFormInput, BForm,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'
import vSelect from 'vue-select'
import { useInputImageRenderer } from '@core/comp-functions/forms/form-utils'
import { ref, onUnmounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import useSubCategoryList from './useSubCategoryList'
import subCategoryStoreModule from './subCategoryStoreModule'

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
    vSelect,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      user: this.userData,
      userLogo: this.userData.image_url,
    }
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0]
      const fd = new FormData()
      fd.append('file', file)
      console.log('asd')
      axios.post(buildServiceUrl('/media/image'), fd)
        .then(response => {
          console.log(response)
          this.userLogo = response.data.link
          // this.userData.logo_url = response.data.link
          this.userData.image_url = response.data.link
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
  setup(props, { emit }) {
    const { resolveUserRoleVariant } = useSubCategoryList()

    const USER_APP_STORE_MODULE_NAME = 'app-user'

    // Register module
    if (!store.hasModule(USER_APP_STORE_MODULE_NAME)) store.registerModule(USER_APP_STORE_MODULE_NAME, subCategoryStoreModule)

    // UnRegister on leave
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })

    const onUpdate = data => {
      store.dispatch('app-user/updateCustomer', { id: router.currentRoute.params.id, data })
        .then(() => {
          emit('app-user/fetchUsers')
          emit('refetch-data')
        }).catch(e => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al actualizar',
          })
          console.log(e)
        })
      router.replace({ name: 'subcategories' })
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
