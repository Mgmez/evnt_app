<template>
  <b-card-code title="Direccion del proveedor">
    <h6
      v-if="isMyProfile"
      class="text-primary"
    >Arrastra el icono a tu ubicacion</h6>

    <b-form-input
      v-if="isMyProfile"
      id="pac-input"
      class="controls"
      type="text"
      placeholder="Busca tu direccion"
    />
    <div
      id="map"
      style="width: 100%; height: 500px"
    />
    <b-button-group>
      <b-button
        v-if="isMyProfile"
        variant="primary"
        @click="updatePosition"
      >
        Actualizar ubicacion
      </b-button>
      <b-button
        v-if="isMyProfile"
        variant="secundary"
        @click="getMyCurrentPosition"
      >
        Obtener mi ubicacion
      </b-button>
    </b-button-group>
  </b-card-code>
</template>

<script>
import BCardCode from '@core/components/b-card-code/BCardCode.vue'
import {
  BButton,
  BButtonGroup,
  BFormInput,
} from 'bootstrap-vue'
import 'leaflet/dist/leaflet.css'
import { Icon } from 'leaflet'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'
import { Loader } from '@googlemaps/js-api-loader'
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
    BCardCode,
    BButton,
    BButtonGroup,
    BFormInput,
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
      center: [Number(this.latitude), Number(this.longitude)],
      code,
      isMyProfile: false,
      myLat: this.latitude,
      myLong: this.longitude,
    }
  },
  beforeMount() {
    console.log('sadasdas')
    console.log(this.myLat)
    console.log(this.myLong)
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData.data[0].type_id === this.userId) {
      this.isMyProfile = true
    }
    if (this.myLat === null || this.myLong === null || this.myLat === 0 || this.myLong === 0) {
      navigator.geolocation.getCurrentPosition(this.createCurrentPosition, this.showError)
    }
  },
  mounted() {
    this.initMap()
  },
  methods: {
    alert(e) {
      console.log(e)
      this.myLat = e.latlng.lat
      this.myLong = e.latlng.lng
    },
    createCurrentPosition(pos) {
      console.log(pos)
      this.myLat = pos.coords.latitude
      this.myLong = pos.coords.longitude
      this.center = [pos.coords.latitude, pos.coords.longitude]
      this.markerLatLng = [pos.coords.latitude, pos.coords.longitude, { draggable: 'true' }]
      this.initMap()
    },
    async initMap() {
      console.log('object')
      const loader = new Loader({
        apiKey: 'AIzaSyAkp6YqJgpYVe2iDsTuXMxkfCNwzFSUOwk',
        version: 'weekly',
        libraries: ['places'],
      })
      const input = document.getElementById('pac-input')
      const google = await loader.load()
      // eslint-disable-next-line no-unused-vars
      const map = new google.maps.Map(document.getElementById('map'), {
        center: new google.maps.LatLng(this.myLat, this.myLong),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 17,
      })

      const searchBox = new google.maps.places.SearchBox(input)

      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input)
      // Bias the SearchBox results towards current map's viewport.
      map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds())
      })

      /**
       * NOTA
       * myMarker solo si el usuario tiene ubicacion guarda en la base de datos
       */
      let myMarker = new google.maps.Marker({
        position: new google.maps.LatLng(this.myLat, this.myLong),
        draggable: this.isMyProfile,
      })
      console.log('myMarker')
      console.log(myMarker)

      google.maps.event.addListener(myMarker, 'dragend', evt => {
        this.myLat = evt.latLng.lat()
        this.myLong = evt.latLng.lng()
        console.log('change')
        map.panTo(evt.latLng)
      })
      map.setCenter(myMarker.position)
      myMarker.setMap(map)

      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', () => {
        const places = searchBox.getPlaces()
        console.log('places')
        console.log(places)

        if (places.length === 0) {
          return
        }

        // For each place, get the icon, name and location.
        const bounds = new google.maps.LatLngBounds()
        const place = places[0]
        this.myLat = place.geometry.location.lat()
        this.myLong = place.geometry.location.lng()

        myMarker = new google.maps.Marker({
          position: new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng()),
          draggable: this.isMyProfile,
          title: place.name,
        })
        google.maps.event.addListener(myMarker, 'dragend', evt => {
          this.myLat = evt.latLng.lat()
          this.myLong = evt.latLng.lng()
          map.panTo(evt.latLng)
        })

        // myMarker.position = new google.maps.LatLng(place.geometry.location.lat(), place.geometry.location.lng())
        // myMarker.title = place.name

        map.panTo(place.geometry.location)
        map.setCenter(myMarker.position)
        myMarker.setMap(map)
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport)
        } else {
          bounds.extend(place.geometry.location)
        }
        map.fitBounds(bounds)
      })
    },
    async getMyCurrentPosition() {
      navigator.geolocation.getCurrentPosition(this.createCurrentPosition, this.showError)
    },
    showError() {
      this.$swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error al obtener tu ubicacion, verifica las preferencias de tu navegador. Tambien puedes actualizar tu ubicacion moviendo el cursor del mapa',
      })
    },
    updatePosition() {
      const config = {
        method: 'patch',
        url: buildServiceUrl(`/provider/${this.userId}`),
        headers: { },
        data: {
          latitude: this.myLat === null ? 0.0 : this.myLat,
          altitude: this.altitude === null ? 0.0 : this.altitude,
          longitude: this.myLong === null ? 0.0 : this.myLong,
        },
      }

      axios(config)
        .then(response => {
          this.$swal.fire({
            icon: 'info',
            title: 'Actualizado',
            text: 'Tu ubicacion ha sido actualizada',
          })
          console.log(JSON.stringify(response.data))
        })
        .catch(error => {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al actualizar la localizacion',
          })
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

#map {
  height: 100%;
}
</style>
