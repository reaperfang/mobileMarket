<template>
  <div class="module view">
    <div class="phone-head">
      <img :src="require('@/assets/images/shop/phone-head.png')" alt="">
    </div>
    <div class="phone-body">
       <vuedraggable 
        class="drag-wrap"
        :list='componentList'
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
          v-for="(item, key) of componentList" 
          @click="selectComponent(item)" 
          @dragstart.self="selectItem = item" 
          @dragend.self="selectItem = {}">
            <component :is='item' :key="key"></component>
            {{item.title}}
            <i class="delete-btn" @click.stop="deleteComponent(item)" title="移除此组件"></i>
          </div>
    </vuedraggable>
    </div>
  </div>
</template>

<script>
import utils from '@/utils';
import vuedraggable from "vuedraggable";
export default {
  name: 'editView',
  components: {vuedraggable},
  data () {
    return {
      utils,
      dragOptions: {
          animation: 200,
          group: "description",
          ghostClass: "ghost"
      },
      drag: false,
      disable: false,
      selectItem: {},
    }
  },
  computed:{
    currentComponentName() {
      return this.$store.getters.currentComponentName;
    },
    componentList() {
      return this.$store.getters.componentList;
    }
  },
  watch: {
    componentList: {
      handler(newValue) {
        console.log(newValue);
      },
      deep: true
    }
  },
  created() {

  },
  methods: {

    /* 动态加载组件模板 */
    loadCompTemplate() {
      import(`./comps/component${this.utils.titleCase(this.currentComponentName)}.vue`).then(loadedComponent => {
        this.currentComponent = loadedComponent.default
      }).catch(e => {
          console.log(e);
      })
    },

    //选中此组件
    selectComponent(component) {
      this.$store.commit('setCurrentComponentName', component.type);
    },

    //删除组件
    deleteComponent(component) {
      this.$store.commit('deleteComponent', component)
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
        console.log(this.componentList);
    }
  }
}
</script>

<style lang="scss" scoped>
 .module{
    margin-right:20px;
 }
 .view {
    width: 374px;
    border: 1px solid #e2e1e1;
    .phone-head {
      width: 100%;
      height: 64px;
      text-align: center;
      line-height: 64px;
      background: #fff;
      img{
        width:100%;
      }
    }
    .phone-body {
      .component_wrapper{
        background:#fff;
        min-height:50px;
        line-height:50px;
        border:1px solid #d6d6d6;
        text-align:center;
        position:relative;
        cursor:pointer;
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
