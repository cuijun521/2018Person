import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: () => import('@/layout/base.layout'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'Home',
          meta: {
            title: '系统首页',
          },
          component: () => import('@/views/home'),
        },
        {
          path: '/commodity',
          name: 'Commodity',
          meta: {
            title: '商品管理',
          },
          component: () => import('@/views/commodity'),
          children: [
            {
              path: 'list',
              name: 'CommodityList',
              component: () => import('@/views/commodity/list'),
              meta: {
                title: '商品列表',
              },
            },
          ],
        },
      ],
    },
    {
      path: '/user',
      component: () => import('@/layout/user.layout'),
      children: [
        {
          path: 'login',
          component: () => import('@/views/login'),
          meta: {
            title: '登陆',
          },
        },
      ],
    },
  ],
});
