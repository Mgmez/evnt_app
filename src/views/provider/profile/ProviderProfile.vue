<template>
  <div :key="id">

    <!-- Alert: No item found -->
    <b-alert
      variant="danger"
      :show="userData === undefined"
    >
      <h4 class="alert-heading">
        Error fetching user data
      </h4>
      <div class="alert-body">
        No user found with this user id. Check
        <b-link
          class="alert-link"
          :to="{ name: 'apps-users-list'}"
        >
          User List
        </b-link>
        for other users.
      </div>
    </b-alert>

    <template v-if="userData">
      <!-- First Row -->
      <b-row>
        <b-col>
          <info-card
            :key="userData.id"
            :user-data="userData"
          />
        </b-col>
      </b-row>
      <b-row>
        <b-col
          v-for="(item, i) in services"
          :key="i"
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <service-card
            :service-data="item"
            :delete-service="onDelete"
          />
        </b-col>
      </b-row>
      <b-row
        class="d-flex justify-content-center"
        style="margin-bottom:25px"
      >
        <b-col
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <b-button
            v-if="isMyProfile"
            variant="primary"
            :to="{name: 'provider-add-service'}"
          >
            Añadir servicio
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col
          cols="12"
        >
          <carousel-basic :images-url="userData.images_url" />
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <provider-location
            :key="userData.id"
            :altitude="Number(userData.altitude)"
            :latitude="Number(userData.latitude)"
            :longitude="Number(userData.longitude)"
            :user-id="userData.id"
          />
        </b-col>
      </b-row>

    </template>

  </div>
</template>

<script>
import {
  BRow, BCol, BAlert, BLink, BButton,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'
import InfoCard from './InfoCard.vue'
import ServiceCard from './ServiceCard.vue'
import ProviderLocation from './ProviderLocation.vue'
import CarouselBasic from './CarouselBasic.vue'

export default {
  components: {
    BRow,
    BCol,
    BAlert,
    BLink,
    BButton,

    // Local Components
    InfoCard,
    ServiceCard,
    ProviderLocation,
    CarouselBasic,
  },
  data() {
    return {
      userData: '',
      services: '',
      id: this.$route.params.id,
      isMyProfile: false,
    }
  },
  watch: {
    $route(to, from) {
      console.log(to)
      console.log(from)
      this.userData = ''
      this.services = ''
      this.id = this.$route.params.id
      this.isMyProfile = false
      const sessionData = JSON.parse(localStorage.getItem('userData'))
      if (sessionData.data[0].type_id === this.$route.params.id) {
        this.isMyProfile = true
      }
      this.getProfileData()
      this.getServices()
    },
  },
  beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData === null) {
      this.isMyProfile = false
    } else if (sessionData.data[0].type_id === this.$route.params.id) {
      this.isMyProfile = true
    }
    this.getProfileData()
    this.getServices()
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
  },
  methods: {
    getProfileData() {
      axios.get(buildServiceUrl(`/provider/${this.$route.params.id}`))
        .then(response => {
          console.log('PROFILE DATA')
          console.log(response.data)
          console.log(response.data.latitude)
          console.log(response.data.altitude)
          this.userData = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.userData.value = undefined
          }
        })
    },
    getServices() {
      axios.get(buildServiceUrl(`/service/provider/${this.$route.params.id}?page=1&limit=10`))
        .then(response => {
          console.log(response)
          this.services = response.data
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.services = []
          }
        })
    },
    onDelete(id) {
      this.$swal.fire({
        title: 'Estas seguro de querer borrar esto?',
        text: 'No sera posible revertir el cambio!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Borrar',
        cancelButtonText: 'Cancelar',
      }).then(result => {
        if (result.isConfirmed) {
          const config = {
            method: 'delete',
            url: buildServiceUrl(`/service/${id}`),
            headers: { },
          }

          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data))
              this.getServices()
            })
            .catch(error => {
              console.log(error)
            })
        }
      })
    },
  },
}
</script>

<style>

</style>
