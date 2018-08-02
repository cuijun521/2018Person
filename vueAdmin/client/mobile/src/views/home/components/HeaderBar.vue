<template>
  <header class="header-bar">
    <Location class="location"/>
    <nav ref="nav">
        <a href="javascript:;" @click="active(0)" :class="{active: activeIndex == 0}">单盒自选</a>
        <a href="javascript:;" @click="active(1)" :class="{active: activeIndex == 1}">纤巧装</a>
        <a href="javascript:;" @click="active(2)" :class="{active: activeIndex == 2}">家庭装</a>
        <a href="javascript:;" @click="active(3)" :class="{active: activeIndex == 3}">福利社</a>
    </nav>
    <span class="line-bar" :style="{left: barLeft}"></span>
  </header>
</template>

<script>
  import Location from '@/components/Location';
  export default {
    name: "HeaderBar",
    data() {
      return {
        activeIndex: 0,
        barLeft: 0
      };
    },
    components: {
      Location
    },
    watch: {
      activeIndex (newVal) {
        this.$emit('active', newVal)
      }
    },
    methods: {
      active (index) {
        this.activeIndex = index;
        // this.$emit('active', index)
        this.setbarLeft()
      },
      setbarLeft () {
        const navWidth = this.$refs.nav.clientWidth;
        const navItem = this.$refs.nav.children;
        const itemWidth = parseInt(navWidth)/navItem.length
        this.barLeft = itemWidth*this.activeIndex+(itemWidth/2)+'px'
      }
    },
    mounted () {
      this.setbarLeft()
    }
  };
</script>

<style scoped lang="less">
.header-bar {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0.04rem 0.3rem rgba(0, 0, 0, .2);
  z-index: 100;
  nav {
    width: 100%;
    display: flex;
    a {
      flex: 1;
      padding: 10px 0;
      text-align: center;
      &.active {
        color: #f00;
      }
    }
  }
  .location {
    text-align: center;
    padding: 10px 0;
  }
  .line-bar {
    display: block;
    width: 10px;
    height: 2px;
    background: #f00;
    position: absolute;
    bottom: 2px;
    transform: translateX(-50%);
  }
}
</style>
