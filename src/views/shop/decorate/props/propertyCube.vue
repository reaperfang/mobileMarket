<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="选择模板" prop="templateType">
        <ul class="tile-list n3 cube template_type">
          <li @click="selectTemplate(1)" :class="{'active': ruleForm.templateType === 1}">
            <div class="type type1">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行2个</p>
          </li>
          <li @click="selectTemplate(2)" :class="{'active': ruleForm.templateType === 2}">
            <div class="type type2">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行3个</p>
          </li>
          <li @click="selectTemplate(3)" :class="{'active': ruleForm.templateType === 3}">
            <div class="type type3">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行4个</p>
          </li>
          <li @click="selectTemplate(4)" :class="{'active': ruleForm.templateType === 4}">
            <div class="type type4">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>2左2右</p>
          </li>
          <li @click="selectTemplate(5)" :class="{'active': ruleForm.templateType === 5}">
            <div class="type type5">
              <div class="fill_block fill_block1"></div>
              <div class="fill_block fill_block2">
                <div class="fill_block fill_block3"></div>
                <div class="fill_block fill_block4"></div>
              </div>
            </div>
            <p>1左2右</p>
          </li>
          <li @click="selectTemplate(6)" :class="{'active': ruleForm.templateType === 6}">
            <div class="type type6">
              <div class="fill_block fill_block1"></div>
              <div class="fill_block fill_block2">
                <div class="fill_block fill_block3"></div>
                <div class="fill_block fill_block4"></div>
              </div>
            </div>
            <p>1上2下</p>
          </li>
          <li @click="selectTemplate(7)" :class="{'active': ruleForm.templateType === 7}">
            <div class="type type7">
              <div class="fill_block fill_block1"></div>
              <div class="fill_block fill_block2">
                <div class="fill_block fill_block3"></div>
                <div class="fill_block fill_block4">
                  <div class="fill_block fill_block5"></div>
                  <div class="fill_block fill_block6"></div>
                </div>
              </div>
            </div>
            <p>1左3右</p>
          </li>
        </ul>
      </el-form-item>
      <el-form-item label="布局" prop="layout">
        <div class="layout">
          <ul class="cube layout_wrapper">
            <!-- <div class="layout_block" style="margin-right:2px;">宽度375像素</div>
            <div class="layout_block">宽度375像素</div> -->
            <li v-if="ruleForm.templateType === 1">
              <div class="type type1">
                <div class="fill_block"  @click="selectLayout(1,1)" :class="{'active': ruleForm.templateType === 1 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(1,2)" :class="{'active': ruleForm.templateType === 1 && blockType === 2}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 2">
              <div class="type type2">
                <div class="fill_block"  @click="selectLayout(2,1)" :class="{'active': ruleForm.templateType === 2 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(2,2)" :class="{'active': ruleForm.templateType === 2 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(2,3)" :class="{'active': ruleForm.templateType === 2 && blockType === 3}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 3">
              <div class="type type3">
                <div class="fill_block"  @click="selectLayout(3,1)" :class="{'active': ruleForm.templateType === 3 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(3,2)" :class="{'active': ruleForm.templateType === 3 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(3,3)" :class="{'active': ruleForm.templateType === 3 && blockType === 3}"></div>
                <div class="fill_block"  @click="selectLayout(3,4)" :class="{'active': ruleForm.templateType === 3 && blockType === 4}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 4">
              <div class="type type4">
                <div class="fill_block"  @click="selectLayout(4,1)" :class="{'active': ruleForm.templateType === 4 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(4,2)" :class="{'active': ruleForm.templateType === 4 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(4,3)" :class="{'active': ruleForm.templateType === 4 && blockType === 3}"></div>
                <div class="fill_block"  @click="selectLayout(4,4)" :class="{'active': ruleForm.templateType === 4 && blockType === 4}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 5">
              <div class="type type5">
                <div class="fill_block fill_block1"  @click="selectLayout(5,1)" :class="{'active': ruleForm.templateType === 5 && blockType === 1}"></div>
                <div class="fill_block fill_block2">
                  <div class="fill_block fill_block3"  @click="selectLayout(5,2)" :class="{'active': ruleForm.templateType === 5 && blockType === 2}"></div>
                  <div class="fill_block fill_block4"  @click="selectLayout(5,3)" :class="{'active': ruleForm.templateType === 5 && blockType === 3}"></div>
                </div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 6">
              <div class="type type6">
                <div class="fill_block fill_block1"  @click="selectLayout(6,1)" :class="{'active': ruleForm.templateType === 6 && blockType === 1}"></div>
                <div class="fill_block fill_block2">
                  <div class="fill_block fill_block3"  @click="selectLayout(6,2)" :class="{'active': ruleForm.templateType === 6 && blockType === 2}"></div>
                  <div class="fill_block fill_block4"  @click="selectLayout(6,3)" :class="{'active': ruleForm.templateType === 6 && blockType === 3}"></div>
                </div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 7">
              <div class="type type7">
                <div class="fill_block fill_block1"  @click="selectLayout(7,1)" :class="{'active': ruleForm.templateType === 7 && blockType === 1}"></div>
                <div class="fill_block fill_block2">
                  <div class="fill_block fill_block3"  @click="selectLayout(7,2)" :class="{'active': ruleForm.templateType === 7 && blockType === 2}"></div>
                  <div class="fill_block fill_block4">
                    <div class="fill_block fill_block5"  @click="selectLayout(7,3)" :class="{'active': ruleForm.templateType === 7 && blockType === 3}"></div>
                    <div class="fill_block fill_block6"  @click="selectLayout(7,4)" :class="{'active': ruleForm.templateType === 7 && blockType === 4}"></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <p>选定布局区域，在下方添加图片，建议添加比例一致的图片</p>
        </div>
      </el-form-item>
      <el-form-item label="图片间隙" prop="imgMargin">
        <div class="slider-wrapper">
          <el-slider v-model="ruleForm.imgMargin" :min="0" :max="30"></el-slider>
          <span>{{ruleForm.imgMargin}}像素</span>
        </div>
      </el-form-item>
      <el-form-item label="页面间距" prop="pagePadding">
        <div class="slider-wrapper">
          <el-slider v-model="ruleForm.pagePadding" :min="0" :max="30"></el-slider>
          <span>{{ruleForm.pagePadding}}像素</span>
        </div>
      </el-form-item>
      <el-form-item label="添加图片" prop="">
        <div class="img_preview">
          <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg" alt="">
          <span>更换图片</span>
        </div>
        <div class="add_button">
          <i class="inner"></i>
        </div>
      </el-form-item>
      <el-form-item label="跳转链接" prop="pageLink">
         <el-input
          placeholder="请选择跳转链接"
          v-model="ruleForm.pageLink">
        </el-input>
        <el-button type="text">修改</el-button>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './mixin';;
export default {
  name: 'propertyCube',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        templateType: 1,
        imgMargin: 2,
        pagePadding:0
      },
      rules: {},
      blockType: 1
    }
  },
  methods: {
    selectTemplate(templateType) {
      this.ruleForm.templateType = templateType;
      this.blockType = 1;
    },
  
    selectLayout(templateType, blockType) {
      this.ruleForm.templateType = templateType;
      this.blockType = blockType;
    }
  }
}
</script>

<style lang="scss" scoped>
/* 魔方样式混入了decorate.scss中的公共魔方样式 */

ul.cube.template_type{
  li{
    border:1px solid rgb(228,227,235);
    padding:10px;
    cursor:pointer;
    .type{
       height:45px;
    }
    &.active{
      border:1px solid $globalMainColor;
    }
    p{
      margin-top:6px;
      text-align:center;
    }
  }
}
.layout{
  ul.cube.layout_wrapper{
    li{
      .type{
          height:150px;
      }
      .fill_block{
        cursor:pointer;
        &.active{
          border:1px solid $globalMainColor;
        }
      }
      p{
        margin-top:6px;
        text-align:center;
      }
    }
  }
  p{
    color:rgba(211,211,211,1);
  }
}

</style>
