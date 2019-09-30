/* 访问客流分析 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
export default {
  name: "durationChart",
  extends: chartBase,
  computed:{},
  props:{ },
  data() {
    return {
      flow:{},
      type:1
    };
  },
  created() { },
  methods: {
    // 数据显示控制
    nearDay(val){
      if(val == 1){
        this.option.title = "平均停留时间",
        this.option.legend.data = ["平均停留时间"],
        this.option.series = [{name:"平均停留时间",type: "line",stack: "总量",data: this.flow['yAxis']},
        ]
      }else if(val == 2){
         this.option.title.text = "跳出率",
         this.option.legend.data = ["跳出率"],
         this.option.series =[{name:"跳出率",type: "line",stack: "总量",data: this.flow['yAxis']},
         ]
      }
    },
    con(n,type){
      this.option = {
        title: {
          text: ["平均停留时间"]
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["平均停留时间"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage:{}
          }
        },
        //X轴
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.flow['xAxis']
        },
        //Y轴
        yAxis: {
          type: "value",
        },
        series: [
          {
            name:"平均停留时间",
            type: "line",
            stack: "总量",
            data: this.flow['yAxis'] 
          }
        ]
      };
      this.flow = {
        xAxis:n.xAxis,
        yAxis:n.series[0].data
      }
      this.nearDay(this.type);
      this.makeOption(this.flow);
      this.option.xAxis.data = this.flow.xAxis;
      this.oChart.setOption(this.option, true);

    },
    //设置图表数据项
    makeOption(data) {
      this.option
    }
  },
  mounted(){

  },
  components: {}
};
</script>
