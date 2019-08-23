/* 身份属性会员增长趋势图表 */
<script type='es6'>
import chartBase from "@/components/ChartBase";
export default {
  name: "ip3Chart",
  extends: chartBase,
  data() {
    return {
      flow:{}
    };
  },
  created() {

  },
  methods: {
    con(n){
      this.flow = n;
      this.makeOption(n);
      this.oChart.setOption(this.option, true);
    },
    //设置图表数据项
    makeOption(data) {
      this.option = {
        title: {
          x: "center",
          text: "支付趋势",
          //subtext: "Rainbow bar example",
          link: "http://echarts.baidu.com/doc/example.html"
        },
        // tooltip: {
        //   trigger: "item"
        // },
        toolbox: {
          show: false,
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
            // data: this.flow['xAxisData']
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
            name: "支付趋势",
            type: "bar",
            itemStyle: {
              normal: {
                color: function(params) {
                  // build a color map as your need.
                  var colorList = [
                    "#8FDE80",
                    "#358FF4",
                    "#FF9235",
                    "#FF501E"
                  ];
                  return colorList[params.dataIndex];
                },
                label: {
                  show: false,
                  position: "top",
                  formatter: "{b}\n{c}"
                }
              }
            },
            data: this.flow['xAxisData'],
            markPoint: {
              tooltip: {
                // trigger: "item",
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
                  xAxis: 1,
                  y: 350,
                  name: "Line",
                  symbolSize: 20,
                },
                {
                  xAxis: 2,
                  y: 350,
                  name: "Bar",
                  symbolSize: 20,
                },
                {
                  xAxis: 3,
                  y: 350,
                  name: "Scatter",
                  symbolSize: 20,
                },
                {
                  xAxis: 4,
                  y: 350,
                  name: "K",
                  symbolSize: 20,
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
