<template>
    <div class="time-box" name="刘宇">
        <template v-for="(item, index) in timeArr"><!--包裹元素，不会被渲染到页面-->
            <span  :key="index">{{item}}</span>
            <b :key="index+12" v-if="index < timeArr.length - 1">:</b>
        </template>
    </div>
</template>
<script>
export default {
    props: {
        // 到期日期
        time: {
            type: Number,
            default: ''
        }
    },
    data () {
        return {
            interval: '',
            surplusTime: ''
        }
    },
    watch: {
      surplusTime (newVal, oldVal) {
          if (newVal <= 0) {
              this.$emit('timeEnd')
              clearTimeout(this.interval)
          }
      }  
    },
    mounted () {
        this.setTime()
    },
    methods: {
        setTime () {
            this.surplusTime = this.time - (+new Date())
            this.surplusTime = this.surplusTime <= 0 ? 0 : this.surplusTime
            if (this.surplusTime > 0) {
                this.interval = setTimeout(() => {
                    this.setTime()
                }, 1000);
            }
        }
    },
    computed: {
        timeArr () {
            const hour = parseInt(this.surplusTime / (60*1000*60));
            const minutes = parseInt( (this.surplusTime - (60*1000*60*hour)) / (60*1000) );

            const seconds = parseInt( (this.surplusTime - ((60*1000*60*hour) + minutes*60*1000)) / 1000 );

            return [
                hour < 10 ? '0'+hour : hour, 
                minutes < 10 ? '0'+minutes : minutes, 
                seconds < 10 ? '0'+seconds : seconds
            ]
        }
    }
}
</script>
<style lang="less">
.time-box {
    span {
        display: inline-block;
        padding: 5px;
        border: 1px solid #fff;
        margin: 0 5px;
        color: #fff;
        border-radius: 3px;
    }
}
</style>
