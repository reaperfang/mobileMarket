/* 基础模块 */
import "babel-polyfill" //引入IE浏览器兼容垫片
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import utils from '@/utils';
Object.keys(utils).forEach(key => {
  Vue.filter(key, utils[key])
})


/* 兼容性处理 */
require('es6-promise').Promise
import Promise from 'promise-polyfill'
if (!window.Promise) {
  window.Promise = Promise
}
import 'babel-polyfill';
Vue.config.productionTip = false


/* 第三方 */
import './thirdParty' 

/* 自定义全局变量或方法挂载 */
Vue.prototype.$routeTo = utils.routeTo; //示例  routeTo('login', {a:1, b:2})
Vue.prototype.$percent = utils.percent;
Vue.prototype.$globalEvent = utils.eventHub.default;  //挂载全局事件对象，跨组件发通知,单例对象
import api from '@/api';
Vue.prototype.$api = api;
import '@/assets/icons'


/* 自定义公共模块 */
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import '@/styles/index.scss' // global css
import '@/system/permission' // permission control


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
