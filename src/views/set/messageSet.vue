/*消息设置 */
<template>
 <div class="main">
   <p class="title">买家通知</p>
      <!-- :span-method="objectSpanMethod" -->
    <el-table
      :data="tableData"
      border
      style="width: 100%;">
      <el-table-column
        prop="msgType"
        label="消息类别"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="msgTitle"
        label="消息标题">
      </el-table-column>
      <el-table-column
        prop="triggerRule"
        label="推送规则">
      </el-table-column>
      <el-table-column
        prop="msgWechatPublic"
        label="公众号模版消息"
        align="center">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.msgWechatPublic"
          @change="switchMessage(scope.row.id,scope.row.msgWechatPublic,scope.row.msgWechatApp,scope.row.msgSms)"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table>
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
            <el-link type="primary" slot="reference">预览</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="msgWechatApp"
        label="小程序模版消息"
        align="center">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.msgWechatApp"
          @change="switchMessage(scope.row.id,scope.row.msgWechatPublic,scope.row.msgWechatApp,scope.row.msgSms)"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table>
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
            <el-link type="primary" slot="reference">预览</el-link>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="msgSms"
        label="短信通知"
        align="center">
        <template slot-scope="scope">
          <el-switch
          v-model="scope.row.msgSms"
          @change="switchMessage(scope.row.id,scope.row.msgWechatPublic,scope.row.msgWechatApp,scope.row.msgSms)"
          active-color="#13ce66"
          inactive-color="#ff4949">
          </el-switch>
          <el-popover
            placement="right"
            width="400"
            trigger="click">
            <el-table>
              <el-table-column width="150" property="date" label="日期"></el-table-column>
              <el-table-column width="100" property="name" label="姓名"></el-table-column>
              <el-table-column width="300" property="address" label="地址"></el-table-column>
            </el-table>
            <el-link type="primary" slot="reference">预览</el-link>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
  </div>     
</template>

<script>
import buyer from "./components/buyer";
import seller from "./components/seller";
export default {
  name: 'messageSet',
  data() {
    return {
      tableData: [],
    }
  },
  components: {buyer, seller},
  watch: {
    
  },
  created() {
    this.getShopMessage()
  },
  methods: {
    getShopMessage(){
      this._apis.set.getShopMessage().then(response =>{
        this.tableData = []
        response.map(item => {
          item.msgWechatPublic = item.msgWechatPublic == 0 ? false : true
          item.msgWechatApp = item.msgWechatApp == 0 ? false : true
          item.msgSms = item.msgSms == 0 ? false : true
          this.tableData.push(item)
        })
      }).catch(error =>{
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    },

    switchMessage(id,publics,app,sms){
      let query = {
        id:id,
        msgWechatPublic: publics == false ? 0 : 1,
        msgWechatApp: app == false ? 0 : 1,
        msgSms: sms == false ? 0 : 1
      }
      this.$msgbox({
        title: '确认提示',
        message: '确认要进行此项操作吗？',
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this._apis.set.setShopMessage(query).then(response =>{
          this.$message({
            type: 'success',
            message: '操作成功！'
          });
          this.getShopMessage()
        }).catch(error =>{
          this.$notify.error({
            title: '错误',
            message: error
          });
        })        
      })
    },

    handleClick(comp) {
      this.currentTab = comp.name;
    },

    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0) {
        if (rowIndex % 2 === 0) {
        return {
          rowspan: 2,
          colspan: 1
        };
        } else {
          return {
              rowspan: 0,
              colspan: 0
          };
        }
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs{
  background:#fff; 
  padding:10px 20px;
}
.main{
  width: 100%;
  padding: 20px;
  background: #fff;
}
.title{
  height: 60px;
  line-height: 60px;
}
</style>