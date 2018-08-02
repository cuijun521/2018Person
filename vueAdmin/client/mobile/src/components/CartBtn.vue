<template>
    <div>
        <template v-if="count == 0">
            <button @click.stop.prevent="add">加入购物车</button>
        </template>
        <template v-else>
            <button @click.stop.prevent="minus">-</button>
            <output>{{count}}</output>
            <button @click.stop.prevent="add">+</button>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            productInfo: {
                type: Object,
                default () {
                    return {}
                }
            }
        },
        computed: {
            count () {
                const cartItem = this.$store.state.product.cartList[this.productInfo.id];
                if (cartItem) {
                    return cartItem.count
                } else {
                    return 0
                }
                
            }

        },
        methods: {
            add () {
                this.$store.commit('product/addProduct', this.productInfo)
                // this.count += 1
                console.log(this.$store.state.product)
            },
            minus () {
                this.$store.commit('product/minusProduct', this.productInfo.id)
                // this.count -= 1
            }
        }
    }
</script>

<style scoped>

</style>