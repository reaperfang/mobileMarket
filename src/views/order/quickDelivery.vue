<template>
  <div class="quick-delivery">
    <section class="operate">
      <div class="row justify-between operate-top">
        <div class="col">当前订单运费计费方式选择为</div>
        <div class="col">
          <span>您可以到交易设置中</span>
          <span class="change-mode">更改订单运费计费方式</span>
        </div>
      </div>
      <div class="radio-box">
        <el-radio v-model="mode" label="1">组合运费（推荐）</el-radio>
        <el-radio v-model="mode" label="2">按商品累加运费</el-radio>
        <span class="blue">计费规则说明</span>
      </div>
      <el-button @click="$router.push('/order/newTemplate')" class="border-button new-template">新建模板</el-button>
    </section>
    <section class="search">
      <el-form :inline="true" :model="formInline" class="form-inline">
        <div class="row justify-between">
          <div class="col">
            <el-form-item label="模板名称">
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
                    label="模板名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="mode"
                    label="计费方式"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="quantity"
                    label="应用商品数量">
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
                            <span>查看</span>
                            <span>复制</span>
                            <span>修改</span>
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
      mode: "1",
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
.quick-delivery {
  section {
    background-color: #fff;
    padding: 20px;
    margin-bottom: 20px;
    &.operate {
      .change-mode {
        color: $globalMainColor;
        margin-left: 10px;
      }
      .operate-top {
        margin-bottom: 10px;
      }
      .new-template {
        margin-top: 20px;
      }
    }
    &.search {
        .resetting {
            margin-right: 7px;
        }
    }
  }
}
</style>


