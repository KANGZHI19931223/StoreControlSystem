import Vue from 'vue';
import Router from 'vue-router';
// 引入登录组件
import Login from '@/views/login';
// 引入home组件
import Home from '@/views/home';
// 引入home的子组件users
import Users from '@/views/users/list';

Vue.use(Router);

export default new Router({
  routes: [
    // 配置login路由
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    // 配置home路由
    {
      name: 'home',
      path: '/',
      component: Home,
      // 配置home的子路由
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        }
      ]
    }
  ]
});
