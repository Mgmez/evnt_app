<template>
  <section class="section">
    <h1>Servicios a los que puedo cotizar</h1>

    <b-card class="mt-2">
      <b-list-group>
        <b-list-group-item
          v-for="service in eventResources"
          :key="service.id"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">

            <b-col md="12">
              <b-card-actions
                :title="service.subCategory.name"
                action-collapse
              >
                <b-card-text>
                  <span>{{ service.description }} </span>
                </b-card-text>
                <br>
                <b-button-group class="mt-2">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    @click="createQuote(service.id)"
                  >
                    Cotizar
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
  BCol, BCard, BListGroup, BListGroupItem, BButton, BButtonGroup,
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
    BButtonGroup,
    BButton,
  },
  data() {
    return {
      eventResources: [],
      page: 1,
      limit: 10,
      profileId: JSON.parse(localStorage.getItem('userData')).data[0].type_id,
    }
  },
  beforeMount() {
    this.getInitialData()
  },
  mounted() {
  },
  methods: {
    createQuote(eventResourceId) {
      const htmlForm = `
        <div class="form-group">
            <label for="price">Costo</label>
            <input type="number" min="0" class="form-control" id="price" placeholder="$$$">
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea class="form-control" id="message" rows="3"></textarea>
        </div>
          `
      this.$swal.fire({
        title: 'Cotizar Evento',
        html: htmlForm,

        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
        inputAttributes: {
          autocapitalize: 'off',
        },
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonText: 'Enviar',
        cancelButtonText: 'Cancelar',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          const price = this.$swal.getPopup().querySelector('#price').value
          const description = this.$swal.getPopup().querySelector('#message').value
          if (!price || !description) {
            this.$swal.showValidationMessage('Por favor llena los campos')
          }
          return { price, description }
        },
      }).then(result => {
        if (result.isConfirmed) {
          const config = {
            method: 'post',
            url: buildServiceUrl('/quote'),
            headers: { },
            data: {
              price: Number(result.value.price),
              description: result.value.description,
              provider: this.profileId,
              eventResource: eventResourceId,
            },
          }

          axios(config)
            .then(response => {
              console.log(JSON.stringify(response.data))
            })
            .catch(error => {
              console.log(error)
              this.$swal.showValidationMessage('Error al enviar la cotizacion, por favor intente mas tarde')
            })
        }
      })
    },
    getInitialData() {
      const config = {
        method: 'get',
        url: buildServiceUrl(`/provider/participate/${this.profileId}`),
        headers: { },
      }

      axios(config)
        .then(response => {
          console.log('JSON.stringify(response.data)')
          console.log(JSON.stringify(response.data))
          this.eventResources = response.data
        })
        .catch(error => {
          console.log(error)
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
