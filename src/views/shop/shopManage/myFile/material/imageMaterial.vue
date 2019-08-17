<template>
  <div>
    <div class="head">
      <div>
        <el-checkbox v-model="checkedAll">全选</el-checkbox>
        <el-button type="warning" plain class="ml10" @click="deleteImage">批量删除</el-button>
        <el-button type="warning" plain @click="moveGroup">移动分组</el-button>
      </div>
      <div>
        <el-button type="primary" plain @click="syncImage">同步图片</el-button>
        <el-button type="primary" plain @click="uploadImage">上传图片</el-button>
      </div>
    </div>
    <div class="list">
      <p class="list_top">图片素材<span>{{num}}</span>条</p>
      <div class="list_main">
        <div class="list_img">
           <div class="item_img" @mouseenter="onMouseOver" @mouseleave="onMouseOut">
             <div class="img_info">
              <img src="">
              <div class="img_bottom">
                <p>
                  <span>
                    <el-checkbox v-model="checked"></el-checkbox>
                    <i class="wx_icon"></i>
                  </span>
                  <span>
                    800*640px
                  </span>
                  <span>
                    <i class="el-icon-link"></i>
                    <i class="el-icon-download"></i>
                  </span>
                </p>
              </div>
              <div class="operate" ref="operate">
                <el-button type="primary" plain class="block mt10 ml10">分组</el-button>
                <el-button type="primary" plain class="block mt10">剪裁</el-button>
                <el-button type="primary" plain class="block mt10">删除</el-button>
              </div>
             </div>
           </div>
        </div>
        <div class="groups">
          <p class="groups_head">全部图片</p>
          <p class="item">未分组</p>
          <p class="item">
            <span>配图</span>
            <span>
              <i class="el-icon-edit" @click="newGroup"></i>
              <i class="el-icon-delete" @click="deleteImage"></i>
            </span>
          </p>
          <p class="item">
            <span>封面</span>
            <span>
              <i class="el-icon-edit" @click="newGroup"></i>
              <i class="el-icon-delete" @click="deleteImage"></i>
            </span>
          </p>
          <span class="newClass" @click="newGroup">+ 新建分组</span>
        </div>
      </div>
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
      </el-pagination>
    </div>
    <!-- 动态弹窗 -->
    <component v-if="dialogVisible" :is="currentDialog" :dialogVisible.sync="dialogVisible"></component>
  </div>
</template>

<script>
import dialogCutImage from '../../../dialogs/dialogCutImage';
import dialogUploadImage from '../../../dialogs/dialogUploadImage';
import dialogSync from '../../../dialogs/dialogSync';
import dialogDelete from '../../../dialogs/dialogDelete';
import dialogGroups from '../../../dialogs/dialogGroups';
import dialogGroupsMove from '../../../dialogs/dialogGroupsMove';
export default {
  name: 'imageMaterial',
  components: {dialogCutImage, dialogUploadImage,dialogSync,dialogDelete,dialogGroups,dialogGroupsMove},
  data () {
    return {
      dialogVisible: false,
      currentDialog: '',
      num:10,
      checkedAll:false,
      imgsArr:[

      ],
      loading:false,
      checked:false,
      currentPage:1,
      total:0
    }
  },
  created() {

  },
  methods: {
    newGroup(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroups'
    },
    moveGroup(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogGroupsMove'
    },
    deleteImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogDelete'
    },
    uploadImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogUploadImage'
    },
    syncImage(){
      this.dialogVisible = true;
      this.currentDialog = 'dialogSync'
    },
    onMouseOver(){
      this.$refs.operate.style.display="block"
    },
    onMouseOut(){
      this.$refs.operate.style.display="none"
    },
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
    //分页相关
    handleSizeChange(){},
    handleCurrentChange(){},

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
  .list_img{
    display: flex;
    justify-content: space-around;
    .item_img{
      border: 1px solid #e6e6e6;
      .img_info{
        width: 240px;
        height:150px;
        position: relative;
        .img_bottom{
          width:100%;
          height: 30px;
          line-height: 30px;
          padding:0 10px;
          position: absolute;
          left:0px;
          bottom:-25px;
          z-index: 1;
          background:rgba(0,0,0,1);
          opacity: 0.5;
          p{
            display:flex;
            justify-content: space-between;
            color: #fff;
            font-weight: bold;
          }
        }
        .operate{
          width: 100%;
          height: 175px;
          position: absolute;
          top:0;
          left:0;
          z-index: 2;
          background-color:rgba(0,0,0,0.2);
          padding: 20px 0px 0px 80px;
          display:none;
        }
      }
    }
  }
  .groups{
    width: 200px;
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
// .material_wrapper{
//   height:400px;
//   overflow-y: auto;
//   .cell-item {
//     width: 100%;
//     background: #fff;
//     border: 1px solid #efeaea;
//     overflow: hidden;
//     -webkit-box-sizing: border-box;
//     box-sizing: border-box;
//     margin-bottom: 10px;
//     cursor: pointer;
//     box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.1);
//     img{
//       max-width: 100%;
//     }
//     .item-body{
//       padding:10px 0;
//     }
//   }
//   .img_active{
//     border: 2px dashed $globalMainColor!important;
//   }
// }
.wx_icon{
  width: 20px;
  height: 20px;
  display: inline-block;
  vertical-align: middle;
  background: url('../../../../../assets/images/shop/wx_icon.png');
}
.ml10{
  margin-left: 10px;
}
.mt10{
  margin-top: 10px;
}
.block{
  display: block;
}
</style>
