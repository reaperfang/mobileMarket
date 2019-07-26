<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="80px">
    <div class="block form">
      <el-form-item label="选择模板" prop="templateType">
        <ul class="tile-list n3 template_type">
          <li @click="selectTemplate(1)" :class="{'active': ruleForm.templateType === 1}">
            <div class="type1">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行2个</p>
          </li>
          <li @click="selectTemplate(2)" :class="{'active': ruleForm.templateType === 2}">
            <div class="type2">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行3个</p>
          </li>
          <li @click="selectTemplate(3)" :class="{'active': ruleForm.templateType === 3}">
            <div class="type3">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>1行4个</p>
          </li>
          <li @click="selectTemplate(4)" :class="{'active': ruleForm.templateType === 4}">
            <div class="type4">
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
              <div class="fill_block"></div>
            </div>
            <p>2左2右</p>
          </li>
          <li @click="selectTemplate(5)" :class="{'active': ruleForm.templateType === 5}">
            <div class="type5">
              <div class="fill_block fill_block1"></div>
              <div class="fill_block fill_block2">
                <div class="fill_block fill_block3"></div>
                <div class="fill_block fill_block4"></div>
              </div>
            </div>
            <p>1左2右</p>
          </li>
          <li @click="selectTemplate(6)" :class="{'active': ruleForm.templateType === 6}">
            <div class="type6">
              <div class="fill_block fill_block1"></div>
              <div class="fill_block fill_block2">
                <div class="fill_block fill_block3"></div>
                <div class="fill_block fill_block4"></div>
              </div>
            </div>
            <p>1上2下</p>
          </li>
          <li @click="selectTemplate(7)" :class="{'active': ruleForm.templateType === 7}">
            <div class="type7">
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
      <el-form-item label="选择活动" prop="promotion">
        <el-button type="primary" plain>选择活动</el-button>
        最多可选5个活动
      </el-form-item>
      <el-form-item label="展示样式" prop="displayStyle">
        <el-radio-group v-model="ruleForm.displayStyle">
          <el-radio :label="1">样式1</el-radio>
          <el-radio :label="2">样式2</el-radio>
          <el-radio :label="3">样式3</el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
  </el-form>
</template>

<script>
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyCube',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        templateType: 1
      },
      rules: {}
    }
  },
  methods: {
    selectTemplate(type) {
      this.ruleForm.templateType = type;
    }
  }
}
</script>

<style lang="scss" scoped>
ul.template_type{
  li{
    border:1px solid rgb(228,227,235);
    padding:10px;
    box-sizing: border-box;
    cursor:pointer;
    &.active{
      border:1px solid #655EFF;
    }
    .fill_block{
      background:rgb(230,228,255);
      height:54px;
      margin-right:2px;
      &:last-child{
        margin-right:0;
      }
    }
    .type1{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:50%;
      }
    }
    .type2{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:33.3%;
      }
    }
    .type3{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:25%;
      }
    }
    .type4{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap:wrap;
      .fill_block{
        width:45%;
        height:25px;
        margin-bottom:4px;
        &:nth-child(2n){
          margin-right:0;
        }
      }
    }
    .type5{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:46%;
        height:54px;
      }
      .fill_block3,.fill_block4{
        height:28px;
      }
      .fill_block2{
        background:#fff;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .fill_block3{
        margin-right:0;
        margin-bottom:4px;
      }
      .fill_block4{
        margin-bottom:0;
      }
    }
    .type6{
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:100%;
        height:25px;
        margin-right:0;
        margin-bottom:4px;
      }
      .fill_block3,.fill_block4{
        width:50%;
      }
      .fill_block2{
        background:#fff;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
      }
      .fill_block3{
        margin-right:0;
        margin-right:4px;
        height:auto;
      }
      .fill_block4{
        margin-bottom:0;
        height:auto;
      }
    }
    .type7{
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:46%;
        height:54px;
      }
      .fill_block3,.fill_block4{
        height:28px;
      }
      .fill_block2{
        background:#fff;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .fill_block3{
        margin-right:0;
        margin-bottom:4px;
      }
      .fill_block4{
        margin-bottom:0;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        background:#fff;
        .fill_block5{
          width:50%;
          height:25px;
          margin-right:4px;
        }
        .fill_block6{
          width:50%;
          height:25px;
          margin-right:0;
        }
      }
    }
    p{
      margin-top:6px;
      text-align:center;
    }
  }
}
</style>
