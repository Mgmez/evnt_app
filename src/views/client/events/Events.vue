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
    <br>
    <br>
    <div>
      <b-card-group deck>
        <b-card
          v-for="event in events"
          :key="event.id"
          img-src="https://ep01.epimg.net/verne/imagenes/2018/12/03/articulo/1543853044_168056_1544110723_sumario_normal.jpg"
          img-alt="card img"
          :img-fluid="true"
          body-class="bg-overlay"
          tag="article"
          style="max-width: 25rem;"
          class="card"
          :title="event.name"
        >
          Fecha del evento:
          <div>

            <b-col md="12">
              <b-card-text>
                <span>{{ event.date }} </span>
              </b-card-text>
              <br>
              <b-button
                pill
                variant="outline-info"
                :to="{ name: 'my-event-info', params:{id: event.id}}"
              ><feather-icon
                size="16"
                icon="EyeIcon"
                class="mr-50"
              />Ver
              </b-button>
              <b-button
                pill
                variant="outline-danger"
                @click="deleteEvent(event.id)"
              ><feather-icon
                size="16"
                icon="Trash2Icon"
                class="mr-50"
              />Borrar
              </b-button>
            </b-col>
          </div>
        </b-card>
      </b-card-group>
    </div>
  </section>
</template>

<script>
import {
  BCol, BCard, BButton, BCardText, BCardGroup,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'

export default {
  components: {
    BCol,
    BCard,
    BCardText,
    BButton,
    BCardGroup,
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
.img {
  height: 300px;
}
</style>
