<template> 
  <footer class="footer-bar">
    <nav>
      <router-link tag="a" to="/home">
        <i>
          <img src="../static/images/f-home.png" />
          <img src="../static/images/f-home-on.png" class="on" />
        </i>
        <span>首页</span>
      </router-link>
      <a href="#" class="cart" @click="showCart = true">
        <i>
          <b v-if="cartCount != 0">{{cartCount}}</b>
          <img src="../static/images/f-cart.png" />
        </i>
        <span>购物袋</span>
      </a>
      <router-link tag="a" to="/user">
        <i>
            <img src="../static/images/f-my.png" />
            <img src="../static/images/f-my-on.png" class="on" />
        </i>
        <span>我的</span>
      </router-link>
    </nav>
    <Cart v-show="showCart" @close="showCart = false" ref="showCart" @click.native="cons" />
    <!-- <Cart v-show="showCart" ref="showCart" @click.native="cons" /> -->
  </footer>
</template>
<script>
import Cart from './Cart'
import {mapGetters} from 'vuex'
export default {
  name: "FooterBar",
  //内部的状态
  data() {
    return {
      cartList: [],
      showCart: false
    };
  },
  //接收的数据
  props: {
    title: {
      type: String,
      default: ""
    }
  },
  //计算属性
  computed: {
    ...mapGetters('product',['cartCount'])
  },
  //方法
  methods: {
    // cartCount () {
    //     let num = 0;
    //     this.cartList.forEach((item) => {
    //         num += item.count
    //     })
    //     return num
    // }
    cons () {
      console.log('组件触发dom事件')
    }
  },
  //监听
  watch: {},

  //注册局部组件
  components: {
    Cart
  },

  //组件生命周期
  beforeCreate() {},
  created() {},

  beforeMount() {},
  mounted() {
    console.log(this.$children)
    console.log(this.$refs)

    //都会触发，可能会引起不必要的错误
    bus.$on('close', () => {
      console.log(1)
    })
    bus.$on('close', () => {
      console.log(2)
    })
    bus.$on('close', () => {
      console.log(3)
    })
  },

  beforeUpdate() {},
  updated() {},

  beforeDestroy() {},
  destroyed() {},

  activated() {},
  deactivated() {},

  errorCaptured() {}
};
</script>
<style scoped lang="less">
.footer-bar {
  width: 100%;
  height: 0.5rem;
  background: #fafafa;
  border-top: 1px solid #edebeb;
  position: fixed;
  bottom: 0;
  left: 0;
  nav {
    display: flex;
    a {
      flex: 1;
      height: 0.5rem;
      img {
        display: block;
        width: 0.25rem;
        height: 0.25rem;
        margin: 0 auto;
        &.on {
          display: none;
        }
      }
      i {
        b {
          position: absolute;
          background: #f00;
          border-radius: 100%;
          display: block;
          width: 20px;
          height: 20px;
          top: -20px;
          right: 17px;
          font-size: 12px;
          text-align: center;
          z-index: 10;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #fff;
        }
      }
      span {
        display: block;
        text-align: center;
      }
      &.active {
        img {
          display: none;
        }
        img.on {
          display: block;
        }
      }
      &.cart {
        position: relative;
        img {
          width: 70px;
          height: 70px;
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%); 
        }
        span {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%) scale(0.8); 
        }
      }
    }
  }
}
</style>

