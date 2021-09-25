<template>
  <b-row :id="idx">
    <b-col
      cols="6"
    >
      <b-form-group
        label="Solicitando"
        label-for="categories"
      >
        <validation-provider
          #default="{ errors }"
          rules="required"
          name="Elemento"
        >
          <v-select
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="title"
            :options="elementsNoId"
            @input="sendCategory(idx, $event)"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    </b-col>
    <b-col
      cols="5"
    >
      <b-form-group
        label="Piezas"
        label-for="pieces"
      >
        <validation-provider
          #default="{ errors }"
          rules="required|min:1|between:0,100000"
          name="Numero de piezas"
        >
          <b-form-input
            label="pieces"
            type="number"
            placeholder="Ej 1"
            min="1"
            step="1"
            @input="sendPieces(idx, $event)"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    </b-col>
    <b-col
      cols="1"
    >
      <b-button
        class="btn btn-danger"
        @click="removeElement(idx)"
      >
        Borrar
      </b-button>
    </b-col>
  </b-row>
</template>

<script>

import { ValidationProvider } from 'vee-validate'
import {
  required, min, between,
} from '@validations'
import {
  BFormGroup,
  BFormInput,
  BRow,
  BCol,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BFormGroup,
    ValidationProvider,
    BFormInput,
    vSelect,
    BRow,
    BCol,
    BButton,
  },
  props: {
    elementsNoId: {
      type: Array,
    },
    idx: {
      type: String,
    },
    sendCategory: {
      type: Function,
    },
    sendPieces: {
      type: Function,
    },
    removeElement: {
      type: Function,
    },
  },
  data() {
    return {
      required,
      between,
      min,
    }
  },
}
</script>
