/* 访问客流分析 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
// import chinaMap from "@/assets/js/chinaMap.js";
// import worldMap from "@/assets/js/worldMap.js";
export default {
  name: "pfChart",
  extends: chartBase,
   computed:{},
  props:{
  },
  data() {
    return {
      flow:{},
      type:1
    };
  },
  created() {
  },
  methods: {
    // 数据显示控制
    nearDay(val){
      if(val == 1){
        this.option.title = "平均停留时间",
        this.option.legend.data = ["平均停留时间"],
        this.option.series = [{name:"平均停留时间",type: "line",stack: "总量",data: this.flow['xAxis']},
        ]
      }else if(val == 2){
         this.option.title.text = "跳出率",
         this.option.legend.data = ["跳出率"],
         this.option.series =[{name:"跳出率",type: "line",stack: "总量",data: this.flow['xAxis']},
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
            data: this.flow['xAxis'] 
          }
        ]
      };
      this.flow = n;
      this.type = type;
      this.nearDay(type);
      this.makeOption(n);
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
