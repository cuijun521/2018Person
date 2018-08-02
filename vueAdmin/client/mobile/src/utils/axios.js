import axios from 'axios';
// 请求前
axios.interceptors.request.use((config) => {
  if (!config.noLoading) {
    vm.$loading.show();
  }
  return config;
}, (error) => {
  vm.$loading.hide();
  return Promise.reject(error);
});
// 请求后
axios.interceptors.response.use((response) => {
  vm.$loading.hide();
  return response;
}, (error) => {
  if (error.message.indexOf('50') != -1) {
    vm.$error.show('服务器异常');
  } else {
    vm.$error.show(error.message);
  }
  vm.$loading.hide();
  return Promise.reject(error);
});

export default axios;
