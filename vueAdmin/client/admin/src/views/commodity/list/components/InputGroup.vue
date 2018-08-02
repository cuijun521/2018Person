<template>
  <div class="input-group">
    <div class="group-content">
      <p v-for="(item,index) in list" :key="index">
          <el-input size="mini" v-model="item.label"></el-input>
          <el-input size="mini" v-model="item.value"></el-input>
          <a href="javascript:;" v-show="list.length >= 2" @click="removeItem(index)"><i class="el-icon-close"></i></a>
      </p>
    </div>
    <el-button @click="addGroup">添加规格</el-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: [
          {
            label: '',
            value: ''
          }
        ]
      }
    },
    props: {
      value: String
    },
    created () {
      if (this.value != '') {
        this.list = JSON.parse(this.value)
      }
      this.watchList();
      
    },
    watch: {
      list () {
        console.log('aaa')
      }
    },
    methods: {
      addGroup () {
        this.list.push({
          label: '',
          value: ''
        });
        this.watchList();
      },
      watchList () {
        this.list.forEach((item) => {
          this.$watch(() => {
            return item.label + item.value
          }, (newVal) => {
            const emitVal = this.list.map((item, index) => {
              return {
                label: item.label,
                value: item.value
              }
            })
            this.$emit('input', JSON.stringify(emitVal))
          })
        })
      },
      removeItem (index) {
        this.list.splice(index, 1)
      }
    }
  }
</script>

<style scoped lang="less">
.input-group {
  .group-content {
    p {
      display: flex;
    }
  }
}
</style>