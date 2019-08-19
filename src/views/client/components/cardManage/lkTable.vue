/* cardManage 领卡记录列表 */
<template>
  <div>
    <el-table
      :data="lklist"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="name"
        label="会员卡名称">
      </el-table-column>
      <el-table-column
        prop="enable"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="cardSn"
        label="卡号">
      </el-table-column>
      <el-table-column
        prop="memberInfoId"
        label="领取人ID"
      >
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="领取时间"
      >
      </el-table-column>
      <el-table-column
        prop="receiveWay"
        label="获取方式"
      >
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="发放人"
      >
      </el-table-column>
    </el-table>
    <div class="page_styles">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="sizes, prev, pager, next"
        :total="100">
      </el-pagination>
    </div>
  </div>
</template>

<script type='es6'>
import TableBase from "@/components/TableBase";
export default {
  name: "lkTable",
  extends: TableBase,
  props: ['lkParams'],
  data() {
    return {
      lklist:[],
    };
  },
  created() {

  },
  methods: {
    getLkList(startIndex, pageSize) {
      let params = {};
      if(Object.keys(this.lkParams).length == 0) {
        params = {
          startIndex: startIndex || 1,
          pageSize: pageSize || 10,
        }
      }else{
        params = Object.assign({}, this.lkParams);
        params.startIndex = startIndex;
        params.pageSize = pageSize;
      }
      this._apis.client.getLkList(params).then((response) => {
        this.lklist = [].concat(response.list);
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    }
  },
  mounted() {
    this.getLkList(1,10);
  },
  components: {},
  watch: {
    lkParams() {
      this.getLkList(1,10);
    }
  }
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell{
            .btns{
                span{
                    color: #655EFF;
                    margin-right: 5px;
                }
            }
        }

</style>
