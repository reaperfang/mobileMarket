<template>
  <DialogBase :visible.sync="visible" width="600px" :title="'图片裁剪'" @submit="submit">
    <div class="cropper-content">
       <el-button @click="finish">裁剪</el-button>
      <div class="cropper" style="text-align:center;margin:10px 0;">
        <vueCropper
          ref="cropper"
          :img="option.img"
          :outputSize="option.size"
          :outputType="option.outputType"
          :info="true"
          :full="option.full"
          :canMove="option.canMove"
          :canMoveBox="option.canMoveBox"
          :original="option.original"
          :autoCrop="option.autoCrop"
          :fixed="option.fixed"
          :fixedNumber="option.fixedNumber"
          :centerBox="option.centerBox"
          :infoTrue="option.infoTrue"
          :fixedBox="option.fixedBox"
        ></vueCropper>
      </div>
    </div>
    <el-form ref="form" :model="form" label-width="100px">
      <el-form-item label="裁剪尺寸：">
          <el-select v-model="sizeNum" placeholder="请选择">
          <el-option
            v-for="item in groupList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </DialogBase>
</template>

<script>
import { VueCropper }  from 'vue-cropper'
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
export default {
  name: "dialogImageTailor",
  components: {DialogBase,VueCropper},
  props: {
      data:{},
      arrayData: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      form:{},
      sizeNum:'1',
      groupList:[
        {
          label:'800*800',
          value:'1'
        },
        {
          label:'800*640',
          value:'2'
        },
        {
          label:'640*800',
          value:'3'
        },
        {
          label:'582*166',
          value:'4'
        }
      ],


      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: false, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: true, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [7, 5], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: false, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [],  //页面显示的数组
      // 防止重复提交
      loading: false
    }
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
  // watch:{
  //   sizeNum(){
  //     this.groupList.map(item =>{
  //       if(item.value == this.sizeNum){
  //         let arr = item.label.split('*')
  //         this.option.autoCropWidth = arr[0]
  //         this.option.autoCropHeight = arr[1]
  //       }
  //     })
  //   }
  // },
  created() {
    this.init()
  },
  methods: {
    init(){
      this.option.img = this.data
    },

    submit() {
      this.$emit('submit','')
    },    

     // 点击裁剪，这一步是可以拿到处理后的地址
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
        var fileName = 'tailor' +  Math.random()
        this.loading = true
       //上传服务器
        let formData = {}
        formData = Object.assign({file:data},{json:JSON.stringify({cid: 222})})
        // console.log('data',data)
        // formData.append("file", data, fileName);
        // formData.append("json",JSON.stringify({cid: 222}));
        this._apis.set.uploadImage(formData).then(response =>{
          console.log('999999',response)
          
        }).catch(error =>{

        })
      })
    }

    //上传图片（点击上传按钮）
    // finish(type) { 
    //   console.log('finish')
    //   let _this = this;
    //   let formData = new FormData();
    //   // 输出 
    //   if (type === 'blob') { 
    //     this.$refs.cropper.getCropBlob((data) => { 
    //       let img = window.URL.createObjectURL(data) 
    //       this.model = true; 
    //       this.modelSrc = img; 
    //       formData.append("file", data, this.fileName);
    //       formData.append("json",JSON.stringify({cid: 222}));
    //       // formData = Object.assign(formData,{cid: 222})
    //     this._apis.set.uploadImage(formData).then(response =>{
    //         console.log('999999',response)
            
    //       }).catch(error =>{

    //       })
    //     }) 
    //   } else { 
    //     this.$refs.cropper.getCropData((data) => { 
    //       this.model = true; 
    //       this.modelSrc = data; 
    //     }) 
    //   } 
    // }, 

  }
};
</script>

<style>

</style>


<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: space-between;
}
.w250{
  width: 250px;
}
//圆形图片
.info {
    width: 720px;
    margin: 0 auto;
    .oper-dv {
      height:20px;
      text-align:right;
      margin-right:100px;
      a {
        font-weight: 500;
        &:last-child {
          margin-left: 30px;
        }
      }
    }
    .info-item {
      margin-top: 15px;
      label {
        display: inline-block;
        width: 100px;
        text-align: right;
      }
      .sel-img-dv {
        position: relative;
        .sel-file {
          position: absolute;
          width: 90px;
          height: 30px;
          opacity: 0;
          cursor: pointer;
          z-index: 2;
        }
        .sel-btn {
          position: absolute;
          cursor: pointer;
          z-index: 1;
        }
      }
    }
  }

 .cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
  .upload{
    width: 80px;
    height: 35px;
    border-radius: 5px;
  }
</style>