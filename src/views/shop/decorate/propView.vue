<template>
  <div class="module props">
      <div class="block header">
        <p class="title" v-if="this.componentDataMap[this.currentComponentId]">
          {{this.componentDataMap[this.currentComponentId].title}}
        </p>
        <p class="title" v-else>
          {{panelName}}
        </p>
      </div>
      <transition name="fade" :duration="{ enter: 200, leave: 100 }">
        <component v-if="basePropertyShow" :is="propertyDefault" @change="propsChange" :data="baseInfo" key="base"></component>
        <component v-else :is='currentComponent' @change="propsChange" v-bind="this.componentDataMap[this.currentComponentId]" key="components"></component>
      </transition>
      <div class="block button" v-loading="loading">
        <div class="help_blank"></div>
        <div class="buttons">
          <el-button type="primary" @click="saveAndApplyData.call(parentScope)">保存并生效</el-button>
          <el-button @click="saveData.call(parentScope)">保    存</el-button>
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
import propertyClassify from './props/propertyClassify';
import dialogDecoratePreview from '../dialogs/dialogDecoratePreview';
export default {
  name: 'propView', 
  components: {propertyBase, propertyClassify, dialogDecoratePreview},
  props: ['panelName', 'editorType', 'saveData', 'saveAndApplyData', 'parentScope'],
  data () {
    return {
      currentComponent: null,  //当前组件名称
      dialogVisible: false,
      currentDialog: '',
      utils,
      currentPageId: this.$route.query.pageId,
      loading: false,
      propertyBase: ''   //基础组件名称
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
  created() {
    switch(this.editorType) {
      case 'propertyBase':
        this.propertyDefault = 'propertyBase';
        break;
      case 'propertyClassify':
        this.propertyDefault = 'propertyClassify';
        break;
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
  &.props{
    width:346px;
    form{
      height: 697px;
    }
    .block{
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
}
</style>
