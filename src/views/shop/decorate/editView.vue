<template>
  <div class="module view" :style="{backgroundColor: baseInfo&&baseInfo.pageBackground}">
    <div class="phone-head" @click="clickTitle(null)" title="点击编辑页面信息">
      <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt="">
      <span>{{baseInfo.pageTitle || '页面标题'}}</span>
    </div>
    <div class="phone-body" @click="clickTitle($event)">
       <vuedraggable 
        class="drag-wrap"
        :list='componentDataIds'
        :group='{
            name: "group"
        }'
        v-bind="dragOptions"
        @start="drag=true"
        @end="onEndHandler"
        :disabled='disable'
        :move='onMoveHandler'>
          <div 
          class="component_wrapper" 
          v-for="(item, key) of componentDataIds"
          :key="key" 
          :class="{'actived': item === currentComponentId}"
          @click="selectComponent(item)" 
          @dragstart.self="selectItem = item" 
          @dragend.self="selectItem = {}">
            <component v-if="allTemplateLoaded" :is='templateList[getComponentData(item).type]' :key="key" :data="getComponentData(item)"></component>
            {{getComponentData(item).title}}组件
            <i class="delete_btn" @click.stop="deleteComponent(item)" title="移除此组件"></i>
          </div>
    </vuedraggable>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import widget from '@/system/constant/widget';
import vuedraggable from "vuedraggable";
export default {
  name: 'editView',
  components: {vuedraggable},
  data () {
    return {
      utils,
      dragOptions: {
          animation: 300,
          group: "description",
          ghostClass: "ghost"
      },
      drag: false,
      disable: false,
      selectItem: {},
      allTemplateLoaded: false,  //所有模板加载结束
      templateList: {}  //模板对象列表
    }
  },
  computed:{
    currentComponentId() {
      return this.$store.getters.currentComponentId;
    },
    componentDataIds() {
      return this.$store.getters.componentDataIds;
    },
    componentDataMap() {
      return this.$store.getters.componentDataMap;
    },
    baseInfo() {
      return this.$store.getters.baseInfo;
    }
  },
  created() {
    this.loadTemplateLists();
  },
  methods: {

    /* 获取组件数据 */
    getComponentData(id) {
      return this.componentDataMap[id];
    },

    //加载模板列表
    loadTemplateLists() {
      let loadedLength = 0;
      const widgetList = widget.getWidgetList();
      for(let item of widgetList) {
        import(`./comps/component${this.utils.titleCase(item)}.vue`).then(loadedComponent => {
          this.templateList[item] = loadedComponent.default;
          loadedLength ++;
          if(loadedLength >= widgetList.length) {
            this.allTemplateLoaded = true;
          }
        }).catch(e => {
          console.log(e);
          loadedLength ++;
          if(loadedLength >= widgetList.length) {
            this.allTemplateLoaded = true;
          }
        })
      }
    },

    //选中此组件
    selectComponent(id) {
      this.$store.commit('setCurrentComponentId', id);
    },

    //删除组件
    deleteComponent(id) {
      this.$store.commit('deleteComponent', id)
    },

    onMoveHandler(evt, originalEvent) {
        // const { relatedContext } = evt;
        // const comp = relatedContext.element;
        // if(!comp) return;
        // if(comp.container) {
        //     this.disable = true;
        // } else {
        //     this.disable = false;
        // }
    },

    onEndHandler() {
        this.drag = false;
        this.disable = false;
    },

    clickTitle(event) {
      if(!event || (event.target.className.indexOf('phone-head') > -1 || event.target.className.indexOf('phone-body') > -1)) {
       this.$store.commit('setCurrentComponentId', '');
       this.$store.commit('showBaseProperty');
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import './decorate.scss';
 .view {
    width: 374px;
    .phone-head {
      width: 100%;
      height: 64px;
      text-align: center;
      line-height: 64px;
      background: #fff;
      position:relative;
      cursor:pointer;
      img{
        width:100%;
      }
      span{
        position:absolute;
        top:50%;
        left:50%;
        transform:translate(-50%,-40%);
        font-size:18px;
      }
    }
    .phone-body {
      height: 775px;
      overflow-y: auto;
      .component_wrapper{
        background:#fff;
        min-height:50px;
        line-height:50px;
        position:relative;
        border:1px solid #eee;
        border-bottom:none;
        cursor:pointer;
        &.actived{
          border:2px dashed $globalMainColor;
        }
        i{
          width:20px;
          height:20px;
          border-radius:50%;
          background:url('../../../assets/images/shop/editor/delete.png') no-repeat 0 0;
          position:absolute;
          top:0;
          right:0;
          cursor:pointer;
        }
      }
    }
  }
</style>
