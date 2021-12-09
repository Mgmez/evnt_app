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
      <b-link
        :to="{name:'categories-list'}"
      >Ir a eventos
      </b-link>
      >
      <b-link
        :to="{name:'subcategory-list', params: {id: categoryData.id}}"
      >
        ir a servicios
      </b-link>
      > estas visitando {{ subcategoryData.name }}
    </b-row>
    <b-row class="row row-cat">

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

      <h1
        v-if="filterData.length === 0"
        class="mt-25"
      >
        No hay proveedores disponibles para {{ subcategoryData.name }}, vuelve mas tarde
      </h1>
    </b-row>
  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BCardTitle, BLink,
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
    BLink,
  },
  props: ['id', 'name'],
  data() {
    return {
      fullData: [],
      filterData: [],
      page: 1,
      limit: 100,
      subcategoryData: {
        id: this.$route.params.idSubcategory,
      },
      categoryData: {
        id: this.$route.params.idCategory,
      },
    }
  },
  watch: {
    '$route.params.idSubcategory': function () {
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
      if (this.$route.params.idSubcategory === undefined) {
        this.$router.push('/categories-list')
        return
      }
      console.log(this.$route.params.idSubcategory)
      axios.get(buildServiceUrl(`/provider/services/${this.$route.params.idSubcategory}`))
        .then(res => {
          this.filterData = res.data
          this.getFullData() // remove this when you get the backend whole data
        })
        .catch(err => console.log(err))
      axios.get(buildServiceUrl(`/sub-category/${this.$route.params.idSubcategory}`))
        .then(res => {
          this.subcategoryData = res.data
          console.log('subcategoryData')
          console.log(this.subcategoryData)
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
  max-width: inherit !important;
  text-align: center;
}
.row-cat{
  display: inline-flex;
}
@media (max-width: 680px) {
  .row{
    display: block;
  }
}
</style>
