<template>
  <el-container class="admin-wrap">
    <BaseMenu :routes="routes" />
    <el-container>
      <BaseHeader />
      <el-main class="content">
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import BaseHeader from './components/BaseHeader'
import BaseMenu from './components/BaseMenu'
export default {
  components: {
    BaseHeader,
    BaseMenu
  },
  computed: {
    routes () {
      return this.$router.options.routes[0].children
    }
  },
  mounted () {
    console.log(this.routes)
  }
}
</script>

<style lang="less">
body,html,#app,.el-container {
  height: 100%;
}
.admin-wrap {
  min-height: 100%;
  .content {
    margin-left: 180px;
    background: #f7f7f7;
    padding-top: 50px;
    min-height: 100%;
  }
}
</style>