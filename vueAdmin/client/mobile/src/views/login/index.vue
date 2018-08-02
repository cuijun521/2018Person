<template>
    <div class="login-page">
        <h1>登录</h1>
        <section v-show="!showCode">
            <h2>手机号</h2>
            <div class="form-box">
                <div>
                    <input type="tel" name="phone" v-model="phone" />
                    <a href="javascript:;" class="close" @click="clear" v-show="phone.length >= 1">X</a>
                </div>
                <button @click="get_code" :disabled="isDisabled">获取验证码</button>
            </div>
        </section>

        <section v-show="showCode">
            <h2>请输入验证码</h2>
            <p>6位短信验证码已发送至 <b>{{phone}}</b></p>
            <div class="form-box">
                <div class="code-content">
                    <ul class="code-split-list">
                        <li v-for="(item, index) in codeArr" :key="index" :class="{active: index<=code.length && isFocus}">
                            <div class="height"></div>
                            <span>{{code.charAt(index)}}</span>
                        </li>
                    </ul>
                    <input type="number" v-model="code" @focus="isFocus = true" @blur="isFocus = false" />
                </div>
                <button @click="login_do" :disabled="!(code.length >= 6)">登录</button>
            </div>
        </section>
        
    </div>
</template>
<script>
export default {
    name: 'Login',
    data () {
        return {
            phone: '',
            code: '',
            codeArr: ['','','','','',''],
            isFocus: false,
            showCode: false
        }
    },
    computed: {
        isDisabled () {
            var reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;
            return !reg.test(this.phone)
        }
    },
    watch: {
        code (newVal) {
            if (newVal.length >= 6) {
                this.login_do()
            }
        }
    },
    methods: {
        login_do () {
            console.log('登录')
            this.$store.dispatch('user/login', {
                code: this.code,
                mobile: this.phone
            }).then(() => {
                const url = this.$route.query.callbackUrl
                if (url) {
                    this.$router.replace(url)
                } else {
                    this.$router.replace('/user')
                }
            })
            
        },
        get_code () {
            this.$axios.get('/api/user/msmcode', {
                params: {
                    mobile: this.phone
                }
            }).then((res) => {
                console.log(res.data)
                this.showCode = true
            })
            // 
        },
        clear () {
            this.phone = ''
        }
    }
}
</script>
<style scoped lang="less">
.login-page {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(top, #ff3c61, #ff594c 95%);
    h1 {
        font-size: 24px;
        color: #fff;
        padding: 20px;
    }
    section {
        padding: 20px;
        h2 {
            font-size: 14px;
            color: #fff;
        }
        input {
            display: block;
            width: 100%;
            height: 40px;
            border: 0;
            border-bottom: 1px solid rgba(255,255,255,0.6);
            background: none;
            outline: none;
            font-size: 24px;
            color: #fff;
        }
        button {
            width: 100%;
            height: 40px;
            display: block;
            border-radius: 40px;
            border: 0;
            margin-top: 20px;
            color: #f00;
            background:#fff;
            &:disabled {
                background: rgba(255,255,255,0.5);
            }
        }
    }
    .code-split-list {
        display: flex;
        width: 100%;
        li {
            border: 1px solid rgba(255, 255, 255, 0.5);
            flex: 1;
            margin: 5px;
            position: relative;
            .height {
                margin-top: 100%;
            }
            span {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                color: #fff;
            }
            &.active{
                border: 1px solid #fff;
            }
        }
    }
    .code-content {
        position: relative;
        input {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            // transform: scale(0);
            opacity: 0;
        }
    }
}
</style>


