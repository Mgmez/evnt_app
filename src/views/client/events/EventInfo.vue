<template>
  <section class="section">
    <b-card
      :title="eventName"
      class="event-card-data"
    >
      <p>{{ eventDescription }}</p>
      <b-card class="mt-2">
        <b-list-group>
          <b-list-group-item
            v-for="element in services"
            :key="element.id"
            class="flex-column align-items-start"
          >
            <div class="d-flex w-100 justify-content-between">

              <b-col md="12">
                <b-card-actions
                  :title="element.description"
                  action-collapse
                >
                  <b-card-text>
                    <span>{{ element.subCategory.name }} </span>
                  </b-card-text>

                  <b-row class="row mt-2  justify-content-center quotes">

                    <!-- Providers -->
                    <b-col
                      v-for="quote in element.quotes"
                      :key="quote.id"
                      md="6"
                      xl="3"
                      class="col"
                    >
                      <b-card
                        :id=" quote.id"
                        :key="quote.id"
                        :img-src="quote.provider.logo_url"
                        :text="avatarText(quote.provider.name)"
                        :img-fluid="true"
                        overlay
                        text-variant="white"
                        img-alt="card img"
                        body-class="bg-overlay"
                        class="card card-event"
                        @click="getProfile(quote.provider.id)"
                      >
                        <b-card-title class="text-white card-title">
                          {{ quote.provider.name }}
                        </b-card-title>
                        <b-card-text>
                          <p> {{ quote.description }}</p>

                          <span>${{ quote.price }} </span>
                        </b-card-text>
                      </b-card>
                    </b-col>
                  </b-row>
                  <b-button-group class="mt-2">
                    <b-button
                      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                      variant="outline-danger"
                      @click="deleteService(element.id)"
                    >
                      Borrar
                    </b-button>
                  </b-button-group>
                </b-card-actions>
              </b-col>
            </div></b-list-group-item>
        </b-list-group>
      </b-card>

      <validation-observer ref="eventForm">
        <b-form @submit.prevent>
          <b-row>
            <!-- elements -->
            <!-- category -->
            <b-col
              v-for="component in elementsComponent"
              id="categories-col"
              :key="component.id"
              cols="12"
            >
              <input-sub-categories
                :idx="component.id"
                v-bind="component.element"
                :elements-no-id="elementsNoId"
                :send-category="getSelectedCategory"
                :send-pieces="getSelectedPieces"
                :remove-element="deleteCategoriesElement"
              />
            </b-col>
            <!-- add element -->
            <b-col
              cols="12"
              class=" mt-2"
            >
              <div class="d-flex justify-content-center">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  variant="primary"
                  class="mr-1"
                  @click="addElement"
                >
                  Añadir servicio
                </b-button>
              </div>
            </b-col>

            <!-- submit and reset -->
            <b-col
              cols="12"
              class=" mt-2"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                type="submit"
                variant="primary"
                class="mr-1"
                @click.prevent="validationForm"
              >
                Actualizar
              </b-button>
            </b-col>
          </b-row>
        </b-form>
      </validation-observer>
    </b-card>

  </section>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard, BFormTextarea, BButtonGroup, BCardTitle, BListGroup, BListGroupItem, BCardText,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import {
  required, between, min,
} from '@validations'
import router from '@/router'
import { v4 as uuidv4 } from 'uuid'
import { avatarText } from '@core/utils/filter'
import InputSubCategories from './InputSubCategories.vue'

export default {
  components: {
    BCard,
    BFormTextarea,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    InputSubCategories,
    BButtonGroup,
    BCardTitle,
    BListGroup,
    BListGroupItem,
    BCardActions,
    BCardText,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      elementsComponent: [],
      services: [],
      eventName: '',
      eventDescription: '',
      elements: [],
      elementsNoId: [],
      required,
      min,
      between,
      eventId: router.currentRoute.params.id,
    }
  },
  mounted() {
    this.getInitialData()
  },
  methods: {
    validatorPositive(value) {
      if (value > 0) {
        return true
      }
      return false
    },
    getProfile(id) {
      this.$router.push({
        name: 'provider-profile',
        params: { id },
      })
    },
    addElement() {
      const idx = uuidv4()
      this.elementsComponent.push({
        id: idx,
        element: InputSubCategories,
        subCategory: '',
        description: '',
      })
    },
    getInitialData() {
      this.elementsComponent = []
      this.services = []
      this.eventName = ''
      this.eventDescription = ''
      this.elements = []
      this.elementsNoId = []
      this.getSubcategories()
      this.getEventData()
      this.getEventServices()
    },
    getSubcategories() {
      axios.get(buildServiceUrl('/sub-category?page=1&limit=150'))
        .then(res => {
          this.elements = res.data.items
          this.elementsNoId = res.data.items.map(e => e.name)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getEventData() {
      const configEvent = {
        method: 'get',
        url: buildServiceUrl(`/event/${this.eventId}`),
        headers: { },
      }

      axios(configEvent)
        .then(response => {
          const { name, description } = response.data
          this.eventName = name
          this.eventDescription = description
        })
        .catch(error => {
          console.log(error)
        })
    },
    getEventServices() {
      const config = {
        method: 'get',
        url: buildServiceUrl(`/event-resource/event/${this.eventId}`),
        headers: { },
      }

      axios(config)
        .then(response => {
          this.services = response.data
        })
        .catch(error => {
          console.log(error)
        })
    },
    validationForm() {
      if (this.elementsComponent.length === 0) {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Añade servicios para tu evento',
        })
      } else {
        this.elementsComponent.forEach(e => {
          if (e.description.trim() === '' || e.subCategory.trim() === '') {
            this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Llena todos los campos',
            })
          }
        })
        this.createEventResources()
        // this.getInitialData()
      }
    },
    async createEventResources() {
      for (let idx = 0; idx < this.elementsComponent.length; idx += 1) {
        const element = this.elementsComponent[idx]
        const config = {
          method: 'post',
          url: buildServiceUrl('/event-resource'),
          headers: { },
          data: {
            description: element.description,
            event: this.eventId,
            subCategory: element.subCategoryId,
          },
        }
        // eslint-disable-next-line no-await-in-loop
        await axios(config)
      }
      this.getInitialData()
    },
    getSelectedCategory(id, val) {
      const subCategory = this.elements.find(e => e.name === val)
      this.elementsComponent.find(e => e.id === id).subCategory = val
      this.elementsComponent.find(e => e.id === id).subCategoryId = subCategory.id
    },
    getSelectedPieces(id, val) {
      this.elementsComponent.find(e => e.id === id).description = val
    },
    deleteCategoriesElement(id) {
      const idx = this.elementsComponent.findIndex(e => e.id === id)
      this.elementsComponent.splice(idx, 1)
    },
    deleteService(id) {
      const config = {
        method: 'delete',
        url: buildServiceUrl(`/event-resource/${id}`),
        headers: { },
      }
      axios(config)
        .then(() => {
          this.getInitialData()
        })
        .catch(() => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al borrar el servicio',

          })
        })
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>

<style scoped>
.elements-event {
  display: inherit;
}
.section {
  text-align: -webkit-center;
}
.card-event {
  text-align: center;
  cursor: pointer;
}
#card-images{
  text-align: center;
}
.card-img {
  width: 300px !important;
  height: 200px !important;
  max-width: 290px !important;
  max-height: 25% !important;
  display: block;
}

@media (max-width: 480px) {
  .quotes{
    display:grid !important;
  }

  .quotes{
    width : fit-content !important;
  }

  .event-card-data{
    width: fit-content !important;
  }
}
</style>
