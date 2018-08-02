import axios from '@/utils/axios';

export default {
  namespaced: true,
  state: {
    info: {}
  },
  getters: {
    
  },
  mutations: {
    SET_INFO (state, info) {
      state.info = info;
    }
  },
  actions: {
    get_info({commit}) {
      axios.get('/api/user/info').then((res) => {
        commit('SET_INFO', res.data);
      });
    },
    login({dispatch},payload) {
      return new Promise((resolve, reject) => {
        axios.post('/api/user/login', {
          code: payload.code,
          mobile: payload.mobile,
        }).then((res) => {
          dispatch('get_info');
          resolve();
        }, () => {
          reject();
        });
      });
    },
  },
}