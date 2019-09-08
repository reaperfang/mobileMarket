<template>
  <div class="electronic-face-sheet">
    <section class="search">
      <el-form :inline="true" :model="formInline" class="form-inline">
        <div class="row justify-between">
          <div class="col">
            <el-form-item label="电子面单名称">
              <el-input v-model="listQuery.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="listQuery.time"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                value-format="yyyy-MM-dd hh:mm:ss"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="col">
            <el-form-item>
              <span @click="resetForm('formInline')" class="orange resetting pointer">重置</span>
              <el-button type="primary" @click="onSubmit">搜 索</el-button>
            </el-form-item>
          </div>
        </div>
        <div>
          <el-button @click="$router.push('/order/newElectronicFaceSheet')" class="border-button">新建</el-button>
        </div>
      </el-form>
    </section>
    <section class="table-box">
      <div class="table-title">
        全部
        <span>{{total}}</span>项
      </div>
      <div class="table">
        <el-table
          v-loading="loading"
          :data="tableData"
          style="width: 100%"
          :header-cell-style="{background:'#ebeafa', color:'#655EFF'}"
        >
          <el-table-column prop="name" label="电子面单名称" width="180"></el-table-column>
          <el-table-column prop="expressCompany" label="快递公司" width="180"></el-table-column>
          <el-table-column prop="updateTime" sortable label="编辑时间"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <div class="operate-box">
                <span @click="$router.push('/order/newElectronicFaceSheet?id=' + scope.row.expressCompanyCode + '&detail=' + true)">查看</span>
                <span @click="$router.push('/order/newElectronicFaceSheet?id=' + scope.row.id + '&expressCompanyCode=' + scope.row.expressCompanyCode)">修改</span>
                <span @click="deleteElectronicFaceSheet(scope.row)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="listQuery.startIndex"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
    </section>
  </div>
</template>
<script>
import Pagination from "@/components/Pagination";

export default {
  data() {
    return {
      formInline: {
        name: "",
        time: ""
      },
      total: 0,
      tableData: [],
      listQuery: {
        startIndex: 1,
        pageSize: 20,
        time: '',
        name: '',
        startTime: '',
        endTime: ''
      },
      loading: false
    };
  },
  created() {
    this.getList();
  },
  methods: {
    resetForm(formName) {
          this.listQuery = Object.assign({}, this.listQuery, {
            time: '',
            name: '',
            startTime: '',
            endTime: ''
          })
      },
    deleteElectronicFaceSheet(row) {
      this.confirm({title: '提示', text: '删除后无法撤销，确定删除吗？'}).then(() => {
          this._apis.order.deleteElectronicFaceSheet({id: row.id, expressCompanyCode: row.expressCompanyCode}).then((res) => {
              this.getList()
              this.$notify({
                  title: '成功',
                  message: '删除成功！',
                  type: 'success'
              });
          }).catch(error => {
              this.visible = false
              this.$notify.error({
                  title: '错误',
                  message: error
              });
          })
      })
    },
    onSubmit() {
      this.getList()
    },
    getList() {
      this.loading = true
      this._apis.order
        .fetchElectronicFaceSheetList(Object.assign({}, this.listQuery, {
          startTime: this.listQuery.time ? this.listQuery.time[0] : '',
          endTime: this.listQuery.time ? this.listQuery.time[1] : '',
        }))
        .then(res => {
          this.total = +res.total
          this.tableData = res.list
          this.$notify({
            title: "成功",
            message: "查询成功！",
            type: "success"
          });
          this.loading = false
        })
        .catch(error => {
          this.visible = false;
          this.$notify.error({
            title: "错误",
            message: error
          });
          this.loading = false
        });
    }
  },
  components: {
    Pagination
  }
};
</script>
<style lang="scss" scoped>
.electronic-face-sheet {
  section {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    &.search {
      .resetting {
        margin-right: 7px;
      }
    }
  }
}
</style>


