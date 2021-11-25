<template>
  <p class="clearfix mb-0  mt-0 align-items-center" >
    <span class="brand-logo">
      <b-img
        :src="appLogoFooter"
        alt="logo"
        class="footer-logo"
      />
    </span>
  </p>
</template>

<script>

import { $themeConfig } from '@themeConfig'
import { BImg } from 'bootstrap-vue'

export default {
  components: {
    BImg,
  },
  // eslint-disable-next-line no-unused-vars
  setup(props) {
    const { appName, appLogoFooter } = $themeConfig.app

    return {
      appName,
      appLogoFooter,
    }
  },
}
</script>
<style lang="scss">
img{
  height: 50px;
}
p{
  text-align: center !important;
  height: 50px;
}

footer{
  height: 50px;
}

.footer-logo{
  padding-bottom: 10px;
  width: 300px;
}
</style>
