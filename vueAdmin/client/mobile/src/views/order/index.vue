<template>
    <div>
      <section></section>
      <section>
        <div class="order-products">
          <div
            v-for="(item, index) in cartList"
            :key="index"
            v-if="item.isCheck"
            class="product-item"
          >
            <dl>
              <dt><img :src="item.picture" /></dt>
              <dd>
                <h2>{{item.name}}</h2>
                <p>{{item.describe}}</p>
              </dd>
            </dl>
            <output>
              ￥{{item.price}} x{{item.count}}盒
            </output>
          </div>
        </div>
      </section>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  name: 'order',
  data () {
    return {}
  },
  computed: {
    ...mapState('product', ['cartList'])
  }
}
</script>

<style scoped>

</style>