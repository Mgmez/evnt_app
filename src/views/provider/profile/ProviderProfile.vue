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
          <info-card :user-data="userData" />
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
        <b-col>
          <provider-location />
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
import InfoCard from './InfoCard.vue'
import ServiceCard from './ServiceCard.vue'
import ProviderLocation from './ProviderLocation.vue'

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
      // this.$forceUpdate()
      this.getProfileData()
    },
  },
  beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData.data[0].type_id === this.$route.params.id) {
      this.isMyProfile = true
    }
    this.getProfileData()
    this.getServices()
  },
  methods: {
    getProfileData() {
      axios.get(buildServiceUrl(`/provider/${this.$route.params.id}`))
        .then(response => {
          console.log(response.data)
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
          this.services = [response.data, response.data, response.data]
        })
        .catch(error => {
          if (error.response.status === 404) {
            this.services = []
          }
        })
    },
    onDelete(id) {
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
    },
  },
}
</script>

<style>

</style>
