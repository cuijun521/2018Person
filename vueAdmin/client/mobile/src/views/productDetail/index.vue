<template>
    <div>
        {{detailInfo}}adasd
        {{$route.params}}
        
        <div v-markdown="str"></div>
        <button @click="prev()">上一篇</button>
        <button @click="next()">下一篇</button>
        <ProductList :listData="list" />
    </div>
</template>
<script>
import ProductList from '@/components/ProductList'
import {mapState} from 'vuex'
export default {
    name: 'ProductDetail',
    data () {
        return {
            str: `
[![npm version](https://badge.fury.io/js/mark-js.svg)](https://badge.fury.io/js/mark-js)
[![Build Status](https://travis-ci.org/henry-luo/mark.svg?branch=master)](https://travis-ci.org/henry-luo/mark)
[![codecov](https://codecov.io/gh/henry-luo/mark/branch/master/graph/badge.svg)](https://codecov.io/gh/henry-luo/mark)
[![Analytics](https://ga-beacon.appspot.com/UA-114747922-1/readme.md)](https://github.com/henry-luo/mark)

*Objective Markup Notation*, abbreviated as Mark Notation or just **Mark**, is a new unified notation for both object and markup data. The notation is a superset of what can be represented by JSON, HTML and XML, but overcomes many limitations these popular data formats, yet still having a very clean syntax and simple data model.

- It has **clean syntax** with **fully-type** data model *(like JSON or even better)*
- It is **generic** and **extensible** *(like XML or even better)*
- It has built-in **mixed content** support *(like HTML5 or even better)*
- It supports **high-order** composition *(like S-expressions or even better)*
`,
            detailInfo: {}
        }
    },
    components: {
        ProductList
    },
    computed: {
        ...mapState('product', ['list'])
    },
    created () {
        console.log('页面打开')
        this.getDetail()
    },
    watch: {
        '$route' () {
            console.log('改变')
            this.getDetail()
        }
    },
    methods: {
        prev () {
            this.$router.push(`/product_detail/${this.$route.params.id-1}`)
        },
        next () {
            this.$router.push(`/product_detail/${this.$route.params.id+1}`)
        },
        getDetail () {
            this.$store.dispatch('product/getDetail', this.$route.params.id).then((data) => {
                console.log(data)
                this.detailInfo = data
            })
        }
    }
}
</script>

