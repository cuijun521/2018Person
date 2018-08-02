<template>
  <div class="home-page">
    <HeaderBar @active="active"/>
    <div ref="content">
      <!-- <HomeContent 
        title="乐纯三三三倍酸奶·经典 135g"
        mTitle="三倍鲜牛奶 · 三倍乳酸菌 · 三倍优质蛋白"
        vipImg="https://m.lechun.cc/images/index/index-vip-sku-pic0.png"
      >
        <div slot="header">
          <img src="https://m.lechun.cc/images/index/index-vip-banner-title.png" />
          <CountDown name="aaaa" class="aaa"  :time="+new Date('2018-6-8 11:18:00')" @timeEnd="timeEnd" />
        </div>
        <ProductList :listData="data1" />
      </HomeContent>

      <HomeContent 
        title="乐纯三三三倍酸奶·家庭装 500g"
        mTitle="全家人都喜欢 · 百搭基础款"
        vipImg="https://m.lechun.cc/images/index/index-vip-sku-pic0.png"
      >
          <ProductList :listData="data2" />
      </HomeContent>

      <HomeContent 
        title="福利社·只选全球尖货"
        mTitle="用最划算的价格 · 买最优质的产品"
      >
        <ProductList :listData="data3" />
      </HomeContent> -->
      <HomeContent 
        v-for="(item, index) in classList" 
        :key="index"
        :title="item.title"
        :mTitle="item.sTitle"
      >
        <template v-if="index == 0">
          <div slot="header">
            <img src="https://m.lechun.cc/images/index/index-vip-banner-title.png" />
            <CountDown name="aaaa" class="aaa"  :time="+new Date('2018-6-8 11:18:00')" @timeEnd="timeEnd" />
          </div>
        </template>
        <ProductList :listData="item.list" />
      </HomeContent>
    </div>
    <FooterBar/>
  </div>
</template>

<script>
  import FooterBar from '@/components/FooterBar';
  import HeaderBar from './components/HeaderBar';
  import HomeContent from './components/HomeContent';
  import ProductList from '@/components/ProductList'
  import CountDown from '@/components/CountDown'

  import {mapState} from 'vuex';
  export default {
    name: "home",
    data() {
      return {
        homeProductList: []
      };
    },
    computed: {
      ...mapState('product',['classList'])
    },
    components: {
      FooterBar,
      HeaderBar,
      HomeContent,
      ProductList,
      CountDown
    },
    methods: {
      active (index) {
        window.scrollTo(0,this.$refs.content.children[index].offsetTop)
      },
      timeEnd () {
        console.log('活动开始')
      }
    }
  };
</script>

<style scoped lang="less">
.home-page {
  padding-top: 0.68rem;
}
.cart-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.1);
    .cart-box {
        position: absolute;
        bottom: 0.5rem;
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        left: 20px;
        right: 20px;
    }
}
</style>
