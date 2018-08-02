import Vue from 'vue';
import Vuex from 'vuex';
import todoList from './module/todoList';
import product from './module/product';
import user from './module/user';

Vue.use(Vuex);

const store = new Vuex.Store(
  {
    state: {
      count: 0,
    },
    getters: {
      price(state) {
        return '￥'+state.count + '.00'
      },
    },
    mutations: {
      increment(state, type) {
        if (type === 'add') {
          state.count++
        } else {
          state.count--
        };
      },
    },
    actions: {
      increment(context, type) {
        setTimeout(() => {
          context.commit('increment', type);
        }, 2000);
      },
    },
    modules: {
      todoList,
      product,
      user,
    },
  },
);

export default store;