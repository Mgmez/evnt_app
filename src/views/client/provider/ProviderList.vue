<template>
  <section class="section">
    <!-- input
    <b-form-input
      id="filterName"
      placeholder="Busca un proveedor"
      size="lg"
      @input="dataFilter"
    />-->
    <b-row class="row">

      <!-- img overlay -->
      <b-col
        v-for="element in filterData"
        :key="element.id"
        md="6"
        xl="3"
        class="col"
      >
        <b-card
          :id="element.id"
          :key="element.id"
          :img-src="element.logo_url"
          :img-fluid="true"
          overlay
          text-variant="white"
          img-alt="card img"
          body-class="bg-overlay"
          class="card"
          @click="getProfile($event)"
        >
          <b-card-title class="text-white card-title">
            {{ element.name }}
          </b-card-title>
        </b-card>
      </b-col>
    </b-row>
  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BCardTitle,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardTitle,
  },
  props: ['id', 'name'],
  data() {
    return {
      fullData: [],
      filterData: [],
      page: 1,
      limit: 10,
    }
  },
  watch: {
    '$route.params.id': function () {
      this.getInitialData()
    },
  },
  beforeMount() {
    this.getInitialData()
    // this.getFullData()
  },
  mounted() {
    this.getNextData()
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
  },
  methods: {
    getInitialData() {
      if (this.$route.params.id === undefined) {
        this.$router.push('/categories-list')
        return
      }
      console.log(this.$route.params.id)
      axios.get(buildServiceUrl(`/provider/services/${this.$route.params.id}`))
        .then(res => {
          this.filterData = res.data
          this.getFullData() // remove this when you get the backend whole data
        })
        .catch(err => console.log(err))
    },

    getFullData() {
      // this.fullData = res.data.items
      console.log('get full data from backend')
      this.fullData = this.filterData
      console.log(this.fullData)
    },

    dataFilter(data) {
      console.log(data)
      if (data !== '') {
        this.filterData = this.fullData.filter(e => e.name.toLowerCase().match(data))
      } else {
        this.filterData = this.fullData
      }
    },

    getNextData() {
    },

    getProfile(event) {
      this.$router.push({
        name: 'provider-profile',
        params: { id: event.currentTarget.id },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  display: inline-table;
  cursor: pointer;
}
.card-title {
  margin-top: 30%;
}
#card-images{
  text-align: center;
}
.card-img {
  width: 300px !important;
  height: 200px !important;
  max-width: 300px !important;
  max-height: 25% !important;
  display: block;
}
#filterName {
  margin-bottom: 20px;
  max-width: fit-content;
}
.section {
  text-align: -webkit-center;
}
.col{
  max-width: fit-content;
}
.row{
  display: inline-flex;
}
</style>
