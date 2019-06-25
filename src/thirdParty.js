import Vue from 'vue'

/* 第三方UI框架导入 */
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


/* 第三方工具库导入 */
import Cookies from 'js-cookie'
Vue.use(Element, {
  size: Cookies.get('size') || 'small', // set element-ui default size
})
import qs from 'qs';
Vue.prototype.$qs = qs;
import vueJsonp from 'vue-jsonp';  //使用jsonp
Vue.use(vueJsonp);

/* 第三方组件库导入 */

//取色器
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

//拖拽
import VueDND from 'awe-dnd';
Vue.use(VueDND)

//打印
import utils from './utils'
Vue.use(utils.print) // 注册

//省市区县四级联动
import { pcaa } from 'area-data-vue';
import 'area-linkage-vue/dist/index.css';
import AreaLinkageVue from 'area-linkage-vue';
Vue.use(AreaLinkageVue)
Vue.prototype.$pcaa = pcaa;



//时间轴
import LightTimeline from 'vue-light-timeline';
Vue.use(LightTimeline);
