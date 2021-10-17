<template>
  <b-sidebar
    id="add-new-user-sidebar"
    :visible="isAddNewUserSidebarActive"
    bg-variant="white"
    sidebar-class="sidebar-lg"
    shadow
    backdrop
    no-header
    right
    @hidden="resetForm"
    @change="(val) => $emit('update:is-add-new-user-sidebar-active', val)"
  >
    <template #default="{ hide }">
      <!-- Header -->
      <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
        <h5 class="mb-0">
          Añadir nueva categoria
        </h5>

        <feather-icon
          class="ml-1 cursor-pointer"
          icon="XIcon"
          size="16"
          @click="hide"
        />

      </div>

      <!-- BODY -->
      <validation-observer
        #default="{ handleSubmit }"
        ref="refFormObserver"
      >
        <!-- Form -->
        <b-form
          class="p-2"
          @submit.prevent="handleSubmit(onSubmit)"
          @reset.prevent="resetForm"
        >

          <!-- Name -->
          <validation-provider
            #default="validationContext"
            name="Name"
            rules="required"
          >
            <b-form-group
              label="Nombre"
              label-for="name"
            >
              <b-form-input
                id="name"
                v-model="userData.name"
                :state="getValidationState(validationContext)"
                trim
              />

              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Image -->
          <validation-provider
            #default="validationContext"
            name="Image"
            rules="required"
          >
            <b-form-group
              label="Imagen"
              label-for="image_url"
            >
              <b-row>
                <b-col>
                  <b-form-input
                    id="image_url"
                    :value="userLogo"
                    :v-model="userLogo"
                    :state="getValidationState(validationContext)"
                    readonly
                    trim
                  />
                </b-col>
                <b-col>
                  <b-button
                    variant="primary"
                    @click="$refs.refInputEl.click()"
                  >
                    <input
                      ref="refInputEl"
                      type="file"
                      class="d-none"
                      @change="uploadImage"
                    >
                    <span class="d-none d-sm-inline">Subir Imagen</span>
                    <feather-icon
                      icon="EditIcon"
                      class="d-inline d-sm-none"
                    />
                  </b-button>
                </b-col></b-row>
              <b-form-invalid-feedback>
                {{ validationContext.errors[0] }}
              </b-form-invalid-feedback>
            </b-form-group>
          </validation-provider>

          <!-- Form Actions -->
          <div class="d-flex mt-2">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              class="mr-2"
              type="submit"
            >
              Añadir
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="button"
              variant="outline-secondary"
              @click="hide"
            >
              Cancelar
            </b-button>
          </div>

        </b-form>
      </validation-observer>
    </template>
  </b-sidebar>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BCol, BFormInput, BFormInvalidFeedback, BButton, BRow,
} from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { ref } from '@vue/composition-api'
import { required, alphaNum, email } from '@validations'
import formValidation from '@core/comp-functions/forms/form-validation'
import Ripple from 'vue-ripple-directive'
import countries from '@/@fake-db/data/other/countries'
import store from '@/store'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  components: {
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButton,
    BRow,
    BCol,
    // Form Validation
    ValidationProvider,
    ValidationObserver,
  },
  directives: {
    Ripple,
  },
  model: {
    prop: 'isAddNewUserSidebarActive',
    event: 'update:is-add-new-user-sidebar-active',
  },
  props: {
    isAddNewUserSidebarActive: {
      type: Boolean,
      required: true,
    },
    roleOptions: {
      type: Array,
      required: true,
    },
    planOptions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      required,
      alphaNum,
      email,
      countries,
      userLogo: '',
    }
  },
  setup(props, { emit }) {
    const blankUserData = {
      email: '',
      password: '',
      role: null,
      plan: null,
    }

    const userData = ref(JSON.parse(JSON.stringify(blankUserData)))
    const resetuserData = () => {
      userData.value = JSON.parse(JSON.stringify(blankUserData))
    }

    const onSubmit = () => {
      store.dispatch('app-user/addCustomer', userData.value)
        .then(() => {
          emit('refetch-data')
          emit('update:is-add-new-user-sidebar-active', false) // esto hace que se oculte
        }).catch(e => {
          emit('update:is-add-new-user-sidebar-active', true)
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al registrar, porfavor intente de nuevo',
          })
          console.log(e)
        })
    }

    const {
      refFormObserver,
      getValidationState,
      resetForm,
    } = formValidation(resetuserData)

    return {
      userData,
      onSubmit,

      refFormObserver,
      getValidationState,
      resetForm,
    }
  },
  methods: {
    uploadImage(event) {
      const file = event.target.files[0]
      const fd = new FormData()
      fd.append('file', file)

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
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';

#add-new-user-sidebar {
  .vs__dropdown-menu {
    max-height: 200px !important;
  }
}
</style>
