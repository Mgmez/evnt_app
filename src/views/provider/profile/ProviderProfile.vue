<template>
  <div>

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
          cols="12"
          md="5"
          xl="3"
          lg="4"
        >
          <service-card />
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
  BRow, BCol, BAlert, BLink,
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

    // Local Components
    InfoCard,
    ServiceCard,
    ProviderLocation,
  },
  data() {
    return {
      userData: '',
    }
  },
  beforeMount() {
    this.getInitialData()
  },
  methods: {
    getInitialData() {
      console.log(this.$route.params.id)
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
  },
}
</script>

<style>

</style>
