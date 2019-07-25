<template>
  <div class="module props">
      <div class="block header">
        <p class="title" v-if="this.componentDataMap[this.currentComponentId]">
          {{this.componentDataMap[this.currentComponentId].title}}
        </p>
        <p class="title" v-else>
          页面信息
        </p>
      </div>
      <div class="block form">
         <component v-if="basePropertyShow" :is="'propertyBase'" @change="propsChange" :data="baseInfo"></component>
         <component v-else :is='currentComponent' @change="propsChange" v-bind="this.componentDataMap[this.currentComponentId]"></component>
      </div>
      <div class="block button">
        <el-button type="primary" @click="saveAndApplyData">保存并生效</el-button>
        <el-button @click="saveData">保    存</el-button>
        <el-button @click="_routeTo('preview')">预    览</el-button>
      </div>
    </div>
</template>

<script>
import utils from '@/utils';
import propertyBase from './props/propertyBase';
const listManager = utils.listManager.default.getInstance();
export default {
  name: 'propView', 
  components: {propertyBase},
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
    },
    basePropertyShow() {
      return this.$store.getters.basePropertyShow;
    },
    baseInfo() {
      return this.$store.getters.baseInfo;
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
    },
    
    /* 保存数据 */
    saveData() {
      const resultData = this.collectData();
      console.log(JSON.stringify({...resultData}));
    },

    /* 保存并生效数据 */
    saveAndApplyData() {
      const resultData = this.collectData();
      console.log(JSON.stringify({...resultData}));
    },

    /* 收集数据 */
    collectData() {
      let result = {};
      result['pageInfo'] = this.baseInfo;
      result['components'] = [];
      for(let item of this.componentDataIds) {
        const componentData = this.componentDataMap[item];
        if(componentData) {
          result.components.push(componentData);
        }
      }
      return result;
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
    height: 835px;
    overflow-y: auto;
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
