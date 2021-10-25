<template>
  <section class="section">
    <h1>Eventos a los que puedo pertenecer</h1>

    <b-card class="mt-2">
      <b-list-group>
        <b-list-group-item
          v-for="i in 10"
          :key="i"
          class="flex-column align-items-start"
        >
          <div class="d-flex w-100 justify-content-between">

            <b-col md="12">
              <b-card-actions
                title="Event"
                action-collapse
              >
                <b-card-text>
                  <span>Description goes here </span>
                </b-card-text>
                <br>
                <b-button-group class="mt-2">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    @click="createQuote"
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
// import { buildServiceUrl } from '@/constants/urls'
// import axios from 'axios'

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
    createQuote() {
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
