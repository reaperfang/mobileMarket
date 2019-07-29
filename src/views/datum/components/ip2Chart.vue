/* 身份属性会员增长趋势图表 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
// import chinaMap from "@/assets/js/chinaMap.js";
// import worldMap from "@/assets/js/worldMap.js";
export default {
  name: "pfChart",
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
        title: {
          //text: "未来一周气温变化",
          //subtext: "纯属虚构"
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["最高气温", "最低气温"]
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
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} °C"
            }
          }
        ],
        series: [
          {
            name: "最低气温",
            type: "line",
            data: [1, -2, 2, 5, 3, 2, 0],
            markPoint: {
              data: [{ name: "周最低", value: -2, xAxis: 1, yAxis: -1.5 }]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
    }
  },
  components: {}
};
</script>
