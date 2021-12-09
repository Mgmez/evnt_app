<template>
  <section class="section">
    <!-- input
    <b-form-input
      id="filterName"
      placeholder="Busca una sub-categoria"
      size="lg"
      @input="dataFilter"
    />-->
    <b-row class="row">
      <b-link
        :to="{name:'categories-list'}"
      >Ir a eventos
      </b-link>
      > estas visitando {{ categoryData.name }}
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
          :img-src="element.image_url"
          :img-fluid="true"
          overlay
          text-variant="white"
          img-alt="card img"
          body-class="bg-overlay"
          class="card"
          @click="getProvider($event, element.name)"
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
      categoryData: {},
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
      axios.get(buildServiceUrl(`/sub-category/category/${this.$route.params.id}`))
        .then(res => {
          this.filterData = res.data
          this.categoryData = this.filterData[0].categories.filter(c => c.id === this.$route.params.id)
          // eslint-disable-next-line prefer-destructuring
          this.categoryData = this.categoryData[0]
          this.getFullData() // remove this when you get the backend whole data
        })
        // eslint-disable-next-line no-unused-vars
        .catch(_err => {
          this.$router.push('/')
        })
    },

    getFullData() {
      // this.fullData = res.data.items
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

    getProvider(event, name) {
      this.$router.push({
        name: 'provider-list',
        params: { idCategory: this.categoryData.id, idSubcategory: event.currentTarget.id, name },
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
