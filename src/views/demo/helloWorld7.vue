<template>
  <div class="hello">
    <h1>{{ msg }}</h1>


    <!-- 接口数据请求demo -->
    <el-card>
      <h1>接口数据请求demo</h1>
      <div v-for="(item, key) of data" :key="key">
        {{item.addressDetail}}
      </div>
    </el-card>
  </div>
</template>

<script>
// import Websocket from "@/system/websocket.js";
export default {
  name: 'HelloWorld7',
  data () {
    return {
      msg: '中企电商VUE框架',
      data: null
    }
  },

  created() {
    this.fetch();
  },

  methods:{
    fetch() {
      const _self = this;

      //获取列表demo
      this._apis.demo.getList({}).then((response)=>{
        this.data = response;
      }).catch((error)=>{
        this.$message.error(error);
      })

      //获取详情demo
      this._apis.demo2.getDemoDetail({id: 644}).then((response)=>{
        this.data = response;
      }).catch((error)=>{
        this.$message.error(error);
      })

      //长连接demo
      // this.demoWebsocket = new Websocket({
      //   type: "websocket1",
      //   callbacks: {
      //     onopen: () => {
      //     },
      //     onclose: () => {
      //     },
      //     onmessage: (error, res) => {
      //       if (!error) {
      //         if (!res || !(res instanceof Object)) {
      //           console.error("数据格式错误");
      //           return;
      //         }
      //       } else {
      //         console.error(res);
      //         _self.$notify.error({
      //           title: "错误",
      //           message: res
      //         });
      //       }
      //     }
      //   }
      // });
    }
  }
}
</script>

<style lang="scss" scoped>
.hello{
      text-align: center;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.el-card{
  margin-bottom:20px;
}
.line-container::after{
  left:1em;
}
</style>
