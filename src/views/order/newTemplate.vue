<template>
  <div class="new-template">
    <section>
      <div class="title">基础信息设置</div>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="模板名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入，不超过20个字符"></el-input>
          </el-form-item>
          <el-form-item label="计费方式" prop="mode">
            <el-radio v-model="ruleForm.mode" label="1">按件计费</el-radio>
            <el-radio v-model="ruleForm.mode" label="2">按重计费</el-radio>
            <el-radio v-model="ruleForm.mode" label="3">按体积计费</el-radio>
          </el-form-item>
        </el-form>
      </div>
    </section>
    <section class="regional-setting">
        <div class="title">区域设置</div>
        <div class="content">
            <div class="content-item">
              <div class="content-item-title">
                <div class="row justify-between">
                  <div class="col">
                    <span>配送区域</span>
                    <span class="des">说明：除指定区域外，其余区域按默认计算。</span>
                  </div>
                  <div class="col blue">为指定区域设置运费</div>
                </div>
              </div>
              <div>
                <el-table
                  :data="tableData"
                  border
                  :header-cell-style="{background:'#f3f4f3', color:'#132215'}"
                  style="width: 100%">
                  <el-table-column
                    prop="address"
                    label="配送到"
                    width="180">
                  </el-table-column>
                  <el-table-column
                    label="首件"
                    width="180">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.first"></el-input> 件或以内
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="运费（元）">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.freight"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="续件"
                    width="180">
                    <template slot-scope="scope">
                      每增加<el-input v-model="scope.row.increaseNumber"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="续费（元）"
                    width="180">
                    <template slot-scope="scope">
                      运费增加<el-input v-model="scope.row.increasePrice"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                      <span v-if="scope.$index != 0" class="blue">删除</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="content-item">
              <div class="content-item-title">
                <div class="row">
                  <div class="col">不配送区域</div>
                  <div class="col no-distribution-box">
                    <el-radio v-model="noDistribution" label="1">无</el-radio>
                    <el-radio v-model="noDistribution" label="2">有</el-radio>
                  </div>
                </div>
              </div>
              <div class="no-distribution-list">
                <div class="row">
                  <div class="col no-distribution-item" v-for="(item, index) in noDistributionList" :key="index">
                    <span>{{item}}</span>, <span @click="deleteItem(index)" class="delete-item">删除</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="footer">
          <el-button>取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
    </section>
  </div>
</template>
<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '',
                mode: '1'
            },
            noDistribution: '',
            noDistributionList: [
              '新建', '内蒙'
            ],
            rules: {
                
            },
            tableData: [
              {
                address: '默认运费（全国）',
                first: 1,
                freight: 10,
                increaseNumber: 1,
                increasePrice: 10
              }
            ]
        }
    },
    methods: {
      deleteItem(index) {
        this.noDistributionList.splice(index, 1)
      }
    }
};
</script>
<style lang="scss" scoped>
.new-template {
  section {
    padding: 20px;
    background-color: #fff;
    .title {
        margin-bottom: 20px;
        font-size: 16px;
    }
    &.regional-setting {
        margin-top: 20px;
        .content {
            margin-left: 60px;
            .content-item {
              &:last-child {
                margin-top: 40px;
                .no-distribution-box {
                  margin-left: 20px;
                }
                .no-distribution-list {
                  border-radius:4px;
                  border:1px solid rgba(202,207,203,1);
                  min-height: 180px;
                  padding: 10px;
                  .no-distribution-item {
                    margin-right: 40px;
                    .delete-item {
                      color: $globalMainColor;
                      cursor: pointer;
                    }
                  }
                }
              }
              .content-item-title {
                font-size: 16px;
                color: #161617;
                margin-bottom: 18px;
                .des {
                  color: #9FA29F;
                  font-size: 14px;
                  margin-left: 20px;
                }
              }
            }
        }
        .footer {
          text-align: center;
          margin-top: 30px;
        }
        /deep/ .el-input {
          width: 62px;
          margin-right: 10px;
          margin-left: 10px;
        }
    }
  }
}
/deep/ .el-input {
    width: auto;
}
</style>


