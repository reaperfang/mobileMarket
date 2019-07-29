<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择视频'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入视频名称"></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <ul class="tile-list n3" v-if="videoList.length">
      <li v-for="(item, key) of videoList" :key="key">
        <div class="video_head">
          <span>{{item.createTime}}</span>
          <span>{{item.size + 'MB'}}</span>
        </div>
        <div class="video_body">
          <p>{{item.title}}</p>
          <img :src="item.coverUrl" alt="">
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
        name: ''
      },
      rules: {},
      selectedVideo: null   //选中的视频
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
          coverUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: 'N元N件1',
          desc: '这是商品描述',
          createTime: '2019-08-23 12:44:23',
          size: 20
        },
        {
          id: uuid(),
          coverUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: 'N元N件2',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          size: 37
        },
        {
          id: uuid(),
          coverUrl: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1564155770253&di=f38112c9d66f6693432e18152abe5aa7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201203%2F05%2F20120305205212_MNNcA.jpeg',
          title: 'N元N件3',
          desc: '这是商品描述2',
          createTime: '2019-08-23 12:44:23',
          size: 78
        }
      ]
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('dialogDataSelected',  this.selectedVideo);
    },
  }
};
</script>

<style lang="scss">
.video_body{
  ul{
    li{
      border: 1px solid #ddd;
    }
  }
  img{
    width:100%;
  }
}
</style>