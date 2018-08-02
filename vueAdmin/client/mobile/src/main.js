// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import store from './store';
import directives from './directive';
import demo from './plugins/demo';
import prompt from './plugins/prompt';

Vue.config.productionTip = false;
Vue.prototype.$axios = axios;
window.bus = new Vue();

Vue.use(demo, {
  aaa: 'aasdas'
});
Vue.use(prompt);

for (let key in directives) {
  Vue.directive(key, directives[key]);
};

/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app', // 挂载
  router, // 路由
  store, //状态
  components: { App }, // 注册局部组件
  template: '<App/>', // 设置模板
});
/**
 * vue实例
 * el: 用作dom挂载  可以使用$mount代替
 * router: 用作挂载router实例
 * components: 注册局部组件
 * template: 根组件对应的模板
 * 生命周期，函数，监听，计算属性，data:{}
 * //
 * 在组件内部可以使用$root获取根实例
 */
