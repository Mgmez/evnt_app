<template>
  <b-tabs
    vertical
    content-class="col-12 col-md-9 mt-1 mt-md-0"
    pills
    nav-wrapper-class="col-md-3 col-12"
    nav-class="nav-left"
  >

    <!-- general tab -->
    <b-tab
      v-if="role==='Customer'"
      active
    >

      <!-- title -->
      <template
        #title
      >
        <feather-icon
          icon="UserIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">General</span>
      </template>

      <account-setting-general
        v-if="options"
        :general-data="options"
      />
    </b-tab>
    <!--/ general tab -->

    <!-- change password tab -->
    <b-tab>

      <!-- title -->
      <template #title>
        <feather-icon
          icon="LockIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Change Password</span>
      </template>

      <account-setting-password />
    </b-tab>
    <!--/ change password tab -->

    <!-- social links -->
    <b-tab
      v-if="role === 'Provider'"
    >

      <!-- title -->
      <template
        #title
      >
        <feather-icon
          icon="LinkIcon"
          size="18"
          class="mr-50"
        />
        <span class="font-weight-bold">Social</span>
      </template>

      <account-setting-social
        v-if="options"
        :social-data="options"
      />
    </b-tab>

  </b-tabs>
</template>

<script>
import { BTabs, BTab } from 'bootstrap-vue'
import { buildServiceUrl } from '@/constants/urls'
import axios from 'axios'
import AccountSettingGeneral from './AccountSettingGeneral.vue'
import AccountSettingPassword from './AccountSettingPassword.vue'
import AccountSettingSocial from './AccountSettingSocial.vue'

export default {
  components: {
    BTabs,
    BTab,
    AccountSettingGeneral,
    AccountSettingPassword,
    AccountSettingSocial,
  },
  data() {
    return {
      options: {},
      role: '',
    }
  },
  beforeMount() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    const { role } = sessionData.data[0]
    this.role = role
  },
  async beforeCreate() {
    const sessionData = JSON.parse(localStorage.getItem('userData'))
    const typeId = sessionData.data[0].type_id
    const { role } = sessionData.data[0]
    this.role = role
    if (role === 'Customer') {
      await axios.get(buildServiceUrl(`/customer/${typeId}`)).then(res => {
        this.options = {
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          birthdayDate: res.data.birthdayDate,
        }
      })
    } else if (role === 'Provider') {
      await axios.get(buildServiceUrl(`/provider/${typeId}`)).then(res => {
        this.options = res.data
      })
    }
  },
}
</script>
