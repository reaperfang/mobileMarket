/* 身份属性属性比例图表 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
// import chinaMap from "@/assets/js/chinaMap.js";
// import worldMap from "@/assets/js/worldMap.js";
export default {
  name: "pp1Chart",
  extends: chartBase,
  data() {
    return {};
  },
  created() {
    // this.engine.registerMap("china", chinaMap);
    //  this.engine.registerMap('world', worldMap);
  },
  methods: {
    //设置图表数据项
    makeOption(data) {
      this.option = {
        legend: {
          data: ["高度(km)与气温(°C)变化关系"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        tooltip: {
          trigger: "axis",
          formatter: "Temperature : <br/>{b}km : {c}°C"
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            axisLine: { onZero: false },
            axisLabel: {
              formatter: "{value} km"
            },
            boundaryGap: false,
            data: ["0", "10", "20", "30", "40", "50", "60", "70", "80"]
          }
        ],
        series: [
          {
            name: "高度(km)与气温(°C)变化关系",
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                lineStyle: {
                  shadowColor: "rgba(0,0,0,0.4)"
                }
              }
            },
            data: [15, -50, -56.5, -46.5, -22.1, -2.5, -27.7, -55.7, -76.5]
          }
        ]
      };
    }
  },
  components: {}
};
</script>
