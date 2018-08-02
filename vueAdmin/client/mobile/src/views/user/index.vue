<template>
    <div>
        我的
        {{info}}
        <FooterBar/>
    </div>
</template>
<script>
import FooterBar from '@/components/FooterBar';
import {mapState} from 'vuex';

export default {
    name: 'User',
    components: {
        FooterBar
    },
    computed: {
        ...mapState('user',['info'])
    }
}
</script>

