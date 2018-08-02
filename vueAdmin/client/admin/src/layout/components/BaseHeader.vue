<template>
  <el-header class="base-header">
    <span>王小虎</span>
  </el-header>
</template>

<script>
  export default {
    name: 'BaseHeader'
  }
</script>

<style scoped lang="less">
.base-header {
  position: absolute;
  left: 180px;
  top: 0;
  right: 0;
  height: 50px !important;
  padding: 0 20px;
}
</style>