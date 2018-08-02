<template>
    <div>
        {{$store.state.count}}

        <button @click="add">加</button>
        <button @click="minus">减</button>
    </div>
</template>

<script>
    export default {
        methods: {
            add () {
                this.$store.state.count += 1
                this.$store.commit('increment', 'add')
            },
            minus () {
                this.$store.commit('increment', 'minus')
            }
        }
    }
</script>

<style scoped>

</style>