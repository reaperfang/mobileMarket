/* 批量导入客户列表 */
<template>
  <div>
    <el-table
      :data="importList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        type="selection"
        prop="choose"
        label="选择">
      </el-table-column>
      <el-table-column
        prop="importTime"
        label="导入时间">
      </el-table-column>
      <el-table-column
        prop="channerlName"
        label="渠道">
      </el-table-column>
      <el-table-column
        prop="totalNum"
        label="导入数量">
      </el-table-column>
      <el-table-column
        prop="successNum"
        label="导入成功数"
      >
      </el-table-column>
      <el-table-column
        prop="failNum"
        label="导入失败数"
      >
      </el-table-column>
      <el-table-column
        prop="operatorId"
        label="操作人"
      >
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
            <div class="btns clearfix">
                <span>添加标签</span>
                <span>修改身份等级</span>
            </div>
        </template>
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
import clientApi from "@/api/client";
export default {
  name: "ciTable",
  extends: TableBase,
  props: [ 'params' ],
  data() {
    return {
      importList: []
    };
  },
  computed: {
    
  },
  mounted() {
    this.getImportList();
  },
  created() {

  },
  methods: {
    getImportList() {
      this._apis.client.importMemberList(this.params).then((response) => {
        console.log(response);
        this.importList = [].concat(response.list);
      }).catch((error) => {
        this.$notify.error({
          title: '错误',
          message: error
        });
      })
    }
  },
  watch: {
    params(val) {
      this.getImportList();
    }
  },
  components: {}
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/ .cell{
            .btns{
                span{
                    color: #655EFF;
                    margin-right: 5px;
                    cursor: pointer;
                }
            }
        }

</style>
