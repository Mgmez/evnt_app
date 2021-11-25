<template>
  <div class="container">
    <b-card
      no-body
      class="border-primary"
    >
      <b-card-header class="d-flex justify-content-between align-items-center pt-75 pb-25 flex-row flex-wrap">
        <img
          class="card-img"
          :src="serviceData.image_url"
          alt=""
        >
        <h5 class="mb-0 mt-75">
          {{ serviceData.name }}
        </h5>
        <b-badge
          variant="light-primary"
          class="mb-0 mt-75"
        >
          {{ serviceData.subCategory.name }}
        </b-badge>
      </b-card-header>

      <b-card-body>
        <ul class="list-unstyled my-1">
          <li class="my-25">
            <span class="align-middle">{{ serviceData.description }}</span>
          </li>
          <li>
            <span class="align-middle">Costo {{ serviceData.cost }}</span>
          </li>
        </ul>
        <b-button
          v-if="isMyProfile"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="primary"
          :to="{name: 'provider-update-service', params:{id: serviceData.id}}"
          block
        >
          Actualizar
        </b-button>
        <b-button
          v-if="isMyProfile"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="danger"
          block
          @click="deleteService(serviceData.id)"
        >
          Borrar
        </b-button>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import {
  BCard, BCardHeader, BCardBody, BBadge, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BCard,
    BCardHeader,
    BCardBody,
    BBadge,
    BButton,
  },
  props: {
    serviceData: {
      type: Object,
      required: true,
    },
    deleteService: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {

      isMyProfile: false,
    }
  },
  beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData.data[0].type_id === this.$route.params.id) {
      this.isMyProfile = true
    }
  },
}
</script>

<style>
.card-img{
  height: 150px !important;
  width: 200px !important;
}
</style>
