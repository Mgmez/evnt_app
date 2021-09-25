<template>
  <section class="section">
    <h1>Mis eventos</h1>
    <b-row>
      <!-- img overlay -->
      <b-col
        v-for="element in filterData"
        :key="element.id"
        md="6"
        xl="6"
      >
        <b-card
          :id="element.id"
          :key="element.id"
          :img-src="element.image_url"
          overlay
          text-variant="white"
          img-alt="card img"
          body-class="bg-overlay"
          class="card"
          @click="getSubCategory($event, element.name)"
        >
          <b-card-title class="text-white card-title">
            {{ element.name }}
          </b-card-title>
        </b-card>
      </b-col>
    </b-row>

    <router-link
      to="/my-events/create"
      class="btn btn-primary"
      tag="button"
    >
      Crear evento</router-link>

  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BCardTitle,
} from 'bootstrap-vue'
// import { buildServiceUrl } from '@/constants/urls'
// import axios from 'axios'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardTitle,
  },
  data() {
    return {
      fullData: [],
      filterData: [],
      page: 1,
      limit: 10,
    }
  },
  beforeMount() {
    this.getInitialData()
  },
  mounted() {
  },
  methods: {
  },
}
</script>

<style lang="scss" scoped>
.section {
  text-align: center;
}
</style>
