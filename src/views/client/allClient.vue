<!--全部客户-->
<template>
  <div>
    <div class="all_container">
        <div class="form_container">
            <el-form ref="form" :model="form">
                <el-row>
                    <el-col :span="4">
                        <el-form-item>
                            <el-select v-model="form.memberSn" placeholder="用户ID">
                                <el-option label="区域一" value="shanghai"></el-option>
                                <el-option label="区域二" value="beijing"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="6">
                        <el-form-item>
                            <el-input v-model="form.nickName" placeholder="昵称/姓名/手机号码/用户ID"><el-button slot="append" icon="el-icon-search"></el-button></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label="客户身份：">
                    <el-checkbox-group v-model="form.memberType">
                        <el-checkbox v-for="item in clientStatusOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="客户标签：" class="relaPosition">
                    <el-checkbox-group v-model="form.memberLabels">
                        <el-checkbox v-for="item in clientSignOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                    </el-checkbox-group>
                    <el-button type="primary" class="absoPosition">添 加</el-button>
                    <img src="../../assets/images/client/icon_down.png" alt="" class="down_img">
                </el-form-item>
                <el-form-item label="客户渠道：" class="relaPosition">
                    <el-checkbox-group v-model="form.channelId">
                        <el-checkbox v-for="item in clientChannelOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                    </el-checkbox-group>
                    <div class="more font12" @click="handleMore">更多查询条件<i class="el-icon-arrow-down"></i></div>
                </el-form-item>
                <div class="fold_part" v-if="showFold">
                    <el-form-item label="客户状态：">
                        <el-checkbox-group v-model="form.status">
                            <el-checkbox v-for="item in clientStateOps" :label="item" :key="item" border>{{item}}</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="积分：">
                                <div class="input_wrap">
                                    <el-input v-model="form.scoreMin" placeholder="最小值"></el-input>
                                </div>
                                <span>分</span>
                                <span>-</span>
                                <div class="input_wrap">
                                    <el-input v-model="form.scoreMax" placeholder="最大值"></el-input>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="累计消费金额：">
                                <div class="input_wrap">
                                    <el-input v-model="form.totalDealMoneyMin" placeholder="最小值"></el-input>
                                </div>
                                <span>分</span>
                                <span>-</span>
                                <div class="input_wrap">
                                    <el-input v-model="form.totalDealMoneyMax" placeholder="最大值"></el-input>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="6">
                            <el-form-item label="购买次数：">
                                <div class="input_wrap">
                                    <el-input v-model="form.dealTimesMin" placeholder="最小值"></el-input>
                                </div>
                                <span>分</span>
                                <span>-</span>
                                <div class="input_wrap">
                                    <el-input v-model="form.dealTimesMax" placeholder="最大值"></el-input>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="客单价：">
                                <div class="input_wrap">
                                    <el-input v-model="form.perUnitPriceMin" placeholder="最小值"></el-input>
                                </div>
                                <span>分</span>
                                <span>-</span>
                                <div class="input_wrap">
                                    <el-input v-model="form.perUnitPriceMax" placeholder="最大值"></el-input>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="注册时间：">
                                <div class="input_wrap2">
                                    <el-date-picker
                                        v-model="form.becameCustomerTimeStart"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <span>至</span>
                                <div class="input_wrap2">
                                    <el-date-picker
                                        v-model="form.becameCustomerTimeEnd"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label="上次消费时间：">
                                <div class="input_wrap2">
                                    <el-date-picker
                                        v-model="form.minLast"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <span>至</span>
                                <div class="input_wrap2">
                                    <el-date-picker
                                        v-model="form.maxLast"
                                        type="date"
                                        placeholder="选择日期">
                                    </el-date-picker>
                                </div>
                                <span>分</span>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
                <el-form-item class="padR40 marT20">
                    <span class="shou" @click="handleMore">收起<i class="el-icon-arrow-up marL10"></i></span>
                    <el-button class="fr marL20">重置</el-button>
                    <el-button type="primary" class="fr">查询</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div>
            <div class="btn_container">
                <el-button type="primary">导入</el-button>
                <el-button>导出</el-button>
            </div>
            <acTable></acTable>
        </div>
    </div>
  </div>
</template>
<script>
import clientCont from '@/system/constant/client';
import acTable from './components/acTable';
export default {
  name: 'allClient',
  components: { acTable },
  data() {
    return {
      form: {
            memberSn:"",
            nickName:"",
            memberType:['非会员客户'],
            memberLabels: ['年轻用户'],
            channelId: ['小程序'],
            status: ['正常'],
            scoreMin:"",
            scoreMax:"",
            totalDealMoneyMin:"",
            totalDealMoneyMax:"",
            dealTimesMin:"",
            dealTimesMax:"",
            perUnitPriceMin:"",
            perUnitPriceMax:"",
            becameCustomerTimeStart:"",
            becameCustomerTimeEnd:"",
            lastPayTimeStart:"",
            lastPayTimeEnd:""
        },
        showFold: true,
    }
  },
  watch: {

  },
  computed:{
    clientStatusOps() {
        return clientCont.clientStatusOps
    },
    clientSignOps() {
        return clientCont.clientSignOps
    },
    clientChannelOps() {
        return clientCont.clientChannelOps
    },
    clientStateOps() {
        return clientCont.clientStateOps
    }
  }, 
  created() {
    // window.addEventListener('hashchange', this.afterQRScan)
    
  },
  destroyed() {
    // window.removeEventListener('hashchange', this.afterQRScan)
  },
  methods: {
    handleMore() {
        this.showFold = !this.showFold;
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/deep/.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{
    display: none;
}
/deep/.el-checkbox.is-bordered.el-checkbox--small{
    padding: 5px 10px 5px 10px;
    background:rgba(211,211,211,0.3);
}
/deep/.el-checkbox__label{
    padding-left: 0;
}
/deep/.el-checkbox.is-bordered+.el-checkbox.is-bordered{
    margin-left: 0;
}
/deep/.el-checkbox.is-bordered.is-checked{
    background:rgba(101,94,255,0.1);
}
/deep/.el-form-item__label{
    color: #3D434A;
}
/deep/.el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 148px;
}
/deep/.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item{
    margin-bottom: 10px;
}
.el-input-group__append button.el-button{
    color: #5D78FF;
}
.all_container{
    padding: 19px;
    background-color: #fff;
    font-size: 14px;
    .form_container{
        .relaPosition{
            position: relative;
            .absoPosition{
                position: absolute;
                left: 612px;
                top: 0;
            }
            .down_img{
                position: absolute;
                left: 510px;
                top: 5px;
            }
            .more{
                cursor: pointer;
                color: #5B54E6;
                position: absolute;
                right: 40px;
                top: 0;
                i{
                    margin-left: 10px;
                }
            }
        }
        .fold_part{
            .input_wrap{
                display: inline-block;
                width: 100px;
            }
            .input_wrap2{
                display: inline-block;
                width: 150px;
            }
        }
        .shou{
            float: right;
            font-size: 12px;
            margin-left: 20px;
            color: #5B54E6;
            cursor: pointer;
        }
    }
}
</style>
