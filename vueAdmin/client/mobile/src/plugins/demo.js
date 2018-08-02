export default {
  install(Vue, options) {
    Vue.component('Demo', {
      template: '<div>demo的末</div>',
    });
    Vue.prototype.$demo = {
      getdemo() {
        alert('aaaaaaa');
      },
    };
    console.log('asdasdasd', options);
  },
};
