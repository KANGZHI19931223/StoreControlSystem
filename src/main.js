// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import MyAxios from './plugins/MyAxios';
// import MyFilter from '@/plugins/MyFilter';
// 引入自定义面包屑组件
import MyBreadcrumb from '@/components/MyBreadcrumb';

import 'element-ui/lib/theme-chalk/index.css';
// 导入自定义index.css文件
import '@/assets/css/index.css';
// 引入moment包
import moment from 'moment';

// 全局注册面包屑组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb);

Vue.use(ElementUI);

Vue.use(MyAxios);

Vue.config.productionTip = false;
// 下面这行注释意思是将其后面的代码不进行eslint检测
/* eslint-disable no-new */
// 全局设置格式化日期过滤器
Vue.filter('fmtDate', (value, fmtString) => {
  return moment(value).format(fmtString);
});
// MyFilter.install = (Vue) => {
//   Vue.prototype.$filter = MyFilter;
// };
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
