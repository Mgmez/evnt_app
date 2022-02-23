<template>
  <section class="section">
    <h1>Mis eventos</h1>

    <router-link
      to="/my-events/create"
      class="btn btn-primary"
      tag="button"
    >
      Crear evento
    </router-link>

    <b-card class="mt-2">
      <b-list-group>
        <b-list-group-item
          v-for="event in events"
          :key="event.id"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">

            <b-col md="12">
              <b-card-actions
                :title="event.name"
                :collapsed="true"
                action-collapse
              >
                <b-card-text>
                  <span> {{ event.description }} </span>
                </b-card-text>
                <br>
                <b-button-group class="mt-2">
                  <b-button
                    variant="outline-primary"
                    :to="{ name: 'my-event-info', params:{id: event.id}}"
                  >
                    Ver
                  </b-button>
                  <b-button
                    variant="outline-danger"
                    @click="deleteEvent(event.id)"
                  >
                    Borrar
                  </b-button>
                </b-button-group>
              </b-card-actions>
            </b-col>
          </div></b-list-group-item>
      </b-list-group>
    </b-card>
  </section>
</template>

<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import {
  BCol, BCard, BListGroup, BListGroupItem, BButton, BButtonGroup, BCardText,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'

export default {
  components: {
    BCol,
    BCard,
    BListGroup,
    BListGroupItem,
    BCardActions,
    BCardText,
    BButtonGroup,
    BButton,
  },
  data() {
    return {
      events: [],
      page: 1,
      limit: 1000,
    }
  },
  beforeMount() {
    this.getInitialData()
  },
  mounted() {
  },
  methods: {
    async getInitialData() {
      const config = {
        method: 'get',
        url: buildServiceUrl(`/event/customer/${JSON.parse(localStorage.getItem('userData')).data[0].type_id}`),
        headers: [],
      }

      await axios(config)
        .then(response => {
          console.log(response.data)
          this.events = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteEvent(id) {
      const config = {
        method: 'delete',
        url: buildServiceUrl(`/event/${id}`),
        headers: { },
      }
      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
          this.getInitialData()
        })
        .catch(error => {
          console.log(error)
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al borrar el evento',
          })
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.section {
  text-align: center;
}
</style>
