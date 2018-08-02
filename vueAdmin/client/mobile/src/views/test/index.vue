<template>
    <div>
        <nav>
            <a href="javascript:;" @click="componentName = 'component1'">标签一</a>
            <a href="javascript:;" @click="componentName = 'component2'">标签二</a>
            <a href="javascript:;" @click="componentName = 'component3'">标签三</a>
        </nav>
        <div>
            <keep-alive>
                <component :is="componentName"></component>
            </keep-alive>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            componentName: 'component1'
        }
    },
    components: {
        component1: {
            template: "<div><input type='text' /></div>"
        },
        component2: {
            template: "<div>qweqweqweqweqwe</div>"
        },
        component3: {
            template: "<div>+-*/+*/-+-*/*-</div>"
        }
    },
    mounted () {
        console.log(this.$route, this.$router)
    }
}
</script>

