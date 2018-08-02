import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/views/home';
import Test from '@/views/test';
import TestVuex from '@/views/test/testVuex';
import TodoList from '@/views/test/todoList';
import ProductDetail from '@/views/productDetail';
import User from '@/views/user';
import Login from '@/views/login';
import Order from '@/views/order';
import cookit from '@/utils/cookie';

Vue.use(Router);

const router = new Router({
  mode: 'history', // 模式选择 hash history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  // 配置路由规则
  routes: [
    {
      path: '/', // 路径
      name: '', // 路由名称
      redirect: '/home', // 路由重定向
    },
    {
      path: '/home',
      name: 'home',
      component: Home, // 路由对应需要渲染的组件， 组件会渲染到页面中router-view组件对应的位置
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
    },
    {
      path: '/testVuex',
      name: 'testVuex',
      component: TestVuex,
    },
    {
      path: '/todoList',
      name: 'todoList',
      component: TodoList,
    },
    {
      path: '/product_detail/:id',
      name: 'ProductDetail',
      component: ProductDetail,
    },
    {
      path: '/user',
      name: 'User',
      component: User,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
    }
  ],
});

// 路由拦截，也叫导航守卫，或路由的生命周期函数  beforeEach 路由跳转前的回调，需要调用next才能继续渲染
router.beforeEach((to, from, next) => {
  const isLoginArr = ['User', 'ProductDetail'];
  if (isLoginArr.indexOf(to.name) !== -1) {
    console.log(document.cookie)
    if (cookit.get('token')) {
      next();
    } else {
      next({
        name: 'Login',
        query: {
          callbackUrl: to.path,
        },
      });
    }
  } else {
    next();
  }
});
router.afterEach((to, from) => {
  console.log(to, from, '完成');
});

export default router;

/**
 * vue路由的规则
 * 实例化vue-router传入一个配置对象
 * 配置对象
 * routers: [
 *    {
 *       path: '路由路径',
 *       component:  路由对应的组件,
 *       children: [
 *          如果使用二级路由的话需要在一级路由里面定义router-view
 *       ]
 *    }
 * ]
 *
 * vue-router会将路由路径对应的组件渲染到页面中对应的router-view所在位置
 *
 * mode: 'history || hash'   两种路由模式   #/path:是hash    /path：是history
 *
 * 组件的划分：
 * 路由组件（容器组件）：路由对应的组件，用作路由渲染，主要就是在里面通过组合不同的展示组件，已经业务组件组合成一个页面
 * 展示组件：纯用作UI展示的组件，不涉及到任何逻辑操作，大部分可以复用
 * 业务组件：针对不同的业务需求做的不同的逻辑操作，
 *
 * 路由传参：
 * 两种形式params， query
 * params 传递的参数和路由连在一块
 *    定义： /path/path/:paramsName/:paramsName/path/:paramsName
 *    打开的url： /path/path/1/1/path/1  值是包含在路径中
 *    传递：(组件式，编程式)
 *        第一种方式： /path/path/1/1/path/1直接写路径
 *        第二种方式： router-link组件中to属性（或者$router里面的push方法）的值是一个对象的话  {name:'路由名称', params: {paramsName:1,...}}
 *    所以params的试用场景是
 *       参数个数必须是已知的
 *       只能传递简单的参数值，简单字符串，数字
 *       传递少量的数据
 * query就是url的正常参数传递  url?参数=值&参数=值&.....
 *      参数个数没有限制
 *      在组件内部通过$route.query获取
 * 
 * 
 * $route是路由信息对象，$router是路由实例，  $route使用$router里面一个熟悉的映射
 * 
 * 
 * 有一个列表，点击列表跳转到详情，如何传参，使用params传递id
 * 在详情页面有两个按钮上一篇，下一篇，如何实现？
 * 通过ajax的形式根据当前id，在详情页面获取上一个id以及下一个的id
 * 如果我的列表是通过筛选条件筛选出来的，可以多传递一个参数原本的列表筛选条件
 * 因为条件是不固定的可能会有可能不会有，所以使用query传参，因为params传参的就是固定的必须传要不然匹配不了路由
 * 
 * 在vue路由中如果只是路由参数发生变化，路由对应的组件不会重新渲染
 * 
 * 组件内的守卫只能是定义在当前路由对应的路由组件中
 * beforeRouteEnter  进入当前路由的时候
 * beforeRouteUpdate  改变当前路由参数的时候  类似于watch 里面的  $route监听
 * beforeRouteLeave   离开当前路由的时候
 * 
 */
