<template>
  <div class="module props">
      <div class="block header">
        <p class="title" v-if="this.componentDataMap[this.currentComponentId]">
          {{this.componentDataMap[this.currentComponentId].title}}
        </p>
        <p class="title" v-else>
          编辑
        </p>
      </div>
      <transition name="fade" :duration="{ enter: 200, leave: 100 }">
        <component :is='currentComponent' @change="propsChange" v-bind="this.componentDataMap[this.currentComponentId]" key="components"></component>
      </transition>
      <div class="block button" v-loading="loading">
        <div class="help_blank"></div>
        <div class="buttons">
          <el-button @click="resetData.call(parentScope)" v-if="resetData">重   置</el-button>
          <el-button @click="saveData.call(parentScope)" type="primary">{{id ? '保   存' : '创   建'}}</el-button>
          <el-button type="primary" @click="saveAndApplyData.call(parentScope)" v-if="saveAndApplyData && id">保存并生效</el-button>
          <el-button @click="dialogVisible=true; currentDialog='dialogDecoratePreview'">预    览</el-button>
          <el-button @click="saveToTemplate.call(parentScope)" v-if="saveToTemplate">保存到模板</el-button>
        </div>
      </div>
      <!-- 动态弹窗 -->
      <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible" :homePageData="homePageData"></component>
    </div>
</template>

<script>
import utils from '@/utils';
import dialogDecoratePreview from '@/views/shop/dialogs/dialogDecoratePreview';
export default {
  name: 'propView', 
  components: {dialogDecoratePreview},
  props: ['saveData', 'saveAndApplyData', 'resetData', 'saveToTemplate', 'parentScope', 'homePageData'],
  data () {
    return {
      currentComponent: null,  //当前组件名称
      dialogVisible: false,
      currentDialog: '',
      utils,
      id: this.$route.query.pageId,
      loading: false
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
    basePropertyId() {
      return this.$store.getters.basePropertyId;
    },
    baseInfo() {
      return this.$store.getters.baseInfo;
    }
  },
  watch: {
    'currentComponentId'(newValue, oldValue) {
      this.loadPropTemplate();
    },
    // 'basePropertyId'(newValue, oldValue) {
    //   this.loadPropTemplate();
    // }
  },
  created() {
  },
  mounted() {
    this.loadPropTemplate();
  },
  methods: {

    /* 动态加载属性模板 */
    loadPropTemplate() {
      let currentComponentData = this.componentDataMap[this.currentComponentId];
      let type = currentComponentData && currentComponentData.type || '';
      if(type){
        import(`./props/property${this.utils.titleCase(type)}.vue`).then(loadedComponent => {
          this.currentComponent = '';
          this.$nextTick(()=>{  //清除缓存组件以后下一帧处理
            this.currentComponent = loadedComponent.default
          })
        }).catch(e => {
          console.error(e);
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
</style>
