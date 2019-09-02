<template>
  <DialogBase :visible.sync="visible" width="1000px" :title="'同步微信图文素材'" @submit="submit">
      <div>
        <el-checkbox v-model="checkedAll" @change="allChecked">全选</el-checkbox>
        <div class="list_main">
          <div class="list_img">
              <div class="item_img" v-for="item in list" :key="item.id">
                <p class="img_head">
                  <el-checkbox v-model="item.checked" @change="handleChecked"></el-checkbox>
                  <span>{{item.update_time}}</span>
                </p>
                <div class="img_body">
                  <p class="title">{{item.title}}</p>
                  <img :src="item.url" class="imgs">
                  <p class="content">
                    {{item.content}}
                  </p>
                </div>
                <!--<p class="img_bottom">
                   <span><i class="el-icon-edit" @click="_routeTo('generalArticle',{id:item.id})"></i></span>
                  <span><i class="el-icon-delete" @click="handleDeleteArticle(item.id,'articleId')"></i></span>
                </p>-->
                <!-- <div ref="operate" class="operate">
                  <i class="el-icon-view" @click="_routeTo('generalArticle',{id:item.id})"> 预览文章</i>
                </div> -->
              </div>
          </div>
        </div>
        <p class="pages">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total*1"
            class="page_nav">
            </el-pagination>
        </p>
      </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogSyncImage",
  components: {DialogBase},
  data() {
    return {
      checkedAll:false,
      checked:false,
      list:[],
      currentPage:1,
      pageSize:10,
      total:0,
    }
  },
  props: {
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  computed: {
    visible: {
      get() {
          return this.dialogVisible
      },
      set(val) {
          this.$emit('update:dialogVisible', val)
      }
    }
  },
  created(){
    this.getList()
  },
  methods: {
    //获取微信图片列表
    getList(){
      let query ={
        startIndex:this.currentPage,
      }
      this._apis.file.getWxArticle(query).then((response)=>{
        this.list = []
        response.item.map(item => {
          let data = Object.assign({checked:false}, item)
          this.list.push(data)
        })
        this.total = response.total
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
    submit() {
      let datas = []
      this.list.map(item =>{
        if(item.checked == true){
          let obj = {
            cid:this.$store.getters.user.cid,
            mediaId:item.mediaId,
            sourceMaterialType:'1',
            title:'',
            sourceMaterial:'',
            isCover:'',
            fileCover:''
          }
          datas.push(obj)
        }        
      })
      let query = {
        fileGroupInfoId:'-1',
        data:datas
      }
      this._apis.file.syncMaterial(query).then((response)=>{
        this.$notify.success({
          title: '成功',
          message: '同步微信图文成功！'
        });
        this.$emit('submit',{syncImage:''})
      }).catch((error)=>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },
  /**********************************        分页相关      **********************/
    handleSizeChange(val){
      this.pageSize = val || this.pageSize
      this.getList()
    },
    handleCurrentChange(pIndex){
      this.currentPage = pIndex || this.currentPage
      this.getList()
    },

    /**********************************        全选相关      **********************/
    allChecked(val){
      if(val){
        this.list.map(item =>{
          item.checked = true
          return this.list
        })
      }else{
        this.list.map(item =>{
          item.checked = false
          return this.list
        })
      }
    },
    handleChecked(val){
      if(val){
        this.checkedAll = this.list.every(item => {
          return item.checked == true
        })
      }else{
        this.checkedAll = false
      }
    },

  },
}
</script>

<style lang="scss" scoped>
// .content{
//   line-height: 30px;
//   font-size: 14px;
//   color: #443D4A;
//   // text-align: center;
// }
.list_main{
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  .list_img{
    display: flex;
    flex-flow: row wrap;
    .item_img{
      width: 250px;
      border: 1px solid #e6e6e6;
      position: relative;
      margin:0px 30px 50px 0px;
      .img_head{
        height: 25px;
        line-height: 25px;
        padding: 0 10px;
        border-bottom: 1px solid #e6e6e6;
        display: flex;
        flex: 1;
        justify-content: space-between;
        span{
          font-size: 14px;
          color: #92929B;
        }
      }
      .img_body{
        width:100%;
        padding:10px 10px;
        font-size: 14px;
        color: #44434B;
        .title{
          height: 25px;
          line-height: 25px;
        }
        .imgs{
          width: 100%;
          height:85px;
        }
        .content{
          line-height: 20px;
          height: 60px;
          overflow: hidden;
        }
      }
      .img_bottom{
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
        span{
          width: 50%;
          display: inline-block;
          background: #DDDDDD;
          text-align: center;
          color: #fff;
          cursor: pointer;
        }
        span:nth-of-type(2){
          border-left:1px solid #fff;
        }
      }
      .operate{
        width: 100%;
        height: 218px;
        position: absolute;
        top:0;
        left:0;
        z-index: 2;
        background-color:rgba(0,0,0,0.2);
        padding: 90px 0px 0px 80px;
        color: #fff;
        cursor: pointer;
        display:none;
      }
    }
  }
}
.pages{
  width: 100%;
  margin-top: 50px;
  text-align: right;
  .page_nav{
    display: inline-block;
  }
}
</style>
