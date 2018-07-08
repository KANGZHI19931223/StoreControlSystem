import Vue from 'vue';
import Router from 'vue-router';
// 引入登录组件
import Login from '@/views/login';

Vue.use(Router);

export default new Router({
  routes: [
    // 配置login路由
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
});
