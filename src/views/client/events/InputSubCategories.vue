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
        label="Que requieres?"
        label-for="pieces"
      >
        <validation-provider
          #default="{ errors }"
          name="Descripcion"
        >
          <b-form-textarea
            label="pieces"
            placeholder="5 horas de mariachi"
            @input="sendPieces(idx, $event)"
          />
          <small class="text-danger">{{ errors[0] }}</small>
        </validation-provider>
      </b-form-group>
    </b-col>
    <b-col
      cols="1"
      style="margin-top:35px;"
    >
      <b-button
        class="btn btn-danger"
        @click="removeElement(idx)"
      >
        X
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
  BFormTextarea,
  BRow,
  BCol,
  BButton,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

export default {
  components: {
    BFormGroup,
    ValidationProvider,
    BFormTextarea,
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
