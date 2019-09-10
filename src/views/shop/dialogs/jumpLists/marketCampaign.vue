<template>
  <div>
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="0" :inline="true">
          <div class="inline-head">
            <el-form-item label="" prop="name">
              <el-select v-if="activities.length" v-model="ruleForm.activitieId" placeholder="请选择活动类型">
                <el-option label="全部类型" value=""></el-option>
                <el-option v-for="(item, key) of activities" :key="key" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="" prop="name">
              <el-input v-model="ruleForm.name" placeholder="请输入活动名称"></el-input>
            </el-form-item>
            <el-form-item label="" prop="">
              <el-button type="primary" @click="fetch">搜  索</el-button>
            </el-form-item>
          </div>
        </el-form>
        <el-table :data="tableData[currentTab]" stripe ref="multipleTable" @selection-change="handleSelectionChange" @row-click="rowClick" v-loading="loading">
          <el-table-column prop="" label="选择" :width="50">
            <template slot-scope="scope">
              <el-checkbox v-model="scope.row.active" @change="seletedChange(scope.row, scope.row.active)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column prop="activityName" label="活动名称"></el-table-column>
          <el-table-column prop="activityType" label="活动类型"></el-table-column>
          <el-table-column prop="visitor" label="访客数"></el-table-column>
          <el-table-column prop="browse" label="浏览数"></el-table-column>
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
  </div>
</template>

<script>
import tableBase from '@/components/TableBase';
export default {
  name: "marketCampaign",
  extends: tableBase,
  components: {},
  props: {
     
  },
  data() {
    return {
      ruleForm: {
        name: '',
        activitieId: ''
      },
      rules: {},
      activities: [],
      tableData: [],
    };
  },
  created() {
    this.getActivitiesList();
    this.fetch();
  },
  methods: {
    getActivitiesList() {
      this.activities = [
        {
          id: '1111',
          name: '优惠券'
        },
        {
          id: '2222',
          name: '限时折扣'
        },
        {
          id: '3333',
          name: '优惠套装'
        },
        {
          id: '4444',
          name: '多人拼团'
        },
        {
          id: '5555',
          name: '秒杀'
        }
      ];
      // this._apis.shop.getActivitiesList(this.ruleForm).then((response)=>{
        // this.activities = response.list;
      // }).catch((error)=>{
      //   this.$notify.error({
      //     title: '错误',
      //     message: error
      //   });
      // });
    },

    fetch() {

    },


    /* 选中改变 */
    seletedChange(data, state) {

      /* 更改列表选中状态 */
      const tempList = [...this.tableData];
      for(let item of tempList) {
        if(item.id !== data.id) {
          item.active = !state;
        }
      }
      this.tableData = tempList;

      /* 向父组件发送选中的数据 */
      this.$emit('seletedRow',  {
        pageType: 'marketCampaign',
        data: {
          id: data.id,
          name: data.name,
          title: data.title
        }
      });
    }

  }
};
</script>

<style lang="scss">
.inline-head{
  justify-content: flex-end;
}
</style>