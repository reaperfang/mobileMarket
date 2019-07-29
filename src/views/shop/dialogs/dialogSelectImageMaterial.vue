<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择图片'">
    <div class="material_wrapper">
        <vue-waterfall-easy :imgsArr="imgsArr" @scrollReachBottom="getData" :maxCols="3" @click="clickFn"></vue-waterfall-easy>
    </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
import vueWaterfallEasy from 'vue-waterfall-easy'
export default {
  name: "dialogSelectImageMaterial",
  components: {DialogBase, vueWaterfallEasy},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      selectedItem: null,
      imgsArr: [],
    };
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
  created() {
    setTimeout(() =>{
       this.imgsArr = [
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229835398&di=f35f6f00777401d5730264a0439f14d1&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F8a4d724c08e2c0b3ba7cac66a034282ef4687b5522d93-Ju140H_fw658',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229836311&di=290d55f87a8d37bb02e455dda9bbe2ef&imgtype=0&src=http%3A%2F%2Fpic21.nipic.com%2F20120524%2F3279059_162841695000_2.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564824603&di=76d095a4f97b22e770e62a13a3676967&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20150313%2Fpenjianshuicaichuangyibeijing_3933054.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229883528&di=4ec0e86b13a2c8fee35bb25ac758edb2&imgtype=0&src=http%3A%2F%2Fi6.hexunimg.cn%2F2014-06-13%2F165651125.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229883526&di=e8b177a716982285ad0bc43b038e3801&imgtype=0&src=http%3A%2F%2Fpic9.nipic.com%2F20100913%2F4652065_140247055894_2.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229883525&di=ba342429f3be8dd35c44831e1206e1b4&imgtype=0&src=http%3A%2F%2Fimg01.tooopen.com%2FDowns%2Fimages%2F2010%2F4%2F20%2Fsy_20100420175911204047.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229883523&di=dcc5de9cdadba3c24b54fd9e0d84416d&imgtype=0&src=http%3A%2F%2Fimg3.redocn.com%2Ftupian%2F20140715%2Fheisepaochechuangyihaibaosheji_2735041.jpg',
           title: '图片名称'
         },
         {
           href: 'http://www.baidu.com',
           src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564229947039&di=6a1e44ec8912f1925109007ea5a25b41&imgtype=0&src=http%3A%2F%2Fimg.juimg.com%2Ftuku%2Fyulantu%2F110320%2F1781-1103200S04279.jpg',
           title: '图片名称'
         },
       ]
    },500)
  },
  methods: {

    /* 加载数据 */
    getData() {

    },

    clickFn(event, { index, value }) {
        // 阻止a标签跳转
        event.preventDefault()
        // 只有当点击到图片时才进行操作
        if (event.target.tagName.toLowerCase() == 'img') {
          this.selectedItem = value;
        }
      }
  }
};
</script>

<style lang="scss">
.material_wrapper{
  height:600px;
}
</style>