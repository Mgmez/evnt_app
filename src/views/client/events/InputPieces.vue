<template>
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
      />
      <small class="text-danger">{{ errors[0] }}</small>
    </validation-provider>
  </b-form-group>
</template>

<script>

import { ValidationProvider } from 'vee-validate'
import {
  required, min, between,
} from '@validations'
import {
  BFormGroup,
  BFormInput,
} from 'bootstrap-vue'

export default {
  components: {
    BFormGroup,
    BFormInput,
    ValidationProvider,
  },
  props: {
    elementsNoId: {
      type: Array,
    },
  },
  data() {
    return {
      required,
      min,
      between,
    }
  },
}
</script>
