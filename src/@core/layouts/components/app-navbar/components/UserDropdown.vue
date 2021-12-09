<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          {{ userData.fullName || userData.username }}
        </p>
        <span class="user-status">{{ userData.role }}</span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <b-dropdown-item
      link-class="d-flex align-items-center"
    >
      <span style="font-size: 10px">{{ userData.data[0].role }} {{ userName }}</span>
    </b-dropdown-item>
    <b-dropdown-item
      v-if="isProvider()"
      :to="{ name: 'provider-profile', params: {id: userData.data[0].type_id}}"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Perfil</span>
    </b-dropdown-item>
    <b-dropdown-item
      :to="{ name: 'pages-account-setting' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="SettingsIcon"
        class="mr-50"
      />
      <span>Configuracion</span>
    </b-dropdown-item>
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="logout"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Salir</span>
    </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'
import axios from 'axios'
import { buildServiceUrl } from '@/constants/urls'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      userName: '',
      avatarText,
    }
  },
  beforeMount() {
    if (this.isProvider()) {
      axios.get(buildServiceUrl(`/provider/${this.userData.data[0].type_id}`))
        .then(res => {
          this.userName = res.data.name
        })
        .catch(err => console.log(err))
    } else {
      axios.get(buildServiceUrl(`/customer/${this.userData.data[0].type_id}`))
        .then(res => {
          this.userName = `${res.data.firstName} ${res.data.lastName}`
        })
        .catch(err => console.log(err))
    }
  },
  methods: {
    isProvider() {
      if (this.userData.data[0].role.match('(P|p)ro.*')) {
        return true
      }
      return false
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
  },
}
</script>
