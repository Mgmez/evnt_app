<template>
  <section class="section">
    <!-- input
    <b-form-input
      id="filterName"
      placeholder="Busca una sub-categoria"
      size="lg"
      @input="dataFilter"
    />-->
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
  BRow, BCol, BCard, BCardTitle,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'

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
  beforeMount() {
    this.getInitialData()
    // this.getFullData()
  },
  mounted() {
    this.getNextData()
  },
  methods: {
    getInitialData() {
      console.log(this.$route.params.name)
      axios.get(buildServiceUrl(`/sub-category?category=${this.$route.params.name}&page=${this.page}&limit=${this.limit}`))
        .then(res => {
          this.filterData = res.data.items
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
      window.onscroll = () => {
        const bottomOfWindow = document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight
        if (bottomOfWindow) {
          this.page += 1
          axios.get(buildServiceUrl(`/category?page=${this.page}&limit=${this.limit}`)).then(response => {
            if (response.data.items[0] !== undefined) {
              this.data.push(response.data.items[0])
              console.log(this.data)
            } else {
              this.page -= 1
            }
          })
        }
      }
    },

    getProvider(event, name) {
      this.$router.push({
        name: 'provider-list',
        params: { id: event.currentTarget.id, name },
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
  width: 800px !important;
  height: 400px !important;
  max-width: 800px !important;
  max-height: 20% !important;
}

@media (max-width: 1900px) {
  .card-img {
  width: 100% !important;
  height: 200px !important;
  max-width: 450px !important;
  max-height: 25% !important;
  display: block;
}
}
#filterName {
  margin-bottom: 20px;
  max-width: fit-content;
}
.section {
  text-align: -webkit-center;
}
</style>
