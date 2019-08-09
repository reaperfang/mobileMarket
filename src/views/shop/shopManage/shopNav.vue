<template>
  <div>
    <el-tabs v-model="navigation_type">
      <el-tab-pane label="店铺导航" name="0"></el-tab-pane>
      <el-tab-pane label="小程序导航" name="1"></el-tab-pane>
    </el-tabs>
    <div class="on_off">
      <p>店铺的各个页面可以通过导航串联起来。通过精心设置的导航，方便买家在栏目间快速切换，引导买家前往你期望的页面。  </p>
      <el-switch
        v-model="ruleForm.openNav"
        active-color="#13ce66"
        inactive-color="#ff4949">
      </el-switch>
    </div>
    <div class="group-wrapper">

      <!-- 预览区 -->
      <div class="module view" ref="groupWrapper">

        <!-- 手机头部 -->
        <div class="phone-head">
          <img :src="require('@/assets/images/shop/editor/phone_head.png')" alt />
          <span>页面标题</span>
        </div>

        <!-- 手机中部 -->
        <div class="phone-body">
          <img :src="require('../../../assets/images/shop/shopNav.png')" alt="">
        </div>

        <!-- 手机底部 -->
        <div class="phone-footer">
          <ul class="navs type1" v-if="ruleForm.navStyle.id == 1">
            <li v-for="(item, key) of ruleForm.navIds" :class="{'active': ruleForm.navMap[item].active}" :key="key" @click="selectNav(item)">
              <img :src="ruleForm.navMap[item].navIcon" alt="">
              <span>{{ruleForm.navMap[item].navName}}</span>
            </li>
          </ul>
          <ul class="navs type2" v-if="ruleForm.navStyle.id == 2">
            <li v-for="(item, key) of ruleForm.navIds" :class="{'active': ruleForm.navMap[item].active}" :key="key" @click="selectNav(item)">
              <img :src="navMap[item].navIcon" alt="">
            </li>
          </ul>
          <ul class="navs type3" v-if="ruleForm.navStyle.id == 3">
            <div class="keyboard">
              <i class="el-icon-platform-eleme"></i>
            </div>
            <li v-for="(item, key) of ruleForm.navIds" :class="{'active': ruleForm.navMap[item].active}" :key="key" @click="selectNav(item)">
              <i class="el-icon-notebook-2"></i>
              <span>{{ruleForm.navMap[item].navName}}</span>
            </li>
          </ul>
          <ul class="navs type4" v-if="ruleForm.navStyle.id == 4">
            <li >第四种导航样式</li>
          </ul>

          <div class="add_btn" @click="addNav">
            <i class="el-icon-plus"></i>
          </div>
        </div>
      </div>

      <!-- 右侧属性区 -->
      <div class="module props">
        <el-form :model="currentNav" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
          <div class="block header">
            <p class="title">导航设置</p>
            <p class="state" @click="deleteNav" style="cursor:pointer;">删除导航</p>
          </div>
          <div class="block form">
            <el-form-item label="导航名称" prop="navName">
              <el-input v-model="currentNav.navName" placeholder="请输入导航名称(请勿超过4个汉字或8个字母)"></el-input>
            </el-form-item>
            <el-form-item label="导航图标" prop="navIcon">
              <div class="img_preview" v-if="currentNav.navIcon">
                <img :src="currentNav.navIcon" alt="">
                <span @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">更换图片</span>
              </div>
              <div class="add_button" v-if="!currentNav.navIcon" @click="dialogVisible=true; currentDialog='dialogSelectImageMaterial'">
                <i class="inner"></i>
              </div>
              建议尺寸：750*370，尺寸不匹配时，图片将被压缩或拉伸以铺满四周
            </el-form-item>
            <el-form-item label="导航链接" prop="navLinkType" v-if="navigation_type === '0'">
              <el-radio-group v-model="currentNav.navLinkType">
                <el-radio :label="1">系统链接</el-radio>
                <el-radio :label="2">自定义链接</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="" prop="navLinkUrl" v-if="navigation_type === '0'">
              <div v-if="currentNav.navLinkType == 1">
                <span>链接地址：</span>
                <el-select style="width:150px" v-model="currentNav.systemNavLinkUrl" placeholder="选择系统链接">
                  <el-option label="首页" value="1"></el-option>
                  <el-option label="购物车" value="2"></el-option>
                  <el-option label="个人中心" value="3"></el-option>
                  <el-option label="全部商品" value="4"></el-option>
                  <el-option label="全部分类" value="5"></el-option>
                  <el-option label="微信客服" value="6"></el-option>
                  <el-option label="微页面" value="7"></el-option>
                  <el-option label="微页面分类" value="8"></el-option>
                  <el-option label="指定商品" value="9"></el-option>
                  <el-option label="指定商品分类" value="10"></el-option>
                  <el-option label="营销活动" value="11"></el-option>
                </el-select>
              </div>
              <div v-else >
                <span>链接地址：</span>
                <el-input style="width:150px" v-model="currentNav.customNavLinkUrl" placeholder="请输入链接地址"></el-input>
              </div>
              <!-- <el-tag
                v-for="tag in currentNav.goodsGroups"
                :key="tag.title"
                closable
                type="success">
                {{tag.title}}
              </el-tag> -->
            </el-form-item>
            <el-form-item label="导航链接" prop="navLinkType" v-if="navigation_type === '1'">
              <el-select style="width:150px" v-model="currentNav.systemNavLinkUrl" placeholder="选择系统链接">
                <el-option label="首页" value="1"></el-option>
                <el-option label="购物车" value="2"></el-option>
                <el-option label="个人中心" value="3"></el-option>
                <el-option label="全部商品" value="4"></el-option>
                <el-option label="全部分类" value="5"></el-option>
                <el-option label="微信客服" value="6"></el-option>
                <el-option label="微页面" value="7"></el-option>
                <el-option label="微页面分类" value="8"></el-option>
                <el-option label="指定商品" value="9"></el-option>
                <el-option label="指定商品分类" value="10"></el-option>
                <el-option label="营销活动" value="11"></el-option>
              </el-select>
            </el-form-item>
          </div>


          <div class="block header" v-if="navigation_type === '0'">
            <p class="title">全局设置</p>
            <p class="state"></p>
          </div>
          <div class="block form" v-if="navigation_type === '0'">
            <el-form-item label="导航风格" prop="navStyle">
              公众号样式
              <el-button type="text" @click="dialogVisible=true; currentDialog='dialogSelectNavTemplate'">修改</el-button>
            </el-form-item>
            <el-form-item label="应用页面" prop="applyPage">
              <el-checkbox-group v-model="ruleForm.applyPage">
                <el-checkbox label="1">主页</el-checkbox>
                <el-checkbox label="2">个人中心</el-checkbox>
                <el-checkbox label="3">商品搜索</el-checkbox>
                <el-checkbox label="4">商品分组</el-checkbox>
                <el-checkbox label="5">微页面及分类</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </div>

          <div class="block header" v-if="navigation_type === '1'">
            <p class="title">导航样式设置</p>
            <p class="state"></p>
          </div>
          <div class="block form" v-if="navigation_type === '1'">
            <el-form-item label="背景颜色" prop="backgroundColor">
              <div class="color_block">
                <el-input v-model="ruleForm.backgroundColor" :disabled="true"></el-input>
                <colorPicker  v-model="ruleForm.backgroundColor"></colorPicker >
                <el-button type="text">重置</el-button>
              </div>
            </el-form-item>
            <el-form-item label="选中文字颜色" prop="activeColor">
              <div class="color_block">
                <el-input v-model="ruleForm.activeColor" :disabled="true"></el-input>
                <colorPicker  v-model="ruleForm.activeColor"></colorPicker >
                <el-button type="text">重置</el-button>
              </div>
            </el-form-item>
            <el-form-item label="未选中文字颜色" prop="unactiveColor">
              <div class="color_block">
                <el-input v-model="ruleForm.unactiveColor" :disabled="true"></el-input>
                <colorPicker  v-model="ruleForm.unactiveColor"></colorPicker >
                <el-button type="text">重置</el-button>
              </div>
            </el-form-item>
          </div>

          <div class="block button">
            <div class="help_blank"></div>
            <div class="buttons">
              <el-button @click="saveAndApply">保存并启用</el-button>
              <el-button @click="save">暂    存</el-button>
              <el-button @click="resetData">重    置</el-button>
            </div>
          </div>

        </el-form>
      </div>
        <!-- {{ruleForm}} -->
      <!-- 动态弹窗 -->
      <component :is="currentDialog" :dialogVisible.sync="dialogVisible" @imageSelected="imageSelected" @dialogDataSelected="dialogDataSelected"></component>
    </div>
  </div>
