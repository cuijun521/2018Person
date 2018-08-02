<template>
  <div class="product-list">
    <ProductItem v-for="(item, index) in listData" :key="index" :productInfo="item" />
  </div>
</template>
<script>
import ProductItem from './ProductItem';
export default {
    props: {
        listData: {
            type: Array,
            default () {
                return []
            }
        }
    },
    components: {
        ProductItem
    }
}
</script>
<style scoped lang="less">
.product-list {
    display: flex;
    flex-wrap: wrap;
    .product-item {
        width: 50%;
    }
}
</style>
