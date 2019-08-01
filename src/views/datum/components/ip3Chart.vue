/* 身份属性会员增长趋势图表 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
// import chinaMap from "@/assets/js/chinaMap.js";
// import worldMap from "@/assets/js/worldMap.js";
export default {
  name: "ip3Chart",
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
          x: "center",
          //text: "ECharts例子个数统计",
          //subtext: "Rainbow bar example",
          link: "http://echarts.baidu.com/doc/example.html"
        },
        tooltip: {
          trigger: "item"
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        grid: {
          borderWidth: 0,
          y: 100,
          y2: 60
        },
        xAxis: [
          {
            type: "category",
            show: false,
            data: [
              "Line",
              "Bar",
              "Scatter",
              "K",
              "Pie",
              "Radar",
              "Chord",
              "Force",
              "Map",
              "Gauge",
              "Funnel"
            ]
          }
        ],
        yAxis: [
          {
            type: "value",
            show: false
          }
        ],
        series: [
          {
            name: "ECharts例子个数统计",
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    "#C1232B",
                    "#B5C334",
                    "#FCCE10",
                    "#E87C25",
                    "#27727B",
                    "#FE8463",
                    "#9BCA63",
                    "#FAD860",
                    "#F3A43B",
                    "#60C0DD",
                    "#D7504B",
                    "#C6E579",
                    "#F4E001",
                    "#F0805A",
                    "#26C0C0"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: true,
                  position: "top",
                  formatter: "{b}\n{c}"
                }
              }
            },
            data: [12, 21, 10, 4],
            markPoint: {
              tooltip: {
                trigger: "item",
                backgroundColor: "rgba(0,0,0,0)",
                formatter: function(params) {
                  return (
                    '<img src="' +
                    params.data.symbol.replace("image://", "") +
                    '"/>'
                  );
                }
              },
              data: [
                {
                  xAxis: 0,
                  y: 350,
                  name: "Line",
                  symbolSize: 20,
                  //symbol: "image://../asset/ico/折线图.png"
                },
                {
                  xAxis: 1,
                  y: 350,
                  name: "Bar",
                  symbolSize: 20,
                  //symbol: "image://../asset/ico/柱状图.png"
                },
                {
                  xAxis: 2,
                  y: 350,
                  name: "Scatter",
                  symbolSize: 20,
                  //symbol: "image://../asset/ico/散点图.png"
                },
                {
                  xAxis: 3,
                  y: 350,
                  name: "K",
                  symbolSize: 20,
                 // symbol: "image://../asset/ico/K线图.png"
                }
              ]
            }
          }
        ]
      };
    }
  },
  components: {}
};
</script>
