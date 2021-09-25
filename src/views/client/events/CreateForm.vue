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
                Añadir elemento
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
              Submit
            </b-button>
            <b-button
              v-ripple.400="'rgba(186, 191, 199, 0.15)'"
              type="reset"
              variant="outline-secondary"
            >
              Reset
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
        value: '',
        quantity: 0,
      })
    },
    getInitialData() {
      axios.get(buildServiceUrl('/sub-category?page=1&limit=15'))
        .then(res => {
          console.log(res.data.items)
          this.elements = res.data.items
          this.elementsNoId = res.data.items.map(e => e.name)
          console.log(this.elementsNoId)
        })
        .catch(err => {
          console.log(err)
        })
    },
    validationForm() {
      this.$refs.eventForm.validate().then(success => {
        if (success) {
        // eslint-disable-next-line
          alert('form submitted!')
        }
      })
    },
    getSelectedCategory(id, val) {
      this.elementsComponent.find(e => e.id === id).value = val
    },
    getSelectedPieces(id, val) {
      this.elementsComponent.find(e => e.id === id).quantity = val
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
