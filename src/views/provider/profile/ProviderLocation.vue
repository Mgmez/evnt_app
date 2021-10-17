<template>
  <b-card-code title="Direccion del proveedor">
    <small v-if="isMyProfile">Arrastra el icono a tu ubicacion</small>
    <l-map
      :zoom="zoom"
      :center="center"
    >
      <l-tile-layer :url="url" />
      <l-marker
        v-if="isMyProfile"
        :lat-lng="markerLatLng"
        :draggable="true"
        @mouseleave="alert"
      >
        <l-popup>You're here!</l-popup>
      </l-marker>
    </l-map>
    <b-button
      v-if="isMyProfile"
      variant="primary"
      @click="updatePosition"
    >
      Actualizar ubicacion
    </b-button>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  LMap, LTileLayer, LMarker, LPopup,
} from 'vue2-leaflet'
import {
  BButton,
} from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import code from './code'
// eslint-disable-next-line no-underscore-dangle
delete Icon.Default.prototype._getIconUrl
Icon.Default.mergeOptions({
  // eslint-disable-next-line global-require
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  // eslint-disable-next-line global-require
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  // eslint-disable-next-line global-require
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
})
export default {
  components: {
    LMap,
    LTileLayer,
    LPopup,
    LMarker,
    BCardCode,
    BButton,
  },
  props: {
    latitude: {
      type: Number,
      required: true,
    },
    altitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 15,
      center: [this.latitude, this.longitude],
      markerLatLng: [this.latitude, this.longitude, { draggable: 'true' }],
      code,
      isMyProfile: false,
    }
  },
  beforeMount() {
    console.log('sadidasji')
    console.log(this.latitude)
    console.log(this.altitude)
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData.data[0].type_id === this.userId) {
      this.isMyProfile = true
    }
    if (this.latitude === null || this.altitude === null) {
      navigator.geolocation.getCurrentPosition(this.createCurrentPosition)
    }
  },
  methods: {
    alert(e) {
      console.log(e)
      this.latitude = e.latlng.lat
      this.longitude = e.latlng.lng
    },
    createCurrentPosition(pos) {
      console.log('pos')
      console.log(pos)
      this.latitude = pos.coords.latitude
      this.altitude = pos.coords.altitude
      this.longitude = pos.coords.longitude
      this.center = [pos.coords.latitude, pos.coords.longitude]
      this.markerLatLng = [pos.coords.latitude, pos.coords.longitude, { draggable: 'true' }]
    },
    updatePosition() {
      console.log('this.center')
      console.log(this.center)
      console.log(this.markerLatLng)
      const config = {
        method: 'patch',
        url: buildServiceUrl(`/provider/${this.userId}`),
        headers: { },
        data: {
          latitude: this.latitude === null ? 0.0 : this.latitude,
          altitude: this.altitude === null ? 0.0 : this.altitude,
          longitude: this.longitude === null ? 0.0 : this.longitude,
        },
      }

      axios(config)
        .then(response => {
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          console.log(error)
        })
    },
  },
}
</script>

<style lang="scss">
.vue2leaflet-map{
  &.leaflet-container{
    height: 350px;
  }
}
</style>
