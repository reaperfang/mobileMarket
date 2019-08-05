<template>
  <div class="electronic-face-sheet">
    <section class="search">
      <el-form :inline="true" :model="formInline" class="form-inline">
        <div class="row justify-between">
          <div class="col">
            <el-form-item label="电子面单名称">
              <el-input v-model="formInline.name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <el-date-picker
                v-model="formInline.time"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              ></el-date-picker>
            </el-form-item>
          </div>
          <div class="col">
              <el-form-item>
                <span class="orange resetting">重置</span>
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
        <div class="table-title">已选择  项，全部<span>{{total}}</span>项</div>
        <div class="table">
            <el-table
                :data="tableData"
                style="width: 100%"
                :header-cell-style="{background:'#ebeafa', color:'#655EFF'}">
                <el-table-column
                    prop="name"
                    label="电子面单名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="expressCompany"
                    label="快递公司"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="time"
                    sortable
                    label="编辑时间">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <div class="operate-box">
                            <span @click="$router.push('/order/newElectronicFaceSheet')">查看</span>
                            <span @click="$router.push('/order/newElectronicFaceSheet')">修改</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
        </div>
    </section>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'

export default {
  data() {
    return {
      formInline: {
        name: "",
        time: ""
      },
      total: 0,
      tableData: [
          {}
      ],
      listQuery: {
            page: 1,
            limit: 20,
        },
    };
  },
  methods: {
      getList() {

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


