<template>
    <div>
        {{$store.state.count}}
        <Box1 />
        <Box2 />
    </div>
</template>
<script>
import Box1 from './components/countBox1'
import Box2 from './components/countBox2'
export default {
    name: 'VuexTest',
    components: {
        Box1,
        Box2
    }
}
</script>
