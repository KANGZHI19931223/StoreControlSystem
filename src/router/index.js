import Vue from 'vue';
import Router from 'vue-router';
// 引入登录组件
import Login from '@/views/login';
// 引入home组件
import Home from '@/views/home';
// 引入home的子组件users
import Users from '@/views/users/list';
// 引入home的子组件rights
import Rights from '@/views/rights/rights';
// 引入home的子组件roles
import Roles from '@/views/rights/Roles';
// 引入categories
import Categories from '@/views/goods/categories';
// 引入商品列表组件
import GoodsList from '@/views/goods/List';

import { Message } from 'element-ui';

Vue.use(Router);

const router = new Router({
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
        },
        // 配置权限列表路由
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        // 配置角色列表路由
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        // 配置商品分类路由
        {
          name: 'categories',
          path: '/categories',
          component: Categories
        },
        // 配置商品列表路由
        {
          name: 'goodslist',
          path: '/goods',
          component: GoodsList
        }
      ]
    }
  ]
});
// 设置路由的前置守卫
router.beforeEach((to, from, next) => {
  if (to.name === 'login') {
    next();
  } else {
    // 获取token
    const token = sessionStorage.getItem('token');
    if (!token) {
      router.push({name: 'login'});
      Message.warning('请登录后访问');
      return;
    }
    next();
  }
});
export default router;
