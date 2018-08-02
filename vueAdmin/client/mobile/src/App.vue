<template>
  <div id="app">
    <Demo />
    <router-view/>
  </div>
</template>

<script>
import '@/static/css/animate.css'

import jsonp from './utils/jsonp'
export default {
  name: 'App',
  created () {
    this.$store.dispatch('product/initProductData')
    this.$store.dispatch('user/get_info')
  }
};
</script>

<style>
@import url(./static/css/reset.css);
</style>
