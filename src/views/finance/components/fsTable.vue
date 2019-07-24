/* 电子面单列表 */
<template>
  <div>
    <el-table
      :data="dataList"
      style="width: 100%"
      :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="expressSn"
        label="快递单号">
      </el-table-column>
      <el-table-column
        prop="expressCompany"
        label="快递公司">
      </el-table-column>
      <el-table-column
        prop="businessType"
        label="业务类型">
      </el-table-column>
      <el-table-column
        prop="relationSn"
        label="关联单据编号">
      </el-table-column>
      <el-table-column
        prop="createUserName"
        label="操作人">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="操作时间"
        sortable>
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
  name: "reTable",
  extends: TableBase,
  data() {
    return {
      dataList:[
        {
          expressSn:'1213',
          expressCompany:'中通',
          businessType:'1',
          relationSn:'232323',
          createUserName:'张三',
          createTime:'2019-07-22'
        }
      ],
    };
  },
  created() {

  },
  methods: {
    
  },
  components: {}
};
</script>
