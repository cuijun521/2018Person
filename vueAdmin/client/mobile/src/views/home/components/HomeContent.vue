<template>
    <div class="home-content">
        <header v-if="title">
            <slot name="header"></slot>
            <div :style="{position: 'relative'}">
                <div class="content">
                    <h2>{{title}}</h2>
                    <h5>{{mTitle}}</h5>
                    <img v-if="vipImg" :src="vipImg" class="vip-img" />
                </div>
                <div class="height"></div>
            </div>
        </header>
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
  export default {
    name: "HomeContent",
    props: {
        title: {
            type: String,
            default: ''
        },
        mTitle: {
            type: String,
            default: ''
        },
        vipImg: {
            type: String,
            default: ''
        }
    },
    mounted () {
        console.log(this.$slots)
    }
  };
</script>

<style scoped lang="less">
.home-content {
    width: 100%;
    & > header {
        display: flex;
        flex-direction: column;
        .height {
            margin-top: 29%;
        }
        background: linear-gradient(left, #ed1525, #ff3c61 49%, #ff594c 95%);
        text-align: center;
        position: relative;
        & > div > .content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            bottom: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        h2 {
            text-align: center;
            color: #fff;
            line-height: 30px;
        }
        h5 {
            display: inline-block;
            border: 1px solid rgba(255, 255, 255, .6);
            color: rgba(255, 255, 255, .6);
            font-size: 0.12rem;
            padding: 5px;
        }
        .vip-img {
            position: absolute;
            width: 30%;
            display: block;
            left: 50%;
            bottom: 0;
            transform: translate(-50%, 30%)
        }
    }
}
</style>
