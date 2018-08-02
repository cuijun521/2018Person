<template>
    <div>
        {{price}} </br>
        {{count}} </br>
        {{count100}} </br>
        {{price2}}

        <button @click="add">加</button>
        <button @click="minus">减</button>
    </div>
</template>

<script>
    import {mapState, mapGetters, mapMutations} from 'vuex';
    export default {
        data () {
            return {
                price: this.$store.getters.price
            }
        },
        computed: {
            // price2 () {
            //     return this.$store.getters.price
            // },
            ...mapGetters({
                price2: 'price'
            }),
            ...mapState(['count']),
            ...mapState({
                'count100': 'count'
            })
        },
        methods: {
            ...mapMutations({
                add: (commit) => {
                    commit('increment', 'add')
                },
                minus: (commit) => {
                    commit('increment', 'minus')
                }
            }),
            // add () {
            //     //this.$store.state.count += 1
            //     this.$store.dispatch('increment', 'add')
            // },
            // minus () {
            //     this.$store.dispatch('increment', 'minus')
            // }
        }
    }
</script>

<style scoped>

</style>