<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择视频'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-select v-model="ruleForm.group" placeholder="">
            <el-option label="全部" :value="1"></el-option>
            <el-option label="文章配图" :value="2"></el-option>
            <el-option label="封面配图" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入视频名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <ul class="tile-list n3 video_list" v-if="videoList.length" ref="videoList">
      <li v-for="(item, key) of videoList" :key="key" class="cell-item" @click="selectVideo($event, item)">
        <div class="video_head">
          <span>{{item.createTime}}</span>
          <span>{{item.size + 'MB'}}</span>
        </div>
        <div class="video_body">
          <p>{{item.title}}</p>
          <img :src="item.videoUrl" alt="">
        </div>
      </li>
    </ul>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import utils from "@/utils";
import uuid from 'uuid/v4';
export default {
  name: "dialogSelectVideo",
  components: {DialogBase},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
  },
  data() {
    return {
      videoList: [],
      ruleForm: {
        name: '',
        group: 1
      },
      rules: {},
      selectedItem: null  //选中的视频
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
    this.fetch();
  },
  mounted() {
  },
  methods: {
    fetch() {
      this.videoList = [
         {
          id: uuid(),
          videoUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: '美丽的天空之境',
          desc: '这是商品描述',
          createTime: '08-23',
          size: 20
        },
        {
          id: uuid(),
          videoUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3145803195,449702013&fm=26&gp=0.jpg',
          title: '美丽的天空之境2',
          desc: '这是商品描述2',
          createTime: '08-23',
          size: 37
        },
        {
          id: uuid(),
          videoUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564572685339&di=ff049acfab811f03c18bdd703062a3b1&imgtype=0&src=http%3A%2F%2Fpic167.nipic.com%2Ffile%2F20180531%2F26934386_161955347000_2.jpg',
          title: '美丽的天空之境3',
          desc: '这是商品描述2',
          createTime: '08-23',
          size: 78
        }
      ]
    },

    /* 选中视频 */
    selectVideo(event, item) {
      this.selectedItem = item;

      const videos = this.$refs.videoList.querySelectorAll('.cell-item');
      for(let dom of videos) {
        dom.className = 'cell-item';
      };
      event.currentTarget.className = 'cell-item video_active';
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('videoSelected',  this.selectedItem);
    },
  }
};
</script>

<style lang="scss">
ul.video_list{
  li{
    border: 1px solid #ddd;
    cursor:pointer;
    &.video_active{
      border: 2px dashed $globalMainColor!important;
    }
  }
}
.video_head{
    display: flex;
    flex-direction: row;
    // justify-content: space-between;
    padding:5px 20px;
}
.video_body{
  border-top: 1px solid #ddd;
  p{
    text-align:left;
    padding:5px 20px;
  }
  img{
    width: 100%;
    padding: 20px;
    padding-top: 0;
  }
}
</style>