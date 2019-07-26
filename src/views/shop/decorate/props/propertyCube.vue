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
      <el-form-item label="布局" prop="layout">
        <div class="layout">
          <ul class="layout_wrapper">
            <!-- <div class="layout_block" style="margin-right:2px;">宽度375像素</div>
            <div class="layout_block">宽度375像素</div> -->
            <li v-if="ruleForm.templateType === 1">
              <div class="type1">
                <div class="fill_block"  @click="selectLayout(1,1)" :class="{'active': ruleForm.templateType === 1 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(1,2)" :class="{'active': ruleForm.templateType === 1 && blockType === 2}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 2">
              <div class="type2">
                <div class="fill_block"  @click="selectLayout(2,1)" :class="{'active': ruleForm.templateType === 2 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(2,2)" :class="{'active': ruleForm.templateType === 2 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(2,3)" :class="{'active': ruleForm.templateType === 2 && blockType === 3}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 3">
              <div class="type3">
                <div class="fill_block"  @click="selectLayout(3,1)" :class="{'active': ruleForm.templateType === 3 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(3,2)" :class="{'active': ruleForm.templateType === 3 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(3,3)" :class="{'active': ruleForm.templateType === 3 && blockType === 3}"></div>
                <div class="fill_block"  @click="selectLayout(3,4)" :class="{'active': ruleForm.templateType === 3 && blockType === 4}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 4">
              <div class="type4">
                <div class="fill_block"  @click="selectLayout(4,1)" :class="{'active': ruleForm.templateType === 4 && blockType === 1}"></div>
                <div class="fill_block"  @click="selectLayout(4,2)" :class="{'active': ruleForm.templateType === 4 && blockType === 2}"></div>
                <div class="fill_block"  @click="selectLayout(4,3)" :class="{'active': ruleForm.templateType === 4 && blockType === 3}"></div>
                <div class="fill_block"  @click="selectLayout(4,4)" :class="{'active': ruleForm.templateType === 4 && blockType === 4}"></div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 5">
              <div class="type5">
                <div class="fill_block fill_block1"  @click="selectLayout(5,1)" :class="{'active': ruleForm.templateType === 5 && blockType === 1}"></div>
                <div class="fill_block fill_block2">
                  <div class="fill_block fill_block3"  @click="selectLayout(5,2)" :class="{'active': ruleForm.templateType === 5 && blockType === 2}"></div>
                  <div class="fill_block fill_block4"  @click="selectLayout(5,3)" :class="{'active': ruleForm.templateType === 5 && blockType === 3}"></div>
                </div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 6">
              <div class="type6">
                <div class="fill_block fill_block1"  @click="selectLayout(6,1)" :class="{'active': ruleForm.templateType === 6 && blockType === 1}"></div>
                <div class="fill_block fill_block2">
                  <div class="fill_block fill_block3"  @click="selectLayout(6,2)" :class="{'active': ruleForm.templateType === 6 && blockType === 2}"></div>
                  <div class="fill_block fill_block4"  @click="selectLayout(6,3)" :class="{'active': ruleForm.templateType === 6 && blockType === 3}"></div>
                </div>
              </div>
            </li>
            <li v-if="ruleForm.templateType === 7">
              <div class="type7">
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
          <el-slider v-model="ruleForm.imgMargin"></el-slider>
          <span>{{ruleForm.imgMargin}}像素</span>
        </div>
      </el-form-item>
      <el-form-item label="添加图片" prop="images">
        <el-upload
        action="#"
        list-type="picture-card"
        :auto-upload="false">
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file" slot-scope="{file}">
            <img
              class="el-upload-list__item-thumbnail"
              :src="file.url" alt=""
            >
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)"
              >
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
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
import propertyMixin from './propertyMixin.js';
export default {
  name: 'propertyCube',
  mixins: [propertyMixin],
  components: {},
  data () {
    return {
      ruleForm: {
        templateType: 1,
        layout: '',
        imgMargin: 2,
        images: []
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
ul.template_type{
  li{
    height:74px;
    border:1px solid rgb(228,227,235);
    padding:10px;
    box-sizing: border-box;
    cursor:pointer;
    &.active{
      border:1px solid #655EFF;
    }
    .fill_block{
      height:100%;
      background:rgb(230,228,255);
      margin-right:2px;
      &:last-child{
        margin-right:0;
      }
    }
    .type1{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:50%;
      }
    }
    .type2{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:33.3%;
      }
    }
    .type3{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block{
        width:25%;
      }
    }
    .type4{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap:wrap;
      .fill_block{
        width:calc(50% - 1px);
        height:50%;
        margin-bottom:2px;
        &:nth-child(2n){
          margin-right:0;
        }
      }
    }
    .type5{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:calc(50% - 1px);;
        height:100%;
      }
      .fill_block3,.fill_block4{
        height:50%;
      }
      .fill_block2{
        background:#fff;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .fill_block3{
        margin-right:0;
        margin-bottom:2px;
      }
      .fill_block4{
        margin-bottom:0;
      }
    }
    .type6{
      height:100%;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:100%;
        height:50%;
        margin-right:0;
        margin-bottom:2px;
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
        margin-right:2px;
        height:auto;
      }
      .fill_block4{
        margin-bottom:0;
        height:auto;
      }
    }
    .type7{
      height:100%;
      display:flex;
      flex-direction: row;
      justify-content: space-between;
      .fill_block1,.fill_block2{
        width:calc(50% - 1px);;
        height:100%;
      }
      .fill_block3,.fill_block4{
        height:50%;
      }
      .fill_block2{
        background:#fff;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .fill_block3{
        margin-right:0;
        margin-bottom:2px;
      }
      .fill_block4{
        margin-bottom:0;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        background:#fff;
        .fill_block5{
          width:50%;
          height:100%;
          margin-right:2px;
        }
        .fill_block6{
          width:50%;
          height:100%;
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
.layout{
  ul.layout_wrapper{
    li{
      height:200px;
      box-sizing: border-box;
      .fill_block{
        background:rgb(230,228,255);
        height:100%;
        margin-right:2px;
        cursor:pointer;
        &.active{
          border:1px solid #655EFF;
        }
        &:last-child{
          margin-right:0;
        }
      }
      .type1{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .fill_block{
          width:50%;
        }
      }
      .type2{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .fill_block{
          width:33.3%;
        }
      }
      .type3{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .fill_block{
          width:25%;
        }
      }
      .type4{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        flex-wrap:wrap;
        .fill_block{
          width:calc(50% - 1px);;
          height:50%;
          margin-bottom:2px;
          &:nth-child(2n){
            margin-right:0;
          }
        }
      }
      .type5{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .fill_block1,.fill_block2{
          width:calc(50% - 1px);;
          height:100%;
        }
        .fill_block3,.fill_block4{
          height:50%;
        }
        .fill_block2{
          background:#fff;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .fill_block3{
          margin-right:0;
          margin-bottom:2px;
        }
        .fill_block4{
          margin-bottom:0;
        }
      }
      .type6{
        height:100%;
        display:flex;
        flex-direction: column;
        justify-content: space-between;
        .fill_block1,.fill_block2{
          width:100%;
          height:100%;
          margin-right:0;
          margin-bottom:2px;
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
          margin-right:2px;
          height:auto;
        }
        .fill_block4{
          margin-bottom:0;
          height:auto;
        }
      }
      .type7{
        height:100%;
        display:flex;
        flex-direction: row;
        justify-content: space-between;
        .fill_block1,.fill_block2{
          width:calc(50% - 1px);;
          height:100%;
        }
        .fill_block3,.fill_block4{
          height:50%;
        }
        .fill_block2{
          background:#fff;
          display:flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .fill_block3{
          margin-right:0;
          margin-bottom:2px;
        }
        .fill_block4{
          margin-bottom:0;
          display:flex;
          flex-direction: row;
          justify-content: space-between;
          background:#fff;
          .fill_block5{
            width:50%;
            height:100%;
            margin-right:2px;
          }
          .fill_block6{
            width:50%;
            height:100%;
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
  p{
    color:rgba(211,211,211,1);
  }
}
</style>
