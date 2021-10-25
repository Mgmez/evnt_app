<template>
  <b-card
    title="Crear Evento"
  >
    <validation-observer ref="eventForm">
      <b-form @submit.prevent>
        <b-row>

          <!-- first name -->
          <b-col cols="12">
            <b-form-group
              label="Nombre del evento"
              label-for="Name"
            >
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Nombre del evento"
              >
                <b-form-input
                  id="Name"
                  v-model="eventName"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Nombre del evento"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>
          <!-- description -->
          <b-col cols="12">
            <b-form-group
              label="Descripcion del evento"
              label-for="Description"
            >
              <validation-provider
                #default="{ errors }"
                rules="required"
                name="Descripcion del evento"
              >
                <b-form-input
                  id="description"
                  v-model="descriptionEvent"
                  class="form-control-merge"
                  :state="errors.length > 0 ? false:null"
                  placeholder="Descripcion del evento"
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </validation-provider>
            </b-form-group>
          </b-col>

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
          <b-col cols="12">
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
          <b-col cols="12">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              type="submit"
              variant="primary"
              class="mr-1"
              @click.prevent="validationForm"
            >
              Crear
            </b-button>
          </b-col>
        </b-row>
      </b-form>
    </validation-observer>
  </b-card>
</template>

<script>

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BButton, BCard,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import {
  required, between, min,
} from '@validations'
import { v4 as uuidv4 } from 'uuid'
import InputSubCategories from './InputSubCategories.vue'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BButton,
    ValidationProvider,
    ValidationObserver,
    InputSubCategories,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      elementsComponent: [],
      eventName: '',
      descriptionEvent: '',
      elements: [],
      elementsNoId: [],
      required,
      min,
      between,
    }
  },
  mounted() {
    this.getInitialData()
  },
  methods: {
    validatorPositive(value) {
      console.log(value)
      console.log(value > 0)
      if (value > 0) {
        return true
      }
      return false
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
      axios.get(buildServiceUrl('/sub-category?page=1&limit=15'))
        .then(res => {
          this.elements = res.data.items
          this.elementsNoId = res.data.items.map(e => e.name)
        })
        .catch(err => {
          console.log(err)
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

        if (this.eventName.trim() === '') {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Llena todos los campos',
          })
        } else {
          this.createEvent().then(eventData => {
            this.createEventResources(eventData.id)
            this.$router.push('/my-events')
          })
        }
      }
    },
    async createEvent() {
      console.log(JSON.parse(localStorage.getItem('userData')))
      const config = {
        method: 'post',
        url: buildServiceUrl('/event'),
        headers: { },
        data: {
          name: this.eventName,
          description: this.descriptionEvent,
          customer: JSON.parse(localStorage.getItem('userData')).data[0].type_id,
        },
      }
      const res = await axios(config)
        .then(response => response)
        .catch(error => {
          console.log(error)
          this.$swal.fire({
            icon: 'error',
            title: 'Oops... Error al crear el evento',
            text: error.response.message,
          })
        })
      return res.data
    },
    createEventResources(eventId) {
      for (let idx = 0; idx < this.elementsComponent.length; idx += 1) {
        const element = this.elementsComponent[idx]
        console.log(element.subCategoryId)
        console.log('eventId')
        const config = {
          method: 'post',
          url: buildServiceUrl('/event-resource'),
          headers: { },
          data: {
            description: element.description,
            event: eventId,
            subCategory: element.subCategoryId,
          },
        }
        axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data))
          })
          .catch(function (error) {
            console.log(error)
            this.$swal.fire({
              icon: 'error',
              title: 'Oops... Error al pedir el servicio',
              text: error.response.data.error,
            })
          })
      }
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
  },
}
</script>

<style scoped>
.elements-event {
  display: inherit;
}
</style>
