/* 选择优惠券弹框 */
<template>
  <DialogBase :visible.sync="visible" width="816px" :title="'选择优惠券'" @submit="submit">
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
      <div class="inline-head">
        <el-form-item label="" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入优惠券名称" clearable></el-input>
        </el-form-item>
        <el-form-item label="" prop="name">
          <el-button type="primary" @click="fetch">搜  索</el-button>
        </el-form-item>
      </div>
    </el-form>
    <el-table :data="tableList" stripe ref="multipleTable" @selection-change="handleSelectionChange" v-loading="loading" :row-key="getRowKey">
        <el-table-column
          type="selection"
          :selectable="itemSelectable"
          :reserve-selection="true"
          width="55">
        </el-table-column>
        <el-table-column prop="name" label="优惠券名称"></el-table-column>
        <el-table-column prop="goodsType" label="适用商品">
           <template slot-scope="scope">
            {{scope.row.goodsType === 0 ? '全部' : '指定商品'}} 
          </template>
        </el-table-column>  <!-- 0是全部  1是指定商品 -->
        <el-table-column prop="" label="优惠内容">
          <template slot-scope="scope">
            <span v-if="scope.row.useCondition > -1">满{{scope.row.useCondition}},减{{scope.row.useTypeFullcut}}</span>
            <span v-else>减{{scope.row.useTypeFullcut}}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="receiveLimitCount" label="领取人限制"></el-table-column> -->
        <el-table-column prop="receiveLimitCount" label="限领次数">
           <template slot-scope="scope">
            {{scope.row.receiveLimitCount >-1 ? scope.row.receiveLimitCount : '无限制'}}
          </template>
        </el-table-column>
        <el-table-column prop="remainStock" label="剩余库存"></el-table-column>
        <el-table-column prop="status" label="状态">  <!-- 0是未生效  1是生效中 2是已失效-->
           <template slot-scope="scope">
            <span v-if="scope.row.status === 0">未生效</span>
            <span v-else-if="scope.row.status === 1">生效中</span>
            <span v-else-if="scope.row.status === 2">已失效</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="Number(startIndex) || 1"
          :page-sizes="[5, 10, 20, 50, 100, 200, 500]"
          :page-size="pageSize*1"
          :total="total*1"
          layout="total, sizes, prev, pager, next, jumper"
          >
        </el-pagination>
      </div>
  </DialogBase>
</template>

<script>
import DialogBase from "@/components/DialogBase";
import tableBase from '@/components/TableBase';
import utils from "@/utils";
import uuid from 'uuid/v4';
export default {
  name: "dialogSelectCoupon",
  extends: tableBase,
  components: {DialogBase},
  props: {
      data: {},
      dialogVisible: {
          type: Boolean,
          required: true
      },
      goodsEcho: {
        type: Array,
        required: true
      }
  },
  data() {
    return {
      pageSize: 5,
      tableList: [],
      multipleSelection: [],
      pageNum: 1,
      ruleForm: {
        pageNum: 1,
        name: '',
        couponType: 0
      },
      rules: {}
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
    },
    goodsList: {
      get() {
          return this.goodsEcho
      },
      set(val) {
          this.$emit('update:goodsEcho', val)
      }
    }
  },
  created() {
    this.goodsList.forEach((row, index) => {
      this.$nextTick(() => {
        if(!row.fakeData) {  //假数据不允许添加选中状态
          this.$refs.multipleTable.toggleRowSelection(row, true);
        }
      })
    })
  },
  methods: {
    fetch() {
      this.loading = true;
      this._apis.shop.getCouponList(this.ruleForm).then((response)=>{
        this.tableList = response.list;
        this.total = response.total;
        this.loading = false;
      }).catch((error)=>{
        // this.$notify.error({
        //   title: '错误',
        //   message: error
        // });
        console.error(error);
        this.loading = false;
      });
    },

     //当前页码改变
    handleCurrentChange(pIndex=1) {
      this.loading = true
      this.pageNum = pIndex
      this.ruleForm.pageNum = pIndex
      this.fetch()
    },

    /* 向父组件提交选中的数据 */
    submit() {
      this.$emit('dialogDataSelected',  this.multipleSelection);
    },

    itemSelectable(row, index) {
      if(row.status !== 2) {
        return true;
      }
    },

    getRowKey(row) {
      return row.id
    }
  }
};
</script>

<style lang="scss" scoped>

</style>