</template>

<script>
import dialogSelectImageMaterial from '../dialogs/dialogSelectImageMaterial';
import dialogSelectNavTemplate from '../dialogs/dialogSelectNavTemplate';
import utils from "@/utils";
import uuid from 'uuid/v4';
export default {
  name: 'shopNav',
  components: {dialogSelectImageMaterial, dialogSelectNavTemplate},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      navigation_type: '0',  //导航类型
      utils,
      ruleForm: {
        openNav: true,   //系统-是否打开导航
        navStyle: {id:1},  //系统-全局导航样式
        applyPage: ['1','2','3'],  //系统-应用页面
        navIds: [],
        navMap: {}
      },
      rules: {},
      currentNav: null  //当前导航对象
    }
  },
  computed: {
  },
  watch: {
    currentNav: {
      handler(newValue) {
        if(this.ruleForm.navMap[newValue.id]) {
          this.ruleForm.navMap[newValue.id] = newValue;
        }
      },
      depp: true
    }
  },
  created() {
    this.initnavMap();
    this.fetch();
  },
  methods: {

     /* 弹框选中图片 */
    imageSelected(dialogData) {
      this.currentNav.navIcon = dialogData.src;
    },

     /* 弹窗选中了导航样式 */
    dialogDataSelected(navStyle) {
      this.ruleForm.navStyle = dialogData.src;
    },

    /* 初始化导航列表 */
    initnavMap() {
      for(let i=0;i<3;i++) {
        let navObj = this.createNav();
        this.ruleForm.navIds.push(navObj.id);
        this.ruleForm.navMap[navObj.id] = navObj;
      }
      this.selectNav(this.ruleForm.navIds[0]);
    },

    /* 创建导航 */
    createNav() {
      let num = this.ruleForm.navIds.length;
      num ++;
      return {
        id: uuid(),
        navName: `导航${num}`,
        navIcon: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564824709390&di=f171260fec0b461843d15c732ef5ba92&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201306%2F18%2F122658rt90n2d2zy4qnn0q.jpg',
        navLinkType: 1,
        systemNavLinkUrl: '1',
        customNavLinkUrl: '',
        active: false
      };
    },

    /* 选中一个导航来编辑 */
    selectNav(id) {
      this.currentNav = this.ruleForm.navMap[id];
      let curentActiveNav = null;
      for(let k in this.ruleForm.navMap) {
        if(this.ruleForm.navMap[k].active) {
          curentActiveNav = this.ruleForm.navMap[k];
        }
      }
      if(curentActiveNav){
        this.$set(curentActiveNav, 'active', false);
      }
      this.$set(this.ruleForm.navMap[id], 'active', true);
    },

    /* 添加一个新导航 */
    addNav() {
      if(this.ruleForm.navIds.length < 5) {
        let navObj = this.createNav();
        this.ruleForm.navIds.push(navObj.id);
        this.ruleForm.navMap[navObj.id] = navObj;
        this.selectNav(navObj.id);
      }
    },

    /* 删除当前导航 */
    deleteNav() {
      if(this.ruleForm.navIds.length <= 1) {
        return;
      }
      const id = this.currentNav.id;
      const index = this.ruleForm.navIds.indexOf(id);

      //删除顺序列表中对应项
			const prevId = this.ruleForm.navIds[index - 1];
			const nextId = this.ruleForm.navIds[index + 1];
			if (nextId) {
				this.selectNav(nextId);
			} else if (prevId) {
				this.selectNav(prevId);
			}

      if(index > -1) {
        this.ruleForm.navIds.splice(index, 1);
      }
      if(this.ruleForm.navMap[id]) {
        delete this.ruleForm.navMap[id];
      }
    },

    fetch() {
      this.loading = true;
      this._apis.shop.getShopNav({}).then((response)=>{
        const navigation_json = JSON.parse(response.navigation_json);
        if(navigation_json && navigation_json.navStyle) {
          this.ruleForm = navigation_json;
        }
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    /* 保存并启用 */
    saveAndApply() {
      this.submit({
        navigationKey: '',
        navigation_type: this.navigation_type,
        navigation_json: JSON.stringify(this.ruleForm)
      });
    },

    /* 保存 */
    save() {
       this.submit({
        navigationKey: '',
        navigation_type: this.navigation_type,
        navigation_json: JSON.stringify(this.ruleForm)
      });
    },

    submit(params) {
      this.loading = true;
      this._apis.shop.editShopNav(params).then((response)=>{
        this.$notify({
          title: '成功',
          message: '编辑成功！',
          type: 'success'
        });
        this.loading = false;
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
        this.loading = false;
      });
    },

    /* 重置 */
    resetData() {

    }
  }
}
</script>

<style lang="scss" scoped>
.on_off{
  height:36px;
  background: rgb(255,233,210);
  margin-bottom:20px;
  display:flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 9px;
  p{
    color:rgba(146,146,155,1);
  }
}
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
      height: 550px;
      .component_wrapper{
        cursor:text;
      }
    }
    .phone-footer{
      min-height:50px;
      background:#fff;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      ul.navs{
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        li{
          cursor:pointer;
          border:2px solid transparent;
          padding:0 10px;
          &.active{
            border:2px dashed $globalMainColor;
          }
        }
        &.type1{
          justify-content: space-around;
          padding: 5px 0;
          li{
            display:flex;
            flex-direction: column;
            align-items: center;
            img{
              width:24px;
              height:24px;
            }
            span{
              margin-top:5px;
              text-align:center;
              font-size:12px;
            }
          }
        }
        &.type2{
          justify-content: space-around;
          padding: 10px 0;
          li{
            img{
              width:30px;
              height:30px;
            }
          }
        }
        &.type3{
          height:50px;
          .keyboard{
            width:50px;
            height:50px;
            border-right:1px solid #ddd;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            i{
              font-size:30px;
            }
          }
          li{
            padding:0;
            border-right:1px solid #ddd;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            flex-grow: 1;
            &:last-child{
              border-right:0;
            }
            &.active{
              border:2px dashed $globalMainColor;
            }
            i{
              width:5px;
              height:10px;
              margin-right: 5px;
            }
            span{
              margin-left: 5px;
              margin-top: 2px;
            }
          }
        }
        &.type4{

        }
      }
      .add_btn{
        width:50px;
        border-left:1px solid #eee;
        display:flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        cursor:pointer;
        i{
          font-size:29px;
          color:rgba(216,216,216,1);
          &:hover{
            color:$globalMainColor;
          }
        }
      }
    }
  }
  &.props{
    width:346px;
    form{
      height: 625px;
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
