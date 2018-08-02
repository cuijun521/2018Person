import Indicator from '@/components/Indicator';

export default {
  install(Vue) {
    Vue.prototype.$loading = {
      component: '',
      init() {
        const LoadingVm = Vue.extend(Indicator);
        const LoadingComponent = new LoadingVm();
        this.component = LoadingComponent.$mount();
        document.body.appendChild(LoadingComponent.$el);
      },
      show() {
        if (this.component) {
          this.component.show();
        } else {
          this.init();
          this.component.show();
        }
      },
      hide() {
        this.component.hide();
      },
    };
    Vue.prototype.$error = {
      show(text) {
        console.log(text);
        setTimeout(() => {
          console.log('关闭错误');
        }, 2000);
      },
    };
  },
};
