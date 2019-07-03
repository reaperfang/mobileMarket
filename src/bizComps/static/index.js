import Vue from 'vue'

//取色器
import vcolorpicker from 'vcolorpicker'
Vue.use(vcolorpicker)

//拖拽
import VueDND from 'awe-dnd';
Vue.use(VueDND)

//打印
import utils from '@/utils'
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
