import axios from '@/utils/axios';

export default {
  namespaced: true,
  state: {
    list: [], // 所有商品数据
    classList: [], // 首页分类数据
    cartList: {}, // 购物车数据
  },
  getters: {
    cartCount(state) {
      let count = 0;
      for (let key in state.cartList) {
        count += state.cartList[key].count;
      };
      window.localStorage.setItem('cartList', JSON.stringify(state.cartList));
      return count;
    },
    checkCount(state) {
      let count = 0;
      for (let key in state.cartList) {
        if (state.cartList[key].isCheck) {
          count += state.cartList[key].count;
        }
      };
      return count;
    },
    isCheckAll(state) {
      let check = true;
      for (let key in state.cartList) {
        if (!state.cartList[key].isCheck) {
          check = false;
        }
      };
      console.log(check, 'getters')
      window.localStorage.setItem('cartList', JSON.stringify(state.cartList));
      return check;
    },
    countPrice(state) {
      let price = 0;
      for (let key in state.cartList) {
        if (state.cartList[key].isCheck) {
          price += state.cartList[key].price * state.cartList[key].count;
        }
      };
      return price;
    }
  },
  mutations: {
    setList(state, list) {
      state.list = list;
    },
    setClassList(state, list) {
      state.classList = list;
    },
    setCartList(state, list) {
      state.cartList = list;
    },
    addProduct(state, item) {
      if (state.cartList[item.id]) {
        state.cartList[item.id].count += 1
      } else {
        this._vm.$set(state.cartList, item.id, item);
        this._vm.$set(state.cartList[item.id], 'count', 1);
        this._vm.$set(state.cartList[item.id], 'isCheck', true);
      }
    },
    minusProduct(state, id) {
      state.cartList[id].count -= 1;
      if (state.cartList[id].count < 1) {
        delete state.cartList[id];
        state.cartList = Object.assign({}, state.cartList);
      }
    },
    setIsCheck(state, payload) {
      this._vm.$set(state.cartList[payload.id], 'isCheck', payload.isCheck);
    },
    setCheckAll(state, isCheckAll) {
      for (let key in state.cartList) {
        this._vm.$set(state.cartList[key], 'isCheck', isCheckAll);
      };
    },
  },
  actions: {
    initProductData({
      commit,
    }) {
      axios.get('/api/product/index-product-list').then((res) => {
        commit('setClassList', res.data);
      });
      axios.get('/api/product/list').then((res) => {
        commit('setList', res.data);
      });
      const cartList = JSON.parse(window.localStorage.getItem('cartList'));
      if (cartList) {
        commit('setCartList', cartList);
      }
    },
    getDetail(context, id) {
      return new Promise((resolve, reject) => {
        axios.get('/api/product/detail', {
          params: {
            id: id
          }
        }).then((res) => {
          resolve(res.data);
        });
      });
    },
  },
};
