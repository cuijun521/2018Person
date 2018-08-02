<template>
  <transition 
    enter-active-class="animated fadeIn" 
    leave-active-class="animated fadeOut"
    @before-enter="isShow"
    @before-leave="isShow"
  >
  <div class="cart-wrap" @click="close">
    <transition enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
    <div class="cart-box" @click.stop v-show="showBox">
      <div class="product-box">
        <div v-for="(item, key, index) in cartList" :key="index" class="product-list">
          <span><CheckBox name="checkItem" :value="item.isCheck" @input="checkItem(arguments[0], item.id)" /></span>
          <div >
            <dl>
              <dt><img :src="item.picture" /></dt>
              <dd>
                <h2>{{item.name}}</h2>
                <p>{{item.describe}}</p>
                <b>{{item.price}}</b>
              </dd>
            </dl>
            <CartBtn :productInfo="item" />
          </div>
        </div>
      </div>
      <div class="tool">
        <div class="">
          <span><CheckBox name="checkAll" v-model="checkAll" @click.native="checkAllFn" />全选（{{checkCount}}）</span>
          <span>运费：0</span>
        </div>
        <output>实付：￥{{countPrice}}</output>
        <router-link to="/order" tag="button">下单</router-link>
      </div>
    </div>
    </transition>
  </div>
  </transition>
</template>

<script>
  import FooterBar from './FooterBar.vue';
  import CartBtn from './CartBtn';
  import CheckBox from './CheckBox'
  import {mapState} from 'vuex';

  export default {
    name: "home",
    data () {
      return {
        checkAll: this.isCheckAll,
        showBox: false
      }
    },
    computed: {
      cartList () {
        return this.$store.state.product.cartList
      },
      isCheckAll () {
        return this.$store.getters['product/isCheckAll']
      },
      checkCount () {
        return this.$store.getters['product/checkCount']
      },
      countPrice () {
        return Math.round( this.$store.getters['product/countPrice'] )
      }
    },
    created () {
      this.checkAll = this.isCheckAll
    },
    watch: {
      isCheckAll (newVal) {
        console.log(newVal)
        this.checkAll = newVal
      }
    },
    props:['closeFn'],
    components: {
      FooterBar,
      CartBtn,
      CheckBox
    },
    methods: {
      close () {
        console.log('关闭', this.$parent)
        this.$emit('close')
        bus.$emit('close')
      },
      checkItem (isCheck, id) {
        console.log(isCheck, id)
        this.$store.commit('product/setIsCheck', {id, isCheck})
      },
      checkAllFn () {
        this.$store.commit('product/setCheckAll', !this.checkAll)
      },
      isShow () {
        this.showBox = !this.showBox
      }
    }
  };
</script>

<style scoped lang="less">
.cart-wrap {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0,0,0,0.1);
    z-index: 100;
    .cart-box {
        position: absolute;
        bottom: 10px;
        background: #fff;
        border-radius: 5px;
        left: 10px;
        right: 10px;
        .product-box {
          .product-list {
            display: flex;
            padding: 10px 0;
            & > span {
              width: 0.3rem;
            }
            & > div {
              flex: 1;
              display: flex;
              dl {
                flex: 1;
                display: flex;
                dt {
                  width: 0.5rem;
                  height: 0.5rem;
                  display: block;
                  img {
                    display: block;
                    width: 100%;
                    height: 100%;
                  }
                }
                dd {
                  h2 {
                    font-size: 12px;
                  }
                  p {
                    font-size: 12px;
                    color: #999;
                  }
                }
              }
              & > div {
                width: 80px;
              }
            }
          }
        }
        .tool {
          width: 100%;
          display: flex;
          padding: 10px;
          box-sizing: border-box;
          div {
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-right: 10px;
            span {
              display: block;
            }
          }
          output {
            flex: 1;
            line-height: 40px;
            color: #f00;
            display: block;
          }
          button {
            width: 100px;
            background: #f00;
            display: block;
            line-height: 40px;
            color: #fff;
            text-align: center;
            border: 0;
          }
        }
    }
}

.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: all 2s;
}
.fade-leave-active {
  transition: all 2s;
}
.fade-leave-to {
  opacity: 0;
}
</style>
