<template>
    <div>
        <div>
            <input type="text" v-model="val" @keyup.enter="addTodo" />
        </div>
        <div>
            <h2>未完成({{newList.length}})</h2>
            <ul>
                <li v-for="(item, index) in newList" @click="setType(item.id)" :key="index">{{item.text}}<button @click="removeTodo(item.id)">x</button></li>
            </ul>
            <h2>已完成({{oldList.length}})</h2>
            <ul>
                <li v-for="(item, index) in oldList" :key="index">{{item.text}} <button @click="removeTodo(item.id)">x</button></li>
            </ul>
            <h2>全部</h2>
            <ul>
                <li v-for="(item, index) in list" :key="index">{{item.text}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {mapGetters, mapState, mapMutations} from 'vuex'
    export default {
        data () {
            return {
                val: ''
            }
        },
        computed: {
            ...mapState('todoList', ['list']),
            ...mapGetters('todoList', [
                'listGroup'
            ]),
          newList () {
              return this.listGroup.newList
          },
          oldList () {
              return this.listGroup.oldList
          }
        },
        methods: {
            addTodo () {
                this.$store.commit('todoList/addList', {
                    id: this.$store.state.todoList.list.length,
                    text: this.val,
                    type: 0
                })
            },
            setType (id) {
                this.$store.commit('todoList/setType', {
                    id
                })
            },
            removeTodo (id) {
                this.$store.commit('todoList/removeTodo', {
                    id
                })
            }
        },
        created () {
            console.log(this.$store.getters['todoList/listGroup'])
        }
    }
</script>

<style scoped>

</style>