<template>
  <div class="module props">
      <div class="block header">
        <p class="title">页面编辑</p>
        <p class="state"></p>
      </div>
      <div class="block form">
         <component :is='currentComponent' @change="propsChange" v-bind="this.componentDataMap[this.currentComponentId]"></component>
      </div>
    </div>
</template>

<script>
import utils from '@/utils';
const listManager = utils.listManager.default.getInstance();
export default {
  name: 'propView', 
  components: {},
  data () {
    return {
      currentComponent: null,  //当前组件名称
      utils
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
    }
  },
  watch: {
    'currentComponentId'(newValue, oldValue) {
      this.loadPropTemplate();
    }
  },
  mounted() {
    this.loadPropTemplate();
  },
  methods: {

    /* 动态加载属性模板 */
    loadPropTemplate() {
      const currentComponentData = this.componentDataMap[this.currentComponentId];
      if(currentComponentData){
        import(`./props/property${this.utils.titleCase(currentComponentData.type)}.vue`).then(loadedComponent => {
          this.currentComponent = '';
          this.$nextTick(()=>{  //清除缓存组件以后下一帧处理
            this.currentComponent = loadedComponent.default
          })
        }).catch(e => {
            console.log(e);
        })
      }
    },

    /* 更新组件数据 */
    propsChange(params) {
      this.$store.commit('updateComponent', params);
    }
  }
}
</script>

<style lang="scss" scoped>
 .module{
    margin-right:20px;
  }
  .block{
    margin-bottom:10px;
    background:#fff;
  }
  .props{
    width:346px;
    .block{
      &.header{
        padding:10px;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .title{
          text-indent:10px;
          position:relative;
          &:before{
            content:"";
            position:absolute;
            display:block;
            width:2px;
            height:100%;
            background:#655EFF;
          }
        }
        .state{
          color:#655EFF;
        }
      }
      &.form{
        padding: 30px 20px;
        .slider-wrapper{
          width:100%;
          display:flex;
          justify-content: space-between;
          .el-slider{
            width:66%;
          }
          span{
            margin-right:20px;
          }
        }
      }
      &.button{
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
</style>
