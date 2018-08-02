export default { 
  namespaced: 'todo',
  state: {
    list: []
  },
  getters: {
    listGroup (state) {
      const list = {
        oldList: state.list.filter((item) => item.type == 1),
        newList: state.list.filter((item) => item.type == 0)
      }
      return list
    }
  },
  mutations: {
    addList(state, payload) {
      state.list.push(payload);
    },
    setType(state, payload) {
      state.list.forEach(item => {
        if(item.id === payload.id){
          item.type = 1;
        };
      });
    },
    removeTodo (state, payload) {
      state.list = state.list.filter(item => {
        return item.id != payload.id
      });
    }
  }
};
