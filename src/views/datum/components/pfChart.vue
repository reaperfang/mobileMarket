/* 访问客流分析 */
<script type='es6'>
import chartBase from "@/components/ChartBase";

export default {
  name: "pfChart",
  extends: chartBase,
  computed: {
    // flow(){
    //     return this.$store._modules.root.state.data.dataChart
    // }
  },
  props: {},
  data() {
    return {
      flow: {},
      type: 1
    };
  },
  created() {
    // this.engine.registerMap("china", chinaMap);
    //  this.engine.registerMap('world', worldMap);
    // console.log(this.$store._modules.root.state.data.dataChart)
    // console.log(this.flow['xAxisData'])
  },
  methods: {
    // 数据显示控制
<<<<<<< HEAD
    dataType(val, l) {
      if (val == 1) {
        (this.option.title.text = "浏览/访问"),
          (this.option.legend.data = ["浏览量", "访客量"]),
          (this.option.series = [
            {
              name: "访客",
              type: "line",
              stack: "总量",
              data: this.flow["yAxisPvData"]
            },
            {
              name: "浏览",
              type: "line",
              stack: "总量",
              data: this.flow["yAxisPvData"]
            }
          ]);
      } else if (val == 2) {
        (this.option.title.text = "到店时段"),
          (this.option.legend.data = ["到店时段"]),
          (this.option.series = [
            {
              name: "到店时段",
              type: "line",
              stack: "总量",
              data: this.flow["yAxisPvData"]
            }
          ]);
      } else if (val == 3) {
        (this.option.title.text = "访问次数"),
          (this.option.legend.data = ["访问次数"]),
          (this.option.series = [
            {
              name: "到店时段",
              type: "line",
              stack: "总量",
              data: this.flow["yAxisPvData"]
            }
          ]);
      } else if (val == 4) {
        (this.option.title.text = "访问来源"),
          (this.option.legend.data = ["小程序", "公众号"]),
          (this.option.series = [
            {
              name: "小程序",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: this.flow["yAxisPvData"]
            },
            {
              name: "公众号",
              type: "line",
              stack: "总量",
              areaStyle: {},
              data: this.flow["yAxisPvData"]
            }
          ]);
=======
    nearDay(val,l){
      if(val == 1){
        this.option.title.text = "浏览/访问",
        this.option.legend.data = ["浏览量","访客量"],
        this.option.series = [{name:"访客",type: "line",stack: "总量",data: this.flow['yAxis']},
        {name:"浏览",type: "line",stack: "总量",data: this.flow['yAxis']}]
      }else if(val == 2){
         this.option.title.text = "到店时段",
         this.option.legend.data = ["到店时段"],
         this.option.series =[{name:"到店时段",type: "line",stack: "总量",data: this.flow['yAxis']},
         ]
      }else if(val == 3){
         this.option.title.text = "访问次数",
         this.option.legend.data = ["访问次数"],
         this.option.series =[{name:"到店时段",type: "line",stack: "总量",data: this.flow['yAxis']},
         ]
      }else if(val == 4){
         this.option.title.text = "访问来源",
         this.option.legend.data = ["小程序","公众号"],
         this.option.series = [{name:"小程序",type: "line",stack: "总量",areaStyle: {},data: this.flow['yAxis']},
         {name:"公众号",type: "line",stack: "总量",areaStyle: {},data: this.flow['yAxis']},
         ]
>>>>>>> b2198ddf03c08a5e02f521ac93ccb2289f48dd59
      }
    },
    con(n, t, type, l) {
      this.option = {
        title: {
          text: ["浏览/访问"]
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["浏览", "访客"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "2%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.flow["xAxis"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "访客",
            type: "line",
            stack: "总量",
<<<<<<< HEAD
            data: this.flow["yAxisPvData"]
=======
            data: this.flow['yAxis']
>>>>>>> b2198ddf03c08a5e02f521ac93ccb2289f48dd59
          },
          {
            name: "浏览",
            type: "line",
            stack: "总量",
<<<<<<< HEAD
            data: this.flow["yAxisPvData"]
=======
            data: this.flow['yAxis'] 
>>>>>>> b2198ddf03c08a5e02f521ac93ccb2289f48dd59
          }
        ]
      };
      this.flow = n;
      this.type = type;
<<<<<<< HEAD
      this.flow.yAxisPvData = n.series[0].data;
      this.dataType(type, l);
=======
      this.nearDay(type,l);
>>>>>>> b2198ddf03c08a5e02f521ac93ccb2289f48dd59
      this.makeOption(n);
      this.option.xAxis.data = this.flow.xAxis;
      this.oChart.setOption(this.option, true);
    },
    //设置图表数据项
    makeOption(data) {
      this.option;
    }
  },
  mounted() {},
  components: {}
};
</script>
