<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">

      <!-- Bookmarks Container -->
      <bookmarks />
    </div>

    <b-navbar-nav
      v-if="isLoggedIn"
      class="nav align-items-center ml-auto"
    >
      <locale />
      <dark-Toggler class="d-none d-lg-block" />
      <search-bar class="search" />
      <search-bar-mobile class="search-mobile" />
      <cart-dropdown />
      <user-dropdown />
    </b-navbar-nav>
    <b-navbar-nav
      v-else
      class="nav align-items-center ml-auto"
    >
      <search-bar class="search" />
      <search-bar-mobile class="search-mobile" />
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="secondary"
        :to="{ name: 'auth-register-v1' }"
      >
        Registrate
      </b-button>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="primary"
        :to="{ name: 'auth-login' }"
      >
        Inicia sesion
      </b-button>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BButton,
} from 'bootstrap-vue'
import { isUserLoggedIn } from '@/auth/utils'
import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
import UserDropdown from './components/UserDropdown.vue'
import SearchBarMobile from './components/SearchBarMobile.vue'

export default {
  components: {
    BLink,

    // Navbar Components
    BNavbarNav,
    SearchBar,
    DarkToggler,
    UserDropdown,
    SearchBarMobile,
    BButton,
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      isLoggedIn: false,
    }
  },
  beforeMount() {
    this.isLoggedIn = isUserLoggedIn()
  },
}
</script>

<style lang="scss" scoped>

.search-mobile{
  display: none;
}

@media (max-width: 480px) {
  .search-mobile {
    display: initial;
  }

  .search{
    display: none;
  }
}

</style>
