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

//瀑布流
import waterfall from 'vue-waterfall2'   //插件文档  https://github.com/AwesomeDevin/vue-waterfall2/blob/master/CHINESE-README.md
Vue.use(waterfall)
