<template>
  <!-- <p>图片素材
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogUploadImage'">上传图片</el-button>
    <el-button type="text" @click="dialogVisible=true; currentDialog='dialogCutImage'">剪裁</el-button>
    <component :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </p> -->
  <div>
    <div class="head">
      <div>
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        <el-button type="warning" plain class="ml10">批量删除</el-button>
      </div>
      <div>
        <el-button type="primary" plain>移动分组</el-button>
        <el-button type="primary" plain>同步图片</el-button>
        <el-button type="primary" plain>上传图片</el-button>
      </div>
    </div>
    <div class="list">
      <p class="list_top">图片素材<span>{{num}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           <div class="material_wrapper" ref="materialWrapper" v-loading="loading" :style="{'overflow-y': loading ? 'hidden' : 'auto'}">
              <waterfall :col='3' :width="250" :gutterWidth="10"  :data="imgsArr" :isTransition="false" >
                <template >
                  <div class="cell-item" v-for="(item,key) in imgsArr" :key="key">
                    <img :src="item.src" alt="加载错误" @load="loadImg($event, item)" @error="loadError($event, item)"/> 
                    <div class="item-body">
                        <div class="item-desc">{{item.title}}</div>
                    </div>
                  </div>
                </template>
              </waterfall>
          </div>
        </div>
        <div class="groups">
          <p class="groups_head">全部图片</p>
          <p class="item">未分组</p>
          <p class="item">
            <span>配图</span>
            <span>
              <i class="el-icon-edit"></i>
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <p class="item">
            <span>封面</span>
            <span>
              <i class="el-icon-edit"></i>
              <i class="el-icon-delete"></i>
            </span>
          </p>
          <span class="newClass">+ 新建分组</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogCutImage from '../../../dialogs/dialogCutImage';
import dialogUploadImage from '../../../dialogs/dialogUploadImage';
export default {
  name: 'imageMaterial',
  components: {dialogCutImage, dialogUploadImage},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      num:10,
      checkedAll:false,
      imgsArr:[

      ],
      loading:false
    }
  },
  created() {

  },
  methods: {
     /* 成功加载图片 */
    loadImg(event, item) {
      this.$set(item, 'loaded', true);
      this.allImgLoaded();
    },

    /* 图片加载失败 */
    loadError(event, item) {
      this.$set(item, 'loaded', true);  //只要加载了都算成功，用来后面统计
      this.allImgLoaded();
    },
  }
}
</script>

<style lang="scss" scoped>
.head{
  display: flex;
  justify-content: space-between;
}
.list_top{
  height: 80px;
  line-height: 80px;
  font-size: 14px;
  color: #92929B;
  span{
    color: #44434B;
    margin: 0 5px;
  }
}
.list_main{
  display: flex;
  justify-content: space-between;
  .groups{
    width: 300px;
    border: 1px solid #e6e6e6;
    font-size: 14px;
    color: #44434B;
    .groups_head{
      height: 30px;
      line-height: 30px;
      background: #EFEFEF;
      padding-left: 20px;
    }
    .item{
      height: 35px;
      line-height: 35px;
      padding:0 20px;
      display: flex;
      justify-content: space-between;
      i{
        margin: 0 5px;
        cursor: pointer;
      }
    }
    .item:hover{
      background: #E0E0fc;
      cursor: pointer;
    }
    .newClass{
      height: 40px;
      line-height: 40px;
      padding-left: 20px;
      cursor: pointer;
    }
  }
}
.material_wrapper{
  height:400px;
  overflow-y: auto;
  .cell-item {
    width: 100%;
    background: #fff;
    border: 1px solid #efeaea;
    overflow: hidden;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin-bottom: 10px;
    cursor: pointer;
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
    img{
      max-width: 100%;
    }
    .item-body{
      padding:10px 0;
    }
  }
  .img_active{
    border: 2px dashed $globalMainColor!important;
  }
}
.ml10{
  margin-left: 10px;
}
</style>
