<template>
  <b-card>

    <b-row>

      <!-- User Info: Left col -->
      <b-col
        cols="21"
        xl="6"
        class="d-flex justify-content-between flex-column"
      >
        <!-- User Avatar & Action Buttons -->
        <div class="d-flex justify-content-start">
          <b-avatar
            :src="userData.logo_url"
            :text="avatarText(userData.name)"
            size="154px"
            rounded
          />
          <div class="d-flex flex-column ml-1">
            <div class="mb-1">
              <h4 class="mb-0">
                {{ userData.name }}
              </h4>
              <span class="card-text">{{ userData.description }}</span>
            </div>
            <div
              v-if="isMyProfile"
              class="d-flex flex-wrap"
            >
              <b-button
                :to="{ name: 'provider-update-profile', params: { id: userData.id } }"
                variant="primary"
              >
                Editar
              </b-button>
            </div>
          </div>
        </div>

      </b-col>

      <!-- Right Col: Table -->
      <b-col
        cols="12"
        xl="5"
      >
        <table class="mt-2 mt-xl-0 w-100 info-profile-display">
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="UserIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Nombre</span>
            </th>
            <td class="pb-50">
              {{ userData.name }}
            </td>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="MailIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Email</span>
            </th>
              <a :href="'mailto:' + userData.user.email">
                <td>
                  {{ userData.user.email }}
                </td>
             </a>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="FacebookIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Facebook</span>
            </th>

              <a :href="userData.facebook_url">
                <td class="pb-50 text-capitalize">
                  {{ userData.facebook_url }}
                </td>
             </a>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="InstagramIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Instagram</span>
            </th>
              <a :href="userData.instagram_url">
                <td class="pb-50 text-capitalize">
                  {{ userData.instagram_url }}
                </td>
             </a>
          </tr>
          <tr>
            <th class="pb-50">
              <feather-icon
                icon="PhoneIcon"
                class="mr-75"
              />
              <span class="font-weight-bold">Whatsapp</span>
            </th>
              <a :href="'tel:' + userData.whatspapp_url">
                <td class="pb-50">
                  {{ userData.whatspapp_url }}
                </td>
             </a>
          </tr>
        </table>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BCard, BButton, BAvatar, BRow, BCol,
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BCard, BButton, BRow, BCol, BAvatar,
  },
  props: {
    userData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMyProfile: false,
    }
  },
  setup() {
    return {
      avatarText,
    }
  },
  beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    if (sessionData.data[0].type_id === this.userData.id) {
      this.isMyProfile = true
    }
  },
}
</script>

<style>
@media (max-width: 680px) {
  .row{
    display: block;
  }

  .info-profile-display{
    display: grid;
  }
}
</style>
