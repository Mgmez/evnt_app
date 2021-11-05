<template>
  <b-card-code title="Imagenes de la empresa">
    <b-carousel
      id="carousel-example-generic"
      controls
      indicators
    >
      <b-carousel-slide
        v-for="image_url in imagesUrl"
        :key="image_url"
        :img-src="image_url"
      />
    </b-carousel>

  </b-card-code>
</template>

<script>
import { BCarousel, BCarouselSlide } from 'bootstrap-vue'
import BCardCode from '@core/components/b-card-code'

export default {
  components: {
    BCardCode,
    BCarousel,
    BCarouselSlide,
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
    }
  },
}
</script>
<style>
.img-fluid {
  height: 500px !important;
}

.carousel-example-generic{
  height: 500px !important;
}

@media (max-width: 480px) {
  .img-fluid {
    height: 300px !important;
  }

  .carousel-example-generic{
    height: 300px !important;
  }
}

</style>
