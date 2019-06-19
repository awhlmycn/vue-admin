// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'		   //默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题

Vue.config.productionTip = false
Vue.use( ElementUI );

import world from '../static/js/world.js';
import * as http from './api/index.js';
import lele from '../static/js/lele.js';
Vue.prototype.$world = world;
Vue.prototype.$lele = lele;
Vue.prototype.$http = http;

//使用钩子函数对路由进行权限跳转
router.beforeEach( ( to, from, next ) => {
    const role = world.storage.getItem( 'username' );
    if( !role && to.path !== '/login' ) {
        next('/login');
    }
    else{
        next();
    }
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


/*
	1. 使用 echarts : https://www.jb51.net/article/128790.htm

 */