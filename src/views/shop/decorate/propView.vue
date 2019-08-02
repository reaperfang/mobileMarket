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
      <component v-if="basePropertyShow" :is="'propertyBase'" @change="propsChange" :data="baseInfo"></component>
      <component v-else :is='currentComponent' @change="propsChange" v-bind="this.componentDataMap[this.currentComponentId]"></component>
      <div class="block button">
        <div class="help_blank"></div>
        <div class="buttons">
          <el-button type="primary" @click="saveAndApplyData">保存并生效</el-button>
          <el-button @click="saveData">保    存</el-button>
          <el-button @click="dialogVisible=true; currentDialog='dialogDecoratePreview'">预    览</el-button>
        </div>
      </div>
      <!-- 动态弹窗 -->
      <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
    </div>
</template>

<script>
import utils from '@/utils';
import propertyBase from './props/propertyBase';
import dialogDecoratePreview from '../dialogs/dialogDecoratePreview';
export default {
  name: 'propView', 
  components: {propertyBase, dialogDecoratePreview},
  data () {
    return {
      currentComponent: null,  //当前组件名称
      dialogVisible: false,
      currentDialog: '',
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
      this._routeTo('pageManageIndex');
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

<style lang="scss">
@import './decorate.scss';
  .props{
    width:346px;
    // height: 835px;
    // overflow-y: auto;
    form{
      height: 697px;
      overflow-y: auto;
    }
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
            background:$globalMainColor;
          }
        }
        .state{
          color:$globalMainColor;
        }
      }
      &.form{
        padding: 30px 20px;
      }
      &.button{
        width:346px;
        position:absolute;
        bottom:12px;
        .help_blank{
          height: 10px;
          background: rgb(242,242,249);
          width: 100%;
        }
        .buttons{
          display: flex;
          flex-direction: row;
          justify-content: center;
          background:#fff;
          padding-bottom: 30px;
          margin-top: 30px;
        }
      }
    }
  }
</style>
