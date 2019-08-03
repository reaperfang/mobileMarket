<template>
  <div class="group-wrapper">
    <div class="module view" ref="groupWrapper" :style="fontStyle">
      <div class="phone-head">
        <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt />
        <span>{{baseInfo.pageTitle || '页面标题'}}</span>
      </div>
      <div class="phone-body">
        <div class="component_wrapper" v-for="(item, key) of componentDataIds" :key="key">
          <component
            v-if="allTemplateLoaded"
            :is="templateList[getComponentData(item).type]"
            :key="key"
            :data="getComponentData(item)"
          ></component>
          {{getComponentData(item).title}}
        </div>
      </div>
    </div>
    <div class="module props">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
        <div class="block header">
          <p class="title">启动设置</p>
          <p class="state">生效中</p>
        </div>
        <div class="block form">
          <el-form-item label="出现样式" prop="showPage">
            <el-radio-group v-model="ruleForm.showPage">
              <el-radio :label="1">首页</el-radio>
              <el-radio :label="2">微页面</el-radio>
              <el-radio :label="3">微页面分类</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="广告名称" prop="adName">
             <el-input v-model="ruleForm.adName" placeholder="请输入广告标题"></el-input>
          </el-form-item>
          <el-form-item label="广告图片" prop="adImg">
            <div class="img_preview" v-if="ruleForm.adImg">
              <img :src="ruleForm.adImg" alt="">
              <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
            </div>
            <div class="add_button" v-if="!ruleForm.adImg" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
              <i class="inner"></i>
            </div>
            <span class="upload_tips">建议尺寸:640 * 350 , 请将所有广告图片尺寸保持一致，图片只能选择一张</span>
          </el-form-item>
          <el-form-item label="广告链接" prop="adLink">
            <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectJumpPage'">选择跳转到的页面</el-button>
          </el-form-item>
          <el-form-item label="展示时间" prop="">
            <div>
              <el-date-picker
                v-model="ruleForm.showTimeStart"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
            至
            <div>
              <el-date-picker
                v-model="ruleForm.showTimeEnd"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>
        </div>

        <div class="block button">
          <el-button @click="routeTo('ADManageIndex')">取    消  </el-button>
          <el-button @click="saveData">保    存</el-button>
        </div>

      </el-form>
    </div>
    <!-- 动态弹窗 -->
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected" @dialogDataSelected="dialogDataSelected"></component>
  </div>
</template>

<script>
import dialogSelectNavTemplate from '../dialogs/dialogSelectNavTemplate';
import utils from "@/utils";
import widget from "@/system/constant/widget";
import decorateDemo from "@/assets/json/decorateDemo.json";
export default {
  name: 'shopNav',
  components: {dialogSelectNavTemplate},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      utils,
      allTemplateLoaded: false,
      templateList: {}, //模板对象列表
      ruleForm: {
        showPage: 1,
        adName: '',
        adImg: '',
        adLink: '',
        showTimeStart: '',
        showTimeEnd: '',
      },
      rules: {}
    }
  },
  computed: {
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
    this.convertDecorateData(decorateDemo['custom1']);
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
      for (let item of widgetList) {
        import(`@/views/shop/decorate/comps/component${this.utils.titleCase(item)}.vue`)
          .then(loadedComponent => {
            this.templateList[item] = loadedComponent.default;
            loadedLength++;
            if (loadedLength >= widgetList.length) {
              this.allTemplateLoaded = true;
            }
          })
          .catch(e => {
            console.log(e);
            loadedLength++;
            if (loadedLength >= widgetList.length) {
              this.allTemplateLoaded = true;
            }
          });
      }
    },

     /* 弹窗选中了导航样式 */
    dialogDataSelected(navStyle) {
      console.log(navStyle);
    },

      /* 转换装修数据 */
    convertDecorateData(data) {
      let baseInfo = data.pageInfo;
      let componentDataIds = [];
      let componentDataMap = {};
      for (let item of data.components) {
        componentDataIds.push(item.id);
        componentDataMap[item.id] = item;
      }
      this.$store.commit("setBaseInfo", baseInfo);
      this.$store.commit("setComponentDataIds", componentDataIds);
      this.$store.commit("setComponentDataMap", componentDataMap);
    }
  }
}
</script>

<style lang="scss" scoped>
.group-wrapper{
  display:flex;
  flex-direction: row;
  .content {
    padding: 10px 0 0 10px;
    box-sizing: border-box;
    width: 100%;
    .wrapper {
      background: #fff;
      margin-bottom: 10px;
      p {
        background: rgba(247, 247, 247, 1);
        padding: 10px;
        margin-bottom: 20px;
      }
      ul.group {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        li {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          margin-bottom: 20px;
          cursor:pointer;
          img {
            width: 65px;
            height: 65px;
          }
          span {
            margin-top: 20px;
          }
        }
      }
    }
  }
}
.module {
  &.view {
    width: 374px;
    .phone-body {
      height: 760px;
    }
  }
  &.props{
    width:346px;
    .block{
      &.button{
        padding: 30px 0;
        display: flex;
        flex-direction: row;
        justify-content: center;
      }
    }
  }
}
</style>
