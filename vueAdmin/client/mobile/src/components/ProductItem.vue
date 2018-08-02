<template>
  <router-link :to="{name: 'ProductDetail', params: {id: productInfo.id}}" class="product-item">
    <div class="info">
        <img :src="productInfo.picture" />
        <hgroup>
            <h2>{{productInfo.name}}</h2>
            <p>{{productInfo.describe}}</p>
        </hgroup>
    </div>
    <div class="tool">
        <b class="price">{{productInfo.price}}</b>
        <div>
            <CartBtn :productInfo="productInfo" />
        </div>
    </div>
  </router-link>
</template>
<script>
import CartBtn from './CartBtn';
export default {
    props: {
        productInfo: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    components: {
        CartBtn
    }
}
</script>
<style scoped lang="less">
.product-item{
    width: 100%;
    img {
        display: block;
        width: 100%;
    }
    hgroup {
        padding: 0 10px;
        h2 {
            font-size: 14px;
            font-weight: normal;
        }
        p {
            font-size: 12px;
            color: #ccc;
            line-height: 2;
        }
    }
    .tool {
        display: flex;
        padding: 0 10px;
        padding-bottom: 20px;
        .price {
            color: #f00;
        }
    }
}
</style>
