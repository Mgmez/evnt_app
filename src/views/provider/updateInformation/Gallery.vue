<template>
  <section class="section">
    <b-row class="row">
      <!-- img overlay -->
      <b-col
        v-for="element in imagesCarrousel"
        :key="element"
        md="6"
        xl="3"
        class="col"
      >
        <b-card
          :id="element"
          :key="element"
          :img-src="element"
          :img-fluid="true"
          overlay
          text-variant="white"
          img-alt="card img"
          body-class="bg-overlay"
          class="card"
        >
          <b-col
            class="row"
            md="6"
          >
            <b-card-body
              class="h-100 d-flex flex-column"
              style="margin-top:100px"
            >
              <b-button
                class="mt-auto"
                href="#"
                variant="danger"
                @click="onDelete(element)"
              >
                X
              </b-button>
            </b-card-body>

          </b-col>
        </b-card>
      </b-col>
    </b-row>

    <b-col>
      <b-col
        cols="12"
        class="col"
      />
      <b-button
        variant="primary"
        @click="$refs.refInputEl.click()"
      >
        <input
          ref="refInputEl"
          type="file"
          class="d-none"
          @change="uploadImage"
        >
        <span class="d-none d-sm-inline">Subir imagen para carrusel</span>
        <feather-icon
          icon="EditIcon"
          class="d-inline d-sm-none"
        />
      </b-button>
    </b-col>
  </section>
</template>

<script>
import {
  BRow, BCol, BCard, BButton, BCardBody,
} from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'
import router from '@/router'
import store from '@/store'
import { onUnmounted } from '@vue/composition-api'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
    BCardBody,
  },
  props: {
    imagesUrl: {
      type: Array,
      default: () => [],
      required: true,
    },
  },
  data() {
    return {
      imagesCarrousel: [],
    }
  },
  beforeMount() {
    this.imagesCarrousel = this.imagesUrl
  },
  mounted() {
  },
  setup() {
    const USER_APP_STORE_MODULE_NAME = 'app-user'
    onUnmounted(() => {
      if (store.hasModule(USER_APP_STORE_MODULE_NAME)) store.unregisterModule(USER_APP_STORE_MODULE_NAME)
    })
  },
  methods: {

    uploadImage(event) {
      const file = event.target.files[0]
      const fd = new FormData()
      fd.append('file', file)

      axios.post(buildServiceUrl('/media/image'), fd)
        .then(response => {
          console.log(response.data.link)
          this.imagesCarrousel.push(response.data.link)
          this.onUpdate(this.imagesCarrousel)
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al subir imagen, porfavor intente de nuevo o mande una imagen mas pequeña',
          })
          console.log(error)
        })
    },
    onDelete(imageURL) {
      const newImages = this.imagesCarrousel.filter(e => e !== imageURL)
      this.imagesCarrousel = newImages
      this.onUpdate(newImages)
    },
    onUpdate(images) {
      const config = {
        method: 'patch',
        url: buildServiceUrl(`/provider/${router.currentRoute.params.id}`),
        headers: { },
        data: {
          images_url: images,
        },
      }

      axios(config)
        .then(response => {
          console.log('RESPONSE FROM UPDATE')
          console.log(response)
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al actualizar imagen de carrusel, porfavor intente de nuevo o mande una imagen mas pequeña',
          })
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.card {
  text-align: center;
  display: inline-table;
  cursor: pointer;
}
.card-title {
  margin-top: 30%;
}
#card-images{
  text-align: center;
}
.card-img {
  width: 300px !important;
  height: 200px !important;
  max-width: 300px !important;
  max-height: 25% !important;
  display: block;
}
#filterName {
  margin-bottom: 20px;
  max-width: fit-content;
}
.section {
  text-align: -webkit-center;
}
.col{
  max-width: fit-content;
}
.row{
  display: inline-flex;
}
</style>
