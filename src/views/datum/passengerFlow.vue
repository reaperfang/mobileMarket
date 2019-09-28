<template>
  <div class="p_container">
      <div class="clearfix">
          <div class="fr">
            <el-radio-group class="fr" v-model="visitSourceType" @change="all">
              <el-radio-button class="btn_bor" label="0" v-permission="['数据', '客流分析', '全部']">全部</el-radio-button>
              <el-radio-button class="btn_bor" label="1" v-permission="['数据', '客流分析', '小程序']">小程序</el-radio-button>
              <el-radio-button class="btn_bor" label="2" v-permission="['数据', '客流分析', '公众号']">公众号</el-radio-button>
            </el-radio-group>
          </div>
      </div>
        <div class="pane_container">
          <div class="p_line">
            <el-radio-group v-model="nearDay" @change="changeDay">
              <el-radio-button class="btn_bor" label="7">最近7天</el-radio-button>
              <el-radio-button class="btn_bor" label="15">最近15天</el-radio-button>
              <el-radio-button class="btn_bor" label="30">最近30天</el-radio-button>
              <el-radio-button class="btn_bor" label="4">自定义时间</el-radio-button>
            </el-radio-group>
            <div class="input_wrap" v-if="nearDay == 4">
              <el-date-picker
                v-model="range"
                type="daterange"
                range-separator="—"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeTime"
              ></el-date-picker>
            </div>
          </div>
          <div class="btn_tabs clearfix">
            <el-radio-group class="fr" v-model="analysisType" @change="changeType">
              <el-radio-button class="btn_bor" label="1">浏览量/访问量</el-radio-button>
              <el-radio-button class="btn_bor" label="2">到店时段</el-radio-button>
              <el-radio-button class="btn_bor" label="3">访问次数</el-radio-button>
              <el-radio-button class="btn_bor" label="4"  v-if="visitSourceType ==0 ">访问来源</el-radio-button>
            </el-radio-group>
          </div>
          <div class="chart_container">
            <pfChart :title="'测试图表'"  ref="prChart"></pfChart>
          </div>
        </div>
        <div class="btn_tabs clearfix">
            <el-radio-group class="fr" v-model="duration" @change="changeDp">
              <el-radio-button class="btn_bor" label="1">停留时长</el-radio-button>
              <el-radio-button class="btn_bor" label="2">跳出率</el-radio-button>
            </el-radio-group>
        </div>
        <div>
            <durationChare  :title="'测试图表'"  ref="pfChart"></durationChare>
        </div>
  </div>
</template>
<script>
import {GetDateStr} from "@/utils/validate.js"
import pfChart from "./components/pfChart";
import durationChare from "./components/durationChare";
export default {
  name: "passengerFlow",
  components: { pfChart,durationChare },
  data() {
    return {
      activeName: "first",
      range: "",
      startTime: "",
      endTime:"",
      visitSourceType: 0, //1 小程序 2 公众号
      analysisType: 1, //数据类型
      nearDay: 7, 
      dataChart: {},
      title:'浏览/访问',
      duration:'1',
      channel:0,
      type:1
    };
  },
  created() {
    this.getData();
   // this.getPathOut()
  }, 
  methods: {
    getDate(num) {
      var dd = new Date();
      dd.setDate(dd.getDate()+num);//获取num天后的日期
      dd = dd.toLocaleString('chinese',{hour12:false});
      dd = dd.replace(/\//g,'-');
      return dd;
    },
    // 获取数据
    getData() {
      let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        nearDay: this.nearDay,
        channel:this.channel
      };
      this._apis.data.pvady(data).then(response => {            
            this.dataChart = response;
            this.$refs.prChart.con(response,this.title,this.type)
        }).catch(error => {
          this.$message.error(error);
        });
    },
    // 时间选择
    changeTime(val) {
      this.startTime = this.getDate(val[0])
      this.endTime = this.getDate(val[1])
      this.nearDay = "";
      this.getData();
    },
    // 最近时间
    changeDay(val) {
      if(val !== 4) {
        this.nearDay = val;
        this.startTime = "";
        this.endTime = "";
        this.getData();
      }
    	// switch(val){
    	// 	case 15: this.nearDay=GetDateStr(-7); this.getData();break;
    	// 	case 2: this.startTime=GetDateStr(-15);this.getData();break;
    	// 	case 3: this.startTime=GetDateStr(-30);this.getData();break;
    	// 	default : break;
    	// }
    },
    //来源
    changeType(e) {
      this.type = e;
      this.getData(); 
    },
    // 图标标题
    titleChang(val){
        if(val == 1){
            this.title = '直径/跳出率'
        }
    },
    all(e){
      this.channel = e;
      this.getData();
      //   this.nearDay = 1;
      //   this.analysisType = 1;
      //   this.visitSourceType = e;
      //   this.getData()
    },
    // 路径
    getPathOut(){
        let data = {
        startTime: this.startTime,
        endTime: this.endTime,
        //analysisType: this.duration,
        nearDay: this.nearDay,
      };
      this._apis.data.bouncerate(data).then(response => {
            this.dataChart = response;
            this.$refs.pfChart.con(response,this.startTime,this.endTime,this.duration)
        }).catch(error => {
          this.$message.error(error);
        });
    },
    changeDp(val){
        //this.getPathOut()
        let data = {
          startTime: this.startTime,
          endTime: this.endTime,
          nearDay: this.nearDay,
        }
        if(val == '1') {
          this._apis.data.bouncerate(data).then(response => {
            this.dataChart = response;
            this.$refs.pfChart.con(response,this.startTime,this.endTime,this.duration)
          }).catch(error => {
            this.$message.error(error);
          });
        }else{
          this._apis.data.residetime(data).then(response => {
            this.dataChart = response;
            this.$refs.pfChart.con(response,this.startTime,this.endTime,this.duration)
          }).catch(error => {
            this.$message.error(error);
          });
        }
    }
  },
};
</script>
<style lang="scss" scoped>
.p_container {
  padding: 20px;
  background-color: #fff;
  .pane_container {
    .p_line {
      .input_wrap {
        width: 350px;
        display: inline-block;
      }
      span {
        color: #655eff;
        margin-left: 20px;
      }
    }
    .btn_tabs {
      margin: 30px 0 22px 0;
      .active_btn {
        background: rgba(101, 94, 255, 0.1);
        color: #655eff;
      }
      .btn_bor {
        margin: 0 10px;
        border-radius: 20px;
      }
    }
    .chart_container {
      padding-top: 20px;
      border-top: 1px dashed #d3d3d3;
    }
  }
}
</style>

